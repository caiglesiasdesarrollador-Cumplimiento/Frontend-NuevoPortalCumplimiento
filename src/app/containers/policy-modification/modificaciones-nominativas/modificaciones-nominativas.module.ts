import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// ✅ Imports de tech-block-lib siguiendo lineamientos
import { LibTbBreadcrumbModule, LibTbButtonModule, LibTbDynamicFormModule } from 'tech-block-lib';

// ✅ Componentes y routing
import { ModificacionesNominativasRoutingModule } from './modificaciones-nominativas-routing.module';
import { ModificacionesNominativasComponent } from './modificaciones-nominativas.component';

@NgModule({
  declarations: [
    ModificacionesNominativasComponent, // ✅ Componente principal
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    // ✅ Tech-Block-Lib modules
    LibTbBreadcrumbModule, // ✅ Para navegación breadcrumb
    LibTbButtonModule, // ✅ Para botones de acción
    LibTbDynamicFormModule, // ✅ Para formularios dinámicos de datos generales y ubicación

    // ✅ Routing
    ModificacionesNominativasRoutingModule,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ModificacionesNominativasModule {}
