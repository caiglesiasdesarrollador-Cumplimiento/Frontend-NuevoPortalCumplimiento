import { ILibTbDynamicFormConfigType } from 'tech-block-lib';
import { Validators } from '@angular/forms';
import { CUSTOMER_TYPE_OPTIONS } from '../credit-limit-validation.interface';

export const customerType: ILibTbDynamicFormConfigType = {
  tbType: 'dropdown',
  containerId: 'basic-info-container',
  formId: 'customerType',
  custom: {
    name: 'customerType',
    label: 'Tipo de Cliente',
    placeholder: 'Selecciona el tipo de cliente',
    floatLabel: false,
    options: CUSTOMER_TYPE_OPTIONS,
    class: 'w-full',
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'Debe seleccionar un tipo de cliente',
        validator: Validators.required,
      },
    ],
  },
};
