export interface IModificationProductCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  action: string;
  featured?: boolean;
}

export interface IModificationSelectionData {
  title: string;
  subtitle: string;
  products: IModificationProductCard[];
}

// ✅ Datos por defecto para la selección de modificaciones
export const defaultModificationSelectionData: IModificationSelectionData = {
  title: 'Modificar pólizas',
  subtitle: 'Realiza modificaciones a tus pólizas existentes de manera rápida y sencilla.',
  products: [
    {
      id: 'proteccion-familiar-mod',
      title: 'Protección familiar',
      description: 'Modifica coberturas, beneficiarios y detalles de tu póliza familiar',
      icon: 'fal fa-home-heart',
      action: '/policy-modification',
      featured: false,
    },
    {
      id: 'pymes-digital-mod',
      title: 'Pymes + Digital',
      description: 'Actualiza información empresarial, coberturas y límites de responsabilidad',
      icon: 'fal fa-building',
      action: '/policy-modification',
      featured: false,
    },
    {
      id: 'proteccion-creditos-mod',
      title: 'Protección de créditos',
      description: 'Ajusta montos asegurados y términos de cobertura crediticia',
      icon: 'fal fa-shield-check',
      action: '/policy-modification',
      featured: false,
    },
    {
      id: 'producto-cumplimiento-mod',
      title: 'Producto de cumplimiento',
      description:
        'Tu plataforma centralizada para la gestión eficiente de modificaciones de pólizas de cumplimiento.',
      icon: 'fal fa-clipboard-check',
      action: '/policy-modification',
      featured: true,
    },
  ],
};
