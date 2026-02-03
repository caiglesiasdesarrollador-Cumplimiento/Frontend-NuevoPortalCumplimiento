/**
 * ✅ RF-009: Interfaces completas para Procesamiento del Contrato con IA
 * Incluye todos los campos requeridos según especificación RF-009
 */

// ========================================
// ENUMS
// ========================================

export enum ProcessingStatus {
  IDLE = 'idle',
  UPLOADING = 'uploading',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  ERROR = 'error',
  TIMEOUT = 'timeout',
}

export enum EtapaContrato {
  PRECONTRACTUAL = 'precontractual',
  CONTRACTUAL = 'contractual',
}

export enum TipoArchivo {
  CONTRATO = 'CONTRATO',
  PLIEGO_LICITATORIO = 'PLIEGO_LICITATORIO',
  OFERTA_MERCANTIL = 'OFERTA_MERCANTIL',
}

export enum EstadoArchivo {
  PE = 'PE', // Pendiente
  TE = 'TE', // Terminado, cargado en el Core
}

export enum Asegurabilidad {
  SI = 'Si',
  NO = 'No',
}

// ========================================
// INTERFACES - Códigos Tronador (RF-009 Regla 9.2)
// ========================================

/**
 * ✅ RF-009 Regla 9.2: Código Tronador para campos retornados por IA
 */
export interface ICodigoTronador {
  codigo: string;
  descripcion: string;
  valido: boolean; // Validado contra catálogo
}

// ========================================
// INTERFACES - Datos Extraídos del Contrato
// ========================================

/**
 * ✅ RF-009 Regla 9.2: Datos extraídos con códigos Tronador
 */
export interface IExtractedContractData {
  // Información general
  numeroContrato: string;
  fechaContrato: string;
  objetoContrato: string;
  valorContrato: number;

  // ✅ RF-009 Regla 9.2: Moneda con código Tronador
  moneda: ICodigoTronador;

  // ✅ RF-009 Regla 9.2: Tipo documento con código Tronador
  tipoDocumento: ICodigoTronador;

  // ✅ RF-009 Regla 9.2: Ubicación con códigos Tronador
  departamento: ICodigoTronador;
  municipio: ICodigoTronador;
  ciudad: ICodigoTronador;

  // ✅ RF-009 Regla 9.2: Tipo contrato con código Tronador
  tipoContrato: ICodigoTronador;

  // ✅ RF-009 Regla 9.9: Etapa del contrato
  etapaContrato: EtapaContrato;

  // ✅ RF-009 Regla 9.5: Asegurabilidad
  asegurabilidad: Asegurabilidad;
  motivoAsegurabilidad?: string;

  // Partes del contrato
  contratante: {
    nombre: string;
    nit: string;
    representanteLegal: string;
    direccion: string;
    telefono: string;
    email: string;
  };

  contratista: {
    nombre: string;
    nit: string;
    representanteLegal: string;
    direccion: string;
    telefono: string;
    email: string;
  };

  // Fechas importantes (validadas según RF-009 Regla 9.8)
  fechaInicio: string;
  fechaTerminacion: string;
  plazoEjecucion: number; // en días
  fechaInicioValida: boolean; // RF-009 Regla 9.8
  fechaTerminacionValida: boolean; // RF-009 Regla 9.8

  // ✅ RF-009 Regla 9.2: Coberturas/Garantías con códigos Tronador
  coberturas_o_garantias: {
    cumplimiento: {
      requerida: boolean;
      porcentaje: number;
      valor: number;
      codigoTronador: ICodigoTronador;
    };
    calidadServicio: {
      requerida: boolean;
      porcentaje: number;
      valor: number;
      codigoTronador: ICodigoTronador;
    };
    responsabilidadCivil: {
      requerida: boolean;
      valor: number;
      codigoTronador: ICodigoTronador;
    };
    buenManejoInversion: {
      requerida: boolean;
      porcentaje: number;
      valor: number;
      codigoTronador: ICodigoTronador;
    };
  };

  // Análisis de riesgos
  riesgosIdentificados: string[];

  // Cláusulas relevantes
  clausulasRelevantes: {
    titulo: string;
    descripcion: string;
    riesgoAsociado: string;
  }[];

  // ✅ RF-009 Regla 9.8: Validación de formato
  datosInvalidos: {
    fechas: string[];
    numeros: string[];
  };

  // ✅ RF-009 Regla 9.10: Datos no consistentes con catálogos
  datosInconsistentes: {
    moneda: boolean;
    tipoContrato: boolean;
    departamento: boolean;
    municipio: boolean;
    ciudad: boolean;
  };
}

// ========================================
// INTERFACES - WebSocket (RF-009 Regla 9.3)
// ========================================

/**
 * ✅ RF-009 Regla 9.3: Mensaje WebSocket para estado en tiempo real
 */
export interface IWebSocketMessage {
  tipo: 'procesando' | 'finalizado' | 'error' | 'timeout';
  mensaje: string;
  progreso?: number; // 0-100
  datos?: Partial<IExtractedContractData>;
  error?: string;
}

