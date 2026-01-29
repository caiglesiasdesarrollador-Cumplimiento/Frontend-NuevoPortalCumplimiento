import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { MulticlavesService } from '../../shared/services/multiclaves.service';
import { LoggerService } from '../../shared/services/logger.service';
import { SessionStorageUtil } from '../../shared/utils/session-storage.util';
import { IMulticlavesResponse } from '../../shared/interfaces/comunes.interface';

@Component({
  selector: 'app-redirect',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="redirect-screen">
      <p *ngIf="isLoading">Validando sesión...</p>
      <p *ngIf="!isLoading">Redirigiendo al formulario...</p>
    </section>
  `,
  styles: [
    `
      .redirect-screen {
        min-height: 80vh;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        color: #22543d;
      }
    `,
  ],
})
export class RedirectComponent implements OnInit {
  isLoading = true;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly multiclavesService: MulticlavesService,
    private readonly logger: LoggerService,
  ) {}

  ngOnInit(): void {
    this.prepareSession();
  }

  private prepareSession(): void {
    // ✅ Obtener parámetros de query params (vienen del Fake Login o Portal)
    const params = this.route.snapshot.queryParams;
    const employeeType = params.employeeType;
    const userName = params.userName;

    // ✅ Si no hay parámetros en query params, intentar obtenerlos de session storage
    if (!employeeType || !userName) {
      const sessionJson = sessionStorage.getItem('fakeLoginSession');
      if (sessionJson) {
        try {
          const sessionData = JSON.parse(sessionJson);
          const employeeTypeFromSession = sessionData.employeeType;
          const userNameFromSession = sessionData.userName;

          if (employeeTypeFromSession && userNameFromSession) {
            // ✅ Consultar Multiclaves con datos de session storage
            this.consultarMulticlaves(employeeTypeFromSession, userNameFromSession);
            return;
          }
        } catch (error) {
          this.logger.error('Error parseando session storage', error);
        }
      }

      // ✅ Si no hay datos válidos, redirigir al fake login
      this.router.navigate(['/fake-login']);
      return;
    }

    // ✅ Consultar Multiclaves con parámetros recibidos
    this.consultarMulticlaves(employeeType, userName);
  }

  /**
   * ✅ Consulta el servicio Multiclaves y guarda los datos en session storage
   * @param employeeType Tipo de documento del usuario (CC, NT, CE, PP, PE)
   * @param userName Número de documento del usuario
   */
  private consultarMulticlaves(employeeType: string, userName: string): void {
    this.multiclavesService
      .consultarClavesDirectasActivas(employeeType, userName)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: response => {
          this.logger.debug('Respuesta de Multiclaves recibida', {
            totalClaves: response.claves?.length || 0,
            tipoUsuario: response.tipoUsuario,
          });
          
          // ✅ Guardar las claves de multiclaves en session storage (cifradas)
          SessionStorageUtil.setEncryptedItem('fakeLoginMulticlaves', response);
          
          // ✅ Verificar que se guardó correctamente
          const clavesGuardadas = SessionStorageUtil.getDecryptedItem<IMulticlavesResponse>('fakeLoginMulticlaves');
          this.logger.debug('Claves guardadas en session storage', {
            totalClaves: clavesGuardadas?.claves?.length || 0,
          });
          
          // ✅ Guardar también los datos del usuario en session storage si no existen
          const sessionJson = sessionStorage.getItem('fakeLoginSession');
          if (!sessionJson) {
            const sessionData = {
              employeeType,
              userName,
              timestamp: new Date().toISOString(),
              isAuthenticated: true,
            };
            sessionStorage.setItem('fakeLoginSession', JSON.stringify(sessionData));
          }

          // ✅ Redirigir al paso 1 (policy-input)
          this.navigateToPolicy();
        },
        error: error => {
          this.logger.error('Error cargando datos de Multiclaves', {
            status: error?.status,
            message: error?.message,
            error: error?.error,
          });
          
          let mensajeError = 'No pudimos cargar las claves del usuario. Intenta de nuevo.';
          if (error?.error?.message) {
            mensajeError = `Error: ${error.error.message}`;
          } else if (error?.message) {
            mensajeError = `Error: ${error.message}`;
          } else if (error?.status === 0) {
            mensajeError = 'Error de conexión. Verifica tu conexión a internet o si hay problemas de CORS.';
          } else if (error?.status === 401 || error?.status === 403) {
            mensajeError = 'Error de autenticación. Verifica la API Key.';
          } else if (error?.status === 404) {
            mensajeError = 'Endpoint no encontrado. Verifica la URL del servicio.';
          }
          
          alert(mensajeError);
          this.router.navigate(['/fake-login']);
        },
      });
  }

  private navigateToPolicy(): void {
    this.router.navigate(['/policy-input'], { queryParams: { action: 'cotizar' } });
  }
}
