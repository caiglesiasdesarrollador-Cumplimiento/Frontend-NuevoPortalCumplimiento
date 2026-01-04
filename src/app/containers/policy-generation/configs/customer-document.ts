import { ILibTbDynamicFormConfigType } from 'tech-block-lib';
import { Validators } from '@angular/forms';

// ✅ CRÍTICO: formId y name OBLIGATORIOS para formularios dinámicos simples
export const customerDocument: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'customer-info-container',
  formId: 'customerDocument', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'customerDocument', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Documento del Cliente',
    placeholder: 'Ingresa el número de documento',
    floatLabel: false, // ✅ Seguros Bolívar theme
    class: 'w-full',
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'El documento del cliente es requerido',
        validator: Validators.required,
      },
      {
        name: 'minlength',
        message: 'El documento debe tener al menos 8 caracteres',
        validator: Validators.minLength(8),
      },
      {
        name: 'maxlength',
        message: 'El documento no puede superar 15 caracteres',
        validator: Validators.maxLength(15),
      },
      {
        name: 'pattern',
        message: 'Solo se permiten números',
        validator: Validators.pattern(/^[0-9]+$/),
      },
    ],
  },
};
