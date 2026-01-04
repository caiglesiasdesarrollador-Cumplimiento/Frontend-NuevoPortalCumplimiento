import { ILibTbDynamicForm } from 'tech-block-lib';

// ✅ Configuración del paso 2: Confirmar Modificación
export const step2ConfirmationForm = (): ILibTbDynamicForm => {
  return {
    validateOnSubmit: true,
    class: 'grid grid-cols-1 gap-6',
    configContainers: [
      {
        id: 'step2-summary-container',
        tagName: 'section',
        class: 'bg-grayscaleWhite p-6 rounded-lg shadow-sm border border-grayscaleL200 mb-6',
      },
      {
        id: 'step2-policy-info-container',
        tagName: 'section',
        class: 'bg-grayscaleWhite p-6 rounded-lg shadow-sm border border-grayscaleL200 mb-6',
      },
      {
        id: 'step2-editable-fields-container',
        tagName: 'section',
        class: 'bg-grayscaleWhite p-6 rounded-lg shadow-sm border border-grayscaleL200',
      },
    ],
    config: [
      // ✅ Resumen de la modificación
      {
        containerId: 'step2-summary-container',
        htmlContent: `
          <h4 class="lib-tb-h6-bold text-grayscaleBlack mb-4">
            <i class="fal fa-clipboard-list text-primaryBase mr-2"></i>
            Resumen de la Modificación
          </h4>
          <div class="bg-grayscaleL400 p-4 rounded-lg">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="summary-item">
                <span class="lib-tb-label text-grayscaleD100">Número de Póliza:</span>
                <span class="lib-tb-body-medium text-grayscaleBlack font-medium">
                  {{ step1Form.form?.value?.numeroPoliza || 'No seleccionada' }}
                </span>
              </div>
              <div class="summary-item">
                <span class="lib-tb-label text-grayscaleD100">Tipos de Modificación:</span>
                <span class="lib-tb-body-medium text-grayscaleBlack font-medium">
                  {{ step1Form.form?.value?.tiposModificacion?.length || 0 }} seleccionado(s)
                </span>
              </div>
            </div>
          </div>
        `,
      },

      // ✅ Información completa de la póliza
      {
        containerId: 'step2-policy-info-container',
        htmlContent: `
          <h4 class="lib-tb-h6-bold text-grayscaleBlack mb-4">
            <i class="fal fa-file-contract text-primaryBase mr-2"></i>
            Información Completa de la Póliza
          </h4>
          <div class="bg-grayscaleL400 p-4 rounded-lg">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div class="summary-item">
                <span class="lib-tb-label text-grayscaleD100">Número de Póliza:</span>
                <span class="lib-tb-body-medium text-grayscaleBlack font-medium">
                  {{ selectedPolicy?.numero }}
                </span>
              </div>
              <div class="summary-item">
                <span class="lib-tb-label text-grayscaleD100">Tomador:</span>
                <span class="lib-tb-body-medium text-grayscaleBlack font-medium">
                  {{ selectedPolicy?.tomador }}
                </span>
              </div>
              <div class="summary-item">
                <span class="lib-tb-label text-grayscaleD100">Producto:</span>
                <span class="lib-tb-body-medium text-grayscaleBlack font-medium">
                  {{ selectedPolicy?.producto }}
                </span>
              </div>
              <div class="summary-item">
                <span class="lib-tb-label text-grayscaleD100">Valor Asegurado:</span>
                <span class="lib-tb-body-medium text-grayscaleBlack font-semibold">
                  {{ selectedPolicy?.valorAsegurado | currency:'COP':'symbol':'1.0-0' }}
                </span>
              </div>
              <div class="summary-item">
                <span class="lib-tb-label text-grayscaleD100">Fecha de Inicio:</span>
                <span class="lib-tb-body-medium text-grayscaleBlack font-medium">
                  {{ selectedPolicy?.fechaInicio | date:'dd/MM/yyyy' }}
                </span>
              </div>
              <div class="summary-item">
                <span class="lib-tb-label text-grayscaleD100">Fecha de Vencimiento:</span>
                <span class="lib-tb-body-medium text-grayscaleBlack font-medium">
                  {{ selectedPolicy?.fechaVencimiento | date:'dd/MM/yyyy' }}
                </span>
              </div>
            </div>
          </div>
        `,
      },

      // ✅ Campos editables según el tipo de modificación
      {
        containerId: 'step2-editable-fields-container',
        htmlContent: `
          <h4 class="lib-tb-h6-bold text-grayscaleBlack mb-4">
            <i class="fal fa-edit text-primaryBase mr-2"></i>
            Campos a Modificar
          </h4>
          <div class="bg-grayscaleL400 p-4 rounded-lg">
            <p class="lib-tb-body-medium text-grayscaleD200 text-center py-4">
              Los campos editables se mostrarán aquí según el tipo de modificación seleccionado.
            </p>
          </div>
        `,
      },
    ],
  };
};
