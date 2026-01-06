import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialStatementReaderComponent } from './financial-statement-reader.component';

const routes: Routes = [
  {
    path: '',
    component: FinancialStatementReaderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FinancialStatementReaderRoutingModule {}
