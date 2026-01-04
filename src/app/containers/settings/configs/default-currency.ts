import { ILibTbDynamicFormConfigType } from 'tech-block-lib';
import { Validators } from '@angular/forms';

export const defaultCurrency: ILibTbDynamicFormConfigType = {
  tbType: 'dropdown',
  containerId: 'user-preferences-container',
  formId: 'defaultCurrency',
  custom: {
    name: 'defaultCurrency',
    label: 'Moneda por Defecto',
    placeholder: 'Selecciona la moneda',
    options: [
      { label: 'Peso Colombiano (COP)', value: 'COP' },
      { label: 'Dólar Estadounidense (USD)', value: 'USD' },
      { label: 'Euro (EUR)', value: 'EUR' },
      { label: 'Real Brasileño (BRL)', value: 'BRL' },
    ],
    floatLabel: false,
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'La moneda por defecto es obligatoria',
        validator: Validators.required,
      },
    ],
  },
};
