import { ILibTbDynamicFormConfigType } from 'tech-block-lib';
import { Validators } from '@angular/forms';

export const dataRetention: ILibTbDynamicFormConfigType = {
  tbType: 'number',
  containerId: 'system-settings-container',
  formId: 'dataRetention',
  custom: {
    name: 'dataRetention',
    label: 'Retención de Datos (días)',
    placeholder: 'Ingresa el número de días',
    min: 30,
    max: 3650,
    floatLabel: false,
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'La retención de datos es obligatoria',
        validator: Validators.required,
      },
      {
        name: 'min',
        message: 'Mínimo 30 días',
        validator: Validators.min(30),
      },
      {
        name: 'max',
        message: 'Máximo 3650 días (10 años)',
        validator: Validators.max(3650),
      },
    ],
  },
};
