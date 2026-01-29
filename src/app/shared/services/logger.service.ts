import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

/**
 * ✅ Niveles de log disponibles
 */
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4,
}

/**
 * ✅ Servicio de logging configurable
 * 
 * Características:
 * - Respeta el ambiente (dev muestra más logs, prod menos)
 * - Permite diferentes niveles de log
 * - Puede deshabilitarse completamente en producción
 * - Formatea los mensajes de forma consistente
 * - No afecta el rendimiento en producción
 */
@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private readonly logLevel: LogLevel;
  private readonly isProduction: boolean;
  private readonly enableLogging: boolean;

  constructor() {
    this.isProduction = environment.production;
    
    // ✅ En producción: solo ERROR por defecto, en desarrollo: DEBUG
    this.logLevel = this.isProduction ? LogLevel.ERROR : LogLevel.DEBUG;
    
    // ✅ Permitir deshabilitar logs completamente en producción si es necesario
    // Puedes agregar una variable en environment.ts: enableLogging: false
    this.enableLogging = (environment as any).enableLogging !== false;
  }

  /**
   * ✅ Log de debug (solo en desarrollo)
   * @param message Mensaje principal
   * @param data Datos adicionales (opcional)
   */
  debug(message: string, ...data: any[]): void {
    if (!this.enableLogging || this.logLevel > LogLevel.DEBUG) {
      return;
    }
    
    const prefix = this.getPrefix('DEBUG');
    if (data.length > 0) {
      console.log(prefix + message, ...data);
    } else {
      console.log(prefix + message);
    }
  }

  /**
   * ✅ Log de información
   * @param message Mensaje principal
   * @param data Datos adicionales (opcional)
   */
  info(message: string, ...data: any[]): void {
    if (!this.enableLogging || this.logLevel > LogLevel.INFO) {
      return;
    }
    
    const prefix = this.getPrefix('INFO');
    if (data.length > 0) {
      console.info(prefix + message, ...data);
    } else {
      console.info(prefix + message);
    }
  }

  /**
   * ✅ Log de advertencia
   * @param message Mensaje principal
   * @param data Datos adicionales (opcional)
   */
  warn(message: string, ...data: any[]): void {
    if (!this.enableLogging || this.logLevel > LogLevel.WARN) {
      return;
    }
    
    const prefix = this.getPrefix('WARN');
    if (data.length > 0) {
      console.warn(prefix + message, ...data);
    } else {
      console.warn(prefix + message);
    }
  }

  /**
   * ✅ Log de error (siempre visible, incluso en producción)
   * @param message Mensaje principal
   * @param error Error o datos adicionales (opcional)
   */
  error(message: string, error?: any): void {
    if (!this.enableLogging || this.logLevel > LogLevel.ERROR) {
      return;
    }
    
    const prefix = this.getPrefix('ERROR');
    if (error) {
      console.error(prefix + message, error);
    } else {
      console.error(prefix + message);
    }
  }

  /**
   * ✅ Log con contexto (útil para servicios)
   * @param context Contexto del log (ej: nombre del servicio)
   * @param level Nivel de log
   * @param message Mensaje
   * @param data Datos adicionales (opcional)
   */
  logWithContext(
    context: string,
    level: 'debug' | 'info' | 'warn' | 'error',
    message: string,
    ...data: any[]
  ): void {
    const fullMessage = `[${context}] ${message}`;
    
    switch (level) {
      case 'debug':
        this.debug(fullMessage, ...data);
        break;
      case 'info':
        this.info(fullMessage, ...data);
        break;
      case 'warn':
        this.warn(fullMessage, ...data);
        break;
      case 'error':
        this.error(fullMessage, data[0]);
        break;
    }
  }

  /**
   * ✅ Obtener prefijo formateado para los logs
   * @param level Nivel de log
   * @returns Prefijo formateado
   */
  private getPrefix(level: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] `;
  }

  /**
   * ✅ Verificar si un nivel de log está habilitado
   * @param level Nivel a verificar
   * @returns true si está habilitado
   */
  isLevelEnabled(level: LogLevel): boolean {
    return this.enableLogging && this.logLevel <= level;
  }
}
