import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationService } from './shared/components/notification/notification.service';
import { LoaderService } from './shared/components/loader/loader.service';
import { ILibTbButton } from 'tech-block-lib';
import { configNotification } from './shared/components/notification/notification.config';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './shared/components/header/header.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { NotificationComponent } from './shared/components/notification/notification.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    HeaderComponent,
    LoaderComponent,
    NotificationComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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


