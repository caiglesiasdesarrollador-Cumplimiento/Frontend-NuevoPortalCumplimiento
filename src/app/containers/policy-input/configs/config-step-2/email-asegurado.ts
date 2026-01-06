import { ILibTbDynamicFormConfigType, ILibTbValidatorConfig } from 'tech-block-lib';
import { Validators } from '@angular/forms';

export const emailAsegurado: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'step2-general-data-container',
  formId: 'emailAsegurado',
  custom: {
    name: 'emailAsegurado',
    label: 'E-mail del Asegurado',
    placeholder: 'Ingrese el e-mail del asegurado',
    type: 'email',
    dataQaId: 'email-asegurado-input',
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'El e-mail del asegurado es requerido',
        validator: Validators.required,
      },
      {
        name: 'email',
        message: 'El e-mail debe tener un formato válido',
        validator: Validators.email,
      },
    ] as ILibTbValidatorConfig[],
  },
};
