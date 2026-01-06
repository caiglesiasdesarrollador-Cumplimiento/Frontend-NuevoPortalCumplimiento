import { ILibTbDynamicFormConfigType, ILibTbValidatorConfig } from 'tech-block-lib';
import { Validators } from '@angular/forms';

export const ciudadTomador: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'step2-general-data-container',
  formId: 'ciudadTomador',
  custom: {
    name: 'ciudadTomador',
    label: 'Ciudad del Tomador',
    placeholder: 'Ingrese la ciudad del tomador',
    type: 'text',
    dataQaId: 'ciudad-tomador-input',
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'La ciudad del tomador es requerida',
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
