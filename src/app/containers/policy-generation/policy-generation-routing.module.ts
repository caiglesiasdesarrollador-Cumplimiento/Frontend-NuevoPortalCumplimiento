import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PolicyGenerationComponent } from './policy-generation.component';

const routes: Routes = [
  {
    path: '',
    component: PolicyGenerationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PolicyGenerationRoutingModule {}
