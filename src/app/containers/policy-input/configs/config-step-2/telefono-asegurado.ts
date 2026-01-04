import { ILibTbDynamicFormConfigType, ILibTbValidatorConfig } from 'tech-block-lib';
import { Validators } from '@angular/forms';

export const telefonoAsegurado: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'step2-general-data-container',
  formId: 'telefonoAsegurado',
  custom: {
    name: 'telefonoAsegurado',
    label: 'Teléfono del Asegurado',
    placeholder: 'Ingrese el teléfono del asegurado',
    type: 'tel',
    dataQaId: 'telefono-asegurado-input',
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'El teléfono del asegurado es requerido',
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
