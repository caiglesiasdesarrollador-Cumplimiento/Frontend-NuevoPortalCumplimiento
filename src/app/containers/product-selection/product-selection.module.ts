import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// ✅ Tech-block-lib modules
import { LibTbButtonModule, LibTbBreadcrumbModule } from 'tech-block-lib';

// ✅ Component and routing
import { ProductSelectionComponent } from './product-selection.component';
import { ProductSelectionRoutingModule } from './product-selection-routing.module';

@NgModule({
  declarations: [ProductSelectionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LibTbButtonModule,
    LibTbBreadcrumbModule,
    ProductSelectionRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductSelectionModule {}
