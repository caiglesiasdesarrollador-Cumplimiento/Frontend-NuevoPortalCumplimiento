import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

// ✅ Configuración del campo número de póliza
export const numeroPoliza: ILibTbDynamicFormConfigType = {
  tbType: 'input',
  containerId: 'step1-policy-selection-container',
  formId: 'numeroPoliza', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'numeroPoliza', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Número de Póliza Existente',
    placeholder: 'Ingrese el número de póliza',
    required: true, // ✅ Validación requerida
    minLength: 3, // ✅ Longitud mínima
  },
};
