import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  LibTbDynamicFormModule,
  LibTbButtonModule,
  LibTbAlertModule,
  LibTbProgressSpinnerModule,
  LibTbBreadcrumbModule,
} from 'tech-block-lib';

import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LibTbDynamicFormModule, // ✅ OBLIGATORIO para formularios dinámicos
    LibTbButtonModule, // ✅ OBLIGATORIO para botones
    LibTbAlertModule, // ✅ Para alertas dinámicas
    LibTbProgressSpinnerModule, // ✅ Para loading state
    LibTbBreadcrumbModule, // ✅ Para navegación breadcrumb
    SettingsRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SettingsModule {}
