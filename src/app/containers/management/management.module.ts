import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// ✅ Tech-block-lib imports - SOLO los módulos necesarios
import {
  LibTbTableModule,
  LibTbDropdownModule,
  LibTbButtonModule,
  LibTbInputTextModule,
  LibTbBreadcrumbModule,
  LibTbSnackbarModule,
  LibTbRadioButtonModule,
} from 'tech-block-lib';

// ✅ Management components
import { ManagementComponent } from './management.component';
import { ManagementRoutingModule } from './management-routing.module';

@NgModule({
  declarations: [ManagementComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule, // ✅ Para ngModel en filtros

    // ✅ Tech-block-lib modules
    LibTbTableModule, // ✅ OBLIGATORIO para tabla con paginación y sort
    LibTbDropdownModule, // ✅ OBLIGATORIO para filtros dropdown
    LibTbButtonModule, // ✅ OBLIGATORIO para botones de acción
    LibTbInputTextModule, // ✅ OBLIGATORIO para búsqueda de texto
    LibTbBreadcrumbModule, // ✅ OBLIGATORIO para breadcrumb navigation
    LibTbSnackbarModule, // ✅ OBLIGATORIO para notificaciones
    LibTbRadioButtonModule, // ✅ OBLIGATORIO para selección individual de cotizaciones

    // ✅ Management routing
    ManagementRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ManagementModule {}
