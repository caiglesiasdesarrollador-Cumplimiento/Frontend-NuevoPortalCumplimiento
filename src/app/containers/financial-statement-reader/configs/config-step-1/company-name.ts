import { ILibTbDynamicFormConfigType } from 'tech-block-lib';
import { Validators } from '@angular/forms';

// ✅ CRÍTICO: formId y name OBLIGATORIOS para funcionamiento del stepper
export const companyName: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'step1-company-info-container',
  formId: 'companyName', // ✅ OBLIGATORIO: Para Angular FormControl
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
