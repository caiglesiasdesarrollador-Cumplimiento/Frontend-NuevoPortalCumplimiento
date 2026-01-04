import { Validators } from '@angular/forms';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const numeroDocumentoAsegurado: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'mod-nom-general-data-container',
  formId: 'numeroDocumentoAsegurado', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'numeroDocumentoAsegurado', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Número del Documento Asegurado',
    placeholder: 'Ej: 800.987.654-3',
    floatLabel: false, // ✅ CRÍTICO: tema Seguros Bolívar
    class: 'w-full',
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
        message: 'El número de documento debe tener al menos 6 caracteres',
        validator: Validators.minLength(6),
      },
    ],
  },
};
