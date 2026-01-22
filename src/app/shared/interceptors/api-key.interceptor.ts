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
 * ✅ Interfaz para tipar el environment con propiedades opcionales de API Keys
 * Esto permite que el interceptor funcione tanto con environment básico como completo
 */
interface EnvironmentApiKeys {
  production: boolean;
  apiUrl: string;
  apiKeysEspecificas?: {
    catalogos?: { dev?: string; staging?: string; prod?: string };
    multiclaves?: { dev?: string; staging?: string; prod?: string };
    recuperarAgente?: { dev?: string; staging?: string; prod?: string };
    notificador?: { dev?: string; staging?: string; prod?: string };
    generarPdfCotizacionRC?: { dev?: string; staging?: string; prod?: string };
    generarPdfPoliza?: { dev?: string; staging?: string; prod?: string };
    generarQR?: { dev?: string; staging?: string; prod?: string };
  };
  apiKeysComunes?: { dev?: string; staging?: string; prod?: string };
  apiKeysGCP?: { dev?: string; staging?: string; prod?: string };
  apiKeysAWSActuaria?: { dev?: string; staging?: string; prod?: string };
  apiKeysOpenL?: { dev?: string; staging?: string; prod?: string };
  apiKeysCumplimiento?: { dev?: string; staging?: string; prod?: string };
}

/**
 * ✅ Interceptor para agregar header x-api-key automáticamente
 * según el tipo de servicio (Comunes, GCP, AWS Actuaría, OpenL)
 * 
 * IMPORTANTE: Cada servicio de Comunes tiene su propia API Key.
 * Este interceptor detecta el servicio por URL y usa la API Key correcta.
 * 
 * Basado en la documentación de microservicios y colección de Postman
 * 
 * NOTA: Compatible con environment básico (sin API Keys) y completo (con API Keys)
 */
