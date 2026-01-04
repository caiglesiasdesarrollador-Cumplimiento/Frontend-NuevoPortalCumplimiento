import { ILibTbDynamicFormConfigType } from 'tech-block-lib';
import { Validators } from '@angular/forms';

export const objetoContrato: ILibTbDynamicFormConfigType = {
  tbType: 'textarea',
  containerId: 'step2-contract-details-container',
  formId: 'objetoContrato',
  custom: {
    name: 'objetoContrato',
    label: 'Objeto del contrato',
    placeholder: 'Ingrese el objeto del contrato extraído del documento...',
    rows: 4,
    maxLength: 1000,
    required: true,
    class: 'objeto-contrato-field', // ✅ Clase para ocupar toda la fila
    libTbChange: (e: any) => {
      console.log('📝 Objeto del contrato cambiado:', e);
      // La sincronización se manejará desde el componente padre
    },
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'El objeto del contrato es obligatorio',
        validator: Validators.required,
      },
      {
        name: 'minLength',
        message: 'El objeto del contrato debe tener al menos 10 caracteres',
        validator: Validators.minLength(10),
      },
      {
        name: 'maxLength',
        message: 'El objeto del contrato no puede exceder 1000 caracteres',
        validator: Validators.maxLength(1000),
      },
    ],
  },
};
