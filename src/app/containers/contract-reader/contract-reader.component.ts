/**
 * ✅ RF-009: Componente para Procesamiento del Contrato con IA
 *
 * Implementa todas las reglas de RF-009:
 * - Regla 9.1: Invocar servicio IA y bloquear re-ejecución
 * - Regla 9.2: Códigos Tronador retornados por IA
 * - Regla 9.3: WebSocket para estado en tiempo real
 * - Regla 9.4: Popup de error de procesamiento
 * - Regla 9.5: Validación de asegurabilidad
 * - Regla 9.6: Almacenamiento S3/FileNet
 * - Regla 9.7: Timeout y habilitación de campos
 * - Regla 9.8: Validación de formato de fechas/números
 * - Regla 9.9: Validación etapa del contrato
 * - Regla 9.10: Validación consistencia con catálogos
 * - Regla 9.11: Corrección manual de datos
 */

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, OnDestroy } from '@angular/core';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  ILibTbButton,
  ILibTbAlert,
  ILibTbProgressSpinner,
  ILibTbFileUploadField,
  ILibTbUploadingFile,
  ILibTbBreadcrumb,
  ILibTbModal,
} from 'tech-block-lib';
import {
  IUploadedFile,
  IContractAnalysisResults,
  IPolicySuggestion,
  ProcessingStatus,
  INITIAL_FILE_STATE,
  FILE_UPLOAD_CONFIG,
  ACCEPTED_FILE_TYPES,
  RF009_MESSAGES,
  IWebSocketMessage,
  Asegurabilidad,
  TipoArchivo,
  EstadoArchivo,
  IFileStorageMetadata,
} from './contract-reader.interface';
import { BreadcrumbService, BreadcrumbItem } from '../../shared/services/breadcrumb.service';
import { ContractAIService } from '../../shared/services/contract-ai.service';
import { FileStorageService } from '../../shared/services/file-storage.service';
import { SessionService } from '../../shared/services/session.service';
import { ConfigService } from '../../shared/services/config.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-contract-reader',
  templateUrl: './contract-reader.component.html',
  styleUrls: ['./contract-reader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContractReaderComponent implements OnInit, OnDestroy {
  // ✅ Estados principales
  currentFile: IUploadedFile = { ...INITIAL_FILE_STATE };
  analysisResults: IContractAnalysisResults | null = null;
  showSpinner = false;
  wsMessage: string = '';
  wsProgress = 0;

  // ✅ RF-009 Regla 9.1: Control de bloqueo de procesamiento
  procesamientoBloqueado = false;

  // ✅ RF-009 Regla 9.5: Modal de asegurabilidad
  showAsegurabilidadModal = false;
  asegurabilidadMensaje = '';

  // ✅ RF-009 Regla 9.4: Modal de error
  showErrorModal = false;
  errorMensaje = '';

  // ✅ RF-009 Regla 9.7: Control de timeout
  timeoutOcurrido = false;

  // ✅ RF-009 Regla 9.11: Modo corrección manual
  modoCorreccionManual = false;

  // ✅ Subscripciones
  private destroy$ = new Subject<void>();
  private wsSubscription?: Subscription;

  // ✅ Configuración de breadcrumb
  breadcrumbConfig: ILibTbBreadcrumb = {
    items: [],
  };

  constructor(
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    private readonly breadcrumbService: BreadcrumbService,
    private readonly contractAIService: ContractAIService,
    private readonly fileStorageService: FileStorageService,
    private readonly sessionService: SessionService,
    private readonly configService: ConfigService,
  ) {}

  ngOnInit(): void {
    this.setupBreadcrumb();
    this.suscribirWebSocket();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.wsSubscription) {
      this.wsSubscription.unsubscribe();
    }
  }

  private setupBreadcrumb(): void {
    const breadcrumbItems: BreadcrumbItem[] = [
      {
        label: 'Dashboard',
        icon: 'fa-solid fa-home',
        routerLink: ['/dashboard'],
      },
      {
        label: 'Lector de Contratos',
        icon: 'fa-solid fa-file-contract',
      },
    ];

    this.breadcrumbService.setBreadcrumb(breadcrumbItems);
    this.breadcrumbConfig.items = breadcrumbItems.map(item => ({
      label: item.label,
      icon: item.icon,
      routerLink: item.routerLink?.join('/'),
    }));
  }

  /**
   * ✅ RF-009 Regla 9.3: Suscribirse a mensajes WebSocket
   */
  private suscribirWebSocket(): void {
    this.wsSubscription = this.contractAIService
      .getWebSocketMessages()
      .pipe(takeUntil(this.destroy$))
      .subscribe((mensaje: IWebSocketMessage) => {
        this.wsMessage = mensaje.mensaje;
        this.wsProgress = mensaje.progreso || 0;
        this.cdr.detectChanges();

        if (mensaje.tipo === 'error') {
          this.handleErrorProcesamiento(mensaje.error || RF009_MESSAGES.ERROR_PROCESAMIENTO);
        }
      });
  }

  // ✅ Configuración del FileUploadField de tech-block-lib
  fileUploadConfig: ILibTbFileUploadField = {
    avaibleTypes: ACCEPTED_FILE_TYPES,
    maxSize: FILE_UPLOAD_CONFIG.maxSizeBytes,
    multiple: false,
    dragDropLabel: 'Arrastra tu contrato aquí o haz clic para seleccionar',
    dragDropIcon: 'fa-solid fa-cloud-upload',
    caption: 'Formatos soportados: PDF, DOCX, XLSX (máximo 30MB)', // ✅ RF-008 Regla 8.2
    class: 'contract-reader__upload-field',
    customBtn: {
      label: 'Seleccionar Archivo',
      icon: 'fa-solid fa-folder-open',
      iconPosition: 'left',
      styleBtn: 'fill',
      typeBtn: 'primary',
    },
    errorText: {
      type: 'Las extensiones soportadas son: *.DOCX, XLSX y *.PDF', // ✅ RF-008 Regla 8.2: Mensaje exacto
      maxSize: 'El tamaño máximo del archivo 30 MB', // ✅ RF-008 Regla 8.2: Mensaje exacto
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

  // ✅ Configuración de alertas para diferentes estados
  getStatusAlert(): ILibTbAlert | null {
    const alertMessage = this.getAlertMessage();
    if (!alertMessage) return null;

    return {
      float: false,
      alerts: [alertMessage],
      class: 'mb-4',
    };
  }

  private getAlertMessage(): any {
    switch (this.currentFile.status) {
      case ProcessingStatus.PROCESSING:
        return {
          type: 'info',
          description: this.wsMessage || RF009_MESSAGES.PROCESANDO,
          icon: 'fa-solid fa-robot',
          closable: false,
        };
      case ProcessingStatus.COMPLETED:
        return {
          type: 'success',
          description: `Análisis completado con ${this.analysisResults?.confidence}% de confianza`,
          icon: 'fa-solid fa-check-circle',
          closable: true,
        };
      case ProcessingStatus.ERROR:
        return {
          type: 'error',
          description: this.currentFile.errorMessage ?? 'Error procesando el archivo',
          icon: 'fa-solid fa-exclamation-triangle',
          closable: true,
        };
      case ProcessingStatus.TIMEOUT:
        return {
          type: 'warning',
          description: RF009_MESSAGES.TIMEOUT,
          icon: 'fa-solid fa-clock',
          closable: true,
        };
      default:
        return null;
    }
  }

  // ✅ Configuración del spinner de progreso
  progressSpinner: ILibTbProgressSpinner = {
    infinite: true,
    strokeWidth: 4,
    style: { height: '60px', width: '60px' },
    text: {
      body: this.wsMessage || RF009_MESSAGES.PROCESANDO,
    },
  };

  // ✅ Configuración de botones principales
  btnUploadNew: ILibTbButton = {
    label: 'Analizar Nuevo Contrato',
    icon: 'fa-solid fa-plus',
    iconPosition: 'left',
    styleBtn: 'fill',
    typeBtn: 'primary',
    libTbClick: () => this.resetAnalysis(),
    disabled: this.procesamientoBloqueado, // ✅ RF-009 Regla 9.1
  };

  btnExportResults: ILibTbButton = {
    label: 'Exportar Resultados',
    icon: 'fa-solid fa-download',
    iconPosition: 'left',
    styleBtn: 'stroke',
    typeBtn: 'secondary',
    libTbClick: () => this.exportResults(),
  };

  btnCreatePolicy: ILibTbButton = {
    label: 'Crear Póliza',
    icon: 'fa-solid fa-shield-alt',
    iconPosition: 'left',
    styleBtn: 'fill',
    typeBtn: 'primary',
    libTbClick: () => this.navigateToCreatePolicy(),
  };

  // ✅ RF-009 Regla 9.4: Configuración modal de error
  errorModalConfig: ILibTbModal = {
    title: 'Error de Procesamiento',
    show: false,
    size: 'medium',
    closeOnBackdrop: true,
    libTbOnClose: () => {
      this.showErrorModal = false;
      this.cdr.detectChanges();
    },
  };

  // ✅ RF-009 Regla 9.5: Configuración modal de asegurabilidad
  asegurabilidadModalConfig: ILibTbModal = {
    title: 'Contrato No Asegurable',
    show: false,
    size: 'medium',
    closeOnBackdrop: false,
    libTbOnClose: () => {
      // No permitir cerrar - debe resetear
      this.resetAnalysis();
    },
  };

  // ✅ Eventos del FileUploadField
  onFileCaught(files: File[]): void {
    if (files && files.length > 0) {
      // ✅ RF-009 Regla 9.1: Verificar si ya hay procesamiento en curso
      if (this.procesamientoBloqueado || this.contractAIService.estaBloqueado()) {
        this.showErrorNotification('Ya hay un procesamiento en curso. Por favor espera.');
        return;
      }

      this.processFile(files[0]);
    }
  }

  onFileDeleted(file: File): void {
    console.log('Archivo eliminado:', file.name);
    this.resetAnalysis();
  }

  onFileReload(uploadingFile: ILibTbUploadingFile & { file: File }): void {
    console.log('Reintentar archivo:', uploadingFile.fileName);

    // ✅ RF-009 Regla 9.1: Verificar bloqueo
    if (this.procesamientoBloqueado) {
      this.showErrorNotification('El procesamiento está bloqueado. Por favor espera.');
      return;
    }

    this.processFile(uploadingFile.file);
  }

  /**
   * ✅ RF-009 Regla 9.1, 9.6: Procesar archivo con IA
   */
  processFile(file: File): void {
    // ✅ RF-008 Regla 8.2: Validar formato según políticas FileNet
    if (!this.fileStorageService.validarFormatoArchivo(file)) {
      this.showErrorNotification('Las extensiones soportadas son: *.DOCX, XLSX y *.PDF');
      return;
    }

    // ✅ RF-009 Regla 9.1: Bloquear procesamiento
    this.procesamientoBloqueado = true;
    this.currentFile.procesamientoBloqueado = true;

    // ✅ Inicializar archivo
    const idMongo = this.generateIdMongo();
    this.currentFile = {
      id: idMongo,
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      uploadedAt: new Date().toISOString(),
      status: ProcessingStatus.UPLOADING,
      progress: 0,
      procesamientoBloqueado: true,
    };

    this.cdr.detectChanges();

    // ✅ RF-009 Regla 9.6: Preparar metadata para almacenamiento
    const metadata: IFileStorageMetadata = {
      idMongo,
      seccion: this.configService.codSecc, // '4'
      producto: '440', // TODO: Obtener del contexto
      tipoDocTomador: this.sessionService.getTipoDocumento() || 'CC',
      nroDocTomador: this.sessionService.getNumeroDocumento() || '',
      tipoArchivo: TipoArchivo.CONTRATO, // TODO: Determinar según tipo
      fecha: this.formatearFechaYYYYMMDD(new Date()),
      estado: EstadoArchivo.PE,
      formato: this.fileStorageService.obtenerFormatoArchivo(file),
    };

    this.currentFile.metadata = metadata;

    // ✅ RF-009 Regla 9.6: Subir a S3 primero
    this.fileStorageService.subirAS3(file, metadata).subscribe({
      next: storageResult => {
        this.currentFile.storageResult = storageResult;
        this.currentFile.status = ProcessingStatus.PROCESSING;
        this.showSpinner = true;
        this.cdr.detectChanges();

        // ✅ RF-009 Regla 9.1: Procesar con IA
        this.procesarConIA(file, metadata);
      },
      error: error => {
        console.error('❌ Error al subir a S3:', error);
        this.handleErrorProcesamiento('Error al subir el archivo. Intenta nuevamente.');
      },
    });
  }

  /**
   * ✅ RF-009 Regla 9.1, 9.3, 9.5: Procesar contrato con IA
   */
  private procesarConIA(file: File, _metadata: IFileStorageMetadata): void {
    // ✅ Obtener correo del usuario desde la sesión
    const correoUsuario = this.sessionService.getEmail();
    if (!correoUsuario) {
      this.handleErrorProcesamiento('No se encontró el correo del usuario en la sesión');
      return;
    }

    // ✅ Generar ID único para el frontend
    const idFront = `front_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    this.contractAIService.procesarContrato(file, correoUsuario, idFront).subscribe({
      next: response => {
        // ✅ RF-009 Regla 9.5: Validar asegurabilidad
        try {
          this.contractAIService.validarAsegurabilidad(
            response.asegurabilidad,
            response.motivoAsegurabilidad,
          );

          // ✅ Procesamiento exitoso
          this.completeAnalysis(response);
        } catch (error: any) {
          // ✅ RF-009 Regla 9.5: Contrato no asegurable
          if (error.asegurabilidad === Asegurabilidad.NO) {
            this.handleAsegurabilidadNo(error.mensaje, error.motivo);
            return;
          }
          throw error;
        }
      },
      error: error => {
        console.error('❌ Error al procesar con IA:', error);

        // ✅ RF-009 Regla 9.7: Manejar timeout
        if (error.timeout) {
          this.handleTimeout();
          return;
        }

        // ✅ RF-009 Regla 9.4: Manejar error de procesamiento
        this.handleErrorProcesamiento(error.error || RF009_MESSAGES.ERROR_PROCESAMIENTO);
      },
    });
  }

  /**
   * ✅ RF-009 Regla 9.5: Manejar contrato no asegurable
   */
  // ✅ Método público para tests
  handleAsegurabilidadNo(mensaje: string, motivo?: string): void {
    this.currentFile.status = ProcessingStatus.ERROR;
    this.currentFile.errorMessage = mensaje;
    this.showSpinner = false;
    this.procesamientoBloqueado = false;
    this.currentFile.procesamientoBloqueado = false;

    this.asegurabilidadMensaje = mensaje;
    if (motivo) {
      this.asegurabilidadMensaje += `\n\nMotivo: ${motivo}`;
    }

    this.showAsegurabilidadModal = true;
    this.asegurabilidadModalConfig.show = true;
    this.cdr.detectChanges();
  }

  /**
   * ✅ RF-009 Regla 9.4: Manejar error de procesamiento
   */
  // ✅ Método público para tests
  handleErrorProcesamiento(mensaje: string): void {
    this.currentFile.status = ProcessingStatus.ERROR;
    this.currentFile.errorMessage = mensaje;
    this.showSpinner = false;
    this.procesamientoBloqueado = false;
    this.currentFile.procesamientoBloqueado = false;

    // ✅ RF-009 Regla 9.7: Habilitar campos manuales si hay timeout
    if (this.timeoutOcurrido) {
      this.modoCorreccionManual = true;
    }

    this.errorMensaje = mensaje;
    this.showErrorModal = true;
    this.errorModalConfig.show = true;
    this.cdr.detectChanges();
  }

  /**
   * ✅ RF-009 Regla 9.7: Manejar timeout
   */
  // ✅ Método público para tests
  handleTimeout(): void {
    this.currentFile.status = ProcessingStatus.TIMEOUT;
    this.timeoutOcurrido = true;
    this.showSpinner = false;
    this.procesamientoBloqueado = false;
    this.currentFile.procesamientoBloqueado = false;
    this.modoCorreccionManual = true; // ✅ Habilitar campos manuales

    this.showErrorNotification(RF009_MESSAGES.TIMEOUT);
    this.cdr.detectChanges();
  }

  /**
   * ✅ Completar análisis exitoso
   */
  // ✅ Método público para tests
  completeAnalysis(response: any): void {
    this.currentFile.status = ProcessingStatus.COMPLETED;
    this.currentFile.progress = 100;
    this.showSpinner = false;
    this.procesamientoBloqueado = false;
    this.currentFile.procesamientoBloqueado = false;

    // ✅ RF-009 Regla 9.8, 9.10: Verificar datos inválidos/inconsistentes
    const tieneDatosInvalidos =
      response.datosExtraidos.datosInvalidos.fechas.length > 0 ||
      response.datosExtraidos.datosInvalidos.numeros.length > 0;

    const tieneDatosInconsistentes =
      response.datosExtraidos.datosInconsistentes.moneda ||
      response.datosExtraidos.datosInconsistentes.tipoContrato ||
      response.datosExtraidos.datosInconsistentes.departamento ||
      response.datosExtraidos.datosInconsistentes.municipio ||
      response.datosExtraidos.datosInconsistentes.ciudad;

    if (tieneDatosInvalidos || tieneDatosInconsistentes) {
      this.modoCorreccionManual = true; // ✅ RF-009 Regla 9.11: Permitir corrección manual
    }

    this.analysisResults = {
      fileInfo: { ...this.currentFile },
      extractedData: response.datosExtraidos,
      suggestions: [], // TODO: Generar sugerencias
      confidence: response.confianza,
      processingTime: response.tiempoProcesamiento,
      warnings: response.warnings || [],
      asegurabilidadValidada: response.asegurabilidad === Asegurabilidad.SI,
    };

    this.cdr.detectChanges();
  }

  /**
   * ✅ RF-009 Regla 9.11: Continuar con corrección manual
   */
  continuarConCorreccionManual(): void {
    this.modoCorreccionManual = true;
    this.showErrorModal = false;
    this.errorModalConfig.show = false;
    this.cdr.detectChanges();
  }

  /**
   * ✅ RF-009 Regla 9.5: Cerrar modal de asegurabilidad y resetear
   */
  cerrarAsegurabilidadModal(): void {
    this.showAsegurabilidadModal = false;
    this.asegurabilidadModalConfig.show = false;
    this.resetAnalysis();
  }

  /**
   * ✅ RF-009 Regla 9.4: Cerrar modal de error
   */
  cerrarErrorModal(): void {
    this.showErrorModal = false;
    this.errorModalConfig.show = false;
    this.cdr.detectChanges();
  }

  resetAnalysis(): void {
    this.currentFile = { ...INITIAL_FILE_STATE };
    this.analysisResults = null;
    this.showSpinner = false;
    this.procesamientoBloqueado = false;
    this.timeoutOcurrido = false;
    this.modoCorreccionManual = false;
    this.wsMessage = '';
    this.wsProgress = 0;
    this.cdr.detectChanges();
    this.breadcrumbService.setContractReaderBreadcrumb();
  }

  // ✅ Métodos de acción
  exportResults(): void {
    if (!this.analysisResults) return;

    const data = JSON.stringify(this.analysisResults, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analisis-contrato-${this.currentFile.name.replace(/\.[^/.]+$/, '')}.json`;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  navigateToCreatePolicy(): void {
    if (!this.analysisResults) return;

    // Navegar a policy-input con datos pre-poblados
    this.router.navigate(['/policy-input'], {
      queryParams: {
        action: 'emitir',
        contractAnalysis: this.analysisResults.fileInfo.id,
        datosExtraidos: JSON.stringify(this.analysisResults.extractedData),
      },
    });
  }

  createPolicyFromSuggestion(suggestion: IPolicySuggestion): void {
    this.router.navigate(['/policy-input'], {
      queryParams: {
        action: 'cotizar',
        suggestionId: suggestion.id,
        contractId: this.currentFile.id,
      },
    });
  }

  // ✅ Métodos auxiliares
  private generateIdMongo(): string {
    // Generar ID similar a MongoDB ObjectId (24 caracteres hex)
    const timestamp = Date.now().toString(16);
    const random = Array.from({ length: 16 }, () =>
      Math.floor(Math.random() * 16).toString(16),
    ).join('');
    return timestamp + random;
  }

  private formatearFechaYYYYMMDD(fecha: Date): string {
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    return `${año}${mes}${dia}`;
  }

  private showErrorNotification(mensaje: string): void {
    // TODO: Integrar con servicio de notificaciones
    console.error('❌ Error:', mensaje);
    alert(mensaje); // Temporal - reemplazar con servicio de notificaciones
  }

  // ✅ Getters para template
  get fileSize(): string {
    if (this.currentFile.size === 0) return '';
    const mb = this.currentFile.size / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  }

  get isProcessing(): boolean {
    return this.currentFile.status === ProcessingStatus.PROCESSING;
  }

  get hasResults(): boolean {
    return this.currentFile.status === ProcessingStatus.COMPLETED && this.analysisResults !== null;
  }

  get hasError(): boolean {
    return this.currentFile.status === ProcessingStatus.ERROR;
  }

  get isIdle(): boolean {
    return this.currentFile.status === ProcessingStatus.IDLE;
  }

  get canProcess(): boolean {
    return !this.procesamientoBloqueado && !this.contractAIService.estaBloqueado();
  }

  // ✅ Helpers para template
  getPriorityClass(priority: string): string {
    const classes = {
      alta: 'bg-errorBase text-grayscaleWhite',
      media: 'bg-warningBase text-grayscaleBlack',
      baja: 'bg-infoBase text-grayscaleWhite',
    };
    return classes[priority as keyof typeof classes] || 'bg-grayscaleL200 text-grayscaleBlack';
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value);
  }
}
