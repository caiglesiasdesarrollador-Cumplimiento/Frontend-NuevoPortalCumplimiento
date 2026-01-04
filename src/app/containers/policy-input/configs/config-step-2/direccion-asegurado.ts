import { ILibTbDynamicFormConfigType, ILibTbValidatorConfig } from 'tech-block-lib';
import { Validators } from '@angular/forms';

export const direccionAsegurado: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'step2-general-data-container',
  formId: 'direccionAsegurado',
  custom: {
    name: 'direccionAsegurado',
    label: 'Dirección del Asegurado',
    placeholder: 'Ingrese la dirección del asegurado',
    type: 'text',
    dataQaId: 'direccion-asegurado-input',
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'La dirección del asegurado es requerida',
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
