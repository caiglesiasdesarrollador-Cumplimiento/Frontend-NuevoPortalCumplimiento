import { ILibTbDynamicFormConfigType } from 'tech-block-lib';
import { Validators } from '@angular/forms';

export const nit: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'step1-company-info-container',
  formId: 'nit', // ✅ OBLIGATORIO: Para Angular FormControl
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
