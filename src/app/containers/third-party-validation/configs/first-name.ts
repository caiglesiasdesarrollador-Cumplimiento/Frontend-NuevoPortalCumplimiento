import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const firstName: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'basic-info-container',
  formId: 'firstName', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'firstName', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Nombres',
    placeholder: 'Ingresa los nombres',
    floatLabel: false, // ✅ Seguros Bolívar theme
    disabled: false,
  },
  formProps: {
    validators: [],
  },
};
