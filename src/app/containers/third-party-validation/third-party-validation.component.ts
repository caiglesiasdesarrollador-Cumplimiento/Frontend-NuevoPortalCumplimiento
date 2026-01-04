import { Component, OnInit } from '@angular/core';
import {
  ILibTbButton,
  ILibTbAlert,
  ILibTbAlertMessage,
  ILibTbDynamicForm,
  ILibTbBreadcrumb,
  ILibTbProgressSpinner,
} from 'tech-block-lib';
import { BehaviorSubject } from 'rxjs';
import { IThirdPartyInfo, INITIAL_THIRD_PARTY_STATE } from './third-party-validation.interface';
import { thirdPartyValidationConfig } from './configs/third-party-validation.config';
import { BreadcrumbService, BreadcrumbItem } from '../../shared/services/breadcrumb.service';

/**
 * ✅ APLICANDO PATRÓN CORRECTO: settings
 * ✅ APLICANDO REGLA: No usar ChangeDetectionStrategy.OnPush para formularios dinámicos
 * ✅ APLICANDO REGLA: Estructura para formularios dinámicos simples
 */
@Component({
  standalone: false,
  selector: 'app-third-party-validation',
  templateUrl: './third-party-validation.component.html',
  styleUrls: ['./third-party-validation.component.scss'],
})
export class ThirdPartyValidationComponent implements OnInit {
  // ✅ Estados principales
  currentThirdParty: IThirdPartyInfo = { ...INITIAL_THIRD_PARTY_STATE };
  validationProgress = 0;

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
        label: 'Validación de Terceros',
        icon: 'fal fa-shield-alt',
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
  dynamicForm: ILibTbDynamicForm = thirdPartyValidationConfig();

  // ✅ Configuración de alertas para diferentes estados
  alertConfig: ILibTbAlert = {
    float: false,
    alerts: [],
  };

  // ✅ Loading state flag
  get isLoading(): boolean {
    return this.loadingSubject.value;
  }

  // ✅ Configuración del spinner de progreso
  progressSpinner: ILibTbProgressSpinner = {
    infinite: true,
    strokeWidth: 4,
    style: { height: '60px', width: '60px' },
  };

  // ✅ BOTONES DE ACCIÓN usando propiedades nativas de tech-block-lib (patrón settings)
  btnValidate: ILibTbButton = {
    label: 'Validar Tercero',
    icon: 'fal fa-shield-check',
    iconPosition: 'right',
    styleBtn: 'fill',
    typeBtn: 'primary',
    libTbClick: () => this.validateThirdParty(),
  };

  btnReset: ILibTbButton = {
    label: 'Limpiar Formulario',
    icon: 'fal fa-redo',
    iconPosition: 'left',
    styleBtn: 'stroke',
    typeBtn: 'secondary',
    libTbClick: () => this.resetForm(),
  };

  // ✅ Lógica de validación de terceros
  validateThirdParty(): void {
    this.dynamicForm.libTbCallSubmit?.();

    if (this.dynamicForm.form?.valid) {
      this.currentThirdParty = { ...this.dynamicForm.form.value };
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
    this.validationProgress = 0;

    // Simular procesamiento de validación
    this.simulateValidation();
  }

  private simulateValidation(): void {
    // Simular progreso de validación
    const progressInterval = setInterval(() => {
      this.validationProgress += 20;
      if (this.validationProgress >= 100) {
        clearInterval(progressInterval);
        setTimeout(() => {
          this.loadingSubject.next(false);
          this.showAlert('success', 'Tercero validado exitosamente', 'fal fa-check-circle');
        }, 500);
      }
    }, 600);
  }

  resetForm(): void {
    this.dynamicForm.form?.reset();
    this.currentThirdParty = { ...INITIAL_THIRD_PARTY_STATE };
    this.validationProgress = 0;
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

  private clearAlerts(): void {
    this.alertsSubject.next([]);
    this.alertConfig.alerts = [];
  }

  // ✅ Getters para template
  get hasResults(): boolean {
    return this.validationProgress >= 100 && !this.isLoading;
  }
}
