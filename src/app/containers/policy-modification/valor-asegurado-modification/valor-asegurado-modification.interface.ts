// ✅ Interfaces para modificación de valor asegurado

export interface IValorAseguradoModificationData {
  numeroPoliza: string;
  tipoModificacion: string;
  coberturas: ICoberturaCumplimiento[];
  // ✅ Propiedades adicionales para el resumen
  producto?: string;
  tomador?: string;
  valorContrato?: number;
  fechaInicio?: string;
}

export interface ICoberturaCumplimiento {
  id: number;
  cobertura: string;
  porcentajeAsegurado: number;
  valorAsegurado: number;
  fechaInicio: string;
  fechaVencimiento: string;
  seleccionado: boolean;
  editable?: boolean;
}

// ✅ Datos mock de coberturas para modificación de valor asegurado
export const MOCK_COBERTURAS_MODIFICACION: ICoberturaCumplimiento[] = [
  {
    id: 1,
    cobertura: 'Cumplimiento de Contrato de Obra',
    porcentajeAsegurado: 10,
    valorAsegurado: 50000000,
    fechaInicio: '2024-01-15',
    fechaVencimiento: '2025-01-14',
    seleccionado: false,
    editable: true,
  },
  {
    id: 2,
    cobertura: 'Buen Manejo y Correcta Inversión del Anticipo',
    porcentajeAsegurado: 100,
    valorAsegurado: 150000000,
    fechaInicio: '2024-01-15',
    fechaVencimiento: '2025-01-14',
    seleccionado: false,
    editable: true,
  },
  {
    id: 3,
    cobertura: 'Pago de Salarios, Prestaciones e Indemnizaciones',
    porcentajeAsegurado: 5,
    valorAsegurado: 25000000,
    fechaInicio: '2024-01-15',
    fechaVencimiento: '2025-01-14',
    seleccionado: false,
    editable: true,
  },
  {
    id: 4,
    cobertura: 'Estabilidad y Calidad de la Obra',
    porcentajeAsegurado: 15,
    valorAsegurado: 75000000,
    fechaInicio: '2024-01-15',
    fechaVencimiento: '2025-01-14',
    seleccionado: false,
    editable: true,
  },
];

// ✅ Datos iniciales para el formulario de modificación
export const INITIAL_VALOR_ASEGURADO_DATA: IValorAseguradoModificationData = {
  numeroPoliza: '',
  tipoModificacion: 'Disminución de valor asegurado',
  coberturas: MOCK_COBERTURAS_MODIFICACION,
  // ✅ Datos adicionales para el resumen
  producto: 'Cumplimiento de Contrato',
  tomador: 'Empresa Tomadora Simulada S.A.S.',
  valorContrato: 150000000,
  fechaInicio: '2024-01-15',
};
