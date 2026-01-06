import { Component } from '@angular/core';
import { NotificationService } from './shared/components/notification/notification.service';
import { LoaderService } from './shared/components/loader/loader.service';
import { ILibTbButton } from 'tech-block-lib';
import { configNotification } from './shared/components/notification/notification.config';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  standalone: false,
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // Ocultar header en páginas de error
  showHeader = true;
  btnNotification: ILibTbButton = {
    label: 'Mostrar modal notificación',
    libTbClick: () => {
      this.notificationService.show({
        ...configNotification({
          title: 'Notificación de prueba',
          message: 'Este es un mensaje de prueba',
          labelBtnReject: 'Rechazar',
          clickAccept: () => {
            this.showLoader();
          },
          clickReject: () => {
            alert('Rechazado');
          },
        }),
      });
    },
  };

  btnLoader: ILibTbButton = {
    label: 'Mostrar loader',
    typeBtn: 'secondary',
    libTbClick: () => {
      this.showLoader();
    },
  };

  btnForm: ILibTbButton = {
    label: 'Ir a formulario dinámico',
    typeBtn: 'secondary',
    styleBtn: 'text',
    libTbClick: () => {
      this.router.navigate(['formulario-dinamico']);
    },
  };

  constructor(
    private readonly notificationService: NotificationService,
    private readonly loaderService: LoaderService,
    private readonly router: Router,
  ) {
    // Detectar rutas de error para ocultar header
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showHeader = !event.url.includes('/error');
    });
  }

  showLoader(): void {
    this.loaderService.show();
    setTimeout(() => this.loaderService.hide(), 1000);
  }
}
