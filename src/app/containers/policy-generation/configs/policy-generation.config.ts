import { ILibTbDynamicForm } from 'tech-block-lib';
import { policyType } from './policy-type';
import { customerDocument } from './customer-document';
import { customerName } from './customer-name';
import { customerEmail } from './customer-email';
import { coverageType } from './coverage-type';
import { insuredValue } from './insured-value';
import { validityPeriod } from './validity-period';
import { paymentFrequency } from './payment-frequency';

/**
 * ✅ APLICANDO PATRÓN CORRECTO: settings
 * ✅ APLICANDO REGLA: Organización por grupos en formularios dinámicos
 * ✅ APLICANDO REGLA: Mobile responsive design
 * ✅ APLICANDO REGLA: Usar clases Tailwind de tech-block-lib
 *
 * Configuración siguiendo patrón de settings:
 * - Wrapper principal: EN HTML del component (max-w-2xl mx-auto px-2 py-4 sm:px-4 sm:py-8)
 * - configContainers: SOLO secciones internas (header, policy-basic-info, customer-info, etc.)
 * - class: 'grid grid-cols-1 gap-6' (solo espaciado interno)
 * - Campos agrupados lógicamente en sus containers correspondientes
 * - Sin duplicación de wrapper
 */
export const policyGenerationConfig = (): ILibTbDynamicForm => {
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
        id: 'policy-basic-info-container',
        tagName: 'section',
        class: 'bg-grayscaleWhite p-6 rounded-lg shadow-sm border border-grayscaleL200 mb-6',
      },
      {
        id: 'customer-info-container',
        tagName: 'section',
        class: 'bg-grayscaleWhite p-6 rounded-lg shadow-sm border border-grayscaleL200 mb-6',
      },
      {
        id: 'coverage-info-container',
        tagName: 'section',
        class: 'bg-grayscaleWhite p-6 rounded-lg shadow-sm border border-grayscaleL200 mb-6',
      },
      {
        id: 'payment-info-container',
        tagName: 'section',
        class: 'bg-grayscaleWhite p-6 rounded-lg shadow-sm border border-grayscaleL200',
      },
    ],
    config: [
      // Header
      {
        containerId: 'header-container',
        htmlContent:
          '<h2 class="lib-tb-h4-bold text-grayscaleBlack">Generación de Pólizas</h2><p class="lib-tb-body-medium text-grayscaleD200 mt-2">Completa la información para generar una nueva póliza automáticamente</p>',
      },

      // Información básica de la póliza
      {
        containerId: 'policy-basic-info-container',
        htmlContent:
          '<h3 class="lib-tb-h6-bold text-grayscaleBlack mb-4">Información Básica de la Póliza</h3>',
      },
      policyType, // containerId: 'policy-basic-info-container'

      // Información del cliente
      {
        containerId: 'customer-info-container',
        htmlContent:
          '<h3 class="lib-tb-h6-bold text-grayscaleBlack mb-4">Información del Cliente</h3>',
      },
      customerDocument, // containerId: 'customer-info-container'
      customerName, // containerId: 'customer-info-container'
      customerEmail, // containerId: 'customer-info-container'

      // Información de cobertura
      {
        containerId: 'coverage-info-container',
        htmlContent:
          '<h3 class="lib-tb-h6-bold text-grayscaleBlack mb-4">Información de Cobertura</h3>',
      },
      coverageType, // containerId: 'coverage-info-container'
      insuredValue, // containerId: 'coverage-info-container'
      validityPeriod, // containerId: 'coverage-info-container'

      // Información de pago
      {
        containerId: 'payment-info-container',
        htmlContent:
          '<h3 class="lib-tb-h6-bold text-grayscaleBlack mb-4">Información de Pago</h3><p class="lib-tb-body-small text-grayscaleD100 mb-4">Selecciona la frecuencia de pago preferida</p>',
      },
      paymentFrequency, // containerId: 'payment-info-container'
    ],
  };
};
