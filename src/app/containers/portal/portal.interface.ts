// ✅ Interfaces para el portal inspirado en la imagen 1

export interface IPortalStatCard {
  id: string;
  title: string;
  count: number;
  icon: string;
  color: 'success' | 'warning' | 'info' | 'error';
  description: string;
  action?: string;
}

export interface IPortalUserInfo {
  name: string;
  greeting: string;
  question: string;
  role: string;
  code: string;
  specialty?: string;
  expirationDate?: string;
}

export interface IPortalNavItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
  active?: boolean;
}

// ✅ Datos de ejemplo como en la imagen 1
export const PORTAL_STATS_DATA: IPortalStatCard[] = [
  {
    id: 'historial-solicitudes',
    title: 'Historial de solicitudes',
    count: 130,
    icon: 'fa-solid fa-history',
    color: 'info',
    description: 'Ver solicitudes',
    action: '/management',
  },
  {
    id: 'solicitudes-informacion',
    title: 'Solicitudes que requieren información',
    count: 5,
    icon: 'fa-solid fa-exclamation-circle',
    color: 'error',
    description: 'Completar',
    action: '/management',
  },
  {
    id: 'solicitudes-curso',
    title: 'Solicitudes en curso',
    count: 20,
    icon: 'fa-solid fa-clock',
    color: 'warning',
    description: 'Ver progreso',
    action: '/management',
  },
];

export const PORTAL_NAV_ITEMS: IPortalNavItem[] = [
  {
    id: 'inicio',
    label: 'Inicio',
    icon: 'fa-solid fa-home',
    route: '/portal',
    active: true,
  },
  {
    id: 'prospectar',
    label: 'Prospectar',
    icon: 'fa-solid fa-search',
    route: '/policy-input',
  },
  {
    id: 'gestion-polizas',
    label: 'Gestión de pólizas',
    icon: 'fa-solid fa-file-alt',
    route: '/management',
  },
  {
    id: 'cotizar-emitir',
    label: 'Cotizar y emitir',
    icon: 'fa-solid fa-paper-plane',
    route: '/dashboard',
  },
  {
    id: 'incluir-riesgos',
    label: 'Incluir riesgos',
    icon: 'fa-solid fa-chart-line',
  },
  {
    id: 'precario',
    label: 'Precario',
    icon: 'fa-solid fa-calculator',
  },
  {
    id: 'crear-consecutivo',
    label: 'Crear consecutivo',
    icon: 'fa-solid fa-handshake',
  },
  {
    id: 'servicios-reportes',
    label: 'Servicios y reportes',
    icon: 'fa-solid fa-clipboard-list',
  },
  {
    id: 'boton-pago',
    label: 'Botón de pago',
    icon: 'fa-solid fa-dollar-sign',
  },
  {
    id: 'siniestros',
    label: 'Siniestros',
    icon: 'fa-solid fa-chart-bar',
  },
  {
    id: 'mis-clientes',
    label: 'Mis clientes',
    icon: 'fa-solid fa-users',
  },
  {
    id: 'comisiones',
    label: 'Comisiones',
    icon: 'fa-solid fa-percentage',
  },
];

export const DEFAULT_USER_INFO: IPortalUserInfo = {
  name: 'Alejandro',
  greeting: 'Hola Alejandro,',
  question: '¿qué necesitas hoy?',
  role: 'Intermediario',
  code: '12345',
  specialty: 'Autos',
  expirationDate: '12/05/2026',
};
