// ✅ Interfaz para sub-items (segundo nivel)
export interface IMenuSubItem {
  id: string;
  name: string;
  icon?: string;
  url?: string;
  disabled?: boolean;
}

// ✅ Interfaz para items principales (primer nivel) con sub-items
export interface IMenuMainItem {
  id: string;
  name: string;
  icon?: string;
  url?: string;
  disabled?: boolean;
  expanded?: boolean; // Para controlar si está expandido
  subItems?: IMenuSubItem[]; // Sub-items del segundo nivel
}

// ✅ Configuración del menú usando LibTbList
export interface IListMenuConfig {
  items: IMenuMainItem[];
}

// ✅ SISTEMA DE INTERMEDIARIO - Menú principal del portal de intermediarios
export const LIST_MENU_DATA: IMenuMainItem[] = [
  // ✅ NAVEGACIÓN PRINCIPAL
  {
    id: 'inicio',
    name: 'Inicio',
    icon: 'fa-solid fa-home',
    url: '/portal',
    expanded: false,
  },
  {
    id: 'prospectar',
    name: 'Prospectar',
    icon: 'fa-solid fa-search',
    url: '/prospectar',
    expanded: false,
  },
  {
    id: 'gestion-polizas',
    name: 'Gestión de pólizas',
    icon: 'fa-solid fa-file-contract',
    url: '/gestion-polizas',
    expanded: false,
  },
  {
    id: 'cotizar-emitir',
    name: 'Cotizar y emitir',
    icon: 'fa-solid fa-paper-plane',
    url: '/policy-input',
    expanded: false,
  },
  {
    id: 'modificar',
    name: 'Modificar',
    icon: 'fa-solid fa-edit',
    url: '/modification-selection',
    expanded: false,
  },
  {
    id: 'incluir-riesgos',
    name: 'Incluir riesgos',
    icon: 'fa-solid fa-chart-line',
    url: '/incluir-riesgos',
    expanded: false,
  },
  {
    id: 'precobro',
    name: 'Precobro',
    icon: 'fa-solid fa-calculator',
    url: '/precobro',
    expanded: false,
  },
  {
    id: 'crear-consecutivo',
    name: 'Crear consecutivo',
    icon: 'fa-solid fa-handshake',
    url: '/crear-consecutivo',
    expanded: false,
  },
  {
    id: 'servicios-reportes',
    name: 'Servicios y reportes',
    icon: 'fa-solid fa-file-lines',
    url: '/servicios-reportes',
    expanded: false,
  },
  {
    id: 'boton-pago',
    name: 'Botón de pago',
    icon: 'fa-solid fa-dollar-sign',
    url: '/boton-pago',
    expanded: false,
  },
  {
    id: 'siniestros',
    name: 'Siniestros',
    icon: 'fa-solid fa-list',
    url: '/siniestros',
    expanded: false,
  },
  {
    id: 'mis-clientes',
    name: 'Mis clientes',
    icon: 'fa-solid fa-users',
    url: '/mis-clientes',
    expanded: false,
  },
  {
    id: 'comisiones',
    name: 'Comisiones',
    icon: 'fa-solid fa-percentage',
    url: '/comisiones',
    expanded: false,
  },
];
