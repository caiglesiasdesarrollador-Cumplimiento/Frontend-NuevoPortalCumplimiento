import { Validators } from '@angular/forms';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const nombreAsegurado: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'mod-nom-general-data-container',
  formId: 'nombreAsegurado', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'nombreAsegurado', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Nombre Asegurado',
    placeholder: 'Ej: Asegurado Principal de Ejemplo Ltda.',
    floatLabel: false, // ✅ CRÍTICO: tema Seguros Bolívar
    class: 'w-full',
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'El nombre del asegurado es obligatorio',
        validator: Validators.required,
      },
      {
        name: 'minlength',
        message: 'El nombre debe tener al menos 3 caracteres',
        validator: Validators.minLength(3),
      },
    ],
  },
};
