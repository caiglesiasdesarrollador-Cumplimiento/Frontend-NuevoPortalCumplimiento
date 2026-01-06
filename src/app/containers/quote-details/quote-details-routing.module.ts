import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuoteDetailsComponent } from './quote-details.component';

const routes: Routes = [
  {
    path: '',
    component: QuoteDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class QuoteDetailsRoutingModule {}
