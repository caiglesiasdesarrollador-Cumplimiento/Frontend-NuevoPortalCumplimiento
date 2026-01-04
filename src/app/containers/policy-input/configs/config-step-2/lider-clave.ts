import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const liderClave: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'step2-agents-container',
  formId: 'liderClave',
  custom: {
    name: 'liderClave',
    label: 'Lider Clave',
    placeholder: 'Ingresa el líder clave',
    required: true,
  },
  formProps: {
    validators: [],
  },
};
