import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// ✅ SIGUIENDO REGLA: Usar componentes de tech-block-lib
import { LibTbAccordionModule, LibTbListModule } from 'tech-block-lib';

// Components
import { MenuComponent } from './menu.component';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    LibTbAccordionModule, // ✅ Componente lib-tb-accordion para nivel 1
    LibTbListModule, // ✅ Componente lib-tb-list para nivel 2
  ],
  exports: [MenuComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MenuModule {}
