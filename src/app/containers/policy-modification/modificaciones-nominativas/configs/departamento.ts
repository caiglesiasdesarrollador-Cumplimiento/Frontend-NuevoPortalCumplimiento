import { Validators } from '@angular/forms';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const departamento: ILibTbDynamicFormConfigType = {
  tbType: 'dropdown',
  containerId: 'mod-nom-location-container',
  formId: 'departamento', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'departamento', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Departamento',
    placeholder: 'Seleccionar departamento',
    floatLabel: false, // ✅ CRÍTICO: tema Seguros Bolívar
    class: 'w-full',
    options: [
      { label: 'Antioquia', value: 'Antioquia' },
      { label: 'Bogotá D.C.', value: 'Bogotá D.C.' },
      { label: 'Cundinamarca', value: 'Cundinamarca' },
      { label: 'Valle del Cauca', value: 'Valle del Cauca' },
      { label: 'Atlántico', value: 'Atlántico' },
      { label: 'Santander', value: 'Santander' },
      { label: 'Norte de Santander', value: 'Norte de Santander' },
      { label: 'Bolívar', value: 'Bolívar' },
      { label: 'Magdalena', value: 'Magdalena' },
      { label: 'Caldas', value: 'Caldas' },
    ],
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'El departamento es obligatorio',
        validator: Validators.required,
      },
    ],
  },
};
