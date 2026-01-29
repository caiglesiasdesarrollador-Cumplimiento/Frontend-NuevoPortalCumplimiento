import { Validators } from '@angular/forms';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

/**
 * ✅ Configuración del campo Clave del Intermediario
 * 
 * IMPORTANTE: Este campo SIEMPRE debe ser 'input' para permitir entrada manual.
 * Si hay claves disponibles, se pueden mostrar como sugerencias usando la propiedad 'suggestion'.
 * Pero el campo base siempre es input para permitir escritura libre.
 */
export const claveIntermediario: ILibTbDynamicFormConfigType = {
  tbType: 'input', // ✅ SIEMPRE input - nunca dropdown
  containerId: 'step1-product-intermediario-row-container',
  formId: 'claveIntermediario', // ✅ OBLIGATORIO: Para Angular FormControl
  custom: {
    name: 'claveIntermediario', // ✅ OBLIGATORIO: Debe coincidir con formId
    label: 'Clave del Intermediario',
    placeholder: 'Ingrese la clave del intermediario',
    type: 'text', // ✅ Tipo texto explícito
    floatLabel: false, // ✅ CRÍTICO: tema Seguros Bolívar
    class: 'w-full',
    caption: true, // ✅ OBLIGATORIO: Habilitar caption para mostrar errores
    showIconCaption: true, // ✅ Mostrar icono en el caption
    captionText: {
      error: 'El campo es obligatorio', // ✅ Mensaje de error cuando está vacío
    },
    // ✅ NO usar suggestion aquí - se configura dinámicamente en el componente
    // suggestion: false, // Asegurar que no tenga sugerencias por defecto
  },
  formProps: {
    validators: [
      {
        name: 'required',
        message: 'La clave del intermediario es obligatoria',
        validator: Validators.required,
      },
      {
        name: 'minlength',
        message: 'La clave debe tener al menos 3 caracteres',
        validator: Validators.minLength(3),
      },
    ],
  },
};
