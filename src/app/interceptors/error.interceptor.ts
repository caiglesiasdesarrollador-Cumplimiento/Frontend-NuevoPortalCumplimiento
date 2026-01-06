import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * ✅ Interceptor de Errores HTTP
 * - Maneja errores HTTP globalmente
 * - Muestra notificaciones de error
 * - Log de errores para debugging
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          // Error del cliente (network, etc)
          errorMessage = `Error: ${error.error.message}`;
          console.error('🔴 [ErrorInterceptor] Client Error:', error.error.message);
        } else {
          // Error del servidor
          errorMessage = this.getServerErrorMessage(error);
          console.error('🔴 [ErrorInterceptor] Server Error:', {
            status: error.status,
            message: errorMessage,
            url: request.url
          });
        }

        // TODO: Integrar con servicio de notificaciones
        // this.notificationService.showError(errorMessage);

        return throwError(() => new Error(errorMessage));
      })
    );
  }

  /**
   * Obtener mensaje de error según status code
   */
  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 400:
        return error.error?.message || 'Solicitud incorrecta';
      case 401:
        return 'No autorizado. Por favor inicie sesión nuevamente.';
      case 403:
        return 'Acceso denegado. No tiene permisos para esta acción.';
      case 404:
        return 'Recurso no encontrado.';
      case 409:
        return error.error?.message || 'Conflicto con el estado actual del recurso.';
      case 422:
        return error.error?.message || 'Error de validación.';
      case 500:
        return 'Error interno del servidor. Intente más tarde.';
      case 502:
        return 'Servidor no disponible. Intente más tarde.';
      case 503:
        return 'Servicio temporalmente no disponible.';
      case 504:
        return 'Tiempo de espera agotado. Intente más tarde.';
      default:
        return error.error?.message || `Error desconocido (${error.status})`;
    }
  }
}

