import { ILibTbDynamicFormConfigType, ILibTbValidatorConfig } from 'tech-block-lib';
import { Validators } from '@angular/forms';

export const emailTomador: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'step2-general-data-container',
  formId: 'emailTomador',
  custom: {
    name: 'emailTomador',
    label: 'E-mail del Tomador',
    placeholder: 'Ingrese el e-mail del tomador',
    type: 'email',
    dataQaId: 'email-tomador-input',
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'El e-mail del tomador es requerido',
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
