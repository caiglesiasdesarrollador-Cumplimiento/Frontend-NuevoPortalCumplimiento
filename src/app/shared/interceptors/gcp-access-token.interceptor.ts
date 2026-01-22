import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * ✅ Interceptor para agregar header access_token automáticamente
 * a peticiones a servicios GCP directos (Cloud Run)
 * 
 * Basado en la colección de Postman: CumplimientoDigital.postman_collection.json
 * - Dev: Actuaria2024*
 * - Stage: Analitica2025*
 */
@Injectable()
export class GCPAccessTokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // ✅ Verificar si es URL de GCP directo (Cloud Run)
    if (!this.isGCPDirectUrl(request.url)) {
      return next.handle(request);
    }

    // ✅ Obtener access token según el ambiente
    const accessToken = environment.gcpAccessTokens.dev; // TODO: Usar ambiente dinámico

    // ✅ Verificar si ya tiene access_token (no sobrescribir)
    if (request.headers.has('access_token')) {
      return next.handle(request);
    }

    // ✅ Clonar la petición y agregar access_token
    const modifiedRequest = request.clone({
      setHeaders: {
        access_token: accessToken,
        accept: 'application/json', // Header requerido según colección de Postman
      },
    });

    return next.handle(modifiedRequest);
  }

  /**
   * ✅ Verificar si es URL de GCP directo (Cloud Run)
   * @param url URL de la petición
   * @returns true si es URL de GCP Cloud Run
   */
  private isGCPDirectUrl(url: string): boolean {
    return (
      url.includes('us-east1.run.app') || // Cloud Run URLs
      url.includes('ms-aa-analia-suscripcion-cumplimiento') ||
      url.includes('/contrato/lector-contratos') ||
      url.includes('/financiero/extract/') ||
      url.includes('/financiero/calculate-cupo/')
    );
  }
}


