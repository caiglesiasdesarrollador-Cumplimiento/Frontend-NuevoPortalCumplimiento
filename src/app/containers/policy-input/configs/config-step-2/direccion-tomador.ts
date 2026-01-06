import { ILibTbDynamicFormConfigType, ILibTbValidatorConfig } from 'tech-block-lib';
import { Validators } from '@angular/forms';

export const direccionTomador: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'step2-general-data-container',
  formId: 'direccionTomador',
  custom: {
    name: 'direccionTomador',
    label: 'Dirección del Tomador',
    placeholder: 'Ingrese la dirección del tomador',
    type: 'text',
    dataQaId: 'direccion-tomador-input',
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'La dirección del tomador es requerida',
        validator: Validators.required,
      },
      {
        name: 'minlength',
        message: 'La dirección debe tener al menos 5 caracteres',
        validator: Validators.minLength(5),
      },
    ] as ILibTbValidatorConfig[],
  },
};
