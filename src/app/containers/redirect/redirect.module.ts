import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RedirectComponent } from './redirect.component';

const routes: Routes = [
  {
    path: '',
    component: RedirectComponent,
  },
];

/**
 * ✅ RedirectModule - Módulo de routing para componente standalone
 * El componente RedirectComponent es standalone, este módulo solo maneja routing
 */
@NgModule({
  imports: [RouterModule.forChild(routes), RedirectComponent],
})
export class RedirectModule {}
