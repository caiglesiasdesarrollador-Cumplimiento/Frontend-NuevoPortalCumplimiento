import { ILibTbDynamicFormConfigType } from 'tech-block-lib';
import { Validators } from '@angular/forms';
import { PAYMENT_FREQUENCY_OPTIONS } from '../policy-generation.interface';

export const paymentFrequency: ILibTbDynamicFormConfigType = {
  tbType: 'dropdown',
  containerId: 'payment-info-container',
  formId: 'paymentFrequency',
  custom: {
    name: 'paymentFrequency',
    label: 'Frecuencia de Pago',
    placeholder: 'Selecciona la frecuencia de pago',
    floatLabel: false,
    options: PAYMENT_FREQUENCY_OPTIONS,
    optionLabel: 'label',
    optionValue: 'value',
    class: 'w-full',
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'Debe seleccionar una frecuencia de pago',
        validator: Validators.required,
      },
    ],
  },
};
