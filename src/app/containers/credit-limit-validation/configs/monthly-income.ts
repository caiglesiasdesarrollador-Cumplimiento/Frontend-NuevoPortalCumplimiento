import { ILibTbDynamicFormConfigType } from 'tech-block-lib';
import { Validators } from '@angular/forms';

export const monthlyIncome: ILibTbDynamicFormConfigType = {
  tbType: 'number',
  containerId: 'financial-info-container',
  formId: 'monthlyIncome', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'monthlyIncome', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Ingresos Mensuales (COP)',
    placeholder: 'Ingresa tus ingresos mensuales',
    floatLabel: false,
    class: 'w-full',
    mode: 'currency',
    currency: 'COP',
    locale: 'es-CO',
    min: 500000,
    max: 999999999,
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'Los ingresos mensuales son requeridos',
        validator: Validators.required,
      },
      {
        name: 'min',
        message: 'Los ingresos deben ser mínimo $500,000 COP',
        validator: Validators.min(500000),
      },
      {
        name: 'max',
        message: 'Los ingresos no pueden superar $999,999,999 COP',
        validator: Validators.max(999999999),
      },
    ],
  },
};
