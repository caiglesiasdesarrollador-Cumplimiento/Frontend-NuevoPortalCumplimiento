import { Component, OnInit } from '@angular/core';
import {
  ILibTbButton,
  ILibTbAlert,
  ILibTbAlertMessage,
  ILibTbBreadcrumb,
  ILibTbFileUploadField,
} from 'tech-block-lib';
import { BehaviorSubject } from 'rxjs';
import {
  IUploadedFinancialStatement,
  INITIAL_FINANCIAL_STATE,
  ProcessingStatus,
} from './financial-statement-reader.interface';
import { BreadcrumbService, BreadcrumbItem } from '../../shared/services/breadcrumb.service';

/**
 * ✅ APLICANDO PATRÓN CORRECTO: policy-input simplificado con breadcrumb
 * ✅ APLICANDO REGLA: No usar ChangeDetectionStrategy.OnPush para formularios dinámicos
 * ✅ APLICANDO REGLA: Breadcrumb navigation como settings
 */
@Component({
  standalone: false,
  selector: 'app-financial-statement-reader',
  templateUrl: './financial-statement-reader.component.html',
  styleUrls: ['./financial-statement-reader.component.scss'],
})
export class FinancialStatementReaderComponent implements OnInit {
  // ✅ Estados principales
  currentFile: IUploadedFinancialStatement = { ...INITIAL_FINANCIAL_STATE };
  analysisProgress = 0;

  // ✅ Estados reactivos (patrón policy-input)
  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  private readonly alertsSubject = new BehaviorSubject<ILibTbAlertMessage[]>([]);

  loading$ = this.loadingSubject.asObservable();
  alerts$ = this.alertsSubject.asObservable();

  // ✅ Configuración de breadcrumb (como settings)
  breadcrumbConfig: ILibTbBreadcrumb = {
    items: [],
  };

  constructor(private readonly breadcrumbService: BreadcrumbService) {}

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
        label: 'Análisis de Estados Financieros',
        icon: 'fal fa-chart-line',
      },
    ];

    this.breadcrumbService.setBreadcrumb(breadcrumbItems);
    this.breadcrumbConfig.items = breadcrumbItems.map(item => ({
      label: item.label,
      icon: item.icon,
      routerLink: item.routerLink?.join('/'),
    }));
  }

  // ✅ Configuración de alertas para diferentes estados
  alertConfig: ILibTbAlert = {
    float: false,
    alerts: [],
  };

  // ✅ Configuración del componente File Upload Field (tech-block-lib)
  fileUploadConfig: ILibTbFileUploadField = {
    dataQaId: 'financial-statement-upload',
    multiple: false,
    dragDropLabel: 'Arrastra tu estado financiero aquí',
    caption: 'PDF, Excel (Máx. 10MB)',
    label: 'Subir Estado Financiero',
    dragDropIcon: 'fal fa-file-upload',
    avaibleTypes: [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
    ],
    maxSize: 10485760, // 10MB en bytes
    errorText: {
      type: 'Solo se permiten archivos PDF o Excel',
      maxSize: 'El archivo no debe superar los 10MB',
      isFileSelected: 'El archivo ya fue seleccionado',
    },
    customAlert: {
      position: 'bottom-center',
      float: false,
    },
    customUploadingFile: {
      textCaption: {
        uploaded: 'Archivo cargado correctamente',
        uploading: 'Cargando archivo...',
        error: 'Error al cargar el archivo',
      },
    },
    libTbOnCatchFile: (files: File[]) => this.onFileSelected(files),
    libTbOnDeleteFile: () => this.onFileDeleted(),
    libTbOnReloadFile: () => this.onFileReload(),
  };

  // ✅ Loading state flag
  get isLoading(): boolean {
    return this.loadingSubject.value;
  }

  // ✅ BOTONES DE ACCIÓN (patrón policy-input simplificado)
  btnAnalyze: ILibTbButton = {
    label: 'Iniciar Análisis',
    icon: 'fal fa-play',
    iconPosition: 'right',
    styleBtn: 'fill',
    typeBtn: 'primary',
    libTbClick: () => this.startAnalysis(),
  };

  btnReset: ILibTbButton = {
    label: 'Reiniciar',
    icon: 'fal fa-redo',
    iconPosition: 'left',
    styleBtn: 'stroke',
    typeBtn: 'secondary',
    libTbClick: () => this.resetForm(),
  };

  // ✅ LÓGICA DE ANÁLISIS
  startAnalysis(): void {
    this.loadingSubject.next(true);
    this.analysisProgress = 0;
    this.simulateAnalysis();
  }

  private simulateAnalysis(): void {
    const progressInterval = setInterval(() => {
      this.analysisProgress += 15;
      if (this.analysisProgress >= 100) {
        clearInterval(progressInterval);
        setTimeout(() => {
          this.loadingSubject.next(false);
          this.showAlert('success', 'Análisis completado exitosamente', 'fal fa-check-circle');
        }, 500);
      }
    }, 800);
  }

  resetForm(): void {
    this.currentFile = { ...INITIAL_FINANCIAL_STATE };
    this.analysisProgress = 0;
    this.clearAlerts();
  }

  // ✅ Helpers para alertas (patrón policy-input)
  private showAlert(
    type: 'success' | 'error' | 'warning' | 'info',
    description: string,
    icon: string,
  ): void {
    const alert: ILibTbAlertMessage = {
      type,
      description,
      icon,
      closable: true,
    };

    this.alertsSubject.next([alert]);
    this.alertConfig.alerts = [alert];
  }

  private clearAlerts(): void {
    this.alertsSubject.next([]);
    this.alertConfig.alerts = [];
  }

  // ✅ Métodos para manejo de archivos (tech-block-lib)
  onFileSelected(files: File[]): void {
    if (files && files.length > 0) {
      const file = files[0];
      this.currentFile = {
        ...INITIAL_FINANCIAL_STATE,
        id: `file-${Date.now()}`,
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        uploadedAt: new Date().toISOString(),
        status: ProcessingStatus.COMPLETED,
        progress: 100,
      };

      this.showAlert(
        'success',
        `Archivo "${file.name}" cargado exitosamente`,
        'fal fa-check-circle',
      );
    }
  }

  onFileDeleted(): void {
    this.currentFile = { ...INITIAL_FINANCIAL_STATE };
    this.analysisProgress = 0;
    this.clearAlerts();
  }

  onFileReload(): void {
    // Lógica para recargar archivo si es necesario
    this.showAlert('info', 'Archivo recargado', 'fal fa-sync');
  }

  // ✅ Getters para template
  get hasResults(): boolean {
    return this.analysisProgress >= 100 && !this.isLoading;
  }

  get fileSize(): string {
    return this.currentFile.size
      ? `${(this.currentFile.size / 1024 / 1024).toFixed(2)} MB`
      : '0 MB';
  }
}
