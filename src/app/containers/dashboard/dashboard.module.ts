import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// ✅ Tech-block-lib imports - SOLO los módulos necesarios
import { LibTbCardModule, LibTbButtonModule, LibTbBreadcrumbModule } from 'tech-block-lib';

// ✅ Dashboard components
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule,

    // ✅ Tech-block-lib modules
    LibTbCardModule, // Para las cards del dashboard
    LibTbButtonModule, // Para los botones de acciones principales
    LibTbBreadcrumbModule, // Para breadcrumb navigation

    // ✅ Dashboard routing
    DashboardRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule {}
