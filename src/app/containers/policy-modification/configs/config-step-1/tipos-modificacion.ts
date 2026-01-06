import { ILibTbDynamicFormConfigType } from 'tech-block-lib';
import { TIPOS_MODIFICACION } from '../../policy-modification.interface';

// ✅ Configuración del campo tipos de modificación
export const tiposModificacion: ILibTbDynamicFormConfigType = {
  tbType: 'dropdown-multiple',
  containerId: 'step1-modification-types-container',
  formId: 'tiposModificacion', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'tiposModificacion', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Tipo de Modificación',
    placeholder: 'Selecciona los tipos de modificación',
    options: TIPOS_MODIFICACION.map(tipo => ({
      label: tipo,
      value: tipo,
    })),
    optionLabel: 'label',
    optionValue: 'value',
    filter: true,
    filterPlaceholder: 'Buscar tipos de modificación',
    showToggleAll: false, // ✅ Quitamos la opción "Seleccionar todos"
    required: true, // ✅ Validación requerida
    chip: true, // ✅ Mostrar como chips para mejor UX
  },
};
