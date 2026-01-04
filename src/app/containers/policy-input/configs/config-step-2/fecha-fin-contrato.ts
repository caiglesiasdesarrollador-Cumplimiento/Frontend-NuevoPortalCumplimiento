import { Validators } from '@angular/forms';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const fechaFinContrato: ILibTbDynamicFormConfigType = {
  tbType: 'calendar',
  containerId: 'step2-contract-details-container',
  formId: 'fechaFinContrato', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'fechaFinContrato', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Fecha Fin del Contrato',
    placeholder: 'Seleccione la fecha de fin',
    floatLabel: false, // ✅ CRÍTICO: tema Seguros Bolívar
    class: 'w-full',
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'La fecha de fin del contrato es obligatoria',
        validator: Validators.required,
      },
    ],
  },
};
