import {
  validatorMaxLength,
  validatorMinLength,
  validatorRequired,
} from '@app/shared/utils/validators';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';
import { DynamicFormComponent } from '../dynamic-form.component';

export const name = (self: DynamicFormComponent): ILibTbDynamicFormConfigType => {
  return {
    tbType: 'input',
    containerId: 'test',
    formId: 'name',
    custom: {
      type: 'text',
      name: 'name',
      label: 'Nombre completo',
      placeholder: 'Nombre completo',
      caption: true,
      autocomplete: 'off',
      showIconCaption: true,
      showHelp: true,
      floatLabel: true,
      icon: 'fal fa-user',
      captionText: {
        help: 'Digite su nombre completo',
        success: 'Nombre completado',
      },
      libTbKeypress: value => {
        console.log(value.target.value);
        console.log(self.toUpperCase(value.target.value));
      },
    },
    formProps: {
      value: 'TEST',
      validators: [validatorRequired(), validatorMinLength(5), validatorMaxLength(15)],
    },
  };
};
