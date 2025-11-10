import { ILibTbModalNotification } from 'tech-block-lib';

export interface IConfigNotification {
  title: string;
  message: string;
  img?: string;
  error?: boolean;
  labelBtnAccept?: string;
  labelBtnReject?: string;
  clickAccept?: () => void;
  clickReject?: () => void;
  clickClose?: () => void;
}

export const configNotification = ({
  title,
  message,
  img,
  error = false,
  labelBtnAccept = 'Aceptar',
  labelBtnReject = '',
  clickAccept,
  clickReject,
  clickClose,
}: IConfigNotification): ILibTbModalNotification => {
  return {
    img: {
      src: img ?? 'assets/img/pictogramas/' + (error ? 'error' : 'exitoso') + '.svg',
    },
    title,
    message,
    rejectButtonVisible: false,
    acceptButton: {
      label: labelBtnAccept,
      typeBtn: 'primary',
      ...(clickAccept ? { libTbClick: () => clickAccept?.() } : {}),
    },
    rejectButton: {
      label: labelBtnReject,
      ...(clickReject ? { libTbClick: () => clickReject?.() } : {}),
    },
    closeButton: {
      ...(clickClose ? { libTbClick: () => clickClose?.() } : {}),
    },
  };
};
