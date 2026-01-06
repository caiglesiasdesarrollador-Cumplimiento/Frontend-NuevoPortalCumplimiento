import { Validators } from '@angular/forms';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

// ✅ Opciones mock para programas parametrizados
const PROGRAMAS_PARAMETRIZADOS_OPTIONS = [
  { label: 'Programa A - Construcción', value: 'programa-a' },
  { label: 'Programa B - Servicios', value: 'programa-b' },
  { label: 'Programa C - Consultoría', value: 'programa-c' },
  { label: 'Programa D - Tecnología', value: 'programa-d' },
];

export const programasParametrizados: ILibTbDynamicFormConfigType = {
  tbType: 'dropdown',
  containerId: 'step2-grandes-beneficiarios-container',
  formId: 'programasParametrizados',
  custom: {
    name: 'programasParametrizados',
    label: 'Programas parametrizados',
    placeholder: 'Seleccione un programa',
    floatLabel: false,
    options: PROGRAMAS_PARAMETRIZADOS_OPTIONS,
    class: 'w-full',
    caption: true,
    showIconCaption: true,
    captionText: {
      error: 'El campo es obligatorio',
    },
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'El programa parametrizado es obligatorio',
        validator: Validators.required,
      },
    ],
  },
};
