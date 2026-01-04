// ✅ Interfaces para Credit Limit Validation - Patrón Settings

// ✅ Tipos de cliente
export enum CustomerType {
  INDIVIDUAL = 'individual',
  COMPANY = 'company',
}

// ✅ Tipos de documento
export enum DocumentType {
  CC = 'cc',
  CE = 'ce',
  NIT = 'nit',
  PASSPORT = 'passport',
}

// ✅ Frecuencia de ingresos
export enum IncomeFrequency {
  MONTHLY = 'monthly',
  BIWEEKLY = 'biweekly',
  WEEKLY = 'weekly',
  ANNUAL = 'annual',
}

// ✅ Estado de validación
export enum ValidationStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  REQUIRES_REVIEW = 'requires_review',
}

// ✅ Información del cliente para validación
export interface ICreditLimitRequest {
  // Información básica
  customerType: CustomerType;
  documentType: DocumentType;
  documentNumber: string;
  fullName: string;

  // Información financiera
  monthlyIncome: number;
  requestedLimit: number;
}

// ✅ Resultado de la validación
export interface ICreditLimitResult {
  requestId: string;
  customerId: string;
  customerInfo: ICreditLimitRequest;

  // Resultado de la validación
  status: ValidationStatus;
  approvedLimit: number;
  interestRate: number;

  // Análisis de riesgo
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'very_high';
  creditScore: number;

  // Detalles del análisis
  debtToIncomeRatio: number;
  paymentCapacity: number;
  recommendations: string[];
  warnings: string[];

  // Información del proceso
  processedAt: string;
  processedBy: string;
  reviewRequired: boolean;
  expiresAt: string;
}

// ✅ Opciones para dropdowns
export const CUSTOMER_TYPE_OPTIONS = [
  { label: 'Persona Natural', value: CustomerType.INDIVIDUAL },
  { label: 'Empresa', value: CustomerType.COMPANY },
];

export const DOCUMENT_TYPE_OPTIONS = [
  { label: 'Cédula de Ciudadanía', value: DocumentType.CC },
  { label: 'Cédula de Extranjería', value: DocumentType.CE },
  { label: 'NIT', value: DocumentType.NIT },
  { label: 'Pasaporte', value: DocumentType.PASSPORT },
];

// ✅ Estado inicial del formulario
export const INITIAL_CREDIT_LIMIT_REQUEST: ICreditLimitRequest = {
  customerType: CustomerType.INDIVIDUAL,
  documentType: DocumentType.CC,
  documentNumber: '',
  fullName: '',
  monthlyIncome: 0,
  requestedLimit: 0,
};
