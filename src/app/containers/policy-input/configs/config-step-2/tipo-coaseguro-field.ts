import { Validators } from '@angular/forms';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const tipoCoaseguroField: ILibTbDynamicFormConfigType = {
  tbType: 'dropdown',
  containerId: 'step2-coaseguro-container',
  formId: 'tipoCoaseguro', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'tipoCoaseguro', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Tipo Coaseguro',
    placeholder: 'Sin Coaseguro', // ✅ Mostrar "Sin Coaseguro" como placeholder
    floatLabel: false, // ✅ CRÍTICO: tema Seguros Bolívar
    options: [
      { label: 'Sin Coaseguro', value: 'sin-coaseguro' },
      { label: 'Cedido', value: 'cedido' },
      { label: 'Aceptado', value: 'aceptado' },
    ],
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'El tipo de coaseguro es obligatorio',
        validator: Validators.required,
      },
    ],
  },
};
