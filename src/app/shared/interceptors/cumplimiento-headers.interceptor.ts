import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service';
import { ConfigService } from '../services/config.service';

/**
 * ✅ Interceptor para agregar headers de proceso (X-Proceso-*) automáticamente
 * a todas las peticiones de servicios de Cumplimiento Digital
 * 
 * Headers agregados según colección de Postman:
 * - codProducto, modulo, proceso, subproceso, codcia, codsecc, codusr, etc.
 */
@Injectable()
export class CumplimientoHeadersInterceptor implements HttpInterceptor {
  constructor(
    private readonly sessionService: SessionService,
    private readonly configService: ConfigService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // ✅ Verificar si la URL es de servicios de Cumplimiento
    if (!this.isCumplimientoUrl(request.url)) {
      return next.handle(request);
    }

    // ✅ Obtener código de usuario de la sesión
    const codUsr = this.sessionService.getCodUsr();
    if (!codUsr) {
      console.warn('⚠️ [CumplimientoHeadersInterceptor] No se encontró codUsr en sesión');
      return next.handle(request);
    }

    // ✅ Obtener headers de proceso
    const procesoHeaders = this.configService.getProcesoHeaders(codUsr);

    // ✅ Clonar la petición y agregar headers de proceso
    const modifiedRequest = request.clone({
      setHeaders: procesoHeaders,
    });

    return next.handle(modifiedRequest);
  }

  /**
   * ✅ Determinar si la URL es de servicios de Cumplimiento
   * @param url URL de la petición
   * @returns true si es URL de Cumplimiento
   */
  private isCumplimientoUrl(url: string): boolean {
    // URLs de servicios de Cumplimiento según colección de Postman
    const cumplimientoPatterns = [
      '/catalogos/',
      '/persona_administracion/',
      '/sarlaft/',
      '/notificador/',
      '/comunes/',
      '/poliza_transversal/',
      '/emision/',
      '/negocios/',
    ];

    return cumplimientoPatterns.some(pattern => url.includes(pattern));
  }
}

