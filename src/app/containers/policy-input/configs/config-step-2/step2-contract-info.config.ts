import { ILibTbDynamicForm } from 'tech-block-lib';
import { numeroContratoGeneral } from './numero-contrato-general';
import { numeroDocumentoTomadorGeneral } from './numero-documento-tomador-general';
import { moneda } from './moneda';
import { numeroDocumentoAseguradoGeneral } from './numero-documento-asegurado-general';
import { tipoDocumentoTomadorGeneral } from './tipo-documento-tomador-general';
import { nombreTomadorGeneral } from './nombre-tomador-general';
import { tipoDocumentoAseguradoGeneral } from './tipo-documento-asegurado-general';
import { nombreAseguradoGeneral } from './nombre-asegurado-general';
import { programasParametrizados } from './programas-parametrizados';
import { programaSeleccionado } from './programa-seleccionado';
import { liderClave } from './lider-clave';
import { participacion } from './participacion';
import { nombreAgente } from './nombre-agente';
import { porcentajeComisionPactada } from './porcentaje-comision-pactada';
import { formaActuacion } from './forma-actuacion';
import { convenio } from './convenio';
import { departamento } from './departamento';
import { localidadMunicipio } from './localidad-municipio';
import { direccionRiesgo } from './direccion-riesgo';
import { valorContrato } from './valor-contrato';
import { fechaInicioContrato } from './fecha-inicio-contrato';
import { duracionContrato } from './duracion-contrato';
import { fechaFinContrato } from './fecha-fin-contrato';
import { objetoContrato } from './objeto-contrato';
import { createCoberturasCumplimientoTableConfig } from './components/coberturas-cumplimiento-table.config';
import { direccionTomador } from './direccion-tomador';
import { ciudadTomador } from './ciudad-tomador';
import { telefonoTomador } from './telefono-tomador';
import { emailTomador } from './email-tomador';
import { direccionAsegurado } from './direccion-asegurado';
import { ciudadAsegurado } from './ciudad-asegurado';
import { telefonoAsegurado } from './telefono-asegurado';
import { emailAsegurado } from './email-asegurado';

