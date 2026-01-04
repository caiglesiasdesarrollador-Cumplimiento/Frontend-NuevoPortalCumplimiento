export enum PolicyType {
  AUTO = 'auto',
  HOME = 'home',
  LIFE = 'life',
  HEALTH = 'health',
  BUSINESS = 'business',
}

export enum CoverageType {
  BASIC = 'basic',
  STANDARD = 'standard',
  PREMIUM = 'premium',
  COMPREHENSIVE = 'comprehensive',
}

export enum PolicyStatus {
  DRAFT = 'draft',
  PENDING_APPROVAL = 'pending_approval',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  CANCELLED = 'cancelled',
}

export enum PaymentFrequency {
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  BIANNUAL = 'biannual',
  ANNUAL = 'annual',
}

export interface IPolicyGenerationRequest {
  policyType: PolicyType;
  customerDocument: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  coverageType: CoverageType;
  insuredValue: number;
  validityPeriod: number; // En meses
  paymentFrequency: PaymentFrequency;
  beneficiaries?: string[];
  additionalNotes?: string;
}

export interface IPolicyGenerationResult {
  policyId: string;
  policyNumber: string;
  customerInfo: IPolicyGenerationRequest;
  status: PolicyStatus;
  premiumAmount: number;
  deductible: number;
  coverageDetails: ICoverageDetail[];
  terms: string[];
  conditions: string[];
  generatedAt: string;
  validFrom: string;
  validTo: string;
  agentId: string;
  documentUrl?: string;
  qrCode?: string;
}

export interface ICoverageDetail {
  id: string;
  name: string;
  description: string;
  maxAmount: number;
  deductible: number;
  included: boolean;
}

// ✅ Opciones para dropdowns
export const POLICY_TYPE_OPTIONS = [
  { label: 'Seguro de Auto', value: PolicyType.AUTO, icon: 'fal fa-car' },
  { label: 'Seguro de Hogar', value: PolicyType.HOME, icon: 'fal fa-home' },
  { label: 'Seguro de Vida', value: PolicyType.LIFE, icon: 'fal fa-heart' },
  { label: 'Seguro de Salud', value: PolicyType.HEALTH, icon: 'fal fa-medkit' },
  { label: 'Seguro Empresarial', value: PolicyType.BUSINESS, icon: 'fal fa-building' },
];

export const COVERAGE_TYPE_OPTIONS = [
  { label: 'Básica', value: CoverageType.BASIC, description: 'Cobertura mínima requerida' },
  {
    label: 'Estándar',
    value: CoverageType.STANDARD,
    description: 'Cobertura intermedia recomendada',
  },
  {
    label: 'Premium',
    value: CoverageType.PREMIUM,
    description: 'Cobertura amplia con beneficios adicionales',
  },
  {
    label: 'Integral',
    value: CoverageType.COMPREHENSIVE,
    description: 'Cobertura total y completa',
  },
];

export const PAYMENT_FREQUENCY_OPTIONS = [
  { label: 'Mensual', value: PaymentFrequency.MONTHLY, description: '12 pagos al año' },
  { label: 'Trimestral', value: PaymentFrequency.QUARTERLY, description: '4 pagos al año' },
  { label: 'Semestral', value: PaymentFrequency.BIANNUAL, description: '2 pagos al año' },
  { label: 'Anual', value: PaymentFrequency.ANNUAL, description: '1 pago al año' },
];

export const VALIDITY_PERIOD_OPTIONS = [
  { label: '6 meses', value: 6 },
  { label: '1 año', value: 12 },
  { label: '2 años', value: 24 },
  { label: '3 años', value: 36 },
  { label: '5 años', value: 60 },
];

// ✅ Datos iniciales
export const INITIAL_POLICY_REQUEST: IPolicyGenerationRequest = {
  policyType: PolicyType.AUTO,
  customerDocument: '',
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  coverageType: CoverageType.STANDARD,
  insuredValue: 0,
  validityPeriod: 12,
  paymentFrequency: PaymentFrequency.MONTHLY,
  beneficiaries: [],
  additionalNotes: '',
};

// ✅ Mock data para desarrollo
export const MOCK_COVERAGE_DETAILS: ICoverageDetail[] = [
  {
    id: 'damage',
    name: 'Daños Materiales',
    description: 'Cobertura por daños al vehículo',
    maxAmount: 50000000,
    deductible: 500000,
    included: true,
  },
  {
    id: 'theft',
    name: 'Hurto Total',
    description: 'Cobertura por robo del vehículo',
    maxAmount: 80000000,
    deductible: 1000000,
    included: true,
  },
  {
    id: 'thirdparty',
    name: 'Responsabilidad Civil',
    description: 'Daños a terceros',
    maxAmount: 100000000,
    deductible: 0,
    included: true,
  },
];
