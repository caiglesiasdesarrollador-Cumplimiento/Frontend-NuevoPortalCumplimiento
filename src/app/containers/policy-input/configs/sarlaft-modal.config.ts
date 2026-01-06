import { ILibTbModal } from 'tech-block-lib';
import { PolicyInputAction } from '../policy-input.interface';

export const sarlaftModalConfig = (
  action: PolicyInputAction = PolicyInputAction.COTIZAR,
): ILibTbModal => {
  const isEmitirMode = action === PolicyInputAction.EMITIR;

  return {
    title: 'El tomador tiene sarlaft desactualizado',
    visible: false,
    size: 'medium',
    closable: true,
    closeOnEscape: true,
    dismissableMask: true,
    class: 'sarlaft-modal',
    containerClass: 'sarlaft-modal-container',
    contentStyleClass: 'sarlaft-modal-content',
    baseZIndex: 1000,
    autoZIndex: true,
    focusOnShow: true,
    focusTrap: true,
    closeIcon: 'fal fa-times',
    primaryButton: {
      label: isEmitirMode ? 'Actualizar' : 'Continuar',
      icon: isEmitirMode ? 'fal fa-sync-alt' : 'fal fa-arrow-right',
      iconPosition: 'right',
      styleBtn: 'fill',
      typeBtn: isEmitirMode ? 'primary' : 'secondary',
      class: isEmitirMode ? 'sarlaft-modal__button--primary' : 'sarlaft-modal__button--continue',
      libTbClick: () => {
        // Se asignará dinámicamente en el componente
      },
    },
    secondaryButton: isEmitirMode
      ? {
          label: 'Cancelar',
          icon: 'fal fa-times',
          iconPosition: 'left',
          styleBtn: 'stroke',
          typeBtn: 'secondary',
          class: 'sarlaft-modal__button--secondary',
          libTbClick: () => {
            // Se asignará dinámicamente en el componente
          },
        }
      : undefined, // No mostrar botón secundario en modo COTIZAR
    libTbOnShow: () => {
      console.log(
        `Modal SARLAFT mostrado en modo ${isEmitirMode ? 'EMITIR (bloqueante)' : 'COTIZAR (informativo)'}`,
      );
    },
    libTbOnHide: () => {
      console.log('Modal SARLAFT ocultado');
    },
  };
};
