import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './dynamic-form.component';
import { LibTbButtonModule, LibTbDynamicFormModule } from 'tech-block-lib';
import { DynamicFormRoutingModule } from './dynamic-form-routing.module';

@NgModule({
  declarations: [DynamicFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormRoutingModule,
    LibTbDynamicFormModule,
    LibTbButtonModule,
  ],
  exports: [DynamicFormComponent],
})
export class DynamicFormModule {}
