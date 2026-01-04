import { ILibTbDynamicFormConfigType } from 'tech-block-lib';
import { Validators } from '@angular/forms';
import { COUNTRIES } from '../third-party-validation.interface';

export const country: ILibTbDynamicFormConfigType = {
  tbType: 'dropdown',
  containerId: 'basic-info-container',
  formId: 'country', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'country', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'País',
    placeholder: 'Selecciona el país',
    floatLabel: false, // ✅ Seguros Bolívar theme
    options: COUNTRIES,
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'Debe seleccionar un país',
        validator: Validators.required,
      },
    ],
  },
};
