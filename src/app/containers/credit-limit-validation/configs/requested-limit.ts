import { ILibTbDynamicFormConfigType } from 'tech-block-lib';
import { Validators } from '@angular/forms';

export const requestedLimit: ILibTbDynamicFormConfigType = {
  tbType: 'number',
  containerId: 'financial-info-container',
  formId: 'requestedLimit', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'requestedLimit', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Límite Solicitado (COP)',
    placeholder: 'Ingresa el límite solicitado',
    floatLabel: false,
    class: 'w-full',
    mode: 'currency',
    currency: 'COP',
    locale: 'es-CO',
    min: 1000000,
    max: 500000000,
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'El límite solicitado es requerido',
        validator: Validators.required,
      },
      {
        name: 'min',
        message: 'El límite mínimo es $1,000,000 COP',
        validator: Validators.min(1000000),
      },
      {
        name: 'max',
        message: 'El límite máximo es $500,000,000 COP',
        validator: Validators.max(500000000),
      },
    ],
  },
};
