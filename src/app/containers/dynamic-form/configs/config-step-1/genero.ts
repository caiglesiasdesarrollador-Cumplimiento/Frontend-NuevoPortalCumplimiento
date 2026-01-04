import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const generoMasculino: ILibTbDynamicFormConfigType = {
  tbType: 'radio',
  containerId: 'step1-personal-info-container', // ✅ Aplicando regla: containerId específico
  formId: 'genero',
  custom: {
    name: 'genero',
    value: 'masculino',
    label: 'Masculino',
  },
};

export const generoFemenino: ILibTbDynamicFormConfigType = {
  tbType: 'radio',
  containerId: 'step1-personal-info-container', // ✅ Aplicando regla: containerId específico
  formId: 'genero',
  custom: {
    name: 'genero',
    value: 'femenino',
    label: 'Femenino',
  },
};

export const generoContainer: ILibTbDynamicFormConfigType = {
  htmlContent: `
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-2">Género</label>
      <div class="flex gap-4">
        <!-- Los radio buttons se insertarán aquí -->
      </div>
    </div>
  `,
};
