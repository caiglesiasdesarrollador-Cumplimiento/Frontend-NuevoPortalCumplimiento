import { ILibTbDynamicFormConfigType } from 'tech-block-lib';
import { Validators } from '@angular/forms';
import { COVERAGE_TYPE_OPTIONS } from '../policy-generation.interface';

export const coverageType: ILibTbDynamicFormConfigType = {
  tbType: 'dropdown',
  containerId: 'coverage-info-container',
  formId: 'coverageType',
  custom: {
    name: 'coverageType',
    label: 'Tipo de Cobertura',
    placeholder: 'Selecciona el tipo de cobertura',
    floatLabel: false,
    options: COVERAGE_TYPE_OPTIONS,
    optionLabel: 'label',
    optionValue: 'value',
    class: 'w-full',
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'Debe seleccionar un tipo de cobertura',
        validator: Validators.required,
      },
    ],
  },
};