// ========================================
// INTERFACES - Almacenamiento S3/FileNet (RF-009 Regla 9.6)
// ========================================

/**
 * ✅ RF-009 Regla 9.6: Metadatos para almacenamiento
 */
export interface IFileStorageMetadata {
  idMongo: string;
  seccion: string; // '4' - Cumplimiento
  producto: string; // '440', '450', '455'
  tipoDocTomador: string; // 'NT', 'CC', 'CE'
  nroDocTomador: string;
  tipoArchivo: TipoArchivo;
  fecha: string; // YYYYMMDD
  estado: EstadoArchivo;
  formato: string; // 'PDF', 'DOC', 'DOCX'
  numeroPoliza?: string; // Para FileNet
}

/**
 * ✅ RF-009 Regla 9.6: Resultado de almacenamiento
 */
export interface IFileStorageResult {
  s3Key: string;
  s3Url?: string;
  fileNetId?: string;
  fileNetUrl?: string;
  success: boolean;
  error?: string;
}

// ========================================
// INTERFACES - Respuesta del Servicio IA
// ========================================

/**
 * ✅ RF-009: Respuesta completa del servicio IA Lector de Contratos
 */
export interface IContractAIResponse {
  success: boolean;
  asegurabilidad: Asegurabilidad;
  motivoAsegurabilidad?: string;
  datosExtraidos: IExtractedContractData;
  tiempoProcesamiento: number; // segundos
  confianza: number; // 0-100
  errores?: string[];
  warnings?: string[];
}

// ========================================
// INTERFACES - Request del Servicio IA
// ========================================

/**
 * ✅ RF-009: Request para procesar contrato con IA
 */
export interface IContractAIRequest {
  archivo: File;
  metadata: IFileStorageMetadata;
  producto: string; // '440', '450', '455'
}

// ========================================
// INTERFACES - Archivo Subido
// ========================================

export interface IUploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  lastModified: number;
  uploadedAt: string;
  status: ProcessingStatus;
  progress: number;
  errorMessage?: string;
  metadata?: IFileStorageMetadata;
  storageResult?: IFileStorageResult;
  procesamientoBloqueado?: boolean; // RF-009 Regla 9.1
}

// ========================================
// INTERFACES - Sugerencias de Pólizas
// ========================================

export interface IPolicySuggestion {
  id: string;
  tipoPoliza: string;
  descripcion: string;
  valorSugerido: number;
  porcentaje?: number;
  justificacion: string;
  prioridad: 'alta' | 'media' | 'baja';
  obligatoria: boolean;
}

// ========================================
// INTERFACES - Resultados del Análisis
// ========================================

export interface IContractAnalysisResults {
  fileInfo: IUploadedFile;
  extractedData: IExtractedContractData;
  suggestions: IPolicySuggestion[];
  confidence: number;
  processingTime: number;
  warnings: string[];
  asegurabilidadValidada: boolean; // RF-009 Regla 9.5
}

// ========================================
// CONSTANTES
// ========================================

export const INITIAL_FILE_STATE: IUploadedFile = {
  id: '',
  name: '',
  size: 0,
  type: '',
  lastModified: 0,
  uploadedAt: '',
  status: ProcessingStatus.IDLE,
  progress: 0,
  procesamientoBloqueado: false,
};

// ✅ RF-008 Regla 8.2: Tipos MIME soportados según políticas FileNet
export const ACCEPTED_FILE_TYPES = [
  'application/pdf', // PDF
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLSX
];

// ✅ RF-008 Regla 8.2: Extensiones soportadas según políticas FileNet
export const ACCEPTED_FILE_EXTENSIONS = ['.pdf', '.docx', '.xlsx'];

export const FILE_UPLOAD_CONFIG = {
  maxSizeBytes: 30 * 1024 * 1024, // ✅ RF-008 Regla 8.2: 30MB según políticas FileNet
  maxSizeMB: 30, // ✅ RF-008 Regla 8.2: 30MB según políticas FileNet
  processingTimeoutMs: 30000, // 30 segundos (RF-009 Regla 9.7)
  allowedTypes: ACCEPTED_FILE_TYPES,
};

// ========================================
// MENSAJES RF-009
// ========================================

export const RF009_MESSAGES = {
  ERROR_PROCESAMIENTO:
    'NO PUDIMOS PROCESAR LA INFORMACIÓN AUTOMÁTICAMENTE. PUEDES CONTINUAR EL PROCESO INGRESANDO LOS DATOS MANUALMENTE.',
  NO_ASEGURABLE: 'ESTE CONTRATO NO ES ASEGURABLE. NO ES POSIBLE CONTINUAR CON EL PROCESO.',
  PROCESANDO: 'Procesando...',
  FINALIZADO: 'Finalizado',
  TIMEOUT:
    'El procesamiento está tomando más tiempo del esperado. Puedes continuar ingresando los datos manualmente.',
} as const;
