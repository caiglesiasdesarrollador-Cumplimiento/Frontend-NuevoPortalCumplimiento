import { ILibTbDynamicForm } from 'tech-block-lib';
import { customerType } from './customer-type';
import { documentType } from './document-type';
import { documentNumber } from './document-number';
import { fullName } from './full-name';
import { monthlyIncome } from './monthly-income';
import { requestedLimit } from './requested-limit';

/**
 * ✅ APLICANDO PATRÓN CORRECTO: settings
 * ✅ APLICANDO REGLA: Organización por grupos en formularios dinámicos
 * ✅ APLICANDO REGLA: Mobile responsive design
 * ✅ APLICANDO REGLA: Usar clases Tailwind de tech-block-lib
 *
 * Configuración siguiendo patrón de settings:
 * - Wrapper principal: EN HTML del component (max-w-2xl mx-auto px-2 py-4 sm:px-4 sm:py-8)
 * - configContainers: SOLO secciones internas (header, basic-info, financial-info)
 * - class: 'grid grid-cols-1 gap-6' (solo espaciado interno)
 * - Campos agrupados lógicamente en sus containers correspondientes
 * - Sin duplicación de wrapper
 */
export const creditLimitValidationConfig = (): ILibTbDynamicForm => {
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
        id: 'financial-info-container',
        tagName: 'section',
        class: 'bg-grayscaleWhite p-6 rounded-lg shadow-sm border border-grayscaleL200',
      },
    ],
    config: [
      // ✅ HEADER - En su container específico
      {
        containerId: 'header-container',
        htmlContent:
          '<h2 class="lib-tb-h4-bold text-grayscaleBlack">Validación de Límite de Crédito</h2><p class="lib-tb-body-medium text-grayscaleD200 mt-2">Ingresa la información del cliente para validar el límite de crédito solicitado</p>',
      },

      // ✅ GRUPO 1: Información básica - Header del grupo
      {
        containerId: 'basic-info-container',
        htmlContent:
          '<h3 class="lib-tb-h6-bold text-grayscaleBlack mb-4">Información Básica del Cliente</h3>',
      },
      // ✅ CAMPOS del grupo básico - En su container específico
      customerType, // containerId: 'basic-info-container'
      documentType, // containerId: 'basic-info-container'
      documentNumber, // containerId: 'basic-info-container'
      fullName, // containerId: 'basic-info-container'

      // ✅ GRUPO 2: Información financiera - Header del grupo
      {
        containerId: 'financial-info-container',
        htmlContent:
          '<h3 class="lib-tb-h6-bold text-grayscaleBlack mb-4">Información Financiera</h3>',
      },
      // ✅ CAMPOS del grupo financiero - En su container específico
      monthlyIncome, // containerId: 'financial-info-container'
      requestedLimit, // containerId: 'financial-info-container'
    ],
  };
};
