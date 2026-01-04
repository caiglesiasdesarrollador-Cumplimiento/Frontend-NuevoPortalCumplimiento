import { Validators } from '@angular/forms';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';
import { DOCUMENT_TYPES_OPTIONS } from '../../policy-input.interface';

export const tipoDocumentoTomador: ILibTbDynamicFormConfigType = {
  tbType: 'dropdown',
  containerId: 'step1-tomador-row-container',
  formId: 'tipoDocumentoTomador', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'tipoDocumentoTomador', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Tipo de Documento del Tomador',
    placeholder: 'Seleccione el tipo de documento',
    floatLabel: false, // ✅ CRÍTICO: tema Seguros Bolívar
    options: DOCUMENT_TYPES_OPTIONS,
    class: 'w-full',
    caption: true, // ✅ OBLIGATORIO: Habilitar caption para mostrar errores
    showIconCaption: true, // ✅ Mostrar icono en el caption
    captionText: {
      error: 'El campo es obligatorio', // ✅ Mensaje de error cuando está vacío
    },
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
