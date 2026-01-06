import { Validators } from '@angular/forms';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const nombreAseguradoGeneral: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'step2-general-data-container',
  formId: 'nombreAseguradoGeneral', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'nombreAseguradoGeneral', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Nombre Asegurado',
    placeholder: 'Ej: Asegurado Principal de Ejemplo Ltda.',
    floatLabel: false, // ✅ CRÍTICO: tema Seguros Bolívar
    class: 'w-full',
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'El nombre del asegurado es obligatorio',
        validator: Validators.required,
      },
    ],
  },
};
