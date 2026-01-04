import { Validators } from '@angular/forms';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const numeroContrato: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'mod-nom-general-data-container',
  formId: 'numeroContrato', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'numeroContrato', // ✅ OBLIGATORIO: Debe coincidir con formId
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
      {
        name: 'minlength',
        message: 'El número de contrato debe tener al menos 5 caracteres',
        validator: Validators.minLength(5),
      },
    ],
  },
};
