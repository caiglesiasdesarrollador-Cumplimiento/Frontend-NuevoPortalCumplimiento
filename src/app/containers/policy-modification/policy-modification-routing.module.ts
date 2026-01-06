import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PolicyModificationComponent } from './policy-modification.component';

// ✅ Rutas del módulo de modificaciones de pólizas
const routes: Routes = [
  {
    path: '',
    component: PolicyModificationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PolicyModificationRoutingModule {}
