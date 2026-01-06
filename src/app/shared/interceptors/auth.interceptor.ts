import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthTokenService } from '../services/auth-token.service';
import { IAuthInterceptorConfig } from './auth-interceptor.interface';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly config: IAuthInterceptorConfig = {
    headerName: 'Authorization',
    tokenPrefix: 'Bearer',
    excludedUrls: ['/auth/login', '/auth/register', '/auth/refresh', '/public', 'assets/'],
    includedUrls: ['/api/', '/v1/', '/secure/'],
  };

  constructor(private readonly authTokenService: AuthTokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // ✅ Verificar si la URL debe incluir el token
    if (!this.shouldIncludeToken(request.url)) {
      return next.handle(request);
    }

    // ✅ Obtener el token de autorización
    const token = this.authTokenService.getToken();

    // ✅ Si no hay token, continuar sin modificar la petición
    if (!token) {
      return next.handle(request);
    }

    // ✅ Verificar si el token ha expirado
    if (this.authTokenService.isTokenExpired()) {
      console.warn('Token expirado, eliminando token del storage');
      this.authTokenService.removeToken();
      return this.handleUnauthorized(request, next);
    }

    // ✅ Clonar la petición y agregar el header de autorización
    const authRequest = this.addAuthorizationHeader(request, token);

    // ✅ Continuar con la petición modificada y manejar errores
    return next
      .handle(authRequest)
      .pipe(catchError((error: HttpErrorResponse) => this.handleHttpError(error)));
  }

  /**
   * ✅ Determina si la URL debe incluir el token de autorización
   */
  private shouldIncludeToken(url: string): boolean {
    // ✅ Excluir URLs específicas que no necesitan autenticación
    const isExcluded = this.config.excludedUrls.some(excludedUrl => url.includes(excludedUrl));

    if (isExcluded) {
      return false;
    }

    // ✅ Si hay URLs específicas incluidas, verificar que la URL esté en la lista
    if (this.config.includedUrls && this.config.includedUrls.length > 0) {
      return this.config.includedUrls.some(includedUrl => url.includes(includedUrl));
    }

    // ✅ Por defecto, incluir token en todas las peticiones no excluidas
    return true;
  }

  /**
   * ✅ Agregar el header de autorización a la petición
   */
  private addAuthorizationHeader(
    request: HttpRequest<unknown>,
    token: string,
  ): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        [this.config.headerName]: `${this.config.tokenPrefix} ${token}`,
      },
    });
  }

  /**
   * ✅ Manejar peticiones cuando no hay token autorizado
   */
  private handleUnauthorized(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    // ✅ Continuar con la petición original sin token
    // En una implementación real, podrías redirigir al login o intentar refresh
    console.log('Petición sin token de autorización:', request.url);
    return next.handle(request);
  }

  /**
   * ✅ Manejar errores HTTP específicos de autenticación
   */
  private handleHttpError(error: HttpErrorResponse): Observable<never> {
    switch (error.status) {
      case 401:
        console.error('Error 401: No autorizado - Token inválido o expirado');
        this.authTokenService.removeToken();
        // ✅ En una implementación real, redirigir al login
        break;

      case 403:
        console.error('Error 403: Prohibido - Sin permisos suficientes');
        break;

      case 0:
        console.error('Error de conexión: No se pudo conectar al servidor');
        break;

      default:
        console.error(`Error HTTP ${error.status}:`, error.message);
        break;
    }

    return throwError(() => error);
  }
}
