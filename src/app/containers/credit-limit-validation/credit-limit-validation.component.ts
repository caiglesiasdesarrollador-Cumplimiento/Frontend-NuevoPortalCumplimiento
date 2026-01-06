import { Component, OnInit } from '@angular/core';
import {
  ILibTbButton,
  ILibTbAlert,
  ILibTbAlertMessage,
  ILibTbDynamicForm,
  ILibTbBreadcrumb,
} from 'tech-block-lib';
import { BehaviorSubject } from 'rxjs';
import {
  ICreditLimitRequest,
  ICreditLimitResult,
  ValidationStatus,
  INITIAL_CREDIT_LIMIT_REQUEST,
} from './credit-limit-validation.interface';
import { creditLimitValidationConfig } from './configs/credit-limit-validation.config';
import { BreadcrumbService, BreadcrumbItem } from '../../shared/services/breadcrumb.service';

/**
 * ✅ APLICANDO PATRÓN CORRECTO: settings
 * ✅ APLICANDO REGLA: No usar ChangeDetectionStrategy.OnPush para formularios dinámicos
 * ✅ APLICANDO REGLA: Estructura para formularios dinámicos simples
 */
@Component({
  standalone: false,
  selector: 'app-credit-limit-validation',
  templateUrl: './credit-limit-validation.component.html',
  styleUrls: ['./credit-limit-validation.component.scss'],
})
export class CreditLimitValidationComponent implements OnInit {
  // ✅ Estados principales
  creditRequest: ICreditLimitRequest = { ...INITIAL_CREDIT_LIMIT_REQUEST };
  validationResult: ICreditLimitResult | null = null;

  // ✅ Estados reactivos (patrón settings)
  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  private readonly alertsSubject = new BehaviorSubject<ILibTbAlertMessage[]>([]);

  loading$ = this.loadingSubject.asObservable();
  alerts$ = this.alertsSubject.asObservable();

  // ✅ Configuración de breadcrumb
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
        label: 'Validación de Límite de Crédito',
        icon: 'fal fa-credit-card',
      },
    ];

    this.breadcrumbService.setBreadcrumb(breadcrumbItems);
    this.breadcrumbConfig.items = breadcrumbItems.map(item => ({
      label: item.label,
      icon: item.icon,
      routerLink: item.routerLink?.join('/'),
    }));
  }

  // ✅ FORMULARIO DINÁMICO: Config importada desde archivo separado (propiedad fija como settings)
  dynamicForm: ILibTbDynamicForm = creditLimitValidationConfig();

  // ✅ Configuración de alertas para diferentes estados
  alertConfig: ILibTbAlert = {
    float: false,
    alerts: [],
  };

  // ✅ Loading state flag
  get isLoading(): boolean {
    return this.loadingSubject.value;
  }

  // ✅ BOTONES DE ACCIÓN usando propiedades nativas de tech-block-lib (patrón settings)
  btnValidate: ILibTbButton = {
    label: 'Validar Límite de Crédito',
    icon: 'fal fa-calculator',
    iconPosition: 'right',
    styleBtn: 'fill',
    typeBtn: 'primary',
    libTbClick: () => this.validateCreditLimit(),
  };

  btnReset: ILibTbButton = {
    label: 'Limpiar Formulario',
    icon: 'fal fa-redo',
    iconPosition: 'left',
    styleBtn: 'stroke',
    typeBtn: 'secondary',
    libTbClick: () => this.resetForm(),
  };

  // ✅ Lógica de validación de límite de crédito
  validateCreditLimit(): void {
    this.dynamicForm.libTbCallSubmit?.();

    if (this.dynamicForm.form?.valid) {
      this.creditRequest = { ...this.dynamicForm.form.value };
      this.startValidation();
    } else {
      this.showAlert(
        'error',
        'Por favor completa todos los campos requeridos',
        'fal fa-exclamation-circle',
      );
    }
  }

  private startValidation(): void {
    this.loadingSubject.next(true);
    this.validationResult = null;

    // Simular procesamiento de validación
    this.simulateValidation();
  }

  private simulateValidation(): void {
    setTimeout(() => {
      this.validationResult = this.generateMockResult();
      this.loadingSubject.next(false);
      this.showResultAlert();
    }, 3000);
  }

  private generateMockResult(): ICreditLimitResult {
    const riskScore = Math.floor(Math.random() * 400) + 600;
    const creditScore = Math.floor(Math.random() * 300) + 650;
    const debtToIncomeRatio = Math.random() * 0.5;

    let status: ValidationStatus;
    let approvedLimit: number;

    if (riskScore >= 800 && creditScore >= 750) {
      status = ValidationStatus.APPROVED;
      approvedLimit = this.creditRequest.requestedLimit;
    } else if (riskScore >= 700 && creditScore >= 700) {
      status = ValidationStatus.APPROVED;
      approvedLimit = this.creditRequest.requestedLimit * 0.8;
    } else {
      status = ValidationStatus.REJECTED;
      approvedLimit = 0;
    }

    return {
      requestId: `CL-${Date.now()}`,
      customerId: `CUST-${this.creditRequest.documentNumber}`,
      customerInfo: this.creditRequest,
      status,
      approvedLimit,
      interestRate: status === ValidationStatus.APPROVED ? 15.5 : 18.2,
      riskScore,
      riskLevel: riskScore >= 800 ? 'low' : riskScore >= 700 ? 'medium' : 'high',
      creditScore,
      debtToIncomeRatio,
      paymentCapacity: this.creditRequest.monthlyIncome * 0.4,
      recommendations: ['Excelente perfil crediticio'],
      warnings: ['Resultado válido por 30 días'],
      processedAt: new Date().toISOString(),
      processedBy: 'Sistema Automatizado',
      reviewRequired: false,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    };
  }

  resetForm(): void {
    this.dynamicForm.form?.reset();
    this.creditRequest = { ...INITIAL_CREDIT_LIMIT_REQUEST };
    this.validationResult = null;
    this.clearAlerts();
  }

  // ✅ Helpers para alertas (patrón settings)
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

  private showResultAlert(): void {
    if (!this.validationResult) return;

    switch (this.validationResult.status) {
      case ValidationStatus.APPROVED:
        this.showAlert(
          'success',
          `Límite aprobado: ${this.formatCurrency(this.validationResult.approvedLimit)}`,
          'fal fa-check-circle',
        );
        break;
      case ValidationStatus.REJECTED:
        this.showAlert(
          'error',
          'Solicitud rechazada. Revisa los requisitos.',
          'fal fa-times-circle',
        );
        break;
    }
  }

  private clearAlerts(): void {
    this.alertsSubject.next([]);
    this.alertConfig.alerts = [];
  }

  // ✅ Getters para template
  get hasResults(): boolean {
    return this.validationResult !== null && !this.isLoading;
  }

  // ✅ Helpers para template
  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value);
  }
}
