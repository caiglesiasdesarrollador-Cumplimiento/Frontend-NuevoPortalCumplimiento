import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './dynamic-form.component';
import { LibTbButtonModule, LibTbDynamicFormModule, LibTbStepperModule } from 'tech-block-lib';
import { DynamicFormRoutingModule } from './dynamic-form-routing.module';

@NgModule({
  declarations: [DynamicFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormRoutingModule,
    LibTbDynamicFormModule,
    LibTbButtonModule,
    LibTbStepperModule,
  ],
  exports: [DynamicFormComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DynamicFormModule {}
