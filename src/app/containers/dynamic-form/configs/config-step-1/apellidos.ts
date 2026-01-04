import {
  validatorMaxLength,
  validatorMinLength,
  validatorRequired,
} from '@shared/utils/validators';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const apellidos: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'step1-personal-info-container', // ✅ Aplicando regla: containerId específico
  formId: 'apellidos',
  custom: {
    type: 'text',
    name: 'apellidos',
    label: 'Apellidos',
    placeholder: 'Ingrese sus apellidos',
    caption: true,
    autocomplete: 'off',
    showIconCaption: true,
    showHelp: true,
    floatLabel: true,
    icon: 'fal fa-user-friends',
    iconPosition: 'right',
    captionText: {
      help: 'Digite sus apellidos completos',
      success: 'Apellidos completados',
    },
  },
  formProps: {
    validators: [validatorRequired(), validatorMinLength(2), validatorMaxLength(50)],
  },
};
