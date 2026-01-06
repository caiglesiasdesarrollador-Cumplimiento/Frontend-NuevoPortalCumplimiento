import { ILibTbDynamicForm } from 'tech-block-lib';
import { numeroContrato } from './numero-contrato';
import { tipoDocumentoTomador } from './tipo-documento-tomador';
import { numeroDocumentoTomador } from './numero-documento-tomador';
import { nombreTomador } from './nombre-tomador';
import { moneda } from './moneda';
import { tipoDocumentoAsegurado } from './tipo-documento-asegurado';
import { numeroDocumentoAsegurado } from './numero-documento-asegurado';
import { nombreAsegurado } from './nombre-asegurado';
import { departamento } from './departamento';
import { localidadMunicipio } from './localidad-municipio';
import { direccionRiesgo } from './direccion-riesgo';

export const modificacionesNominativasForm = (isEditable: boolean = true): ILibTbDynamicForm => {
  // ✅ Aplicar modo edición a todos los campos
  const applyEditableMode = (config: any): any => ({
    ...config,
    custom: {
      ...config.custom,
      disabled: !isEditable,
    },
  });

  return {
    validateOnSubmit: true,
    class: 'grid grid-cols-1 gap-2',
    configContainers: [
      {
        id: 'mod-nom-header-container',
        tagName: 'header',
        class: 'text-center',
      },
      {
        id: 'mod-nom-instructions-container',
        tagName: 'section',
        class: 'text-center',
      },
      {
        id: 'mod-nom-cupo-info-container',
        tagName: 'section',
        class: 'bg-grayscaleL400 p-4 rounded-lg',
      },
      {
        id: 'mod-nom-general-data-title-container',
        tagName: 'div',
        class: '',
      },
      {
        id: 'mod-nom-general-data-container',
        tagName: 'section',
        class: 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-2',
      },
      {
        id: 'mod-nom-location-title-container',
        tagName: 'div',
        class: '',
      },
      {
        id: 'mod-nom-location-container',
        tagName: 'section',
        class: 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-2',
      },
    ],
    config: [
      // ✅ Header del formulario
      {
        containerId: 'mod-nom-header-container',
        htmlContent:
          '<h3 class="lib-tb-h5-bold text-grayscaleBlack">Modificaciones Nominativas</h3>',
      },

      // ✅ Instrucciones
      {
        containerId: 'mod-nom-instructions-container',
        htmlContent: `<p class="lib-tb-body-medium text-grayscaleD200">
          ${
            isEditable
              ? 'Complete o edite los datos generales de la póliza y la ubicación del riesgo.'
              : 'Visualización de datos generales de la póliza y ubicación del riesgo. Para editar, seleccione modificaciones adicionales.'
          }
        </p>`,
      },

      // ✅ Información de cupo disponible
      {
        containerId: 'mod-nom-cupo-info-container',
        htmlContent: `
          <div class="flex items-center">
            <i class="fal fa-credit-card text-primaryBase mr-2"></i>
            <span class="lib-tb-body-medium text-grayscaleBlack">
              <strong>Cupo Disponible del Cliente:</strong> $100.000.000
            </span>
          </div>
        `,
      },

      // ✅ Título: Datos Generales Póliza
      {
        containerId: 'mod-nom-general-data-title-container',
        htmlContent:
          '<h4 class="lib-tb-h6-bold text-grayscaleBlack"><i class="fal fa-file-contract text-primaryBase mr-2"></i>Datos Generales Póliza</h4>',
      },

      // ✅ Campos de Datos Generales
      applyEditableMode({ ...numeroContrato, containerId: 'mod-nom-general-data-container' }),
      applyEditableMode({ ...tipoDocumentoTomador, containerId: 'mod-nom-general-data-container' }),
      applyEditableMode({
        ...numeroDocumentoTomador,
        containerId: 'mod-nom-general-data-container',
      }),
      applyEditableMode({ ...nombreTomador, containerId: 'mod-nom-general-data-container' }),
      applyEditableMode({ ...moneda, containerId: 'mod-nom-general-data-container' }),
      applyEditableMode({
        ...tipoDocumentoAsegurado,
        containerId: 'mod-nom-general-data-container',
      }),
      applyEditableMode({
        ...numeroDocumentoAsegurado,
        containerId: 'mod-nom-general-data-container',
      }),
      applyEditableMode({ ...nombreAsegurado, containerId: 'mod-nom-general-data-container' }),

      // ✅ Título: Ubicación del Riesgo
      {
        containerId: 'mod-nom-location-title-container',
        htmlContent:
          '<h4 class="lib-tb-h6-bold text-grayscaleBlack"><i class="fal fa-map-marker-alt text-primaryBase mr-2"></i>Ubicación del Riesgo</h4>',
      },

      // ✅ Campos de Ubicación del Riesgo
      applyEditableMode({ ...departamento, containerId: 'mod-nom-location-container' }),
      applyEditableMode({ ...localidadMunicipio, containerId: 'mod-nom-location-container' }),
      applyEditableMode({ ...direccionRiesgo, containerId: 'mod-nom-location-container' }),
    ],
  };
};
