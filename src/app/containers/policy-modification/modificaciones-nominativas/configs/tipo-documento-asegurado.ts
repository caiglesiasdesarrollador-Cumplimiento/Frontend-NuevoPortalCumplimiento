import { Validators } from '@angular/forms';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const tipoDocumentoAsegurado: ILibTbDynamicFormConfigType = {
  tbType: 'dropdown',
  containerId: 'mod-nom-general-data-container',
  formId: 'tipoDocumentoAsegurado', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'tipoDocumentoAsegurado', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Tipo de Documento Asegurado',
    placeholder: 'Seleccionar tipo de documento',
    floatLabel: false, // ✅ CRÍTICO: tema Seguros Bolívar
    class: 'w-full',
    options: [
      { label: 'Cédula de Ciudadanía', value: 'CC' },
      { label: 'Cédula de Extranjería', value: 'CE' },
      { label: 'NIT', value: 'NIT' },
      { label: 'Pasaporte', value: 'PA' },
      { label: 'Tarjeta de Identidad', value: 'TI' },
    ],
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
