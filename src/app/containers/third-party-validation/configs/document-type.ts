import { ILibTbDynamicFormConfigType } from 'tech-block-lib';
import { Validators } from '@angular/forms';
import { DOCUMENT_TYPES } from '../third-party-validation.interface';

export const documentType: ILibTbDynamicFormConfigType = {
  tbType: 'dropdown',
  containerId: 'basic-info-container',
  formId: 'documentType', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'documentType', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Tipo de Documento',
    placeholder: 'Selecciona el tipo',
    floatLabel: false, // ✅ Seguros Bolívar theme
    options: DOCUMENT_TYPES,
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'Debe seleccionar un tipo de documento',
        validator: Validators.required,
      },
    ],
  },
};
