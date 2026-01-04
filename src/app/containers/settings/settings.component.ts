import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  ILibTbDynamicForm,
  ILibTbButton,
  ILibTbAlert,
  ILibTbAlertMessage,
  ILibTbBreadcrumb,
} from 'tech-block-lib';
import { BehaviorSubject } from 'rxjs';
import { settingsConfig } from './configs/settings.config';
import { ISettingsFormData } from './settings.interface';
import { BreadcrumbService, BreadcrumbItem } from '../../shared/services/breadcrumb.service';

@Component({
  standalone: false,
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {
  // ✅ OBLIGATORIO: Un solo formulario dinámico
  dynamicForm: ILibTbDynamicForm = settingsConfig();

  // ✅ Estados reactivos
  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  private readonly alertsSubject = new BehaviorSubject<ILibTbAlertMessage[]>([]);

  loading$ = this.loadingSubject.asObservable();
  alerts$ = this.alertsSubject.asObservable();

  // ✅ OBLIGATORIO: Botones de acción usando propiedades nativas de tech-block-lib
  btnSave: ILibTbButton = {
    label: 'Guardar Configuración',
    icon: 'fal fa-save',
    iconPosition: 'right',
    styleBtn: 'fill',
    typeBtn: 'primary',
    libTbClick: () => this.saveSettings(),
  };

  btnReset: ILibTbButton = {
    label: 'Restablecer',
    icon: 'fal fa-redo',
    iconPosition: 'left',
    styleBtn: 'stroke',
    typeBtn: 'secondary',
    libTbClick: () => this.resetSettings(),
  };

  btnLoadDefaults: ILibTbButton = {
    label: 'Valores por Defecto',
    icon: 'fal fa-cog',
    iconPosition: 'left',
    styleBtn: 'text',
    typeBtn: 'tertiary',
    libTbClick: () => this.loadDefaultSettings(),
  };

  // ✅ Configuración de alertas
  alertConfig: ILibTbAlert = {
    float: false,
    alerts: [],
  };

  // ✅ Configuración de breadcrumb
  breadcrumbConfig: ILibTbBreadcrumb = {
    items: [],
  };

  constructor(private readonly breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.setupBreadcrumb();
    this.loadCurrentSettings();

    // Suscribirse a cambios de alertas
    this.alerts$.subscribe(alerts => {
      this.alertConfig.alerts = alerts;
    });

    // Actualizar estado del botón cuando cambie la validez del formulario
    this.dynamicForm.form?.statusChanges.subscribe(() => {
      this.updateButtonStates();
    });
  }

  private updateButtonStates(): void {
    this.btnSave = {
      ...this.btnSave,
      disabled: !this.isFormValid,
    };
  }

  private setupBreadcrumb(): void {
    const breadcrumbItems: BreadcrumbItem[] = [
      {
        label: 'Dashboard',
        icon: 'fal fa-home',
        routerLink: ['/dashboard'],
      },
      {
        label: 'Configuración',
        icon: 'fal fa-cog',
      },
    ];

    this.breadcrumbService.setBreadcrumb(breadcrumbItems);
    this.breadcrumbConfig.items = breadcrumbItems.map(item => ({
      label: item.label,
      icon: item.icon,
      routerLink: item.routerLink?.join('/'),
    }));
  }

  // ✅ Métodos principales
  saveSettings(): void {
    this.dynamicForm.libTbCallSubmit?.();

    if (this.dynamicForm.form?.valid) {
      this.loadingSubject.next(true);

      const formData: ISettingsFormData = this.dynamicForm.form.value;
      console.log('Configuración a guardar:', formData);

      // Simular guardado
      setTimeout(() => {
        this.loadingSubject.next(false);
        this.showAlert({
          type: 'success',
          title: 'Configuración Guardada',
          description: 'La configuración del sistema se ha guardado exitosamente.',
          icon: 'fal fa-check-circle',
        });
      }, 1500);
    } else {
      this.showAlert({
        type: 'error',
        title: 'Error de Validación',
        description: 'Por favor, corrige los errores en el formulario antes de continuar.',
        icon: 'fal fa-exclamation-triangle',
      });
    }
  }

  resetSettings(): void {
    this.dynamicForm.form?.reset();
    this.clearAlerts();
    this.showAlert({
      type: 'info',
      title: 'Formulario Restablecido',
      description: 'Se han limpiado todos los campos del formulario.',
      icon: 'fal fa-info-circle',
    });
  }

  loadDefaultSettings(): void {
    const defaultValues = {
      theme: 'light',
      language: 'es',
      notifications: true,
      dataRetention: 365,
      sessionTimeout: '60',
      defaultCurrency: 'COP',
    };

    this.dynamicForm.form?.patchValue(defaultValues);
    this.showAlert({
      type: 'info',
      title: 'Valores por Defecto Cargados',
      description: 'Se han cargado los valores de configuración recomendados.',
      icon: 'fal fa-magic',
    });
  }

  private loadCurrentSettings(): void {
    // Simular carga de configuración actual
    const currentSettings = {
      theme: 'light',
      language: 'es',
      notifications: true,
      dataRetention: 365,
      sessionTimeout: '60',
      defaultCurrency: 'COP',
    };

    this.dynamicForm.form?.patchValue(currentSettings);

    // Actualizar estado inicial de botones
    setTimeout(() => {
      this.updateButtonStates();
    }, 100);
  }

  // ✅ Métodos auxiliares para alertas
  private showAlert(alert: Omit<ILibTbAlertMessage, 'id'>): void {
    const newAlert: ILibTbAlertMessage = {
      ...alert,
      id: `alert_${Date.now()}`,
    };

    const currentAlerts = this.alertsSubject.value;
    this.alertsSubject.next([...currentAlerts, newAlert]);

    // Auto-ocultar después de 5 segundos
    setTimeout(() => {
      if (newAlert.id) {
        this.hideAlert(newAlert.id);
      }
    }, 5000);
  }

  private hideAlert(alertId: string): void {
    const currentAlerts = this.alertsSubject.value;
    const filteredAlerts = currentAlerts.filter(alert => alert.id !== alertId);
    this.alertsSubject.next(filteredAlerts);
  }

  private clearAlerts(): void {
    this.alertsSubject.next([]);
  }

  // ✅ Getters para el template
  get isFormValid(): boolean {
    return this.dynamicForm.form?.valid ?? false;
  }

  get formData(): ISettingsFormData {
    return this.dynamicForm.form?.value;
  }

  get isLoading(): boolean {
    return this.loadingSubject.value;
  }
}
