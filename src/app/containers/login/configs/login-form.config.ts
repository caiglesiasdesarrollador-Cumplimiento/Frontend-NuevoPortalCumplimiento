import { ILibTbDynamicForm } from 'tech-block-lib';
import { email } from './email';
import { password } from './password';

/**
 * ✅ APLICANDO REGLA: Estructura para formularios dinámicos simples
 * ✅ APLICANDO REGLA: Organización por grupos en formularios dinámicos (ACTUALIZADA)
 * ✅ APLICANDO PATRÓN: Mismo diseño que formulario de pasos (stepper)
 * ✅ AJUSTE: Altura automática para formularios pequeños (h-auto en lugar de min-h-screen)
 * ✅ MOBILE: Responsive design mobile-first
 *
 * Formulario de Login - Mobile responsive y altura adecuada
 * - Wrapper principal: h-auto para formularios pequeños
 * - Container interno: Mobile responsive (px-2 py-4 sm:px-4 sm:py-8)
 * - Secciones: Padding responsive (p-3 sm:p-6)
 * - Márgenes: Responsive (mb-3 sm:mb-6)
 * - max-w-md para formularios simples
 * - Estructura jerárquica con todos los containers
 * - Separación lógica por grupos temáticos
 * - Botones fuera del formulario dinámico (como stepper)
 * - Altura automática para evitar que botones queden muy abajo
 */
export const loginFormConfig = (): ILibTbDynamicForm => {
  return {
    validateOnSubmit: true,
    class: 'h-auto bg-grayscaleL400', // ✅ h-auto para formularios pequeños, no min-h-screen
    configContainers: [
      // ✅ Container wrapper principal (mobile responsive)
      {
        id: 'form-wrapper-container',
        class: 'max-w-md mx-auto px-2 py-4 sm:px-4 sm:py-8', // ✅ Mobile responsive
        tagName: 'div',
      },
      {
        id: 'header-container',
        class: 'text-center mb-4 sm:mb-8', // ✅ Mobile responsive
        tagName: 'header',
      },
      {
        id: 'login-form-container',
        class: 'bg-grayscaleWhite p-3 sm:p-6 rounded-lg shadow-sm border border-grayscaleL200', // ✅ Mobile responsive
        tagName: 'section',
      },
    ],
    config: [
      // ✅ Todo va dentro del wrapper principal
      {
        containerId: 'form-wrapper-container',
        htmlContent: `<!-- Container principal responsive -->`,
      },

      // Header del formulario
      {
        containerId: 'header-container',
        htmlContent: `<h2 class="lib-tb-h4-bold text-grayscaleBlack">Iniciar Sesión</h2>
                      <p class="lib-tb-body-medium text-grayscaleD200 mt-2">Accede a tu cuenta</p>`,
      },

      // Información de acceso
      {
        containerId: 'login-form-container',
        htmlContent: `<h3 class="lib-tb-h6-bold text-grayscaleBlack mb-3 sm:mb-4">Credenciales de acceso</h3>`,
      },
      email, // containerId: 'login-form-container'
      password, // containerId: 'login-form-container'
    ],
  };
};
