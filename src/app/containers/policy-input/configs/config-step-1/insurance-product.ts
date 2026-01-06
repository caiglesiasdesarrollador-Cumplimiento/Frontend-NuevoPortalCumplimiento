import { Validators } from '@angular/forms';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';
import { INSURANCE_PRODUCTS_OPTIONS } from '../../policy-input.interface';

export const insuranceProduct: ILibTbDynamicFormConfigType = {
  tbType: 'dropdown',
  containerId: 'step1-product-intermediario-row-container',
  formId: 'insuranceProduct', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'insuranceProduct', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Tipo de producto',
    placeholder: 'Seleccione un producto',
    floatLabel: false, // ✅ CRÍTICO: tema Seguros Bolívar
    options: INSURANCE_PRODUCTS_OPTIONS,
    class: 'w-full',
    caption: true, // ✅ OBLIGATORIO: Habilitar caption para mostrar errores
    showIconCaption: true, // ✅ Mostrar icono en el caption
    captionText: {
      error: 'El campo es obligatorio', // ✅ Mensaje de error cuando está vacío
    },
    libTbChange: (event: any) => {
      // Este será manejado por el componente padre
      console.log('Producto seleccionado:', event);
    },
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'El producto de seguro es obligatorio',
        validator: Validators.required,
      },
    ],
  },
};
