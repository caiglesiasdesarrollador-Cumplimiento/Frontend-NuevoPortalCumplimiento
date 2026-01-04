import { ILibTbDynamicForm, ILibTbDynamicFormConfigType } from 'tech-block-lib';
import { Validators } from '@angular/forms';
import { INDUSTRIES, EMPLOYEE_RANGES, LOCATIONS } from '../../financial-statement-reader.interface';

// ✅ Campos individuales con formId y name OBLIGATORIOS
const companyNameField: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'step1-company-info-container',
  formId: 'companyName', // ✅ OBLIGATORIO
  custom: {
    name: 'companyName', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Nombre de la Empresa',
    placeholder: 'Ingresa el nombre completo de la empresa',
    floatLabel: false, // ✅ Seguros Bolívar theme
  },
  formProps: {
    validators: [Validators.required, Validators.minLength(3)],
  },
};

const nitField: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'step1-company-info-container',
  formId: 'nit', // ✅ OBLIGATORIO
  custom: {
    name: 'nit', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'NIT',
    placeholder: 'Ingresa el NIT de la empresa',
    floatLabel: false, // ✅ Seguros Bolívar theme
  },
  formProps: {
    validators: [Validators.required, Validators.pattern(/^\d{9,11}$/)],
  },
};

const industryField: ILibTbDynamicFormConfigType = {
  tbType: 'dropdown',
  containerId: 'step1-company-info-container',
  formId: 'industry', // ✅ OBLIGATORIO
  custom: {
    name: 'industry', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Sector Industrial',
    placeholder: 'Selecciona el sector',
    floatLabel: false, // ✅ Seguros Bolívar theme
    options: INDUSTRIES,
  },
  formProps: {
    validators: [Validators.required],
  },
};

const employeeCountField: ILibTbDynamicFormConfigType = {
  tbType: 'dropdown',
  containerId: 'step1-company-info-container',
  formId: 'employeeRange', // ✅ OBLIGATORIO
  custom: {
    name: 'employeeRange', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Número de Empleados',
    placeholder: 'Selecciona el rango',
    floatLabel: false, // ✅ Seguros Bolívar theme
    options: EMPLOYEE_RANGES,
  },
  formProps: {
    validators: [Validators.required],
  },
};

const locationField: ILibTbDynamicFormConfigType = {
  tbType: 'dropdown',
  containerId: 'step1-company-info-container',
  formId: 'location', // ✅ OBLIGATORIO
  custom: {
    name: 'location', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Ubicación Principal',
    placeholder: 'Selecciona la ciudad',
    floatLabel: false, // ✅ Seguros Bolívar theme
    options: LOCATIONS,
  },
  formProps: {
    validators: [Validators.required],
  },
};

const foundedYearField: ILibTbDynamicFormConfigType = {
  tbType: 'number',
  containerId: 'step1-company-info-container',
  formId: 'foundedYear', // ✅ OBLIGATORIO
  custom: {
    name: 'foundedYear', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Año de Fundación',
    placeholder: 'Año de fundación',
    floatLabel: false, // ✅ Seguros Bolívar theme
    min: 1900,
    max: new Date().getFullYear(),
  },
  formProps: {
    validators: [
      Validators.required,
      Validators.min(1900),
      Validators.max(new Date().getFullYear()),
    ],
  },
};

// ✅ Configuración principal del paso 1
export const step1CompanyInfoForm = (): ILibTbDynamicForm => {
  return {
    validateOnSubmit: true,
    class: 'min-h-screen bg-grayscaleL400', // ✅ min-h-screen para formularios grandes
    configContainers: [
      {
        id: 'step1-wrapper-container',
        class: 'max-w-4xl mx-auto px-2 py-4 sm:px-4 sm:py-8', // ✅ Mobile responsive para stepper
        tagName: 'div',
      },
      {
        id: 'step1-header-container',
        class: 'text-center mb-4 sm:mb-8', // ✅ Mobile responsive
        tagName: 'header',
      },
      {
        id: 'step1-company-info-container',
        class:
          'bg-grayscaleWhite p-3 sm:p-6 rounded-lg shadow-sm border border-grayscaleL200 mb-3 sm:mb-6', // ✅ Tech-block-lib colors + responsive
        tagName: 'section',
      },
    ],
    config: [
      {
        containerId: 'step1-header-container',
        htmlContent:
          '<h3 class="lib-tb-h5-bold text-grayscaleBlack">Paso 1: Información de la Empresa</h3><p class="lib-tb-body-medium text-grayscaleD200 mt-2">Proporciona la información básica de tu empresa</p>',
      },
      {
        containerId: 'step1-company-info-container',
        htmlContent: '<h4 class="lib-tb-h6-bold text-grayscaleBlack mb-4">Datos Empresariales</h4>',
      },
      companyNameField,
      nitField,
      industryField,
      employeeCountField,
      locationField,
      foundedYearField,
    ],
  };
};
