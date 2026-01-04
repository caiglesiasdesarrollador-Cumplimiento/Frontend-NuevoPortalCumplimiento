import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// ✅ Tech-block-lib imports
import { LibTbButtonModule, LibTbBreadcrumbModule } from 'tech-block-lib';

import { ModificationSelectionRoutingModule } from './modification-selection-routing.module';
import { ModificationSelectionComponent } from './modification-selection.component';

@NgModule({
  declarations: [ModificationSelectionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModificationSelectionRoutingModule,

    // ✅ Tech-block-lib modules
    LibTbButtonModule,
    LibTbBreadcrumbModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ModificationSelectionModule {}
