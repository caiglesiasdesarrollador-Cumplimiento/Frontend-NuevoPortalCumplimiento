import { Validators } from '@angular/forms';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const numeroDocumentoAsegurado: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'step1-asegurado-row-container',
  formId: 'numeroDocumentoAsegurado', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'numeroDocumentoAsegurado', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Número de Documento del Asegurado',
    placeholder: 'Ej: 900123456-7 o 12345678',
    floatLabel: false, // ✅ CRÍTICO: tema Seguros Bolívar
    class: 'w-full',
    caption: true, // ✅ OBLIGATORIO: Habilitar caption para mostrar errores
    showIconCaption: true, // ✅ Mostrar icono en el caption
    captionText: {
      error: 'El campo es obligatorio', // ✅ Mensaje de error cuando está vacío (se puede personalizar dinámicamente)
    },
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'El número de documento del asegurado es obligatorio',
        validator: Validators.required,
      },
      {
        name: 'minlength',
        message: 'El campo debe tener entre 8 y 10 caracteres',
        validator: Validators.minLength(8),
      },
      {
        name: 'maxlength',
        message: 'El campo debe tener entre 8 y 10 caracteres',
        validator: Validators.maxLength(10),
      },
    ],
  },
};
