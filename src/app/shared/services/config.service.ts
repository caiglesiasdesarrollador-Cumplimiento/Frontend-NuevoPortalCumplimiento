import { Injectable } from '@angular/core';

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
   * Sistema origen (196 = Cumplimiento Digital según documentación)
   * Nota: En algunos casos puede ser '100', pero por defecto usamos '196'
   */
  readonly sistemaOrigen = '196';

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
  getProcesoHeaders(codUsr: string, codProducto: string = this.codProducto): Record<string, string> {
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
   * Obtener headers comunes para servicios de Comunes (con API Key)
   * @param codUsr Código de usuario (obligatorio)
   * @returns Objeto con headers comunes
   */
  getComunesHeaders(codUsr: string): Record<string, string> {
    return {
      codUsr: codUsr,
      sistemaOrigen: this.sistemaOrigen,
      paisISO: this.pais,
      direccionIP: '',
      info1: '',
    };
  }
}


