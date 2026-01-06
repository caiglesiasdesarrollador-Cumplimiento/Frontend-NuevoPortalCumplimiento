import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ILibTbButton, ILibTbBreadcrumb, ILibTbDynamicForm } from 'tech-block-lib';
import { BreadcrumbService, BreadcrumbItem } from '../../../shared/services/breadcrumb.service';
import {
  IModificacionesNominativasData,
  ICoberturaCumplimiento,
  INITIAL_MODIFICACIONES_NOMINATIVAS_DATA,
  MOCK_POLIZA_DATA,
} from './modificaciones-nominativas.interface';
import { modificacionesNominativasForm } from './configs/datos-generales.config';

@Component({
  standalone: false,
  selector: 'app-modificaciones-nominativas',
  templateUrl: './modificaciones-nominativas.component.html',
  styleUrls: ['./modificaciones-nominativas.component.scss'],
})
export class ModificacionesNominativasComponent implements OnInit {
  // ✅ Datos del formulario de modificación nominativa
  modificationData: IModificacionesNominativasData = { ...INITIAL_MODIFICACIONES_NOMINATIVAS_DATA };

  // ✅ Configuración de breadcrumb
  breadcrumbConfig: ILibTbBreadcrumb = {
    items: [],
  };

  // ✅ Formulario dinámico completo
  modificacionesForm: ILibTbDynamicForm = {
    validateOnSubmit: true,
    class: 'grid grid-cols-1 gap-2',
    configContainers: [],
    config: [],
  };

  // ✅ AGREGADO: Propiedades para la tabla de coberturas
  mostrarCoberturas = false; // Se activa si hay modificaciones de valor asegurado o vigencia

  // ✅ Botones de acción siguiendo tech-block-lib
  btnGuardarCambios: ILibTbButton = {
    label: 'Guardar Cambios',
    icon: 'fal fa-save',
    iconPosition: 'right',
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

  btnVolverModificaciones: ILibTbButton = {
    label: 'Volver a Modificaciones',
    icon: 'fal fa-arrow-left',
    iconPosition: 'left',
    styleBtn: 'stroke',
    typeBtn: 'tertiary',
    libTbClick: () => this.volverAModificaciones(),
  };

  btnAnterior: ILibTbButton = {
    label: 'Anterior',
    icon: 'fal fa-chevron-left',
    iconPosition: 'left',
    styleBtn: 'stroke',
    typeBtn: 'secondary',
    libTbClick: () => this.volverAModificaciones(),
  };

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly breadcrumbService: BreadcrumbService,
  ) {}

  ngOnInit(): void {
    this.setupBreadcrumb();
    this.loadRouteParams();
    // ✅ setupDynamicForms() se llama DESPUÉS de cargar parámetros en loadRouteParams()
  }

