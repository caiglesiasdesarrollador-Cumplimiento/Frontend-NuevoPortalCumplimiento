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
    floatLabel: false, // ✅ Seguros Bolívar theme
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
        message: 'El número debe tener al menos 3 caracteres',
        validator: Validators.minLength(3),
      },
    ],
  },
};
