import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// ✅ Importaciones de tech-block-lib
import { LibTbButtonModule, LibTbBreadcrumbModule } from 'tech-block-lib';

// ✅ Componente del portal
import { PortalComponent } from './portal.component';
import { PortalRoutingModule } from './portal-routing.module';

@NgModule({
  declarations: [PortalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    // ✅ OBLIGATORIO: Módulos de tech-block-lib
    LibTbButtonModule,
    LibTbBreadcrumbModule,

    // ✅ Routing del módulo
    PortalRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PortalModule {}
