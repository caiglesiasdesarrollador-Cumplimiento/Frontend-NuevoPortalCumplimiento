import { Validators } from '@angular/forms';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const fechaInicioContrato: ILibTbDynamicFormConfigType = {
  tbType: 'calendar',
  containerId: 'step2-contract-details-container',
  formId: 'fechaInicioContrato', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'fechaInicioContrato', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Fecha Inicio del Contrato',
    placeholder: 'Seleccione la fecha de inicio',
    floatLabel: false, // ✅ CRÍTICO: tema Seguros Bolívar
    class: 'w-full',
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'La fecha de inicio del contrato es obligatoria',
        validator: Validators.required,
      },
    ],
  },
};
