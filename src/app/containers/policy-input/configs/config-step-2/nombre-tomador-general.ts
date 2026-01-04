import { Validators } from '@angular/forms';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const nombreTomadorGeneral: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'step2-general-data-container',
  formId: 'nombreTomadorGeneral', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'nombreTomadorGeneral', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Nombre del Tomador',
    placeholder: 'Ej: Constructora ABC S.A.S',
    floatLabel: false, // ✅ CRÍTICO: tema Seguros Bolívar
    class: 'w-full',
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'El nombre del tomador es obligatorio',
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
