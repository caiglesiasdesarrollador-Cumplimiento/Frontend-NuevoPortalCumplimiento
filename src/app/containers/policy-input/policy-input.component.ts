import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  NgZone,
  ChangeDetectorRef,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import {
  ILibTbStepper,
  ILibTbDynamicForm,
  ILibTbButton,
  ILibTbBreadcrumb,
  ILibTbFileUploadField,
  ILibTbTable,
  ILibTbAccordion,
  ILibTbAccordionTab,
  ILibTbSnackbar,
  ILibTbModal,
  ILibTbInputNumber,
  LibTbStepperModule,
  LibTbDynamicFormModule,
  LibTbButtonModule,
  LibTbBreadcrumbModule,
  LibTbFileUploadFieldModule,
  LibTbTableModule,
  LibTbAccordionModule,
  LibTbSnackbarModule,
  LibTbModalModule,
  LibTbInputNumberModule,
} from 'tech-block-lib';
import { BreadcrumbService, BreadcrumbItem } from '../../shared/services/breadcrumb.service';
import { QuoteService } from '../../shared/services/quote.service';
import { firstValueFrom } from 'rxjs';
import {
  PolicyInputAction,
  ACTION_LABELS,
  ACTION_LABELS_MOBILE,
  INITIAL_STEP2_DATA,
  MOCK_EXTRACTED_CONTRACT_DATA,
  IPolicyStep2Data,
  ActionLabel,
} from './policy-input.interface';
import { step1PolicyInfoForm } from './configs/config-step-1/step1-policy-info.config';
import { step2ContractInfoForm } from './configs/config-step-2/step2-contract-info.config';
import { sarlaftModalConfig } from './configs/sarlaft-modal.config';
import { MOCK_MANAGEMENT_DATA, IPolicyManagementItem } from '../management/management.interface';
import { CoberturasCumplimientoTableComponent } from './configs/config-step-2/components/coberturas-cumplimiento-table.component';
import { SbCalendarModule } from '../../shared/components/sb-calendar/sb-calendar.module';

