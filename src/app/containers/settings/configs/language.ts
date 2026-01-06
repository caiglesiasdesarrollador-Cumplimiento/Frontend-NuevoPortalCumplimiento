import { ILibTbDynamicFormConfigType } from 'tech-block-lib';
import { Validators } from '@angular/forms';

export const language: ILibTbDynamicFormConfigType = {
  tbType: 'dropdown',
  containerId: 'system-settings-container',
  formId: 'language',
  custom: {
    name: 'language',
    label: 'Idioma del Sistema',
    placeholder: 'Selecciona un idioma',
    options: [
      { label: 'Español', value: 'es' },
      { label: 'Inglés', value: 'en' },
      { label: 'Portugués', value: 'pt' },
    ],
    floatLabel: false,
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'El idioma es obligatorio',
        validator: Validators.required,
      },
    ],
  },
};
