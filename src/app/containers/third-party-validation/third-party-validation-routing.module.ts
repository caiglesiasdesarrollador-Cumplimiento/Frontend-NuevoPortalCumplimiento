import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThirdPartyValidationComponent } from './third-party-validation.component';

const routes: Routes = [
  {
    path: '',
    component: ThirdPartyValidationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ThirdPartyValidationRoutingModule {}
