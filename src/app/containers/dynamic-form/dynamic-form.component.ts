import { Component, ViewEncapsulation } from '@angular/core';
import { ILibTbButton, ILibTbDynamicForm, ILibTbStepper } from 'tech-block-lib';
import { step1PersonalInfoForm } from './configs/config-step-1/step1-personal-info.config';
import { step2LocationInfoForm } from './configs/config-step-2/step2-location-info.config';
import { NotificationService } from '@shared/components/notification/notification.service';
import { configNotification } from '@shared/components/notification/notification.config';
import { fadeAnimation } from '@shared/utils/animations';
import { IDynamicFormComponent } from './dynamic-form.interface';

@Component({
  standalone: false,
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  animations: [fadeAnimation],
  encapsulation: ViewEncapsulation.None,
})
export class DynamicFormComponent implements IDynamicFormComponent {
  currentStep = 0;

  // ✅ APLICANDO REGLA: Integración de Stepper con Formularios Dinámicos
  stepperConfig: ILibTbStepper = {
    activeIndex: 0,
    readonly: false,
    type: 'number',
    class: 'mb-6',
    items: [
      {
        label: 'Información Personal',
        icon: 'fal fa-user',
        command: () => {
          this.goToStep(0);
        },
      },
      {
        label: 'Ubicación',
        icon: 'fal fa-map-marker-alt',
        command: () => {
          this.goToStep(1);
        },
      },
    ],
    libTbActiveIndexChange: (index: number) => {
      this.currentStep = index;
    },
  };

  // ✅ APLICANDO REGLA: Un formulario dinámico por paso
  step1Form: ILibTbDynamicForm = {
    ...step1PersonalInfoForm(this),
    libTbUpdated: form => {
      console.log('Paso 1 - Formulario actualizado', form);
      // Suscribirse a cambios en el campo nombres para convertir a mayúsculas
      form.get('name')?.valueChanges.subscribe(value => {
        if (value && typeof value === 'string') {
          form.get('name')?.setValue(value.toUpperCase(), { emitEvent: false });
        }
      });
    },
  };

  // ✅ APLICANDO REGLA: Un formulario dinámico por paso
  step2Form: ILibTbDynamicForm = {
    ...step2LocationInfoForm(),
    libTbUpdated: form => {
      console.log('Paso 2 - Formulario actualizado', form);
    },
  };

  // ✅ OBLIGATORIO: Botones de navegación usando propiedades nativas de tech-block-lib
  btnNext: ILibTbButton = {
    label: 'Siguiente',
    icon: 'fal fa-arrow-right',
    iconPosition: 'right',
    styleBtn: 'fill',
    typeBtn: 'primary',
    libTbClick: () => this.nextStep(),
  };

  btnPrevious: ILibTbButton = {
    label: 'Anterior',
    icon: 'fal fa-arrow-left',
    iconPosition: 'left',
    styleBtn: 'stroke',
    typeBtn: 'secondary',
    libTbClick: () => this.previousStep(),
  };

  btnSubmit: ILibTbButton = {
    label: 'Enviar',
    icon: 'fal fa-paper-plane',
    iconPosition: 'right',
    styleBtn: 'fill',
    typeBtn: 'primary',
    libTbClick: () => this.submitForm(),
  };

  constructor(private readonly notificationService: NotificationService) {}

  toUpperCase(value: string): string {
    return value.toUpperCase();
  }

  // ✅ APLICANDO REGLA: Métodos de navegación del stepper
  goToStep(step: number): void {
    // Validar el paso actual antes de cambiar
    if (step > this.currentStep && !this.validateCurrentStep()) {
      return;
    }

    this.currentStep = step;
    this.stepperConfig.activeIndex = step;
  }

  nextStep(): void {
    if (this.currentStep < 1 && this.validateCurrentStep()) {
      this.currentStep++;
      this.stepperConfig.activeIndex = this.currentStep;
    }
  }

  previousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.stepperConfig.activeIndex = this.currentStep;
    }
  }

  // ✅ APLICANDO REGLA: Validación por paso
  validateCurrentStep(): boolean {
    // Validar el formulario del paso actual
    if (this.currentStep === 0) {
      this.step1Form.libTbCallSubmit?.();
      return this.step1Form.form?.valid ?? false;
    } else if (this.currentStep === 1) {
      this.step2Form.libTbCallSubmit?.();
      return this.step2Form.form?.valid ?? false;
    }
    return true;
  }

  // ✅ APLICANDO REGLA: Envío final combinando datos de todos los pasos
  submitForm(): void {
    // Validar ambos pasos antes de enviar
    this.step1Form.libTbCallSubmit?.();
    this.step2Form.libTbCallSubmit?.();

    const step1Valid = this.step1Form.form?.valid ?? false;
    const step2Valid = this.step2Form.form?.valid ?? false;

    if (step1Valid && step2Valid) {
      const step1Data = this.step1Form.form?.value ?? {};
      const step2Data = this.step2Form.form?.value ?? {};
      const combinedData = { ...step1Data, ...step2Data };

      console.log('Datos completos del formulario:', combinedData);

      this.notificationService.show({
        ...configNotification({
          title: 'Registro exitoso',
          message: `Registro completado para ${combinedData.name} ${combinedData.apellidos}`,
          error: false,
        }),
      });
    } else {
      // Navegar al primer paso con errores
      if (!step1Valid) {
        this.goToStep(0);
      } else if (!step2Valid) {
        this.goToStep(1);
      }

      this.notificationService.show({
        ...configNotification({
          title: 'Error en el formulario',
          message: 'Por favor complete todos los campos requeridos correctamente',
          error: true,
        }),
      });
    }
  }

  // ✅ APLICANDO REGLA: Métodos auxiliares para el template
  get isFirstStep(): boolean {
    return this.currentStep === 0;
  }

  get isLastStep(): boolean {
    return this.currentStep === 1;
  }
}
