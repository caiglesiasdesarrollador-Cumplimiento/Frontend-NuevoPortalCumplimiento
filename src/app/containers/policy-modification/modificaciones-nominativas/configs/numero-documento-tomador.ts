import { Validators } from '@angular/forms';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const numeroDocumentoTomador: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'mod-nom-general-data-container',
  formId: 'numeroDocumentoTomador', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'numeroDocumentoTomador', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Número del Documento tomador',
    placeholder: 'Ej: 900.123.456-7',
    floatLabel: false, // ✅ CRÍTICO: tema Seguros Bolívar
    class: 'w-full',
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'El número de documento del tomador es obligatorio',
        validator: Validators.required,
      },
      {
        name: 'minlength',
        message: 'El número de documento debe tener al menos 6 caracteres',
        validator: Validators.minLength(6),
      },
    ],
  },
};
