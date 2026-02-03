import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ErrorConnectionComponent } from './error-connection/error-connection.component';
import { Error404Component } from './error-404/error-404.component';

const routes: Routes = [
  { path: '', component: Error404Component },
  { path: 'connection', component: ErrorConnectionComponent },
];

@NgModule({
  imports: [
    ErrorConnectionComponent,
    Error404Component,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [ErrorConnectionComponent, Error404Component],
})
export class ErrorPagesModule {}
