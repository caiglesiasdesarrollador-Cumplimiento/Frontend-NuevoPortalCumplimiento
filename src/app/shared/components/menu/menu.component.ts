import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IMenuMainItem, LIST_MENU_DATA } from './menu.interface';

@Component({
  selector: 'app-shared-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input() isMobile: boolean = false;
  @Output() menuClose = new EventEmitter<void>();

  // ✅ Datos del menú con las opciones del portal de intermediarios
  menuItems: IMenuMainItem[] = LIST_MENU_DATA;

  constructor(private readonly router: Router) {}

  // ✅ Manejar click en item del menú
  onMenuItemClick(menuItem: IMenuMainItem): void {
    if (menuItem.disabled) return;
    if (menuItem.url) {
      this.navigateToUrl(menuItem.url);
    }
  }

  // ✅ Navegar a URL usando Angular Router
  private navigateToUrl(url: string): void {
    const internalRoutes = [
      '/portal',
      '/prospectar',
      '/gestion-polizas',
      '/policy-input',
      '/modification-selection',
      '/incluir-riesgos',
      '/precobro',
      '/crear-consecutivo',
      '/servicios-reportes',
      '/boton-pago',
      '/siniestros',
      '/mis-clientes',
      '/comisiones',
      '/product-selection',
    ];

    const isInternalRoute = internalRoutes.some(route => url.startsWith(route));

    if (isInternalRoute) {
      this.router.navigate([url]);
    } else {
      window.location.href = url;
    }

    this.menuClose.emit();
  }
}
