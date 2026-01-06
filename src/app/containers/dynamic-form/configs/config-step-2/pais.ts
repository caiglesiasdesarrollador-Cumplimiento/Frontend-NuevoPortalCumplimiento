import { validatorRequired } from '@shared/utils/validators';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const pais: ILibTbDynamicFormConfigType = {
  tbType: 'dropdown',
  containerId: 'step2-location-info-container', // ✅ Aplicando regla: containerId específico
  formId: 'pais',
  custom: {
    name: 'pais',
    label: 'País',
    placeholder: 'Seleccione su país',
    options: [
      { label: 'Colombia', value: 'colombia' },
      { label: 'México', value: 'mexico' },
      { label: 'Argentina', value: 'argentina' },
      { label: 'Chile', value: 'chile' },
      { label: 'Perú', value: 'peru' },
      { label: 'Ecuador', value: 'ecuador' },
      { label: 'Venezuela', value: 'venezuela' },
      { label: 'Brasil', value: 'brasil' },
      { label: 'Uruguay', value: 'uruguay' },
      { label: 'Paraguay', value: 'paraguay' },
    ],
    optionLabel: 'label',
    optionValue: 'value',
    filter: true,
    filterPlaceholder: 'Buscar país...',
    showClear: true,
    dropdownIcon: 'fal fa-globe',
    floatLabel: true,
    caption: true,
    showIconCaption: true,
    showHelp: true,
    captionText: {
      help: 'Seleccione el país donde reside',
      success: 'País seleccionado correctamente',
    },
  },
  formProps: {
    validators: [validatorRequired()],
  },
};
