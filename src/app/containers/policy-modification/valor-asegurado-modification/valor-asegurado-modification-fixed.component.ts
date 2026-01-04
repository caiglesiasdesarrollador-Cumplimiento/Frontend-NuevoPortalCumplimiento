import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  // ✅ Configuración del stepper CORREGIDA
  stepperConfig: ILibTbStepper = {
    activeIndex: 1,
    readonly: false,
    type: 'number',
    items: [
      {
        label: 'Selección de Póliza',
        icon: 'fal fa-edit',
        command: () => this.goToStep(0),
      },
      {
        label: 'Confirmar Modificación',
        icon: 'fal fa-check-circle',
        command: () => this.goToStep(1),
      },
    ],
    libTbActiveIndexChange: (index: number) => {
      this.currentStep = index;
    },
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
    label: 'Volver al Paso Anterior',
    icon: 'fal fa-arrow-left',
    iconPosition: 'left',
    styleBtn: 'stroke',
    typeBtn: 'secondary',
    libTbClick: () => this.volverPasoAnterior(),
  };

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly breadcrumbService: BreadcrumbService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.setupBreadcrumb();
    this.loadPolicyData();
  }

  // ✅ Método de navegación del stepper
  goToStep(step: number): void {
    if (step === 0) {
      // Navegar de vuelta al componente principal
      this.router.navigate(['/policy-modification']);
    }
    this.currentStep = step;
    this.stepperConfig.activeIndex = step;
  }

  private setupBreadcrumb(): void {
    const breadcrumbItems: BreadcrumbItem[] = [
      {
        label: 'Portal',
        icon: 'fal fa-home',
        routerLink: ['/dashboard'],
      },
      {
        label: 'Modificaciones',
        icon: 'fal fa-edit',
        routerLink: ['/policy-modification'],
      },
      {
        label: 'Modificar Póliza',
        icon: 'fal fa-edit',
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
    // ✅ Cargar datos de la póliza desde los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      this.modificationData.numeroPoliza = params['numeroPoliza'] || 'POL-2024-001';
      this.modificationData.tipoModificacion =
        params['tipoModificacion'] || 'Aumento de valor asegurado';

      console.log('Datos de modificación cargados:', this.modificationData);
    });
  }

  // ✅ Métodos de acción
  guardarCambios(): void {
    console.log('Guardando cambios de valor asegurado:', this.modificationData);

    // ✅ Simular guardado exitoso
    alert('Modificación de valor asegurado guardada exitosamente');

    // ✅ Navegar de vuelta a la lista de modificaciones
    this.router.navigate(['/policy-modification']);
  }

  cancelar(): void {
    if (confirm('¿Está seguro de que desea cancelar? Se perderán los cambios no guardados.')) {
      this.router.navigate(['/policy-modification']);
    }
  }

  volverPasoAnterior(): void {
    this.router.navigate(['/policy-modification']);
  }

  // ✅ Métodos auxiliares para la tabla
  onCoberturasSelectionChange(event: any): void {
    console.log('Coberturas seleccionadas:', event);
  }

  updateValorAsegurado(cobertura: ICoberturaCumplimiento, nuevoValor: number): void {
    cobertura.valorAsegurado = nuevoValor;
    console.log(`Valor asegurado actualizado para ${cobertura.nombre}:`, nuevoValor);
  }

  updatePorcentajeAsegurado(cobertura: ICoberturaCumplimiento, nuevoPorcentaje: number): void {
    cobertura.porcentajeAsegurado = nuevoPorcentaje;

    // ✅ Calcular nuevo valor asegurado basado en el porcentaje
    const valorContrato = this.modificationData.valorContrato ?? 200000000;
    const nuevoValorAsegurado = (valorContrato * nuevoPorcentaje) / 100;
    cobertura.valorAsegurado = nuevoValorAsegurado;

    console.log(
      `Porcentaje actualizado para ${cobertura.nombre}:`,
      nuevoPorcentaje,
      'Nuevo valor:',
      nuevoValorAsegurado,
    );
  }
}
