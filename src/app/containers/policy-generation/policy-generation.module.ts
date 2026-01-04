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

import { PolicyGenerationComponent } from './policy-generation.component';
import { PolicyGenerationRoutingModule } from './policy-generation-routing.module';

@NgModule({
  declarations: [PolicyGenerationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LibTbDynamicFormModule, // ✅ OBLIGATORIO para formularios dinámicos
    LibTbButtonModule, // ✅ OBLIGATORIO para botones
    LibTbAlertModule, // ✅ OBLIGATORIO para alertas de estado
    LibTbProgressSpinnerModule, // ✅ OBLIGATORIO para spinner de procesamiento
    LibTbBreadcrumbModule, // ✅ OBLIGATORIO para breadcrumb (patrón settings)
    PolicyGenerationRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PolicyGenerationModule {}
