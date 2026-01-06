import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import {
  ILibTbButton,
  ILibTbAlert,
  ILibTbProgressSpinner,
  ILibTbFileUploadField,
  ILibTbUploadingFile,
  ILibTbBreadcrumb,
} from 'tech-block-lib';
import {
  IUploadedFile,
  IContractAnalysisResults,
  IPolicySuggestion,
  ProcessingStatus,
  INITIAL_FILE_STATE,
  MOCK_EXTRACTED_DATA,
  MOCK_POLICY_SUGGESTIONS,
  FILE_UPLOAD_CONFIG,
  ACCEPTED_FILE_TYPES,
} from './contract-reader.interface';
import { BreadcrumbService, BreadcrumbItem } from '../../shared/services/breadcrumb.service';

@Component({
  standalone: false,
  selector: 'app-contract-reader',
  templateUrl: './contract-reader.component.html',
  styleUrls: ['./contract-reader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContractReaderComponent implements OnInit {
  // ✅ Estados principales
  currentFile: IUploadedFile = { ...INITIAL_FILE_STATE };
  analysisResults: IContractAnalysisResults | null = null;
  showSpinner = false;

  // ✅ Configuración de breadcrumb
  breadcrumbConfig: ILibTbBreadcrumb = {
    items: [],
  };

  constructor(
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    private readonly breadcrumbService: BreadcrumbService,
  ) {}

  ngOnInit(): void {
    this.setupBreadcrumb();
  }

  private setupBreadcrumb(): void {
    const breadcrumbItems: BreadcrumbItem[] = [
      {
        label: 'Dashboard',
        icon: 'fal fa-home',
        routerLink: ['/dashboard'],
      },
      {
        label: 'Lector de Contratos',
        icon: 'fal fa-file-contract',
      },
    ];

    this.breadcrumbService.setBreadcrumb(breadcrumbItems);
    this.breadcrumbConfig.items = breadcrumbItems.map(item => ({
      label: item.label,
      icon: item.icon,
      routerLink: item.routerLink?.join('/'),
    }));
  }

  // ✅ Configuración del FileUploadField de tech-block-lib
  fileUploadConfig: ILibTbFileUploadField = {
    avaibleTypes: ACCEPTED_FILE_TYPES,
    maxSize: FILE_UPLOAD_CONFIG.maxSizeBytes,
    multiple: false,
    dragDropLabel: 'Arrastra tu contrato aquí o haz clic para seleccionar',
    dragDropIcon: 'fal fa-cloud-upload',
    caption: 'Formatos soportados: PDF, DOC, DOCX (máximo 10MB)',
    class: 'contract-reader__upload-field',
    customBtn: {
      label: 'Seleccionar Archivo',
      icon: 'fal fa-folder-open',
      iconPosition: 'left',
      styleBtn: 'fill',
      typeBtn: 'primary',
    },
    errorText: {
      type: 'Tipo de archivo no válido. Use PDF, DOC o DOCX.',
      maxSize: `El archivo es demasiado grande. Máximo ${FILE_UPLOAD_CONFIG.maxSizeMB}MB.`,
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
        uploadingIcon: 'fal fa-spinner fa-spin',
        uploadedIcon: 'fal fa-check-circle',
        errorIcon: 'fal fa-exclamation-triangle',
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
          description: 'Procesando contrato con IA. Esto puede tomar unos momentos...',
          icon: 'fal fa-robot',
          closable: false,
        };
      case ProcessingStatus.COMPLETED:
        return {
          type: 'success',
          description: `Análisis completado con ${this.analysisResults?.confidence}% de confianza`,
          icon: 'fal fa-check-circle',
          closable: true,
        };
      case ProcessingStatus.ERROR:
        return {
          type: 'error',
          description: this.currentFile.errorMessage ?? 'Error procesando el archivo',
          icon: 'fal fa-exclamation-triangle',
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
      body: 'Procesando...',
    },
  };

  // ✅ Configuración de botones principales
  btnUploadNew: ILibTbButton = {
    label: 'Analizar Nuevo Contrato',
    icon: 'fal fa-plus',
    iconPosition: 'left',
    styleBtn: 'fill',
    typeBtn: 'primary',
    libTbClick: () => this.resetAnalysis(),
  };

  btnExportResults: ILibTbButton = {
    label: 'Exportar Resultados',
    icon: 'fal fa-download',
    iconPosition: 'left',
    styleBtn: 'stroke',
    typeBtn: 'secondary',
    libTbClick: () => this.exportResults(),
  };

  btnCreatePolicy: ILibTbButton = {
    label: 'Crear Póliza',
    icon: 'fal fa-shield-alt',
    iconPosition: 'left',
    styleBtn: 'fill',
    typeBtn: 'primary',
    libTbClick: () => this.navigateToCreatePolicy(),
  };

  // ✅ Eventos del FileUploadField
  onFileCaught(files: File[]): void {
    if (files && files.length > 0) {
      this.processFile(files[0]);
    }
  }

  onFileDeleted(file: File): void {
    console.log('Archivo eliminado:', file.name);
    this.resetAnalysis();
  }

  onFileReload(uploadingFile: ILibTbUploadingFile & { file: File }): void {
    console.log('Reintentar archivo:', uploadingFile.fileName);
    this.processFile(uploadingFile.file);
  }

  // ✅ Procesamiento de archivos (simplificado)
  processFile(file: File): void {
    // Inicializar archivo
    this.currentFile = {
      id: this.generateId(),
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      uploadedAt: new Date().toISOString(),
      status: ProcessingStatus.PROCESSING,
      progress: 0,
    };

    this.cdr.detectChanges();
    this.simulateProcessing();
  }

  simulateProcessing(): void {
    // Simular procesamiento IA
    this.simulateProgress(5000)
      .then(() => {
        this.completeAnalysis();
      })
      .catch(() => {
        this.setError('Error durante el procesamiento del archivo.');
      });
  }

  simulateProgress(duration: number): Promise<void> {
    return new Promise(resolve => {
      const interval = 100;
      const steps = duration / interval;
      let currentStep = 0;

      this.showSpinner = true;

      const timer = setInterval(() => {
        currentStep++;
        this.currentFile.progress = Math.floor((currentStep / steps) * 100);
        this.cdr.detectChanges();

        if (currentStep >= steps) {
          clearInterval(timer);
          this.showSpinner = false;
          resolve();
        }
      }, interval);
    });
  }

  completeAnalysis(): void {
    this.currentFile.status = ProcessingStatus.COMPLETED;
    this.currentFile.progress = 100;

    // Simular resultados del análisis
    this.analysisResults = {
      fileInfo: { ...this.currentFile },
      extractedData: MOCK_EXTRACTED_DATA,
      suggestions: MOCK_POLICY_SUGGESTIONS,
      confidence: 92,
      processingTime: 6.2,
      warnings: [
        'Algunas fechas pueden requerir verificación manual',
        'Se recomienda revisar las cláusulas de fuerza mayor',
      ],
    };

    this.cdr.detectChanges();
  }

  setError(message: string): void {
    this.currentFile.status = ProcessingStatus.ERROR;
    this.currentFile.errorMessage = message;
    this.showSpinner = false;
    this.cdr.detectChanges();
  }

  resetAnalysis(): void {
    this.currentFile = { ...INITIAL_FILE_STATE };
    this.analysisResults = null;
    this.showSpinner = false;
    this.cdr.detectChanges();
    this.breadcrumbService.setContractReaderBreadcrumb(); // ✅ BREADCRUMB NAVIGATION: Resetear breadcrumb
  }

  // ✅ Métodos de acción
  exportResults(): void {
    if (!this.analysisResults) return;

    // Simular exportación
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
      },
    });
  }

  createPolicyFromSuggestion(suggestion: IPolicySuggestion): void {
    // Navegar a policy-input con sugerencia específica
    this.router.navigate(['/policy-input'], {
      queryParams: {
        action: 'cotizar',
        suggestionId: suggestion.id,
        contractId: this.currentFile.id,
      },
    });
  }

  // ✅ Métodos auxiliares
  private generateId(): string {
    return `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
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

  // ✅ Helpers para template
  getPriorityClass(priority: string): string {
    const classes = {
      'alta': 'bg-errorBase text-grayscaleWhite',
      'media': 'bg-warningBase text-grayscaleBlack',
      'baja': 'bg-infoBase text-grayscaleWhite',
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
