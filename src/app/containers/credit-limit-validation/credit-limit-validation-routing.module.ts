import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditLimitValidationComponent } from './credit-limit-validation.component';

const routes: Routes = [
  {
    path: '',
    component: CreditLimitValidationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CreditLimitValidationRoutingModule {}
