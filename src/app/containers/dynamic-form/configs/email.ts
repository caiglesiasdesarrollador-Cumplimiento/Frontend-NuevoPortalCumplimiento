import { validatorRequired } from '@app/shared/utils/validators';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const email: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'test',
  custom: {
    type: 'text',
    name: 'email',
    label: 'Correo electronico',
    placeholder: 'Correo electronico',
    caption: true,
    autocomplete: 'off',
    showIconCaption: true,
    showHelp: true,
    floatLabel: true,
    icon: 'fa-solid fa-user',
    captionText: {
      help: 'Digite su correo electronico',
      success: 'Correo completado',
    },
  },
  formProps: {
    validators: [validatorRequired()],
  },
};
