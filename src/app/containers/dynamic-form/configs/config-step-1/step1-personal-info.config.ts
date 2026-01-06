import { ILibTbDynamicForm } from 'tech-block-lib';
import { IDynamicFormComponent } from '../../dynamic-form.interface';
import { name } from './name';
import { apellidos } from './apellidos';
import { email } from './email';
import { fechaNacimiento } from './fecha-nacimiento';
import { generoMasculino, generoFemenino } from './genero';

/**
 * ✅ APLICANDO REGLA: Estructura para formularios dinámicos con stepper
 * ✅ APLICANDO REGLA: Organización por grupos en formularios dinámicos (MOBILE RESPONSIVE)
 * ✅ APLICANDO REGLA: Integración de Stepper con Formularios Dinámicos
 * ✅ MOBILE: Responsive design mobile-first
 *
 * Configuración del Paso 1: Información Personal - Mobile responsive
 * - Container wrapper: Mobile responsive (px-2 py-4 sm:px-4 sm:py-6)
 * - Secciones: Padding responsive (p-3 sm:p-6)
 * - Márgenes: Responsive (mb-3 sm:mb-6, mb-4 sm:mb-8)
 * - Estructura jerárquica con todos los containers
 * - Separación lógica por grupos temáticos
 * - IDs específicos del paso para evitar colisiones
 * - max-w-2xl para formularios estándar del stepper
 * - Altura mínima para el contenido del paso
 */
export const step1PersonalInfoForm = (self: IDynamicFormComponent): ILibTbDynamicForm => {
  return {
    validateOnSubmit: false,
    class: 'min-h-[400px]', // Altura mínima para el paso
    configContainers: [
      {
        id: 'step1-wrapper-container',
        class: 'max-w-2xl mx-auto px-2 py-4 sm:px-4 sm:py-6', // ✅ Mobile responsive
        tagName: 'div',
      },
      {
        id: 'step1-header-container',
        class: 'text-center mb-4 sm:mb-8', // ✅ Mobile responsive
        tagName: 'header',
      },
      {
        id: 'step1-personal-info-container',
        class:
          'bg-grayscaleWhite p-3 sm:p-6 rounded-lg shadow-sm border border-grayscaleL200 mb-3 sm:mb-6', // ✅ Mobile responsive
        tagName: 'section',
      },
    ],
    config: [
      {
        containerId: 'step1-wrapper-container',
        htmlContent: `<!-- Container del paso 1 centrado responsive -->`,
      },
      {
        containerId: 'step1-header-container',
        htmlContent: `<h3 class="lib-tb-h5-bold text-grayscaleBlack">Paso 1: Información Personal</h3>
                      <p class="lib-tb-body-medium text-grayscaleD200 mt-2">Complete sus datos personales básicos</p>`,
      },
      {
        containerId: 'step1-personal-info-container',
        htmlContent: `<h4 class="lib-tb-h6-bold text-grayscaleBlack mb-3 sm:mb-4">Datos personales</h4>`,
      },
      name(self),
      apellidos,
      email,
      fechaNacimiento,
      {
        containerId: 'step1-personal-info-container',
        htmlContent: `<label class="block text-sm font-medium text-grayscaleD100 mb-2">Género</label>`,
      },
      generoMasculino,
      generoFemenino,
    ],
  };
};
