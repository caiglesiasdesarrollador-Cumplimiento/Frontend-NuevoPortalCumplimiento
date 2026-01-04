import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  LibTbBreadcrumbModule,
  LibTbAlertModule,
  LibTbButtonModule,
  LibTbProgressSpinnerModule,
  LibTbFileUploadFieldModule,
} from 'tech-block-lib';
import { FinancialStatementReaderComponent } from './financial-statement-reader.component';
import { FinancialStatementReaderRoutingModule } from './financial-statement-reader-routing.module';

@NgModule({
  declarations: [FinancialStatementReaderComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LibTbBreadcrumbModule,
    LibTbAlertModule,
    LibTbButtonModule,
    LibTbProgressSpinnerModule,
    LibTbFileUploadFieldModule,
    FinancialStatementReaderRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FinancialStatementReaderModule {}
