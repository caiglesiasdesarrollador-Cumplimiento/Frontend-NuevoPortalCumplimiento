import { ILibTbDynamicForm } from 'tech-block-lib';
import { numeroPoliza } from './numero-poliza';
import { tiposModificacion } from './tipos-modificacion';

// ✅ Configuración principal del paso 1: Seleccionar Póliza y Tipo de Modificación
export const step1PolicyModificationForm = (): ILibTbDynamicForm => {
  return {
    validateOnSubmit: true,
    class: 'grid grid-cols-1 gap-2',
    configContainers: [
      {
        id: 'step1-policy-selection-container',
        tagName: 'section',
        class: 'bg-grayscaleWhite p-6 rounded-lg shadow-sm border border-grayscaleL200',
      },
      {
        id: 'step1-modification-types-container',
        tagName: 'section',
        class: 'bg-grayscaleWhite p-6 rounded-lg shadow-sm border border-grayscaleL200',
      },
    ],
    config: [
      // ✅ Campo número de póliza
      numeroPoliza, // containerId: 'step1-policy-selection-container'

      // ✅ Campo tipos de modificación
      tiposModificacion, // containerId: 'step1-modification-types-container'
    ],
  };
};
