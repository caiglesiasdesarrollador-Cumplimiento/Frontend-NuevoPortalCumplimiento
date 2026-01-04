import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { ILibTbBreadcrumb, ILibTbButton } from 'tech-block-lib';
import { BreadcrumbService, BreadcrumbItem } from '../../shared/services/breadcrumb.service';
import {
  IProductCard,
  IProductSelectionData,
  defaultProductSelectionData,
} from './product-selection.interface';

@Component({
  standalone: false,
  selector: 'app-product-selection',
  templateUrl: './product-selection.component.html',
  styleUrls: ['./product-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSelectionComponent implements OnInit {
  // ✅ Configuración del breadcrumb
  breadcrumbConfig: ILibTbBreadcrumb = {
    items: [],
  };

  // ✅ Datos de productos
  productData: IProductSelectionData = defaultProductSelectionData;

  // ✅ Botones usando tipos nativos de tech-block-lib (imagen 2)
  btnSimonCotizadores: ILibTbButton = {
    label: 'Ir a Simón Cotizadores',
    icon: 'fal fa-arrow-right',
    iconPosition: 'right',
    styleBtn: 'fill',
    typeBtn: 'secondary',
    class: 'w-full',
    libTbClick: () => this.navigateToProduct('simon-cotizadores'),
  };

  btnPymesDigital: ILibTbButton = {
    label: 'Ir a Pymes + Digital',
    icon: 'fal fa-arrow-right',
    iconPosition: 'right',
    styleBtn: 'fill',
    typeBtn: 'secondary',
    class: 'w-full',
    libTbClick: () => this.navigateToProduct('pymes-digital'),
  };

  btnProcreditos: ILibTbButton = {
    label: 'Ir a Procreditos',
    icon: 'fal fa-arrow-right',
    iconPosition: 'right',
    styleBtn: 'fill',
    typeBtn: 'secondary',
    class: 'w-full',
    libTbClick: () => this.navigateToProduct('procreditos'),
  };

  btnSimonWeb: ILibTbButton = {
    label: 'Ir a Simón Web',
    icon: 'fal fa-arrow-right',
    iconPosition: 'right',
    styleBtn: 'fill',
    typeBtn: 'secondary',
    class: 'w-full',
    libTbClick: () => this.navigateToProduct('simon-web'),
  };

  // ✅ Botón destacado para Cumplimiento usando tipo nativo
  btnCumplimiento: ILibTbButton = {
    label: 'Ir a Cumplimiento',
    icon: 'fal fa-arrow-right',
    iconPosition: 'right',
    styleBtn: 'fill',
    typeBtn: 'primary',
    class: 'w-full',
    libTbClick: () => this.navigateToProduct('cumplimiento'),
  };

  constructor(
    private readonly router: Router,
    private readonly breadcrumbService: BreadcrumbService,
  ) {}

  ngOnInit(): void {
    this.setupBreadcrumb();
  }

  private setupBreadcrumb(): void {
    const breadcrumbItems: BreadcrumbItem[] = [
      {
        label: 'Portal',
        icon: 'fal fa-home',
        routerLink: ['/portal'],
      },
      {
        label: 'Cotizar o Emitir',
        icon: 'fal fa-paper-plane',
      },
    ];

    this.breadcrumbService.setBreadcrumb(breadcrumbItems);
    this.breadcrumbConfig.items = breadcrumbItems.map(item => ({
      label: item.label,
      icon: item.icon,
      routerLink: item.routerLink?.join('/'),
    }));
  }

  // ✅ Navegación a productos específicos
  navigateToProduct(productId: string): void {
    console.log('Navegando a producto:', productId);

    // Navegación específica según el producto
    switch (productId) {
      case 'cumplimiento':
        // Cumplimiento va directamente al policy-input
        this.router.navigate(['/policy-input']);
        break;
      case 'simon-cotizadores':
      case 'pymes-digital':
      case 'procreditos':
      case 'simon-web':
        // Otros productos van al dashboard por ahora
        // En el futuro pueden tener rutas específicas
        this.router.navigate(['/dashboard']);
        break;
      default:
        // Fallback al dashboard
        this.router.navigate(['/dashboard']);
        break;
    }
  }

  // ✅ Getters para el template
  get featuredProducts(): IProductCard[] {
    return this.productData.products.filter(p => p.featured);
  }

  get regularProducts(): IProductCard[] {
    return this.productData.products.filter(p => !p.featured);
  }
}
