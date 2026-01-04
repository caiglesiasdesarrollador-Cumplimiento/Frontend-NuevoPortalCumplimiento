import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValorAseguradoModificationComponent } from './valor-asegurado-modification.component';

const routes: Routes = [
  {
    path: '',
    component: ValorAseguradoModificationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ValorAseguradoModificationRoutingModule {}
