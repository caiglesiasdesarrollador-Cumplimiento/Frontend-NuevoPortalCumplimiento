import { validatorRequired } from '@shared/utils/validators';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const fechaNacimiento: ILibTbDynamicFormConfigType = {
  tbType: 'calendar',
  containerId: 'step1-personal-info-container', // ✅ Aplicando regla: containerId específico
  formId: 'fechaNacimiento',
  custom: {
    name: 'fechaNacimiento',
    label: 'Fecha de nacimiento',
    placeholder: 'Seleccione su fecha de nacimiento',
    dateFormat: 'dd/mm/yy',
    showIcon: true,
    icon: 'fal fa-birthday-cake',
    caption: true,
    showIconCaption: true,
    showHelp: true,
    floatLabel: true,
    maxDate: new Date(),
    minDate: new Date(1900, 0, 1),
    readonlyInput: true,
    captionText: {
      help: 'Seleccione su fecha de nacimiento',
      success: 'Fecha seleccionada correctamente',
    },
  },
  formProps: {
    validators: [validatorRequired()],
  },
};
