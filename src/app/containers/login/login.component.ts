import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '@shared/components/notification/notification.service';
import { configNotification } from '@shared/components/notification/notification.config';
import { fadeAnimation } from '@shared/utils/animations';

@Component({
  standalone: false,
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeAnimation],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  // Campos del formulario
  email = '';
  password = '';

  constructor(
    private readonly router: Router,
    private readonly notificationService: NotificationService,
  ) {}

  onSubmit(): void {
    if (this.validateForm()) {
      if (this.validateLoginCredentials()) {
        this.notificationService.show({
          ...configNotification({
            title: 'Login exitoso',
            message: `Bienvenido ${this.email}`,
            error: false,
          }),
        });
        this.router.navigate(['/dashboard']);
      } else {
        this.notificationService.show({
          ...configNotification({
            title: 'Error de autenticación',
            message: 'Credenciales incorrectas. Intenta nuevamente.',
            error: true,
          }),
        });
      }
    } else {
      this.notificationService.show({
        ...configNotification({
          title: 'Formulario inválido',
          message: 'Por favor complete todos los campos correctamente',
          error: true,
        }),
      });
    }
  }

  onReset(): void {
    this.email = '';
    this.password = '';
  }

  private validateForm(): boolean {
    return this.email.length > 0 && this.password.length >= 6;
  }

  private validateLoginCredentials(): boolean {
    const validEmails = ['admin@bolivar.com', 'usuario@bolivar.com', 'test@test.com'];
    return validEmails.includes(this.email) && this.password.length >= 6;
  }
}
