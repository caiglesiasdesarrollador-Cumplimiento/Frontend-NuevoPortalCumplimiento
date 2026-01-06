import { ILibTbDynamicFormConfigType } from 'tech-block-lib';
import { Validators } from '@angular/forms';

export const customerName: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'customer-info-container',
  formId: 'customerName',
  custom: {
    name: 'customerName',
    label: 'Nombre Completo',
    placeholder: 'Ingresa el nombre completo del cliente',
    floatLabel: false,
    class: 'w-full',
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'El nombre del cliente es requerido',
        validator: Validators.required,
      },
      {
        name: 'minlength',
        message: 'El nombre debe tener al menos 3 caracteres',
        validator: Validators.minLength(3),
      },
      {
        name: 'pattern',
        message: 'Solo se permiten letras y espacios',
        validator: Validators.pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/),
      },
    ],
  },
};
