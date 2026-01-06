import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader.component';
import { LibTbModalModule, LibTbProgressSpinnerModule } from 'tech-block-lib';

@NgModule({
  declarations: [LoaderComponent],
  imports: [CommonModule, LibTbProgressSpinnerModule, LibTbModalModule],
  exports: [LoaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoaderModule {}
