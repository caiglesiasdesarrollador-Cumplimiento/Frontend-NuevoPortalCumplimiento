import { ILibTbDynamicFormConfigType, ILibTbValidatorConfig } from 'tech-block-lib';
import { Validators } from '@angular/forms';

export const telefonoTomador: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'step2-general-data-container',
  formId: 'telefonoTomador',
  custom: {
    name: 'telefonoTomador',
    label: 'Teléfono del Tomador',
    placeholder: 'Ingrese el teléfono del tomador',
    type: 'tel',
    dataQaId: 'telefono-tomador-input',
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'El teléfono del tomador es requerido',
        validator: Validators.required,
      },
      {
        name: 'pattern',
        message: 'El teléfono debe contener solo números, +, -, espacios y paréntesis',
        validator: Validators.pattern(/^[0-9+\-\s()]+$/),
      },
    ] as ILibTbValidatorConfig[],
  },
};
