import { validatorRequired, validatorPattern } from '@shared/utils/validators';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

// ✅ REGLA: Configuración individual por campo en formulario simple
export const email: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'login-form-container', // ✅ ID específico del formulario de login
  formId: 'email',
  custom: {
    type: 'email',
    name: 'email',
    label: 'Correo electrónico',
    placeholder: 'Ingresa tu correo electrónico',
    class: 'mb-4',
    icon: 'fal fa-envelope',
    iconPosition: 'left',
    floatLabel: true,
  },
  formProps: {
    validators: [
      validatorRequired(),
      validatorPattern(
        '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
        'Ingresa un correo electrónico válido',
      ),
    ],
  },
};
