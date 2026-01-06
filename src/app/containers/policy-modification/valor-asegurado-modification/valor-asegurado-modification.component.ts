import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ILibTbTable, ILibTbButton, ILibTbBreadcrumb, ILibTbStepper } from 'tech-block-lib';
import { BreadcrumbService, BreadcrumbItem } from '../../../shared/services/breadcrumb.service';
import {
  IValorAseguradoModificationData,
  ICoberturaCumplimiento,
  INITIAL_VALOR_ASEGURADO_DATA,
  MOCK_COBERTURAS_MODIFICACION,
} from './valor-asegurado-modification.interface';

@Component({
  standalone: false,
  selector: 'app-valor-asegurado-modification',
  templateUrl: './valor-asegurado-modification.component.html',
  styleUrls: ['./valor-asegurado-modification.component.scss'],
})
export class ValorAseguradoModificationComponent implements OnInit {
  currentStep = 1; // ✅ Control del paso actual (estamos en paso 2)

  // ✅ Datos del formulario de modificación
  modificationData: IValorAseguradoModificationData = { ...INITIAL_VALOR_ASEGURADO_DATA };

  // ✅ Configuración de breadcrumb
  breadcrumbConfig: ILibTbBreadcrumb = {
    items: [],
  };

  // ✅ Configuración del stepper siguiendo lineamientos de tech-block-lib
  stepperConfig: ILibTbStepper = {
    activeIndex: 1, // ✅ Mostrar paso 2 como activo
    readonly: false,
    type: 'number',
    class: 'valor-asegurado-stepper',
    items: [
      {
        label: 'Seleccionar',
        icon: 'fal fa-search',
        command: () => this.goToStep(0),
      },
      {
        label: 'Modificar',
        icon: 'fal fa-edit',
        command: () => this.goToStep(1),
      },
    ],
  };

  // ✅ Configuración de la tabla de coberturas
  coberturasTable: ILibTbTable = {
    dataQaId: 'coberturas-modificacion-table',
    value: [...MOCK_COBERTURAS_MODIFICACION],
    paginator: false,
    class: 'coberturas-modificacion__table',
    responsive: true,
    responsiveLayout: 'scroll',
    filterLocale: 'es',
    dataKey: 'id',
  };

  // ✅ Botones de acción
  btnGuardarCambios: ILibTbButton = {
    label: 'Guardar Cambios',
    icon: 'fal fa-save',
    iconPosition: 'left',
    styleBtn: 'fill',
    typeBtn: 'primary',
    libTbClick: () => this.guardarCambios(),
  };

  btnCancelar: ILibTbButton = {
    label: 'Cancelar',
    icon: 'fal fa-times',
    iconPosition: 'left',
    styleBtn: 'stroke',
    typeBtn: 'secondary',
    libTbClick: () => this.cancelar(),
  };

