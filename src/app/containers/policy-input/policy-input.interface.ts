// ✅ Enum para tipos de acción del policy input
export enum PolicyInputAction {
  EMITIR = 'emitir',
  COTIZAR = 'cotizar',
  RETOMAR = 'retomar',
  MODIFICAR = 'modificar',
}

// ✅ Interface para estructura de labels de acciones
export interface ActionLabel {
  step1Title: string;
  step1Description: string;
  step2Title: string;
  step2Description: string;
  step3Title: string;
  step3Description: string;
  finalStepTitle: string;
  submitLabel: string;
  successMessage: string;
}

// ✅ Interface para datos del paso 1 - Información básica
export interface IPolicyStep1Data {
  insuranceProduct: string;
  tipoDocumentoTomador: string;
  numeroDocumentoTomador: string;
  tipoDocumentoAsegurado: string;
  numeroDocumentoAsegurado: string;
  claveIntermediario: string;
}

// ✅ Interface para datos del paso 2 - Información del contrato (extraída)
export interface IPolicyStep2Data {
  // Datos Generales Póliza
  numeroContratoGeneral: string;
  numeroDocumentoTomadorGeneral: string;
  moneda: string;
  numeroDocumentoAseguradoGeneral: string;
  tipoDocumentoTomadorGeneral: string;
  nombreTomadorGeneral: string;
  tipoDocumentoAseguradoGeneral: string;
  nombreAseguradoGeneral: string;

  // Ubicación del Riesgo
  departamento: string;
  localidadMunicipio: string;
  direccionRiesgo: string;

  // Detalles del Contrato
  valorContrato: number;
  fechaInicioContrato: string;
  duracionContrato: string;
  fechaFinContrato: string;
  objetoContrato: string;

  // Datos adicionales (mantenidos para compatibilidad)
  numeroContrato: string;
  numeroDocumentoTomador: string;
  nombreTomador: string;
  emailTomador: string;
  telefonoTomador: string;
  direccionTomador: string;
  ciudadTomador: string;
  departamentoTomador: string;
  valorAsegurado: number;
  vigenciaDesde: string;
  vigenciaHasta: string;
  tipoCobertura: string;
  numeroEndoso?: string;
  observaciones?: string;
}

// ✅ Interface para cotizaciones existentes (para retomar)
export interface IExistingQuotation {
  id: string;
  numero: string;
  tomador: string;
  producto: string;
  valorAsegurado: number;
  fechaCreacion: string;
  estado: string;
}

// ✅ Opciones para dropdowns
export const INSURANCE_PRODUCTS_OPTIONS = [
  { label: 'Grandes Beneficiarios', value: 'grandes-beneficiarios' },
  { label: 'Particulares', value: 'particulares' },
  { label: 'Estatales', value: 'estatales' },
];

export const DOCUMENT_TYPES_OPTIONS = [
  { label: 'NIT', value: 'NIT' },
  { label: 'Cédula de Ciudadanía', value: 'CC' },
  { label: 'Cédula de Extranjería', value: 'CE' },
  { label: 'Pasaporte', value: 'PP' },
];

export const COVERAGE_TYPES_OPTIONS = [
  { label: 'Básica', value: 'basica' },
  { label: 'Amplia', value: 'amplia' },
  { label: 'Todo Riesgo', value: 'todo-riesgo' },
];

// ✅ Datos mock para cotizaciones existentes
export const MOCK_QUOTATIONS_DATA: IExistingQuotation[] = [
  {
    id: 'q001',
    numero: 'COT-2024-001',
    tomador: 'Constructora ABC S.A.S',
    producto: 'Cumplimiento de Contrato',
    valorAsegurado: 500000000,
    fechaCreacion: '2024-01-15',
    estado: 'Borrador',
  },
  {
    id: 'q002',
    numero: 'COT-2024-002',
    tomador: 'Empresa XYZ Ltda',
    producto: 'Responsabilidad Civil',
    valorAsegurado: 300000000,
    fechaCreacion: '2024-01-10',
    estado: 'En revisión',
  },
  {
    id: 'q003',
    numero: 'COT-2024-003',
    tomador: 'Servicios DEF S.A.S',
    producto: 'Buen Manejo',
    valorAsegurado: 750000000,
    fechaCreacion: '2024-01-08',
    estado: 'Borrador',
  },
];

