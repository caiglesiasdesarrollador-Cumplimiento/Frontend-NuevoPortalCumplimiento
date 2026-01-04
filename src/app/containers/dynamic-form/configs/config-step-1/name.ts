import {
  validatorMaxLength,
  validatorMinLength,
  validatorRequired,
} from '@shared/utils/validators';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';
import { IDynamicFormComponent } from '../../dynamic-form.interface';

export const name = (self: IDynamicFormComponent): ILibTbDynamicFormConfigType => {
  return {
    tbType: 'input',
    containerId: 'step1-personal-info-container', // ✅ Aplicando regla: containerId específico
    formId: 'name',
    custom: {
      type: 'text',
      name: 'name',
      label: 'Nombres',
      placeholder: 'Ingrese sus nombres',
      caption: true,
      autocomplete: 'off',
      showIconCaption: true,
      showHelp: true,
      floatLabel: true,
      icon: 'fal fa-user',
      iconPosition: 'right',
      captionText: {
        help: 'Digite sus nombres completos',
        success: 'Nombres completados',
      },
      libTbKeypress: value => {
        console.log(value.target.value);
        console.log(self.toUpperCase(value.target.value));
      },
    },
    formProps: {
      value: '',
      validators: [validatorRequired(), validatorMinLength(2), validatorMaxLength(50)],
    },
  };
};
