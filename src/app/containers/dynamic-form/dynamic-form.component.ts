import { Component, ViewEncapsulation } from '@angular/core';
import { ILibTbButton, ILibTbDynamicForm, ILibTbInputText } from 'tech-block-lib';
import { customForm } from './dynamic-form.config';
import { NotificationService } from '@app/shared/components/notification/notification.service';
import { configNotification } from '@app/shared/components/notification/notification.config';
import { fadeAnimation } from '@app/shared/utils/animations';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  animations: [fadeAnimation],
  encapsulation: ViewEncapsulation.None,
})
export class DynamicFormComponent {
  customForm: ILibTbDynamicForm = {
    ...customForm(this),
    libTbUpdated: form => {
      console.log('Updated', form);
      form.get('name')?.valueChanges.subscribe(value => {
        console.log('Value changes', value);
        form.get('name')?.setValue(value.toUpperCase(), { emitEvent: false });
      });
    },
  };

  btnSubmit: ILibTbButton = {
    class: 'custom_btn mt-4',
    label: 'Enviar',
    libTbClick: () => {
      this.submitForm();
    },
  };

  constructor(private notificationService: NotificationService) {
    setTimeout(() => {
      const inputName = this.customForm.config?.find(c => c.custom?.name === 'name');
      if (inputName) {
        (inputName.custom as ILibTbInputText).icon = 'fal fa-users';
      }
    }, 2000);
  }

  submitForm() {
    this.customForm.libTbCallSubmit?.();

    this.notificationService.show({
      ...configNotification({
        title: 'Notificación',
        message: this.customForm.form?.valid ? 'Formulario válido' : 'Formulario inválido',
        error: !this.customForm.form?.valid,
      }),
    });
  }

  toUpperCase(value: string): string {
    this.customForm.form?.get('name')?.setValue(value.toUpperCase(), { emitEvent: false });
    return value.toUpperCase();
  }
}
