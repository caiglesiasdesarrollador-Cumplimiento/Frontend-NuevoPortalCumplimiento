import { Validators } from '@angular/forms';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const numeroContratoGeneral: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'step2-general-data-container',
  formId: 'numeroContratoGeneral', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'numeroContratoGeneral', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Número de contrato',
    placeholder: 'Ej: CONTRATO-SIM-789',
    floatLabel: false, // ✅ CRÍTICO: tema Seguros Bolívar
    class: 'w-full',
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'El número de contrato es obligatorio',
        validator: Validators.required,
      },
    ],
  },
};
