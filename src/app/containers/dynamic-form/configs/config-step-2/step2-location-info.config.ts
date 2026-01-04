import { ILibTbDynamicForm } from 'tech-block-lib';
import { pais } from './pais';
import { ciudades } from './ciudades';

/**
 * ✅ APLICANDO REGLA: Estructura para formularios dinámicos con stepper
 * ✅ APLICANDO REGLA: Organización por grupos en formularios dinámicos (MOBILE RESPONSIVE)
 * ✅ APLICANDO REGLA: Integración de Stepper con Formularios Dinámicos
 * ✅ MOBILE: Responsive design mobile-first
 *
 * Configuración del Paso 2: Información de Ubicación - Mobile responsive
 * - Container wrapper: Mobile responsive (px-2 py-4 sm:px-4 sm:py-6)
 * - Secciones: Padding responsive (p-3 sm:p-6)
 * - Márgenes: Responsive (mb-3 sm:mb-6, mb-4 sm:mb-8)
 * - Estructura jerárquica con todos los containers
 * - Separación lógica por grupos temáticos
 * - IDs específicos del paso para evitar colisiones
 * - max-w-2xl para formularios estándar del stepper
 * - Altura mínima para el contenido del paso
 */
export const step2LocationInfoForm = (): ILibTbDynamicForm => {
  return {
    validateOnSubmit: false,
    class: 'min-h-[400px]', // Altura mínima para el paso
    configContainers: [
      {
        id: 'step2-wrapper-container',
        class: 'max-w-2xl mx-auto px-2 py-4 sm:px-4 sm:py-6', // ✅ Mobile responsive
        tagName: 'div',
      },
      {
        id: 'step2-header-container',
        class: 'text-center mb-4 sm:mb-8', // ✅ Mobile responsive
        tagName: 'header',
      },
      {
        id: 'step2-location-info-container',
        class:
          'bg-grayscaleWhite p-3 sm:p-6 rounded-lg shadow-sm border border-grayscaleL200 mb-3 sm:mb-6', // ✅ Mobile responsive
        tagName: 'section',
      },
    ],
    config: [
      {
        containerId: 'step2-wrapper-container',
        htmlContent: `<!-- Container del paso 2 centrado responsive -->`,
      },
      {
        containerId: 'step2-header-container',
        htmlContent: `<h3 class="lib-tb-h5-bold text-grayscaleBlack">Paso 2: Información de Ubicación</h3>
                      <p class="lib-tb-body-medium text-grayscaleD200 mt-2">Seleccione su país y ciudades de interés</p>`,
      },
      {
        containerId: 'step2-location-info-container',
        htmlContent: `<h4 class="lib-tb-h6-bold text-grayscaleBlack mb-3 sm:mb-4">Ubicación geográfica</h4>`,
      },
      pais,
      ciudades,
    ],
  };
};
