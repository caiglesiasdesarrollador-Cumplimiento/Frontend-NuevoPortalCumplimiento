import { ILibTbDynamicFormConfigType } from 'tech-block-lib';
import { Validators } from '@angular/forms';

export const sessionTimeout: ILibTbDynamicFormConfigType = {
  tbType: 'dropdown',
  containerId: 'security-settings-container',
  formId: 'sessionTimeout',
  custom: {
    name: 'sessionTimeout',
    label: 'Tiempo de Sesión (minutos)',
    placeholder: 'Selecciona el tiempo límite',
    options: [
      { label: '15 minutos', value: '15' },
      { label: '30 minutos', value: '30' },
      { label: '1 hora', value: '60' },
      { label: '2 horas', value: '120' },
      { label: '4 horas', value: '240' },
    ],
    floatLabel: false,
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'El tiempo de sesión es obligatorio',
        validator: Validators.required,
      },
    ],
  },
};
