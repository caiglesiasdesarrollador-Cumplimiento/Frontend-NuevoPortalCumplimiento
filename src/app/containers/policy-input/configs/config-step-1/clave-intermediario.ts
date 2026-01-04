import { Validators } from '@angular/forms';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const claveIntermediario: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'step1-product-intermediario-row-container',
  formId: 'claveIntermediario', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'claveIntermediario', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Clave del Intermediario',
    placeholder: 'Ingrese la clave del intermediario',
    floatLabel: false, // ✅ CRÍTICO: tema Seguros Bolívar
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
        message: 'La clave del intermediario es obligatoria',
        validator: Validators.required,
      },
      {
        name: 'minlength',
        message: 'La clave debe tener al menos 3 caracteres',
        validator: Validators.minLength(3),
      },
    ],
  },
};
