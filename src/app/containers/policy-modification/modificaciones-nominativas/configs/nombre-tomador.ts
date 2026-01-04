import { Validators } from '@angular/forms';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const nombreTomador: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'mod-nom-general-data-container',
  formId: 'nombreTomador', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'nombreTomador', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Nombre del Tomador',
    placeholder: 'Ej: Empresa Tomadora Simulada S.A.S.',
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
