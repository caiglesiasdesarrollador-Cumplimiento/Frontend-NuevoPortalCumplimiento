import { Validators } from '@angular/forms';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

// ✅ Opciones mock para programa seleccionado
const PROGRAMA_SELECCIONADO_OPTIONS = [
  { label: 'Programa Seleccionado 1', value: 'programa-seleccionado-1' },
  { label: 'Programa Seleccionado 2', value: 'programa-seleccionado-2' },
  { label: 'Programa Seleccionado 3', value: 'programa-seleccionado-3' },
];

export const programaSeleccionado: ILibTbDynamicFormConfigType = {
  tbType: 'dropdown',
  containerId: 'step2-grandes-beneficiarios-container',
  formId: 'programaSeleccionado',
  custom: {
    name: 'programaSeleccionado',
    label: 'Programa seleccionado',
    placeholder: 'Seleccione el programa',
    floatLabel: false,
    options: PROGRAMA_SELECCIONADO_OPTIONS,
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
        message: 'El programa seleccionado es obligatorio',
        validator: Validators.required,
      },
    ],
  },
};
