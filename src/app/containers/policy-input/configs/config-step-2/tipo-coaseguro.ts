import { ILibTbRadioButton } from 'tech-block-lib';

// ✅ Radio button para "Sin Coaseguro" (por defecto)
export const sinCoaseguroRadio: ILibTbRadioButton = {
  name: 'tipoCoaseguro',
  label: 'Sin Coaseguro',
  value: 'sin-coaseguro',
  id: 'sin-coaseguro',
  class: 'tipo-coaseguro-radio',
  libTbChange: (e: any) => {
    console.log('Sin Coaseguro seleccionado:', e);
  },
};

// ✅ Radio button para "Cedido"
export const cedidoRadio: ILibTbRadioButton = {
  name: 'tipoCoaseguro',
  label: 'Cedido',
  value: 'cedido',
  id: 'cedido',
  class: 'tipo-coaseguro-radio',
  libTbChange: (e: any) => {
    console.log('Cedido seleccionado:', e);
  },
};

// ✅ Radio button para "Aceptado"
export const aceptadoRadio: ILibTbRadioButton = {
  name: 'tipoCoaseguro',
  label: 'Aceptado',
  value: 'aceptado',
  id: 'aceptado',
  class: 'tipo-coaseguro-radio',
  libTbChange: (e: any) => {
    console.log('Aceptado seleccionado:', e);
  },
};
