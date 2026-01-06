import { ILibTbDynamicFormConfigType } from 'tech-block-lib';
import { Validators } from '@angular/forms';

export const fullName: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'basic-info-container',
  formId: 'fullName', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'fullName', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Nombre Completo',
    placeholder: 'Ingresa tu nombre completo',
    floatLabel: false,
    class: 'w-full',
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'El nombre completo es requerido',
        validator: Validators.required,
      },
      {
        name: 'minlength',
        message: 'El nombre debe tener al menos 3 caracteres',
        validator: Validators.minLength(3),
      },
      {
        name: 'maxlength',
        message: 'El nombre no puede superar 100 caracteres',
        validator: Validators.maxLength(100),
      },
      {
        name: 'pattern',
        message: 'Solo se permiten letras, espacios y caracteres especiales',
        validator: Validators.pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/),
      },
    ],
  },
};
