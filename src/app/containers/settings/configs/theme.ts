import { ILibTbDynamicFormConfigType } from 'tech-block-lib';
import { Validators } from '@angular/forms';

export const theme: ILibTbDynamicFormConfigType = {
  tbType: 'dropdown',
  containerId: 'system-settings-container',
  formId: 'theme',
  custom: {
    name: 'theme',
    label: 'Tema del Sistema',
    placeholder: 'Selecciona un tema',
    options: [
      { label: 'Claro', value: 'light' },
      { label: 'Oscuro', value: 'dark' },
      { label: 'Automático', value: 'auto' },
    ],
    floatLabel: false,
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'El tema es obligatorio',
        validator: Validators.required,
      },
    ],
  },
};
