import { ILibTbDynamicFormConfigType } from 'tech-block-lib';
import { Validators } from '@angular/forms';

export const documentNumber: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'basic-info-container',
  formId: 'documentNumber', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'documentNumber', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Número de Documento',
    placeholder: 'Ingresa el número de documento',
    floatLabel: false,
    class: 'w-full',
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'El número de documento es requerido',
        validator: Validators.required,
      },
      {
        name: 'minlength',
        message: 'El número debe tener al menos 6 caracteres',
        validator: Validators.minLength(6),
      },
      {
        name: 'maxlength',
        message: 'El número no puede superar 20 caracteres',
        validator: Validators.maxLength(20),
      },
      {
        name: 'pattern',
        message: 'Solo se permiten números, letras y guiones',
        validator: Validators.pattern(/^[0-9A-Za-z-]+$/),
      },
    ],
  },
};
