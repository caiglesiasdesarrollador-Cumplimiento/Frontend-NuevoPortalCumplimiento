/**
 * ✅ Servicio para procesamiento de estados financieros con IA
 * 
 * Consume el endpoint: /gcp-lector-estados-financieros/procesarArchivo
 * Se ejecuta automáticamente cuando el cliente es nuevo o no tiene cupo suficiente
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoggerService } from './logger.service';

export interface IFinancialStatementResponse {
  success: boolean;
  datosExtraidos?: any;
  mensaje?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root',
})
export class FinancialStatementService {
  private readonly _baseUrl: string;
  private readonly _apiKey: string;
  private readonly _timeoutMs = 60000; // 60 segundos timeout

  constructor(
    private readonly _http: HttpClient,
    private readonly logger: LoggerService,
  ) {
    // ✅ Configurar URL base del servicio de lector de estados financieros
    this._baseUrl = 'https://z0jo90imu8.execute-api.us-east-1.amazonaws.com/dev/gcp-lector-estados-financieros/procesarArchivo';
    this._apiKey = environment.apiKeyComunes || '';
  }

  /**
   * ✅ Procesar estados financieros
   * 
   * @param archivo Archivo PDF de estados financieros
   * @param correoUsuario Correo electrónico del usuario
   * @returns Observable con respuesta del procesamiento
   */
  procesarEstadosFinancieros(
    archivo: File,
    correoUsuario: string,
  ): Observable<IFinancialStatementResponse> {
    // ✅ Validar parámetros de entrada
    if (!archivo) {
      return throwError(() => new Error('El archivo es requerido'));
    }

    if (!correoUsuario || !correoUsuario.trim()) {
      return throwError(() => new Error('El correo del usuario es requerido'));
    }

    // ✅ Validar tipo de archivo (solo PDF según especificación)
    const extension = '.' + archivo.name.split('.').pop()?.toLowerCase();
    if (extension !== '.pdf') {
      return throwError(() => new Error('Solo se permiten archivos PDF para estados financieros'));
    }

    // ✅ Validar tamaño máximo (30 MB)
    const maxSizeBytes = 30 * 1024 * 1024;
    if (archivo.size > maxSizeBytes) {
      return throwError(() => new Error('El tamaño máximo del archivo es 30 MB'));
    }

    // ✅ Construir FormData según especificación del endpoint
    const formData = new FormData();
    formData.append('file', archivo);
    formData.append('correo_usuario', correoUsuario.trim());

    // ✅ Headers con API Key
    const headers = new HttpHeaders({
      'x-api-key': this._apiKey,
    });

    this.logger.debug('Enviando estados financieros para procesamiento', {
      nombreArchivo: archivo.name,
      tamaño: archivo.size,
      tipo: archivo.type,
      correoUsuario,
      url: this._baseUrl,
    });

    // ✅ Realizar petición HTTP al servicio real
    return this._http.post<any>(this._baseUrl, formData, { headers }).pipe(
      timeout(this._timeoutMs),
      map((response: any) => {
        this.logger.debug('Respuesta del servicio de lector de estados financieros', response);

        // ✅ Mapear respuesta del backend a la estructura esperada
        const respuestaMapeada: IFinancialStatementResponse = {
          success: true,
          datosExtraidos: response.datosExtraidos || response.data || response,
          mensaje: response.mensaje || response.message || 'Estados financieros procesados exitosamente',
        };

        return respuestaMapeada;
      }),
      catchError((error: any) => {
        this.logger.error('Error al procesar estados financieros', error);

        return throwError(() => ({
          success: false,
          error: error.message || 'Error al procesar los estados financieros',
          detalles: error,
        }));
      }),
    );
  }
}
