// ✅ Interfaces para el componente de selección de productos

export interface IProductCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  action: string;
  featured?: boolean;
}

export interface IProductSelectionData {
  title: string;
  subtitle: string;
  products: IProductCard[];
}

// ✅ Datos por defecto para la selección de productos
export const defaultProductSelectionData: IProductSelectionData = {
  title: 'Cotizar o emitir',
  subtitle: 'Navega por nuestros productos y cotiza o emite rápido en un solo lugar.',
  products: [
    {
      id: 'proteccion-familiar',
      title: 'Protección familiar',
      description: 'Vida + Hogar',
      icon: 'fal fa-home-heart',
      action: '/dashboard',
      featured: false,
    },
    {
      id: 'pymes-digital',
      title: 'Pymes + Digital',
      description:
        'Protección empresarial con emisión 100% digital. Respaldo en daños, responsabilidad y servicios de asesoría.',
      icon: 'fal fa-building',
      action: '/dashboard',
      featured: false,
    },
    {
      id: 'proteccion-creditos',
      title: 'Protección de créditos',
      description: 'Vida + Hogar',
      icon: 'fal fa-shield-check',
      action: '/dashboard',
      featured: false,
    },
    {
      id: 'producto-cumplimiento',
      title: 'Producto de cumplimiento',
      description:
        'Su plataforma centralizada para la gestión eficiente de pólizas de cumplimiento.',
      icon: 'fal fa-clipboard-check',
      action: '/dashboard',
      featured: true,
    },
    {
      id: 'simon-web',
      title: 'Simón Web',
      description: 'Cumplimiento + SOAT',
      icon: 'fal fa-globe',
      action: '/dashboard',
      featured: false,
    },
  ],
};
