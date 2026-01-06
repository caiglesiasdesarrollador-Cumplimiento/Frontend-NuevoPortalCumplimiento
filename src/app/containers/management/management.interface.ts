// ✅ Enum para estados de pólizas y cotizaciones
export enum PolicyStatus {
  BORRADOR = 'Borrador',
  EN_REVISION = 'En revisión',
  COTIZADA = 'Cotizada',
  EMITIDA = 'Emitida',
  VIGENTE = 'Vigente',
  VENCIDA = 'Vencida',
  CANCELADA = 'Cancelada',
}

// ✅ Enum para tipos de producto
export enum ProductType {
  CUMPLIMIENTO_CONTRATO = 'Cumplimiento de Contrato',
  RESPONSABILIDAD_CIVIL = 'Responsabilidad Civil',
  BUEN_MANEJO = 'Buen Manejo y Correcta Inversión',
  SERIEDAD_OFERTA = 'Seriedad de Oferta',
  CALIDAD_SERVICIO = 'Calidad del Servicio',
}

// ✅ Interface para elementos de la tabla
export interface IPolicyManagementItem {
  id: string;
  numero: string;
  tipo: 'cotizacion' | 'poliza';
  producto: ProductType;
  tomador: string;
  numeroDocumento: string;
  valorAsegurado: number;
  fechaCreacion: string;
  fechaVigenciaDesde?: string;
  fechaVigenciaHasta?: string;
  estado: PolicyStatus;
  intermediario: string;
  numeroContrato?: string;
  observaciones?: string;
}

// ✅ Interface para filtros
export interface IManagementFilters {
  searchText: string;
  tipoFiltro: 'todos' | 'cotizacion' | 'poliza';
  estadoFiltro: PolicyStatus | 'todos';
  productoFiltro: ProductType | 'todos';
  fechaDesde: string;
  fechaHasta: string;
  intermediarioFiltro: string;
}

// ✅ Interface para acciones de la tabla
export interface ITableAction {
  icon: string;
  label: string;
  action: string;
  styleBtn: 'fill' | 'stroke';
  typeBtn: 'primary' | 'secondary' | 'tertiary' | 'error';
  visible: (item: IPolicyManagementItem) => boolean;
}

// ✅ Opciones para dropdowns de filtros
export const ESTADO_FILTER_OPTIONS = [
  { label: 'Todos los estados', value: 'todos' },
  { label: PolicyStatus.BORRADOR, value: PolicyStatus.BORRADOR },
  { label: PolicyStatus.EN_REVISION, value: PolicyStatus.EN_REVISION },
  { label: PolicyStatus.COTIZADA, value: PolicyStatus.COTIZADA },
  { label: PolicyStatus.EMITIDA, value: PolicyStatus.EMITIDA },
  { label: PolicyStatus.VIGENTE, value: PolicyStatus.VIGENTE },
  { label: PolicyStatus.VENCIDA, value: PolicyStatus.VENCIDA },
  { label: PolicyStatus.CANCELADA, value: PolicyStatus.CANCELADA },
];

export const TIPO_FILTER_OPTIONS = [
  { label: 'Todos', value: 'todos' },
  { label: 'Cotizaciones', value: 'cotizacion' },
  { label: 'Pólizas', value: 'poliza' },
];

export const PRODUCTO_FILTER_OPTIONS = [
  { label: 'Todos los productos', value: 'todos' },
  { label: ProductType.CUMPLIMIENTO_CONTRATO, value: ProductType.CUMPLIMIENTO_CONTRATO },
  { label: ProductType.RESPONSABILIDAD_CIVIL, value: ProductType.RESPONSABILIDAD_CIVIL },
  { label: ProductType.BUEN_MANEJO, value: ProductType.BUEN_MANEJO },
  { label: ProductType.SERIEDAD_OFERTA, value: ProductType.SERIEDAD_OFERTA },
  { label: ProductType.CALIDAD_SERVICIO, value: ProductType.CALIDAD_SERVICIO },
];