export const step2ContractInfoForm = (
  coberturasTable?: any,
  eventHandlers?: any,
  showGrandesBeneficiarios: boolean = false,
): ILibTbDynamicForm => {
  return {
    validateOnSubmit: true,
    class: 'grid grid-cols-1 gap-2',
    configContainers: [
      {
        id: 'step2-header-container',
        tagName: 'header',
        class: 'text-center',
      },
      {
        id: 'step2-instructions-container',
        tagName: 'section',
        class: 'text-center',
      },
      {
        id: 'step2-cupo-info-container',
        tagName: 'section',
        class: 'bg-grayscaleL400 p-4 rounded-lg',
      },
      {
        id: 'step2-general-data-title-container',
        tagName: 'div',
        class: '',
      },
      {
        id: 'step2-general-data-container',
        tagName: 'section',
        class: 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-2',
      },
      {
        id: 'step2-grandes-beneficiarios-title-container',
        tagName: 'div',
        class: '',
      },
      {
        id: 'step2-grandes-beneficiarios-container',
        tagName: 'section',
        class: 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-2',
      },
      {
        id: 'step2-agents-title-container',
        tagName: 'div',
        class: '',
      },
      {
        id: 'step2-agents-container',
        tagName: 'section',
        class: 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-2',
      },
      {
        id: 'step2-location-title-container',
        tagName: 'div',
        class: '',
      },
      {
        id: 'step2-location-container',
        tagName: 'section',
        class: 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-2',
      },
      {
        id: 'step2-contract-details-title-container',
        tagName: 'div',
        class: '',
      },
      {
        id: 'step2-contract-details-container',
        tagName: 'section',
        class: 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-2',
      },
      {
        id: 'step2-coberturas-title-container',
        tagName: 'div',
        class: '',
      },
      {
        id: 'step2-coberturas-table-container',
        tagName: 'section',
        class: '',
      },
    ],
    config: [
      // ✅ Header del paso (removido para evitar duplicación)
      // ✅ Instrucciones del paso (removido para evitar duplicación)

      // ✅ Información de cupo disponible
      {
        containerId: 'step2-cupo-info-container',
        htmlContent: `
          <div class="flex items-center">
            <i class="fa-solid fa-credit-card text-primaryBase mr-2"></i>
            <span class="lib-tb-body-medium text-grayscaleBlack">
              <strong>Cupo Disponible del Cliente:</strong> $100.000.000
            </span>
          </div>
        `,
      },

      // ✅ Título: Datos Generales Póliza
      {
        containerId: 'step2-general-data-title-container',
        htmlContent:
          '<h4 class="lib-tb-h6-bold text-grayscaleBlack"><i class="fa-solid fa-file-contract text-primaryBase mr-2"></i>Datos Generales Póliza</h4>',
      },

      // ✅ Fila 1: Tipo de Documento Tomador (izq) | Número del Documento tomador (der)
      tipoDocumentoTomadorGeneral, // containerId: 'step2-general-data-container'
      numeroDocumentoTomadorGeneral, // containerId: 'step2-general-data-container'

      // ✅ Fila 2: Nombre Tomador (izq) | Dirección del Tomador (der)
      nombreTomadorGeneral, // containerId: 'step2-general-data-container'
      direccionTomador, // containerId: 'step2-general-data-container'

      // ✅ Fila 3: Ciudad del Tomador (izq) | Teléfono del Tomador (der)
      ciudadTomador, // containerId: 'step2-general-data-container'
      telefonoTomador, // containerId: 'step2-general-data-container'

      // ✅ Fila 4: E-mail del Tomador (fila completa - col-span-2)
      emailTomador, // containerId: 'step2-general-data-container'

      // ✅ Fila 5: Tipo de Documento Asegurado (izq) | Número del Documento Asegurado (der)
      tipoDocumentoAseguradoGeneral, // containerId: 'step2-general-data-container'
      numeroDocumentoAseguradoGeneral, // containerId: 'step2-general-data-container'

      // ✅ Fila 6: Nombre Asegurado (izq) | Dirección del Asegurado (der)
      nombreAseguradoGeneral, // containerId: 'step2-general-data-container'
      direccionAsegurado, // containerId: 'step2-general-data-container'

      // ✅ Fila 7: Ciudad del Asegurado (izq) | Teléfono del Asegurado (der)
      ciudadAsegurado, // containerId: 'step2-general-data-container'
      telefonoAsegurado, // containerId: 'step2-general-data-container'

      // ✅ Fila 8: E-mail del Asegurado (izq) | Número de contrato (der)
      emailAsegurado, // containerId: 'step2-general-data-container'
      numeroContratoGeneral, // containerId: 'step2-general-data-container'

      // ✅ Fila 9: Moneda (fila completa - col-span-2)
      moneda, // containerId: 'step2-general-data-container'

      // ✅ Título: Programa grandes beneficiarios (condicional)
      ...(showGrandesBeneficiarios
        ? [
            {
              containerId: 'step2-grandes-beneficiarios-title-container',
              htmlContent:
                '<h4 class="lib-tb-h6-bold text-grayscaleBlack"><i class="fa-solid fa-users text-primaryBase mr-2"></i>Programa grandes beneficiarios</h4>',
            },
          ]
        : []),

      // ✅ Fila 1: Programas parametrizados (izq) | Programa seleccionado (der) - Condicional
      ...(showGrandesBeneficiarios
        ? [
            programasParametrizados, // containerId: 'step2-grandes-beneficiarios-container'
            programaSeleccionado, // containerId: 'step2-grandes-beneficiarios-container'
          ]
        : []),

      // ✅ Título: Agentes
      {
        containerId: 'step2-agents-title-container',
        htmlContent:
          '<h4 class="lib-tb-h6-bold text-grayscaleBlack"><i class="fa-solid fa-user-tie text-primaryBase mr-2"></i>Agentes</h4>',
      },

      // ✅ Fila 1: Lider Clave (izq) | Nombres (der)
      liderClave, // containerId: 'step2-agents-container'
      nombreAgente, // containerId: 'step2-agents-container'

      // ✅ Fila 2: Participación (izq) | Porc. Comisión Pactada (der)
      participacion, // containerId: 'step2-agents-container'
      porcentajeComisionPactada, // containerId: 'step2-agents-container'

      // ✅ Fila 3: Forma Actuación (izq) | Convenio (der)
      formaActuacion, // containerId: 'step2-agents-container'
      convenio, // containerId: 'step2-agents-container'

      // ✅ Título: Ubicación del Riesgo
      {
        containerId: 'step2-location-title-container',
        htmlContent:
          '<h4 class="lib-tb-h6-bold text-grayscaleBlack"><i class="fa-solid fa-map-marker-alt text-primaryBase mr-2"></i>Ubicación del Riesgo</h4>',
      },
      // ✅ Fila 1: Departamento (izq) | Localidad/Municipio (der)
      departamento, // containerId: 'step2-location-container'
      localidadMunicipio, // containerId: 'step2-location-container'

      // ✅ Fila 2: Dirección del Riesgo (fila completa - col-span-2)
      direccionRiesgo, // containerId: 'step2-location-container'

      // ✅ Título: Detalles del Contrato
      {
        containerId: 'step2-contract-details-title-container',
        htmlContent:
          '<h4 class="lib-tb-h6-bold text-grayscaleBlack"><i class="fa-solid fa-file-contract text-primaryBase mr-2"></i>Detalles del Contrato</h4>',
      },
      // ✅ Fila 1: Valor del Contrato (izq) | Fecha Inicio del Contrato (der)
      valorContrato, // containerId: 'step2-contract-details-container'
      fechaInicioContrato, // containerId: 'step2-contract-details-container'

      // ✅ Fila 2: Duración del Contrato (izq) | Fecha Fin del Contrato (der)
      duracionContrato, // containerId: 'step2-contract-details-container'
      fechaFinContrato, // containerId: 'step2-contract-details-container'

      // ✅ Fila 3: Objeto del Contrato (fila completa - col-span-2)
      objetoContrato, // containerId: 'step2-contract-details-container'

      // ✅ Título: Coberturas Cumplimiento
      {
        containerId: 'step2-coberturas-title-container',
        htmlContent:
          '<h4 class="lib-tb-h6-bold text-grayscaleBlack"><i class="fa-solid fa-shield-alt text-primaryBase mr-2"></i>Coberturas Cumplimiento</h4>',
      },

      // ✅ Componente: Tabla de Coberturas Cumplimiento (si se proporcionan parámetros)
      ...(coberturasTable && eventHandlers
        ? [createCoberturasCumplimientoTableConfig(coberturasTable, eventHandlers)]
        : []),
    ],
  };
};
