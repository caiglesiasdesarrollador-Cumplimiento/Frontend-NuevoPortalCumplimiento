import { Component, ViewEncapsulation, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ILibTbModalNotification } from 'tech-block-lib';
import { NotificationService } from './notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification',
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

  notificacionSub?: Subscription;

  constructor(
    private confirmationService: ConfirmationService,
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.notificacionSub = this.notificationService.notificationObserver.subscribe(data => {
      if (!data) {
        this.confirmationService.close();
        return;
      }

      this.modalNotification = {
        ...this.modalNotification,
        ...data,
        class: `app-notification ${data.class || ''}`,
        closeButton: {
          icon: 'fal fa-times',
          styleBtn: 'text',
          typeBtn: 'secondary',
          ...data.closeButton,
          libTbClick: () => {
            data.closeButton?.libTbClick?.(true);
            this.confirmationService.close();
          },
        },
        acceptButton: {
          label: 'Aceptar',
          typeBtn: 'primary',
          ...data.acceptButton,
          libTbClick: () => {
            data.acceptButton?.libTbClick?.(true);
            this.confirmationService.close();
          },
        },
        rejectButtonVisible: !!data.rejectButton!.label,
        rejectButton: {
          label: 'Cancelar',
          styleBtn: 'stroke',
          typeBtn: 'secondary',
          ...data.rejectButton,
          libTbClick: () => {
            data.rejectButton?.libTbClick?.(true);
            this.confirmationService.close();
          },
        },
      };
      this.cdr.detectChanges();
      this.confirmationService.confirm({ key: 'app-notification' });
    });
  }

  ngOnDestroy(): void {
    this.notificacionSub?.unsubscribe();
  }
}
