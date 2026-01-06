import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const participacion: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'step2-agents-container',
  formId: 'participacion',
  custom: {
    name: 'participacion',
    label: 'Participación',
    placeholder: 'Ingresa el porcentaje de participación',
  },
  formProps: {
    validators: [],
  },
};
