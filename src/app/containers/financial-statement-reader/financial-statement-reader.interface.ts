// ✅ Financial Statement Reader Interfaces
// Interfaces para el análisis de estados financieros con IA

export interface IUploadedFinancialStatement {
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

export interface IFinancialData {
  period: string;
  currency: string;
  assets: {
    current: {
      cash: number;
      accountsReceivable: number;
      inventory: number;
      shortTermInvestments: number;
      other: number;
      total: number;
    };
    nonCurrent: {
      propertyPlantEquipment: number;
      intangibleAssets: number;
      longTermInvestments: number;
      other: number;
      total: number;
    };
    total: number;
  };
  liabilities: {
    current: {
      accountsPayable: number;
      shortTermDebt: number;
      accruedLiabilities: number;
      other: number;
      total: number;
    };
    nonCurrent: {
      longTermDebt: number;
      deferredTax: number;
      other: number;
      total: number;
    };
    total: number;
  };
  equity: {
    shareCapital: number;
    retainedEarnings: number;
    other: number;
    total: number;
  };
  income: {
    revenue: number;
    costOfGoodsSold: number;
    grossProfit: number;
    operatingExpenses: number;
    operatingIncome: number;
    interestExpense: number;
    taxExpense: number;
    netIncome: number;
  };
}

export interface IFinancialRatios {
  liquidity: {
    currentRatio: number;
    quickRatio: number;
    cashRatio: number;
  };
  leverage: {
    debtToEquity: number;
    debtToAssets: number;
    interestCoverage: number;
  };
  profitability: {
    grossProfitMargin: number;
    operatingMargin: number;
    netProfitMargin: number;
    returnOnAssets: number;
    returnOnEquity: number;
  };
  efficiency: {
    assetTurnover: number;
    inventoryTurnover: number;
    receivablesTurnover: number;
  };
}

export interface IRiskAssessment {
  creditRating: 'AAA' | 'AA' | 'A' | 'BBB' | 'BB' | 'B' | 'CCC' | 'CC' | 'C';
  riskLevel: 'Muy Bajo' | 'Bajo' | 'Medio' | 'Alto' | 'Muy Alto';
  score: number; // 0-100
  factors: Array<{
    category: 'Liquidez' | 'Solvencia' | 'Rentabilidad' | 'Eficiencia' | 'Tendencias';
    description: string;
    impact: 'Positivo' | 'Neutral' | 'Negativo';
    weight: number;
  }>;
  recommendations: string[];
  alerts: Array<{
    type: 'warning' | 'error' | 'info';
    message: string;
    severity: 'Baja' | 'Media' | 'Alta' | 'Crítica';
  }>;
}

export interface IInsuranceRecommendation {
  id: string;
  productType:
    | 'Seguro de Responsabilidad Civil'
    | 'Seguro de Bienes'
    | 'Seguro de Vida Empresarial'
    | 'Seguro de Interrupción de Negocios';
  priority: 'Alta' | 'Media' | 'Baja';
  recommendedCoverage: number;
  justification: string;
  basedOnRatios: string[];
  estimatedPremium: {
    min: number;
    max: number;
    recommended: number;
  };
  benefits: string[];
  conditions: string[];
}

export interface IFinancialAnalysisResults {
  fileInfo: IUploadedFinancialStatement;
  extractedData: IFinancialData;
  ratios: IFinancialRatios;
  riskAssessment: IRiskAssessment;
  recommendations: IInsuranceRecommendation[];
  confidence: number;
  processingTime: number;
  warnings: string[];
  companyInfo?: {
    name?: string;
    industry?: string;
    employees?: number;
    established?: string;
  };
}

export enum ProcessingStatus {
  IDLE = 'idle',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  ERROR = 'error',
}

// ✅ Configuración de archivos
export const FINANCIAL_FILE_CONFIG = {
  maxSizeBytes: 10 * 1024 * 1024, // 10MB
  maxSizeMB: 10,
  allowedTypes: [
    'application/pdf',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/csv',
  ],
};

export const ACCEPTED_FINANCIAL_FILE_TYPES = ['.pdf', '.xls', '.xlsx', '.csv'];

export const INITIAL_FINANCIAL_STATE: IUploadedFinancialStatement = {
  id: '',
  name: '',
  size: 0,
  type: '',
  lastModified: 0,
  uploadedAt: '',
  status: ProcessingStatus.IDLE,
  progress: 0,
};

// ✅ Datos mock para desarrollo
export const MOCK_FINANCIAL_DATA: IFinancialData = {
  period: '2023',
  currency: 'COP',
  assets: {
    current: {
      cash: 500000000,
      accountsReceivable: 750000000,
      inventory: 300000000,
      shortTermInvestments: 100000000,
      other: 50000000,
      total: 1700000000,
    },
    nonCurrent: {
      propertyPlantEquipment: 2500000000,
      intangibleAssets: 200000000,
      longTermInvestments: 300000000,
      other: 100000000,
      total: 3100000000,
    },
    total: 4800000000,
  },
  liabilities: {
    current: {
      accountsPayable: 400000000,
      shortTermDebt: 200000000,
      accruedLiabilities: 150000000,
      other: 50000000,
      total: 800000000,
    },
    nonCurrent: {
      longTermDebt: 1200000000,
      deferredTax: 100000000,
      other: 50000000,
      total: 1350000000,
    },
    total: 2150000000,
  },
  equity: {
    shareCapital: 1500000000,
    retainedEarnings: 1000000000,
    other: 150000000,
    total: 2650000000,
  },
  income: {
    revenue: 5000000000,
    costOfGoodsSold: 3000000000,
    grossProfit: 2000000000,
    operatingExpenses: 1200000000,
    operatingIncome: 800000000,
    interestExpense: 120000000,
    taxExpense: 204000000,
    netIncome: 476000000,
  },
};

export const MOCK_FINANCIAL_RATIOS: IFinancialRatios = {
  liquidity: {
    currentRatio: 2.13,
    quickRatio: 1.75,
    cashRatio: 0.63,
  },
  leverage: {
    debtToEquity: 0.81,
    debtToAssets: 0.45,
    interestCoverage: 6.67,
  },
  profitability: {
    grossProfitMargin: 40.0,
    operatingMargin: 16.0,
    netProfitMargin: 9.5,
    returnOnAssets: 9.9,
    returnOnEquity: 18.0,
  },
  efficiency: {
    assetTurnover: 1.04,
    inventoryTurnover: 10.0,
    receivablesTurnover: 6.67,
  },
};

export const MOCK_RISK_ASSESSMENT: IRiskAssessment = {
  creditRating: 'A',
  riskLevel: 'Bajo',
  score: 78,
  factors: [
    {
      category: 'Liquidez',
      description: 'Ratios de liquidez sólidos, capacidad de pago a corto plazo adecuada',
      impact: 'Positivo',
      weight: 25,
    },
    {
      category: 'Rentabilidad',
      description: 'Márgenes de rentabilidad saludables y consistentes',
      impact: 'Positivo',
      weight: 30,
    },
    {
      category: 'Solvencia',
      description: 'Nivel de endeudamiento controlado pero mejorable',
      impact: 'Neutral',
      weight: 20,
    },
  ],
  recommendations: [
    'Mantener niveles actuales de liquidez',
    'Considerar reducción gradual de deuda a largo plazo',
    'Evaluar oportunidades de mejora en eficiencia operativa',
  ],
  alerts: [
    {
      type: 'info',
      message: 'La empresa muestra indicadores financieros estables',
      severity: 'Baja',
    },
    {
      type: 'warning',
      message: 'El ratio de endeudamiento podría optimizarse',
      severity: 'Media',
    },
  ],
};

export const MOCK_INSURANCE_RECOMMENDATIONS: IInsuranceRecommendation[] = [
  {
    id: 'rec_liability_001',
    productType: 'Seguro de Responsabilidad Civil',
    priority: 'Alta',
    recommendedCoverage: 2000000000,
    justification:
      'Basado en los activos totales y el volumen de operaciones, se recomienda cobertura amplia',
    basedOnRatios: ['Total de Activos: $4.8B COP', 'Ingresos Anuales: $5.0B COP'],
    estimatedPremium: {
      min: 12000000,
      max: 18000000,
      recommended: 15000000,
    },
    benefits: [
      'Protección contra demandas por daños a terceros',
      'Cobertura de gastos legales y de defensa',
      'Tranquilidad operacional',
    ],
    conditions: [
      'Implementación de protocolos de seguridad',
      'Capacitación continua del personal',
      'Mantenimiento de certificaciones de calidad',
    ],
  },
  {
    id: 'rec_property_001',
    productType: 'Seguro de Bienes',
    priority: 'Alta',
    recommendedCoverage: 2500000000,
    justification:
      'Proteger la inversión en activos fijos que representa el 52% del total de activos',
    basedOnRatios: ['Propiedad, Planta y Equipo: $2.5B COP', 'Ratio de Activos Fijos: 52%'],
    estimatedPremium: {
      min: 8000000,
      max: 12500000,
      recommended: 10000000,
    },
    benefits: [
      'Cobertura contra incendio, robo y desastres naturales',
      'Protección de maquinaria y equipos',
      'Cobertura de pérdida de contenidos',
    ],
    conditions: [
      'Sistemas de seguridad y alarmas',
      'Mantenimiento preventivo documentado',
      'Pólizas de seguridad actualizadas',
    ],
  },
  {
    id: 'rec_business_001',
    productType: 'Seguro de Interrupción de Negocios',
    priority: 'Media',
    recommendedCoverage: 800000000,
    justification: 'Proteger el ingreso operacional en caso de interrupciones no planificadas',
    basedOnRatios: ['Ingreso Operacional: $800M COP', 'Margen Operacional: 16%'],
    estimatedPremium: {
      min: 6000000,
      max: 9000000,
      recommended: 7500000,
    },
    benefits: [
      'Cobertura de pérdida de ingresos',
      'Gastos adicionales durante interrupción',
      'Continuidad del negocio',
    ],
    conditions: [
      'Plan de continuidad de negocio documentado',
      'Backup de sistemas críticos',
      'Proveedores alternativos identificados',
    ],
  },
];
