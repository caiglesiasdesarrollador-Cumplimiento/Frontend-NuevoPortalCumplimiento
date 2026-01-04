import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  LibTbDynamicFormModule,
  LibTbButtonModule,
  LibTbAlertModule,
  LibTbBreadcrumbModule,
  LibTbProgressSpinnerModule,
} from 'tech-block-lib';

import { ThirdPartyValidationComponent } from './third-party-validation.component';
import { ThirdPartyValidationRoutingModule } from './third-party-validation-routing.module';

@NgModule({
  declarations: [ThirdPartyValidationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LibTbDynamicFormModule, // ✅ OBLIGATORIO para formularios dinámicos
    LibTbButtonModule, // ✅ OBLIGATORIO para botones
    LibTbAlertModule, // ✅ Para alertas (patrón settings)
    LibTbBreadcrumbModule, // ✅ Para breadcrumb (patrón settings)
    LibTbProgressSpinnerModule, // ✅ Para loading state (patrón settings)
    ThirdPartyValidationRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ThirdPartyValidationModule {}
