import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const notifications: ILibTbDynamicFormConfigType = {
  tbType: 'switch',
  containerId: 'system-settings-container',
  formId: 'notifications',
  custom: {
    name: 'notifications',
    label: 'Habilitar Notificaciones',
    ngModel: true,
  },
};
