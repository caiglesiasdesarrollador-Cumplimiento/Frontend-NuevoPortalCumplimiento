import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// ✅ Tech-block-lib imports - SOLO los módulos necesarios
import {
  LibTbAlertModule,
  LibTbProgressSpinnerModule,
  LibTbButtonModule,
  LibTbFileUploadFieldModule,
  LibTbBreadcrumbModule,
} from 'tech-block-lib';

// ✅ Contract Reader components
import { ContractReaderComponent } from './contract-reader.component';
import { ContractReaderRoutingModule } from './contract-reader-routing.module';

@NgModule({
  declarations: [ContractReaderComponent],
  imports: [
    CommonModule,
    RouterModule,

    // ✅ Tech-block-lib modules
    LibTbAlertModule, // ✅ OBLIGATORIO para alertas de estado
    LibTbProgressSpinnerModule, // ✅ OBLIGATORIO para spinner de procesamiento
    LibTbButtonModule, // ✅ OBLIGATORIO para botones de acción
    LibTbFileUploadFieldModule, // ✅ OBLIGATORIO para upload de archivos
    LibTbBreadcrumbModule, // ✅ OBLIGATORIO para breadcrumb navigation

    // ✅ Contract Reader routing
    ContractReaderRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ContractReaderModule {}
