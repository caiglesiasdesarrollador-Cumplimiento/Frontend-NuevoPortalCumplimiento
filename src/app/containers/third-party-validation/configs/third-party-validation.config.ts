import { ILibTbDynamicForm } from 'tech-block-lib';
import { entityType } from './entity-type';
import { documentType } from './document-type';
import { documentNumber } from './document-number';
import { firstName } from './first-name';
import { country } from './country';

/**
 * ✅ APLICANDO PATRÓN CORRECTO: settings
 * ✅ APLICANDO REGLA: Organización por grupos en formularios dinámicos
 * ✅ APLICANDO REGLA: Mobile responsive design
 * ✅ APLICANDO REGLA: Usar clases Tailwind de tech-block-lib
 *
 * Configuración siguiendo patrón de settings:
 * - Wrapper principal: EN HTML del component (max-w-2xl mx-auto px-2 py-4 sm:px-4 sm:py-8)
 * - configContainers: SOLO secciones internas (header, basic-info, contact-info)
 * - class: 'grid grid-cols-1 gap-6' (solo espaciado interno)
 * - Campos agrupados lógicamente en sus containers correspondientes
 * - Sin duplicación de wrapper
 */
export const thirdPartyValidationConfig = (): ILibTbDynamicForm => {
  return {
    validateOnSubmit: true,
    class: 'grid grid-cols-1 gap-6', // ✅ Solo espaciado interno como settings
    configContainers: [
      // ✅ SOLO secciones internas (patrón settings)
      {
        id: 'header-container',
        tagName: 'header',
        class: 'text-center mb-6',
      },
      {
        id: 'basic-info-container',
        tagName: 'section',
        class: 'bg-grayscaleWhite p-6 rounded-lg shadow-sm border border-grayscaleL200 mb-6',
      },
      {
        id: 'contact-info-container',
        tagName: 'section',
        class: 'bg-grayscaleWhite p-6 rounded-lg shadow-sm border border-grayscaleL200',
      },
    ],
    config: [
      // Header
      {
        containerId: 'header-container',
        htmlContent:
          '<h2 class="lib-tb-h4-bold text-grayscaleBlack">Validación de Terceros</h2><p class="lib-tb-body-medium text-grayscaleD200 mt-2">Ingresa la información del tercero para validar con APIs externas</p>',
      },

      // Información básica
      {
        containerId: 'basic-info-container',
        htmlContent: '<h3 class="lib-tb-h6-bold text-grayscaleBlack mb-4">Información Básica</h3>',
      },
      entityType, // ✅ Campo importado desde archivo separado
      documentType, // ✅ Campo importado desde archivo separado
      documentNumber, // ✅ Campo importado desde archivo separado
      firstName, // ✅ Campo importado desde archivo separado
      country, // ✅ Campo importado desde archivo separado

      // Información de contacto (simplificada)
      {
        containerId: 'contact-info-container',
        htmlContent:
          '<h3 class="lib-tb-h6-bold text-grayscaleBlack mb-4">Información de Contacto (Opcional)</h3>',
      },
      // Email y teléfono se pueden agregar como archivos separados si se necesitan
    ],
  };
};
