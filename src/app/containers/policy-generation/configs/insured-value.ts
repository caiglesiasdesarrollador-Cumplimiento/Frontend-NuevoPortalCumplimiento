import { ILibTbDynamicFormConfigType } from 'tech-block-lib';
import { Validators } from '@angular/forms';

export const insuredValue: ILibTbDynamicFormConfigType = {
  tbType: 'number',
  containerId: 'coverage-info-container',
  formId: 'insuredValue',
  custom: {
    name: 'insuredValue',
    label: 'Valor Asegurado (COP)',
    placeholder: 'Ingresa el valor a asegurar',
    floatLabel: false,
    class: 'w-full',
    mode: 'currency',
    currency: 'COP',
    locale: 'es-CO',
    min: 1000000,
    max: 999999999,
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'El valor asegurado es requerido',
        validator: Validators.required,
      },
      {
        name: 'min',
        message: 'El valor mínimo asegurado es $1,000,000 COP',
        validator: Validators.min(1000000),
      },
      {
        name: 'max',
        message: 'El valor máximo asegurado es $999,999,999 COP',
        validator: Validators.max(999999999),
      },
    ],
  },
};
