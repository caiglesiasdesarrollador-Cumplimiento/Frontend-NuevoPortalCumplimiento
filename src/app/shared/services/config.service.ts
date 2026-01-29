import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

/**
 * ✅ Servicio de configuración con valores por defecto del sistema
 * Evita hardcodear valores en múltiples lugares
 * Valores basados en la colección de Postman y documentación
 */
@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  // ✅ Valores por defecto según colección de Postman y documentación

  /**
   * Código de compañía (Seguros Bolívar)
   */
  readonly codCia = '3';

  /**
   * Código de sección
   */
  readonly codSecc = '4';

  /**
   * Sistema origen (100 = según colección de Postman DEV)
   */
  readonly sistemaOrigen = '100';

  /**
   * País (1 = Colombia)
   */
  readonly pais = '1';

  /**
   * Canal (3 = Intermediarios según documentación)
   */
  readonly canal = '3';

  /**
   * Entidad colocadora (0 = Sin entidad específica)
   */
  readonly entidadColocadora = '0';

  /**
   * Módulo (2 = Cumplimiento según documentación)
   */
  readonly modulo = '2';

  /**
   * Proceso (241 según colección de Postman)
   */
  readonly proceso = '241';

  /**
   * Subproceso (240 según colección de Postman)
   */
  readonly subproceso = '240';

  /**
   * Código de producto (440 = Cumplimiento según documentación)
   */
  readonly codProducto = '440';

  /**
   * Obtener objeto con todos los headers de proceso para servicios de Comunes
   * @param codUsr Código de usuario (obligatorio)
   * @param codProducto Código de producto (opcional, por defecto '440')
   * @returns Objeto con headers de proceso
   */
  getProcesoHeaders(
    codUsr: string,
    codProducto: string = this.codProducto,
  ): Record<string, string> {
    return {
      codProducto: codProducto,
      modulo: this.modulo,
      proceso: this.proceso,
      subproceso: this.subproceso,
      codcia: this.codCia,
      codsecc: this.codSecc,
      codusr: codUsr,
      entidadcolocadora: this.entidadColocadora,
      canal: this.canal,
      sistemaorigen: this.sistemaOrigen,
    };
  }

  /**
   * Obtener API Key (usa apiKey principal, fallback a apiKeyComunes)
   */
  getApiKey(): string {
    return environment.apiKey || environment.apiKeyComunes || '';
  }

  /**
   * Obtener headers comunes para servicios de Comunes - Personas Jurídicas
   * @param codUsr Código de usuario (obligatorio)
   * @returns Objeto con headers comunes
   */
  getComunesHeaders(codUsr: string): Record<string, string> {
    return {
      'x-api-key': this.getApiKey(),
      'codUsr': codUsr,
      'sistemaOrigen': this.sistemaOrigen,
      'paisISO': this.pais,
      'direccionIP': '',
      'info1': '',
    };
  }

  /**
   * Obtener headers comunes para servicios de Comunes - Personas Naturales
   * @param codUsr Código de usuario (obligatorio)
   * @returns HttpHeaders con headers comunes (info1 = 'N')
   * 
   * ⚠️ IMPORTANTE CORS:
   * Los navegadores normalizan los headers a minúsculas en el preflight CORS.
   * El backend DEBE tener configurado en Access-Control-Allow-Headers:
   * - paisiso (minúsculas) - requerido por CORS preflight
   * - paisISO (mayúsculas) - opcional, para compatibilidad
   * Lo mismo aplica para: sistemaorigen, codusr, info1, x-api-key
   */
  getComunesHeadersNaturales(codUsr: string): HttpHeaders {
    const headers: { [key: string]: string } = {
      'x-api-key': this.getApiKey(),
      'sistemaOrigen': this.sistemaOrigen,
      'codUsr': codUsr,
      'paisISO': this.pais,
      'info1': 'N',
    };
    
    // Solo agregar direccionIp si tiene valor (no enviar vacío)
    // Nota: El CURL del usuario muestra 'direccionIp;' pero parece ser un error de sintaxis
    
    return new HttpHeaders(headers);
  }
}
