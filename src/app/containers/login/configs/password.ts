import { validatorRequired, validatorMinLength } from '@shared/utils/validators';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

// ✅ REGLA: Configuración individual por campo en formulario simple
export const password: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'login-form-container', // ✅ ID específico del formulario de login
  formId: 'password',
  custom: {
    type: 'password',
    name: 'password',
    label: 'Contraseña',
    placeholder: 'Ingresa tu contraseña',
    class: 'mb-4',
    icon: 'fal fa-lock',
    iconPosition: 'left',
    floatLabel: true,
  },
  formProps: {
    validators: [
      validatorRequired(),
      validatorMinLength(6, 'La contraseña debe tener al menos 6 caracteres'),
    ],
  },
};
