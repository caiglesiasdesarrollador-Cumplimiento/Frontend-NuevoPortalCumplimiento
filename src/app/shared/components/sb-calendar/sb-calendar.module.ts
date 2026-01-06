import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SbCalendarComponent } from './sb-calendar.component';

@NgModule({
  declarations: [SbCalendarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [SbCalendarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SbCalendarModule {}

