import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// ✅ Importaciones de tech-block-lib
import {
  LibTbButtonModule,
  LibTbTableModule,
  LibTbBreadcrumbModule,
  LibTbStepperModule,
} from 'tech-block-lib';

// ✅ Componente principal
import { ValorAseguradoModificationComponent } from './valor-asegurado-modification.component';

// ✅ Rutas del módulo
import { ValorAseguradoModificationRoutingModule } from './valor-asegurado-modification-routing.module';

@NgModule({
  declarations: [ValorAseguradoModificationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,

    // ✅ Módulos de tech-block-lib
    LibTbButtonModule, // ✅ Para los botones
    LibTbTableModule, // ✅ Para la tabla de coberturas
    LibTbBreadcrumbModule, // ✅ Para el breadcrumb
    LibTbStepperModule, // ✅ Para el stepper de navegación

    // ✅ Rutas del módulo
    ValorAseguradoModificationRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ValorAseguradoModificationModule {}
