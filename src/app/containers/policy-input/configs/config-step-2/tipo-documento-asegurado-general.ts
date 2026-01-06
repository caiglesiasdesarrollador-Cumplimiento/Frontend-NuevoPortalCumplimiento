import { Validators } from '@angular/forms';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const tipoDocumentoAseguradoGeneral: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'step2-general-data-container',
  formId: 'tipoDocumentoAseguradoGeneral', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'tipoDocumentoAseguradoGeneral', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Tipo de Documento Asegurado',
    placeholder: 'Ej: NIT',
    floatLabel: false, // ✅ CRÍTICO: tema Seguros Bolívar
    class: 'w-full',
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'El tipo de documento del asegurado es obligatorio',
        validator: Validators.required,
      },
    ],
  },
};
