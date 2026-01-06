import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ILibTbStepper,
  ILibTbDynamicForm,
  ILibTbButton,
  ILibTbTable,
  ILibTbBreadcrumb,
  ILibTbModal,
} from 'tech-block-lib';
import { BreadcrumbService, BreadcrumbItem } from '../../shared/services/breadcrumb.service';
import { step1PolicyModificationForm } from './configs/config-step-1/step1-policy-modification.config';
import { step2ConfirmationForm } from './configs/config-step-2/step2-confirmation.config';
import { MOCK_ACTIVE_POLICIES } from './policy-modification.interface';

@Component({
  standalone: false,
  selector: 'app-policy-modification',
  templateUrl: './policy-modification.component.html',
  styleUrls: ['./policy-modification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyModificationComponent implements OnInit {
  currentStep = 0; // ✅ Control del paso actual

  // ✅ Configuración de breadcrumb
  breadcrumbConfig: ILibTbBreadcrumb = {
    items: [],
  };

  // ✅ Configuración del stepper siguiendo lineamientos de tech-block-lib
  stepperConfig: ILibTbStepper = {
    dataQaId: 'policy-modification-stepper',
    activeIndex: 0,
    readonly: false,
    type: 'number',
    class: 'policy-modification-stepper',
    items: [
      {
        label: 'Seleccionar Póliza',
        icon: 'fal fa-search',
        command: () => this.goToStep(0),
      },
      {
        label: 'Modificar Valor',
        icon: 'fal fa-edit',
        command: () => this.goToStep(1),
      },
    ],
  };

  // ✅ Formularios dinámicos por paso
  step1Form: ILibTbDynamicForm = step1PolicyModificationForm();
  step2Form: ILibTbDynamicForm = step2ConfirmationForm();

  // ✅ Datos de modificación para el paso 2
  modificationData = {
    nuevoValorAsegurado: null as number | null,
    porcentajeAsegurado: 100 as number,
    nuevaFechaVencimiento: null as string | null,
    coberturasModificadas: '',
    nuevoTomador: '',
  };

  // ✅ Tabla de pólizas activas
  activePoliciesTable: ILibTbTable = {
    dataQaId: 'active-policies-table',
    value: MOCK_ACTIVE_POLICIES,
    paginator: true,
    class: 'active-policies__table',
    responsive: true,
    responsiveLayout: 'scroll',
    filterLocale: 'es',
    selectionMode: 'single',
    dataKey: 'id',
    rows: 10,
    rowsPerPageOptions: [5, 10, 15],
    alwaysShowPaginator: true,
  };

  // ✅ Botones de navegación
  btnNext: ILibTbButton = {
    label: 'Siguiente',
    icon: 'fal fa-arrow-right',
    iconPosition: 'right',
    styleBtn: 'fill',
    typeBtn: 'primary',
    libTbClick: () => this.nextStep(),
  };

  btnPrevious: ILibTbButton = {
    label: 'Anterior',
    icon: 'fal fa-arrow-left',
    iconPosition: 'left',
    styleBtn: 'stroke',
    typeBtn: 'secondary',
    libTbClick: () => this.previousStep(),
  };

  btnConfirmModification: ILibTbButton = {
    label: 'Confirmar Modificación',
    icon: 'fal fa-check-circle',
    iconPosition: 'right',
    styleBtn: 'fill',
    typeBtn: 'primary',
    libTbClick: () => this.confirmModification(),
  };

  // ✅ Configuraciones de modales para reemplazar alerts
  successModal: ILibTbModal = {
    title: 'Éxito',
    description: '',
    visible: false,
    size: 'medium',
    closable: true,
    closeOnEscape: true,
    dismissableMask: true,
    primaryButton: {
      label: 'Aceptar',
      icon: 'fal fa-check',
      styleBtn: 'fill',
      typeBtn: 'primary',
      libTbClick: () => this.closeSuccessModal(),
    },
  };

  warningModal: ILibTbModal = {
    title: 'Advertencia',
    description: '',
    visible: false,
    size: 'medium',
    closable: true,
    closeOnEscape: true,
    dismissableMask: true,
    primaryButton: {
      label: 'Aceptar',
      icon: 'fal fa-exclamation-triangle',
      styleBtn: 'fill',
      typeBtn: 'secondary',
      libTbClick: () => this.closeWarningModal(),
    },
  };

  errorModal: ILibTbModal = {
    title: 'Error',
    description: '',
    visible: false,
    size: 'medium',
    closable: true,
    closeOnEscape: true,
    dismissableMask: true,
    primaryButton: {
      label: 'Aceptar',
      icon: 'fal fa-times',
      styleBtn: 'fill',
      typeBtn: 'error',
      libTbClick: () => this.closeErrorModal(),
    },
  };

  constructor(
    private readonly router: Router,
    private readonly breadcrumbService: BreadcrumbService,
  ) {}

  ngOnInit(): void {
    this.setupBreadcrumb();
    this.setupFormSubscriptions();
  }

  private setupFormSubscriptions(): void {
    // ✅ Suscripción a cambios en el campo tipos de modificación
    setTimeout(() => {
      if (this.step1Form.form) {
        const tiposModificacionControl = this.step1Form.form.get('tiposModificacion');
        if (tiposModificacionControl) {
          tiposModificacionControl.valueChanges.subscribe((values: string[]) => {
            this.handleModificationTypeChange(values);
          });
        }
      }
    }, 100); // Pequeño delay para asegurar que el formulario esté inicializado
  }

  private setupBreadcrumb(): void {
    const breadcrumbItems: BreadcrumbItem[] = [
      {
        label: 'Portal',
        icon: 'fal fa-home',
        routerLink: ['/portal'],
      },
      {
        label: 'Modificaciones',
        icon: 'fal fa-edit',
        routerLink: ['/modification-selection'],
      },
      {
        label: 'Modificar Póliza',
        icon: 'fal fa-clipboard-check',
      },
    ];

    this.breadcrumbService.setBreadcrumb(breadcrumbItems);
    this.breadcrumbConfig.items = breadcrumbItems.map(item => ({
      label: item.label,
      icon: item.icon,
      routerLink: item.routerLink?.join('/'),
    }));
  }

  // ✅ Métodos de navegación
  goToStep(step: number): void {
    if (step > this.currentStep && !this.validateCurrentStep()) {
      return; // No permitir avanzar sin validar
    }
    this.currentStep = step;
    this.stepperConfig.activeIndex = step;
  }

  nextStep(): void {
    // ✅ Validar paso actual antes de avanzar
    if (!this.validateCurrentStep()) {
      return;
    }

    // ✅ Si estamos en el paso 1, activar búsqueda automática y verificar tipos de modificación
    if (this.currentStep === 0) {
      // ✅ Primero ejecutar la búsqueda de póliza (sin alertas)
      const searchSuccessful = this.performInternalSearch();
      if (!searchSuccessful) {
        return; // No avanzar si la búsqueda falló
      }

      const formData = this.step1Form.form?.value;
      const tiposModificacion = formData?.tiposModificacion || [];

      // ✅ Priorizar modificaciones nominativas para pantalla unificada
      if (tiposModificacion.includes('Modificaciones nominativas')) {
        console.log('✅ Navegando a modificaciones nominativas con tipos:', tiposModificacion);
        this.navigateToModificacionesNominativas(tiposModificacion);
        return;
      }

      // ✅ Navegar a pantalla unificada si hay modificaciones de vigencia o coberturas
      if (
        tiposModificacion.includes('Disminución de vigencia') ||
        tiposModificacion.includes('Prórroga de vigencia') ||
        tiposModificacion.includes('Exclusión de coberturas') ||
        tiposModificacion.includes('Inclusión de coberturas')
      ) {
        console.log(
          '✅ Navegando a modificaciones nominativas con tipos de vigencia/coberturas:',
          tiposModificacion,
        );
        this.navigateToModificacionesNominativas(tiposModificacion);
        return;
      }

      // ✅ Solo navegar a valor asegurado si NO hay modificaciones nominativas ni vigencia
      if (
        tiposModificacion.includes('Disminución de valor asegurado') ||
        tiposModificacion.includes('Aumento de valor asegurado')
      ) {
        const tipoValor = tiposModificacion.includes('Disminución de valor asegurado')
          ? 'Disminución de valor asegurado'
          : 'Aumento de valor asegurado';
        this.navigateToValorAseguradoModification(tipoValor);
        return;
      }
    }

    // ✅ Navegación normal del stepper - siguiendo patrón estándar
    if (this.currentStep < this.stepperConfig.items!.length - 1) {
      this.currentStep++;
      this.stepperConfig.activeIndex = this.currentStep;
    }
  }

  previousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.stepperConfig.activeIndex = this.currentStep;
    }
  }

  validateCurrentStep(): boolean {
    const currentForm = this.getCurrentStepForm();
    currentForm.libTbCallSubmit?.();
    return currentForm.form?.valid ?? false;
  }

  private getCurrentStepForm(): ILibTbDynamicForm {
    switch (this.currentStep) {
      case 0:
        return this.step1Form;
      case 1:
        return this.step2Form;
      default:
        return this.step1Form;
    }
  }

  // ✅ Métodos auxiliares para el template
  get isFirstStep(): boolean {
    return this.currentStep === 0;
  }

  get isLastStep(): boolean {
    return this.currentStep === this.stepperConfig.items!.length - 1;
  }

  // ✅ Métodos para la tabla de pólizas activas
  onPolicySelect(event: any): void {
    console.log('Póliza seleccionada:', event);
  }

  onPolicyUnselect(event: any): void {
    console.log('Póliza deseleccionada:', event);
  }

  selectPolicy(): void {
    if (this.activePoliciesTable.selection && this.activePoliciesTable.selection.length > 0) {
      const selectedPolicy = this.activePoliciesTable.selection[0];
      // ✅ Llenar automáticamente el campo número de póliza
      if (this.step1Form.form) {
        this.step1Form.form.patchValue({
          numeroPoliza: selectedPolicy.numero,
        });
      }
      this.showSuccessModal(`Póliza ${selectedPolicy.numero} seleccionada exitosamente.`);
    } else {
      this.showWarningModal('Por favor seleccione una póliza de la lista.');
    }
  }

  // ✅ Método para buscar póliza según criterios del formulario
  searchPolicy = (): void => {
    const formData = this.step1Form.form?.value;

    if (!formData?.numeroPoliza) {
      this.showWarningModal('Por favor ingrese el número de póliza.');
      return;
    }

    if (!formData?.tiposModificacion || formData.tiposModificacion.length === 0) {
      this.showWarningModal('Por favor seleccione al menos un tipo de modificación.');
      return;
    }

    console.log('Buscando póliza con criterios:', formData);

    // ✅ Simular búsqueda de póliza específica
    const numeroPoliza = formData.numeroPoliza;
    const foundPolicy = MOCK_ACTIVE_POLICIES.find(policy =>
      policy.numero.toLowerCase().includes(numeroPoliza.toLowerCase()),
    );

    if (foundPolicy) {
      // ✅ Actualizar tabla para mostrar solo la póliza encontrada
      this.activePoliciesTable.value = [foundPolicy];
      this.showSuccessModal(
        `Póliza ${numeroPoliza} encontrada. Puede proceder con la modificación.`,
      );
    } else {
      // ✅ Mostrar todas las pólizas si no se encuentra coincidencia exacta
      this.activePoliciesTable.value = MOCK_ACTIVE_POLICIES;
      this.showWarningModal(
        `No se encontró una póliza con el número ${numeroPoliza}. Se muestran todas las pólizas disponibles.`,
      );
    }
  };

  // ✅ Método interno para búsqueda sin alertas (usado desde nextStep)
  private performInternalSearch(): boolean {
    const formData = this.step1Form.form?.value;

    if (!formData?.numeroPoliza) {
      this.showWarningModal('Por favor ingrese el número de póliza.');
      return false;
    }

    if (!formData?.tiposModificacion || formData.tiposModificacion.length === 0) {
      this.showWarningModal('Por favor seleccione al menos un tipo de modificación.');
      return false;
    }

    console.log('Buscando póliza con criterios:', formData);

    // ✅ Simular búsqueda de póliza específica
    const numeroPoliza = formData.numeroPoliza;
    const foundPolicy = MOCK_ACTIVE_POLICIES.find(policy =>
      policy.numero.toLowerCase().includes(numeroPoliza.toLowerCase()),
    );

    if (foundPolicy) {
      // ✅ Actualizar tabla para mostrar solo la póliza encontrada
      this.activePoliciesTable.value = [foundPolicy];
      console.log(`✅ Póliza ${numeroPoliza} encontrada.`);
      return true;
    } else {
      // ✅ Mostrar todas las pólizas si no se encuentra coincidencia exacta
      this.activePoliciesTable.value = MOCK_ACTIVE_POLICIES;
      console.log(
        `ℹ️ No se encontró una póliza con el número ${numeroPoliza}. Se muestran todas las pólizas disponibles.`,
      );
      return true; // Permitir continuar aunque no se encuentre la póliza específica
    }
  }

  // ✅ Método para editar información de póliza
  editPolicy(policy: any): void {
    console.log('Editando póliza:', policy);

    // ✅ Rellenar automáticamente el formulario con los datos de la póliza seleccionada
    if (this.step1Form.form) {
      this.step1Form.form.patchValue({
        numeroPoliza: policy.numero,
      });
    }

    // ✅ Navegar al paso 2 del formulario de modificación
    this.nextStep();

    // ✅ Mostrar notificación de que se ha cargado la información
    this.showSuccessModal(
      `Información de la póliza ${policy.numero} cargada. Puede proceder con la modificación.`,
    );
  }

  // ✅ Método para crear configuración de checkbox para cada póliza
  getPolicyCheckboxConfig(policy: any): any {
    return {
      name: `policy_${policy.id}`,
      value: policy.id,
      libTbChange: (event: any) => this.onPolicyCheckboxChange(event, policy),
    };
  }

  // ✅ Método principal para manejar cambios en tipos de modificación
  private handleModificationTypeChange(selectedValues: string[]): void {
    if (!selectedValues) return;

    const modificacionesNominativas = 'Modificaciones nominativas';

    // ✅ Reglas de negocio:
    // 1. "Modificaciones nominativas" puede ir con UNA opción adicional
    // 2. O solo una opción individual
    // 3. Máximo 2 selecciones permitidas
    // 4. La navegación se hace únicamente cuando el usuario presiona "Siguiente"

    console.log('Tipos seleccionados:', selectedValues);

    // ✅ NO navegar automáticamente para ningún tipo de modificación
    // La navegación se hace únicamente cuando el usuario presiona "Siguiente"
    // Esto permite que el usuario seleccione múltiples tipos antes de continuar

    if (selectedValues.length > 2) {
      // ✅ Si se seleccionan más de 2, mantener solo las últimas 2
      const lastTwoSelections = selectedValues.slice(-2);
      this.updateModificationTypes(lastTwoSelections);
      return;
    }

    if (selectedValues.length === 2) {
      // ✅ Si se seleccionan 2, una DEBE ser "Modificaciones nominativas"
      if (!selectedValues.includes(modificacionesNominativas)) {
        // Si no incluye "Modificaciones nominativas", mantener solo la última selección
        const lastSelection = selectedValues.slice(-1);
        this.updateModificationTypes(lastSelection);
        return;
      }
    }

    // ✅ Si cumple las reglas, permitir la selección
    console.log('Selección válida:', selectedValues);
  }

  // ✅ Método auxiliar para actualizar los tipos de modificación
  private updateModificationTypes(values: string[]): void {
    if (this.step1Form.form) {
      this.step1Form.form.patchValue({
        tiposModificacion: values,
      });
    }

    console.log('Tipos de modificación actualizados:', values);
  }

  // ✅ Método para navegar a la pantalla de modificación de valor asegurado
  private navigateToValorAseguradoModification(tipoModificacion: string): void {
    const formData = this.step1Form.form?.value;
    const numeroPoliza = formData?.numeroPoliza || '';

    if (!numeroPoliza) {
      this.showWarningModal('Debe ingresar o seleccionar un número de póliza antes de continuar.');
      // Limpiar la selección de tipos de modificación
      this.updateModificationTypes([]);
      return;
    }

    console.log('Navegando a modificación de valor asegurado:', {
      numeroPoliza,
      tipoModificacion,
    });

    // ✅ Navegar a la pantalla específica con parámetros
    this.router.navigate(['/valor-asegurado-modification'], {
      queryParams: {
        numeroPoliza: numeroPoliza,
        tipoModificacion: tipoModificacion,
      },
    });
  }

  // ✅ Método para navegar a la pantalla de modificaciones nominativas
  private navigateToModificacionesNominativas(tiposModificacion: string[]): void {
    const formData = this.step1Form.form?.value;
    const numeroPoliza = formData?.numeroPoliza || '';

    if (!numeroPoliza) {
      this.showWarningModal('Debe ingresar o seleccionar un número de póliza antes de continuar.');
      // Limpiar la selección de tipos de modificación
      this.updateModificationTypes([]);
      return;
    }

    console.log('Navegando a modificaciones nominativas:', {
      numeroPoliza,
      tiposModificacion,
    });

    // ✅ Navegar a la pantalla específica con parámetros
    this.router.navigate(['/modificaciones-nominativas'], {
      queryParams: {
        numeroPoliza: numeroPoliza,
        tiposModificacion: JSON.stringify(tiposModificacion),
      },
    });
  }

  // ✅ Método para manejar cambios en checkbox de pólizas
  onPolicyCheckboxChange(event: any, policy: any): void {
    console.log('Checkbox cambiado:', event, policy);

    if (event.checked) {
      // ✅ Rellenar automáticamente el formulario con los datos de la póliza seleccionada
      if (this.step1Form.form) {
        this.step1Form.form.patchValue({
          numeroPoliza: policy.numero,
        });
      }

      // ✅ Mostrar notificación de que se ha seleccionado la póliza
      console.log(`✅ Póliza ${policy.numero} seleccionada para modificación.`);
    } else {
      // ✅ Limpiar el formulario si se deselecciona
      if (this.step1Form.form) {
        this.step1Form.form.patchValue({
          numeroPoliza: '',
        });
      }

      console.log(`ℹ️ Póliza ${policy.numero} deseleccionada.`);
    }
  }

  get selectedPolicy(): any {
    return this.activePoliciesTable.selection && this.activePoliciesTable.selection.length > 0
      ? this.activePoliciesTable.selection[0]
      : null;
  }

  // ✅ Métodos para validar tipos de modificación en el paso 2
  hasModificationType(type: string): boolean {
    const tiposModificacion = this.step1Form.form?.value?.tiposModificacion || [];
    return tiposModificacion.includes(type);
  }

  hasAnyEditableFields(): boolean {
    const tiposModificacion = this.step1Form.form?.value?.tiposModificacion || [];

    return tiposModificacion.some(
      (tipo: string) =>
        tipo === 'Aumento de valor asegurado' ||
        tipo === 'Disminución de valor asegurado' ||
        tipo === 'Prórroga de vigencia' ||
        tipo === 'Disminución de vigencia' ||
        tipo === 'Traslado de vigencia' ||
        tipo === 'Inclusión de coberturas' ||
        tipo === 'Exclusión de coberturas' ||
        tipo === 'Modificaciones nominativas',
    );
  }

  // ✅ Método para validar campos requeridos según el tipo de modificación
  validateModificationFields(): boolean {
    // Validar valor asegurado y porcentaje
    if (
      this.hasModificationType('Aumento de valor asegurado') ||
      this.hasModificationType('Disminución de valor asegurado')
    ) {
      if (
        !this.modificationData.nuevoValorAsegurado ||
        this.modificationData.nuevoValorAsegurado <= 0
      ) {
        this.showErrorModal('Por favor ingrese un valor asegurado válido.');
        return false;
      }

      if (
        !this.modificationData.porcentajeAsegurado ||
        this.modificationData.porcentajeAsegurado < 0 ||
        this.modificationData.porcentajeAsegurado > 100
      ) {
        this.showErrorModal('Por favor ingrese un porcentaje asegurado válido (0-100%).');
        return false;
      }
    }

    // Validar fecha de vencimiento
    if (
      this.hasModificationType('Prórroga de vigencia') ||
      this.hasModificationType('Disminución de vigencia') ||
      this.hasModificationType('Traslado de vigencia')
    ) {
      if (!this.modificationData.nuevaFechaVencimiento) {
        this.showErrorModal('Por favor seleccione una nueva fecha de vencimiento.');
        return false;
      }
    }

    // Validar coberturas
    if (
      this.hasModificationType('Inclusión de coberturas') ||
      this.hasModificationType('Exclusión de coberturas')
    ) {
      if (!this.modificationData.coberturasModificadas.trim()) {
        this.showErrorModal('Por favor describa las coberturas a modificar.');
        return false;
      }
    }

    // Validar tomador
    if (this.hasModificationType('Modificaciones nominativas')) {
      if (!this.modificationData.nuevoTomador.trim()) {
        this.showErrorModal('Por favor ingrese el nuevo tomador.');
        return false;
      }
    }

    return true;
  }

  // ✅ Método para confirmar la modificación
  confirmModification(): void {
    if (!this.validateModificationFields()) {
      return;
    }

    const tiposModificacion = this.step1Form.form?.value?.tiposModificacion || [];
    const numeroPoliza = this.step1Form.form?.value?.numeroPoliza;

    console.log('✅ Confirmando modificación:', {
      numeroPoliza,
      tiposModificacion,
      modificationData: this.modificationData,
      selectedPolicy: this.selectedPolicy,
    });

    this.showSuccessModal(
      `Modificación confirmada para la póliza ${numeroPoliza}. Los cambios serán procesados.`,
    );

    // Aquí se enviarían los datos al servicio correspondiente
    // this.modificationService.processModification({...});
  }

  // ✅ Métodos para manejar modales
  private showSuccessModal(message: string): void {
    this.successModal.description = message;
    this.successModal.visible = true;
  }

  private showWarningModal(message: string): void {
    this.warningModal.description = message;
    this.warningModal.visible = true;
  }

  private showErrorModal(message: string): void {
    this.errorModal.description = message;
    this.errorModal.visible = true;
  }

  private closeSuccessModal(): void {
    this.successModal.visible = false;
  }

  private closeWarningModal(): void {
    this.warningModal.visible = false;
  }

  private closeErrorModal(): void {
    this.errorModal.visible = false;
  }
}
