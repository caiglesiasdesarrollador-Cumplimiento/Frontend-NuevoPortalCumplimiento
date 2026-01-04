import { Validators } from '@angular/forms';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const numeroDocumentoTomadorGeneral: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'step2-general-data-container',
  formId: 'numeroDocumentoTomadorGeneral', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'numeroDocumentoTomadorGeneral', // ✅ OBLIGATORIO: Debe coincidir con formId
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
    ],
  },
};
