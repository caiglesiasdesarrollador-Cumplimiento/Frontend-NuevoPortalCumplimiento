import { Component, OnInit } from '@angular/core';
import { NotificationService } from './shared/components/notification/notification.service';
import { LoaderService } from './shared/components/loader/loader.service';
import { ILibTbButton } from 'tech-block-lib';
import { configNotification } from './shared/components/notification/notification.config';
import { Router } from '@angular/router';
import { ApiGatewayService } from './services/api-gateway.service';
import { ApiResponse } from './models/api-response.model';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
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

  apiResponse?: ApiResponse;
  lambdaResponse?: ApiResponse;
  ecsResponse?: ApiResponse;

  constructor(
    private notificationService: NotificationService,
    private loaderService: LoaderService,
    private router: Router,
    private apiGatewayService: ApiGatewayService
  ) {}
  ngOnInit() {
    // En app.component.ts o donde estés utilizando el servicio
    this.apiGatewayService.postLambdaData(null).subscribe({
      next: (response: string) => {
      console.log('Respuesta de Lambda:', response); // "¡Hola Mundo desde Lambda en Java!"
      this.lambdaResponse = { statusCode: 200, body: { message: response } }; // Adaptación para UI
      },
      error: (error: unknown) => {
      console.error('Error al obtener datos de Lambda', error);
      }
    });

    this.apiGatewayService.getEcsData().subscribe({
      next: (response: string) => {
      console.log('Respuesta de ECS:', response); // "Hello World!"
      this.ecsResponse = { statusCode: 200, body: { message: response } }; // Adaptación para UI
      },
      error: (error: unknown) => {
      console.error('Error al obtener datos de ECS', error);
      }
    });
  }

  showLoader() {
    this.loaderService.show();
    setTimeout(() => this.loaderService.hide(), 1000);
  }
}