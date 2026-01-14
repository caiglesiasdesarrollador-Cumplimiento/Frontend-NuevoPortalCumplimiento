import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { LibTbModalNotificationModule } from 'tech-block-lib';

@NgModule({
  imports: [
    NotificationComponent,CommonModule, LibTbModalNotificationModule],
  exports: [NotificationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NotificationModule {}

