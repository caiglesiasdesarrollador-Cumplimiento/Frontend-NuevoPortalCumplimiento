import { Validators } from '@angular/forms';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const numeroDocumentoAseguradoGeneral: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'step2-general-data-container',
  formId: 'numeroDocumentoAseguradoGeneral', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'numeroDocumentoAseguradoGeneral', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Número del Documento Asegurado',
    placeholder: 'Ej: 800.987.654-3',
    floatLabel: false, // ✅ CRÍTICO: tema Seguros Bolívar
    class: 'w-full',
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'El número de documento del asegurado es obligatorio',
        validator: Validators.required,
      },
    ],
  },
};
