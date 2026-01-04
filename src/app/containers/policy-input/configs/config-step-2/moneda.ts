import { Validators } from '@angular/forms';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const moneda: ILibTbDynamicFormConfigType = {
  tbType: 'dropdown',
  containerId: 'step2-general-data-container',
  formId: 'moneda', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'moneda', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Moneda',
    placeholder: 'Seleccione la moneda',
    floatLabel: false, // ✅ CRÍTICO: tema Seguros Bolívar
    options: [
      { label: 'COP', value: 'COP' },
      { label: 'USD', value: 'USD' },
      { label: 'EUR', value: 'EUR' },
    ],
    class: 'w-full',
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'La moneda es obligatoria',
        validator: Validators.required,
      },
    ],
  },
};
