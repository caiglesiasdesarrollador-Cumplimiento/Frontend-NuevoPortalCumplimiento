import { Validators } from '@angular/forms';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const direccionRiesgo: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'step2-location-container',
  formId: 'direccionRiesgo', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'direccionRiesgo', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Dirección del Riesgo',
    placeholder: 'Ej: Calle Falsa 123',
    floatLabel: false, // ✅ CRÍTICO: tema Seguros Bolívar
    class: 'w-full col-span-2',
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'La dirección del riesgo es obligatoria',
        validator: Validators.required,
      },
    ],
  },
};