// ✅ Datos mock inicial para paso 2 (datos extraídos del contrato)
export const INITIAL_STEP2_DATA: IPolicyStep2Data = {
  // Datos Generales Póliza
  numeroContratoGeneral: '',
  numeroDocumentoTomadorGeneral: '',
  moneda: '',
  numeroDocumentoAseguradoGeneral: '',
  tipoDocumentoTomadorGeneral: '',
  nombreTomadorGeneral: '',
  tipoDocumentoAseguradoGeneral: '',
  nombreAseguradoGeneral: '',

  // Ubicación del Riesgo
  departamento: '',
  localidadMunicipio: '',
  direccionRiesgo: '',

  // Detalles del Contrato
  valorContrato: 0,
  fechaInicioContrato: '',
  duracionContrato: '',
  fechaFinContrato: '',
  objetoContrato: '',

  // Datos adicionales (mantenidos para compatibilidad)
  numeroContrato: '',
  numeroDocumentoTomador: '',
  nombreTomador: '',
  emailTomador: '',
  telefonoTomador: '',
  direccionTomador: '',
  ciudadTomador: '',
  departamentoTomador: '',
  valorAsegurado: 0,
  vigenciaDesde: '',
  vigenciaHasta: '',
  tipoCobertura: '',
  numeroEndoso: '',
  observaciones: '',
};

// ✅ Datos mock simulados de extracción de contrato (según imagen 2)
export const MOCK_EXTRACTED_CONTRACT_DATA: IPolicyStep2Data = {
  // Datos Generales Póliza (según imagen 2)
  numeroContratoGeneral: 'CONTRATO-SIM-789',
  numeroDocumentoTomadorGeneral: '9001234567',
  moneda: 'COP',
  numeroDocumentoAseguradoGeneral: '8009876543',
  tipoDocumentoTomadorGeneral: 'NIT',
  nombreTomadorGeneral: 'Empresa Tomadora Simulada S.A.S.',
  tipoDocumentoAseguradoGeneral: 'NIT',
  nombreAseguradoGeneral: 'Asegurado Principal de Ejemplo Ltda.',

  // Ubicación del Riesgo (según imagen 2)
  departamento: 'Cundinamarca',
  localidadMunicipio: 'Bogotá D.C.',
  direccionRiesgo: 'Calle Falsa 123',

  // Detalles del Contrato (según imagen 2)
  valorContrato: 150000000,
  fechaInicioContrato: '2024-08-01',
  duracionContrato: '365',
  fechaFinContrato: '2025-07-31',
  objetoContrato:
    'Prestación de servicios de consultoría en cumplimiento normativo y asesoría legal para la implementación de políticas de cumplimiento empresarial, incluyendo la elaboración de manuales de procedimientos, capacitación del personal y seguimiento continuo del cumplimiento de las normativas vigentes.',

  // Datos adicionales (mantenidos para compatibilidad)
  numeroContrato: 'CONTRATO-SIM-789',
  numeroDocumentoTomador: '9001234567',
  nombreTomador: 'Empresa Tomadora Simulada S.A.S.',
  emailTomador: 'contacto@empresatomadora.com',
  telefonoTomador: '+57 1 2345678',
  direccionTomador: 'Calle 123 #45-67, Oficina 301',
  ciudadTomador: 'Bogotá',
  departamentoTomador: 'Cundinamarca',
  valorAsegurado: 100000000,
  vigenciaDesde: '2024-02-01',
  vigenciaHasta: '2025-02-01',
  tipoCobertura: 'Amplia',
  numeroEndoso: '',
  observaciones: 'Contrato de cumplimiento empresarial',
};

