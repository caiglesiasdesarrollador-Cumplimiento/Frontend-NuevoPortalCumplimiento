// ✅ Interface para estadísticas del dashboard
export interface IDashboardStat {
  id: string;
  label: string;
  value: string | number;
  icon: string;
  url?: string;
  colorClass: string; // Tech-block-lib color classes
}

// ✅ Interface para acciones rápidas del dashboard
export interface IDashboardAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  url: string;
  ctaLabel: string;
}

// ✅ Datos mock para estadísticas - MI DESEMPEÑO como en la imagen
export const DASHBOARD_STATS_DATA: IDashboardStat[] = [
  {
    id: 'cotizaciones-proceso',
    label: 'Cotizaciones en proceso',
    value: '5',
    icon: 'fal fa-clock',
    url: '/management?filter=in-process',
    colorClass: 'dashboard__stat-card--warning',
  },
  {
    id: 'cotizaciones-emitidas',
    label: 'Cotizaciones emitidas',
    value: '25',
    icon: 'fal fa-shield-check',
    url: '/management?filter=issued',
    colorClass: 'dashboard__stat-card--success',
  },
  {
    id: 'polizas-emitidas',
    label: 'Pólizas emitidas',
    value: '15',
    icon: 'fal fa-shield-check',
    url: '/management?filter=policies',
    colorClass: 'dashboard__stat-card--info',
  },
  {
    id: 'polizas-vencer',
    label: 'Pólizas por vencer',
    value: '3',
    icon: 'fal fa-triangle-exclamation',
    url: '/management?filter=expiring',
    colorClass: 'dashboard__stat-card--error',
  },
];

// ✅ Datos mock para acciones rápidas - SISTEMA COMPLETO DE CUMPLIMIENTO
export const DASHBOARD_ACTIONS_DATA: IDashboardAction[] = [
  {
    id: 'policy-input',
    title: 'Crear Nueva Póliza',
    description: 'Iniciar proceso completo de emisión de póliza con stepper guiado.',
    icon: 'fal fa-file-plus',
    url: '/policy-input',
    ctaLabel: 'Crear Póliza',
  },
  {
    id: 'policy-generation',
    title: 'Generación Automatizada',
    description: 'Generar pólizas automáticamente con validaciones inteligentes.',
    icon: 'fal fa-magic',
    url: '/policy-generation',
    ctaLabel: 'Generar Automático',
  },
  {
    id: 'management',
    title: 'Gestión de Pólizas',
    description: 'Administrar y monitorear el estado de todas las pólizas existentes.',
    icon: 'fal fa-tasks',
    url: '/management',
    ctaLabel: 'Gestionar Pólizas',
  },
  {
    id: 'financial-reader',
    title: 'Análisis Financiero',
    description: 'Cargar y analizar estados financieros con AI para evaluación de riesgo.',
    icon: 'fal fa-chart-line',
    url: '/financial-statement-reader',
    ctaLabel: 'Analizar Estados',
  },
  {
    id: 'credit-validation',
    title: 'Validación de Crédito',
    description: 'Verificar límites de crédito y capacidad de pago del cliente.',
    icon: 'fal fa-credit-card',
    url: '/credit-limit-validation',
    ctaLabel: 'Validar Crédito',
  },
  {
    id: 'third-party-validation',
    title: 'Validación de Terceros',
    description: 'Verificar información de terceros y validar documentos.',
    icon: 'fal fa-user-check',
    url: '/third-party-validation',
    ctaLabel: 'Validar Terceros',
  },
  {
    id: 'contract-reader',
    title: 'Lector de Contratos',
    description: 'Extraer información clave de contratos usando inteligencia artificial.',
    icon: 'fal fa-file-contract',
    url: '/contract-reader',
    ctaLabel: 'Leer Contratos',
  },
  {
    id: 'settings',
    title: 'Configuración',
    description: 'Personalizar configuraciones del sistema y preferencias de usuario.',
    icon: 'fal fa-cog',
    url: '/settings',
    ctaLabel: 'Configurar Sistema',
  },
];
