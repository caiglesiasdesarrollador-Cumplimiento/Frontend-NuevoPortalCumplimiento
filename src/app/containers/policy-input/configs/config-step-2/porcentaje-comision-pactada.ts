import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const porcentajeComisionPactada: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'step2-agents-container',
  formId: 'porcentajeComisionPactada',
  custom: {
    name: 'porcentajeComisionPactada',
    label: 'Porc. Comisión Pactada',
    placeholder: 'Ingresa el porcentaje de comisión',
  },
  formProps: {
    validators: [],
  },
};
