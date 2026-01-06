import { ILibTbDynamicFormConfigType } from 'tech-block-lib';
import { Validators } from '@angular/forms';
import { POLICY_TYPE_OPTIONS } from '../policy-generation.interface';

// ✅ CRÍTICO: formId y name OBLIGATORIOS para formularios dinámicos simples
export const policyType: ILibTbDynamicFormConfigType = {
  tbType: 'dropdown',
  containerId: 'policy-basic-info-container',
  formId: 'policyType', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'policyType', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Tipo de Póliza',
    placeholder: 'Selecciona el tipo de póliza',
    floatLabel: false, // ✅ Seguros Bolívar theme
    options: POLICY_TYPE_OPTIONS,
    optionLabel: 'label',
    optionValue: 'value',
    class: 'w-full',
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'Debe seleccionar un tipo de póliza',
        validator: Validators.required,
      },
    ],
  },
};
