import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { HeaderComponent } from './header.component';

// Modules
import { MenuModule } from '../menu/menu.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule, // ✅ Para usar routerLink en el breadcrumb
    MenuModule, // ✅ OBLIGATORIO: Importar MenuModule para usar app-shared-menu
  ],
  exports: [HeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderModule {}