  btnVolver: ILibTbButton = {
    label: 'Volver a Modificaciones',
    icon: 'fal fa-arrow-left',
    iconPosition: 'left',
    styleBtn: 'stroke',
    typeBtn: 'secondary',
    libTbClick: () => this.volverAModificaciones(),
  };

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly breadcrumbService: BreadcrumbService,
  ) {}

  ngOnInit(): void {
    this.setupBreadcrumb();
    this.loadPolicyData();
  }

  // ✅ Método de navegación del stepper
  goToStep(step: number): void {
    if (step === 0) {
      // Volver al paso 1 (selección de póliza)
      this.router.navigate(['/policy-modification']);
    } else {
      // Mantener en el paso 2 (confirmación)
      this.currentStep = step;
      this.stepperConfig.activeIndex = step;
    }
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
        routerLink: ['/policy-modification'],
      },
      {
        label: 'Modificar Valor Asegurado',
        icon: 'fal fa-dollar-sign',
      },
    ];

    this.breadcrumbService.setBreadcrumb(breadcrumbItems);
    this.breadcrumbConfig.items = breadcrumbItems.map(item => ({
      label: item.label,
      icon: item.icon,
      routerLink: item.routerLink?.join('/'),
    }));
  }

  private loadPolicyData(): void {
    // ✅ Obtener parámetros de la URL para cargar datos de la póliza
    this.route.queryParams.subscribe(params => {
      if (params['numeroPoliza']) {
        this.modificationData.numeroPoliza = params['numeroPoliza'];
        this.modificationData.tipoModificacion =
          params['tipoModificacion'] || 'Aumento de valor asegurado';
        console.log('Cargando datos para póliza:', params['numeroPoliza']);

        // ✅ Simular carga de datos específicos de la póliza
        this.loadCoberturasByPolicy(params['numeroPoliza']);

        // ✅ Cargar datos del resumen de la póliza
        this.loadPolicySummaryData(params['numeroPoliza']);
      }
    });
  }

  private loadCoberturasByPolicy(numeroPoliza: string): void {
    // ✅ Simular carga de coberturas específicas de la póliza
    console.log('Cargando coberturas para póliza:', numeroPoliza);

    // Por ahora usamos datos mock, pero aquí iría la llamada al servicio
    this.modificationData.coberturas = [...MOCK_COBERTURAS_MODIFICACION];
    this.coberturasTable.value = [...MOCK_COBERTURAS_MODIFICACION];
  }

  private loadPolicySummaryData(numeroPoliza: string): void {
    // ✅ Simular carga de datos del resumen de la póliza
    console.log('Cargando resumen para póliza:', numeroPoliza);

    // ✅ Simular datos específicos según el número de póliza
    if (numeroPoliza === 'POL-2024-001') {
      this.modificationData.producto = 'Cumplimiento de Contrato de Obra';
      this.modificationData.tomador = 'Constructora ABC S.A.S.';
      this.modificationData.valorContrato = 200000000;
      this.modificationData.fechaInicio = '2024-01-15';
    } else if (numeroPoliza === 'POL-2024-002') {
      this.modificationData.producto = 'Cumplimiento de Contrato de Servicios';
      this.modificationData.tomador = 'Empresa de Servicios XYZ Ltda.';
      this.modificationData.valorContrato = 150000000;
      this.modificationData.fechaInicio = '2024-02-01';
    } else {
      // ✅ Datos por defecto
      this.modificationData.producto = 'Cumplimiento de Contrato';
      this.modificationData.tomador = 'Empresa Tomadora Simulada S.A.S.';
      this.modificationData.valorContrato = 100000000;
      this.modificationData.fechaInicio = '2024-01-01';
    }
  }

  // ✅ Método para manejar cambios en porcentaje asegurado
  onPorcentajeChange(cobertura: ICoberturaCumplimiento, event: any): void {
    const nuevoPorcentaje = parseFloat(event.target.value) || 0;

    // ✅ Validar rango del porcentaje
    if (nuevoPorcentaje < 0 || nuevoPorcentaje > 100) {
      alert('El porcentaje debe estar entre 0% y 100%');
      event.target.value = cobertura.porcentajeAsegurado;
      return;
    }

    // ✅ Actualizar porcentaje
    cobertura.porcentajeAsegurado = nuevoPorcentaje;

    // ✅ Recalcular valor asegurado basado en porcentaje
    this.recalcularValorAsegurado(cobertura);

    console.log('Porcentaje actualizado:', cobertura);
  }

  // ✅ Método para manejar cambios en valor asegurado
  onValorAseguradoChange(cobertura: ICoberturaCumplimiento, event: any): void {
    const nuevoValor = parseFloat(event.target.value.replace(/[^\d]/g, '')) || 0;

    // ✅ Validar valor mínimo
    if (nuevoValor < 0) {
      alert('El valor asegurado no puede ser negativo');
      return;
    }

    // ✅ Actualizar valor asegurado
    cobertura.valorAsegurado = nuevoValor;

    console.log('Valor asegurado actualizado:', cobertura);
  }

  // ✅ Método para manejar selección/deselección de coberturas
  onCoberturaCheckboxChange(cobertura: ICoberturaCumplimiento, event: any): void {
    cobertura.seleccionado = event.target.checked;

    console.log('Cobertura seleccionada:', cobertura.cobertura, cobertura.seleccionado);
  }

  // ✅ Método auxiliar para recalcular valor asegurado
  private recalcularValorAsegurado(cobertura: ICoberturaCumplimiento): void {
    // Esta lógica dependería del valor base del contrato
    // Por ahora es solo ilustrativa
    const valorBase = 500000000; // Ejemplo: valor base del contrato
    cobertura.valorAsegurado = Math.round((valorBase * cobertura.porcentajeAsegurado) / 100);
  }

  // ✅ Método para guardar cambios
  guardarCambios(): void {
    const coberturasSelecionadas = this.modificationData.coberturas.filter(c => c.seleccionado);

    if (coberturasSelecionadas.length === 0) {
      alert('⚠️ Debe seleccionar al menos una cobertura para modificar.');
      return;
    }

    // ✅ Validar que las coberturas seleccionadas tengan valores válidos
    const coberturasInvalidas = coberturasSelecionadas.filter(
      c => c.porcentajeAsegurado <= 0 || c.valorAsegurado <= 0,
    );

    if (coberturasInvalidas.length > 0) {
      alert('⚠️ Las coberturas seleccionadas deben tener valores mayores a 0.');
      return;
    }

    // ✅ Simular guardado
    console.log('Guardando modificaciones:', {
      numeroPoliza: this.modificationData.numeroPoliza,
      tipoModificacion: this.modificationData.tipoModificacion,
      coberturas: coberturasSelecionadas,
    });

    alert('✅ Modificaciones guardadas exitosamente.');

    // ✅ Regresar a la pantalla anterior
    this.volverAModificaciones();
  }

  // ✅ Método para cancelar
  cancelar(): void {
    if (confirm('¿Está seguro que desea cancelar? Se perderán los cambios no guardados.')) {
      this.volverAModificaciones();
    }
  }

  // ✅ Método para volver a modificaciones
  volverAModificaciones(): void {
    this.router.navigate(['/policy-modification']);
  }

  // ✅ Método para formatear valores monetarios
  formatCurrency(value: number | undefined): string {
    if (!value) return '$0 COP';

    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value);
  }

  // ✅ Métodos auxiliares para el template
  get coberturasSelecionadas(): ICoberturaCumplimiento[] {
    return this.modificationData.coberturas.filter(c => c.seleccionado);
  }

  get totalValorAsegurado(): number {
    return this.coberturasSelecionadas.reduce((total, c) => total + c.valorAsegurado, 0);
  }

  // ✅ Método de tracking para *ngFor
  trackByCoberturaId(_index: number, cobertura: ICoberturaCumplimiento): number {
    return cobertura.id;
  }
}
