import { ILibTbDynamicForm } from 'tech-block-lib';
import { name } from './configs/name';
import { apellidos } from './configs/apellidos';
import { email } from './configs/email';
import { fechaNacimiento } from './configs/fecha-nacimiento';
import { generoMasculino, generoFemenino } from './configs/genero';
import { pais } from './configs/pais';
import { ciudades } from './configs/ciudades';
import { IDynamicFormComponent } from './dynamic-form.interface';

export const customForm = (self: IDynamicFormComponent): ILibTbDynamicForm => {
  return {
    validateOnSubmit: true,
    class: 'grid grid-cols-1 gap-6',
    configContainers: [
      {
        id: 'header-container',
        class: 'text-center mb-6',
        tagName: 'header',
      },
      {
        id: 'personal-info-container',
        class: 'bg-white p-6 rounded-lg shadow-sm border border-gray-200 grid grid-cols-1 gap-4',
        tagName: 'section',
      },
      {
        id: 'location-info-container',
        class: 'bg-white p-6 rounded-lg shadow-sm border border-gray-200 grid grid-cols-1 gap-4',
        tagName: 'section',
      },
    ],
    config: [
      // Header
      {
        containerId: 'header-container',
        htmlContent: `<h2 class="lib-tb-h4-bold text-grayscaleD200">Formulario de registro personal</h2>`,
      },

      // Personal Information Section
      {
        containerId: 'personal-info-container',
        htmlContent: `<h3 class="lib-tb-h6-bold text-grayscaleD300 mb-4">Información personal</h3>`,
      },
      name(self),
      apellidos,
      email,
      fechaNacimiento,
      {
        containerId: 'personal-info-container',
        htmlContent: `<label class="block text-sm font-medium text-gray-700 mb-2">Género</label>`,
      },
      generoMasculino,
      generoFemenino,

      // Location Information Section
      {
        containerId: 'location-info-container',
        htmlContent: `<h3 class="lib-tb-h6-bold text-grayscaleD300 mb-4">Información de ubicación</h3>`,
      },
      pais,
      ciudades,
    ],
  };
};
