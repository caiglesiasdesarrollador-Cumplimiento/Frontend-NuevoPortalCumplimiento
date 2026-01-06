import { ILibTbDynamicFormConfigType, ILibTbValidatorConfig } from 'tech-block-lib';
import { Validators } from '@angular/forms';

export const ciudadAsegurado: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'step2-general-data-container',
  formId: 'ciudadAsegurado',
  custom: {
    name: 'ciudadAsegurado',
    label: 'Ciudad del Asegurado',
    placeholder: 'Ingrese la ciudad del asegurado',
    type: 'text',
    dataQaId: 'ciudad-asegurado-input',
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'La ciudad del asegurado es requerida',
        validator: Validators.required,
      },
      {
        name: 'minlength',
        message: 'La ciudad debe tener al menos 2 caracteres',
        validator: Validators.minLength(2),
      },
    ] as ILibTbValidatorConfig[],
  },
};
