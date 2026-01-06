import { Component, OnInit } from '@angular/core';
import {
  ILibTbButton,
  ILibTbAlert,
  ILibTbAlertMessage,
  ILibTbProgressSpinner,
  ILibTbDynamicForm,
  ILibTbBreadcrumb,
} from 'tech-block-lib';
import {
  IPolicyGenerationRequest,
  IPolicyGenerationResult,
  PolicyStatus,
  INITIAL_POLICY_REQUEST,
  MOCK_COVERAGE_DETAILS,
} from './policy-generation.interface';
import { policyGenerationConfig } from './configs/policy-generation.config';
import { BreadcrumbService, BreadcrumbItem } from '../../shared/services/breadcrumb.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-policy-generation',
  templateUrl: './policy-generation.component.html',
  styleUrls: ['./policy-generation.component.scss'],
})
export class PolicyGenerationComponent implements OnInit {
  policyRequest: IPolicyGenerationRequest = { ...INITIAL_POLICY_REQUEST };
  generationResult: IPolicyGenerationResult | null = null;
  isProcessing = false;

  // ✅ Estados reactivos
  private readonly alertsSubject = new BehaviorSubject<ILibTbAlertMessage[]>([]);
  alerts$ = this.alertsSubject.asObservable();

  // ✅ Estados del componente para mostrar alertas
  showProcessingAlert = false;
  showErrorAlert = false;
  showSuccessAlert = false;

  // ✅ Configuración de breadcrumb
  breadcrumbConfig: ILibTbBreadcrumb = {
    items: [],
  };

  // ✅ Configuración de alertas
  alertConfig: ILibTbAlert = {
    float: false,
    alerts: [],
  };

  constructor(private readonly breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.setupBreadcrumb();

    // Suscribirse a cambios de alertas
    this.alerts$.subscribe(alerts => {
      this.alertConfig.alerts = alerts;
    });
  }

