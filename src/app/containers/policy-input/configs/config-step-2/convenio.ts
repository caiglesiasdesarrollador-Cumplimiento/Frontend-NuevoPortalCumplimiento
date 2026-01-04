import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const convenio: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'step2-agents-container',
  formId: 'convenio',
  custom: {
    name: 'convenio',
    label: 'Convenio',
    placeholder: 'Ingresa el convenio',
  },
  formProps: {
    validators: [],
  },
};
