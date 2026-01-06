import { Validators } from '@angular/forms';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const tipoDocumentoTomadorGeneral: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'step2-general-data-container',
  formId: 'tipoDocumentoTomadorGeneral', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'tipoDocumentoTomadorGeneral', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Tipo de Documento Tomador',
    placeholder: 'Ej: NIT',
    floatLabel: false, // ✅ CRÍTICO: tema Seguros Bolívar
    class: 'w-full',
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'El tipo de documento del tomador es obligatorio',
        validator: Validators.required,
      },
    ],
  },
};
