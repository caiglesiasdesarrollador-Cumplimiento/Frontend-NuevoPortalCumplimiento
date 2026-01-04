import { Validators } from '@angular/forms';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const numeroContragarantia: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'step2-general-data-container',
  formId: 'numeroContragarantia', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'numeroContragarantia', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Número de contragarantía',
    placeholder: 'Ingrese el número de contragarantía',
    floatLabel: false, // ✅ CRÍTICO: tema Seguros Bolívar
    maxLength: 50,
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'El número de contragarantía es obligatorio',
        validator: Validators.required,
      },
      {
        name: 'minLength',
        message: 'El número de contragarantía debe tener al menos 3 caracteres',
        validator: Validators.minLength(3),
      },
    ],
  },
};
