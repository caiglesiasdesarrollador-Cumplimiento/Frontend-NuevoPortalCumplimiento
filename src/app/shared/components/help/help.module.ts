import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LibTbButtonModule } from 'tech-block-lib';
import { HelpComponent } from './help.component';

@NgModule({
  declarations: [HelpComponent],
  imports: [CommonModule, LibTbButtonModule],
  exports: [HelpComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HelpModule {}
