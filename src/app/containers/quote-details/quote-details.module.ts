import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LibTbBreadcrumbModule, LibTbButtonModule, LibTbSnackbarModule } from 'tech-block-lib';

import { QuoteDetailsRoutingModule } from './quote-details-routing.module';
import { QuoteDetailsComponent } from './quote-details.component';

@NgModule({
  declarations: [QuoteDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LibTbBreadcrumbModule, // ✅ OBLIGATORIO para breadcrumb
    LibTbButtonModule, // ✅ OBLIGATORIO para botones
    LibTbSnackbarModule, // ✅ OBLIGATORIO para notificaciones
    QuoteDetailsRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class QuoteDetailsModule {}