@Component({
  standalone: true,
  selector: 'app-policy-input',
  templateUrl: './policy-input.component.html',
  styleUrls: ['./policy-input.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    // Tech-block-lib modules
    LibTbStepperModule,
    LibTbDynamicFormModule,
    LibTbButtonModule,
    LibTbBreadcrumbModule,
    LibTbFileUploadFieldModule,
    LibTbTableModule,
    LibTbAccordionModule,
    LibTbSnackbarModule,
    LibTbModalModule,
    LibTbInputNumberModule,
    // Calendario Seguros Bolívar UI
    SbCalendarModule,
    // Componente hijo
    CoberturasCumplimientoTableComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PolicyInputComponent implements OnInit, OnDestroy {
  // ✅ Intervalo para auto-guardado
  private autoSaveInterval: any;
  // ✅ Intervalos para upload de archivos (para limpiar en ngOnDestroy)
  private uploadInterval: any;
  private uploadIntervalEstadosFinancieros: any;

  // ✅ Guardar datos cuando el usuario cierra o recarga la página
  @HostListener('window:beforeunload')
  onBeforeUnload(): void {
    this.guardarDatosFormulario();
  }
  currentStep = 0;
  isViewDetailsMode = false; // ✅ Control del paso actual
  isRcSectionEnabled = true; // ✅ Control de habilitación de la sección RC

  // ✅ Total de prima de coberturas seleccionadas
  totalPrimaSeleccionada = 0;

  // ✅ Variables para Liquidación de Prima
  mostrarTotalPrima = false;
  totalPrimaLiquidada = 0;
  coberturasLiquidadas = 0;

  // ✅ Variables para tracking de cambios
  valoresAnteriores: { [id: number]: any } = {};
  coberturasAnterioresIds: number[] = [];
  cambiosDetectados: any[] = [];
  coberturasNuevas: any[] = [];
  coberturasRemovidas: any[] = [];
  mostrarCambios = false;
  totalPrimaAnterior = 0;
  primeraLiquidacion = true;

  // ✅ Variables para Liquidación de Prima RC
  mostrarTotalPrimaRC = false;
  totalPrimaLiquidadaRC = 0;
  coberturasLiquidadasRC = 0;

  // ✅ Variables para tracking de cambios RC
  valoresAnterioresRC: { [id: number]: any } = {};
  coberturasAnterioresIdsRC: number[] = [];
  cambiosDetectadosRC: any[] = [];
  coberturasNuevasRC: any[] = [];
  coberturasRemovidasRC: any[] = [];
  mostrarCambiosRC = false;
  totalPrimaAnteriorRC = 0;
  primeraLiquidacionRC = true;

  // ✅ Coberturas Cumplimiento con selección
  coberturasCumplimiento = [
    {
      id: 1,
      nombre: 'SERIEDAD DE LA OFERTA',
      porcentaje: 10,
      valorAsegurado: 15000000,
      tasa: 0,
      fechaInicio: '2025-05-05',
      tiempoAdicional: 30,
      fechaFin: '2025-08-05',
      fechaVencimiento: '2025-11-05',
      prima: 150000,
      seleccionada: false,
    },
    {
      id: 2,
      nombre: 'MANEJO DEL ANTICIPO',
      porcentaje: 50,
      valorAsegurado: 75000000,
      tasa: 0,
      fechaInicio: '2025-05-05',
      tiempoAdicional: 60,
      fechaFin: '2025-12-05',
      fechaVencimiento: '2026-05-04',
      prima: 750000,
      seleccionada: false,
    },
    {
      id: 3,
      nombre: 'CUMPLIMIENTO',
      porcentaje: 20,
      valorAsegurado: 30000000,
      tasa: 0,
      fechaInicio: '2025-05-05',
      tiempoAdicional: 45,
      fechaFin: '2025-10-05',
      fechaVencimiento: '2026-05-04',
      prima: 300000,
      seleccionada: false,
    },
    {
      id: 4,
      nombre: 'SALARIOS Y PRESTACIONES SOCIALES',
      porcentaje: 20,
      valorAsegurado: 30000000,
      tasa: 0,
      fechaInicio: '2025-05-05',
      tiempoAdicional: 45,
      fechaFin: '2025-10-05',
      fechaVencimiento: '2026-05-04',
      prima: 300000,
      seleccionada: false,
    },
    {
      id: 5,
      nombre: 'PAGO ANTICIPADO',
      porcentaje: 100,
      valorAsegurado: 150000000,
      tasa: 0,
      fechaInicio: '2025-05-05',
      tiempoAdicional: 120,
      fechaFin: '2026-01-05',
      fechaVencimiento: '2026-05-04',
      prima: 1500000,
      seleccionada: false,
    },
    {
      id: 6,
      nombre: 'ESTABILIDAD DE LA OBRA',
      porcentaje: 30,
      valorAsegurado: 45000000,
      tasa: 0,
      fechaInicio: '2026-05-05',
      tiempoAdicional: 90,
      fechaFin: '2028-05-05',
      fechaVencimiento: '2031-05-04',
      prima: 450000,
      seleccionada: false,
    },
    {
      id: 7,
      nombre: 'CALIDAD DEL SERVICIO',
      porcentaje: 25,
      valorAsegurado: 37500000,
      tasa: 0,
      fechaInicio: '2026-05-05',
      tiempoAdicional: 60,
      fechaFin: '2026-11-05',
      fechaVencimiento: '2027-05-04',
      prima: 375000,
      seleccionada: false,
    },
    {
      id: 8,
      nombre: 'BUEN FUNCIONAMIENTO DE LOS EQUIPOS',
      porcentaje: 15,
      valorAsegurado: 22500000,
      tasa: 0,
      fechaInicio: '2026-05-05',
      tiempoAdicional: 45,
      fechaFin: '2026-10-05',
      fechaVencimiento: '2027-05-04',
      prima: 225000,
      seleccionada: false,
    },
    {
      id: 9,
      nombre: 'SUMINISTRO DE REPUESTOS',
      porcentaje: 10,
      valorAsegurado: 15000000,
      tasa: 0,
      fechaInicio: '2026-05-05',
      tiempoAdicional: 30,
      fechaFin: '2026-09-05',
      fechaVencimiento: '2027-05-04',
      prima: 150000,
      seleccionada: false,
    },
    {
      id: 10,
      nombre: 'CALIDAD DE LOS BIENES SUMINISTRADOS',
      porcentaje: 10,
      valorAsegurado: 15000000,
      tasa: 0,
      fechaInicio: '2026-05-05',
      tiempoAdicional: 30,
      fechaFin: '2026-09-05',
      fechaVencimiento: '2027-05-04',
      prima: 150000,
      seleccionada: false,
    },
  ];

  // ✅ Método para seleccionar/deseleccionar cobertura
  toggleCobertura(cobertura: any): void {
    cobertura.seleccionada = !cobertura.seleccionada;
    this.calcularTotalPrima();
  }

  // ✅ Calcular total de prima seleccionada
  calcularTotalPrima(): void {
    this.totalPrimaSeleccionada = this.coberturasCumplimiento
      .filter(c => c.seleccionada)
      .reduce((total, c) => total + c.prima, 0);
  }

  // ✅ Formatear número con separadores de miles (formato colombiano, sin decimales)
  formatearNumero(valor: number): string {
    if (valor === null || valor === undefined) return '0';
    return Math.round(valor).toLocaleString('es-CO', { maximumFractionDigits: 0 });
  }

  // ✅ Actualizar valor asegurado desde input formateado y recalcular prima
  actualizarValorAsegurado(cob: any, event: any): void {
    const valorFormateado = event.target.value || '0';
    // Remover puntos (separadores de miles) y convertir a número
    const valorLimpio = valorFormateado.replace(/\./g, '').replace(/,/g, '');
    const numero = parseInt(valorLimpio, 10) || 0;
    cob.valorAsegurado = numero;
    this.onCampoCoberturaCambio(cob);
    // Actualizar el valor formateado en el input
    event.target.value = this.formatearNumero(numero);
  }

  // ✅ Recalcular Prima cuando cambian los valores
  recalcularPrimaCobertura(cob: any): void {
    const porcentaje = Number(cob.porcentaje) || 0;
    const valorAsegurado = Number(cob.valorAsegurado) || 0;
    const tasa = Number(cob.tasa) || 0;

    // Fórmula: Prima = Valor Asegurado * Porcentaje / 100 * Factor Tasa
    // Si tasa = 0, usar 1% como factor base (0.01)
    const factorTasa = tasa > 0 ? tasa / 100 : 0.01;
    const prima = ((valorAsegurado * porcentaje) / 100) * factorTasa;

    cob.prima = Math.round(prima);
    console.log(
      `📊 Prima Cumplimiento recalculada: ${cob.nombre} → $${this.formatearNumero(cob.prima)}`,
    );
  }

  // ✅ Método para llamar cuando cambia cualquier campo que afecta la prima
  onCampoCoberturaCambio(cob: any): void {
    const porcentaje = Number(cob.porcentaje) || 0;
    const valorAsegurado = Number(cob.valorAsegurado) || 0;
    const tasa = Number(cob.tasa) || 0;

    // Fórmula: Prima = Valor Asegurado * Porcentaje / 100 * Factor Tasa
    const factorTasa = tasa > 0 ? tasa / 100 : 0.01;
    cob.prima = Math.round(((valorAsegurado * porcentaje) / 100) * factorTasa);

    console.log('🔥 Prima Cumplimiento:', cob.nombre, '→', cob.prima);
    this.cdr.detectChanges();
  }

  // ✅ Obtener Total Prima de coberturas seleccionadas (en tiempo real)
  getTotalPrimaSeleccionadas(): number {
    return this.coberturasCumplimiento
      .filter(c => c.seleccionada)
      .reduce((total, c) => total + (Number(c.prima) || 0), 0);
  }

  // ✅ Obtener Total Prima de Cumplimiento (solo seleccionadas)
  getTotalPrimaCumplimiento(): number {
    return this.coberturasCumplimiento
      .filter(c => c.seleccionada)
      .reduce((total, c) => total + (Number(c.prima) || 0), 0);
  }

  // ✅ Obtener cantidad de coberturas seleccionadas
  getCoberturasSeleccionadasCount(): number {
    return this.coberturasCumplimiento.filter(c => c.seleccionada).length;
  }

  // ✅ Obtener total participación de agentes adicionales (para Paso 3)
  getTotalParticipacionAgentes(): number {
    return this.agentesAdicionales.reduce(
      (total, agente) => total + (Number(agente.participacion) || 0),
      0,
    );
  }

  // ✅ Obtener total participación de coaseguros cedidos (para Paso 3)
  getTotalParticipacionCoaseguro(): number {
    return this.coasegurosCedidos.reduce(
      (total, coa) => total + (Number(coa.participacion) || 0),
      0,
    );
  }

  // ✅ Liquidar Prima - Calcula, muestra el total y detecta cambios
  liquidarPrima(): void {
    const coberturasSeleccionadas = this.coberturasCumplimiento.filter(c => c.seleccionada);

    if (coberturasSeleccionadas.length === 0) {
      this.showErrorNotification('Debe seleccionar al menos una cobertura para liquidar');
      this.mostrarTotalPrima = false;
      this.mostrarCambios = false;
      return;
    }

    const idsActuales = coberturasSeleccionadas.map(c => c.id);

    // Resetear cambios
    this.cambiosDetectados = [];
    this.coberturasNuevas = [];
    this.coberturasRemovidas = [];

    // Detectar cambios si ya se había liquidado antes
    if (!this.primeraLiquidacion) {
      // Detectar coberturas NUEVAS (no estaban antes)
      coberturasSeleccionadas.forEach(cob => {
        if (!this.coberturasAnterioresIds.includes(cob.id)) {
          this.coberturasNuevas.push({
            nombre: cob.nombre,
            prima: cob.prima,
          });
        }
      });

      // Detectar coberturas REMOVIDAS (estaban antes pero ya no)
      this.coberturasAnterioresIds.forEach(id => {
        if (!idsActuales.includes(id)) {
          const cob = this.coberturasCumplimiento.find(c => c.id === id);
          if (cob) {
            this.coberturasRemovidas.push({
              nombre: cob.nombre,
              prima: this.valoresAnteriores[id]?.prima || 0,
            });
          }
        }
      });

      // Detectar MODIFICACIONES en coberturas que ya estaban
      coberturasSeleccionadas.forEach(cob => {
        const anterior = this.valoresAnteriores[cob.id];
        if (anterior && this.coberturasAnterioresIds.includes(cob.id)) {
          const cambios: string[] = [];

          if (Number(anterior.porcentaje) !== Number(cob.porcentaje)) {
            cambios.push(`% Aseg: ${anterior.porcentaje}% → ${cob.porcentaje}%`);
          }
          if (Number(anterior.valorAsegurado) !== Number(cob.valorAsegurado)) {
            cambios.push(
              `Valor Aseg: ${this.formatCurrency(anterior.valorAsegurado)} → ${this.formatCurrency(cob.valorAsegurado)}`,
            );
          }
          if (Number(anterior.tasa) !== Number(cob.tasa)) {
            cambios.push(`Tasa: ${anterior.tasa}% → ${cob.tasa}%`);
          }
          if (anterior.tiempoAdicional !== cob.tiempoAdicional) {
            cambios.push(`T. Adic: ${anterior.tiempoAdicional} → ${cob.tiempoAdicional}`);
          }
          if (Number(anterior.prima) !== Number(cob.prima)) {
            cambios.push(
              `Prima: ${this.formatCurrency(anterior.prima)} → ${this.formatCurrency(cob.prima)}`,
            );
          }

          if (cambios.length > 0) {
            this.cambiosDetectados.push({
              nombre: cob.nombre,
              cambios: cambios,
            });
          }
        }
      });
    }

    // Guardar valores actuales para la próxima comparación
    this.totalPrimaAnterior = this.totalPrimaLiquidada;
    this.coberturasAnterioresIds = [...idsActuales];
    coberturasSeleccionadas.forEach(cob => {
      this.valoresAnteriores[cob.id] = {
        porcentaje: cob.porcentaje,
        valorAsegurado: cob.valorAsegurado,
        tasa: cob.tasa,
        tiempoAdicional: cob.tiempoAdicional,
        prima: cob.prima,
      };
    });

    this.totalPrimaLiquidada = this.getTotalPrimaSeleccionadas();
    this.coberturasLiquidadas = coberturasSeleccionadas.length;
    this.mostrarTotalPrima = true;
    this.mostrarCambios =
      this.cambiosDetectados.length > 0 ||
      this.coberturasNuevas.length > 0 ||
      this.coberturasRemovidas.length > 0;
    this.primeraLiquidacion = false;

    // ✅ Ocultar cambios después de 5 segundos
    if (this.mostrarCambios) {
      setTimeout(() => {
        this.mostrarCambios = false;
      }, 5000);
    }

    console.log(`💰 Total Prima Liquidada: ${this.totalPrimaLiquidada}`);
    this.showSuccessNotification(
      `Prima liquidada: ${this.formatCurrency(this.totalPrimaLiquidada)}`,
    );
  }

  // ✅ Seleccionar/deseleccionar todas
  toggleTodasCoberturas(event: any): void {
    const seleccionar = event.target.checked;
    this.coberturasCumplimiento.forEach(c => (c.seleccionada = seleccionar));
    this.calcularTotalPrima();
  }

  // ✅ Limpiar selección de coberturas y todo el estado
  limpiarSeleccionCoberturas(): void {
    // Limpiar selección
    this.coberturasCumplimiento.forEach(c => (c.seleccionada = false));

    // Limpiar totales
    this.totalPrimaSeleccionada = 0;
    this.totalPrimaLiquidada = 0;
    this.coberturasLiquidadas = 0;

    // Ocultar secciones
    this.mostrarTotalPrima = false;
    this.mostrarCambios = false;

    // Limpiar tracking de cambios
    this.valoresAnteriores = {};
    this.coberturasAnterioresIds = [];
    this.cambiosDetectados = [];
    this.coberturasNuevas = [];
    this.coberturasRemovidas = [];
    this.primeraLiquidacion = true;
    this.totalPrimaAnterior = 0;

    // Mostrar notificación
    this.showSuccessNotification('✅ Selección y datos limpiados');
  }

  // ✅ Actualizar coberturas
  actualizarCoberturas(): void {
    this.snackbarConfig = {
      ...this.snackbarConfig,
      show: true,
      message: '✅ Coberturas actualizadas',
      class: 'snackbar-success-theme',
    };
  }

  // ✅ Guardar coberturas seleccionadas
  guardarCoberturas(): void {
    const seleccionadas = this.coberturasCumplimiento.filter(c => c.seleccionada);
    if (seleccionadas.length === 0) {
      this.snackbarConfig = {
        ...this.snackbarConfig,
        show: true,
        message: '⚠️ Debe seleccionar al menos una cobertura',
        class: 'snackbar-warning-theme',
      };
      return;
    }
    console.log('💾 Guardando coberturas:', seleccionadas);
    this.snackbarConfig = {
      ...this.snackbarConfig,
      show: true,
      message: `✅ ${seleccionadas.length} coberturas guardadas correctamente`,
      class: 'snackbar-success-theme',
    };
  }
  rcAccordionOpen = true; // ✅ Control del acordeón RC
  action: PolicyInputAction = PolicyInputAction.COTIZAR;

  // ✅ CACHE del actionLabel para evitar ExpressionChangedAfterItHasBeenCheckedError
  private _cachedActionLabel: ActionLabel = ACTION_LABELS[PolicyInputAction.COTIZAR];
  private _cachedIsMobile = false;

  // ✅ NUEVA PROPIEDAD: Control de habilitación del formulario
  isFormEnabled = true; // Habilitado por defecto ya que cotizar está seleccionado

  // ✅ Datos para simular carga de archivo y extracción
  fileName: string | null = null;
  isProcessing = false;
  step2Data: IPolicyStep2Data = INITIAL_STEP2_DATA;

  // ✅ Control de validación del archivo de contrato
  isContractFileRequired = true;
  contractFileError = false;

  // ✅ RF-008: Constantes de validación de archivo
  readonly MAX_FILE_NAME_LENGTH = 255; // Máximo de caracteres del nombre del archivo (ajustar según requerimiento de arquitectura)
  showAlertaEliminarArchivo = false; // Flag para mostrar confirmación de eliminación

  // ✅ Propiedades para el formulario paso 1
  tipoProducto = '';
  claveIntermediario = '';

  // ✅ Valor del Contrato (con incremento/decremento)
  valorContrato = 150000000; // Valor inicial: $150.000.000
  incrementoContrato = 10000000; // Incremento de $10.000.000

  // ✅ DROPDOWNS PERSONALIZADOS - Control de apertura
  dropdownsOpen: { [key: string]: boolean } = {};
  claveIntermediarioError = false;

  // ✅ Lista de claves del intermediario (un intermediario puede tener múltiples claves)
  clavesIntermediario: { codigo: string; nombre: string }[] = [
    { codigo: '53940', nombre: 'Agente Principal - Zona Norte' },
    { codigo: '53941', nombre: 'Agente Secundario - Zona Centro' },
    { codigo: '53942', nombre: 'Agente Comercial - Zona Sur' },
    { codigo: '12345', nombre: 'Sucursal Bogotá' },
    { codigo: '67890', nombre: 'Sucursal Medellín' },
    { codigo: '11223', nombre: 'Sucursal Cali' },
  ];
  nombreIntermediario = '';
  selectedFileName: string | null = null;
  selectedFile: File | null = null;
  isUploading = false;
  uploadProgress = 0;
  formSubmitted = false; // Control de validación
  showSuccessModal = false; // Modal de éxito al avanzar al paso 2

  // ✅ DOCUMENTOS SOPORTE - Sistema optimizado
  tipoDocumentoSoporte = '';
  archivoDocumentoTemp: File | null = null;
  isDraggingDocumento = false;

  // ✅ Toast mejorado para mensajes de validación
  showToast = false;
  toastMessage = '';
  toastTitle = '';
  toastType: 'warning' | 'error' | 'success' | 'info' = 'warning';
  showFormatosPermitidos = false;
  documentosSoporte: { tipo: string; nombreArchivo: string; fecha: string; archivo: File }[] = [];

  tiposDocumentoSoporte: { [key: string]: string } = {
    '1': 'PLIEGO',
    '2': 'OFERTA MERCANTIL',
    '3': 'CONTRATO',
  };

  // Campos adicionales para Grandes Beneficiarios
  tipoDocumentoAsegurado = '';
  numeroDocumentoAsegurado = '';
  tipoDocumentoTomador = '';
  numeroDocumentoTomador = '';
  programaParametrizado = '';
  programaSeleccionado = '';

  // ✅ Campos de fecha con calendario Seguros Bolívar UI
  fechaInicioContrato = '';
  fechaFinContrato = '';
  fechaInicioRC = '2024-08-01';
  fechaFinRC = '2025-07-31';

  // ✅ Búsqueda de nombres Tomador/Asegurado
  nombreTomador = '';
  nombreAsegurado = '';
  buscandoTomador = false;
  buscandoAsegurado = false;

  // ✅ Errores de validación de documentos
  errorDocumentoTomador = '';
  errorDocumentoAsegurado = '';

  // ✅ Reglas de validación de documentos Colombia
  documentValidationRules: {
    [key: string]: { min: number; max: number; pattern: RegExp; message: string; formato: string };
  } = {
    'CC': {
      min: 6,
      max: 10,
      pattern: /^[0-9]+$/,
      message: 'Cédula de Ciudadanía debe tener entre 6 y 10 dígitos numéricos',
      formato: 'Solo números (6-10 dígitos)',
    },
    'CE': {
      min: 6,
      max: 7,
      pattern: /^[0-9]+$/,
      message: 'Cédula de Extranjería debe tener entre 6 y 7 dígitos numéricos',
      formato: 'Solo números (6-7 dígitos)',
    },
    'NIT': {
      min: 9,
      max: 11,
      pattern: /^[0-9]{9}(-[0-9])?$/,
      message: 'NIT debe tener 9 dígitos, opcionalmente con dígito verificador (ej: 900123456-7)',
      formato: '9 dígitos o 9 dígitos-DV',
    },
    'PA': {
      min: 5,
      max: 17,
      pattern: /^[A-Za-z0-9]+$/,
      message: 'Pasaporte debe tener entre 5 y 17 caracteres alfanuméricos',
      formato: 'Alfanumérico (5-17 caracteres)',
    },
    'TI': {
      min: 10,
      max: 11,
      pattern: /^[0-9]+$/,
      message: 'Tarjeta de Identidad debe tener entre 10 y 11 dígitos numéricos',
      formato: 'Solo números (10-11 dígitos)',
    },
  };

  // ✅ Modales Cliente no creado y SARLAFT
  showClienteNoCreado = false;
  showSarlaftDesactualizado = false;
  celularCliente = '';
  celularAsesor = '';
  correoTomador = '';
  correoAsesor = '';

  // ✅ Modal: Solicitar Cupo (cuando el tomador no tiene cupo disponible)
  showSolicitarCupo = false;
  estadosFinancierosFile: File | null = null;
  estadosFinancierosFileName: string | null = null;
  actividadEconomica = '';
  actividadEconomicaRC = ''; // Actividad económica para contrato RC
  isUploadingEstadosFinancieros = false;
  uploadProgressEstadosFinancieros = 0;

  // ✅ Lista de actividades económicas CIIU
  actividadesEconomicas = [
    { codigo: 'A', nombre: 'Agricultura, ganadería, caza, silvicultura y pesca' },
    { codigo: 'B', nombre: 'Explotación de minas y canteras' },
    { codigo: 'C', nombre: 'Industrias manufactureras' },
    { codigo: 'D', nombre: 'Suministro de electricidad, gas, vapor y aire acondicionado' },
    { codigo: 'E', nombre: 'Gestión de desechos y actividades de saneamiento ambiental' },
    { codigo: 'F', nombre: 'Construcción' },
    { codigo: 'G', nombre: 'Comercio al por mayor y al por menor' },
    { codigo: 'H', nombre: 'Transporte y almacenamiento' },
    { codigo: 'I', nombre: 'Alojamiento y servicios de comida' },
    { codigo: 'J', nombre: 'Información y comunicaciones' },
    { codigo: 'K', nombre: 'Financieras y de seguros' },
    { codigo: 'L', nombre: 'Actividades inmobiliarias' },
    { codigo: 'M', nombre: 'Actividades profesionales, científicas y técnicas' },
    { codigo: 'N', nombre: 'Actividades de servicios administrativos y de apoyo' },
    { codigo: 'O', nombre: 'Administración pública y defensa' },
    { codigo: 'P', nombre: 'Educación' },
    { codigo: 'Q', nombre: 'Salud humana y asistencia social' },
    { codigo: 'R', nombre: 'Actividades artísticas, de entretenimiento y recreación' },
    { codigo: 'S', nombre: 'Otras actividades de servicios' },
    { codigo: 'T', nombre: 'Actividades de los hogares individuales en calidad de empleadores' },
    { codigo: 'U', nombre: 'Actividades de organizaciones y entidades extraterritoriales' },
  ];

  // ✅ Agente Líder - Datos de prueba
  liderClave = '53940';
  liderNombre = 'JUAN CARLOS MARTINEZ LOPEZ';
  liderParticipacion = 10; // ✅ Participación fija del líder
  liderComisionPactada = 10;
  liderFormaActuacion = 'Directa';
  liderConvenio = 'Convenio General';

  // ✅ Datos Adicionales de la Póliza
  tipoContragarantia = '';
  numeroContragarantia = '';

  // ✅ Ubicación del Riesgo - Campo unificado Ciudad-Departamento
  ubicacionRiesgoSeleccionada = 'BOGOTÁ D.C. - CUNDINAMARCA';
  direccionRiesgo = '';
  listaUbicacionesRiesgo = [
    'BOGOTÁ D.C. - CUNDINAMARCA',
    'MEDELLÍN - ANTIOQUIA',
    'CALI - VALLE DEL CAUCA',
    'BARRANQUILLA - ATLÁNTICO',
    'CARTAGENA - BOLÍVAR',
    'BUCARAMANGA - SANTANDER',
    'CÚCUTA - NORTE DE SANTANDER',
    'PEREIRA - RISARALDA',
    'MANIZALES - CALDAS',
    'IBAGUÉ - TOLIMA',
    'NEIVA - HUILA',
    'VILLAVICENCIO - META',
    'PASTO - NARIÑO',
    'MONTERÍA - CÓRDOBA',
    'SANTA MARTA - MAGDALENA',
    'ARMENIA - QUINDÍO',
    'POPAYÁN - CAUCA',
    'SINCELEJO - SUCRE',
    'VALLEDUPAR - CESAR',
    'TUNJA - BOYACÁ',
    'FLORENCIA - CAQUETÁ',
    'QUIBDÓ - CHOCÓ',
    'RIOHACHA - LA GUAJIRA',
    'YOPAL - CASANARE',
    'MOCOA - PUTUMAYO',
    'ARAUCA - ARAUCA',
    'SAN JOSÉ DEL GUAVIARE - GUAVIARE',
    'LETICIA - AMAZONAS',
    'MITÚ - VAUPÉS',
    'PUERTO CARREÑO - VICHADA',
    'INÍRIDA - GUAINÍA',
    'SAN ANDRÉS - SAN ANDRÉS Y PROVIDENCIA',
  ];

  // ✅ Coaseguro
  tipoCoaseguro = 'sin-coaseguro'; // 'sin-coaseguro' | 'cedido' | 'aceptado'

  // Coaseguro Cedido
  coasegurosCedidos: any[] = [];
  showModalCoaseguroCedido = false;
  coaseguroCedidoCoaseguradora = '';
  coaseguroCedidoParticipacion = 0;
  coaseguroCedidoGastosAdmin = 0;
  coaseguroCedidoNumeroPol = '';
  coaseguroCedidoCertificado = '';
  coaseguroCedidoEditIndex: number | null = null; // Para edición

  // Alerta de confirmación para eliminar coaseguro
  showAlertaEliminarCoaseguro = false;
  coaseguroAEliminarIndex: number | null = null;

  // Ordenamiento y Paginación Coaseguros Cedidos
  coasegurosCedidosSortColumn = '';
  coasegurosCedidosSortDirection: 'asc' | 'desc' = 'asc';
  coasegurosCedidosPage = 1;
  coasegurosCedidosPageSize = 5;

  // Coaseguro Aceptado
  coaseguroAceptadoCoaseguradora = '';
  coaseguroAceptadoNumeroPol = '';
  coaseguroAceptadoCertificado = '';
  coaseguroAceptadoParticipacion = 20;

  // Lista de coaseguradoras (para adicionar - NO incluye Bolívar porque es fijo)
  listaCoaseguradoras = [
    { codigo: '1', nombre: '1 - ALLIANZ SEGUROS S.A.' },
    { codigo: '2', nombre: '2 - SEGUROS GENERALES SURAMERICANA S.A.' },
    { codigo: '3', nombre: '3 - AXA COLPATRIA S.A.' },
    { codigo: '7', nombre: '7 - LA PREVISORA S.A. COMPAÑIA DE SEGUROS' },
    { codigo: '11', nombre: '11 - ROYAL & SUN ALLIANCE SEGUROS COLOMBIA S.A.' },
    { codigo: '19', nombre: '19 - ZLS ASEGURADORA DE COLOMBIA S.A.' },
    { codigo: '20', nombre: '20 - AGRICOLA DE SEGUROS' },
    { codigo: '21', nombre: '21 - CONDOR CIA DE SEGUROS GENERALES' },
    { codigo: '22', nombre: '22 - HDI SEGUROS S.A.' },
    { codigo: '23', nombre: '23 - SEGUROS ATLAS SEGUROS GENERALES' },
    { codigo: '24', nombre: '24 - LIBERTY SEGUROS S.A.' },
    { codigo: '26', nombre: '26 - SEGUROS DEL ESTADO S.A.' },
    { codigo: '28', nombre: '28 - MAPFRE SEGUROS GENERALES DE COLOMBIA S.A.' },
    { codigo: '29', nombre: '29 - SEGUROS ALFA S.A.' },
    { codigo: '33', nombre: '33 - LA EQUIDAD SEGUROS GENERALES' },
  ];

  // Coaseguradora Bolívar (siempre fija cuando es Cedido)
  readonly COASEGURADORA_BOLIVAR = '999 - SEGUROS COMERCIALES BOLIVAR S.A.';

  // ✅ Agentes adicionales
  agentesAdicionales: any[] = [];
  showModalAgente = false;
  agenteClave = '';
  agenteNombre = '';
  agenteParticipacion = 0;
  agenteFormaActuacion = '';
  agenteConvenio = '';
  errorParticipacion = '';
  agenteEditIndex: number | null = null;

  // ✅ Ordenamiento de tabla de agentes
  agentesSortColumn: string = '';
  agentesSortDirection: 'asc' | 'desc' = 'asc';

  // ✅ Ordenamiento de tabla de cotizaciones
  cotizacionesSortColumn: string = '';
  cotizacionesSortDirection: 'asc' | 'desc' = 'asc';

  // ✅ Método para calcular el porcentaje disponible
  get porcentajeDisponible(): number {
    const totalAgentes = this.agentesAdicionales.reduce((sum, a) => sum + a.participacion, 0);
    // Si estamos editando, excluir la participación del agente que se está editando
    if (this.agenteEditIndex !== null) {
      const participacionActual = this.agentesAdicionales[this.agenteEditIndex]?.participacion || 0;
      return 100 - this.liderParticipacion - totalAgentes + participacionActual;
    }
    return 100 - this.liderParticipacion - totalAgentes;
  }

  // ✅ Control de loading para el botón de generar cotización
  loading = false;

  // ✅ Control de vista de resumen de cotización
  showQuoteSummary = false;
  quoteSummaryData: any = null;

  // ✅ Control para mostrar sección de grandes beneficiarios
  showGrandesBeneficiarios = false;

  // ✅ Objeto del contrato (sincronizado con RC)
  objetoContratoValue =
    'Prestación de servicios de consultoría en cumplimiento normativo y asesoría legal para la implementación de políticas de cumplimiento empresarial, incluyendo la elaboración de manuales de procedimientos.';

  // ✅ USANDO TECH-BLOCK-LIB: Configuración del snackbar para notificaciones
  snackbarConfig: ILibTbSnackbar = {
    show: false,
    message: '',
    position: 'top-right',
    orientation: 'horizontal',
    life: 5000, // 5 segundos
    autoZIndex: true,
    baseZIndex: 1000,
    showTransitionOptions: '300ms ease-out',
    hideTransitionOptions: '250ms ease-in',
    class: 'snackbar-success-theme',
  };

  // ✅ USANDO TECH-BLOCK-LIB: Configuración del modal SARLAFT (se inicializa dinámicamente)
  sarlaftModal: ILibTbModal = sarlaftModalConfig(this.action);

  // ✅ NUEVO: Modal para "Cliente no creado" (se inicializa dinámicamente)
  clienteNoCreadoModal: ILibTbModal = this.createClienteNoCreadoModalConfig();

  // ✅ Propiedades para el modal SARLAFT
  sarlaftClientPhone = '';
  sarlaftAdvisorPhone = '';

  // ✅ Configuraciones para inputs de número del modal SARLAFT
  sarlaftClientPhoneInput: ILibTbInputNumber = {
    name: 'sarlaftClientPhone',
    label: 'Celular cliente',
    ngModel: undefined,
    placeholder: 'Ingresa el número de celular del cliente',
    maxlength: 10,
    required: true,
    showButtons: false,
    format: false,
    class: 'w-full',
    libTbChange: (value: number) => {
      this.sarlaftClientPhone = value?.toString() || '';
    },
  };

  sarlaftAdvisorPhoneInput: ILibTbInputNumber = {
    name: 'sarlaftAdvisorPhone',
    label: 'Número celular asesor',
    ngModel: undefined,
    placeholder: 'Ingresa el número de celular del asesor',
    maxlength: 10,
    required: true,
    showButtons: false,
    format: false,
    class: 'w-full',
    libTbChange: (value: number) => {
      this.sarlaftAdvisorPhone = value?.toString() || '';
    },
  };

  // ✅ USANDO TECH-BLOCK-LIB: Configuración del acordeón para sección RC
  rcAccordionConfig: ILibTbAccordion = {
    multiple: false, // Solo un tab activo a la vez
    expandIcon: 'fa-solid fa-chevron-down',
    collapseIcon: 'fa-solid fa-chevron-up',
    class: 'rc-accordion',
    libTbActiveIndexChange: (index: number) => {
      // Solo expandir/contraer cuando el checkbox está habilitado
      if (this.isRcSectionEnabled) {
        console.log('Acordeón RC cambió a índice:', index);
      }
    },
  };

  // ✅ USANDO TECH-BLOCK-LIB: Configuración del tab del acordeón RC
  rcAccordionTab: ILibTbAccordionTab = {
    header: 'Detalles RC y Coberturas',
    selected: true, // Inicialmente expandido
    disabled: false,
    icon: 'fa-solid fa-file-contract',
    libTbSelectedChange: (e: any) => {
      console.log('Tab RC seleccionado/deseleccionado:', e);
    },
  };

  // ✅ Configuración de breadcrumb
  breadcrumbConfig: ILibTbBreadcrumb = {
    items: [],
  };

  // ✅ Configuración para las opciones Cotizar y Emitir
  selectedAction: 'cotizar' | 'emitir' | null = 'cotizar'; // ✅ Cotizar seleccionado por defecto
  selectedEmitirOption: 'cotizacion-existente' | 'poliza-nueva' | null = null;

  // ✅ Vista de tabla de cotizaciones existentes
  showCotizacionesTable = false;
  showCotizacionDetalle = false;
  cotizacionSeleccionada: any = null;

  // ✅ Filtro de búsqueda único para cotizaciones
  filtroBusquedaCotizacion = '';
  cotizacionesFiltradas: any[] = [];

  // ✅ Datos mock de cotizaciones existentes
  cotizacionesExistentes = [
    {
      id: 'COT-2024-001',
      tipo: 'Cotización',
      numero: 'COT-2024-001',
      tomador: { nombre: 'Empresa XYZ Ltda', documento: '900654321-2' },
      producto: 'Responsabilidad Civil',
      valorAsegurado: 300000000,
      estado: 'Cotizada',
      fechaCreacion: '19/1/2024',
      cupoDisponible: 1200000000,
      datosGenerales: {
        numeroContrato: 'CONT-GENERAL-2024-001',
        tipoDocTomador: 'NIT',
        numDocTomador: '900654321-2',
        nombreTomador: 'Empresa XYZ Ltda',
        moneda: 'COP',
        tipoDocAsegurado: 'NIT',
        numDocAsegurado: '900654321-2',
        nombreAsegurado: 'Empresa XYZ Ltda',
      },
      ubicacionRiesgo: {
        departamento: 'Antioquia',
        municipio: 'Medellín',
        direccion: 'Calle 50 # 25-30, Centro',
      },
      detallesContrato: {
        valorContrato: 300000000,
        fechaInicio: '2024-02-15',
        duracion: '12 meses',
        fechaFin: '2025-02-15',
      },
      coberturasCumplimiento: [
        {
          cobertura: 'Seriedad De La Oferta',
          porcentaje: '5%',
          valorAsegurado: 150000000,
          estado: 'Activa',
        },
        {
          cobertura: 'Cumplimiento',
          porcentaje: '10%',
          valorAsegurado: 300000000,
          estado: 'Activa',
        },
        {
          cobertura: 'Calidad Del Servicio',
          porcentaje: '7%',
          valorAsegurado: 200000000,
          estado: 'Activa',
        },
      ],
      responsabilidadCivil: [
        {
          cobertura: 'Contratista Y Subcontratista',
          porcentaje: '15%',
          valorAsegurado: 500000000,
          estado: 'Activa',
        },
        {
          cobertura: 'Gastos Medicos Persona',
          porcentaje: '3%',
          valorAsegurado: 100000000,
          estado: 'Activa',
        },
        {
          cobertura: 'Contaminación Accidental',
          porcentaje: '6%',
          valorAsegurado: 200000000,
          estado: 'Activa',
        },
      ],
      resumenCostos: {
        primaNeta: 2100000,
        iva: 399000,
        primaTotal: 2499000,
      },
    },
    {
      id: 'COT-2024-002',
      tipo: 'Cotización',
      numero: 'COT-2024-002',
      tomador: { nombre: 'Servicios DEF S.A.S', documento: '900987654-3' },
      producto: 'Buen Manejo y Correcta Inversión',
      valorAsegurado: 750000000,
      estado: 'Borrador',
      fechaCreacion: '15/1/2024',
      cupoDisponible: 950000000,
      datosGenerales: {
        numeroContrato: 'CONT-GENERAL-2024-002',
        tipoDocTomador: 'NIT',
        numDocTomador: '900987654-3',
        nombreTomador: 'Servicios DEF S.A.S',
        moneda: 'COP',
        tipoDocAsegurado: 'NIT',
        numDocAsegurado: '900987654-3',
        nombreAsegurado: 'Servicios DEF S.A.S',
      },
      ubicacionRiesgo: {
        departamento: 'Cundinamarca',
        municipio: 'Bogotá',
        direccion: 'Carrera 15 # 100-20',
      },
      detallesContrato: {
        valorContrato: 750000000,
        fechaInicio: '2024-03-01',
        duracion: '18 meses',
        fechaFin: '2025-09-01',
      },
      coberturasCumplimiento: [
        {
          cobertura: 'Buen Manejo',
          porcentaje: '10%',
          valorAsegurado: 750000000,
          estado: 'Activa',
        },
      ],
      responsabilidadCivil: [],
      resumenCostos: {
        primaNeta: 3500000,
        iva: 665000,
        primaTotal: 4165000,
      },
    },
    {
      id: 'COT-2024-003',
      tipo: 'Cotización',
      numero: 'COT-2024-003',
      tomador: { nombre: 'Constructora Integral M...', documento: '900444555-8' },
      producto: 'Cumplimiento de Contrato',
      valorAsegurado: 850000000,
      estado: 'Cotizada',
      fechaCreacion: '10/1/2024',
      cupoDisponible: 800000000,
      datosGenerales: {
        numeroContrato: 'CONT-GENERAL-2024-003',
        tipoDocTomador: 'NIT',
        numDocTomador: '900444555-8',
        nombreTomador: 'Constructora Integral Moderna S.A.S',
        moneda: 'COP',
        tipoDocAsegurado: 'NIT',
        numDocAsegurado: '900444555-8',
        nombreAsegurado: 'Constructora Integral Moderna S.A.S',
      },
      ubicacionRiesgo: {
        departamento: 'Valle del Cauca',
        municipio: 'Cali',
        direccion: 'Avenida 6N # 35-25',
      },
      detallesContrato: {
        valorContrato: 850000000,
        fechaInicio: '2024-01-15',
        duracion: '24 meses',
        fechaFin: '2026-01-15',
      },
      coberturasCumplimiento: [
        {
          cobertura: 'Cumplimiento',
          porcentaje: '15%',
          valorAsegurado: 850000000,
          estado: 'Activa',
        },
      ],
      responsabilidadCivil: [],
      resumenCostos: {
        primaNeta: 4200000,
        iva: 798000,
        primaTotal: 4998000,
      },
    },
    {
      id: 'COT-2024-004',
      tipo: 'Cotización',
      numero: 'COT-2024-004',
      tomador: { nombre: 'Telecomunicaciones PQR...', documento: '900777888-5' },
      producto: 'Seriedad de Oferta',
      valorAsegurado: 450000000,
      estado: 'Cotizada',
      fechaCreacion: '05/1/2024',
      cupoDisponible: 1500000000,
      datosGenerales: {
        numeroContrato: 'CONT-GENERAL-2024-004',
        tipoDocTomador: 'NIT',
        numDocTomador: '900777888-5',
        nombreTomador: 'Telecomunicaciones PQR S.A',
        moneda: 'COP',
        tipoDocAsegurado: 'NIT',
        numDocAsegurado: '900777888-5',
        nombreAsegurado: 'Telecomunicaciones PQR S.A',
      },
      ubicacionRiesgo: {
        departamento: 'Atlántico',
        municipio: 'Barranquilla',
        direccion: 'Calle 72 # 50-10',
      },
      detallesContrato: {
        valorContrato: 450000000,
        fechaInicio: '2024-02-01',
        duracion: '6 meses',
        fechaFin: '2024-08-01',
      },
      coberturasCumplimiento: [
        {
          cobertura: 'Seriedad de Oferta',
          porcentaje: '5%',
          valorAsegurado: 450000000,
          estado: 'Activa',
        },
      ],
      responsabilidadCivil: [],
      resumenCostos: {
        primaNeta: 1800000,
        iva: 342000,
        primaTotal: 2142000,
      },
    },
    {
      id: 'COT-2024-005',
      tipo: 'Cotización',
      numero: 'COT-2024-005',
      tomador: { nombre: 'Servicios Hospitalarios S...', documento: '900333444-6' },
      producto: 'Calidad del Servicio',
      valorAsegurado: 620000000,
      estado: 'Cotizada',
      fechaCreacion: '02/1/2024',
      cupoDisponible: 1100000000,
      datosGenerales: {
        numeroContrato: 'CONT-GENERAL-2024-005',
        tipoDocTomador: 'NIT',
        numDocTomador: '900333444-6',
        nombreTomador: 'Servicios Hospitalarios del Norte S.A.S',
        moneda: 'COP',
        tipoDocAsegurado: 'NIT',
        numDocAsegurado: '900333444-6',
        nombreAsegurado: 'Servicios Hospitalarios del Norte S.A.S',
      },
      ubicacionRiesgo: {
        departamento: 'Santander',
        municipio: 'Bucaramanga',
        direccion: 'Carrera 27 # 36-45',
      },
      detallesContrato: {
        valorContrato: 620000000,
        fechaInicio: '2024-03-15',
        duracion: '12 meses',
        fechaFin: '2025-03-15',
      },
      coberturasCumplimiento: [
        {
          cobertura: 'Calidad del Servicio',
          porcentaje: '8%',
          valorAsegurado: 620000000,
          estado: 'Activa',
        },
      ],
      responsabilidadCivil: [],
      resumenCostos: {
        primaNeta: 2480000,
        iva: 471200,
        primaTotal: 2951200,
      },
    },
  ];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly breadcrumbService: BreadcrumbService,
    private readonly quoteService: QuoteService,
    private readonly ngZone: NgZone,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    console.log('🚀 POLICY-INPUT: ngOnInit ejecutado');
    console.log('🔍 Estado inicial:', {
      currentStep: this.currentStep,
      isViewDetailsMode: this.isViewDetailsMode,
      selectedAction: this.selectedAction,
    });

    // ✅ CARGAR DATOS GUARDADOS si existen (persistencia al recargar)
    this.cargarDatosFormulario();

    // ✅ Iniciar auto-guardado periódico
    this.iniciarAutoGuardado();

    // ✅ Inicializar cache del actionLabel
    this.updateCachedActionLabel();

    // ✅ Inicializar cotizaciones filtradas
    this.cotizacionesFiltradas = [...this.cotizacionesExistentes];

    this.setupBreadcrumb();

    // ✅ Obtener parámetros desde query parameters
    this.route.queryParams.subscribe(params => {
      console.log('🔍 POLICY-INPUT: Query params recibidos:', params);
      this.action = (params['action'] as PolicyInputAction) || PolicyInputAction.COTIZAR;

      // ✅ Actualizar cache del actionLabel cuando cambia la acción
      this.updateCachedActionLabel();

      // ✅ Reconfigurar modal SARLAFT según la acción desde query params
      this.sarlaftModal = sarlaftModalConfig(this.action);

      // ✅ Reconfigurar modal "Cliente no creado" según la acción
      this.clienteNoCreadoModal = this.createClienteNoCreadoModalConfig();

      // ✅ Detectar el tipo de acción
      const isFromModify = params['action'] === 'modificar';
      const isFromViewDetails = params['action'] === 'ver-detalles';
      const itemId = params['id'];
      const targetStep = params['step'];
      const shouldPreload = params['preload'] === 'true';
      const isReadonly = params['readonly'] === 'true';

      console.log('🔍 POLICY-INPUT: isFromModify:', isFromModify);
      console.log('🔍 POLICY-INPUT: isFromViewDetails:', isFromViewDetails);
      console.log('🔍 POLICY-INPUT: itemId:', itemId);
      console.log('🔍 POLICY-INPUT: shouldPreload:', shouldPreload);

      if ((isFromModify || isFromViewDetails) && itemId && shouldPreload) {
        const actionLabel = isFromViewDetails ? 'vista de detalles' : 'modificación';
        console.log(`📝 Cargando datos para ${actionLabel} desde cotización:`, itemId);

        this.loadDataForModification(itemId, isFromViewDetails, isReadonly);

        // Si viene con step específico, ir a ese paso
        if (targetStep) {
          const stepNumber = parseInt(targetStep);
          const stepIndex = stepNumber - 1; // Convertir a índice base 0

          console.log('🔍 POLICY-INPUT: targetStep recibido:', targetStep);
          console.log('🔍 POLICY-INPUT: stepNumber parsed:', stepNumber);
          console.log('🔍 POLICY-INPUT: stepIndex calculado:', stepIndex);

          this.currentStep = stepIndex;
          this.stepperConfig.activeIndex = this.currentStep;

          console.log('🎯 NAVEGANDO directamente al paso:', stepNumber, '(índice:', stepIndex, ')');
          console.log('🎯 currentStep después:', this.currentStep);
          console.log('🎯 stepperConfig.activeIndex después:', this.stepperConfig.activeIndex);
        } else {
          console.log('⚠️ POLICY-INPUT: No se proporcionó targetStep');
        }
      } else {
        // ✅ IMPORTANTE: Solo resetear si NO hay datos guardados en sessionStorage
        if (!this.hayDatosGuardados()) {
          console.log('🔄 No hay datos guardados, reseteando formulario');
          this.resetFormState();
        } else {
          console.log('💾 Hay datos guardados, NO se resetea el formulario');
        }
      }
    });

    // ✅ Inicializar step2Form con la tabla de coberturas y eventos
    // Usar setTimeout para asegurar que el componente esté completamente inicializado
    setTimeout(() => {
      this.updateStep2Form();
    }, 100);

    // ✅ Inicializar con "cotizar" seleccionado por defecto
    this.selectAction('cotizar');

    // ✅ Suscribirse a cambios del formulario del paso 1 para detectar cambios en el producto
    // Usar setTimeout para asegurar que el formulario esté completamente inicializado
    setTimeout(() => {
      if (this.step1Form?.form) {
        this.step1Form.form.valueChanges.subscribe(() => {
          console.log('🔄 Formulario paso 1 cambió, verificando grandes beneficiarios...');
          this.checkGrandesBeneficiarios();
        });

        // ✅ Verificar estado inicial también
        this.checkGrandesBeneficiarios();
      } else {
        console.error('❌ step1Form.form no está disponible');
      }
    }, 100);

    // ✅ Inicializar botones del modal SARLAFT
    this.initializeSarlaftModalButtons();
  }

  private setupBreadcrumb(): void {
    this.updateBreadcrumb();
  }

  // ✅ Método para actualizar breadcrumb dinámicamente según la acción seleccionada
  private updateBreadcrumb(): void {
    const breadcrumbItems: BreadcrumbItem[] = [
      {
        label: 'Portal',
        icon: 'fa-solid fa-home',
        routerLink: ['/portal'],
      },
      {
        label: 'Cotizar o Emitir',
        icon: 'fa-solid fa-paper-plane',
        routerLink: ['/product-selection'],
      },
      {
        // ✅ Breadcrumb dinámico según la acción seleccionada
        label:
          this.selectedAction === 'cotizar'
            ? 'Cotizar Cumplimiento'
            : this.selectedAction === 'emitir'
              ? 'Emitir Cumplimiento'
              : 'Emisión de Pólizas',
        icon: 'fa-solid fa-file-invoice',
      },
    ];

    this.breadcrumbService.setBreadcrumb(breadcrumbItems);
    this.breadcrumbConfig.items = breadcrumbItems.map(item => ({
      label: item.label,
      icon: item.icon,
      routerLink: item.routerLink?.join('/'),
    }));

    // ✅ Actualizar breadcrumb del header - UX mejorado
    this.breadcrumbService.setHeaderBreadcrumb([
      {
        label: 'Portal',
        icon: 'fa-solid fa-house',
        routerLink: '/portal',
        isActive: false,
      },
      {
        label: 'Cotizar o Emitir',
        icon: 'fa-solid fa-paper-plane',
        routerLink: '/cotizar-emitir',
        isActive: false,
      },
      {
        label:
          this.selectedAction === 'cotizar'
            ? 'Cotizar Cumplimiento'
            : this.selectedAction === 'emitir'
              ? 'Emitir Cumplimiento'
              : 'Emisión de Pólizas',
        icon: 'fa-solid fa-file-lines',
        isActive: true,
      },
    ]);
  }

  // ✅ Actualizar breadcrumb del header para vista de cotizaciones existentes
  private updateHeaderBreadcrumbForCotizaciones(): void {
    this.breadcrumbService.setHeaderBreadcrumb([
      {
        label: 'Portal',
        icon: 'fa-solid fa-house',
        routerLink: '/portal',
      },
      {
        label: 'Emitir cotización existente',
        icon: 'fa-solid fa-sync',
        isActive: true,
      },
    ]);
  }

  // ✅ Actualizar breadcrumb del header para vista de detalle de cotización
  private updateHeaderBreadcrumbForDetalle(numero: string): void {
    this.breadcrumbService.setHeaderBreadcrumb([
      {
        label: 'Portal',
        icon: 'fa-solid fa-house',
        routerLink: '/portal',
      },
      {
        label: 'Cotizaciones',
        icon: 'fa-solid fa-file-lines',
      },
      {
        label: `Detalles ${numero}`,
        icon: 'fa-solid fa-eye',
        isActive: true,
      },
    ]);
  }

  // ✅ Método principal para manejar clic en "Siguiente"
  onNextStep(): boolean | void {
    // ✅ Validar si debe mostrar modal SARLAFT antes de avanzar
    if (this.currentStep === 0 && this.shouldShowSarlaftModal()) {
      this.showSarlaftModal();

      // ✅ En modo COTIZAR: Modal informativo, permite avanzar
      if (this.action === PolicyInputAction.COTIZAR) {
        console.log('📋 Modo COTIZAR: Modal SARLAFT informativo, avanzando automáticamente');
        // Avanzar automáticamente después de mostrar el modal
        setTimeout(() => {
          this.nextStep();
        }, 100);
        return;
      }

      // ✅ En modo EMITIR: Modal bloqueante, no avanza hasta actualizar
      if (this.action === PolicyInputAction.EMITIR) {
        console.log('📋 Modo EMITIR: Modal SARLAFT bloqueante, esperando actualización');
        return; // No avanzar hasta que se actualice
      }
    }

    // AVANZAR AL SIGUIENTE PASO
    this.nextStep();
  }

  // ✅ OBLIGATORIO: Configuración del stepper con labels optimizadas para mobile
  stepperConfig: ILibTbStepper = {
    activeIndex: 0,
    readonly: false,
    type: 'number',
    class: 'stepper-responsive', // ✅ Clase personalizada para responsive
    items: [
      {
        label: 'producto y contrato',
        icon: 'fa-solid fa-file-contract',
        command: () => this.goToStep(0),
      },
      {
        label: 'formulario',
        icon: 'fa-solid fa-edit',
        command: () => this.goToStep(1),
      },
      {
        label: 'confirmación',
        icon: 'fa-solid fa-check-circle',
        command: () => this.goToStep(2),
      },
    ],
    libTbActiveIndexChange: (index: number) => {
      this.currentStep = index;
    },
  };

  // ✅ OBLIGATORIO: Un formulario dinámico por paso
  step1Form: ILibTbDynamicForm = step1PolicyInfoForm();
  step2Form: ILibTbDynamicForm = step2ContractInfoForm(undefined, undefined, false);

  // ✅ OBLIGATORIO: Botones de navegación usando propiedades nativas de tech-block-lib
  btnNext: ILibTbButton = {
    label: 'Siguiente',
    icon: 'fa-solid fa-arrow-right',
    iconPosition: 'right',
    styleBtn: 'fill',
    typeBtn: 'primary',
    libTbClick: () => this.onNextStep(),
  };

  btnPrevious: ILibTbButton = {
    label: 'Anterior',
    icon: 'fa-solid fa-arrow-left',
    iconPosition: 'left',
    styleBtn: 'stroke',
    typeBtn: 'secondary',
    libTbClick: () => this.previousStep(),
  };

  btnSubmit: ILibTbButton = {
    label: this.getActionLabel().submitLabel,
    icon: 'fa-solid fa-paper-plane',
    iconPosition: 'right',
    styleBtn: 'fill',
    typeBtn: 'primary',
    libTbClick: () => this.submitForm(),
  };

  // ✅ Botones para el paso 3 - Dinámicos según la acción
  get btnConfirmAndIssue(): ILibTbButton {
    console.log(
      '🔍 DEBUG: btnConfirmAndIssue getter llamado, selectedAction:',
      this.selectedAction,
      'loading:',
      this.loading,
    );
    return {
      label: this.selectedAction === 'cotizar' ? 'Generar Cotización' : 'Confirmar y Emitir Póliza',
      icon:
        this.selectedAction === 'cotizar' ? 'fa-solid fa-calculator' : 'fa-solid fa-check-circle',
      iconPosition: 'left',
      styleBtn: 'fill',
      typeBtn: 'primary',
      loading: this.loading,
      disabled: this.loading,
      libTbClick: () => {
        console.log('🔥 BOTÓN CLICK DETECTADO! selectedAction:', this.selectedAction);
        if (this.selectedAction === 'cotizar') {
          console.log('🔥 LLAMANDO onGenerateQuote()');
          this.onGenerateQuote();
        } else {
          console.log('🔥 LLAMANDO confirmAndIssuePolicy()');
          this.confirmAndIssuePolicy();
        }
      },
    };
  }

  btnQuoteBusiness: ILibTbButton = {
    label: 'Quiero Emitir',
    icon: 'fa-solid fa-calculator',
    iconPosition: 'left',
    styleBtn: 'fill',
    typeBtn: 'secondary',
    libTbClick: () => this.quoteBusiness(),
  };

  // ✅ Botón para volver a management desde vista de detalles
  btnBackToManagement: ILibTbButton = {
    label: 'Volver a Cotizaciones',
    icon: 'fa-solid fa-arrow-left',
    iconPosition: 'left',
    styleBtn: 'stroke',
    typeBtn: 'secondary',
    libTbClick: () => this.backToManagement(),
  };

  // ✅ Botones para las opciones de Emitir
  btnElegirCotizacion: ILibTbButton = {
    label: 'Elegir cotización',
    icon: 'fa-solid fa-search',
    iconPosition: 'left',
    styleBtn: 'fill',
    typeBtn: 'secondary',
    class: 'w-full',
    libTbClick: () => this.selectEmitirOption('cotizacion-existente'),
  };

  btnCrearNuevaEmision: ILibTbButton = {
    label: 'Crear nueva emisión',
    icon: 'fa-solid fa-plus',
    iconPosition: 'left',
    styleBtn: 'fill',
    typeBtn: 'primary',
    class: 'w-full',
    libTbClick: () => this.selectEmitirOption('poliza-nueva'),
  };

  // ✅ Botones para el resumen de cotización
  btnBackToForm: ILibTbButton = {
    label: 'Volver',
    icon: 'fa-solid fa-arrow-left',
    iconPosition: 'left',
    styleBtn: 'stroke',
    typeBtn: 'secondary',
    libTbClick: () => this.backToForm(),
  };

  btnGenerateEmission: ILibTbButton = {
    label: 'Generar Emisión',
    icon: 'fa-solid fa-file-export',
    iconPosition: 'right',
    styleBtn: 'fill',
    typeBtn: 'primary',
    loading: this.loading,
    disabled: this.loading,
    libTbClick: () => this.generateEmissionFromSummary(),
  };

  // ✅ Botón adicional para el contenedor como en imagen 2
  btnUsarCotizacionExistente: ILibTbButton = {
    label: 'Usar cotización existente',
    icon: 'fa-solid fa-file-search',
    iconPosition: 'left',
    styleBtn: 'fill',
    typeBtn: 'secondary',
    class: 'min-w-[200px]',
    libTbClick: () => this.usarCotizacionExistente(),
  };

  // ✅ Configuración del FileUploadField de tech-block-lib - Ajustada para PDF, Word y Excel
  fileUploadConfig: ILibTbFileUploadField = {
    dataQaId: 'contract-file-upload',
    multiple: false,
    dragDropLabel: 'Seleccionar archivo',
    dragDropIcon: 'fa-solid fa-upload', // ✅ Icono de upload como en imagen 1
    caption: 'Peso máximo por cada archivo: 30 MB. Formatos permitidos: PDF, Word, Excel.',
    avaibleTypes: [
      'application/pdf', // PDF
      'application/msword', // DOC
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
      'application/vnd.ms-excel', // XLS
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLSX
    ],
    maxSize: 31457280, // 30MB en bytes
    errorText: {
      type: 'Las extensiones soportadas son: *.DOCX, XLSX y *.PDF',
      maxSize: 'El tamaño máximo del archivo 30 MB',
      length: 'Solo se permite un archivo a la vez.',
    },
    customAlert: {
      position: 'top-center',
      preventDuplicates: true,
    },
    customUploadingFile: {
      textCaption: {
        uploading: 'Subiendo archivo...',
        uploaded: 'Archivo cargado correctamente',
        error: 'Error al cargar el archivo',
      },
      iconCaption: {
        uploadingIcon: 'fa-solid fa-spinner fa-spin',
        uploadedIcon: 'fa-solid fa-check-circle',
        errorIcon: 'fa-solid fa-exclamation-triangle',
      },
    },
    libTbOnCatchFile: (files: File[]) => this.onFileCaught(files),
    libTbOnDeleteFile: (file: File) => this.onFileDeleted(file),
    libTbOnReloadFile: uploadingFile => this.onFileReload(uploadingFile),
  };

  // ✅ Datos originales de coberturas (para restaurar valores)
  private readonly coberturasOriginales = [
    {
      id: 1,
      seleccionado: false,
      cobertura: '401-Seriedad De La Oferta',
      porcentajeAsegurado: 10,
      valorAsegurado: 15000000,
      fechaInicio: '2025-05-05',
      fechaVencimiento: '2025-11-05',
      tiempoAdicional: 30,
      prima: 150000,
    },
    {
      id: 2,
      seleccionado: false,
      cobertura: '402-Manejo Del Anticipo',
      porcentajeAsegurado: 50,
      valorAsegurado: 75000000,
      fechaInicio: '2025-05-05',
      fechaVencimiento: '2026-05-04',
      tiempoAdicional: 60,
      prima: 750000,
    },
    {
      id: 3,
      seleccionado: true, // ✅ Solo esta está seleccionada según imagen 2
      cobertura: '403-Cumplimiento',
      porcentajeAsegurado: 20,
      valorAsegurado: 30000000,
      fechaInicio: '2025-05-05',
      fechaVencimiento: '2026-05-04',
      tiempoAdicional: 45,
      prima: 300000,
    },
    {
      id: 4,
      seleccionado: false,
      cobertura: '404-Salarios Y Prestaciones S',
      porcentajeAsegurado: 20,
      valorAsegurado: 30000000,
      fechaInicio: '2025-05-05',
      fechaVencimiento: '2026-05-04',
      tiempoAdicional: 45,
      prima: 300000,
    },
    {
      id: 5,
      seleccionado: false,
      cobertura: '405-Estabilidad De La Obra',
      porcentajeAsegurado: 30,
      valorAsegurado: 45000000,
      fechaInicio: '2026-05-05',
      fechaVencimiento: '2031-05-04',
      tiempoAdicional: 90,
      prima: 450000,
    },
    {
      id: 6,
      seleccionado: false,
      cobertura: '406-Calidad Del Servicio',
      porcentajeAsegurado: 25,
      valorAsegurado: 37500000,
      fechaInicio: '2026-05-05',
      fechaVencimiento: '2027-05-04',
      tiempoAdicional: 60,
      prima: 375000,
    },
    {
      id: 7,
      seleccionado: false,
      cobertura: '407-Buen Funcionamiento De Lo',
      porcentajeAsegurado: 15,
      valorAsegurado: 22500000,
      fechaInicio: '2026-05-05',
      fechaVencimiento: '2027-05-04',
      tiempoAdicional: 45,
      prima: 225000,
    },
    {
      id: 8,
      seleccionado: false,
      cobertura: '411-Suministro De Repuestos',
      porcentajeAsegurado: 10,
      valorAsegurado: 15000000,
      fechaInicio: '2026-05-05',
      fechaVencimiento: '2027-05-04',
      tiempoAdicional: 30,
      prima: 150000,
    },
    {
      id: 9,
      seleccionado: false,
      cobertura: '412-Calidad De Los Bienes Sum',
      porcentajeAsegurado: 10,
      valorAsegurado: 15000000,
      fechaInicio: '2026-05-05',
      fechaVencimiento: '2027-05-04',
      tiempoAdicional: 30,
      prima: 150000,
    },
    {
      id: 10,
      seleccionado: false,
      cobertura: '413-Pago Anticipado',
      porcentajeAsegurado: 100,
      valorAsegurado: 150000000,
      fechaInicio: '2025-05-05',
      fechaVencimiento: '2026-05-04',
      tiempoAdicional: 120,
      prima: 1500000,
    },
  ];

  // ✅ Datos originales de coberturas RC (para restaurar valores)
  private readonly rcCoberturasOriginales = [
    {
      id: 1,
      seleccionado: false,
      cobertura: '224-Patronal Persona',
      porcentajeAsegurado: 100,
      valorAsegurado: 150000000,
      tasa: 1.85,
      fechaInicio: '2024-08-01',
      fechaVencimiento: '2025-07-31',
    },
    {
      id: 2,
      seleccionado: true,
      cobertura: '225-Patronal Vigencia',
      porcentajeAsegurado: 100,
      valorAsegurado: 150000000,
      tasa: 1.95,
      fechaInicio: '2024-08-01',
      fechaVencimiento: '2025-07-31',
    },
    {
      id: 3,
      seleccionado: true,
      cobertura: '226-Contratista Y Subcontratista',
      porcentajeAsegurado: 100,
      valorAsegurado: 150000000,
      tasa: 2.15,
      fechaInicio: '2024-08-01',
      fechaVencimiento: '2025-07-31',
    },
    {
      id: 4,
      seleccionado: true,
      cobertura: '227-Gastos Medicos Persona',
      porcentajeAsegurado: 100,
      valorAsegurado: 150000000,
      tasa: 1.75,
      fechaInicio: '2024-08-01',
      fechaVencimiento: '2025-07-31',
    },
    {
      id: 5,
      seleccionado: true,
      cobertura: '228-Gastos Médicos Vigencia',
      porcentajeAsegurado: 100,
      valorAsegurado: 150000000,
      tasa: 1.85,
      fechaInicio: '2024-08-01',
      fechaVencimiento: '2025-07-31',
    },
    {
      id: 6,
      seleccionado: true,
      cobertura: '232-Contaminación Accidental',
      porcentajeAsegurado: 100,
      valorAsegurado: 150000000,
      tasa: 2.45,
      fechaInicio: '2024-08-01',
      fechaVencimiento: '2025-07-31',
    },
    {
      id: 7,
      seleccionado: true,
      cobertura: '237-Cruzada',
      porcentajeAsegurado: 100,
      valorAsegurado: 150000000,
      tasa: 2.25,
      fechaInicio: '2024-08-01',
      fechaVencimiento: '2025-07-31',
    },
    {
      id: 8,
      seleccionado: true,
      cobertura: '238-Bienes Bajo Cuidado Tene',
      porcentajeAsegurado: 100,
      valorAsegurado: 150000000,
      tasa: 1.95,
      fechaInicio: '2024-08-01',
      fechaVencimiento: '2025-07-31',
    },
    {
      id: 9,
      seleccionado: true,
      cobertura: '244-Vehí.Propios Y No Vehic.',
      porcentajeAsegurado: 100,
      valorAsegurado: 150000000,
      tasa: 2.35,
      fechaInicio: '2024-08-01',
      fechaVencimiento: '2025-07-31',
    },
    {
      id: 10,
      seleccionado: true,
      cobertura: '245-Vehi.Propios Y No Vigen.',
      porcentajeAsegurado: 100,
      valorAsegurado: 150000000,
      tasa: 2.45,
      fechaInicio: '2024-08-01',
      fechaVencimiento: '2025-07-31',
    },
    {
      id: 11,
      seleccionado: false,
      cobertura: '250-Predios Labor.Y Operacio/PLO',
      porcentajeAsegurado: 100,
      valorAsegurado: 150000000,
      tasa: 2.0,
      fechaInicio: '2024-08-01',
      fechaVencimiento: '2025-07-31',
    },
  ];

  // ✅ Coberturas RC con columnas: Seleccione, Coberturas, Deducibles (% Deducible, Deducible Mínimo SMMLV), Valor Asegurado, Tasa, Prima, Líquida
  // NOTA: Solo "222- PREDIOS LABOR Y OPERACIO" puede ser líquida
  rcCoberturas = [
    {
      id: 1,
      nombre: '222- PREDIOS LABOR Y OPERACIO',
      porcentajeDeducible: 10,
      deducibleMinimoSMMLV: 2,
      valorAsegurado: 120000000,
      tasa: 0.2,
      prima: 482581,
      seleccionada: true,
    },
    {
      id: 2,
      nombre: '224- PATRONAL PERSONA',
      porcentajeDeducible: 10,
      deducibleMinimoSMMLV: 2,
      valorAsegurado: 360000000000,
      tasa: 0,
      prima: 0,
      seleccionada: false,
    },
    {
      id: 3,
      nombre: '225-PATRONAL VIGENCIA',
      porcentajeDeducible: 10,
      deducibleMinimoSMMLV: 2,
      valorAsegurado: 1200000000000,
      tasa: 0,
      prima: 0,
      seleccionada: false,
    },
    {
      id: 4,
      nombre: '226- CONTRATISTA Y SUBCONTRAT',
      porcentajeDeducible: 10,
      deducibleMinimoSMMLV: 2,
      valorAsegurado: 1200000000000,
      tasa: 0,
      prima: 0,
      seleccionada: false,
    },
    {
      id: 5,
      nombre: '227- GASTOS MEDICOS PERSONA',
      porcentajeDeducible: 0,
      deducibleMinimoSMMLV: 0,
      valorAsegurado: 6000000,
      tasa: 0,
      prima: 0,
      seleccionada: false,
    },
    {
      id: 6,
      nombre: '228-GASTOS MEDICOS VIGENCIA',
      porcentajeDeducible: 0,
      deducibleMinimoSMMLV: 0,
      valorAsegurado: 12000000,
      tasa: 0,
      prima: 0,
      seleccionada: false,
    },
    {
      id: 7,
      nombre: '232- CONTAMINACION ACCIDENTAL',
      porcentajeDeducible: 10,
      deducibleMinimoSMMLV: 5,
      valorAsegurado: 1200000000000,
      tasa: 0,
      prima: 0,
      seleccionada: false,
    },
    {
      id: 8,
      nombre: '237- CRUZADA',
      porcentajeDeducible: 10,
      deducibleMinimoSMMLV: 2,
      valorAsegurado: 1200000000000,
      tasa: 0,
      prima: 0,
      seleccionada: false,
    },
    {
      id: 9,
      nombre: '238- BIENES BAJO CUIDADO TENE',
      porcentajeDeducible: 10,
      deducibleMinimoSMMLV: 2,
      valorAsegurado: 1200000000000,
      tasa: 0,
      prima: 0,
      seleccionada: false,
    },
    {
      id: 10,
      nombre: '244- VEHI.PROPIOS Y NO VEHIC.',
      porcentajeDeducible: 0,
      deducibleMinimoSMMLV: 0,
      valorAsegurado: 360000000000,
      tasa: 0,
      prima: 0,
      seleccionada: false,
    },
    {
      id: 11,
      nombre: '245- VEHI.PROPIOS Y NO VIGEN.',
      porcentajeDeducible: 0,
      deducibleMinimoSMMLV: 0,
      valorAsegurado: 1200000000000,
      tasa: 0,
      prima: 0,
      seleccionada: false,
    },
  ];

  // ✅ Métodos para tabla RC

  // Solo la cobertura 222- PREDIOS LABOR Y OPERACIO puede seleccionarse para liquidación
  esCobertura222(cob: any): boolean {
    return cob.nombre === '222- PREDIOS LABOR Y OPERACIO';
  }

  toggleCoberturaRC(cob: any): void {
    // Permite toggle en todas las coberturas RC
    cob.seleccionada = !cob.seleccionada;
  }

  toggleTodasCoberturasRC(event: any): void {
    // Permite toggle en todas las coberturas RC
    const checked = event.target.checked;
    this.rcCoberturas.forEach(c => {
      c.seleccionada = checked;
    });
  }

  limpiarSeleccionRC(): void {
    this.rcCoberturas.forEach(c => (c.seleccionada = false));
    // Limpiar también las variables de liquidación RC
    this.mostrarTotalPrimaRC = false;
    this.mostrarCambiosRC = false;
    this.totalPrimaLiquidadaRC = 0;
    this.coberturasLiquidadasRC = 0;
    this.cambiosDetectadosRC = [];
    this.coberturasNuevasRC = [];
    this.coberturasRemovidasRC = [];
    this.coberturasAnterioresIdsRC = [];
    this.valoresAnterioresRC = {};
    this.primeraLiquidacionRC = true;
  }

  actualizarCoberturasRC(): void {
    console.log('Coberturas RC actualizadas');
  }

  guardarCoberturasRC(): void {
    const seleccionadas = this.rcCoberturas.filter(c => c.seleccionada);
    console.log('Guardando coberturas RC:', seleccionadas);
  }

  onCampoRCCambio(cob: any): void {
    // Calcula prima para todas las coberturas RC
    const valorAsegurado = Number(cob.valorAsegurado) || 0;
    const tasa = Number(cob.tasa) || 0;

    // Fórmula RC: Prima = Valor Asegurado * Tasa / 100
    cob.prima = Math.round(valorAsegurado * (tasa / 100));
    console.log('🔥 Prima RC calculada:', cob.nombre, '→', cob.prima);

    this.cdr.detectChanges();
  }

  // ✅ Recalcular Prima RC cuando cambian los valores
  recalcularPrimaRC(cob: any): void {
    // Calcula prima para todas las coberturas RC
    const valorAsegurado = Number(cob.valorAsegurado) || 0;
    const tasa = Number(cob.tasa) || 0;

    // Fórmula RC: Prima = Valor Asegurado * Tasa / 100
    cob.prima = Math.round(valorAsegurado * (tasa / 100));
    console.log(`📊 Prima RC recalculada: ${cob.nombre} → $${this.formatearNumero(cob.prima)}`);
  }

  // ✅ Liquidar Prima RC - Calcula, muestra el total y detecta cambios
  liquidarPrimaRC(): void {
    const coberturasSeleccionadas = this.rcCoberturas.filter(c => c.seleccionada);

    if (coberturasSeleccionadas.length === 0) {
      this.showErrorNotification('⚠️ Seleccione al menos una cobertura RC para liquidar');
      this.mostrarTotalPrimaRC = false;
      this.mostrarCambiosRC = false;
      return;
    }

    // Detectar cambios entre liquidaciones RC
    this.cambiosDetectadosRC = [];
    this.coberturasNuevasRC = [];
    this.coberturasRemovidasRC = [];

    const idsSeleccionadosActuales = coberturasSeleccionadas.map(c => c.id);

    // Detectar NUEVAS coberturas RC (no estaban antes)
    for (const cob of coberturasSeleccionadas) {
      if (!this.coberturasAnterioresIdsRC.includes(cob.id)) {
        this.coberturasNuevasRC.push({
          nombre: cob.nombre,
          prima: cob.prima,
        });
      }
    }

    // Detectar coberturas RC REMOVIDAS (estaban antes, ya no)
    for (const idAnterior of this.coberturasAnterioresIdsRC) {
      if (!idsSeleccionadosActuales.includes(idAnterior)) {
        const cob = this.rcCoberturas.find(c => c.id === idAnterior);
        if (cob) {
          this.coberturasRemovidasRC.push({
            nombre: cob.nombre,
            prima: this.valoresAnterioresRC[idAnterior]?.prima || cob.prima,
          });
        }
      }
    }

    // Detectar MODIFICACIONES en coberturas RC que ya estaban
    for (const cob of coberturasSeleccionadas) {
      if (this.coberturasAnterioresIdsRC.includes(cob.id) && this.valoresAnterioresRC[cob.id]) {
        const anterior = this.valoresAnterioresRC[cob.id];
        const cambios: string[] = [];

        if (anterior.porcentajeDeducible !== cob.porcentajeDeducible) {
          cambios.push(
            `% Deducible: ${anterior.porcentajeDeducible}% → ${cob.porcentajeDeducible}%`,
          );
        }
        if (anterior.deducibleMinimoSMMLV !== cob.deducibleMinimoSMMLV) {
          cambios.push(
            `Deducible Mín. SMMLV: ${anterior.deducibleMinimoSMMLV} → ${cob.deducibleMinimoSMMLV}`,
          );
        }
        if (anterior.valorAsegurado !== cob.valorAsegurado) {
          cambios.push(
            `Valor Aseg.: ${this.formatCurrency(anterior.valorAsegurado)} → ${this.formatCurrency(cob.valorAsegurado)}`,
          );
        }
        if (anterior.tasa !== cob.tasa) {
          cambios.push(`Tasa: ${anterior.tasa}% → ${cob.tasa}%`);
        }
        if (anterior.prima !== cob.prima) {
          cambios.push(
            `Prima: ${this.formatCurrency(anterior.prima)} → ${this.formatCurrency(cob.prima)}`,
          );
        }

        if (cambios.length > 0) {
          this.cambiosDetectadosRC.push({
            nombre: cob.nombre,
            cambios: cambios,
          });
        }
      }
    }

    // Guardar estado actual RC para la próxima comparación
    this.totalPrimaAnteriorRC = this.totalPrimaLiquidadaRC;
    this.coberturasAnterioresIdsRC = [...idsSeleccionadosActuales];
    this.valoresAnterioresRC = {};
    for (const cob of coberturasSeleccionadas) {
      this.valoresAnterioresRC[cob.id] = {
        porcentajeDeducible: cob.porcentajeDeducible,
        deducibleMinimoSMMLV: cob.deducibleMinimoSMMLV,
        valorAsegurado: cob.valorAsegurado,
        tasa: cob.tasa,
        prima: cob.prima,
      };
    }

    // Calcular total RC
    this.totalPrimaLiquidadaRC = this.getTotalPrimaRC();
    this.coberturasLiquidadasRC = coberturasSeleccionadas.length;
    this.mostrarTotalPrimaRC = true;
    this.mostrarCambiosRC =
      this.cambiosDetectadosRC.length > 0 ||
      this.coberturasNuevasRC.length > 0 ||
      this.coberturasRemovidasRC.length > 0;

    // ✅ Ocultar cambios RC después de 5 segundos
    if (this.mostrarCambiosRC) {
      setTimeout(() => {
        this.mostrarCambiosRC = false;
      }, 5000);
    }

    this.primeraLiquidacionRC = false;
    console.log(`💰 Total Prima RC Liquidada: ${this.totalPrimaLiquidadaRC}`);
    this.showSuccessNotification(
      `Prima RC liquidada: ${this.formatCurrency(this.totalPrimaLiquidadaRC)}`,
    );
  }

  // ✅ Obtener total prima RC seleccionadas
  getTotalPrimaRC(): number {
    return this.rcCoberturas
      .filter(c => c.seleccionada)
      .reduce((total, c) => total + (c.prima || 0), 0);
  }

  // ✅ Obtener cantidad de coberturas RC seleccionadas
  getCoberturasRCSeleccionadasCount(): number {
    return this.rcCoberturas.filter(c => c.seleccionada).length;
  }

  actualizarValorAseguradoRC(cob: any, event: any): void {
    const valorFormateado = event.target.value || '0';
    const cleanValue = valorFormateado.replace(/\./g, '').replace(/,/g, '');
    cob.valorAsegurado = parseInt(cleanValue, 10) || 0;
    this.onCampoRCCambio(cob);
    // Actualizar el valor formateado en el input
    event.target.value = this.formatearNumero(cob.valorAsegurado);
  }

  // ✅ Configuración de la tabla de coberturas de cumplimiento
  coberturasTable: ILibTbTable = {
    dataQaId: 'coberturas-cumplimiento-table',
    value: JSON.parse(JSON.stringify(this.coberturasOriginales)), // ✅ Copia profunda para evitar referencias
    paginator: true,
    rows: 10,
    rowsPerPageOptions: [5, 10, 15, 20],
    sortMode: 'single',
    selectionMode: 'multiple',
    dataKey: 'id',
    class: 'coberturas__table bg-grayscaleWhite',
    responsive: true,
    responsiveLayout: 'scroll',
    filterLocale: 'es',
    libTbOnRowSelect: (event: any) => this.onCoberturaSelect(event),
    libTbOnRowUnselect: (event: any) => this.onCoberturaUnselect(event),
    libTbSelectionChange: (event: any) => this.onCoberturaSelectionChange(event),
  };

  // ✅ Configuración de la tabla de coberturas RC
  rcCoberturasTable: ILibTbTable = {
    dataQaId: 'rc-coberturas-table',
    value: JSON.parse(JSON.stringify(this.rcCoberturasOriginales)), // ✅ Copia profunda para evitar referencias
    paginator: true,
    rows: 10,
    rowsPerPageOptions: [5, 10, 15, 20],
    sortMode: 'single',
    selectionMode: 'multiple',
    dataKey: 'id',
    class: 'rc-coberturas__table bg-grayscaleWhite',
    responsive: true,
    responsiveLayout: 'scroll',
    filterLocale: 'es',
    libTbOnRowSelect: (event: any) => this.onRcCoberturaSelect(event),
    libTbOnRowUnselect: (event: any) => this.onRcCoberturaUnselect(event),
    libTbSelectionChange: (event: any) => this.onRcCoberturaSelectionChange(event),
  };

  // ✅ Configuración de tabla de resumen de coberturas de cumplimiento
  complianceSummaryTable: ILibTbTable = {
    dataQaId: 'compliance-summary-table',
    value: [], // Se llenará dinámicamente con las coberturas seleccionadas
    paginator: false, // Sin paginación para el resumen
    class: 'compliance-summary__table bg-grayscaleL400',
    responsive: true,
    responsiveLayout: 'scroll',
    filterLocale: 'es',
  };

  // ✅ Configuración de tabla de resumen de coberturas RC
  rcSummaryTable: ILibTbTable = {
    dataQaId: 'rc-summary-table',
    value: [], // Se llenará dinámicamente con las coberturas seleccionadas
    paginator: false, // Sin paginación para el resumen
    class: 'rc-summary__table bg-grayscaleL400',
    responsive: true,
    responsiveLayout: 'scroll',
    filterLocale: 'es',
  };

  btnProcessContract: ILibTbButton = {
    label: 'Procesar Contrato (Simulado)',
    icon: 'fa-solid fa-robot',
    iconPosition: 'left',
    styleBtn: 'fill',
    typeBtn: 'secondary',
    loading: this.isProcessing,
    libTbClick: () => this.simulateContractProcessing(),
  };

  // ✅ OBLIGATORIO: Métodos de navegación
  goToStep(step: number): void {
    // ✅ GUARDAR DATOS antes de cambiar de paso
    this.guardarDatosFormulario();

    if (step > this.currentStep && !this.validateCurrentStep()) {
      return; // No permitir avanzar sin validar
    }
    this.currentStep = step;
    this.stepperConfig.activeIndex = step;

    // ✅ Actualizar tablas de resumen cuando se navega al paso 3
    if (step === 2) {
      this.updateSummaryTables();
    }
  }

  // ✅ Validar archivo de contrato antes de continuar
  validateContractFile(): boolean {
    if (this.isContractFileRequired && !this.fileName && !this.selectedFileName) {
      this.contractFileError = true;
      return false;
    }
    this.contractFileError = false;
    return true;
  }

  // ✅ Métodos para manejo de archivos
  triggerFileInput(): void {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // ✅ RF-008: VALIDAR EXTENSIÓN - Solo PDF, Word, Excel (NO imágenes)
      const validExtensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx'];
      const extension = '.' + file.name.split('.').pop()?.toLowerCase();

      if (!validExtensions.includes(extension)) {
        this.showErrorNotification('Las extensiones soportadas son: *.DOCX, XLSX y *.PDF');
        input.value = ''; // Limpiar input
        return;
      }

      // ✅ RF-008: VALIDAR TAMAÑO - Máximo 30 MB
      if (file.size > 30 * 1024 * 1024) {
        this.showErrorNotification('El tamaño máximo del archivo 30 MB');
        input.value = ''; // Limpiar input
        return;
      }

      // ✅ RF-008: VALIDAR LONGITUD DEL NOMBRE DEL ARCHIVO
      if (file.name.length > this.MAX_FILE_NAME_LENGTH) {
        this.showErrorNotification(
          `La cantidad máxima de caracteres del nombre del archivo es de ${this.MAX_FILE_NAME_LENGTH}`,
        );
        input.value = ''; // Limpiar input
        return;
      }

      this.selectedFile = file;
      this.contractFileError = false;

      // Simular upload con progreso
      this.isUploading = true;
      this.uploadProgress = 0;

      // Limpiar intervalo anterior si existe
      if (this.uploadInterval) {
        clearInterval(this.uploadInterval);
      }

      this.uploadInterval = setInterval(() => {
        this.uploadProgress += 10;
        if (this.uploadProgress >= 100) {
          clearInterval(this.uploadInterval);
          this.uploadInterval = null;
          this.isUploading = false;
          if (this.selectedFile) {
            this.selectedFileName = this.selectedFile.name;
            this.fileName = this.selectedFile.name;
            console.log('✅ Archivo subido:', this.selectedFileName);
          }
        }
      }, 150);
    }
  }

  // ✅ RF-008: Mostrar confirmación antes de eliminar archivo
  removeFile(): void {
    this.showAlertaEliminarArchivo = true;
  }

  // ✅ RF-008: Cancelar eliminación de archivo
  cancelarEliminarArchivo(): void {
    this.showAlertaEliminarArchivo = false;
  }

  // ✅ RF-008: Confirmar y ejecutar la eliminación del archivo
  confirmarEliminarArchivo(): void {
    this.selectedFile = null;
    this.selectedFileName = null;
    this.fileName = null;
    this.uploadProgress = 0;
    this.contractFileError = true; // Marcar error cuando se elimina el archivo
    this.showAlertaEliminarArchivo = false;
    console.log('🗑️ Archivo removido');
  }

  cancelUpload(): void {
    this.isUploading = false;
    this.selectedFile = null;
    this.selectedFileName = null;
    this.uploadProgress = 0;
    console.log('❌ Carga cancelada');
  }

  // ========== ✅ DOCUMENTOS SOPORTE - Métodos optimizados ==========

  triggerDocumentoSoporteInput(): void {
    const input = document.querySelector('#documentoSoporteInput') as HTMLInputElement;
    if (input) {
      input.click();
    } else {
      // Fallback: buscar por referencia
      const inputs = document.querySelectorAll('input[type="file"]');
      inputs.forEach((inp: any) => {
        if (inp.getAttribute('accept')?.includes('.txt')) {
          inp.click();
        }
      });
    }
  }

  onDocumentoSoporteSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // ✅ RF-008: Validar tamaño (30 MB)
      if (file.size > 30 * 1024 * 1024) {
        this.showErrorNotification('El tamaño máximo del archivo 30 MB');
        input.value = '';
        return;
      }

      // ✅ RF-008: Validar longitud del nombre del archivo
      if (file.name.length > this.MAX_FILE_NAME_LENGTH) {
        this.showErrorNotification(
          `La cantidad máxima de caracteres del nombre del archivo es de ${this.MAX_FILE_NAME_LENGTH}`,
        );
        input.value = '';
        return;
      }

      this.archivoDocumentoTemp = file;
      console.log('📄 Archivo seleccionado:', file.name);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDraggingDocumento = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDraggingDocumento = false;
  }

  onDropDocumentoSoporte(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDraggingDocumento = false;

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];

      // ✅ RF-008: Validar extensión - Solo PDF, Word, Excel (NO imágenes)
      const validExtensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx'];
      const extension = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!validExtensions.includes(extension)) {
        this.showErrorNotification('Las extensiones soportadas son: *.DOCX, XLSX y *.PDF');
        return;
      }

      // ✅ RF-008: Validar tamaño (30 MB)
      if (file.size > 30 * 1024 * 1024) {
        this.showErrorNotification('El tamaño máximo del archivo 30 MB');
        return;
      }

      // ✅ RF-008: Validar longitud del nombre del archivo
      if (file.name.length > this.MAX_FILE_NAME_LENGTH) {
        this.showErrorNotification(
          `La cantidad máxima de caracteres del nombre del archivo es de ${this.MAX_FILE_NAME_LENGTH}`,
        );
        return;
      }

      this.archivoDocumentoTemp = file;
      console.log('📄 Archivo arrastrado:', file.name);
    }
  }

  agregarDocumentoSoporte(): void {
    if (!this.tipoDocumentoSoporte || !this.archivoDocumentoTemp) {
      this.showErrorNotification('Selecciona el tipo de documento y un archivo');
      return;
    }

    const nuevoDoc = {
      tipo: this.tipoDocumentoSoporte,
      nombreArchivo: this.archivoDocumentoTemp.name,
      fecha: new Date().toLocaleDateString('es-CO'),
      archivo: this.archivoDocumentoTemp,
    };

    this.documentosSoporte.push(nuevoDoc);

    // Limpiar selección
    this.tipoDocumentoSoporte = '';
    this.archivoDocumentoTemp = null;

    this.showSuccessNotification(`✅ Documento "${nuevoDoc.nombreArchivo}" agregado`);
    console.log('📁 Documentos soporte:', this.documentosSoporte);
  }

  // ✅ Método para agregar documento usando el diseño original con spinner
  agregarDocumentoALista(): void {
    if (!this.tipoDocumentoSoporte || !this.selectedFileName || !this.selectedFile) {
      this.showErrorNotification('Selecciona el tipo de documento y carga un archivo');
      return;
    }

    const nuevoDoc = {
      tipo: this.tipoDocumentoSoporte,
      nombreArchivo: this.selectedFileName,
      fecha: new Date().toLocaleDateString('es-CO'),
      archivo: this.selectedFile,
    };

    this.documentosSoporte.push(nuevoDoc);

    // Limpiar para cargar otro
    this.tipoDocumentoSoporte = '';
    this.selectedFile = null;
    this.selectedFileName = null;
    this.fileName = null;

    this.showSuccessNotification(`✅ Documento "${nuevoDoc.nombreArchivo}" agregado a la lista`);
    console.log('📁 Documentos soporte:', this.documentosSoporte);
  }

  eliminarDocumentoSoporte(index: number): void {
    const doc = this.documentosSoporte[index];
    this.documentosSoporte.splice(index, 1);
    this.showSuccessNotification(`🗑️ Documento "${doc.nombreArchivo}" eliminado`);
  }

  getTipoDocumentoLabel(tipo: string): string {
    return this.tiposDocumentoSoporte[tipo] || 'Documento';
  }

  // ========== FIN DOCUMENTOS SOPORTE ==========

  addContract(): void {
    this.formSubmitted = true;

    // Validar campos obligatorios
    let isValid = true;

    if (!this.tipoProducto) isValid = false;
    if (!this.claveIntermediario) isValid = false;

    // Si es Grandes Beneficiarios, validar campos adicionales (sin programaSeleccionado)
    if (this.tipoProducto === 'grandes-beneficiarios') {
      if (!this.programaParametrizado) isValid = false;
      if (!this.tipoDocumentoTomador) isValid = false;
      if (!this.numeroDocumentoTomador) isValid = false;
      if (!this.tipoDocumentoAsegurado) isValid = false;
      if (!this.numeroDocumentoAsegurado) isValid = false;
    }

    if (!this.selectedFileName) {
      this.contractFileError = true;
      isValid = false;
    }

    if (!isValid) {
      console.log('❌ Formulario inválido - campos obligatorios faltantes');
      return;
    }

    console.log('📄 Contrato agregado:', {
      tipoProducto: this.tipoProducto,
      claveIntermediario: this.claveIntermediario,
      archivo: this.selectedFileName,
      tipoDocumentoAsegurado: this.tipoDocumentoAsegurado,
      numeroDocumentoAsegurado: this.numeroDocumentoAsegurado,
      tipoDocumentoTomador: this.tipoDocumentoTomador,
      numeroDocumentoTomador: this.numeroDocumentoTomador,
    });
  }

  // ✅ DROPDOWN GENÉRICO - Toggle
  toggleDropdown(name: string, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    // Cerrar todos los demás dropdowns
    Object.keys(this.dropdownsOpen).forEach(key => {
      if (key !== name) this.dropdownsOpen[key] = false;
    });
    this.dropdownsOpen[name] = !this.dropdownsOpen[name];
  }

  // ✅ DROPDOWN GENÉRICO - Seleccionar opción
  selectDropdownOption(
    dropdownName: string,
    value: string,
    callback?: (val: string) => void,
  ): void {
    this.dropdownsOpen[dropdownName] = false;
    if (callback) {
      callback(value);
    }
  }

  // ✅ Verificar si dropdown está abierto
  isDropdownOpen(name: string): boolean {
    return this.dropdownsOpen[name] || false;
  }

  // ✅ Obtener nombre de actividad económica
  getActividadNombre(codigo: string): string {
    const actividad = this.actividadesEconomicas?.find(a => a.codigo === codigo);
    return actividad ? actividad.nombre : '';
  }

  // ✅ Incrementar Valor del Contrato
  incrementarValorContrato(): void {
    this.valorContrato += this.incrementoContrato;
    console.log(`➕ Valor del Contrato incrementado: ${this.formatearNumero(this.valorContrato)}`);
  }

  // ✅ Decrementar Valor del Contrato
  decrementarValorContrato(): void {
    if (this.valorContrato > this.incrementoContrato) {
      this.valorContrato -= this.incrementoContrato;
      console.log(
        `➖ Valor del Contrato decrementado: ${this.formatearNumero(this.valorContrato)}`,
      );
    } else if (this.valorContrato > 0) {
      this.valorContrato = 0;
      console.log(`➖ Valor del Contrato: 0`);
    }
  }

  // ✅ Actualizar Valor del Contrato desde input
  actualizarValorContrato(event: any): void {
    const valorFormateado = event.target.value || '0';
    const valorLimpio = valorFormateado.replace(/\./g, '').replace(/,/g, '');
    const numero = parseInt(valorLimpio, 10) || 0;
    this.valorContrato = numero;
    console.log(`💰 Valor del Contrato actualizado: ${this.formatearNumero(this.valorContrato)}`);
  }

  // ✅ Método para manejar cambio de tipo de producto
  onTipoProductoChange(value: string): void {
    console.log('📋 Tipo de producto cambiado a:', value);
    // Limpiar campos adicionales si cambia el tipo
    if (value !== 'grandes-beneficiarios') {
      this.tipoDocumentoAsegurado = '';
      this.numeroDocumentoAsegurado = '';
      this.tipoDocumentoTomador = '';
      this.numeroDocumentoTomador = '';
      this.programaParametrizado = '';
      this.programaSeleccionado = '';
    }
    // ✅ GUARDAR INMEDIATAMENTE al cambiar campo
    this.guardarDatosFormulario();
  }

  // ✅ Método para manejar cambio de clave del intermediario
  onClaveIntermediarioChange(value: string): void {
    console.log('🔑 Clave del intermediario cambiada a:', value);
    // Buscar si la clave existe en la lista predefinida
    const intermediarioEncontrado = this.clavesIntermediario.find(c => c.codigo === value);
    if (intermediarioEncontrado) {
      this.nombreIntermediario = intermediarioEncontrado.nombre;
      console.log('✅ Intermediario encontrado:', intermediarioEncontrado.nombre);
    } else if (value && value.length >= 3) {
      // Si no está en la lista pero tiene al menos 3 caracteres, simular búsqueda
      this.nombreIntermediario = `Intermediario Manual - Clave: ${value}`;
      console.log('📝 Clave manual ingresada:', value);
    } else {
      this.nombreIntermediario = '';
    }
    // ✅ GUARDAR INMEDIATAMENTE al cambiar campo (después de asignar nombreIntermediario)
    this.guardarDatosFormulario();
  }

  // ✅ Método para abrir ayuda
  // ✅ Método para manejar cambio de fecha en calendario
  onFechaChange(tipo: string, fecha: string): void {
    console.log(`📅 Fecha ${tipo} cambiada a:`, fecha);
    switch (tipo) {
      case 'inicio':
        this.fechaInicioContrato = fecha;
        break;
      case 'fin':
        this.fechaFinContrato = fecha;
        break;
      case 'inicioRC':
        this.fechaInicioRC = fecha;
        break;
      case 'finRC':
        this.fechaFinRC = fecha;
        break;
    }
  }

  openHelp(): void {
    console.log('📞 Abriendo ayuda...');
    // Aquí se puede implementar un modal de ayuda o abrir un chat
  }

  // ✅ Métodos para el modal de éxito
  closeSuccessModal(): void {
    this.showSuccessModal = false;
  }

  acceptSuccessModal(): void {
    this.showSuccessModal = false;
    // El paso ya se cambió, solo cerramos el modal
  }

  nextStep(): void {
    console.log('🔄 nextStep ejecutado. Estado actual:', {
      currentStep: this.currentStep,
      maxSteps: this.stepperConfig.items!.length - 1,
    });

    // ✅ GUARDAR DATOS antes de cambiar de paso
    this.guardarDatosFormulario();

    // ✅ Validar campos obligatorios en el paso 1
    if (this.currentStep === 0) {
      // Validar archivo de contrato - permite pasar si hay archivo seleccionado O documentos en la lista
      if (!this.selectedFileName && this.documentosSoporte.length === 0) {
        this.contractFileError = true;
        console.log('❌ Archivo de contrato requerido (o agregar a la lista)');
        return;
      }

      // Si es Grandes Beneficiarios, validar campos adicionales
      if (this.tipoProducto === 'grandes-beneficiarios') {
        if (
          !this.claveIntermediario ||
          !this.programaParametrizado ||
          !this.tipoDocumentoTomador ||
          !this.numeroDocumentoTomador ||
          !this.tipoDocumentoAsegurado ||
          !this.numeroDocumentoAsegurado
        ) {
          console.log('❌ Campos obligatorios faltantes para Grandes Beneficiarios:', {
            claveIntermediario: this.claveIntermediario,
            programaParametrizado: this.programaParametrizado,
            tipoDocumentoTomador: this.tipoDocumentoTomador,
            numeroDocumentoTomador: this.numeroDocumentoTomador,
            tipoDocumentoAsegurado: this.tipoDocumentoAsegurado,
            numeroDocumentoAsegurado: this.numeroDocumentoAsegurado,
          });
          return;
        }
      }

      // Mostrar modal de éxito al pasar al paso 2
      this.showSuccessModal = true;

      // Simular procesamiento automático
      this.simulateContractProcessing();
    }

    // Avanzar al siguiente paso
    if (this.currentStep < this.stepperConfig.items!.length - 1) {
      this.currentStep++;
      this.stepperConfig.activeIndex = this.currentStep;

      console.log('✅ Paso avanzado. Nuevo currentStep:', this.currentStep);

      // ✅ Verificar grandes beneficiarios al cambiar al paso 2
      if (this.currentStep === 1) {
        console.log('🔄 Cambiando al paso 2, verificando grandes beneficiarios...');
        this.checkGrandesBeneficiarios();
      }

      // ✅ Actualizar tablas de resumen cuando se avanza al paso 3
      if (this.currentStep === 2) {
        console.log('📊 Actualizando tablas de resumen para paso 3');
        this.updateSummaryTables();
      }
    } else {
      console.log('❌ No se puede avanzar. Razón:', {
        isMaxStep: this.currentStep >= this.stepperConfig.items!.length - 1,
      });
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

  submitForm(): void {
    // Validar todos los pasos antes del envío final
    const allValid = this.stepperConfig.items!.every((_, index) => {
      if (index < 2) {
        // Solo validar pasos con formularios (0 y 1)
        const prevStep = this.currentStep;
        this.currentStep = index;
        const isValid = this.validateCurrentStep();
        this.currentStep = prevStep;
        return isValid;
      }
      return true;
    });

    if (allValid) {
      // Combinar datos de todos los formularios
      const allData = {
        ...this.step1Form.form?.value,
        ...this.step2Form.form?.value,
      };
      console.log('Formulario completo:', allData);

      // Mostrar mensaje según la acción
      const actionLabel = this.getActionLabel();
      alert(`${actionLabel.successMessage}\n\nDatos: ${JSON.stringify(allData, null, 2)}`);

      // Navegar de vuelta al dashboard
      this.router.navigate(['/dashboard']);
    } else {
      alert('⚠️ Por favor complete todos los campos obligatorios antes de continuar.');
    }
  }

  // ✅ Simulación de procesamiento de contrato
  simulateContractProcessing(): void {
    this.isProcessing = true;
    this.btnProcessContract.loading = true;

    // Simular delay de procesamiento
    setTimeout(() => {
      // Llenar formulario del paso 2 con datos simulados
      this.step2Form.form?.patchValue(MOCK_EXTRACTED_CONTRACT_DATA);
      this.step2Data = MOCK_EXTRACTED_CONTRACT_DATA;

      this.isProcessing = false;
      this.btnProcessContract.loading = false;
      this.fileName = 'contrato-ejemplo.pdf';

      // Mostrar notificación sin alert
      console.log('✅ Procesamiento completado exitosamente!');
    }, 2000);
  }

  // ✅ Métodos auxiliares para el template
  get isFirstStep(): boolean {
    return this.currentStep === 0;
  }

  get isLastStep(): boolean {
    return this.currentStep === this.stepperConfig.items!.length - 1;
  }

  get isConfirmationStep(): boolean {
    return this.currentStep === 2;
  }

  // ✅ Validar si el Paso 1 está completo
  get isStep1Complete(): boolean {
    // Campos básicos siempre obligatorios
    if (!this.tipoProducto || !this.claveIntermediario) {
      return false;
    }

    // Validaciones específicas por tipo de producto
    if (this.tipoProducto === 'grandes-beneficiarios') {
      return !!(
        this.tipoDocumentoAsegurado &&
        this.numeroDocumentoAsegurado &&
        this.nombreAsegurado &&
        this.tipoDocumentoTomador &&
        this.numeroDocumentoTomador &&
        this.nombreTomador &&
        this.programaParametrizado
      );
    }

    if (this.tipoProducto === 'particulares' || this.tipoProducto === 'estatales') {
      return !!(
        this.tipoDocumentoTomador &&
        this.numeroDocumentoTomador &&
        this.nombreTomador &&
        this.tipoDocumentoAsegurado &&
        this.numeroDocumentoAsegurado &&
        this.nombreAsegurado
      );
    }

    return true;
  }

  // ✅ Enfocar el primer campo inválido en el Paso 1
  focusFirstInvalidField(): void {
    // Marcar formulario como enviado para mostrar errores
    this.formSubmitted = true;

    // Lista de campos a validar en orden
    const fieldsToCheck = [
      { condition: !this.tipoProducto, selector: '.custom-dropdown' },
      { condition: !this.claveIntermediario, selector: '[class*="claveIntermediario"]' },
    ];

    // Campos adicionales según tipo de producto
    if (this.tipoProducto === 'grandes-beneficiarios') {
      fieldsToCheck.push(
        { condition: !this.tipoDocumentoAsegurado, selector: '[class*="tipoDocAseguradoGB"]' },
        {
          condition: !this.numeroDocumentoAsegurado || !this.nombreAsegurado,
          selector:
            'input[placeholder*="asegurado"], input[ng-reflect-model="numeroDocumentoAsegurado"]',
        },
        { condition: !this.tipoDocumentoTomador, selector: '[class*="tipoDocTomadorGB"]' },
        {
          condition: !this.numeroDocumentoTomador || !this.nombreTomador,
          selector: 'input[ng-reflect-model="numeroDocumentoTomador"]',
        },
        { condition: !this.programaParametrizado, selector: '[class*="programas"]' },
      );
    } else if (this.tipoProducto === 'particulares' || this.tipoProducto === 'estatales') {
      fieldsToCheck.push(
        { condition: !this.tipoDocumentoTomador, selector: '[class*="tipoDocTomadorPE"]' },
        {
          condition: !this.numeroDocumentoTomador || !this.nombreTomador,
          selector: '.campos-adicionales-particulares input',
        },
        { condition: !this.tipoDocumentoAsegurado, selector: '[class*="tipoDocAseguradoPE"]' },
        {
          condition: !this.numeroDocumentoAsegurado || !this.nombreAsegurado,
          selector: '.campos-adicionales-particulares input:last-of-type',
        },
      );
    }

    // Buscar y enfocar el primer campo inválido
    for (const field of fieldsToCheck) {
      if (field.condition) {
        const element = document.querySelector(field.selector) as HTMLElement;
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => {
            if (element.tagName === 'INPUT') {
              (element as HTMLInputElement).focus();
            } else {
              element.click();
            }
          }, 300);
          return;
        }
      }
    }
  }

  // ✅ Manejar clic en botón Siguiente del Paso 1
  onNextStepClick(): void {
    if (!this.isStep1Complete) {
      this.focusFirstInvalidField();
      return;
    }
    this.nextStep();
  }

  // ✅ Método privado para actualizar el cache del actionLabel
  private updateCachedActionLabel(): void {
    this._cachedIsMobile = window.innerWidth <= 768;
    this._cachedActionLabel = this._cachedIsMobile
      ? ACTION_LABELS_MOBILE[this.action]
      : ACTION_LABELS[this.action];
  }

  // ✅ Método que retorna labels optimizados según el tamaño de pantalla (usa cache)
  getActionLabel(): ActionLabel {
    return this._cachedActionLabel;
  }

  // ✅ Método para obtener el título dinámico según el paso actual (usa cache)
  getCurrentStepTitle(): string {
    switch (this.currentStep) {
      case 0:
        return this._cachedActionLabel.step1Title;
      case 1:
        return this._cachedActionLabel.step2Title;
      case 2:
        return this._cachedActionLabel.step3Title;
      default:
        return this._cachedActionLabel.step1Title;
    }
  }

  // ✅ Método para obtener la descripción dinámica según el paso actual (usa cache)
  getCurrentStepDescription(): string {
    switch (this.currentStep) {
      case 0:
        return this._cachedActionLabel.step1Description;
      case 1:
        return this._cachedActionLabel.step2Description;
      case 2:
        return this._cachedActionLabel.step3Description;
      default:
        return this._cachedActionLabel.step1Description;
    }
  }

  // ✅ Método auxiliar para detectar mobile (usa cache)
  get isMobile(): boolean {
    return this._cachedIsMobile;
  }

  // ✅ Listener para cambios de tamaño de ventana (actualiza cache)
  // ✅ Cerrar TODOS los dropdowns al hacer click fuera
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-dropdown')) {
      Object.keys(this.dropdownsOpen).forEach(key => {
        this.dropdownsOpen[key] = false;
      });
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    // ✅ Actualizar cache cuando cambia el tamaño de pantalla
    this.updateCachedActionLabel();
    this.cdr.detectChanges();
  }

  private resetFormState(): void {
    this.currentStep = 0;
    this.stepperConfig.activeIndex = 0;
    this.fileName = null;
    this.isProcessing = false;
    this.step2Data = INITIAL_STEP2_DATA;

    // ✅ RESETEAR estado del formulario
    this.isFormEnabled = false;
    this.selectedAction = null;
    this.selectedEmitirOption = null;

    // Actualizar label del botón submit según la acción
    this.btnSubmit.label = this.getActionLabel().submitLabel;
  }

  // ✅ Getters para datos de confirmación
  get step1Data(): Record<string, unknown> {
    return this.step1Form.form?.value || {};
  }

  get step2FormData(): Record<string, unknown> {
    return this.step2Form.form?.value || {};
  }

  // ✅ Métodos de manejo de archivos usando tech-block-lib
  // ✅ RF-008: Validar archivo cuando se captura desde la librería tech-block-lib
  onFileCaught(files: File[]): void {
    if (files.length > 0) {
      const file = files[0];

      // ✅ RF-008: Validar longitud del nombre del archivo
      if (file.name.length > this.MAX_FILE_NAME_LENGTH) {
        this.showErrorNotification(
          `La cantidad máxima de caracteres del nombre del archivo es de ${this.MAX_FILE_NAME_LENGTH}`,
        );
        return;
      }

      this.fileName = file.name;
      this.contractFileError = false; // ✅ Limpiar error cuando se carga un archivo
      console.log('Archivo seleccionado:', file);
    }
  }

  // ✅ RF-008: Mostrar confirmación antes de eliminar archivo (cuando se elimina desde la librería)
  onFileDeleted(_file: File): void {
    this.showAlertaEliminarArchivo = true;
  }

  onFileReload(uploadingFile: any): void {
    console.log('Recargando archivo:', uploadingFile);
  }

  // ✅ Métodos para manejar eventos de la tabla de coberturas
  onCoberturaSelect(event: any): void {
    console.log('Cobertura seleccionada:', event);
  }

  onCoberturaUnselect(event: any): void {
    console.log('Cobertura deseleccionada:', event);
  }

  onCoberturaSelectionChange(event: any): void {
    console.log('Cambio en selección de coberturas:', event);
  }

  // ✅ Métodos para los botones de acción de la tabla
  clearCoberturasSelection(): void {
    // ✅ Limpiar selección y restaurar valores originales
    if (this.coberturasTable.value) {
      this.coberturasTable.value.forEach(cobertura => {
        if (cobertura.seleccionado) {
          cobertura.seleccionado = false;
          this.restoreOriginalValues(cobertura);
        }
      });
    }

    this.coberturasTable.selection = [];
    this.coberturasTable.editingRowKeys = {};
    console.log('Selección de coberturas limpiada y valores restaurados');
  }

  refreshCoberturas(): void {
    // ✅ Actualizar datos de coberturas
    console.log('Actualizando coberturas...');
    // Aquí se haría la llamada al backend para refrescar datos
  }

  // ✅ Método para manejar cambio de checkbox de cobertura
  onCoberturaCheckboxChange(cobertura: any, event: any): void {
    const wasSelected = cobertura.seleccionado;
    cobertura.seleccionado = event.target.checked;

    if (wasSelected && !cobertura.seleccionado) {
      // ✅ Si se deseleccionó, restaurar valores originales
      this.restoreOriginalValues(cobertura);
    }

    console.log('Cobertura seleccionada/deseleccionada:', cobertura);
  }

  // ✅ Restaurar valores originales de una cobertura
  private restoreOriginalValues(cobertura: any): void {
    const original = this.coberturasOriginales.find(c => c.id === cobertura.id);
    if (original) {
      cobertura.porcentajeAsegurado = original.porcentajeAsegurado;
      cobertura.valorAsegurado = original.valorAsegurado;
      cobertura.fechaInicio = original.fechaInicio;
      cobertura.fechaVencimiento = original.fechaVencimiento;
      cobertura.tiempoAdicional = original.tiempoAdicional;
      cobertura.prima = original.prima;
      console.log('Valores restaurados para cobertura:', cobertura.cobertura);
    }
  }

  // ✅ Métodos para manejar cambios en campos editables
  onPorcentajeChange(cobertura: any, event: any): void {
    const newValue = parseInt(event.target.value) || 0;
    cobertura.porcentajeAsegurado = Math.min(Math.max(newValue, 0), 100); // Limitar entre 0-100
    console.log('Porcentaje actualizado:', cobertura.porcentajeAsegurado);
  }

  onValorAseguradoChange(cobertura: any, event: any): void {
    const newValue = parseInt(event.target.value) || 0;
    cobertura.valorAsegurado = Math.max(newValue, 0); // No permitir valores negativos
    console.log('Valor asegurado actualizado:', cobertura.valorAsegurado);
  }

  onTasaChange(cobertura: any, event: any): void {
    const newValue = parseFloat(event.target.value) || 0;
    cobertura.tasa = Math.max(newValue, 0); // No permitir valores negativos
    console.log('Tasa actualizada:', cobertura.tasa);
  }

  onFechaInicioChange(cobertura: any, event: any): void {
    cobertura.fechaInicio = event.target.value;
    console.log('Fecha inicio actualizada:', cobertura.fechaInicio);
  }

  onFechaVencimientoChange(cobertura: any, event: any): void {
    cobertura.fechaVencimiento = event.target.value;
    console.log('Fecha vencimiento actualizada:', cobertura.fechaVencimiento);
  }

  onTiempoAdicionalChange(cobertura: any, event: any): void {
    cobertura.tiempoAdicional = parseInt(event.target.value) || 0;
    console.log('Tiempo adicional actualizado:', cobertura.tiempoAdicional);
  }

  onPrimaChange(cobertura: any, event: any): void {
    cobertura.prima = parseFloat(event.target.value) || 0;
    console.log('Prima actualizada:', cobertura.prima);
  }

  // ✅ Guardar cambios de coberturas editadas
  saveCoberturasChanges(): void {
    if (!this.coberturasTable.value) {
      console.log('No hay datos de coberturas disponibles');
      return;
    }

    const coberturasEditadas = this.coberturasTable.value.filter(c => c.seleccionado);

    if (coberturasEditadas.length > 0) {
      console.log('Guardando cambios de coberturas:', coberturasEditadas);
      // ✅ Aquí se haría la llamada al backend para guardar los cambios
      // Por ahora solo simulamos el guardado
      alert(
        `✅ Se guardaron exitosamente los cambios de ${coberturasEditadas.length} cobertura(s) de cumplimiento.`,
      );
    } else {
      console.log('No hay coberturas seleccionadas para guardar');
    }
  }

  // ✅ Métodos para coberturas RC
  onRcCoberturaSelect(event: any): void {
    console.log('Cobertura RC seleccionada:', event);
  }

  onRcCoberturaUnselect(event: any): void {
    console.log('Cobertura RC deseleccionada:', event);
  }

  onRcCoberturaSelectionChange(event: any): void {
    console.log('Cambio en selección de coberturas RC:', event);
  }

  // ✅ Método para manejar cambio de checkbox de cobertura RC
  onRcCoberturaCheckboxChange(cobertura: any, event: any): void {
    const wasSelected = cobertura.seleccionado;
    cobertura.seleccionado = event.target.checked;

    if (wasSelected && !cobertura.seleccionado) {
      // ✅ Si se deseleccionó, restaurar valores originales
      this.restoreRcOriginalValues(cobertura);
    }

    console.log('Cobertura RC seleccionada/deseleccionada:', cobertura);
  }

  // ✅ Restaurar valores originales de una cobertura RC
  private restoreRcOriginalValues(cobertura: any): void {
    const original = this.rcCoberturasOriginales.find(c => c.id === cobertura.id);
    if (original) {
      cobertura.porcentajeAsegurado = original.porcentajeAsegurado;
      cobertura.valorAsegurado = original.valorAsegurado;
      cobertura.tasa = original.tasa;
      cobertura.fechaInicio = original.fechaInicio;
      cobertura.fechaVencimiento = original.fechaVencimiento;
      console.log('Valores restaurados para cobertura RC:', cobertura.cobertura);
    }
  }

  // ✅ Métodos para manejar cambios en campos editables RC
  onRcPorcentajeChange(cobertura: any, event: any): void {
    const newValue = parseInt(event.target.value) || 0;
    cobertura.porcentajeAsegurado = Math.min(Math.max(newValue, 0), 100); // Limitar entre 0-100
    console.log('Porcentaje RC actualizado:', cobertura.porcentajeAsegurado);
  }

  onRcValorAseguradoChange(cobertura: any, event: any): void {
    const newValue = parseInt(event.target.value) || 0;
    cobertura.valorAsegurado = Math.max(newValue, 0); // No permitir valores negativos
    console.log('Valor asegurado RC actualizado:', cobertura.valorAsegurado);
  }

  onRcTasaChange(cobertura: any, event: any): void {
    const newValue = parseFloat(event.target.value) || 0;
    cobertura.tasa = Math.max(newValue, 0); // No permitir valores negativos
    console.log('Tasa RC actualizada:', cobertura.tasa);
  }

  onRcFechaInicioChange(cobertura: any, event: any): void {
    cobertura.fechaInicio = event.target.value;
    console.log('Fecha inicio RC actualizada:', cobertura.fechaInicio);
  }

  onRcFechaVencimientoChange(cobertura: any, event: any): void {
    cobertura.fechaVencimiento = event.target.value;
    console.log('Fecha vencimiento RC actualizada:', cobertura.fechaVencimiento);
  }

  // ✅ Métodos para los botones de acción de la tabla RC
  clearRcCoberturasSelection(): void {
    // ✅ Limpiar selección y restaurar valores originales
    if (this.rcCoberturasTable.value) {
      this.rcCoberturasTable.value.forEach(cobertura => {
        if (cobertura.seleccionado) {
          cobertura.seleccionado = false;
          this.restoreRcOriginalValues(cobertura);
        }
      });
    }

    // ✅ Limpiar selecciones de la tabla tech-block
    if (this.rcCoberturasTable.selection) {
      this.rcCoberturasTable.selection = [];
    }
    if (this.rcCoberturasTable.editingRowKeys) {
      this.rcCoberturasTable.editingRowKeys = {};
    }
    console.log('Selección de coberturas RC limpiada y valores restaurados');
  }

  refreshRcCoberturas(): void {
    // ✅ Recargar datos de coberturas RC
    this.rcCoberturasTable.value = JSON.parse(JSON.stringify(this.rcCoberturasOriginales));
    console.log('Coberturas RC actualizadas');
  }

  // ✅ Guardar cambios de coberturas RC editadas
  saveRcCoberturasChanges(): void {
    if (!this.rcCoberturasTable.value) {
      console.log('No hay datos de coberturas RC disponibles');
      return;
    }

    const coberturasEditadas = this.rcCoberturasTable.value.filter(c => c.seleccionado);

    if (coberturasEditadas.length > 0) {
      console.log('Guardando cambios de coberturas RC:', coberturasEditadas);
      // ✅ Aquí se haría la llamada al backend para guardar los cambios
      // Por ahora solo simulamos el guardado
      alert(
        `✅ Se guardaron exitosamente los cambios de ${coberturasEditadas.length} cobertura(s) de responsabilidad civil.`,
      );
    } else {
      console.log('No hay coberturas RC seleccionadas para guardar');
    }
  }

  // ✅ Método para toggle del acordeón RC (HTML nativo)
  toggleRcAccordion(): void {
    this.rcAccordionOpen = !this.rcAccordionOpen;
    console.log('Acordeón RC:', this.rcAccordionOpen ? 'expandido' : 'contraído');
  }

  // ✅ Método para habilitar/deshabilitar toda la sección RC con comportamiento de acordeón
  onRcSectionToggle(event: any): void {
    this.isRcSectionEnabled = event.target.checked;

    if (!this.isRcSectionEnabled) {
      // ✅ Si se deshabilita la sección, contraer el acordeón y limpiar selecciones
      this.rcAccordionTab.selected = false; // Contraer tab del acordeón
      this.rcAccordionTab.disabled = true; // Deshabilitar tab
      this.rcAccordionConfig.activeIndex = -1; // Contraer todo el acordeón
      this.rcAccordionOpen = false;
      this.clearRcCoberturasSelection();
      console.log('Sección RC deshabilitada - acordeón contraído y selecciones limpiadas');
    } else {
      // ✅ Si se habilita la sección, expandir el acordeón
      this.rcAccordionTab.selected = true; // Expandir tab del acordeón
      this.rcAccordionTab.disabled = false; // Habilitar tab
      this.rcAccordionConfig.activeIndex = 0; // Expandir primer tab
      this.rcAccordionOpen = true;
      console.log('Sección RC habilitada - acordeón expandido');
    }
  }

  // ✅ Métodos para el paso 3
  quoteBusiness(): void {
    console.log('🚀 MÉTODO EJECUTADO: quoteBusiness - Mostrando resumen de cotización');

    // ✅ Generar datos de la cotización
    this.quoteSummaryData = this.generateQuoteSummaryData();

    // ✅ Mostrar vista de resumen de cotización
    this.showQuoteSummary = true;
  }

  // ✅ Métodos para cálculos de costos
  getPrimaNeta(): string {
    const prima = this.quoteSummaryData?.premium || 0;
    return `$ ${prima.toLocaleString()}`;
  }

  getIVA(): string {
    const prima = this.quoteSummaryData?.premium || 0;
    const iva = Math.round(prima * 0.19);
    return `$ ${iva.toLocaleString()}`;
  }

  getPrimaTotal(): string {
    const prima = this.quoteSummaryData?.premium || 0;
    const total = Math.round(prima * 1.19);
    return `$ ${total.toLocaleString()}`;
  }

  // ✅ Método para generar datos del resumen de cotización
  private generateQuoteSummaryData(): any {
    const quoteNumber = Date.now().toString().slice(-6);

    const quoteData = {
      quoteNumber: quoteNumber,
      status: '',
      creationDate: '19/9/2025',
      product: 'Producto por defecto',
      policyType: 'Civil',
      insuredValue: 620000000,
      availableCredit: 2480000000,
      contractNumber: 'CONT-GENERAL-2024-001',
      documentType: 'CC',
      clientName: 'Cliente Demo',
      clientDocument: '12345678',
      currency: 'COP',
      insuredDocumentType: 'CC',
      insuredDocumentNumber: '12345678',
      insuredName: 'Cliente Demo',
      // ✅ Información adicional de la cotización
      coverage: 'General',
      premium: Math.round(620000000 * 0.05), // 5% del valor asegurado
      validity: '12 meses',
      startDate: new Date().toLocaleDateString('es-CO'),
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('es-CO'),

      // ✅ Ubicación del Riesgo
      department: 'Cundinamarca',
      localityMunicipality: 'Bogotá D.C.',
      riskAddress: 'Calle 100 # 15-20, Bogotá D.C.',

      // ✅ Detalles del Contrato
      contractValue: 620000000,
      contractStartDate: '01/01/2024',
      contractDuration: 12,
      contractEndDate: '31/12/2024',
      // ✅ Coberturas seleccionadas
      selectedCoverages: [
        { id: '226', name: 'Contratista Y Subcontratista', value: 500000000, selected: true },
        { id: '227', name: 'Gastos Medicos Persona', value: 100000000, selected: true },
        { id: '232', name: 'Contaminación Accidental', value: 20000000, selected: true },
      ],
      // ✅ Coberturas aceptadas para cumplimiento (imagen 1) - 3 coberturas seleccionadas
      complianceCoverages: [
        {
          id: '401',
          name: 'Seriedad De La Oferta',
          value: 150000000,
          percentage: 5,
          status: 'Activa',
          accepted: true,
        },
        {
          id: '403',
          name: 'Cumplimiento',
          value: 300000000,
          percentage: 10,
          status: 'Activa',
          accepted: true,
        },
        {
          id: '406',
          name: 'Calidad Del Servicio',
          value: 200000000,
          percentage: 7,
          status: 'Activa',
          accepted: true,
        },
      ],
      // ✅ Coberturas RC (imagen 2) - 3 coberturas seleccionadas
      rcCoverages: [
        {
          id: '226',
          name: 'Contratista Y Subcontratista',
          value: 500000000,
          percentage: 15,
          status: 'Activa',
          accepted: true,
        },
        {
          id: '227',
          name: 'Gastos Medicos Persona',
          value: 100000000,
          percentage: 3,
          status: 'Activa',
          accepted: true,
        },
        {
          id: '232',
          name: 'Contaminación Accidental',
          value: 200000000,
          percentage: 6,
          status: 'Activa',
          accepted: true,
        },
      ],
    };

    console.log('🔍 DEBUG: Datos de cotización generados:', quoteData);
    console.log('🔍 DEBUG: Coberturas seleccionadas:', quoteData.selectedCoverages);
    console.log('🔍 DEBUG: Coberturas de cumplimiento:', quoteData.complianceCoverages);
    console.log('🔍 DEBUG: Coberturas RC:', quoteData.rcCoverages);

    return quoteData;
  }

  // ✅ Método para generar emisión desde el resumen
  generateEmissionFromSummary(): void {
    console.log('🚀 MÉTODO EJECUTADO: generateEmissionFromSummary');

    this.loading = true;

    // ✅ Simular proceso de emisión
    setTimeout(() => {
      this.loading = false;

      // ✅ Mostrar notificación de éxito
      this.showSuccessNotification(
        `¡Emisión generada exitosamente! Póliza ${this.quoteSummaryData.quoteNumber} emitida.`,
      );

      // ✅ Ocultar la vista de resumen
      this.showQuoteSummary = false;
      this.quoteSummaryData = null;
    }, 2000);
  }

  // ✅ Método para volver al formulario desde el resumen
  backToForm(): void {
    console.log('🔙 Volviendo al formulario desde resumen');
    this.showQuoteSummary = false;
    this.quoteSummaryData = null;
  }

  // ✅ Método para "Quiero Emitir" - botón del paso 3 (abre modal Resumen de Cotización)
  onQuieroEmitir(): void {
    console.log('📋 Quiero Emitir clicked - Abriendo modal de Resumen de Cotización');
    this.showQuoteSummary = true;
    this.quoteSummaryData = {
      quoteNumber: '311551',
      status: '',
      creationDate: '19/9/2025',
      product: 'Producto por defecto',
      insuredValue: 620000000,
      availableCredit: 2480000000,
      contractNumber: 'CONT-GENERAL-2024-001',
      documentType: 'CC',
      clientName: 'Cliente Demo',
      clientDocument: '12345678',
      currency: 'COP',
      insuredDocumentType: 'CC',
      insuredDocumentNumber: '12345678',
      insuredName: 'Cliente Demo',
      department: 'Cundinamarca',
      municipality: 'Bogotá D.C.',
      riskAddress: 'Calle 100 # 15-20, Bogotá D.C.',
      contractValue: 620000000,
      contractStartDate: '01/01/2024',
      contractDuration: '12 meses',
      contractEndDate: '31/12/2024',
      coberturasCumplimiento: [
        {
          cobertura: 'Seriedad De La Oferta',
          porcentaje: '5%',
          valorAsegurado: 150000000,
          estado: 'Activa',
        },
        {
          cobertura: 'Cumplimiento',
          porcentaje: '10%',
          valorAsegurado: 300000000,
          estado: 'Activa',
        },
        {
          cobertura: 'Calidad Del Servicio',
          porcentaje: '7%',
          valorAsegurado: 200000000,
          estado: 'Activa',
        },
      ],
      rcCoverages: [
        {
          name: 'Contratista Y Subcontratista',
          percentage: 15,
          value: 500000000,
          status: 'Activa',
        },
        { name: 'Gastos Medicos Persona', percentage: 3, value: 100000000, status: 'Activa' },
        { name: 'Contaminación Accidental', percentage: 6, value: 200000000, status: 'Activa' },
      ],
    };
  }

  // ✅ Método para cerrar el modal de Resumen de Cotización
  closeQuoteSummary(): void {
    this.showQuoteSummary = false;
  }

  // ✅ Método para "Generar Emisión" desde el modal
  onGenerarEmision(): void {
    console.log('🚀 Generar Emisión clicked');
    this.showQuoteSummary = false;
    this.showSuccessToast = true;
    this.successToastMessage = '¡Emisión generada exitosamente! Póliza COT-311551 emitida.';

    // Ocultar el toast después de 5 segundos
    setTimeout(() => {
      this.showSuccessToast = false;
    }, 5000);
  }

  // ✅ Método para "Generar Cotización" - botón del paso 3 (muestra toast de éxito)
  onGenerarCotizacion(): void {
    console.log('📊 Generar Cotización clicked - Mostrando toast de éxito');
    this.showSuccessToast = true;
    this.successToastMessage = 'Su cotización quedó generada correctamente';

    // Ocultar el toast después de 5 segundos
    setTimeout(() => {
      this.showSuccessToast = false;
    }, 5000);
  }

  // ✅ Propiedad para el toast de éxito
  showSuccessToast = false;
  successToastMessage = '';

  // ✅ Modal de datos restaurados
  showDatosRestauradosModal = false;

  // ✅ Método para ocultar el toast de éxito al hacer clic
  hideSuccessToast(): void {
    this.showSuccessToast = false;
  }

  // ✅ Método para cerrar el modal de datos restaurados
  cerrarDatosRestauradosModal(): void {
    this.showDatosRestauradosModal = false;
  }

  // ✅ Método para generar cotización usando EXCLUSIVAMENTE TechBlock
  async onGenerateQuote(): Promise<void> {
    console.log('🚀 MÉTODO EJECUTADO: onGenerateQuote - TechBlock Implementation');

    this.loading = true;
    console.log('🔍 DEBUG: loading establecido a true');

    try {
      // ✅ Obtener datos del formulario actual
      const formData = this.getCurrentFormData();

      // ✅ Llamar al servicio de cotización
      const result$ = this.quoteService.generateQuote(formData);
      const result = await firstValueFrom(result$);

      console.log('✅ Cotización generada exitosamente:', result);

      // ✅ Mostrar notificación de éxito usando TechBlock Snackbar
      this.ngZone.run(() => {
        this.showSuccessNotification('Su cotización quedó generada correctamente');
      });
    } catch (error) {
      console.error('❌ Error generando cotización:', error);

      // ✅ Mostrar notificación de error usando TechBlock Snackbar
      this.ngZone.run(() => {
        this.showErrorNotification('No se pudo generar la cotización. Inténtalo de nuevo.');
      });
    } finally {
      this.loading = false;
      console.log('🔍 DEBUG: loading establecido a false');
    }
  }

  // ✅ Método para generar número de cotización
  generateQuoteNumber(): string {
    const timestamp = Date.now();
    const randomArray = new Uint32Array(1);
    crypto.getRandomValues(randomArray);
    const randomSuffix = (randomArray[0] % 1000).toString().padStart(3, '0');
    return `COT-${timestamp.toString().slice(-6)}-${randomSuffix}`;
  }

  // ✅ Método para actualizar el formulario del paso 2
  updateStep2Form(): void {
    this.step2Form = step2ContractInfoForm(
      this.coberturasTable,
      {
        onCoberturaSelect: (event: any) => this.onCoberturaSelect(event),
        onCoberturaSelectionChange: (event: any) => this.onCoberturaSelectionChange(event),
        onPorcentajeChange: (data: { cobertura: any; event: any }) =>
          this.onPorcentajeChange(data.cobertura, data.event),
        onValorAseguradoChange: (data: { cobertura: any; event: any }) =>
          this.onValorAseguradoChange(data.cobertura, data.event),
        onTasaChange: (data: { cobertura: any; event: any }) =>
          this.onTasaChange(data.cobertura, data.event),
        onFechaInicioChange: (data: { cobertura: any; event: any }) =>
          this.onFechaInicioChange(data.cobertura, data.event),
        onFechaVencimientoChange: (data: { cobertura: any; event: any }) =>
          this.onFechaVencimientoChange(data.cobertura, data.event),
        onTiempoAdicionalChange: (data: { cobertura: any; event: any }) =>
          this.onTiempoAdicionalChange(data.cobertura, data.event),
        onPrimaChange: (data: { cobertura: any; event: any }) =>
          this.onPrimaChange(data.cobertura, data.event),
        onCheckboxChange: (data: { cobertura: any; event: any }) =>
          this.onCoberturaCheckboxChange(data.cobertura, data.event),
        onClearSelection: () => this.clearCoberturasSelection(),
        onRefreshCoberturas: () => this.refreshCoberturas(),
        onSaveChanges: () => this.saveCoberturasChanges(),
      },
      this.showGrandesBeneficiarios,
    );
  }

  // ✅ Método para verificar si se debe mostrar la sección de grandes beneficiarios
  checkGrandesBeneficiarios(): void {
    const formData = this.step1Form?.form?.value || {};
    const selectedProduct = formData.insuranceProduct;
    const newShowGrandesBeneficiarios = selectedProduct === 'grandes-beneficiarios';

    console.log('🔍 checkGrandesBeneficiarios:', {
      formData,
      selectedProduct,
      newShowGrandesBeneficiarios,
      currentShowGrandesBeneficiarios: this.showGrandesBeneficiarios,
    });

    // Solo actualizar si el estado cambió
    if (this.showGrandesBeneficiarios !== newShowGrandesBeneficiarios) {
      console.log('🔄 Actualizando showGrandesBeneficiarios:', newShowGrandesBeneficiarios);
      this.showGrandesBeneficiarios = newShowGrandesBeneficiarios;
      this.updateStep2Form();
    } else {
      console.log('ℹ️ No hay cambios en showGrandesBeneficiarios');
    }
  }

  // ✅ NUEVO: Método para mostrar modal "Cliente no creado"
  showClienteNoCreadoModal(): void {
    console.log('🚨 Mostrando modal "Cliente no creado"');
    // ✅ Reconfigurar modal antes de mostrarlo para asegurar configuración correcta
    this.clienteNoCreadoModal = this.createClienteNoCreadoModalConfig();
    this.clienteNoCreadoModal.visible = true;
  }

  // ✅ NUEVO: Método para crear configuración del modal "Cliente no creado" dinámicamente
  private createClienteNoCreadoModalConfig(): ILibTbModal {
    const isEmitirMode = this.action === PolicyInputAction.EMITIR;

    return {
      title: 'Cliente no creado',
      visible: false,
      size: 'medium',
      closable: !isEmitirMode, // ✅ No se puede cerrar en modo EMITIR (bloqueante)
      closeOnEscape: !isEmitirMode, // ✅ No se puede cerrar con ESC en modo EMITIR
      dismissableMask: !isEmitirMode, // ✅ No se puede cerrar clickeando fuera en modo EMITIR
      class: 'cliente-no-creado-modal',
      containerClass: 'cliente-no-creado-modal-container',
      contentStyleClass: 'cliente-no-creado-modal-content',
      baseZIndex: 1000,
      autoZIndex: true,
      focusOnShow: true,
      focusTrap: true,
      closeIcon: isEmitirMode ? undefined : 'fa-solid fa-times', // ✅ Sin botón X en modo EMITIR
      primaryButton: {
        label: isEmitirMode ? 'Crear' : 'Continuar',
        icon: isEmitirMode ? 'fa-solid fa-user-plus' : 'fa-solid fa-arrow-right',
        iconPosition: 'right',
        styleBtn: 'fill',
        typeBtn: isEmitirMode ? 'primary' : 'secondary',
        class: isEmitirMode
          ? 'cliente-no-creado-modal__button--create'
          : 'cliente-no-creado-modal__button--continue',
        libTbClick: () => this.continueAfterClienteNoCreado(),
      },
      secondaryButton: isEmitirMode
        ? {
            label: 'Cancelar',
            icon: 'fa-solid fa-times',
            iconPosition: 'left',
            styleBtn: 'stroke',
            typeBtn: 'secondary',
            class: 'cliente-no-creado-modal__button--cancel',
            libTbClick: () => this.cancelClienteNoCreado(),
          }
        : undefined, // ✅ Sin botón secundario en modo COTIZAR
      libTbOnShow: () => {
        console.log(
          `Modal "Cliente no creado" mostrado en modo ${isEmitirMode ? 'EMITIR (bloqueante)' : 'COTIZAR (no bloqueante)'}`,
        );
      },
      libTbOnHide: () => {
        console.log('Modal "Cliente no creado" ocultado');
      },
    };
  }

  // ✅ NUEVO: Método para continuar después del modal "Cliente no creado"
  continueAfterClienteNoCreado(): void {
    console.log('✅ Continuando después del modal "Cliente no creado"');
    this.clienteNoCreadoModal.visible = false;

    // Continuar con el flujo normal del nextStep
    this.simulateContractProcessing();
    this.currentStep++;
    this.stepperConfig.activeIndex = this.currentStep;

    console.log('✅ Paso avanzado después del modal. Nuevo currentStep:', this.currentStep);

    // ✅ Verificar grandes beneficiarios al cambiar al paso 2
    if (this.currentStep === 1) {
      console.log('🔄 Cambiando al paso 2, verificando grandes beneficiarios...');
      this.checkGrandesBeneficiarios();
    }
  }

  // ✅ NUEVO: Método para cancelar en modo EMITIR
  cancelClienteNoCreado(): void {
    console.log('❌ Cancelando creación de cliente en modo EMITIR');
    this.clienteNoCreadoModal.visible = false;
    // En modo EMITIR, cancelar podría redirigir al dashboard o mostrar mensaje
    // Por ahora solo cierra el modal
  }

  // ✅ Método para obtener datos del formulario actual
  private getCurrentFormData(): any {
    // Obtener datos del formulario dinámico actual
    const formData = this.step1Form?.form?.value || {};

    return {
      product: formData.producto || 'Producto por defecto',
      contractValue: formData.valorContrato || 0,
      clientData: {
        nombre: formData.nombre || '',
        email: formData.email || '',
        telefono: formData.telefono || '',
      },
      step2Data: this.step2Data,
      action: this.selectedAction,
    };
  }

  // ✅ Método para mostrar notificación de éxito usando TechBlock Snackbar
  private showSuccessNotification(message: string): void {
    console.log('🎉 Mostrando notificación de éxito:', message);

    this.snackbarConfig = {
      ...this.snackbarConfig,
      show: true,
      message: `✅ ${message}`,
      class: 'snackbar-success-theme',
    };
  }

  // ✅ Método para mostrar notificación de error usando TechBlock Snackbar
  private showErrorNotification(message: string): void {
    console.log('❌ Mostrando notificación de error:', message);

    this.snackbarConfig = {
      ...this.snackbarConfig,
      show: true,
      message: `❌ ${message}`,
      class: 'snackbar-error-theme',
    };
  }

  // ✅ Método para mostrar toast mejorado
  mostrarToast(
    mensaje: string,
    tipo: 'warning' | 'error' | 'success' | 'info' = 'warning',
    titulo: string = '',
    mostrarFormatos: boolean = false,
  ): void {
    this.toastMessage = mensaje;
    this.toastType = tipo;
    this.toastTitle = titulo;
    this.showFormatosPermitidos = mostrarFormatos;
    this.showToast = true;

    // Auto-ocultar después de 8 segundos (tiempo suficiente para leer)
    // Si muestra formatos, dar 10 segundos para mayor claridad
    const duracion = mostrarFormatos ? 10000 : 8000;
    setTimeout(() => {
      this.showToast = false;
      this.showFormatosPermitidos = false;
      this.toastTitle = '';
    }, duracion);
  }

  // ✅ Modal para archivos no válidos - Diseño Bolívar
  showArchivoNoCompatibleModal = false;
  archivoNoCompatibleNombre = '';

  mostrarToastArchivoNoValido(nombreArchivo: string): void {
    this.archivoNoCompatibleNombre = nombreArchivo;
    this.showArchivoNoCompatibleModal = true;
  }

  cerrarArchivoNoCompatibleModal(): void {
    this.showArchivoNoCompatibleModal = false;
    this.archivoNoCompatibleNombre = '';
  }

  aceptarArchivoNoCompatible(): void {
    this.showArchivoNoCompatibleModal = false;
    this.archivoNoCompatibleNombre = '';
  }

  // ✅ Método para manejar clic en zona de carga sin tipo seleccionado
  onUploadAreaClick(): void {
    if (!this.tipoDocumentoSoporte) {
      this.mostrarToast(
        'Selecciona el tipo de documento para poder cargar el archivo',
        'warning',
        'Paso requerido',
      );
    } else {
      this.triggerFileInput();
    }
  }

  // ✅ Cerrar toast manualmente
  cerrarToast(): void {
    this.showToast = false;
    this.showFormatosPermitidos = false;
    this.toastTitle = '';
  }

  // ============================================
  // ✅ PERSISTENCIA DE DATOS - SessionStorage
  // ============================================

  private readonly STORAGE_KEY = 'cumplimiento_form_data';

  // ✅ Guardar datos del formulario en sessionStorage
  guardarDatosFormulario(): void {
    try {
      const datosFormulario = {
        // Paso actual
        currentStep: this.currentStep,

        // ========== PASO 1 ==========
        // Tipo de producto e intermediario
        tipoProducto: this.tipoProducto,
        claveIntermediario: this.claveIntermediario,
        nombreIntermediario: this.nombreIntermediario,

        // Datos de Tomador y Asegurado
        tipoDocumentoTomador: this.tipoDocumentoTomador,
        numeroDocumentoTomador: this.numeroDocumentoTomador,
        nombreTomador: this.nombreTomador,
        tipoDocumentoAsegurado: this.tipoDocumentoAsegurado,
        numeroDocumentoAsegurado: this.numeroDocumentoAsegurado,
        nombreAsegurado: this.nombreAsegurado,

        // Programa (Grandes Beneficiarios)
        programaParametrizado: this.programaParametrizado,

        // Documentos soporte (sin el archivo binario)
        tipoDocumentoSoporte: this.tipoDocumentoSoporte,
        documentosSoporte: this.documentosSoporte.map(doc => ({
          tipo: doc.tipo,
          nombreArchivo: doc.nombreArchivo,
          fecha: doc.fecha,
        })),

        // ========== PASO 2 ==========
        // Fechas
        fechaInicioContrato: this.fechaInicioContrato,
        fechaFinContrato: this.fechaFinContrato,
        fechaInicioRC: this.fechaInicioRC,
        fechaFinRC: this.fechaFinRC,
        valorContrato: this.valorContrato,
        objetoContratoValue: this.objetoContratoValue,

        // Ubicación
        ubicacionRiesgoSeleccionada: this.ubicacionRiesgoSeleccionada,
        direccionRiesgo: this.direccionRiesgo,

        // ========== PASO 3 ==========
        // Coberturas
        coberturasCumplimiento: this.coberturasCumplimiento,
        rcCoberturas: this.rcCoberturas,

        // Coaseguros
        tipoCoaseguro: this.tipoCoaseguro,
        coasegurosCedidos: this.coasegurosCedidos,

        // Agentes
        agentesAdicionales: this.agentesAdicionales,

        // Timestamp
        ultimaActualizacion: new Date().toISOString(),
      };

      sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(datosFormulario));
      console.log('💾 Datos del formulario guardados en sessionStorage:', datosFormulario);
    } catch (error) {
      console.error('❌ Error al guardar datos:', error);
    }
  }

  // ✅ Cargar datos del formulario desde sessionStorage
  cargarDatosFormulario(): boolean {
    try {
      const datosGuardados = sessionStorage.getItem(this.STORAGE_KEY);

      if (!datosGuardados) {
        console.log('📭 No hay datos guardados en sessionStorage');
        return false;
      }

      const datos = JSON.parse(datosGuardados);
      console.log('📂 Cargando datos guardados:', datos);

      // Restaurar paso actual
      if (datos.currentStep !== undefined) {
        this.currentStep = datos.currentStep;
        this.stepperConfig.activeIndex = datos.currentStep;
      }

      // ========== PASO 1 ==========
      // Tipo de producto e intermediario
      if (datos.tipoProducto) this.tipoProducto = datos.tipoProducto;
      if (datos.claveIntermediario) this.claveIntermediario = datos.claveIntermediario;
      if (datos.nombreIntermediario) this.nombreIntermediario = datos.nombreIntermediario;

      // Datos de Tomador y Asegurado
      if (datos.tipoDocumentoTomador) this.tipoDocumentoTomador = datos.tipoDocumentoTomador;
      if (datos.numeroDocumentoTomador) this.numeroDocumentoTomador = datos.numeroDocumentoTomador;
      if (datos.nombreTomador) this.nombreTomador = datos.nombreTomador;
      if (datos.tipoDocumentoAsegurado) this.tipoDocumentoAsegurado = datos.tipoDocumentoAsegurado;
      if (datos.numeroDocumentoAsegurado)
        this.numeroDocumentoAsegurado = datos.numeroDocumentoAsegurado;
      if (datos.nombreAsegurado) this.nombreAsegurado = datos.nombreAsegurado;

      // Programa (Grandes Beneficiarios)
      if (datos.programaParametrizado) this.programaParametrizado = datos.programaParametrizado;

      // Documentos (sin archivo porque no se puede serializar)
      if (datos.tipoDocumentoSoporte) this.tipoDocumentoSoporte = datos.tipoDocumentoSoporte;
      if (datos.documentosSoporte && datos.documentosSoporte.length > 0) {
        this.documentosSoporte = datos.documentosSoporte;
      }

      // ========== PASO 2 ==========
      // Fechas
      if (datos.fechaInicioContrato) this.fechaInicioContrato = datos.fechaInicioContrato;
      if (datos.fechaFinContrato) this.fechaFinContrato = datos.fechaFinContrato;
      if (datos.fechaInicioRC) this.fechaInicioRC = datos.fechaInicioRC;
      if (datos.fechaFinRC) this.fechaFinRC = datos.fechaFinRC;
      if (datos.valorContrato) this.valorContrato = datos.valorContrato;
      if (datos.objetoContratoValue) this.objetoContratoValue = datos.objetoContratoValue;

      // Ubicación
      if (datos.ubicacionRiesgoSeleccionada)
        this.ubicacionRiesgoSeleccionada = datos.ubicacionRiesgoSeleccionada;
      if (datos.direccionRiesgo) this.direccionRiesgo = datos.direccionRiesgo;

      // ========== PASO 3 ==========
      // Coberturas
      if (datos.coberturasCumplimiento) this.coberturasCumplimiento = datos.coberturasCumplimiento;
      if (datos.rcCoberturas) this.rcCoberturas = datos.rcCoberturas;

      // Coaseguros
      if (datos.tipoCoaseguro) this.tipoCoaseguro = datos.tipoCoaseguro;
      if (datos.coasegurosCedidos) this.coasegurosCedidos = datos.coasegurosCedidos;

      // Agentes
      if (datos.agentesAdicionales) this.agentesAdicionales = datos.agentesAdicionales;

      console.log('✅ Datos del formulario restaurados correctamente');

      // ✅ FORZAR actualización del UI después de restaurar datos
      setTimeout(() => {
        this.cdr.detectChanges();
        console.log('🔄 UI actualizado con detectChanges()');

        // Verificar valores restaurados
        console.log('📋 Valores restaurados:', {
          tipoProducto: this.tipoProducto,
          claveIntermediario: this.claveIntermediario,
          numeroDocumentoTomador: this.numeroDocumentoTomador,
          nombreTomador: this.nombreTomador,
        });
      }, 0);

      // Mostrar modal de datos restaurados
      this.showDatosRestauradosModal = true;
      setTimeout(() => {
        this.showDatosRestauradosModal = false;
      }, 4000);

      return true;
    } catch (error) {
      console.error('❌ Error al cargar datos:', error);
      return false;
    }
  }

  // ✅ Limpiar datos guardados (al completar o cancelar)
  limpiarDatosGuardados(): void {
    sessionStorage.removeItem(this.STORAGE_KEY);
    console.log('🗑️ Datos del formulario eliminados de sessionStorage');
  }

  // ✅ Verificar si hay datos guardados
  hayDatosGuardados(): boolean {
    return sessionStorage.getItem(this.STORAGE_KEY) !== null;
  }

  // ✅ Iniciar auto-guardado cada 30 segundos
  iniciarAutoGuardado(): void {
    this.autoSaveInterval = setInterval(() => {
      this.guardarDatosFormulario();
      console.log('⏱️ Auto-guardado ejecutado');
    }, 30000); // Cada 30 segundos
  }

  // ✅ Detener auto-guardado
  detenerAutoGuardado(): void {
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval);
      this.autoSaveInterval = null;
    }
  }

  // ✅ Limpiar recursos al destruir el componente
  ngOnDestroy(): void {
    this.detenerAutoGuardado();
    // Limpiar intervalos de upload si están activos
    if (this.uploadInterval) {
      clearInterval(this.uploadInterval);
      this.uploadInterval = null;
    }
    if (this.uploadIntervalEstadosFinancieros) {
      clearInterval(this.uploadIntervalEstadosFinancieros);
      this.uploadIntervalEstadosFinancieros = null;
    }
    // Guardar una última vez antes de destruir
    this.guardarDatosFormulario();
  }

  confirmAndIssuePolicy(): void {
    console.log('🚀 MÉTODO EJECUTADO: confirmAndIssuePolicy');

    // ✅ Prueba simple primero
    alert('¡Botón funcionando! Método confirmAndIssuePolicy ejecutado correctamente.');

    // ✅ Mostrar notificación de éxito usando TechBlock Snackbar
    this.showSuccessNotification('¡Póliza Emitida Exitosamente!');

    // ✅ Navegar a management después de un delay
    setTimeout(() => {
      this.router.navigate(['/management']);
    }, 2000);
  }

  backToManagement(): void {
    console.log('🔙 Volviendo a la pantalla de management');
    this.router.navigate(['/management']);
  }

  // ✅ Actualizar tablas de resumen cuando se navega al paso 3
  private updateSummaryTables(): void {
    // ✅ Actualizar tabla de coberturas de cumplimiento seleccionadas
    if (this.coberturasTable.value) {
      const coberturasSeleccionadas = this.coberturasTable.value.filter(c => c.seleccionado);
      this.complianceSummaryTable.value = coberturasSeleccionadas;
    }

    // ✅ Actualizar tabla de coberturas RC seleccionadas
    if (this.rcCoberturasTable.value) {
      const rcCoberturasSeleccionadas = this.rcCoberturasTable.value.filter(c => c.seleccionado);
      this.rcSummaryTable.value = rcCoberturasSeleccionadas;
    }
  }

  // ✅ Cargar datos para modificación o vista de detalles desde management
  private loadDataForModification(itemId: string, isViewDetails = false, isReadonly = false): void {
    console.log('🔍 Buscando item con ID:', itemId);

    // Buscar el item en los datos de management
    const item = MOCK_MANAGEMENT_DATA.find(data => data.id === itemId);

    if (item) {
      console.log('✅ Item encontrado para precarga:', item);

      // Precargar datos en step2Form
      this.preloadStep2Data(item);

      // Establecer el modo de vista de detalles
      this.isViewDetailsMode = isViewDetails;

      // Actualizar breadcrumb según el tipo de acción
      if (isViewDetails) {
        this.updateBreadcrumbForViewDetails(item);
      } else {
        this.updateBreadcrumbForModification(item);
      }

      // Si es solo lectura, deshabilitar formularios (implementar después si es necesario)
      if (isReadonly) {
        console.log('📄 Modo solo lectura activado');
        // TODO: Implementar lógica para deshabilitar formularios si es necesario
      }
    } else {
      console.error('❌ No se encontró el item con ID:', itemId);
    }
  }

  // ✅ Precargar datos del item en el paso 2
  private preloadStep2Data(item: IPolicyManagementItem): void {
    console.log('📋 Precargando datos en formulario paso 2...');

    // Simular timeout para esperar que el formulario esté listo
    setTimeout(() => {
      if (this.step2Form.form) {
        // Precargar datos del item en el formulario
        this.step2Form.form.patchValue({
          // Datos generales
          numeroContratoGeneral: item.numeroContrato ?? 'CONT-2024-001',
          nombreTomadorGeneral: item.tomador,
          numeroDocumentoTomadorGeneral: item.numeroDocumento,
          tipoDocumentoTomadorGeneral: 'NIT',
          nombreAseguradoGeneral: item.tomador, // Por defecto mismo que tomador
          numeroDocumentoAseguradoGeneral: item.numeroDocumento,
          tipoDocumentoAseguradoGeneral: 'NIT',
          moneda: 'COP',

          // Ubicación (datos simulados)
          departamento: 'Bogotá D.C.',
          localidadMunicipio: 'Bogotá',
          direccionRiesgo: 'Calle 100 # 10-20, Bogotá',

          // Detalles del contrato
          valorContrato: item.valorAsegurado,
          fechaInicioContrato: '2024-02-01',
          duracionContrato: '12',
          fechaFinContrato: '2025-02-01',
        });

        console.log('✅ Datos precargados exitosamente en formulario paso 2');
      } else {
        console.error('❌ Formulario paso 2 no está disponible para precargar');
      }
    }, 100);
  }

  // ✅ Actualizar breadcrumb para indicar modificación
  private updateBreadcrumbForModification(item: IPolicyManagementItem): void {
    const breadcrumbItems: BreadcrumbItem[] = [
      {
        label: 'Portal',
        icon: 'fa-solid fa-home',
        routerLink: ['/portal'],
      },
      {
        label: 'Retomar Cotización',
        icon: 'fa-solid fa-file-alt',
        routerLink: ['/management'],
      },
      {
        label: `Modificar ${item.numero}`,
        icon: 'fa-solid fa-edit',
      },
    ];

    this.breadcrumbService.setBreadcrumb(breadcrumbItems);
    this.breadcrumbConfig.items = breadcrumbItems.map(breadcrumbItem => ({
      label: breadcrumbItem.label,
      icon: breadcrumbItem.icon,
      routerLink: breadcrumbItem.routerLink,
    }));
  }

  // ✅ Actualizar breadcrumb para vista de detalles
  private updateBreadcrumbForViewDetails(item: IPolicyManagementItem): void {
    const breadcrumbItems: BreadcrumbItem[] = [
      {
        label: 'Portal',
        icon: 'fa-solid fa-home',
        routerLink: ['/portal'],
      },
      {
        label: 'Retomar Cotización',
        icon: 'fa-solid fa-file-alt',
        routerLink: ['/management'],
      },
      {
        label: `Detalles ${item.numero}`,
        icon: 'fa-solid fa-eye',
      },
    ];

    this.breadcrumbService.setBreadcrumb(breadcrumbItems);
    this.breadcrumbConfig.items = breadcrumbItems.map(breadcrumbItem => ({
      label: breadcrumbItem.label,
      icon: breadcrumbItem.icon,
      routerLink: breadcrumbItem.routerLink,
    }));
  }

  // ✅ Método para seleccionar acción (Cotizar o Emitir)
  selectAction(action: 'cotizar' | 'emitir'): void {
    console.log('🎯 Acción seleccionada:', action);
    this.selectedAction = action;

    // ✅ HABILITAR FORMULARIO después de seleccionar acción
    this.isFormEnabled = true;

    // ✅ ACTUALIZAR BREADCRUMB dinámicamente según la acción seleccionada
    this.updateBreadcrumb();

    // ✅ LIMPIAR TODOS LOS CAMPOS cuando se cambia de acción (Cotizar <-> Emitir)
    this.limpiarFormularioCompleto();

    // ✅ RESETEAR FORMULARIOS DINÁMICOS para limpiar campos en rojo
    this.step1Form.form?.reset();
    this.step2Form.form?.reset();

    // Actualizar la acción en el componente
    if (action === 'cotizar') {
      this.action = PolicyInputAction.COTIZAR;
    } else {
      this.action = PolicyInputAction.EMITIR;
    }

    // ✅ Actualizar cache del actionLabel cuando cambia la acción
    this.updateCachedActionLabel();

    // ✅ Reconfigurar modal SARLAFT según la nueva acción
    this.sarlaftModal = sarlaftModalConfig(this.action);
    this.initializeSarlaftModalButtons();

    console.log('📋 Acción actualizada a:', this.action);
    console.log('✅ Formulario habilitado:', this.isFormEnabled);
    console.log('🧹 Todos los campos limpiados al cambiar de acción');
    console.log('🔄 Modal SARLAFT reconfigurado para modo:', this.action);
  }

  // ✅ NUEVO: Limpiar formulario completo al cambiar de Cotizar a Emitir o viceversa
  limpiarFormularioCompleto(): void {
    console.log('🧹 Limpiando formulario completo...');

    // Paso 1 - Errores y archivo
    this.contractFileError = false;
    this.fileName = null;
    this.selectedFile = null;
    this.selectedFileName = null;

    // Documentos soporte
    this.tipoDocumentoSoporte = '';
    this.documentosSoporte = [];

    // Tipo de producto e intermediario
    this.tipoProducto = '';
    this.claveIntermediario = '';
    this.nombreIntermediario = '';

    // Datos del Tomador
    this.tipoDocumentoTomador = '';
    this.numeroDocumentoTomador = '';
    this.nombreTomador = '';

    // Datos del Asegurado
    this.tipoDocumentoAsegurado = '';
    this.numeroDocumentoAsegurado = '';
    this.nombreAsegurado = '';

    // Datos del modal SARLAFT
    this.celularCliente = '';
    this.correoTomador = '';
    this.celularAsesor = '';
    this.correoAsesor = '';

    // Programa parametrizado
    this.programaParametrizado = '';

    // Cerrar modales abiertos
    this.showSarlaftDesactualizado = false;
    this.showClienteNoCreado = false;
    this.showSolicitarCupo = false;

    // Resetear paso
    this.currentStep = 0;
    this.stepperConfig.activeIndex = 0;

    console.log('✅ Formulario limpiado completamente');
  }

  // ✅ Método para seleccionar opción de Emitir
  selectEmitirOption(option: 'cotizacion-existente' | 'poliza-nueva'): void {
    console.log('📋 Opción de emisión seleccionada:', option);
    this.selectedEmitirOption = option;

    // ✅ LIMPIAR ERRORES cuando se cambia de opción de emisión
    this.contractFileError = false;
    this.fileName = null; // Limpiar archivo cargado

    // ✅ RESETEAR FORMULARIOS DINÁMICOS para limpiar campos en rojo
    this.step1Form.form?.reset();
    this.step2Form.form?.reset();

    if (option === 'cotizacion-existente') {
      // ✅ Mostrar tabla de cotizaciones existentes (como versión 15)
      console.log('🔍 Mostrando tabla de cotizaciones existentes...');
      this.showCotizacionesTable = true;
      this.showCotizacionDetalle = false;
      this.cotizacionSeleccionada = null;
      // Forzar detección de cambios
      this.cdr.detectChanges();
      console.log('✅ showCotizacionesTable =', this.showCotizacionesTable);
    } else if (option === 'poliza-nueva') {
      // Continuar con el flujo del formulario actual desde el paso 1
      console.log('➕ Iniciando proceso de nueva póliza desde paso 1...');

      // Ocultar las opciones de selección y mostrar el formulario
      this.selectedAction = 'emitir'; // Mantener emitir seleccionado
      this.selectedEmitirOption = 'poliza-nueva';

      // ✅ Asegurar que el formulario esté habilitado
      this.isFormEnabled = true;

      // ✅ ACTUALIZAR BREADCRUMB dinámicamente para "Emitir Cumplimiento"
      this.updateBreadcrumb();

      // Asegurar que empezamos desde el paso 1
      this.currentStep = 0;
      this.stepperConfig.activeIndex = 0;

      // Actualizar la acción para que los labels sean de emisión
      this.action = PolicyInputAction.EMITIR;

      // ✅ Actualizar cache del actionLabel cuando cambia la acción
      this.updateCachedActionLabel();

      console.log('✅ Formulario configurado para emisión desde paso 1');
      console.log('✅ Formulario habilitado:', this.isFormEnabled);
    }
  }

  // ✅ Método para botón "Usar cotización existente" del contenedor adicional
  usarCotizacionExistente(): void {
    console.log('🔍 POLICY-INPUT: Navegando a cotizaciones existentes desde contenedor adicional');
    this.router.navigate(['/management'], {
      queryParams: {
        source: 'policy-input-additional',
        action: 'emitir',
      },
    });
  }

  // ✅ Métodos para botones nativos de las tarjetas de Emitir
  onElegirCotizacion(): void {
    console.log('🔍 onElegirCotizacion() EJECUTÁNDOSE');
    console.log('🔍 Estado ANTES:', {
      showCotizacionesTable: this.showCotizacionesTable,
      showCotizacionDetalle: this.showCotizacionDetalle,
      selectedEmitirOption: this.selectedEmitirOption,
    });

    // Establecer valores directamente
    this.showCotizacionesTable = true;
    this.showCotizacionDetalle = false;
    this.cotizacionSeleccionada = null;
    this.selectedEmitirOption = 'cotizacion-existente';

    console.log('🔍 Estado DESPUÉS:', {
      showCotizacionesTable: this.showCotizacionesTable,
      showCotizacionDetalle: this.showCotizacionDetalle,
      selectedEmitirOption: this.selectedEmitirOption,
    });

    // Forzar actualización
    this.cdr.markForCheck();
    this.cdr.detectChanges();

    console.log('✅ Vista de cotizaciones DEBERÍA estar activada');
  }

  onCrearNuevaEmision(): void {
    console.log('➕ Crear nueva emisión - iniciando flujo');
    this.selectEmitirOption('poliza-nueva');
  }

  onUsarCotizacionExistente(): void {
    console.log('🔍 Usar cotización existente desde formulario');
    // Mostrar la tabla de cotizaciones directamente
    this.showCotizacionesTable = true;
    this.showCotizacionDetalle = false;
    this.cotizacionSeleccionada = null;
    this.selectedEmitirOption = 'cotizacion-existente';
    // ✅ Actualizar breadcrumb del header
    this.updateHeaderBreadcrumbForCotizaciones();
    // Forzar detección de cambios
    this.cdr.detectChanges();
    console.log('✅ showCotizacionesTable =', this.showCotizacionesTable);
  }

  // ✅ Ver detalle de cotización (clic en ojo)
  verDetalleCotizacion(cotizacion: any): void {
    console.log('👁 Ver detalle de cotización:', cotizacion.id);
    this.cotizacionSeleccionada = cotizacion;
    this.showCotizacionDetalle = true;
    this.showCotizacionesTable = false;
    // ✅ Actualizar breadcrumb del header
    this.updateHeaderBreadcrumbForDetalle(cotizacion.numero);
  }

  // ✅ Modificar cotización (clic en lápiz) - lleva al Paso 2 con datos precargados
  modificarCotizacion(cotizacion: any): void {
    console.log('✏️ Modificar cotización:', cotizacion.id);
    this.cotizacionSeleccionada = cotizacion;

    // Ocultar vistas de cotizaciones
    this.showCotizacionesTable = false;
    this.showCotizacionDetalle = false;

    // Habilitar formulario y precargar datos
    this.isFormEnabled = true;
    this.selectedEmitirOption = 'poliza-nueva';

    // Precargar datos en step2Data usando las propiedades correctas de IPolicyStep2Data
    this.step2Data = {
      ...this.step2Data,
      numeroContratoGeneral: cotizacion.datosGenerales.numeroContrato,
      numeroContrato: cotizacion.datosGenerales.numeroContrato,
      tipoDocumentoTomadorGeneral: cotizacion.datosGenerales.tipoDocTomador,
      numeroDocumentoTomadorGeneral: cotizacion.datosGenerales.numDocTomador,
      numeroDocumentoTomador: cotizacion.datosGenerales.numDocTomador,
      nombreTomadorGeneral: cotizacion.datosGenerales.nombreTomador,
      nombreTomador: cotizacion.datosGenerales.nombreTomador,
      tipoDocumentoAseguradoGeneral: cotizacion.datosGenerales.tipoDocAsegurado,
      numeroDocumentoAseguradoGeneral: cotizacion.datosGenerales.numDocAsegurado,
      nombreAseguradoGeneral: cotizacion.datosGenerales.nombreAsegurado,
      moneda: cotizacion.datosGenerales.moneda,
      departamento: cotizacion.ubicacionRiesgo.departamento,
      localidadMunicipio: cotizacion.ubicacionRiesgo.municipio,
      direccionRiesgo: cotizacion.ubicacionRiesgo.direccion,
      valorContrato: cotizacion.detallesContrato.valorContrato,
      fechaInicioContrato: cotizacion.detallesContrato.fechaInicio,
      fechaFinContrato: cotizacion.detallesContrato.fechaFin,
      duracionContrato: cotizacion.detallesContrato.duracion,
    };

    // Ir al paso 2 (Formulario)
    this.currentStep = 1;
    this.stepperConfig.activeIndex = 1;

    // ✅ Restaurar breadcrumb del formulario principal
    this.updateBreadcrumb();

    console.log('✅ Datos precargados para modificación:', this.step2Data);
  }

  // ✅ Volver a la lista de cotizaciones desde el detalle
  volverACotizaciones(): void {
    console.log('⬅️ Volver a lista de cotizaciones');
    this.showCotizacionDetalle = false;
    this.showCotizacionesTable = true;
    this.cotizacionSeleccionada = null;
    // ✅ Actualizar breadcrumb del header
    this.updateHeaderBreadcrumbForCotizaciones();
  }

  // ✅ Emitir póliza desde la tabla de cotizaciones
  emitirPolizaDesdeTabla(): void {
    if (this.cotizacionSeleccionada) {
      console.log('📄 Emitir póliza desde cotización:', this.cotizacionSeleccionada.id);
      this.modificarCotizacion(this.cotizacionSeleccionada);
    } else {
      console.warn('⚠️ Seleccione una cotización primero');
      alert('Seleccione una cotización primero');
    }
  }

  // ✅ Seleccionar cotización en la tabla (radio button)
  seleccionarCotizacion(cotizacion: any): void {
    console.log('🔘 Cotización seleccionada:', cotizacion.id);
    this.cotizacionSeleccionada = cotizacion;
  }

  // ✅ Crear nueva póliza desde vista de cotizaciones
  crearNuevaPolizaDesdeTabla(): void {
    console.log('➕ Crear nueva póliza desde tabla');
    this.showCotizacionesTable = false;
    this.showCotizacionDetalle = false;
    this.selectEmitirOption('poliza-nueva');
    // ✅ Restaurar breadcrumb del formulario principal
    this.updateBreadcrumb();
  }

  // ✅ Regla 17.2: Retomar cotización guardada - Cargar datos completos y continuar proceso
  retomarCotizacion(cotizacion: any): void {
    console.log('🔄 Retomar cotización:', cotizacion.id);
    this.cotizacionSeleccionada = cotizacion;

    // Ocultar vistas de cotizaciones
    this.showCotizacionesTable = false;
    this.showCotizacionDetalle = false;

    // Habilitar formulario
    this.isFormEnabled = true;
    this.selectedEmitirOption = 'poliza-nueva';
    this.selectedAction = 'emitir';
    this.action = PolicyInputAction.EMITIR;

    // ✅ Cargar datos completos desde el servicio si no están disponibles
    if (!cotizacion.datosGenerales && cotizacion.id) {
      firstValueFrom(this.quoteService.getSavedQuote(cotizacion.id))
        .then((quoteData) => {
          console.log('✅ Datos de cotización cargados desde servicio:', quoteData);
          this.cargarDatosRetomarCotizacion(quoteData);
        })
        .catch((error) => {
          console.error('❌ Error al cargar cotización:', error);
          // Si falla, usar los datos disponibles
          this.cargarDatosRetomarCotizacion(cotizacion);
        });
    } else {
      // Si ya tiene datos, cargarlos directamente
      this.cargarDatosRetomarCotizacion(cotizacion);
    }
  }

  // ✅ Método auxiliar para cargar datos al retomar cotización
  private cargarDatosRetomarCotizacion(cotizacion: any): void {
    // ✅ Cargar datos completos de la cotización guardada
    if (cotizacion.datosGenerales) {
      // Precargar datos en step1Form (Paso 1) usando patchValue
      if (this.step1Form?.form) {
        this.step1Form.form.patchValue({
          tipoDocumentoAsegurado: cotizacion.datosGenerales.tipoDocAsegurado || 'NIT',
          numeroDocumentoAsegurado: cotizacion.datosGenerales.numDocAsegurado || '',
          nombreAsegurado: cotizacion.datosGenerales.nombreAsegurado || '',
          tipoDocumentoTomador: cotizacion.datosGenerales.tipoDocTomador || 'NIT',
          numeroDocumentoTomador: cotizacion.datosGenerales.numDocTomador || '',
          nombreTomador: cotizacion.datosGenerales.nombreTomador || '',
          producto: cotizacion.producto || '',
        });
      }

      // Precargar datos en step2Data (Paso 2)
      this.step2Data = {
        ...this.step2Data,
        numeroContratoGeneral: cotizacion.datosGenerales.numeroContrato || '',
        numeroContrato: cotizacion.datosGenerales.numeroContrato || '',
        tipoDocumentoTomadorGeneral: cotizacion.datosGenerales.tipoDocTomador || 'NIT',
        numeroDocumentoTomadorGeneral: cotizacion.datosGenerales.numDocTomador || '',
        numeroDocumentoTomador: cotizacion.datosGenerales.numDocTomador || '',
        nombreTomadorGeneral: cotizacion.datosGenerales.nombreTomador || '',
        nombreTomador: cotizacion.datosGenerales.nombreTomador || '',
        tipoDocumentoAseguradoGeneral: cotizacion.datosGenerales.tipoDocAsegurado || 'NIT',
        numeroDocumentoAseguradoGeneral: cotizacion.datosGenerales.numDocAsegurado || '',
        nombreAseguradoGeneral: cotizacion.datosGenerales.nombreAsegurado || '',
        moneda: cotizacion.datosGenerales.moneda || 'COP',
        departamento: cotizacion.ubicacionRiesgo?.departamento || '',
        localidadMunicipio: cotizacion.ubicacionRiesgo?.municipio || '',
        direccionRiesgo: cotizacion.ubicacionRiesgo?.direccion || '',
        valorContrato: cotizacion.detallesContrato?.valorContrato || cotizacion.valorAsegurado || 0,
        fechaInicioContrato: cotizacion.detallesContrato?.fechaInicio || '',
        fechaFinContrato: cotizacion.detallesContrato?.fechaFin || '',
        duracionContrato: cotizacion.detallesContrato?.duracion || '',
      };

      // También actualizar step2Form si está disponible
      if (this.step2Form?.form) {
        setTimeout(() => {
          this.step2Form.form.patchValue({
            numeroContratoGeneral: cotizacion.datosGenerales.numeroContrato || '',
            numeroContrato: cotizacion.datosGenerales.numeroContrato || '',
            tipoDocumentoTomadorGeneral: cotizacion.datosGenerales.tipoDocTomador || 'NIT',
            numeroDocumentoTomadorGeneral: cotizacion.datosGenerales.numDocTomador || '',
            numeroDocumentoTomador: cotizacion.datosGenerales.numDocTomador || '',
            nombreTomadorGeneral: cotizacion.datosGenerales.nombreTomador || '',
            nombreTomador: cotizacion.datosGenerales.nombreTomador || '',
            tipoDocumentoAseguradoGeneral: cotizacion.datosGenerales.tipoDocAsegurado || 'NIT',
            numeroDocumentoAseguradoGeneral: cotizacion.datosGenerales.numDocAsegurado || '',
            nombreAseguradoGeneral: cotizacion.datosGenerales.nombreAsegurado || '',
            moneda: cotizacion.datosGenerales.moneda || 'COP',
            departamento: cotizacion.ubicacionRiesgo?.departamento || '',
            localidadMunicipio: cotizacion.ubicacionRiesgo?.municipio || '',
            direccionRiesgo: cotizacion.ubicacionRiesgo?.direccion || '',
            valorContrato: cotizacion.detallesContrato?.valorContrato || cotizacion.valorAsegurado || 0,
            fechaInicioContrato: cotizacion.detallesContrato?.fechaInicio || '',
            fechaFinContrato: cotizacion.detallesContrato?.fechaFin || '',
            duracionContrato: cotizacion.detallesContrato?.duracion || '',
          });
        }, 100);
      }
    }

    // ✅ Restaurar paso donde se quedó (si está guardado, sino empezar desde paso 1)
    const pasoGuardado = cotizacion.pasoGuardado || 1;
    this.currentStep = Math.min(pasoGuardado, 2); // Máximo paso 2 (paso 3 es resumen)
    this.stepperConfig.activeIndex = this.currentStep;

    // ✅ Restaurar breadcrumb
    this.updateBreadcrumb();

    console.log('✅ Cotización retomada exitosamente. Paso:', this.currentStep);
  }

  // ✅ Regla 17.3: Imprimir cotización desde la tabla
  imprimirCotizacion(cotizacion: any): void {
    console.log('🖨️ Imprimir cotización:', cotizacion.id);
    
    // Abrir ventana de impresión con los datos de la cotización
    const ventanaImpresion = window.open('', '_blank');
    if (!ventanaImpresion) {
      alert('Por favor, permite ventanas emergentes para imprimir');
      return;
    }

    const contenido = this.generarContenidoImpresion(cotizacion);
    ventanaImpresion.document.write(contenido);
    ventanaImpresion.document.close();
    
    // Esperar a que se cargue el contenido antes de imprimir
    ventanaImpresion.onload = () => {
      setTimeout(() => {
        ventanaImpresion.print();
      }, 250);
    };
  }

  // ✅ Regla 17.3: Imprimir desde detalle de cotización
  imprimirDetalleCotizacion(): void {
    if (this.cotizacionSeleccionada) {
      console.log('🖨️ Imprimir detalle de cotización:', this.cotizacionSeleccionada.id);
      this.imprimirCotizacion(this.cotizacionSeleccionada);
    }
  }

  // ✅ Generar contenido HTML para impresión
  private generarContenidoImpresion(cotizacion: any): string {
    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cotización ${cotizacion.numero}</title>
        <style>
          @media print {
            @page { margin: 2cm; }
            body { font-family: Arial, sans-serif; font-size: 12px; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #038450; padding-bottom: 20px; }
            .header h1 { color: #038450; margin: 0; }
            .section { margin-bottom: 20px; }
            .section h2 { color: #038450; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
            .row { display: flex; justify-content: space-between; margin-bottom: 10px; }
            .label { font-weight: bold; width: 40%; }
            .value { width: 60%; }
            .footer { margin-top: 40px; text-align: center; font-size: 10px; color: #666; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            table th, table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            table th { background-color: #038450; color: white; }
          }
          body { font-family: Arial, sans-serif; font-size: 12px; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #038450; padding-bottom: 20px; }
          .header h1 { color: #038450; margin: 0; }
          .section { margin-bottom: 20px; }
          .section h2 { color: #038450; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
          .row { display: flex; justify-content: space-between; margin-bottom: 10px; }
          .label { font-weight: bold; width: 40%; }
          .value { width: 60%; }
          .footer { margin-top: 40px; text-align: center; font-size: 10px; color: #666; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          table th, table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          table th { background-color: #038450; color: white; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>SEGUROS BOLÍVAR</h1>
          <h2>COTIZACIÓN ${cotizacion.numero}</h2>
        </div>

        <div class="section">
          <h2>Información General</h2>
          <div class="row">
            <span class="label">Número de Cotización:</span>
            <span class="value">${cotizacion.numero}</span>
          </div>
          <div class="row">
            <span class="label">Estado:</span>
            <span class="value">${cotizacion.estado}</span>
          </div>
          <div class="row">
            <span class="label">Fecha de Creación:</span>
            <span class="value">${cotizacion.fechaCreacion}</span>
          </div>
          <div class="row">
            <span class="label">Producto:</span>
            <span class="value">${cotizacion.producto}</span>
          </div>
        </div>

        <div class="section">
          <h2>Datos del Tomador</h2>
          <div class="row">
            <span class="label">Tipo de Documento:</span>
            <span class="value">${cotizacion.datosGenerales?.tipoDocTomador || 'N/A'}</span>
          </div>
          <div class="row">
            <span class="label">Número de Documento:</span>
            <span class="value">${cotizacion.datosGenerales?.numDocTomador || 'N/A'}</span>
          </div>
          <div class="row">
            <span class="label">Nombre:</span>
            <span class="value">${cotizacion.datosGenerales?.nombreTomador || cotizacion.tomador?.nombre || 'N/A'}</span>
          </div>
        </div>

        <div class="section">
          <h2>Datos del Asegurado</h2>
          <div class="row">
            <span class="label">Tipo de Documento:</span>
            <span class="value">${cotizacion.datosGenerales?.tipoDocAsegurado || 'N/A'}</span>
          </div>
          <div class="row">
            <span class="label">Número de Documento:</span>
            <span class="value">${cotizacion.datosGenerales?.numDocAsegurado || 'N/A'}</span>
          </div>
          <div class="row">
            <span class="label">Nombre:</span>
            <span class="value">${cotizacion.datosGenerales?.nombreAsegurado || 'N/A'}</span>
          </div>
        </div>

        <div class="section">
          <h2>Valores</h2>
          <div class="row">
            <span class="label">Valor Asegurado:</span>
            <span class="value">${this.formatCurrency(cotizacion.valorAsegurado)}</span>
          </div>
          ${cotizacion.resumenCostos ? `
          <div class="row">
            <span class="label">Prima Neta:</span>
            <span class="value">${this.formatCurrency(cotizacion.resumenCostos.primaNeta)}</span>
          </div>
          <div class="row">
            <span class="label">IVA:</span>
            <span class="value">${this.formatCurrency(cotizacion.resumenCostos.iva)}</span>
          </div>
          <div class="row">
            <span class="label">Prima Total:</span>
            <span class="value"><strong>${this.formatCurrency(cotizacion.resumenCostos.primaTotal)}</strong></span>
          </div>
          ` : ''}
        </div>

        <div class="footer">
          <p>Documento generado el ${new Date().toLocaleDateString('es-CO')} a las ${new Date().toLocaleTimeString('es-CO')}</p>
          <p>Seguros Bolívar - Sistema de Cumplimiento Digital</p>
        </div>
      </body>
      </html>
    `;
  }

  // ✅ Formatear valor como moneda
  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }

  // ✅ Formato de fecha corta DD/MM/YY
  formatDateShort(dateString: string): string {
    if (!dateString) return '';
    try {
      const date = new Date(dateString + 'T00:00:00');
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = String(date.getFullYear()).slice(-2);
      return `${day}/${month}/${year}`;
    } catch (error) {
      console.warn('Error al formatear fecha:', error);
      return dateString;
    }
  }

  // ✅ Métodos para manejo del modal SARLAFT
  shouldShowSarlaftModal(): boolean {
    const formData = this.step1Form.form?.value;
    const tipoDocumento = formData?.tipoDocumentoTomador;
    const numeroDocumento = formData?.numeroDocumentoTomador;

    console.log('🔍 Validando SARLAFT:', { tipoDocumento, numeroDocumento });

    // Validar si es NIT y número específico
    return tipoDocumento === 'NIT' && numeroDocumento === '12345678';
  }

  showSarlaftModal(): void {
    console.log('📋 Mostrando modal SARLAFT');
    this.sarlaftModal.visible = true;
  }

  hideSarlaftModal(): void {
    console.log('📋 Ocultando modal SARLAFT');
    this.sarlaftModal.visible = false;
  }

  onSarlaftUpdate(): void {
    console.log('🔄 Actualizando SARLAFT con:', {
      clientPhone: this.sarlaftClientPhone,
      advisorPhone: this.sarlaftAdvisorPhone,
      mode: this.action,
    });

    // Aquí se implementaría la lógica de actualización de SARLAFT
    // Por ahora solo ocultamos el modal y avanzamos al siguiente paso
    this.hideSarlaftModal();
    this.nextStep();
  }

  onSarlaftCancel(): void {
    console.log('❌ Cancelando actualización SARLAFT');
    this.hideSarlaftModal();
    // No avanzamos al siguiente paso si se cancela
  }

  onSarlaftContinue(): void {
    console.log('➡️ Continuando en modo COTIZAR (informativo)');
    this.hideSarlaftModal();
    this.nextStep();
  }

  private initializeSarlaftModalButtons(): void {
    // Asignar métodos a los botones del modal según el modo
    if (this.sarlaftModal.primaryButton) {
      if (this.action === PolicyInputAction.EMITIR) {
        // Modo EMITIR: Botón "Actualizar" (bloqueante)
        this.sarlaftModal.primaryButton.libTbClick = () => this.onSarlaftUpdate();
      } else {
        // Modo COTIZAR: Botón "Continuar" (informativo)
        this.sarlaftModal.primaryButton.libTbClick = () => this.onSarlaftContinue();
      }
    }

    if (this.sarlaftModal.secondaryButton) {
      // Solo en modo EMITIR hay botón "Cancelar"
      this.sarlaftModal.secondaryButton.libTbClick = () => this.onSarlaftCancel();
    }
  }

  // ============================================
  // ✅ MÉTODOS PARA VALIDACIÓN DE DOCUMENTOS
  // ============================================

  /**
   * Valida el formato del documento según el tipo seleccionado
   */
  validarDocumento(tipo: string, numero: string): { valido: boolean; error: string } {
    // Nombres amigables para cada tipo de documento
    const nombresDocumento: { [key: string]: string } = {
      'CC': 'la Cédula de Ciudadanía',
      'CE': 'la Cédula de Extranjería',
      'NIT': 'el NIT',
      'PA': 'el Pasaporte',
      'TI': 'la Tarjeta de Identidad',
    };

    if (!tipo) {
      return { valido: false, error: 'Seleccione un tipo de documento' };
    }

    const nombreDoc = nombresDocumento[tipo] || 'el documento';

    if (!numero) {
      return { valido: false, error: `Ingrese ${nombreDoc}` };
    }

    const reglas = this.documentValidationRules[tipo];
    if (!reglas) {
      return { valido: true, error: '' }; // Si no hay reglas, permitir
    }

    // Limpiar el número para validación (excepto para NIT que puede tener guión)
    const numeroLimpio = tipo === 'NIT' ? numero : numero.replace(/[^A-Za-z0-9]/g, '');

    // Validar longitud mínima
    if (numeroLimpio.length < reglas.min) {
      return {
        valido: false,
        error: `${nombreDoc} debe tener mínimo ${reglas.min} dígitos`,
      };
    }

    // Validar longitud máxima
    if (numeroLimpio.length > reglas.max) {
      return {
        valido: false,
        error: `${nombreDoc} debe tener máximo ${reglas.max} dígitos`,
      };
    }

    // Validar patrón
    if (!reglas.pattern.test(numeroLimpio)) {
      return {
        valido: false,
        error: reglas.message,
      };
    }

    return { valido: true, error: '' };
  }

  /**
   * Valida el documento del Tomador al cambiar
   */
  validarDocumentoTomador(): void {
    const resultado = this.validarDocumento(this.tipoDocumentoTomador, this.numeroDocumentoTomador);
    this.errorDocumentoTomador = resultado.error;

    // Buscar nombre mientras escribe (mínimo 5 caracteres)
    // Incluso si no es completamente válido, intentamos buscar
    if (this.numeroDocumentoTomador && this.numeroDocumentoTomador.length >= 5) {
      this.buscarNombreTomador();
    } else {
      this.nombreTomador = '';
      this.buscandoTomador = false;
    }
  }

  /**
   * Valida el documento del Asegurado al cambiar
   */
  validarDocumentoAsegurado(): void {
    const resultado = this.validarDocumento(
      this.tipoDocumentoAsegurado,
      this.numeroDocumentoAsegurado,
    );
    this.errorDocumentoAsegurado = resultado.error;

    // Buscar nombre mientras escribe (mínimo 5 caracteres)
    // Incluso si no es completamente válido, intentamos buscar
    if (this.numeroDocumentoAsegurado && this.numeroDocumentoAsegurado.length >= 5) {
      this.buscarNombreAsegurado();
    } else {
      this.nombreAsegurado = '';
      this.buscandoAsegurado = false;
    }
  }

  /**
   * Obtiene el placeholder según el tipo de documento
   */
  getPlaceholderDocumento(tipo: string): string {
    const placeholders: { [key: string]: string } = {
      'CC': 'Ej: 1234567890',
      'CE': 'Ej: 1234567',
      'NIT': 'Ej: 900123456-7',
      'PA': 'Ej: AB1234567',
      'TI': 'Ej: 12345678901',
    };
    return placeholders[tipo] || 'Ingrese número de documento';
  }

  /**
   * Obtiene el nombre amigable del documento para mensajes
   */
  getNombreDocumento(tipo: string): string {
    const nombres: { [key: string]: string } = {
      'CC': 'La Cédula de Ciudadanía',
      'CE': 'La Cédula de Extranjería',
      'NIT': 'El NIT',
      'PA': 'El Pasaporte',
      'TI': 'La Tarjeta de Identidad',
    };
    return nombres[tipo] || 'El número de documento';
  }

  /**
   * Maneja el cambio de tipo de documento y limpia los campos relacionados
   */
  onTipoDocumentoChange(campo: 'tomador' | 'asegurado'): void {
    if (campo === 'tomador') {
      this.numeroDocumentoTomador = '';
      this.nombreTomador = '';
      this.errorDocumentoTomador = '';
      this.buscandoTomador = false;
    } else {
      this.numeroDocumentoAsegurado = '';
      this.nombreAsegurado = '';
      this.errorDocumentoAsegurado = '';
      this.buscandoAsegurado = false;
    }
  }

  /**
   * Obtiene el tipo de input según el tipo de documento
   */
  getInputType(tipo: string): string {
    // PA (Pasaporte) permite letras, otros tipos solo números
    return tipo === 'PA' || tipo === 'NIT' ? 'text' : 'tel';
  }

  /**
   * Formatea automáticamente el NIT mientras se escribe
   */
  formatearNIT(event: Event): void {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/[^0-9]/g, '');

    // Si tiene más de 9 dígitos, agregar guión antes del dígito verificador
    if (valor.length > 9) {
      valor = valor.substring(0, 9) + '-' + valor.substring(9, 10);
    }

    input.value = valor;
    this.numeroDocumentoTomador = valor;
  }

  /**
   * Restringe entrada solo a números
   */
  soloNumeros(event: KeyboardEvent): boolean {
    const charCode = event.which || event.keyCode;
    // Permitir: backspace, delete, tab, escape, enter, punto decimal
    if ([8, 9, 27, 13, 46].includes(charCode)) {
      return true;
    }
    // Permitir: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
    if ((event.ctrlKey || event.metaKey) && [65, 67, 86, 88].includes(charCode)) {
      return true;
    }
    // Solo permitir números
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  /**
   * Restringe entrada a alfanumérico
   */
  soloAlfanumerico(event: KeyboardEvent): boolean {
    const charCode = event.which || event.keyCode;
    // Permitir: backspace, delete, tab, escape, enter
    if ([8, 9, 27, 13].includes(charCode)) {
      return true;
    }
    // Permitir: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
    if ((event.ctrlKey || event.metaKey) && [65, 67, 86, 88].includes(charCode)) {
      return true;
    }
    // Permitir números (48-57) y letras (65-90, 97-122)
    if (
      (charCode >= 48 && charCode <= 57) ||
      (charCode >= 65 && charCode <= 90) ||
      (charCode >= 97 && charCode <= 122)
    ) {
      return true;
    }
    event.preventDefault();
    return false;
  }

  // ✅ MÉTODOS PARA BÚSQUEDA DE NOMBRES
  // ============================================

  buscarNombreTomador(): void {
    if (
      this.numeroDocumentoTomador &&
      this.numeroDocumentoTomador.length >= 5 &&
      !this.errorDocumentoTomador
    ) {
      this.buscandoTomador = true;
      this.nombreTomador = '';

      // Simular búsqueda con timeout
      setTimeout(() => {
        // Datos de prueba - simular respuesta del servidor
        const mockData: { [key: string]: string } = {
          '900123456': 'EMPRESA CONSTRUCTORA ABC S.A.S.',
          '800987654': 'INVERSIONES DEL VALLE LTDA',
          '11111111': '', // Trigger modal Tomador no creado
          '22222222': '', // Trigger modal SARLAFT desactualizado
          '33333333': '', // Trigger modal Solicitar Cupo (sin cupo disponible)
          '12345678': 'COMERCIALIZADORA NACIONAL S.A.',
        };

        const docNum = this.numeroDocumentoTomador.replace(/[^0-9]/g, '');

        // Escenario 1: Tomador no creado
        if (docNum === '11111111') {
          this.buscandoTomador = false;
          this.showClienteNoCreado = true;
          return;
        }

        // Escenario 2: SARLAFT desactualizado
        if (docNum === '22222222') {
          this.buscandoTomador = false;
          this.showSarlaftDesactualizado = true;
          return;
        }

        // Escenario 3: Sin cupo disponible - Solicitar cupo
        if (docNum === '33333333') {
          this.buscandoTomador = false;
          this.nombreTomador = 'EMPRESA SIN CUPO DISPONIBLE S.A.S.';
          this.showSolicitarCupo = true;
          return;
        }

        this.nombreTomador = mockData[docNum] || 'CLIENTE ENCONTRADO - ' + docNum;
        this.buscandoTomador = false;
      }, 1000);
    }
  }

  buscarNombreAsegurado(): void {
    if (
      this.numeroDocumentoAsegurado &&
      this.numeroDocumentoAsegurado.length >= 5 &&
      !this.errorDocumentoAsegurado
    ) {
      this.buscandoAsegurado = true;
      this.nombreAsegurado = '';

      setTimeout(() => {
        const mockData: { [key: string]: string } = {
          '900111222': 'ASEGURADO PRINCIPAL S.A.',
          '800333444': 'BENEFICIARIO EJEMPLO LTDA',
          '12345678': 'ASEGURADO COMERCIAL S.A.S.',
        };

        const docNum = this.numeroDocumentoAsegurado.replace(/[^0-9]/g, '');
        this.nombreAsegurado = mockData[docNum] || 'ASEGURADO ENCONTRADO - ' + docNum;
        this.buscandoAsegurado = false;
      }, 1000);
    }
  }

  // ============================================
  // ✅ MÉTODOS PARA MODAL CLIENTE NO CREADO
  // ============================================

  closeClienteNoCreado(): void {
    this.showClienteNoCreado = false;
    this.celularCliente = '';
    this.celularAsesor = '';
  }

  continuarRegistroCliente(): void {
    console.log('✅ Continuando registro de cliente:', {
      celularCliente: this.celularCliente,
      celularAsesor: this.celularAsesor,
    });
    this.showClienteNoCreado = false;
    // Mostrar notificación
    this.snackbarConfig = {
      ...this.snackbarConfig,
      show: true,
      message: '✅ Registro de cliente iniciado',
      class: 'snackbar-success-theme',
    };
  }

  // ✅ Método para regresar al paso 1 desde el modal Cliente no creado
  regresarPasoUno(): void {
    console.log('⬅️ Regresando al paso 1 desde modal Cliente no creado');
    this.showClienteNoCreado = false;
    // Limpiar campos del modal
    this.celularCliente = '';
    this.celularAsesor = '';
    this.correoTomador = '';
    this.correoAsesor = '';
    // Regresar al paso 1
    this.currentStep = 0;
    this.stepperConfig.activeIndex = 0;
  }

  // ✅ Método para crear cliente desde el modal
  crearCliente(): void {
    console.log('👤 Creando cliente con datos:', {
      celularCliente: this.celularCliente,
      celularAsesor: this.celularAsesor,
      correoTomador: this.correoTomador,
      correoAsesor: this.correoAsesor,
    });
    this.showClienteNoCreado = false;
    // Mostrar notificación de éxito
    this.snackbarConfig = {
      ...this.snackbarConfig,
      show: true,
      message: '✅ Cliente creado exitosamente',
      class: 'snackbar-success-theme',
    };
    // Limpiar campos
    this.celularCliente = '';
    this.celularAsesor = '';
    this.correoTomador = '';
    this.correoAsesor = '';
  }

  // ============================================
  // ✅ MÉTODOS PARA MODAL SARLAFT DESACTUALIZADO
  // ============================================

  closeSarlaftDesactualizado(): void {
    this.showSarlaftDesactualizado = false;
    this.celularCliente = '';
    this.celularAsesor = '';
    this.correoTomador = '';
    this.correoAsesor = '';
  }

  // ✅ Método para regresar al paso 1 desde el modal SARLAFT
  regresarPasoUnoSarlaft(): void {
    console.log('⬅️ Regresando al paso 1 desde modal SARLAFT');
    this.showSarlaftDesactualizado = false;
    // Limpiar campos del modal
    this.celularCliente = '';
    this.celularAsesor = '';
    this.correoTomador = '';
    this.correoAsesor = '';
    // Regresar al paso 1
    this.currentStep = 0;
    this.stepperConfig.activeIndex = 0;
  }

  continuarActualizacionSarlaft(): void {
    console.log('✅ Continuando actualización SARLAFT:', {
      celularCliente: this.celularCliente,
      celularAsesor: this.celularAsesor,
    });
    this.showSarlaftDesactualizado = false;
    // Mostrar notificación
    this.snackbarConfig = {
      ...this.snackbarConfig,
      show: true,
      message: '✅ Actualización SARLAFT iniciada',
      class: 'snackbar-success-theme',
    };
  }

  // ✅ EMITIR: Actualizar SARLAFT - NO permite avanzar al paso 2
  actualizarSarlaft(): void {
    console.log('🔄 Actualizando SARLAFT (modo EMITIR) - NO permite avanzar:', {
      celularCliente: this.celularCliente,
      correoTomador: this.correoTomador,
      celularAsesor: this.celularAsesor,
      correoAsesor: this.correoAsesor,
    });

    // Cerrar modal
    this.showSarlaftDesactualizado = false;

    // Limpiar datos del tomador porque NO puede continuar
    this.nombreTomador = '';
    this.numeroDocumentoTomador = '';

    // Mostrar notificación informando que debe actualizar SARLAFT
    this.snackbarConfig = {
      ...this.snackbarConfig,
      show: true,
      message:
        '⚠️ Se ha enviado solicitud de actualización SARLAFT. No puede continuar hasta que el tomador actualice su información.',
      class: 'snackbar-warning-theme',
    };

    // NO avanza al paso 2 - se queda en paso 1
  }

  // ============================================
  // ✅ MÉTODOS PARA MODAL SOLICITAR CUPO
  // ============================================

  // ✅ Mostrar modal de solicitar cupo (cuando el tomador no tiene cupo disponible)
  showSolicitarCupoModal(): void {
    console.log('💰 Mostrando modal de solicitar cupo');
    this.showSolicitarCupo = true;
  }

  // ✅ Cerrar modal de solicitar cupo
  closeSolicitarCupo(): void {
    console.log('❌ Cerrando modal de solicitar cupo');
    this.showSolicitarCupo = false;
    this.estadosFinancierosFile = null;
    this.estadosFinancierosFileName = null;
    this.actividadEconomica = '';
    this.isUploadingEstadosFinancieros = false;
    this.uploadProgressEstadosFinancieros = 0;
  }

  // ✅ Regresar al paso 1 desde modal solicitar cupo
  regresarPasoUnoSolicitarCupo(): void {
    console.log('⬅️ Regresando al paso 1 desde modal solicitar cupo');
    this.closeSolicitarCupo();
    this.currentStep = 0;
    this.stepperConfig.activeIndex = 0;
  }

  // ✅ Sub-pasos del Paso 2
  subPasoActual = 1; // Siempre empieza en 1
  subPasos = [
    { num: 1, nombre: 'Datos Generales' },
    { num: 2, nombre: 'Agentes' },
    { num: 3, nombre: 'Ubicación' },
    { num: 4, nombre: 'Datos Adicionales' },
    { num: 5, nombre: 'Coaseguro' },
    { num: 6, nombre: 'Detalles' },
    { num: 7, nombre: 'Coberturas' },
    { num: 8, nombre: 'Resp. Civil' },
  ];

  irASubPaso(num: number): void {
    this.subPasoActual = num;
    // Hacer scroll a la sección correspondiente
    const el = document.getElementById(`seccion-${num}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  siguienteSubPaso(): void {
    if (this.subPasoActual < 8) {
      this.subPasoActual++;
    } else {
      this.nextStep();
    }
  }

  anteriorSubPaso(): void {
    if (this.subPasoActual > 1) {
      this.subPasoActual--;
    } else {
      this.previousStep();
    }
  }

  // ✅ Seleccionar archivo de estados financieros
  onSelectEstadosFinancieros(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('📄 Archivo de estados financieros seleccionado:', file.name);

      // Validar tamaño (máximo 30MB)
      if (file.size > 30 * 1024 * 1024) {
        this.snackbarConfig = {
          ...this.snackbarConfig,
          show: true,
          message: 'El tamaño máximo del archivo 30 MB',
          class: 'snackbar-error-theme',
        };
        return;
      }

      // Simular subida
      this.estadosFinancierosFile = file;
      this.estadosFinancierosFileName = file.name;
      this.isUploadingEstadosFinancieros = true;
      this.uploadProgressEstadosFinancieros = 0;

      // Simular progreso de carga
      // Limpiar intervalo anterior si existe
      if (this.uploadIntervalEstadosFinancieros) {
        clearInterval(this.uploadIntervalEstadosFinancieros);
      }

      this.uploadIntervalEstadosFinancieros = setInterval(() => {
        this.uploadProgressEstadosFinancieros += 10;
        if (this.uploadProgressEstadosFinancieros >= 100) {
          clearInterval(this.uploadIntervalEstadosFinancieros);
          this.uploadIntervalEstadosFinancieros = null;
          this.isUploadingEstadosFinancieros = false;
          console.log('✅ Estados financieros cargados:', file.name);
        }
      }, 150);
    }
  }

  // ✅ Eliminar archivo de estados financieros
  removeEstadosFinancieros(): void {
    console.log('🗑️ Eliminando archivo de estados financieros');
    this.estadosFinancierosFile = null;
    this.estadosFinancierosFileName = null;
    this.isUploadingEstadosFinancieros = false;
    this.uploadProgressEstadosFinancieros = 0;
  }

  // ✅ Solicitar cupo
  solicitarCupo(): void {
    // Validar que se haya cargado archivo y seleccionado actividad económica
    if (!this.estadosFinancierosFileName) {
      this.snackbarConfig = {
        ...this.snackbarConfig,
        show: true,
        message: '❌ Debe cargar los estados financieros',
        class: 'snackbar-error-theme',
      };
      return;
    }

    if (!this.actividadEconomica) {
      this.snackbarConfig = {
        ...this.snackbarConfig,
        show: true,
        message: '❌ Debe seleccionar una actividad económica',
        class: 'snackbar-error-theme',
      };
      return;
    }

    console.log('✅ Solicitando cupo:', {
      estadosFinancieros: this.estadosFinancierosFileName,
      actividadEconomica: this.actividadEconomica,
    });

    // Cerrar modal y mostrar notificación de éxito
    this.closeSolicitarCupo();
    this.snackbarConfig = {
      ...this.snackbarConfig,
      show: true,
      message: '✅ Solicitud de cupo enviada exitosamente. Será procesada en breve.',
      class: 'snackbar-success-theme',
    };
  }

  // ============================================
  // ✅ MÉTODOS PARA MODAL ADICIONAR AGENTE
  // ============================================

  abrirModalAgente(): void {
    this.showModalAgente = true;
    this.agenteClave = '';
    this.agenteNombre = '';
    this.agenteParticipacion = 0;
    this.agenteFormaActuacion = '';
    this.agenteConvenio = '';
    this.errorParticipacion = '';
    this.agenteEditIndex = null;
  }

  cerrarModalAgente(): void {
    this.showModalAgente = false;
    this.errorParticipacion = '';
  }

  buscarAgentePorClave(): void {
    if (this.agenteClave && this.agenteClave.length >= 4) {
      // Simular búsqueda de agente
      const mockAgentes: { [key: string]: any } = {
        '53940': {
          nombre: 'JUAN CARLOS MARTINEZ',
          formaActuacion: 'Directa',
          convenio: 'Conv-001',
        },
        '33074': {
          nombre: 'MARIA FERNANDA LOPEZ',
          formaActuacion: 'Indirecta',
          convenio: 'Conv-002',
        },
        '78236': { nombre: 'CARLOS ANDRES GOMEZ', formaActuacion: 'Directa', convenio: 'Conv-003' },
        '38361': { nombre: 'ANA PATRICIA RUIZ', formaActuacion: 'Mixta', convenio: 'Conv-004' },
      };

      const agente = mockAgentes[this.agenteClave];
      if (agente) {
        this.agenteNombre = agente.nombre;
        this.agenteFormaActuacion = agente.formaActuacion;
        this.agenteConvenio = agente.convenio;
      } else {
        this.agenteNombre = '';
        this.agenteFormaActuacion = '';
        this.agenteConvenio = '';
      }
    }
  }

  validarParticipacion(): void {
    const disponible = this.porcentajeDisponible;

    if (this.agenteParticipacion < 0) {
      this.errorParticipacion = 'El porcentaje no puede ser negativo';
    } else if (this.agenteParticipacion > disponible) {
      this.errorParticipacion = `El porcentaje máximo disponible es ${disponible}%`;
    } else if (this.agenteParticipacion % 1 !== 0) {
      this.errorParticipacion = 'No se permiten decimales';
    } else {
      this.errorParticipacion = '';
    }
  }

  agregarAgente(): void {
    if (!this.agenteClave || !this.agenteNombre || this.errorParticipacion) {
      return;
    }

    const nuevoAgente = {
      clave: this.agenteClave,
      nombre: this.agenteNombre,
      participacion: this.agenteParticipacion,
      formaActuacion: this.agenteFormaActuacion,
      convenio: this.agenteConvenio,
    };

    if (this.agenteEditIndex !== null) {
      // Editar existente
      this.agentesAdicionales[this.agenteEditIndex] = nuevoAgente;
    } else {
      // Agregar nuevo
      this.agentesAdicionales.push(nuevoAgente);
    }

    // Recalcular participación del líder
    this.recalcularParticipacionLider();
    this.cerrarModalAgente();
    // Mostrar notificación
    this.snackbarConfig = {
      ...this.snackbarConfig,
      show: true,
      message: this.agenteEditIndex !== null ? '✅ Agente actualizado' : '✅ Agente agregado',
      class: 'snackbar-success-theme',
    };
  }

  editarAgente(index: number): void {
    const agente = this.agentesAdicionales[index];
    this.agenteClave = agente.clave;
    this.agenteNombre = agente.nombre;
    this.agenteParticipacion = agente.participacion;
    this.agenteFormaActuacion = agente.formaActuacion;
    this.agenteConvenio = agente.convenio;
    this.agenteEditIndex = index;
    this.showModalAgente = true;
  }

  eliminarAgente(index: number): void {
    this.agentesAdicionales.splice(index, 1);
    this.recalcularParticipacionLider();
    // Mostrar notificación
    this.snackbarConfig = {
      ...this.snackbarConfig,
      show: true,
      message: '✅ Agente eliminado',
      class: 'snackbar-success-theme',
    };
  }

  recalcularParticipacionLider(): void {
    // La participación del líder es fija, no se recalcula
    // Solo validamos que la suma total no exceda 100%
    const totalOtros = this.agentesAdicionales.reduce((sum, a) => sum + a.participacion, 0);
    const totalGeneral = this.liderParticipacion + totalOtros;

    console.log('📊 Distribución de participación:');
    console.log(`   - Líder: ${this.liderParticipacion}%`);
    console.log(`   - Otros agentes: ${totalOtros}%`);
    console.log(`   - Total: ${totalGeneral}%`);
    console.log(`   - Disponible: ${100 - totalGeneral}%`);
  }

  // ✅ Ordenar tabla de agentes
  ordenarAgentes(columna: string): void {
    if (this.agentesSortColumn === columna) {
      // Cambiar dirección si es la misma columna
      this.agentesSortDirection = this.agentesSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Nueva columna, empezar con ascendente
      this.agentesSortColumn = columna;
      this.agentesSortDirection = 'asc';
    }

    this.agentesAdicionales.sort((a, b) => {
      let valorA = a[columna];
      let valorB = b[columna];

      // Si es número, comparar como número
      if (typeof valorA === 'number' && typeof valorB === 'number') {
        return this.agentesSortDirection === 'asc' ? valorA - valorB : valorB - valorA;
      }

      // Si es string, comparar alfabéticamente
      valorA = String(valorA).toLowerCase();
      valorB = String(valorB).toLowerCase();

      if (valorA < valorB) return this.agentesSortDirection === 'asc' ? -1 : 1;
      if (valorA > valorB) return this.agentesSortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // ✅ Obtener icono de ordenamiento (agentes)
  getSortIcon(columna: string): string {
    if (this.agentesSortColumn !== columna) {
      return 'fa-sort';
    }
    return this.agentesSortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
  }

  // ✅ Ordenar tabla de cotizaciones
  ordenarCotizaciones(columna: string): void {
    if (this.cotizacionesSortColumn === columna) {
      this.cotizacionesSortDirection = this.cotizacionesSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.cotizacionesSortColumn = columna;
      this.cotizacionesSortDirection = 'asc';
    }

    this.cotizacionesExistentes.sort((a, b) => {
      let valorA: any;
      let valorB: any;

      // Manejar propiedades anidadas
      if (columna === 'tomador') {
        valorA = a.tomador?.nombre || '';
        valorB = b.tomador?.nombre || '';
      } else {
        valorA = a[columna];
        valorB = b[columna];
      }

      // Si es número, comparar como número
      if (typeof valorA === 'number' && typeof valorB === 'number') {
        return this.cotizacionesSortDirection === 'asc' ? valorA - valorB : valorB - valorA;
      }

      // Si es string, comparar alfabéticamente
      valorA = String(valorA).toLowerCase();
      valorB = String(valorB).toLowerCase();

      if (valorA < valorB) return this.cotizacionesSortDirection === 'asc' ? -1 : 1;
      if (valorA > valorB) return this.cotizacionesSortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // ✅ Obtener icono de ordenamiento (cotizaciones)
  getCotizacionesSortIcon(columna: string): string {
    if (this.cotizacionesSortColumn !== columna) {
      return 'fa-sort';
    }
    return this.cotizacionesSortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
  }

  // ✅ Filtrar cotizaciones con búsqueda única (número, tomador, producto)
  filtrarCotizaciones(): void {
    const busqueda = this.filtroBusquedaCotizacion.toLowerCase().trim();

    if (!busqueda) {
      this.cotizacionesFiltradas = [...this.cotizacionesExistentes];
      return;
    }

    this.cotizacionesFiltradas = this.cotizacionesExistentes.filter(cot => {
      // Buscar en número
      const coincideNumero = cot.numero.toLowerCase().includes(busqueda);
      // Buscar en tomador (nombre o documento)
      const coincideTomador =
        cot.tomador.nombre.toLowerCase().includes(busqueda) ||
        cot.tomador.documento.toLowerCase().includes(busqueda);
      // Buscar en producto
      const coincideProducto = cot.producto.toLowerCase().includes(busqueda);

      return coincideNumero || coincideTomador || coincideProducto;
    });

    console.log(`🔍 Búsqueda "${busqueda}": ${this.cotizacionesFiltradas.length} resultados`);
  }

  // ✅ Limpiar búsqueda de cotizaciones
  limpiarFiltrosCotizaciones(): void {
    this.filtroBusquedaCotizacion = '';
    this.cotizacionesFiltradas = [...this.cotizacionesExistentes];
    console.log('🧹 Búsqueda limpiada');
  }

  // ✅ Métodos para Coaseguro Cedido
  abrirModalCoaseguroCedido(): void {
    this.coaseguroCedidoEditIndex = null; // Limpiar índice de edición
    this.coaseguroCedidoCoaseguradora = '';
    this.coaseguroCedidoParticipacion = 0;
    this.coaseguroCedidoGastosAdmin = 0;
    this.coaseguroCedidoNumeroPol = '';
    this.coaseguroCedidoCertificado = '';
    this.showModalCoaseguroCedido = true;
  }

  cerrarModalCoaseguroCedido(): void {
    this.showModalCoaseguroCedido = false;
    this.coaseguroCedidoEditIndex = null; // Limpiar al cerrar
  }

  // ✅ Manejar cambio de tipo coaseguro - Precargar datos para "Cedido"
  onTipoCoaseguroChange(): void {
    if (this.tipoCoaseguro === 'cedido') {
      // Precargar datos por defecto: Bolívar siempre aparece primero y es fijo (sin acciones)
      // Participación inicia en 100% y se descuenta al agregar otros coaseguros
      this.coasegurosCedidos = [
        {
          coaseguradora: this.COASEGURADORA_BOLIVAR,
          participacion: 100, // Inicia con 100%, se descuenta al agregar otros
          gastosAdmin: 0,
          numeroPol: '',
          certificado: '',
          esDefecto: true, // Marca para saber que es la fila fija de Bolívar (sin acciones)
        },
      ];
    } else if (this.tipoCoaseguro === 'sin-coaseguro') {
      // Limpiar coaseguros cuando se selecciona "Sin Coaseguro"
      this.coasegurosCedidos = [];
      // Limpiar también coaseguro aceptado
      this.coaseguroAceptadoCoaseguradora = '';
      this.coaseguroAceptadoNumeroPol = '';
      this.coaseguroAceptadoCertificado = '';
      this.coaseguroAceptadoParticipacion = 20;
    } else if (this.tipoCoaseguro === 'aceptado') {
      // Limpiar coaseguros cedidos cuando se cambia a aceptado
      this.coasegurosCedidos = [];
    }
  }

  guardarCoaseguroCedido(): void {
    if (!this.coaseguroCedidoCoaseguradora || !this.coaseguroCedidoParticipacion) return;

    const coaseguroData = {
      coaseguradora: this.coaseguroCedidoCoaseguradora,
      participacion: this.coaseguroCedidoParticipacion,
      gastosAdmin: this.coaseguroCedidoGastosAdmin || 0,
      numeroPol: this.coaseguroCedidoNumeroPol,
      certificado: this.coaseguroCedidoCertificado,
      esDefecto: false,
    };

    if (this.coaseguroCedidoEditIndex !== null) {
      // Editar existente (preservar esDefecto si es Bolívar)
      const esDefectoOriginal = this.coasegurosCedidos[this.coaseguroCedidoEditIndex].esDefecto;
      this.coasegurosCedidos[this.coaseguroCedidoEditIndex] = {
        ...coaseguroData,
        esDefecto: esDefectoOriginal,
      };
    } else {
      // Agregar nuevo
      this.coasegurosCedidos.push(coaseguroData);
    }

    // Calcular automáticamente el porcentaje de Bolívar (fila por defecto)
    this.actualizarParticipacionBolivar();

    this.cerrarModalCoaseguroCedido();
  }

  // ✅ Actualizar automáticamente el porcentaje de Bolívar
  actualizarParticipacionBolivar(): void {
    // Sumar participación de todas las filas que NO son Bolívar
    let sumaOtros = 0;
    this.coasegurosCedidos.forEach(c => {
      if (!c.esDefecto) {
        sumaOtros += Number(c.participacion) || 0;
      }
    });

    // Bolívar recibe el resto (100 - suma de otros)
    const participacionBolivar = 100 - sumaOtros;

    // Actualizar la fila de Bolívar
    const bolivarIndex = this.coasegurosCedidos.findIndex(c => c.esDefecto);
    if (bolivarIndex !== -1) {
      this.coasegurosCedidos[bolivarIndex].participacion =
        participacionBolivar > 0 ? participacionBolivar : 0;
    }
  }

  // ✅ Mostrar alerta de confirmación antes de eliminar
  eliminarCoaseguroCedido(index: number): void {
    // No permitir eliminar la fila de Bolívar (esDefecto)
    if (this.coasegurosCedidos[index]?.esDefecto) {
      return;
    }

    // Guardar el índice y mostrar la alerta de confirmación
    this.coaseguroAEliminarIndex = index;
    this.showAlertaEliminarCoaseguro = true;
  }

  // ✅ Cancelar eliminación
  cancelarEliminarCoaseguro(): void {
    this.showAlertaEliminarCoaseguro = false;
    this.coaseguroAEliminarIndex = null;
  }

  // ✅ Confirmar y ejecutar la eliminación
  confirmarEliminarCoaseguro(): void {
    if (this.coaseguroAEliminarIndex !== null) {
      this.coasegurosCedidos.splice(this.coaseguroAEliminarIndex, 1);

      // Recalcular el porcentaje de Bolívar después de eliminar
      this.actualizarParticipacionBolivar();

      // Recalcular paginación si es necesario
      const totalPages = Math.ceil(this.coasegurosCedidos.length / this.coasegurosCedidosPageSize);
      if (this.coasegurosCedidosPage > totalPages && totalPages > 0) {
        this.coasegurosCedidosPage = totalPages;
      }
    }

    // Cerrar la alerta
    this.showAlertaEliminarCoaseguro = false;
    this.coaseguroAEliminarIndex = null;
  }

  // ✅ Editar Coaseguro Cedido
  editarCoaseguroCedido(index: number): void {
    const coaseguro = this.coasegurosCedidos[index];
    if (coaseguro) {
      this.coaseguroCedidoEditIndex = index;
      this.coaseguroCedidoCoaseguradora = coaseguro.coaseguradora;
      this.coaseguroCedidoParticipacion = coaseguro.participacion;
      this.coaseguroCedidoGastosAdmin = coaseguro.gastosAdmin;
      this.coaseguroCedidoNumeroPol = coaseguro.numeroPol;
      this.coaseguroCedidoCertificado = coaseguro.certificado;
      this.showModalCoaseguroCedido = true;
    }
  }

  // ✅ Ordenamiento Coaseguros Cedidos
  sortCoasegurosCedidos(column: string): void {
    if (this.coasegurosCedidosSortColumn === column) {
      this.coasegurosCedidosSortDirection =
        this.coasegurosCedidosSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.coasegurosCedidosSortColumn = column;
      this.coasegurosCedidosSortDirection = 'asc';
    }

    this.coasegurosCedidos.sort((a, b) => {
      let valA = a[column];
      let valB = b[column];

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (valA < valB) return this.coasegurosCedidosSortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.coasegurosCedidosSortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  getSortIconCoaseguros(column: string): string {
    if (this.coasegurosCedidosSortColumn !== column) {
      return 'fa-sort';
    }
    return this.coasegurosCedidosSortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
  }

  // ✅ Paginación Coaseguros Cedidos
  get coasegurosCedidosPageStart(): number {
    return (this.coasegurosCedidosPage - 1) * this.coasegurosCedidosPageSize;
  }

  get coasegurosCedidosPageEnd(): number {
    return Math.min(
      this.coasegurosCedidosPageStart + this.coasegurosCedidosPageSize,
      this.coasegurosCedidos.length,
    );
  }

  get coasegurosCedidosPaginados(): any[] {
    return this.coasegurosCedidos
      .map((item, index) => ({ ...item, indexOriginal: index }))
      .slice(this.coasegurosCedidosPageStart, this.coasegurosCedidosPageEnd);
  }

  coasegurosCedidosPrevPage(): void {
    if (this.coasegurosCedidosPage > 1) {
      this.coasegurosCedidosPage--;
    }
  }

  coasegurosCedidosNextPage(): void {
    if (this.coasegurosCedidosPageEnd < this.coasegurosCedidos.length) {
      this.coasegurosCedidosPage++;
    }
  }
}