@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  // ✅ Cast del environment para acceso tipado con propiedades opcionales
  private readonly env = environment as EnvironmentApiKeys;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // ✅ Determinar qué API Key usar según la URL
    const apiKey = this.getApiKeyForUrl(request.url);

    // ✅ LOG: Para validación local - Ver en Console del navegador
    if (apiKey && this.isComunesUrl(request.url)) {
      const servicio = this.detectarServicioComunes(request.url);
      console.log('🔑 [ApiKeyInterceptor] Agregando API Key a Comunes:', {
        url: request.url,
        servicio: servicio,
        apiKey: apiKey.substring(0, 15) + '...', // Solo primeros 15 caracteres por seguridad
        ambiente: this.getAmbiente(),
      });
    }

    // ✅ Si no hay API Key para esta URL, continuar sin modificar
    if (!apiKey) {
      return next.handle(request);
    }

    // ✅ Verificar si ya tiene x-api-key (no sobrescribir)
    if (request.headers.has('x-api-key')) {
      return next.handle(request);
    }

    // ✅ Clonar la petición y agregar x-api-key
    const modifiedRequest = request.clone({
      setHeaders: {
        'x-api-key': apiKey,
      },
    });

    return next.handle(modifiedRequest);
  }

  /**
   * ✅ Detectar qué servicio de Comunes es según la URL
   * Para logging y validación local
   */
  private detectarServicioComunes(url: string): string {
    if (this.isCatalogosUrl(url)) return 'Catalogos';
    if (this.isMulticlavesUrl(url)) return 'Multiclaves';
    if (this.isRecuperarAgenteUrl(url)) return 'Recuperar Agente';
    if (this.isNotificadorUrl(url)) return 'Notificador';
    if (this.isGenerarPdfCotizacionRCUrl(url)) return 'Generar PDF Cotización RC';
    if (this.isGenerarPdfPolizaUrl(url)) return 'Generar PDF Póliza';
    if (this.isGenerarQRUrl(url)) return 'Generar QR';
    if (url.includes('/terceros/')) return 'Terceros';
    if (url.includes('/sarlaft/')) return 'SARLAFT';
    return 'Comunes (Genérico)';
  }

  /**
   * ✅ Obtener API Key según la URL del servicio
   * Detecta el servicio específico y usa la API Key correspondiente
   * @param url URL de la petición
   * @returns API Key o null si no aplica
   * 
   * NOTA: Usa optional chaining para ser compatible con environment básico
   */
  private getApiKeyForUrl(url: string): string | null {
    // ✅ Determinar ambiente (dev, staging, prod)
    const ambiente = this.getAmbiente();

    // ✅ Servicios de Comunes - API Keys específicas por servicio
    if (this.isComunesUrl(url)) {
      // Catalogos (COMUNES_001)
      if (this.isCatalogosUrl(url)) {
        return this.env.apiKeysEspecificas?.catalogos?.[ambiente] || null;
      }

      // Multiclaves (COMUNES_007)
      if (this.isMulticlavesUrl(url)) {
        return this.env.apiKeysEspecificas?.multiclaves?.[ambiente] || null;
      }

      // Recuperar Agente (COMUNES_008)
      if (this.isRecuperarAgenteUrl(url)) {
        return this.env.apiKeysEspecificas?.recuperarAgente?.[ambiente] || null;
      }

      // Notificador (COMUNES_009)
      if (this.isNotificadorUrl(url)) {
        return this.env.apiKeysEspecificas?.notificador?.[ambiente] || null;
      }

      // Generar PDF Cotización RC (COMUNES_010)
      if (this.isGenerarPdfCotizacionRCUrl(url)) {
        return this.env.apiKeysEspecificas?.generarPdfCotizacionRC?.[ambiente] || null;
      }

      // Generar PDF Póliza (COMUNES_011)
      if (this.isGenerarPdfPolizaUrl(url)) {
        return this.env.apiKeysEspecificas?.generarPdfPoliza?.[ambiente] || null;
      }

      // Generar QR PDF (COMUNES_012)
      if (this.isGenerarQRUrl(url)) {
        return this.env.apiKeysEspecificas?.generarQR?.[ambiente] || null;
      }

      // ✅ Para otros servicios de Comunes, usar API Key genérica
      return this.env.apiKeysComunes?.[ambiente] || null;
    }

    // ✅ Servicios GCP (HTTP Proxy)
    if (this.isGCPProxyUrl(url)) {
      return this.env.apiKeysGCP?.[ambiente] || null;
    }

    // ✅ Servicios AWS Actuaría (Ingeniero Digital)
    if (this.isAWSActuariaUrl(url)) {
      return this.env.apiKeysAWSActuaria?.[ambiente] || null;
    }

    // ✅ Servicios OpenL
    if (this.isOpenLUrl(url)) {
      return this.env.apiKeysOpenL?.[ambiente] || null;
    }

    // ✅ Servicios de Cumplimiento Digital
    if (this.isCumplimientoUrl(url)) {
      return this.env.apiKeysCumplimiento?.[ambiente] || null;
    }

    return null;
  }

  /**
   * ✅ Determinar ambiente actual
   * @returns 'dev', 'staging' o 'prod'
   */
  private getAmbiente(): 'dev' | 'staging' | 'prod' {
    if (this.env.production) {
      return 'prod';
    }
    // TODO: Detectar staging vs dev de forma más precisa
    // Por ahora, asumimos que si no es production, es dev
    return 'dev';
  }

  // ========================================
  // DETECCIÓN DE SERVICIOS DE COMUNES
  // ========================================

  /**
   * ✅ Verificar si es URL de servicios de Comunes
   */
  private isComunesUrl(url: string): boolean {
    return (
      url.includes('fz73xehwah.execute-api') || // API Gateway Comunes Dev
      url.includes('c4huz7dmpc-vpce') || // API Gateway Comunes Stage
      url.includes('03l44gahq8-vpce') || // API Gateway Comunes Prod
      url.includes('/catalogos/') ||
      url.includes('/persona_administracion/') ||
      url.includes('/personas_sarlaft/') ||
      url.includes('/personas/') ||
      url.includes('/sarlaft/') ||
      url.includes('/notificacion/') ||
      url.includes('/notificador/') ||
      url.includes('/recursos_humanos/') ||
      url.includes('/comunes/') ||
      url.includes('/poliza_administracion/') ||
      url.includes('/poliza/') ||
      url.includes('/poliza_transversal/')
    );
  }

  /**
   * ✅ Verificar si es URL de Catalogos (COMUNES_001)
   */
  private isCatalogosUrl(url: string): boolean {
    return url.includes('/catalogos/') || url.includes('/datosvariables');
  }

  /**
   * ✅ Verificar si es URL de Multiclaves (COMUNES_007)
   */
  private isMulticlavesUrl(url: string): boolean {
    return url.includes('/multiclaves') || url.includes('/recursos_humanos/');
  }

  /**
   * ✅ Verificar si es URL de Recuperar Agente (COMUNES_008)
   */
  private isRecuperarAgenteUrl(url: string): boolean {
    return url.includes('/agentes/') && url.includes('/personas/');
  }

  /**
   * ✅ Verificar si es URL de Notificador (COMUNES_009)
   */
  private isNotificadorUrl(url: string): boolean {
    return url.includes('/notificacion/') || url.includes('/notificador/');
  }

  /**
   * ✅ Verificar si es URL de Generar PDF Cotización RC (COMUNES_010)
   */
  private isGenerarPdfCotizacionRCUrl(url: string): boolean {
    return url.includes('/cotizacion/pdf') && url.includes('/poliza_administracion/');
  }

  /**
   * ✅ Verificar si es URL de Generar PDF Póliza (COMUNES_011)
   */
  private isGenerarPdfPolizaUrl(url: string): boolean {
    return url.includes('/polizas/Pdf') && url.includes('/poliza/');
  }

  /**
   * ✅ Verificar si es URL de Generar QR PDF (COMUNES_012)
   */
  private isGenerarQRUrl(url: string): boolean {
    return url.includes('/procesarestampadocodigoqr') || url.includes('/poliza_transversal/');
  }

  // ========================================
  // DETECCIÓN DE OTROS SERVICIOS
  // ========================================

  /**
   * ✅ Verificar si es URL de servicios GCP (HTTP Proxy)
   */
  private isGCPProxyUrl(url: string): boolean {
    return (
      url.includes('z0jo90imu8.execute-api') && // API Gateway GCP Dev
      (url.includes('/gcp-lector-contratos/') || url.includes('/gcp-lector-estados-financieros/'))
    );
  }

  /**
   * ✅ Verificar si es URL de servicios AWS Actuaría
   */
  private isAWSActuariaUrl(url: string): boolean {
    return url.includes('/ingeniero-digital/') || url.includes('/dataops/proxy/graphql/');
  }

  /**
   * ✅ Verificar si es URL de servicios OpenL
   */
  private isOpenLUrl(url: string): boolean {
    return (
      url.includes('o75yqp457c.execute-api') || // API Gateway OpenL Dev
      url.includes('/negocios-patrimoniales/')
    );
  }

  /**
   * ✅ Verificar si es URL de servicios de Cumplimiento Digital
   */
  private isCumplimientoUrl(url: string): boolean {
    return (
      url.includes('0hnhthss25.execute-api') || // API Gateway Cumplimiento
      url.includes('/emision/') ||
      url.includes('/negocios/')
    );
  }
}
