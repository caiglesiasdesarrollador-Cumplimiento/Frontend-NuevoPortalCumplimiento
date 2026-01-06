import { Validators } from '@angular/forms';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const departamento: ILibTbDynamicFormConfigType = {
  tbType: 'dropdown',
  containerId: 'step2-location-container',
  formId: 'departamento', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'departamento', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Departamento',
    placeholder: 'Seleccione el departamento',
    floatLabel: false, // ✅ CRÍTICO: tema Seguros Bolívar
    options: [
      { label: 'Cundinamarca', value: 'Cundinamarca' },
      { label: 'Antioquia', value: 'Antioquia' },
      { label: 'Valle del Cauca', value: 'Valle del Cauca' },
      { label: 'Atlántico', value: 'Atlántico' },
      { label: 'Santander', value: 'Santander' },
      { label: 'Bolívar', value: 'Bolívar' },
      { label: 'Boyacá', value: 'Boyacá' },
      { label: 'Cesar', value: 'Cesar' },
      { label: 'Córdoba', value: 'Córdoba' },
      { label: 'Magdalena', value: 'Magdalena' },
    ],
    class: 'w-full',
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
