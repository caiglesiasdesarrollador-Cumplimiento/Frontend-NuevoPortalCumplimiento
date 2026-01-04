import { ILibTbDynamicForm } from 'tech-block-lib';

// ✅ Configuración principal del paso 3 - Solo mostrar resultados
export const step3AnalysisResultsForm = (): ILibTbDynamicForm => {
  return {
    validateOnSubmit: false,
    class: 'min-h-screen bg-grayscaleL400', // ✅ min-h-screen para formularios grandes
    configContainers: [
      {
        id: 'step3-wrapper-container',
        class: 'max-w-4xl mx-auto px-2 py-4 sm:px-4 sm:py-8', // ✅ Mobile responsive para stepper
        tagName: 'div',
      },
      {
        id: 'step3-header-container',
        class: 'text-center mb-4 sm:mb-8', // ✅ Mobile responsive
        tagName: 'header',
      },
      {
        id: 'step3-results-container',
        class:
          'bg-grayscaleWhite p-3 sm:p-6 rounded-lg shadow-sm border border-grayscaleL200 mb-3 sm:mb-6', // ✅ Tech-block-lib colors + responsive
        tagName: 'section',
      },
      {
        id: 'step3-recommendations-container',
        class:
          'bg-grayscaleWhite p-3 sm:p-6 rounded-lg shadow-sm border border-grayscaleL200 mb-3 sm:mb-6', // ✅ Tech-block-lib colors + responsive
        tagName: 'section',
      },
    ],
    config: [
      {
        containerId: 'step3-header-container',
        htmlContent:
          '<h3 class="lib-tb-h5-bold text-grayscaleBlack">Paso 3: Análisis Completado</h3><p class="lib-tb-body-medium text-grayscaleD200 mt-2">Revisa los resultados del análisis financiero con IA</p>',
      },
      {
        containerId: 'step3-results-container',
        htmlContent:
          '<h4 class="lib-tb-h6-bold text-grayscaleBlack mb-4">Resultados del Análisis</h4><div id="analysis-results-placeholder" class="p-6 text-center border border-grayscaleL200 rounded-lg"><i class="fal fa-chart-line text-4xl text-successBase mb-4"></i><p class="lib-tb-body-medium text-grayscaleBlack">Los resultados detallados del análisis financiero se mostrarán aquí</p><p class="lib-tb-body-small text-grayscaleD200 mt-2">Ratios financieros, evaluación de riesgo y calificación crediticia</p></div>',
      },
      {
        containerId: 'step3-recommendations-container',
        htmlContent:
          '<h4 class="lib-tb-h6-bold text-grayscaleBlack mb-4">Recomendaciones de Seguros</h4><div id="recommendations-placeholder" class="p-6 text-center border border-grayscaleL200 rounded-lg"><i class="fal fa-shield-alt text-4xl text-primaryBase mb-4"></i><p class="lib-tb-body-medium text-grayscaleBlack">Recomendaciones personalizadas de seguros empresariales</p><p class="lib-tb-body-small text-grayscaleD200 mt-2">Basadas en el análisis de riesgo y perfil financiero</p></div>',
      },
    ],
  };
};
