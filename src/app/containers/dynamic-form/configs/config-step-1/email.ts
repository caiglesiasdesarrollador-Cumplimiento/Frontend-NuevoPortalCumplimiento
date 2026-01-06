import { validatorRequired } from '@shared/utils/validators';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const email: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'step1-personal-info-container', // ✅ Aplicando regla: containerId específico
  formId: 'email',
  custom: {
    type: 'email',
    name: 'email',
    label: 'Correo electrónico',
    placeholder: 'Ingrese su correo electrónico',
    caption: true,
    autocomplete: 'off',
    showIconCaption: true,
    showHelp: true,
    floatLabel: true,
    icon: 'fal fa-envelope',
    iconPosition: 'right',
    captionText: {
      help: 'Digite su correo electrónico válido',
      success: 'Correo completado',
    },
  },
  formProps: {
    validators: [validatorRequired()],
  },
};
