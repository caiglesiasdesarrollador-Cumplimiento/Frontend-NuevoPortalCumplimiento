// ✅ Third Party Validation Interfaces
// Interfaces para validación de terceros usando APIs externas

export interface IThirdPartyInfo {
  id: string;
  documentType: 'CC' | 'CE' | 'NIT' | 'Pasaporte' | 'TI';
  documentNumber: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  entityType: 'Persona Natural' | 'Persona Jurídica';
  country: string;
  email?: string;
  phone?: string;
  address?: string;
  createdAt: string;
  status: ValidationStatus;
}

export interface IValidationResults {
  thirdPartyInfo: IThirdPartyInfo;
  documentValidation: IDocumentValidation;
  controlListsValidation: IControlListsValidation;
  commercialValidation?: ICommercialValidation;
  riskAssessment: IRiskAssessment;
  recommendations: IRecommendation[];
  overallScore: number;
  confidence: number;
  processingTime: number;
  warnings: string[];
  completedAt: string;
}

export interface IDocumentValidation {
  isValid: boolean;
  documentExists: boolean;
  documentStatus: 'Vigente' | 'Vencido' | 'Suspendido' | 'Cancelado' | 'No Encontrado';
  issueDate?: string;
  expirationDate?: string;
  issuingAuthority?: string;
  verificationSource: string;
  additionalInfo?: {
    [key: string]: any;
  };
  score: number;
  messages: string[];
}

export interface IControlListsValidation {
  ofacList: IListCheckResult;
  unList: IListCheckResult;
  pepList: IListCheckResult;
  sanctionsList: IListCheckResult;
  criminalList: IListCheckResult;
  overallRisk: 'Bajo' | 'Medio' | 'Alto' | 'Crítico';
  totalMatches: number;
  recommendedAction: 'Aprobar' | 'Revisar' | 'Rechazar' | 'Investigar';
}

export interface IListCheckResult {
  checked: boolean;
  matches: Array<{
    name: string;
    similarity: number;
    listType: string;
    description: string;
    dateAdded?: string;
    source: string;
    riskLevel: 'Bajo' | 'Medio' | 'Alto' | 'Crítico';
  }>;
  score: number;
  risk: 'Sin Riesgo' | 'Bajo' | 'Medio' | 'Alto' | 'Crítico';
}

export interface ICommercialValidation {
  companyExists: boolean;
  companyStatus: 'Activa' | 'Inactiva' | 'Liquidación' | 'Disuelta' | 'No Encontrada';
  registrationDate?: string;
  lastUpdate?: string;
  economicActivity?: string;
  employeeCount?: number;
  revenue?: number;
  assets?: number;
  creditRating?: string;
  paymentHistory?: {
    onTimePayments: number;
    latePayments: number;
    defaults: number;
    averagePaymentDays: number;
  };
  score: number;
  verificationSource: string;
}

export interface IRiskAssessment {
  overallRiskLevel: 'Muy Bajo' | 'Bajo' | 'Medio' | 'Alto' | 'Muy Alto' | 'Crítico';
  riskScore: number; // 0-100
  factors: Array<{
    category: 'Documentación' | 'Listas de Control' | 'Comercial' | 'Geográfico' | 'Histórico';
    description: string;
    impact: 'Positivo' | 'Neutral' | 'Negativo' | 'Crítico';
    weight: number;
    score: number;
  }>;
  recommendations: string[];
  requiredActions: Array<{
    action: string;
    priority: 'Baja' | 'Media' | 'Alta' | 'Crítica';
    deadline?: string;
    responsible?: string;
  }>;
}

export interface IRecommendation {
  id: string;
  type: 'Seguros' | 'Procedimientos' | 'Monitoreo' | 'Documentación' | 'Legal';
  title: string;
  description: string;
  priority: 'Baja' | 'Media' | 'Alta' | 'Crítica';
  riskMitigation: string;
  implementationSteps: string[];
  estimatedCost?: {
    min: number;
    max: number;
    currency: string;
  };
  timeline: string;
  responsibleArea: string;
}

export enum ValidationStatus {
  IDLE = 'idle',
  VALIDATING = 'validating',
  COMPLETED = 'completed',
  ERROR = 'error',
  PARTIAL = 'partial',
}

// ✅ Configuraciones por defecto
export const DOCUMENT_TYPES = [
  { value: 'CC', label: 'Cédula de Ciudadanía' },
  { value: 'CE', label: 'Cédula de Extranjería' },
  { value: 'NIT', label: 'NIT' },
  { value: 'Pasaporte', label: 'Pasaporte' },
  { value: 'TI', label: 'Tarjeta de Identidad' },
];

export const ENTITY_TYPES = [
  { value: 'Persona Natural', label: 'Persona Natural' },
  { value: 'Persona Jurídica', label: 'Persona Jurídica' },
];

export const COUNTRIES = [
  { value: 'CO', label: 'Colombia' },
  { value: 'US', label: 'Estados Unidos' },
  { value: 'MX', label: 'México' },
  { value: 'BR', label: 'Brasil' },
  { value: 'AR', label: 'Argentina' },
  { value: 'CL', label: 'Chile' },
  { value: 'PE', label: 'Perú' },
  { value: 'EC', label: 'Ecuador' },
  { value: 'VE', label: 'Venezuela' },
  { value: 'PA', label: 'Panamá' },
];

export const INITIAL_THIRD_PARTY_STATE: IThirdPartyInfo = {
  id: '',
  documentType: 'CC',
  documentNumber: '',
  entityType: 'Persona Natural',
  country: 'CO',
  createdAt: '',
  status: ValidationStatus.IDLE,
};

