// ✅ Interfaces para el módulo de modificaciones de pólizas
export interface IPolicyModificationData {
  numeroPoliza: string;
  tiposModificacion: string[];
}

// ✅ Tipos de modificación disponibles según la imagen 2
export const TIPOS_MODIFICACION = [
  'Aumento de valor asegurado',
  'Disminución de valor asegurado',
  'Traslado de vigencia',
  'Prórroga de vigencia', // ✅ Corregido: Con tilde
  'Disminución de vigencia',
  'Exclusión de coberturas', // ✅ Corregido: Exclusión de vigencia → Exclusión de coberturas
  'Inclusión de coberturas', // ✅ Corregido: Inclusión de vigencia → Inclusión de coberturas
  'Modificaciones nominativas',
];

// ✅ Datos iniciales para el formulario
export const INITIAL_MODIFICATION_DATA: IPolicyModificationData = {
  numeroPoliza: '',
  tiposModificacion: [],
};

// ✅ Datos mock de pólizas activas para mostrar en la tabla
export const MOCK_ACTIVE_POLICIES = [
  {
    id: 1,
    numero: 'POL-2024-001',
    tomador: 'Constructora ABC S.A.S 900123456-7',
    producto: 'Cumplimiento de Contrato',
    valorAsegurado: 500000000,
    estado: 'Vigente',
    fechaInicio: '2024-01-15',
    fechaVencimiento: '2025-01-14',
  },
  {
    id: 2,
    numero: 'POL-2024-002',
    tomador: 'Empresa XYZ Ltda. 800987654-3',
    producto: 'Cumplimiento de Contrato',
    valorAsegurado: 300000000,
    estado: 'Vigente',
    fechaInicio: '2024-03-01',
    fechaVencimiento: '2025-02-28',
  },
  {
    id: 3,
    numero: 'POL-2024-003',
    tomador: 'Constructora DEF S.A. 700456789-1',
    producto: 'Cumplimiento de Contrato',
    valorAsegurado: 750000000,
    estado: 'Vigente',
    fechaInicio: '2024-06-10',
    fechaVencimiento: '2025-06-09',
  },
];
