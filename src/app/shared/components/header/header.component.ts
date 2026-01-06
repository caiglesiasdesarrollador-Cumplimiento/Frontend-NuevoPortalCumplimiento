import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BreadcrumbService } from '../../services/breadcrumb.service';

export interface HeaderBreadcrumbItem {
  label: string;
  icon?: string;
  routerLink?: string;
  isActive?: boolean;
}

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isMenuOpen = false; // ✅ Menú cerrado por defecto en todos los dispositivos
  isMobile = false;
  breadcrumbItems: HeaderBreadcrumbItem[] = [];
  showNavigation = true; // Controla si se muestra el menú y breadcrumb

  constructor(
    private breadcrumbService: BreadcrumbService,
    private router: Router
  ) {
    this.checkMobile();
    // Suscribirse al servicio de breadcrumb
    this.breadcrumbService.breadcrumbItems$.subscribe(items => {
      this.breadcrumbItems = items;
    });
    
    // Detectar rutas donde ocultar navegación (solo fake-login)
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showNavigation = !event.url.includes('/fake-login');
    });
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkMobile();
    // ✅ Cerrar menú al cambiar de tamaño de pantalla para evitar problemas
    this.isMenuOpen = false;
  }

  // ✅ Cerrar menú al hacer clic fuera de él (solo en desktop)
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isMobile && this.isMenuOpen) {
      const target = event.target as HTMLElement;
      const menuContainer = document.querySelector('.header__menu-container');
      const menuButton = document.querySelector('button[class*="absolute left-4"]');

      // ✅ Cerrar si el clic fue fuera del menú y del botón de menú
      if (menuContainer && menuButton) {
        const isClickInsideMenu = menuContainer.contains(target);
        const isClickOnMenuButton = menuButton.contains(target);

        if (!isClickInsideMenu && !isClickOnMenuButton) {
          this.closeMenu();
        }
      }
    }
  }

  // ✅ Cerrar menú con la tecla Escape
  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isMenuOpen) {
      this.closeMenu();
    }
  }

  private checkMobile(): void {
    this.isMobile = window.innerWidth <= 768;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
