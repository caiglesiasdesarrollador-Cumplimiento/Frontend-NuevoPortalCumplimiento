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

import { CreditLimitValidationComponent } from './credit-limit-validation.component';
import { CreditLimitValidationRoutingModule } from './credit-limit-validation-routing.module';

@NgModule({
  declarations: [CreditLimitValidationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LibTbDynamicFormModule, // ✅ OBLIGATORIO para formularios dinámicos
    LibTbButtonModule, // ✅ OBLIGATORIO para botones
    LibTbAlertModule, // ✅ Para alertas (patrón settings)
    LibTbBreadcrumbModule, // ✅ Para breadcrumb (patrón settings)
    LibTbProgressSpinnerModule, // ✅ Para loading state (patrón settings)
    CreditLimitValidationRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CreditLimitValidationModule {}
