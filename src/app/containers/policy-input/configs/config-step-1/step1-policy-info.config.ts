import { ILibTbDynamicForm } from 'tech-block-lib';
import { insuranceProduct } from './insurance-product';
import { tipoDocumentoTomador } from './tipo-documento-tomador';
import { numeroDocumentoTomador } from './numero-documento-tomador';
import { tipoDocumentoAsegurado } from './tipo-documento-asegurado';
import { numeroDocumentoAsegurado } from './numero-documento-asegurado';
import { claveIntermediario } from './clave-intermediario';
export const step1PolicyInfoForm = (): ILibTbDynamicForm => {
  return {
    validateOnSubmit: true,
    class: 'grid grid-cols-1 gap-2',
    configContainers: [
      {
        id: 'step1-header-container',
        tagName: 'header',
        class: 'text-center',
      },
      {
        id: 'step1-tomador-row-container',
        tagName: 'section',
        class: 'grid grid-cols-1 md:grid-cols-2 gap-4',
      },
      {
        id: 'step1-asegurado-row-container',
        tagName: 'section',
        class: 'grid grid-cols-1 md:grid-cols-2 gap-4',
      },
      {
        id: 'step1-product-intermediario-row-container',
        tagName: 'section',
        class: 'grid grid-cols-1 md:grid-cols-2 gap-4',
      },
    ],
    config: [
      // ✅ Primera fila - Tomador: Tipo Doc Tomador | Número Doc Tomador
      tipoDocumentoTomador, // containerId: 'step1-tomador-row-container'
      numeroDocumentoTomador, // containerId: 'step1-tomador-row-container'

      // ✅ Segunda fila - Asegurado: Tipo Doc Asegurado | Número Doc Asegurado
      tipoDocumentoAsegurado, // containerId: 'step1-asegurado-row-container'
      numeroDocumentoAsegurado, // containerId: 'step1-asegurado-row-container'

      // ✅ Tercera fila - Producto e Intermediario: Seleccione Producto | Clave Intermediario
      insuranceProduct, // containerId: 'step1-product-intermediario-row-container'
      claveIntermediario, // containerId: 'step1-product-intermediario-row-container'
    ],
  };
};
