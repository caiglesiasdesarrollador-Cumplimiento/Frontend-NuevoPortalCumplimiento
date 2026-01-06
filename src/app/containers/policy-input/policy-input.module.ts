import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// ✅ Tech-block-lib imports - SOLO los módulos necesarios
import {
  LibTbStepperModule,
  LibTbDynamicFormModule,
  LibTbButtonModule,
  LibTbBreadcrumbModule,
  LibTbFileUploadFieldModule,
  LibTbTableModule,
  LibTbAccordionModule,
  LibTbSnackbarModule,
  LibTbModalModule,
  LibTbInputNumberModule,
} from 'tech-block-lib';

// ✅ Policy-input components
import { PolicyInputComponent } from './policy-input.component';
import { PolicyInputRoutingModule } from './policy-input-routing.module';
import { CoberturasCumplimientoTableComponent } from './configs/config-step-2/components/coberturas-cumplimiento-table.component';

// ✅ Calendario Seguros Bolívar UI
import { SbCalendarModule } from '../../shared/components/sb-calendar/sb-calendar.module';

@NgModule({
  declarations: [PolicyInputComponent, CoberturasCumplimientoTableComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule, // ✅ Para formularios reactivos
    FormsModule, // ✅ Para ngModel en el modal SARLAFT

    // ✅ Tech-block-lib modules
    LibTbStepperModule, // ✅ OBLIGATORIO para stepper
    LibTbDynamicFormModule, // ✅ OBLIGATORIO para formularios dinámicos
    LibTbButtonModule, // ✅ OBLIGATORIO para botones de navegación
    LibTbBreadcrumbModule, // ✅ OBLIGATORIO para breadcrumb navigation
    LibTbFileUploadFieldModule, // ✅ OBLIGATORIO para carga de archivos
    LibTbTableModule, // ✅ OBLIGATORIO para tabla de coberturas
    LibTbAccordionModule, // ✅ OBLIGATORIO para acordeón sección RC
    LibTbSnackbarModule, // ✅ OBLIGATORIO para notificaciones toast
    LibTbModalModule, // ✅ OBLIGATORIO para modal SARLAFT
    LibTbInputNumberModule, // ✅ OBLIGATORIO para inputs de número en modal SARLAFT

    // ✅ Calendario Seguros Bolívar UI
    SbCalendarModule, // ✅ Calendario personalizado con Web Component

    // ✅ Policy-input routing
    PolicyInputRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PolicyInputModule {}
