import { ILibTbDynamicForm } from 'tech-block-lib';
import { name } from './configs/name';
import { email } from './configs/email';
import { DynamicFormComponent } from './dynamic-form.component';

export const customForm = (self: DynamicFormComponent): ILibTbDynamicForm => {
  return {
    validateOnSubmit: true,
    // validateSuccess: true,
    class: 'grid grid-cols-1 gap-4',
    configContainers: [
      {
        id: 'test',
        class: 'grid grid-cols-1 gap-4',
        tagName: 'section',
      },
      {
        id: 'test2',
        class: 'grid grid-cols-1 gap-4',
        tagName: 'section',
      },
    ],
    config: [
      {
        htmlContent: `<h2 class="text-center lib-tb-h4-bold text-grayscaleD200">Formulario de ejemplo</h2>`,
      },
      name(self),
      email,
    ],
  };
};
