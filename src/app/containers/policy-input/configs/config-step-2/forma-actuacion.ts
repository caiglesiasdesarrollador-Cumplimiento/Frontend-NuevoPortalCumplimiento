import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const formaActuacion: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'step2-agents-container',
  formId: 'formaActuacion',
  custom: {
    name: 'formaActuacion',
    label: 'Forma Actuación',
    placeholder: 'Ingresa la forma de actuación',
  },
  formProps: {
    validators: [],
  },
};