  private setupBreadcrumb(): void {
    const breadcrumbItems: BreadcrumbItem[] = [
      {
        label: 'Dashboard',
        icon: 'fal fa-home',
        routerLink: ['/dashboard'],
      },
      {
        label: 'Generación de Pólizas',
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

  // ✅ OBLIGATORIO: Configuración del formulario dinámico (propiedad fija como settings)
  policyGenerationForm: ILibTbDynamicForm = policyGenerationConfig();

  // ✅ OBLIGATORIO: Botones de acción usando propiedades nativas de tech-block-lib
  btnGenerate: ILibTbButton = {
    label: 'Generar Póliza',
    icon: 'fal fa-file-contract',
    iconPosition: 'right',
    styleBtn: 'fill',
    typeBtn: 'primary',
    libTbClick: () => this.generatePolicy(),
  };

  btnReset: ILibTbButton = {
    label: 'Limpiar Formulario',
    icon: 'fal fa-redo',
    iconPosition: 'left',
    styleBtn: 'stroke',
    typeBtn: 'secondary',
    libTbClick: () => this.resetForm(),
  };

  btnNewPolicy: ILibTbButton = {
    label: 'Nueva Póliza',
    icon: 'fal fa-plus',
    iconPosition: 'left',
    styleBtn: 'fill',
    typeBtn: 'primary',
    libTbClick: () => this.startNewPolicy(),
  };

  btnDownloadPolicy: ILibTbButton = {
    label: 'Descargar Póliza',
    icon: 'fal fa-download',
    iconPosition: 'right',
    styleBtn: 'stroke',
    typeBtn: 'primary',
    libTbClick: () => this.downloadPolicy(),
  };

  btnExportResult: ILibTbButton = {
    label: 'Exportar',
    icon: 'fal fa-file-export',
    iconPosition: 'left',
    styleBtn: 'stroke',
    typeBtn: 'secondary',
    libTbClick: () => this.exportResult(),
  };

  // ✅ Métodos auxiliares para alertas
  private showAlert(alert: Omit<ILibTbAlertMessage, 'id'>): void {
    const newAlert: ILibTbAlertMessage = {
      ...alert,
      id: `alert_${Date.now()}`,
    };

    const currentAlerts = this.alertsSubject.value;
    this.alertsSubject.next([...currentAlerts, newAlert]);

    // Auto-ocultar después de 5 segundos excepto para alertas de procesamiento
    if (alert.type !== 'info') {
      setTimeout(() => {
        if (newAlert.id) {
          this.hideAlert(newAlert.id);
        }
      }, 5000);
    }
  }

  private hideAlert(alertId: string): void {
    const currentAlerts = this.alertsSubject.value;
    const filteredAlerts = currentAlerts.filter(alert => alert.id !== alertId);
    this.alertsSubject.next(filteredAlerts);
  }

  private clearAlerts(): void {
    this.alertsSubject.next([]);
  }

  get processingSpinner(): ILibTbProgressSpinner {
    return {
      strokeWidth: 4,
      animationDuration: '1s',
    };
  }

  // ✅ Métodos principales
  generatePolicy(): void {
    this.policyGenerationForm.libTbCallSubmit?.();

    if (this.policyGenerationForm.form?.valid) {
      this.policyRequest = { ...this.policyGenerationForm.form.value };
      this.isProcessing = true;
      this.clearAlerts();

      this.showAlert({
        type: 'info',
        title: 'Generando Póliza',
        description: 'Procesando la información y generando la póliza automáticamente...',
        icon: 'fal fa-spinner-third fa-spin',
        sticky: true,
      });

      // Simular procesamiento de generación
      this.simulateGeneration();
    } else {
      this.showAlert({
        type: 'error',
        title: 'Formulario Inválido',
        description: 'Por favor, completa todos los campos requeridos antes de generar la póliza.',
        icon: 'fal fa-exclamation-triangle',
      });
    }
  }

  private simulateGeneration(): void {
    setTimeout(() => {
      try {
        this.generationResult = this.generateMockResult();
        this.isProcessing = false;
        this.clearAlerts();

        this.showAlert({
          type: 'success',
          title: 'Póliza Generada Exitosamente',
          description: `Póliza ${this.generationResult?.policyNumber} ha sido generada correctamente.`,
          icon: 'fal fa-check-circle',
        });

        this.setupBreadcrumb();
      } catch (error) {
        this.isProcessing = false;
        this.clearAlerts();

        this.showAlert({
          type: 'error',
          title: 'Error en la Generación',
          description:
            'Ocurrió un error al generar la póliza. Por favor, verifica los datos e intenta nuevamente.',
          icon: 'fal fa-exclamation-triangle',
        });
      }
    }, 3000); // 3 segundos de simulación
  }

  private generateMockResult(): IPolicyGenerationResult {
    const policyNumber = `POL-${Date.now().toString().slice(-6)}`;
    const currentDate = new Date();
    const validFrom = currentDate.toISOString().split('T')[0];
    const validTo = new Date(
      currentDate.getTime() + this.policyRequest.validityPeriod * 30 * 24 * 60 * 60 * 1000,
    )
      .toISOString()
      .split('T')[0];

    // Calcular prima basada en tipo y cobertura
    const basePremium = this.calculateBasePremium();
    const coverageMultiplier = this.getCoverageMultiplier();
    const premiumAmount = Math.round(basePremium * coverageMultiplier);

    return {
      policyId: `POLICY-${Date.now()}`,
      policyNumber,
      customerInfo: this.policyRequest,
      status: PolicyStatus.ACTIVE,
      premiumAmount,
      deductible: this.calculateDeductible(),
      coverageDetails: MOCK_COVERAGE_DETAILS,
      terms: this.generateTerms(),
      conditions: this.generateConditions(),
      generatedAt: new Date().toISOString(),
      validFrom,
      validTo,
      agentId: 'AGENT-001',
      documentUrl: `https://policies.segurosbolivar.com/${policyNumber}.pdf`,
      qrCode: `QR-${policyNumber}`,
    };
  }

  private calculateBasePremium(): number {
    const baseValue = this.policyRequest.insuredValue * 0.02; // 2% del valor asegurado

    switch (this.policyRequest.policyType) {
      case 'auto':
        return Math.max(baseValue, 500000); // Mínimo 500K
      case 'home':
        return Math.max(baseValue, 300000); // Mínimo 300K
      case 'life':
        return Math.max(baseValue, 800000); // Mínimo 800K
      case 'health':
        return Math.max(baseValue, 1200000); // Mínimo 1.2M
      case 'business':
        return Math.max(baseValue, 2000000); // Mínimo 2M
      default:
        return baseValue;
    }
  }

  private getCoverageMultiplier(): number {
    switch (this.policyRequest.coverageType) {
      case 'basic':
        return 0.8;
      case 'standard':
        return 1.0;
      case 'premium':
        return 1.3;
      case 'comprehensive':
        return 1.6;
      default:
        return 1.0;
    }
  }

  private calculateDeductible(): number {
    return Math.round(this.policyRequest.insuredValue * 0.005); // 0.5% del valor asegurado
  }

  private generateTerms(): string[] {
    return [
      'La póliza tiene una vigencia de ' + this.policyRequest.validityPeriod + ' meses',
      'Los pagos se realizarán con frecuencia ' + this.policyRequest.paymentFrequency,
      'El valor asegurado es de $' + this.formatCurrency(this.policyRequest.insuredValue),
      'La póliza cubre los riesgos especificados en las condiciones generales',
    ];
  }

  private generateConditions(): string[] {
    return [
      'El asegurado debe notificar cualquier siniestro dentro de las 48 horas',
      'La cobertura inicia a partir de la fecha de vigencia especificada',
      'El pago de primas debe estar al día para mantener la cobertura',
      'Se aplican las condiciones generales de Seguros Bolívar',
    ];
  }

  resetForm(): void {
    this.policyGenerationForm.form?.reset();
    this.policyRequest = { ...INITIAL_POLICY_REQUEST };
    this.generationResult = null;
    this.isProcessing = false;
    this.clearAlerts();
    this.setupBreadcrumb();
  }

  startNewPolicy(): void {
    this.resetForm();
  }

  downloadPolicy(): void {
    if (this.generationResult) {
      // Simular descarga
      console.log('Descargando póliza:', this.generationResult.policyNumber);
      alert(`Descarga iniciada para la póliza: ${this.generationResult.policyNumber}`);
    }
  }

  exportResult(): void {
    if (this.generationResult) {
      const dataStr = JSON.stringify(this.generationResult, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

      const exportFileDefaultName = `policy-${this.generationResult.policyNumber}.json`;

      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    }
  }

  // ✅ Métodos auxiliares
  get isFormValid(): boolean {
    return this.policyGenerationForm.form?.valid ?? false;
  }

  get formData(): any {
    return this.policyGenerationForm.form?.value;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    }).format(value);
  }

  getStatusClass(status: PolicyStatus): string {
    switch (status) {
      case PolicyStatus.ACTIVE:
        return 'text-successBase';
      case PolicyStatus.PENDING_APPROVAL:
        return 'text-warningBase';
      case PolicyStatus.INACTIVE:
      case PolicyStatus.CANCELLED:
        return 'text-errorBase';
      default:
        return 'text-grayscaleD100';
    }
  }
}
