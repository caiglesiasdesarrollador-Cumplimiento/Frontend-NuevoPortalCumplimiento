import { ILibTbDynamicFormConfigType } from 'tech-block-lib';
import { Validators } from '@angular/forms';
import { VALIDITY_PERIOD_OPTIONS } from '../policy-generation.interface';

export const validityPeriod: ILibTbDynamicFormConfigType = {
  tbType: 'dropdown',
  containerId: 'coverage-info-container',
  formId: 'validityPeriod',
  custom: {
    name: 'validityPeriod',
    label: 'Período de Vigencia',
    placeholder: 'Selecciona el período de vigencia',
    floatLabel: false,
    options: VALIDITY_PERIOD_OPTIONS,
    optionLabel: 'label',
    optionValue: 'value',
    class: 'w-full',
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'Debe seleccionar un período de vigencia',
        validator: Validators.required,
      },
    ],
  },
};
