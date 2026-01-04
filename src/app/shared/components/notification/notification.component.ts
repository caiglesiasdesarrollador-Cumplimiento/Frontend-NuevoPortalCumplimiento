import { Component, ViewEncapsulation, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ILibTbModalNotification } from 'tech-block-lib';
import { NotificationService } from './notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification',
  standalone: false,
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NotificationComponent implements OnInit, OnDestroy {
  modalNotification: ILibTbModalNotification = {
    key: 'app-notification',
    dismissableMask: false,
    closeOnEscape: false,
    img: {
      src: 'assets/img/pictogramas/exitoso.svg',
    },
    title: 'Título de confirmacion',
    message: 'Mensaje de confirmacion',
  };

  isVisible = false;
  notificacionSub?: Subscription;

  constructor(
    private readonly notificationService: NotificationService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.notificacionSub = this.notificationService.notificationObserver.subscribe(data => {
      if (!data) {
        this.close();
        return;
      }

      this.modalNotification = {
        ...this.modalNotification,
        ...data,
        class: `app-notification ${data.class ?? ''}`,
        showClose: data.showClose,
        closeButton: {
          icon: 'fal fa-times',
          styleBtn: 'text',
          typeBtn: 'secondary',
          ...(data.closeButton || {}),
          libTbClick: () => {
            if (data.closeButton?.libTbClick) {
              data.closeButton.libTbClick(true);
            }
            this.close();
          },
        },
        acceptButton: {
          label: 'Aceptar',
          typeBtn: 'primary',
          ...(data.acceptButton || {}),
          libTbClick: () => {
            if (data.acceptButton?.libTbClick) {
              data.acceptButton.libTbClick(true);
            }
            this.close();
          },
        },
        rejectButtonVisible: !!(data.rejectButton?.label),
        rejectButton: {
          label: 'Cancelar',
          styleBtn: 'stroke',
          typeBtn: 'secondary',
          ...(data.rejectButton || {}),
          libTbClick: () => {
            if (data.rejectButton?.libTbClick) {
              data.rejectButton.libTbClick(true);
            }
            this.close();
          },
        },
      };
      this.isVisible = true;
      this.cdr.detectChanges();
    });
  }

  close(): void {
    this.isVisible = false;
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.notificacionSub?.unsubscribe();
  }
}
