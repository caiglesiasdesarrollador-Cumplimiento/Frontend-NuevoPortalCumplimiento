import { Validators } from '@angular/forms';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const localidadMunicipio: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'step2-location-container',
  formId: 'localidadMunicipio', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'localidadMunicipio', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Localidad/Municipio',
    placeholder: 'Ej: Bogotá D.C.',
    floatLabel: false, // ✅ CRÍTICO: tema Seguros Bolívar
    class: 'w-full',
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'La localidad/municipio es obligatorio',
        validator: Validators.required,
      },
    ],
  },
};