// ✅ Datos mock para la tabla
export const MOCK_MANAGEMENT_DATA: IPolicyManagementItem[] = [
  {
    id: 'pol001',
    numero: 'POL-2024-001',
    tipo: 'poliza',
    producto: ProductType.CUMPLIMIENTO_CONTRATO,
    tomador: 'Constructora ABC S.A.S',
    numeroDocumento: '900123456-7',
    valorAsegurado: 500000000,
    fechaCreacion: '2024-01-15',
    fechaVigenciaDesde: '2024-02-01',
    fechaVigenciaHasta: '2025-02-01',
    estado: PolicyStatus.VIGENTE,
    intermediario: 'INT-001',
    numeroContrato: 'CONT-2024-789',
    observaciones: 'Póliza activa para construcción',
  },
  {
    id: 'cot001',
    numero: 'COT-2024-001',
    tipo: 'cotizacion',
    producto: ProductType.RESPONSABILIDAD_CIVIL,
    tomador: 'Empresa XYZ Ltda',
    numeroDocumento: '900654321-2',
    valorAsegurado: 300000000,
    fechaCreacion: '2024-01-20',
    estado: PolicyStatus.COTIZADA,
    intermediario: 'INT-002',
    observaciones: 'Cotización pendiente de emisión',
  },
  {
    id: 'cot002',
    numero: 'COT-2024-002',
    tipo: 'cotizacion',
    producto: ProductType.BUEN_MANEJO,
    tomador: 'Servicios DEF S.A.S',
    numeroDocumento: '900987654-3',
    valorAsegurado: 750000000,
    fechaCreacion: '2024-01-18',
    estado: PolicyStatus.BORRADOR,
    intermediario: 'INT-001',
    observaciones: 'Cotización en proceso',
  },
  {
    id: 'pol002',
    numero: 'POL-2024-002',
    tipo: 'poliza',
    producto: ProductType.SERIEDAD_OFERTA,
    tomador: 'Comercializadora GHI S.A.',
    numeroDocumento: '900111222-1',
    valorAsegurado: 200000000,
    fechaCreacion: '2024-01-10',
    fechaVigenciaDesde: '2024-01-15',
    fechaVigenciaHasta: '2024-07-15',
    estado: PolicyStatus.VIGENTE,
    intermediario: 'INT-003',
    numeroContrato: 'CONT-2024-456',
    observaciones: 'Póliza para licitación pública',
  },
  {
    id: 'pol003',
    numero: 'POL-2023-155',
    tipo: 'poliza',
    producto: ProductType.CUMPLIMIENTO_CONTRATO,
    tomador: 'Ingeniería JKL Ltda',
    numeroDocumento: '900555666-4',
    valorAsegurado: 1000000000,
    fechaCreacion: '2023-12-01',
    fechaVigenciaDesde: '2023-12-15',
    fechaVigenciaHasta: '2024-02-28',
    estado: PolicyStatus.VENCIDA,
    intermediario: 'INT-002',
    numeroContrato: 'CONT-2023-999',
    observaciones: 'Póliza vencida - requiere renovación',
  },
  // ✅ NUEVAS COTIZACIONES EN ESTADO "COTIZADA" PARA PRUEBAS
  {
    id: 'cot003',
    numero: 'COT-2024-003',
    tipo: 'cotizacion',
    producto: ProductType.CUMPLIMIENTO_CONTRATO,
    tomador: 'Constructora Integral MNO S.A.S',
    numeroDocumento: '900444555-8',
    valorAsegurado: 850000000,
    fechaCreacion: '2024-01-25',
    estado: PolicyStatus.COTIZADA,
    intermediario: 'INT-001',
    numeroContrato: 'CONT-2024-234',
    observaciones: 'Cotización para proyecto vial - Lista para emisión',
  },
  {
    id: 'cot004',
    numero: 'COT-2024-004',
    tipo: 'cotizacion',
    producto: ProductType.SERIEDAD_OFERTA,
    tomador: 'Telecomunicaciones PQR Ltda',
    numeroDocumento: '900777888-5',
    valorAsegurado: 450000000,
    fechaCreacion: '2024-01-22',
    estado: PolicyStatus.COTIZADA,
    intermediario: 'INT-003',
    numeroContrato: 'CONT-2024-567',
    observaciones: 'Cotización para licitación de fibra óptica - Aprobada',
  },
  {
    id: 'cot005',
    numero: 'COT-2024-005',
    tipo: 'cotizacion',
    producto: ProductType.CALIDAD_SERVICIO,
    tomador: 'Servicios Hospitalarios STU S.A.',
    numeroDocumento: '900333444-6',
    valorAsegurado: 620000000,
    fechaCreacion: '2024-01-28',
    estado: PolicyStatus.COTIZADA,
    intermediario: 'INT-002',
    numeroContrato: 'CONT-2024-890',
    observaciones: 'Cotización para hospital - Revisión técnica completada',
  },
];

// ✅ Filtros iniciales - Solo cotizaciones para retomar cotización
export const INITIAL_FILTERS: IManagementFilters = {
  searchText: '',
  tipoFiltro: 'cotizacion',
  estadoFiltro: 'todos' as any,
  productoFiltro: 'todos' as any,
  fechaDesde: '',
  fechaHasta: '',
  intermediarioFiltro: '',
};
