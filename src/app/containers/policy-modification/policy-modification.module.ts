import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// ✅ Importaciones de tech-block-lib
import {
  LibTbStepperModule,
  LibTbDynamicFormModule,
  LibTbButtonModule,
  LibTbTableModule,
  LibTbBreadcrumbModule,
  LibTbCheckboxModule,
  LibTbModalModule,
} from 'tech-block-lib';

// ✅ Componente principal
import { PolicyModificationComponent } from './policy-modification.component';

// ✅ Rutas del módulo
import { PolicyModificationRoutingModule } from './policy-modification-routing.module';

@NgModule({
  declarations: [PolicyModificationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule, // ✅ Para ngModel en los campos editables
    RouterModule,

    // ✅ Módulos de tech-block-lib
    LibTbStepperModule, // ✅ Para el stepper de navegación
    LibTbDynamicFormModule, // ✅ Para el formulario dinámico
    LibTbButtonModule, // ✅ Para los botones
    LibTbTableModule, // ✅ Para la tabla de pólizas activas
    LibTbBreadcrumbModule, // ✅ Para el breadcrumb
    LibTbCheckboxModule, // ✅ Para los checkboxes de selección
    LibTbModalModule, // ✅ Para los modales de notificación

    // ✅ Rutas del módulo
    PolicyModificationRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PolicyModificationModule {}
