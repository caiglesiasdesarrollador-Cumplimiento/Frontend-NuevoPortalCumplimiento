import { ILibTbDynamicFormConfigType } from 'tech-block-lib';
import { Validators } from '@angular/forms';
import { ENTITY_TYPES } from '../third-party-validation.interface';

// ✅ CRÍTICO: formId y name OBLIGATORIOS para formularios dinámicos simples
export const entityType: ILibTbDynamicFormConfigType = {
  tbType: 'dropdown',
  containerId: 'basic-info-container',
  formId: 'entityType', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'entityType', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Tipo de Entidad',
    placeholder: 'Selecciona el tipo',
    floatLabel: false, // ✅ Seguros Bolívar theme
    options: ENTITY_TYPES,
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'Debe seleccionar un tipo de entidad',
        validator: Validators.required,
      },
    ],
  },
};
