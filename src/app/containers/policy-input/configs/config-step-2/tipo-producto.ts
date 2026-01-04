import { Validators } from '@angular/forms';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const tipoProducto: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'step2-general-data-container',
  formId: 'tipoProducto', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'tipoProducto', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Tipo de producto',
    placeholder: 'Producto seleccionado en el paso 1',
    floatLabel: false, // ✅ CRÍTICO: tema Seguros Bolívar
    disabled: true, // ✅ Solo lectura usando disabled (compatible con tech-block-lib)
    maxLength: 100,
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'El tipo de producto es obligatorio',
        validator: Validators.required,
      },
    ],
  },
};
