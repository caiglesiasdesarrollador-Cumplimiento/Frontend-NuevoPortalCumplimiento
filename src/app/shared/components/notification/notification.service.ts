import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ILibTbModalNotification } from 'tech-block-lib';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly notification = new Subject<ILibTbModalNotification | null>();
  notificationObserver = this.notification.asObservable();

  show(config: ILibTbModalNotification): void {
    this.notification.next(config);
  }

  close(): void {
    this.notification.next(null);
  }
}
