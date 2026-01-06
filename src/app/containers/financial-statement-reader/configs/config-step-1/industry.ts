import { ILibTbDynamicFormConfigType } from 'tech-block-lib';
import { Validators } from '@angular/forms';
import { INDUSTRIES } from '../../financial-statement-reader.interface';

export const industry: ILibTbDynamicFormConfigType = {
  tbType: 'dropdown',
  containerId: 'step1-company-info-container',
  formId: 'industry', // ✅ OBLIGATORIO: Para Angular FormControl
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
