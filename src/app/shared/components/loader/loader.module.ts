import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader.component';
import { LibTbModalModule, LibTbProgressSpinnerModule } from 'tech-block-lib';

@NgModule({
  declarations: [LoaderComponent],
  imports: [CommonModule, LibTbProgressSpinnerModule, LibTbModalModule],
  exports: [LoaderComponent],
})
export class LoaderModule {}
