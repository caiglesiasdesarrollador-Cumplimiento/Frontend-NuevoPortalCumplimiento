import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { LibTbModalNotificationModule } from 'tech-block-lib';

@NgModule({
  declarations: [NotificationComponent],
  imports: [CommonModule, LibTbModalNotificationModule],
  exports: [NotificationComponent],
})
export class NotificationModule {}
