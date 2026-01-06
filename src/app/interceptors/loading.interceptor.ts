import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

/**
 * ✅ Interceptor de Loading
 * - Muestra/oculta indicador de carga durante peticiones HTTP
 * - Cuenta peticiones activas para manejo de múltiples requests
 */
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private activeRequests = 0;

  // TODO: Inyectar servicio de loading cuando esté disponible
  // constructor(private loadingService: LoadingService) { }
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Incrementar contador
    this.activeRequests++;

    // Mostrar loading si es la primera petición
    if (this.activeRequests === 1) {
      this.showLoading();
    }

    return next.handle(request).pipe(
      finalize(() => {
        // Decrementar contador
        this.activeRequests--;

        // Ocultar loading si no hay más peticiones
        if (this.activeRequests === 0) {
          this.hideLoading();
        }
      })
    );
  }

  /**
   * Mostrar indicador de carga
   * TODO: Integrar con servicio de loading
   */
  private showLoading(): void {
    console.log('⏳ [LoadingInterceptor] Mostrando loading...');
    // this.loadingService.show();
  }

  /**
   * Ocultar indicador de carga
   * TODO: Integrar con servicio de loading
   */
  private hideLoading(): void {
    console.log('✅ [LoadingInterceptor] Ocultando loading');
    // this.loadingService.hide();
  }
}