// ✅ Labels dinámicos según acción - Desktop
export const ACTION_LABELS = {
  [PolicyInputAction.EMITIR]: {
    step1Title: 'Paso 1: Información del Producto y Partes',
    step1Description:
      'Selecciona el producto, ingresa los datos del tomador/asegurado, y carga el contrato.',
    step2Title: 'Paso 2: Formulario de Emisión',
    step2Description:
      'Completa o edita los detalles para la emisión de la póliza. Los campos pre-llenados provienen de la información del contrato.',
    step3Title: 'Paso 3: Confirmar Emisión',
    step3Description: 'Revisa los detalles y confirma para emitir la póliza.',
    finalStepTitle: 'Confirmar Emisión',
    submitLabel: 'Emitir Póliza',
    successMessage: 'Póliza emitida exitosamente',
  },
  [PolicyInputAction.COTIZAR]: {
    step1Title: 'Paso 1: Información del Producto y Partes',
    step1Description:
      'Selecciona el producto, ingresa los datos del tomador/asegurado, y carga el contrato.',
    step2Title: 'Paso 2: Formulario de cotización',
    step2Description:
      'Completa o edita los detalles para la cotización de la póliza. Los campos pre-llenados provienen de la información identificada del contrato.',
    step3Title: 'Paso 3: Confirmar la generación de la cotización',
    step3Description: 'Revisa los detalles y confirma antes de generar la cotización.',
    finalStepTitle: 'Paso 3: Confirmar la generación de la cotización',
    submitLabel: 'Generar Cotización',
    successMessage: 'Cotización generada exitosamente',
  },
  [PolicyInputAction.RETOMAR]: {
    step1Title: 'Paso 1: Buscar Cotización Existente',
    step1Description:
      'Ingrese el número de cotización a retomar o seleccione de la lista de cotizaciones existentes.',
    step2Title: 'Paso 2: Formulario de Retoma',
    step2Description:
      'Complete o edite los detalles para retomar la cotización. Los campos pre-llenados provienen de la cotización seleccionada.',
    step3Title: 'Paso 3: Confirmar Retoma',
    step3Description: 'Revisa los detalles y confirma para retomar la cotización.',
    finalStepTitle: 'Confirmar Retoma de Cotización',
    submitLabel: 'Retomar Cotización',
    successMessage: 'Cotización retomada exitosamente',
  },
  [PolicyInputAction.MODIFICAR]: {
    step1Title: 'Paso 1: Buscar Póliza a Modificar',
    step1Description:
      'Ingrese el número de póliza a modificar y seleccione los tipos de modificación a realizar.',
    step2Title: 'Paso 2: Formulario de Modificación',
    step2Description:
      'Complete o edite los detalles para modificar la póliza. Los campos pre-llenados provienen de la póliza seleccionada.',
    step3Title: 'Paso 3: Confirmar Modificación',
    step3Description: 'Revisa los detalles y confirma para modificar la póliza.',
    finalStepTitle: 'Confirmar Modificación',
    submitLabel: 'Modificar Póliza',
    successMessage: 'Póliza modificada exitosamente',
  },
};

// ✅ Labels optimizados para mobile (versiones más cortas)
export const ACTION_LABELS_MOBILE = {
  [PolicyInputAction.EMITIR]: {
    step1Title: 'Información del Producto',
    step1Description: 'Selecciona el producto, ingresa datos del asegurado y carga el contrato.',
    step2Title: 'Formulario de Emisión',
    step2Description: 'Completa los detalles para la emisión de la póliza.',
    step3Title: 'Confirmar Emisión',
    step3Description: 'Revisa y confirma para emitir la póliza.',
    finalStepTitle: 'Confirmar Emisión',
    submitLabel: 'Emitir Póliza',
    successMessage: 'Póliza emitida exitosamente',
  },
  [PolicyInputAction.COTIZAR]: {
    step1Title: 'Producto y Contrato',
    step1Description: 'Seleccione el producto, ingrese datos del asegurado y cargue el contrato.',
    step2Title: 'Formulario de Cotización',
    step2Description: 'Complete los detalles para la cotización de la póliza.',
    step3Title: 'Confirmar Cotización',
    step3Description: 'Revisa y confirma para generar la cotización.',
    finalStepTitle: 'Confirmar Cotización',
    submitLabel: 'Generar Cotización',
    successMessage: 'Cotización generada exitosamente',
  },
  [PolicyInputAction.RETOMAR]: {
    step1Title: 'Buscar Cotización',
    step1Description: 'Ingrese el número de cotización o seleccione de la lista.',
    step2Title: 'Formulario de Retoma',
    step2Description: 'Complete los detalles para retomar la cotización.',
    step3Title: 'Confirmar Retoma',
    step3Description: 'Revisa y confirma para retomar la cotización.',
    finalStepTitle: 'Confirmar Retoma',
    submitLabel: 'Retomar Cotización',
    successMessage: 'Cotización retomada exitosamente',
  },
  [PolicyInputAction.MODIFICAR]: {
    step1Title: 'Buscar Póliza',
    step1Description: 'Ingrese el número de póliza y seleccione el tipo de modificación.',
    step2Title: 'Formulario de Modificación',
    step2Description: 'Complete los detalles para modificar la póliza.',
    step3Title: 'Confirmar Modificación',
    step3Description: 'Revisa y confirma para modificar la póliza.',
    finalStepTitle: 'Confirmar Modificación',
    submitLabel: 'Modificar Póliza',
    successMessage: 'Póliza modificada exitosamente',
  },
};

// ✅ Tipos de modificación para pólizas
export const MODIFICATION_TYPES_OPTIONS = [
  { label: 'Cambio de Beneficiario', value: 'cambio-beneficiario' },
  { label: 'Aumento de Valor Asegurado', value: 'aumento-valor' },
  { label: 'Reducción de Valor Asegurado', value: 'reduccion-valor' },
  { label: 'Extensión de Vigencia', value: 'extension-vigencia' },
  { label: 'Cambio de Cobertura', value: 'cambio-cobertura' },
  { label: 'Actualización de Datos', value: 'actualizacion-datos' },
];
