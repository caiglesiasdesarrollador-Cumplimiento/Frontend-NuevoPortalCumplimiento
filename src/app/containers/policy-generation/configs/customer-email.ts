import { ILibTbDynamicFormConfigType } from 'tech-block-lib';
import { Validators } from '@angular/forms';

export const customerEmail: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'customer-info-container',
  formId: 'customerEmail',
  custom: {
    name: 'customerEmail',
    label: 'Correo Electrónico',
    placeholder: 'Ingresa el correo del cliente',
    floatLabel: false,
    class: 'w-full',
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'El correo electrónico es requerido',
        validator: Validators.required,
      },
      {
        name: 'email',
        message: 'Ingresa un correo electrónico válido',
        validator: Validators.email,
      },
    ],
  },
};
