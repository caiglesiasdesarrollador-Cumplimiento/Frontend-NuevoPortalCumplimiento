import { Validators } from '@angular/forms';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const valorContrato: ILibTbDynamicFormConfigType = {
  tbType: 'number',
  containerId: 'step2-contract-details-container',
  formId: 'valorContrato', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'valorContrato', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Valor del Contrato',
    placeholder: 'Ej: 150000000',
    floatLabel: false, // ✅ CRÍTICO: tema Seguros Bolívar
    class: 'w-full',
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'El valor del contrato es obligatorio',
        validator: Validators.required,
      },
      {
        name: 'min',
        message: 'El valor del contrato debe ser mayor a 0',
        validator: Validators.min(1),
      },
    ],
  },
};
