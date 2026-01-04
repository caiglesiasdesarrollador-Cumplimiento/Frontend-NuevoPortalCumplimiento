// ✅ Interfaces para Modificaciones Nominativas siguiendo lineamientos tech-block-lib
export interface IModificacionesNominativasData {
  numeroPoliza: string;
  tiposModificacion: string[];
  modoEdicion: boolean; // true si hay modificaciones adicionales además de nominativas
  datosGenerales: IDatosGeneralesPoliza;
  ubicacionRiesgo: IUbicacionRiesgo;
  coberturas?: ICoberturaCumplimiento[]; // ✅ AGREGADO: coberturas para modificaciones combinadas
}

// ✅ AGREGADO: Interface para coberturas (copiada de valor-asegurado-modification)
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

export interface IDatosGeneralesPoliza {
  numeroContrato: string;
  tipoDocumentoTomador: string;
  numeroDocumentoTomador: string;
  nombreTomador: string;
  moneda: string;
  tipoDocumentoAsegurado: string;
  numeroDocumentoAsegurado: string;
  nombreAsegurado: string;
}

export interface IUbicacionRiesgo {
  departamento: string;
  localidadMunicipio: string;
  direccionRiesgo: string;
}

// ✅ Datos iniciales mock para modificaciones nominativas
export const INITIAL_MODIFICACIONES_NOMINATIVAS_DATA: IModificacionesNominativasData = {
  numeroPoliza: '',
  tiposModificacion: [],
  modoEdicion: false,
  datosGenerales: {
    numeroContrato: '',
    tipoDocumentoTomador: '',
    numeroDocumentoTomador: '',
    nombreTomador: '',
    moneda: '',
    tipoDocumentoAsegurado: '',
    numeroDocumentoAsegurado: '',
    nombreAsegurado: '',
  },
  ubicacionRiesgo: {
    departamento: '',
    localidadMunicipio: '',
    direccionRiesgo: '',
  },
};

// ✅ AGREGADO: Datos mock de coberturas (copiados de valor-asegurado-modification)
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

// ✅ Datos mock para simular información de póliza existente
export const MOCK_POLIZA_DATA: IModificacionesNominativasData = {
  numeroPoliza: 'POL-123456789',
  tiposModificacion: ['Modificaciones nominativas'],
  modoEdicion: false,
  datosGenerales: {
    numeroContrato: 'CONTRATO-SIM-789',
    tipoDocumentoTomador: 'NIT',
    numeroDocumentoTomador: '900.123.456-7',
    nombreTomador: 'Empresa Tomadora Simulada S.A.S.',
    moneda: 'COP',
    tipoDocumentoAsegurado: 'NIT',
    numeroDocumentoAsegurado: '800.987.654-3',
    nombreAsegurado: 'Asegurado Principal de Ejemplo Ltda.',
  },
  ubicacionRiesgo: {
    departamento: 'Cundinamarca',
    localidadMunicipio: 'Bogotá D.C.',
    direccionRiesgo: 'Calle Falsa 123',
  },
  coberturas: MOCK_COBERTURAS_MODIFICACION, // ✅ AGREGADO: Incluir coberturas
};

// ✅ Opciones para dropdowns siguiendo tech-block-lib
export const TIPOS_DOCUMENTO_OPTIONS = [
  { label: 'Cédula de Ciudadanía', value: 'CC' },
  { label: 'Cédula de Extranjería', value: 'CE' },
  { label: 'NIT', value: 'NIT' },
  { label: 'Pasaporte', value: 'PA' },
  { label: 'Tarjeta de Identidad', value: 'TI' },
];

export const MONEDA_OPTIONS = [
  { label: 'Peso Colombiano (COP)', value: 'COP' },
  { label: 'Dólar Americano (USD)', value: 'USD' },
  { label: 'Euro (EUR)', value: 'EUR' },
];

export const DEPARTAMENTOS_OPTIONS = [
  { label: 'Antioquia', value: 'Antioquia' },
  { label: 'Bogotá D.C.', value: 'Bogotá D.C.' },
  { label: 'Cundinamarca', value: 'Cundinamarca' },
  { label: 'Valle del Cauca', value: 'Valle del Cauca' },
  { label: 'Atlántico', value: 'Atlántico' },
  // Agregar más departamentos según necesidad
];
