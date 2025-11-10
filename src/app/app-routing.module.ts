import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'formulario-dinamico',
    loadChildren: () =>
      import('./containers/dynamic-form/dynamic-form.module').then(m => m.DynamicFormModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