// ✅ Datos mock para desarrollo
export const MOCK_VALIDATION_RESULTS: IValidationResults = {
  thirdPartyInfo: {
    id: 'tp_001',
    documentType: 'CC',
    documentNumber: '12345678',
    firstName: 'Juan Carlos',
    lastName: 'Rodríguez Pérez',
    entityType: 'Persona Natural',
    country: 'CO',
    email: 'juan.rodriguez@email.com',
    phone: '+57 300 123 4567',
    address: 'Carrera 15 # 93-07, Bogotá',
    createdAt: new Date().toISOString(),
    status: ValidationStatus.COMPLETED,
  },
  documentValidation: {
    isValid: true,
    documentExists: true,
    documentStatus: 'Vigente',
    issueDate: '2015-03-15',
    expirationDate: '2025-03-15',
    issuingAuthority: 'Registraduría Nacional',
    verificationSource: 'RNEC - Registro Nacional',
    score: 95,
    messages: ['Documento válido y vigente', 'Información consistente'],
  },
  controlListsValidation: {
    ofacList: {
      checked: true,
      matches: [],
      score: 100,
      risk: 'Sin Riesgo',
    },
    unList: {
      checked: true,
      matches: [],
      score: 100,
      risk: 'Sin Riesgo',
    },
    pepList: {
      checked: true,
      matches: [
        {
          name: 'Juan Carlos Rodríguez',
          similarity: 65,
          listType: 'PEP',
          description: 'Ex-concejal municipal (2010-2014)',
          dateAdded: '2014-12-01',
          source: 'Lista PEP Nacional',
          riskLevel: 'Bajo',
        },
      ],
      score: 85,
      risk: 'Bajo',
    },
    sanctionsList: {
      checked: true,
      matches: [],
      score: 100,
      risk: 'Sin Riesgo',
    },
    criminalList: {
      checked: true,
      matches: [],
      score: 100,
      risk: 'Sin Riesgo',
    },
    overallRisk: 'Bajo',
    totalMatches: 1,
    recommendedAction: 'Revisar',
  },
  commercialValidation: {
    companyExists: false,
    companyStatus: 'No Encontrada',
    score: 0,
    verificationSource: 'No Aplica - Persona Natural',
  },
  riskAssessment: {
    overallRiskLevel: 'Bajo',
    riskScore: 78,
    factors: [
      {
        category: 'Documentación',
        description: 'Documento válido y verificado correctamente',
        impact: 'Positivo',
        weight: 30,
        score: 95,
      },
      {
        category: 'Listas de Control',
        description: 'Coincidencia en lista PEP con bajo riesgo',
        impact: 'Neutral',
        weight: 40,
        score: 85,
      },
      {
        category: 'Geográfico',
        description: 'País con riesgo medio según clasificación internacional',
        impact: 'Neutral',
        weight: 20,
        score: 70,
      },
    ],
    recommendations: [
      'Monitoreo periódico debido a condición PEP histórica',
      'Documentar justificación comercial de la relación',
      'Revisión anual de la relación comercial',
    ],
    requiredActions: [
      {
        action: 'Obtener declaración de origen de fondos',
        priority: 'Media',
        deadline: '2024-01-30',
        responsible: 'Oficial de Cumplimiento',
      },
      {
        action: 'Documentar aprobación por Comité de Riesgos',
        priority: 'Alta',
        deadline: '2024-01-15',
        responsible: 'Gerente de Riesgos',
      },
    ],
  },
  recommendations: [
    {
      id: 'rec_001',
      type: 'Monitoreo',
      title: 'Monitoreo Continuo PEP',
      description: 'Implementar monitoreo continuo debido a la condición PEP histórica',
      priority: 'Media',
      riskMitigation: 'Reduce el riesgo de reputación y cumplimiento',
      implementationSteps: [
        'Configurar alertas automáticas',
        'Revisar transacciones mensualmente',
        'Actualizar perfil de riesgo trimestralmente',
      ],
      timeline: '30 días',
      responsibleArea: 'Área de Cumplimiento',
    },
    {
      id: 'rec_002',
      type: 'Seguros',
      title: 'Seguro de Responsabilidad Civil Profesional',
      description: 'Considerar seguro adicional por relación con PEP',
      priority: 'Baja',
      riskMitigation: 'Protección contra riesgos reputacionales',
      implementationSteps: [
        'Evaluar cobertura actual',
        'Solicitar cotización especializada',
        'Revisar términos y condiciones',
      ],
      estimatedCost: {
        min: 5000000,
        max: 15000000,
        currency: 'COP',
      },
      timeline: '60 días',
      responsibleArea: 'Área de Seguros',
    },
  ],
  overallScore: 78,
  confidence: 92,
  processingTime: 4.7,
  warnings: [
    'Coincidencia en lista PEP requiere monitoreo adicional',
    'Verificar actualización de datos cada 6 meses',
  ],
  completedAt: new Date().toISOString(),
};

// ✅ Configuraciones de validación
export const VALIDATION_CONFIG = {
  timeoutSeconds: 30,
  maxRetries: 3,
  enabledValidations: {
    document: true,
    ofac: true,
    un: true,
    pep: true,
    sanctions: true,
    criminal: true,
    commercial: true,
  },
  scoringWeights: {
    document: 30,
    controlLists: 40,
    commercial: 20,
    geographic: 10,
  },
};
