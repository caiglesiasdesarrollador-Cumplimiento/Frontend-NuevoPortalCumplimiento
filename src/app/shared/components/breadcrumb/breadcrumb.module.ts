import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibTbBreadcrumbModule } from 'tech-block-lib';
import { BreadcrumbComponent } from './breadcrumb.component';

@NgModule({
  declarations: [BreadcrumbComponent],
  imports: [
    CommonModule,
    LibTbBreadcrumbModule, // ✅ OBLIGATORIO para lib-tb-breadcrumb
  ],
  exports: [BreadcrumbComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BreadcrumbModule {}
