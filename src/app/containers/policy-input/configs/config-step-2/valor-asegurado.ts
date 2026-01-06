import { Validators } from '@angular/forms';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const valorAsegurado: ILibTbDynamicFormConfigType = {
  tbType: 'number',
  containerId: 'step2-financial-info-container',
  formId: 'valorAsegurado', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'valorAsegurado', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Valor Asegurado (COP)',
    placeholder: 'Ej: 500000000',
    floatLabel: false, // ✅ CRÍTICO: tema Seguros Bolívar
    currency: 'COP',
    minFractionDigits: 0,
    maxFractionDigits: 0,
    class: 'w-full',
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'El valor asegurado es obligatorio',
        validator: Validators.required,
      },
      {
        name: 'min',
        message: 'El valor asegurado debe ser mayor a cero',
        validator: Validators.min(1),
      },
    ],
  },
};
