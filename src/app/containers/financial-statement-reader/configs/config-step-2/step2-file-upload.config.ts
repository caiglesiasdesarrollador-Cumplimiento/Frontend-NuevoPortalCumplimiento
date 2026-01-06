import { ILibTbDynamicForm, ILibTbDynamicFormConfigType } from 'tech-block-lib';
import { Validators } from '@angular/forms';
import { CURRENCIES } from '../../financial-statement-reader.interface';

// ✅ Campo de período fiscal
const fiscalPeriodField: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'step2-file-info-container',
  formId: 'fiscalPeriod', // ✅ OBLIGATORIO
  custom: {
    name: 'fiscalPeriod', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Período Fiscal',
    placeholder: 'Ej: 2023, 2022-2023',
    floatLabel: false, // ✅ Seguros Bolívar theme
  },
  formProps: {
    validators: [Validators.required],
  },
};

// ✅ Campo de moneda
const currencyField: ILibTbDynamicFormConfigType = {
  tbType: 'dropdown',
  containerId: 'step2-file-info-container',
  formId: 'currency', // ✅ OBLIGATORIO
  custom: {
    name: 'currency', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Moneda',
    placeholder: 'Selecciona la moneda',
    floatLabel: false, // ✅ Seguros Bolívar theme
    options: CURRENCIES,
  },
  formProps: {
    validators: [Validators.required],
  },
};

// ✅ Campo de contacto de email
const contactEmailField: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'step2-contact-info-container',
  formId: 'contactEmail', // ✅ OBLIGATORIO
  custom: {
    name: 'contactEmail', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Email de Contacto',
    placeholder: 'contacto@empresa.com',
    floatLabel: false, // ✅ Seguros Bolívar theme
  },
  formProps: {
    validators: [Validators.required, Validators.email],
  },
};

// ✅ Campo de teléfono de contacto
const contactPhoneField: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'step2-contact-info-container',
  formId: 'contactPhone', // ✅ OBLIGATORIO
  custom: {
    name: 'contactPhone', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Teléfono de Contacto',
    placeholder: '+57 300 123 4567',
    floatLabel: false, // ✅ Seguros Bolívar theme
  },
  formProps: {
    validators: [Validators.required],
  },
};

// ✅ Configuración principal del paso 2
export const step2FileUploadForm = (): ILibTbDynamicForm => {
  return {
    validateOnSubmit: true,
    class: 'min-h-screen bg-grayscaleL400', // ✅ min-h-screen para formularios grandes
    configContainers: [
      {
        id: 'step2-wrapper-container',
        class: 'max-w-4xl mx-auto px-2 py-4 sm:px-4 sm:py-8', // ✅ Mobile responsive para stepper
        tagName: 'div',
      },
      {
        id: 'step2-header-container',
        class: 'text-center mb-4 sm:mb-8', // ✅ Mobile responsive
        tagName: 'header',
      },
      {
        id: 'step2-file-info-container',
        class:
          'bg-grayscaleWhite p-3 sm:p-6 rounded-lg shadow-sm border border-grayscaleL200 mb-3 sm:mb-6', // ✅ Tech-block-lib colors + responsive
        tagName: 'section',
      },
      {
        id: 'step2-upload-area-container',
        class:
          'bg-grayscaleWhite p-3 sm:p-6 rounded-lg shadow-sm border border-grayscaleL200 mb-3 sm:mb-6', // ✅ Tech-block-lib colors + responsive
        tagName: 'section',
      },
      {
        id: 'step2-contact-info-container',
        class:
          'bg-grayscaleWhite p-3 sm:p-6 rounded-lg shadow-sm border border-grayscaleL200 mb-3 sm:mb-6', // ✅ Tech-block-lib colors + responsive
        tagName: 'section',
      },
    ],
    config: [
      {
        containerId: 'step2-header-container',
        htmlContent:
          '<h3 class="lib-tb-h5-bold text-grayscaleBlack">Paso 2: Estado Financiero</h3><p class="lib-tb-body-medium text-grayscaleD200 mt-2">Sube el estado financiero para análisis con IA</p>',
      },
      {
        containerId: 'step2-file-info-container',
        htmlContent:
          '<h4 class="lib-tb-h6-bold text-grayscaleBlack mb-4">Información del Estado Financiero</h4>',
      },
      fiscalPeriodField,
      currencyField,
      {
        containerId: 'step2-upload-area-container',
        htmlContent:
          '<h4 class="lib-tb-h6-bold text-grayscaleBlack mb-4">Cargar Archivo</h4><p class="lib-tb-body-small text-grayscaleD200 mb-4">Formatos soportados: PDF, Excel (XLS/XLSX), CSV (máximo 10MB)</p><div id="file-upload-placeholder" class="border-2 border-dashed border-grayscaleL200 rounded-lg p-6 text-center"><i class="fal fa-cloud-upload text-4xl text-grayscaleD200 mb-4"></i><p class="lib-tb-body-medium text-grayscaleD200">El componente de carga de archivos se integrará aquí</p></div>',
      },
      {
        containerId: 'step2-contact-info-container',
        htmlContent:
          '<h4 class="lib-tb-h6-bold text-grayscaleBlack mb-4">Información de Contacto</h4>',
      },
      contactEmailField,
      contactPhoneField,
    ],
  };
};
