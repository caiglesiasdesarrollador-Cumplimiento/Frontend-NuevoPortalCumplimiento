// ✅ Enum para estados del procesamiento
export enum ProcessingStatus {
  IDLE = 'idle',
  UPLOADING = 'uploading',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  ERROR = 'error',
}

// ✅ Interface para archivo subido
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
}

// ✅ Interface para datos extraídos del contrato
export interface IExtractedContractData {
  // Información general
  numeroContrato: string;
  fechaContrato: string;
  objetoContrato: string;
  valorContrato: number;
  moneda: string;

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

  // Fechas importantes
  fechaInicio: string;
  fechaTerminacion: string;
  plazoEjecucion: number; // en días

  // Garantías requeridas
  garantias: {
    cumplimiento: {
      requerida: boolean;
      porcentaje: number;
      valor: number;
    };
    calidadServicio: {
      requerida: boolean;
      porcentaje: number;
      valor: number;
    };
    responsabilidadCivil: {
      requerida: boolean;
      valor: number;
    };
    buenManejoInversion: {
      requerida: boolean;
      porcentaje: number;
      valor: number;
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
}

// ✅ Interface para sugerencias de pólizas
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

// ✅ Interface para resultados del análisis
export interface IContractAnalysisResults {
  fileInfo: IUploadedFile;
  extractedData: IExtractedContractData;
  suggestions: IPolicySuggestion[];
  confidence: number; // Porcentaje de confianza en la extracción
  processingTime: number; // Tiempo en segundos
  warnings: string[];
}

// ✅ Datos mock para simulación
export const MOCK_EXTRACTED_DATA: IExtractedContractData = {
  numeroContrato: 'CONT-2024-456',
  fechaContrato: '2024-01-15',
  objetoContrato: 'Construcción de edificio residencial de 10 pisos en Bogotá D.C.',
  valorContrato: 2500000000,
  moneda: 'COP',

  contratante: {
    nombre: 'Inmobiliaria Constructora ABC S.A.S',
    nit: '900123456-7',
    representanteLegal: 'María Elena Rodríguez',
    direccion: 'Carrera 15 #123-45, Bogotá D.C.',
    telefono: '+57 1 2345678',
    email: 'contacto@constructoraabc.com',
  },

  contratista: {
    nombre: 'Ingeniería y Construcciones DEF Ltda',
    nit: '800987654-3',
    representanteLegal: 'Carlos Alberto Martínez',
    direccion: 'Calle 80 #67-89, Bogotá D.C.',
    telefono: '+57 1 9876543',
    email: 'gerencia@ingenieriadef.com',
  },

  fechaInicio: '2024-02-01',
  fechaTerminacion: '2025-08-01',
  plazoEjecucion: 545,

  garantias: {
    cumplimiento: {
      requerida: true,
      porcentaje: 20,
      valor: 500000000,
    },
    calidadServicio: {
      requerida: true,
      porcentaje: 15,
      valor: 375000000,
    },
    responsabilidadCivil: {
      requerida: true,
      valor: 300000000,
    },
    buenManejoInversion: {
      requerida: false,
      porcentaje: 0,
      valor: 0,
    },
  },

  riesgosIdentificados: [
    'Riesgo sísmico en zona de construcción',
    'Variaciones en precios de materiales',
    'Retrasos por condiciones climáticas',
    'Riesgo de accidentes laborales en altura',
    'Posibles hallazgos arqueológicos',
  ],

  clausulasRelevantes: [
    {
      titulo: 'Cláusula de Garantías',
      descripcion:
        'El contratista deberá constituir garantías de cumplimiento del 20% y calidad del servicio del 15%',
      riesgoAsociado: 'Incumplimiento de obligaciones contractuales',
    },
    {
      titulo: 'Cláusula de Responsabilidad Civil',
      descripcion: 'Cobertura mínima de $300.000.000 por daños a terceros',
      riesgoAsociado: 'Daños a terceros durante la construcción',
    },
    {
      titulo: 'Cláusula de Fuerza Mayor',
      descripcion: 'Eventos de fuerza mayor que pueden afectar la ejecución del contrato',
      riesgoAsociado: 'Eventos externos fuera del control de las partes',
    },
  ],
};

export const MOCK_POLICY_SUGGESTIONS: IPolicySuggestion[] = [
  {
    id: 'sug001',
    tipoPoliza: 'Cumplimiento de Contrato',
    descripcion: 'Garantía de cumplimiento por el 20% del valor del contrato',
    valorSugerido: 500000000,
    porcentaje: 20,
    justificacion: 'Requerido explícitamente en la cláusula de garantías del contrato',
    prioridad: 'alta',
    obligatoria: true,
  },
  {
    id: 'sug002',
    tipoPoliza: 'Calidad del Servicio',
    descripcion: 'Garantía de calidad del servicio por el 15% del valor del contrato',
    valorSugerido: 375000000,
    porcentaje: 15,
    justificacion: 'Requerido por la naturaleza de construcción del proyecto',
    prioridad: 'alta',
    obligatoria: true,
  },
  {
    id: 'sug003',
    tipoPoliza: 'Responsabilidad Civil',
    descripcion: 'Cobertura por daños a terceros durante la construcción',
    valorSugerido: 300000000,
    justificacion: 'Construcción en zona urbana con alto riesgo de daños a terceros',
    prioridad: 'alta',
    obligatoria: true,
  },
  {
    id: 'sug004',
    tipoPoliza: 'Todo Riesgo Construcción',
    descripcion: 'Cobertura adicional para riesgos específicos de construcción',
    valorSugerido: 150000000,
    justificacion: 'Recomendado por los riesgos sísmicos y climáticos identificados',
    prioridad: 'media',
    obligatoria: false,
  },
];

// ✅ Estados iniciales
export const INITIAL_FILE_STATE: IUploadedFile = {
  id: '',
  name: '',
  size: 0,
  type: '',
  lastModified: 0,
  uploadedAt: '',
  status: ProcessingStatus.IDLE,
  progress: 0,
};

// ✅ Tipos de archivo admitidos
export const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export const ACCEPTED_FILE_EXTENSIONS = ['.pdf', '.doc', '.docx'];

// ✅ Configuración de límites
export const FILE_UPLOAD_CONFIG = {
  maxSizeBytes: 10 * 1024 * 1024, // 10MB
  maxSizeMB: 10,
  processingTimeoutMs: 30000, // 30 segundos
  allowedTypes: ACCEPTED_FILE_TYPES,
};