  // ✅ Configurar breadcrumb dinámico siguiendo patrón de policy-input
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
        routerLink: ['/policy-modification'],
      },
      {
        label: 'Modificaciones Nominativas',
        icon: 'fal fa-file-contract',
      },
    ];

    this.breadcrumbService.setBreadcrumb(breadcrumbItems);
    this.breadcrumbConfig.items = breadcrumbItems.map(item => ({
      label: item.label,
      icon: item.icon,
      routerLink: item.routerLink,
    }));
  }

  // ✅ Cargar parámetros de la ruta
  private loadRouteParams(): void {
    this.route.queryParams.subscribe(params => {
      if (params['numeroPoliza']) {
        this.modificationData.numeroPoliza = params['numeroPoliza'];
        console.log('Cargando datos para póliza:', params['numeroPoliza']);

        // ✅ Cargar tipos de modificación
        if (params['tiposModificacion']) {
          this.modificationData.tiposModificacion = JSON.parse(params['tiposModificacion']);

          // ✅ Determinar si está en modo edición para datos nominativos
          // REGLAS:
          // - Si incluye "Modificaciones nominativas" → campos nominativos editables
          // - Si solo hay modificaciones de vigencia/valor → campos nominativos readonly
          const hayModificacionesNominativas = this.modificationData.tiposModificacion.includes(
            'Modificaciones nominativas',
          );
          this.modificationData.modoEdicion = hayModificacionesNominativas;

          // ✅ AGREGADO: Determinar si mostrar tabla de coberturas
          this.mostrarCoberturas = this.modificationData.tiposModificacion.some(
            tipo =>
              tipo === 'Aumento de valor asegurado' ||
              tipo === 'Disminución de valor asegurado' ||
              tipo === 'Disminución de vigencia' ||
              tipo === 'Prórroga de vigencia' ||
              tipo === 'Exclusión de coberturas' ||
              tipo === 'Inclusión de coberturas',
          );

          console.log('🔍 Tipos seleccionados:', this.modificationData.tiposModificacion);
          console.log('🔍 Cantidad de tipos:', this.modificationData.tiposModificacion.length);
          console.log('🔍 Incluye nominativas:', hayModificacionesNominativas);
          console.log(
            '🔍 Modo edición (campos nominativos):',
            this.modificationData.modoEdicion ? 'SÍ (editable)' : 'NO (solo visualización)',
          );
          console.log('🔍 Mostrar coberturas:', this.mostrarCoberturas ? 'SÍ' : 'NO');
          console.log('🔍 Hay modificaciones valor:', this.hayModificacionesValor);
          console.log('🔍 Hay modificaciones vigencia:', this.hayModificacionesVigencia);
        }

        // ✅ AHORA SÍ configurar formularios con el modoEdicion correcto
        this.setupDynamicForms();

        // ✅ Simular carga de datos específicos de la póliza
        this.loadPolizaData(params['numeroPoliza']);
      }
    });
  }

  // ✅ Simular carga de datos de la póliza
  private loadPolizaData(numeroPoliza: string): void {
    console.log('Cargando datos de póliza para modificaciones nominativas:', numeroPoliza);

    // Por ahora usamos datos mock, pero aquí iría la llamada al servicio
    this.modificationData = {
      ...MOCK_POLIZA_DATA,
      numeroPoliza: numeroPoliza,
      tiposModificacion: this.modificationData.tiposModificacion,
      modoEdicion: this.modificationData.modoEdicion,
    };

    // ✅ Actualizar formularios con los datos cargados
    this.updateFormsWithData();
  }

  // ✅ Configurar formularios dinámicos siguiendo tech-block-lib
  private setupDynamicForms(): void {
    this.modificacionesForm = modificacionesNominativasForm(this.modificationData.modoEdicion);
  }

  // ✅ Actualizar formularios con datos cargados
  private updateFormsWithData(): void {
    // Recrear formularios con los nuevos datos
    this.modificacionesForm = modificacionesNominativasForm(this.modificationData.modoEdicion);

    // ✅ Usar setTimeout para asegurar que los formularios estén inicializados
    setTimeout(() => {
      this.loadDataIntoForms();
    }, 100);
  }

  // ✅ Cargar datos en los formularios después de inicialización
  private loadDataIntoForms(): void {
    if (this.modificacionesForm.form) {
      this.modificacionesForm.form.patchValue({
        // Datos generales
        numeroContrato: this.modificationData.datosGenerales.numeroContrato,
        tipoDocumentoTomador: this.modificationData.datosGenerales.tipoDocumentoTomador,
        numeroDocumentoTomador: this.modificationData.datosGenerales.numeroDocumentoTomador,
        nombreTomador: this.modificationData.datosGenerales.nombreTomador,
        moneda: this.modificationData.datosGenerales.moneda,
        tipoDocumentoAsegurado: this.modificationData.datosGenerales.tipoDocumentoAsegurado,
        numeroDocumentoAsegurado: this.modificationData.datosGenerales.numeroDocumentoAsegurado,
        nombreAsegurado: this.modificationData.datosGenerales.nombreAsegurado,
        // Ubicación del riesgo
        departamento: this.modificationData.ubicacionRiesgo.departamento,
        localidadMunicipio: this.modificationData.ubicacionRiesgo.localidadMunicipio,
        direccionRiesgo: this.modificationData.ubicacionRiesgo.direccionRiesgo,
      });
    }
  }

  // ✅ Guardar cambios siguiendo tech-block-lib
  guardarCambios(): void {
    // ✅ Validar formulario
    this.modificacionesForm.libTbCallSubmit?.();

    const formularioValido = this.modificacionesForm.form?.valid ?? false;

    if (!formularioValido) {
      alert('⚠️ Por favor complete todos los campos obligatorios.');
      return;
    }

    // ✅ Recopilar datos del formulario
    const datosActualizados = this.modificacionesForm.form?.value || {};

    console.log('Guardando modificaciones nominativas:', {
      numeroPoliza: this.modificationData.numeroPoliza,
      tiposModificacion: this.modificationData.tiposModificacion,
      modoEdicion: this.modificationData.modoEdicion,
      datosCompletos: datosActualizados,
    });

    alert('✅ Modificaciones nominativas guardadas exitosamente.');

    // ✅ Regresar a la pantalla anterior
    this.volverAModificaciones();
  }

  // ✅ Cancelar modificaciones
  cancelar(): void {
    if (confirm('¿Está seguro que desea cancelar? Se perderán los cambios no guardados.')) {
      this.volverAModificaciones();
    }
  }

  // ✅ Volver a modificaciones
  volverAModificaciones(): void {
    this.router.navigate(['/policy-modification']);
  }

  // ✅ AGREGADO: Métodos para la tabla de coberturas
  trackByCoberturaId(_index: number, cobertura: ICoberturaCumplimiento): number {
    return cobertura.id;
  }

  onCoberturaCheckboxChange(cobertura: ICoberturaCumplimiento, event: any): void {
    cobertura.seleccionado = event.target.checked;
    console.log('Cobertura', cobertura.cobertura, 'seleccionada:', cobertura.seleccionado);
  }

  onPorcentajeChange(cobertura: ICoberturaCumplimiento, event: any): void {
    const nuevoPorcentaje = parseFloat(event.target.value) || 0;
    cobertura.porcentajeAsegurado = nuevoPorcentaje;

    // Recalcular valor asegurado si es necesario
    console.log('Nuevo porcentaje para', cobertura.cobertura, ':', nuevoPorcentaje, '%');
  }

  onValorAseguradoChange(cobertura: ICoberturaCumplimiento, event: any): void {
    const nuevoValor = parseInt(event.target.value.replace(/[^0-9]/g, '')) || 0;
    cobertura.valorAsegurado = nuevoValor;

    console.log('Nuevo valor asegurado para', cobertura.cobertura, ':', nuevoValor);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value);
  }

  // ✅ AGREGADO: Métodos para manejar fechas de vigencia
  onFechaInicioChange(cobertura: ICoberturaCumplimiento, event: any): void {
    const nuevaFecha = event.target.value;
    cobertura.fechaInicio = nuevaFecha;

    console.log('Nueva fecha de inicio para', cobertura.cobertura, ':', nuevaFecha);
  }

  onFechaVencimientoChange(cobertura: ICoberturaCumplimiento, event: any): void {
    const nuevaFecha = event.target.value;
    cobertura.fechaVencimiento = nuevaFecha;

    console.log('Nueva fecha de vencimiento para', cobertura.cobertura, ':', nuevaFecha);
  }

  // ✅ Getter para lista de tipos de modificación para mostrar
  get tiposModificacionTexto(): string {
    return this.modificationData.tiposModificacion.join(', ');
  }

  // ✅ AGREGADO: Verificar si hay modificaciones de valor asegurado
  get hayModificacionesValor(): boolean {
    return this.modificationData.tiposModificacion.some(
      tipo => tipo === 'Aumento de valor asegurado' || tipo === 'Disminución de valor asegurado',
    );
  }

  // ✅ AGREGADO: Verificar si hay modificaciones de vigencia
  get hayModificacionesVigencia(): boolean {
    return this.modificationData.tiposModificacion.some(
      tipo => tipo === 'Disminución de vigencia' || tipo === 'Prórroga de vigencia',
    );
  }

  // ✅ AGREGADO: Verificar si hay modificaciones de coberturas (exclusión/inclusión)
  get hayModificacionesCoberturas(): boolean {
    return this.modificationData.tiposModificacion.some(
      tipo => tipo === 'Exclusión de coberturas' || tipo === 'Inclusión de coberturas',
    );
  }

  // ✅ AGREGADO: Verificar si solo hay modificaciones de vigencia (sin valor ni nominativas)
  get soloModificacionesVigencia(): boolean {
    return (
      this.hayModificacionesVigencia &&
      !this.hayModificacionesValor &&
      !this.modificationData.tiposModificacion.includes('Modificaciones nominativas')
    );
  }
}
