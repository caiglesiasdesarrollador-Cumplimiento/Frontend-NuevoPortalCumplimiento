import { Validators } from '@angular/forms';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const duracionContrato: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'step2-contract-details-container',
  formId: 'duracionContrato', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'duracionContrato', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Duración del Contrato',
    placeholder: 'Ej: 12 meses',
    floatLabel: false, // ✅ CRÍTICO: tema Seguros Bolívar
    class: 'w-full',
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'La duración del contrato es obligatoria',
        validator: Validators.required,
      },
    ],
  },
};
