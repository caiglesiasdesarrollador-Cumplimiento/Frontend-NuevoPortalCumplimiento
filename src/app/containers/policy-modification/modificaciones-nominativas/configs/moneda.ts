import { Validators } from '@angular/forms';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const moneda: ILibTbDynamicFormConfigType = {
  tbType: 'dropdown',
  containerId: 'mod-nom-general-data-container',
  formId: 'moneda', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'moneda', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Moneda',
    placeholder: 'Seleccionar moneda',
    floatLabel: false, // ✅ CRÍTICO: tema Seguros Bolívar
    class: 'w-full',
    options: [
      { label: 'Peso Colombiano (COP)', value: 'COP' },
      { label: 'Dólar Americano (USD)', value: 'USD' },
      { label: 'Euro (EUR)', value: 'EUR' },
    ],
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
