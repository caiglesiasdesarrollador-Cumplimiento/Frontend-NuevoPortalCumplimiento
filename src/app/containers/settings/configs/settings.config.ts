import { ILibTbDynamicForm } from 'tech-block-lib';
import { theme } from './theme';
import { language } from './language';
import { notifications } from './notifications';
import { dataRetention } from './data-retention';
import { sessionTimeout } from './session-timeout';
import { defaultCurrency } from './default-currency';

export const settingsConfig = (): ILibTbDynamicForm => {
  return {
    validateOnSubmit: true,
    class: 'grid grid-cols-1 gap-6',
    configContainers: [
      {
        id: 'header-container',
        tagName: 'header',
        class: 'text-center mb-6',
      },
      {
        id: 'system-settings-container',
        tagName: 'section',
        class: 'bg-grayscaleWhite p-6 rounded-lg shadow-sm border border-grayscaleL200 mb-6',
      },
      {
        id: 'user-preferences-container',
        tagName: 'section',
        class: 'bg-grayscaleWhite p-6 rounded-lg shadow-sm border border-grayscaleL200 mb-6',
      },
      {
        id: 'security-settings-container',
        tagName: 'section',
        class: 'bg-grayscaleWhite p-6 rounded-lg shadow-sm border border-grayscaleL200',
      },
    ],
    config: [
      // Header
      {
        containerId: 'header-container',
        htmlContent:
          '<h2 class="lib-tb-h4-bold text-grayscaleBlack">Configuración del Sistema</h2><p class="lib-tb-body-medium text-grayscaleD200 mt-2">Personaliza las configuraciones según tus necesidades</p>',
      },

      // Configuraciones del Sistema
      {
        containerId: 'system-settings-container',
        htmlContent:
          '<h3 class="lib-tb-h6-bold text-grayscaleBlack mb-4">Configuraciones del Sistema</h3>',
      },
      theme,
      language,
      notifications,
      dataRetention,

      // Preferencias de Usuario
      {
        containerId: 'user-preferences-container',
        htmlContent:
          '<h3 class="lib-tb-h6-bold text-grayscaleBlack mb-4">Preferencias de Usuario</h3>',
      },
      defaultCurrency,

      // Configuraciones de Seguridad
      {
        containerId: 'security-settings-container',
        htmlContent:
          '<h3 class="lib-tb-h6-bold text-grayscaleBlack mb-4">Configuraciones de Seguridad</h3>',
      },
      sessionTimeout,
    ],
  };
};
