import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const nombreAgente: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'step2-agents-container',
  formId: 'nombreAgente',
  custom: {
    name: 'nombreAgente',
    label: 'Nombres',
    placeholder: 'Ingresa los nombres del agente',
  },
  formProps: {
    validators: [],
  },
};
