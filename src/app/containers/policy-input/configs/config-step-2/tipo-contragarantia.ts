import { Validators } from '@angular/forms';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const tipoContragarantia: ILibTbDynamicFormConfigType = {
  tbType: 'dropdown',
  containerId: 'step2-general-data-container',
  formId: 'tipoContragarantia', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'tipoContragarantia', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Tipo de contragarantía',
    placeholder: '--Seleccione--',
    floatLabel: false, // ✅ CRÍTICO: tema Seguros Bolívar
    options: [
      { label: '--Seleccione--', value: '' },
      { label: '10 - CERRADA', value: '10' },
      { label: '11 - PRENDARIA', value: '11' },
      { label: '20 - ABIERTA', value: '20' },
      { label: '30 - HIPOTECARIA', value: '30' },
    ],
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'El tipo de contragarantía es obligatorio',
        validator: Validators.required,
      },
    ],
  },
};
