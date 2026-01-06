import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModificacionesNominativasComponent } from './modificaciones-nominativas.component';

const routes: Routes = [
  {
    path: '',
    component: ModificacionesNominativasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ModificacionesNominativasRoutingModule {}
