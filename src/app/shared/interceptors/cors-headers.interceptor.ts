import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * ✅ Interceptor Arquitectónico para Manejo de Headers CORS
 * 
 * SOLUCIÓN IMPLEMENTADA:
 * - Los headers están en CamelCase en config.service.ts (codUsr, sistemaOrigen, paisISO, direccionIP)
 * - Esto coincide exactamente con el CURL que funciona: codUsr, sistemaOrigen, paisISO, direccionIP
 * - El backend DEBE tener en Access-Control-Allow-Headers ambos casos:
 *   - CamelCase: codUsr, sistemaOrigen, paisISO, direccionIP
 *   - Minúsculas: codusr, sistemaorigen, paisiso, direccionip (el navegador normaliza a minúsculas en preflight)
 * 
 * FUNCIÓN:
 * Este interceptor detecta errores CORS y proporciona información útil para debugging.
 * Los headers están formateados exactamente como el backend los espera según el CURL.
 */
@Injectable()
export class CorsHeadersInterceptor implements HttpInterceptor {
  
  /**
   * ✅ URLs de servicios de Comunes que requieren headers personalizados
   */
  private readonly comunesUrls = [
    'z0jo90imu8.execute-api', // API Gateway Comunes Dev
    'fz73xehwah.execute-api', // API Gateway Comunes Dev (viejo)
    'c4huz7dmpc-vpce', // API Gateway Comunes Stage
    '03l44gahq8-vpce', // API Gateway Comunes Prod
    '/comunes-personas-administracion/',
    '/terceros/',
    '/personasNaturales/',
  ];

  /**
   * ✅ Verificar si la URL requiere manejo especial de headers CORS
   */
  private requiresCorsHandling(url: string): boolean {
    return this.comunesUrls.some(pattern => url.includes(pattern));
  }

  /**
   * ✅ Verificar si el error es relacionado con CORS
   */
  private isCorsError(error: HttpErrorResponse): boolean {
    return (
      error.status === 0 &&
      error.statusText === 'Unknown Error' &&
      (error.message?.includes('CORS') || error.message?.includes('paisiso'))
    );
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // ✅ Solo aplicar a URLs de servicios de Comunes
    if (!this.requiresCorsHandling(request.url)) {
      return next.handle(request);
    }

    // ✅ Los headers están en CamelCase (codUsr, sistemaOrigen, paisISO, direccionIP) como el CURL
    // El navegador los normaliza a minúsculas en preflight, pero el backend debe aceptar ambos casos
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (this.isCorsError(error)) {
          // ✅ Error CORS detectado - proporcionar información útil
          console.error(
            '❌ Error CORS detectado.\n' +
            'Los headers están en CamelCase (codUsr, sistemaOrigen, paisISO, direccionIP) como el CURL.\n' +
            'El navegador los normaliza a minúsculas en preflight OPTIONS.\n' +
            'El backend DEBE tener en Access-Control-Allow-Headers AMBOS casos:\n' +
            '  CamelCase: x-api-key, codUsr, sistemaOrigen, paisISO, info1, direccionIP, content-type\n' +
            '  Minúsculas: x-api-key, codusr, sistemaorigen, paisiso, info1, direccionip, content-type\n\n' +
            'URL: ' + request.url + '\n' +
            'Headers enviados: ' + JSON.stringify(
              Array.from(request.headers.keys()).reduce((acc, key) => {
                acc[key] = request.headers.get(key);
                return acc;
              }, {} as Record<string, string | null>),
              null,
              2
            )
          );
          
          // ✅ Lanzar error con mensaje descriptivo
          return throwError(() => new Error(
            'Error CORS: El backend no tiene configurado correctamente Access-Control-Allow-Headers. ' +
            'Debe incluir ambos casos (CamelCase y minúsculas): codUsr/codusr, sistemaOrigen/sistemaorigen, paisISO/paisiso, direccionIP/direccionip'
          ));
        }
        
        // ✅ Si no es error CORS, propagar el error normalmente
        return throwError(() => error);
      })
    );
  }
}
