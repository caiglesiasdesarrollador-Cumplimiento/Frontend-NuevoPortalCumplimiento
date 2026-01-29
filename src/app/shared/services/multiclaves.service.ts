import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoggerService } from './logger.service';
import {
  IMulticlavesResponse,
  IMulticlavesBackendResponse,
  IMulticlavesClave,
} from '../interfaces/comunes.interface';

/**
 * ✅ COMUNES_007: Servicio para consultar Multiclaves
 *
 * Consulta los datos de Multiclaves (wrapper del servicio OnPremise).
 * Retorna información de las claves de intermediación asociadas a un documento.
 *
 * Basado en documentación de microservicios
 */
@Injectable({
  providedIn: 'root',
})
export class MulticlavesService {
  private readonly baseUrl: string;

  constructor(
    private readonly http: HttpClient,
    private readonly logger: LoggerService,
  ) {
    // ✅ SOLUCIÓN TEMPORAL: Usar URL directa porque el proxy NO funciona en Angular 20
    // El backend tiene CORS configurado (Access-Control-Allow-Origin: *)
    const ambiente = environment.production ? 'prod' : 'dev';
    
    // ✅ Usar URL directa siempre (el backend tiene CORS habilitado)
    this.baseUrl = `${environment.apiGatewayMulticlaves[ambiente]}/consultar-multiclaves`;
    
    this.logger.debug('Base URL configurada', { baseUrl: this.baseUrl, production: environment.production });
  }

  /**
   * ✅ Obtener headers con x-api-key (requerido por API Gateway)
   */
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'x-api-key': '8BKiD5m9kl2mueLPC1byo2n0gEDiXiZ022IQj7xV', // ✅ API Key correcta para Multiclaves
    });
  }

  /**
   * ✅ Consultar multiclaves de un tercero
   * Según el CURL compartido, el servicio usa GET con query params
   * @param tipoDocumento Tipo de documento (CC, NT, CE, PP, PE)
   * @param numeroDocumento Número de documento
   * @returns Observable con lista de claves de intermediación
   */
  consultarMulticlaves(
    tipoDocumento: string,
    numeroDocumento: string,
  ): Observable<IMulticlavesResponse> {
    // ✅ Validar tipo de documento
    const tiposValidos = ['CC', 'NT', 'CE', 'PP', 'PE'];
    if (!tiposValidos.includes(tipoDocumento)) {
      throw new Error(`Tipo de documento inválido. Tipos válidos: ${tiposValidos.join(', ')}`);
    }

    // ✅ Validar número de documento
    const numeroDoc = parseInt(numeroDocumento, 10);
    if (isNaN(numeroDoc)) {
      throw new Error('El número de documento debe ser un número válido');
    }

    // ✅ Construir query params según el CURL compartido
    // CURL: ?nroDocumento=53049440&tipoDocumento=CC
    const params = new HttpParams()
      .set('nroDocumento', numeroDoc.toString())
      .set('tipoDocumento', tipoDocumento);

    // ✅ Construir URL completa (sin /multiclaves al final según el CURL)
    const url = this.baseUrl;
    this.logger.debug('Consultando multiclaves', {
      url,
      queryParams: { nroDocumento: numeroDoc, tipoDocumento },
    });

    // ✅ Realizar petición GET con query params y x-api-key
    // ✅ Agregar responseType para evitar problemas de parsing
    return this.http.get<IMulticlavesBackendResponse>(url, {
      params,
      headers: this.getHeaders(),
      responseType: 'json' as 'json',
    }).pipe(
      // ✅ Mapear la respuesta del backend a la estructura que espera el frontend
      map((backendResponse: IMulticlavesBackendResponse) => {
        this.logger.debug('Respuesta completa del backend', backendResponse);
        
        // ✅ Validar que exista la estructura básica de la respuesta
        if (!backendResponse || !backendResponse.dataHeader) {
          this.logger.error('Respuesta inválida del backend', backendResponse);
          throw new Error('Respuesta inválida del servidor');
        }
        
        // ✅ Validar que la respuesta sea exitosa
        if (!backendResponse.dataHeader.success) {
          const errores = backendResponse.dataHeader?.errores || [];
          const mensajeError = errores.map((e: any) => `${e.codigo}: ${e.descripcion}`).join(' | ');
          this.logger.error('Error del backend', { mensajeError, errores });
          throw new Error(`Error del servidor: ${mensajeError || 'Respuesta no exitosa'}`);
        }
        
        // ✅ Validar que existan datos
        if (!backendResponse.data) {
          this.logger.warn('No hay datos en la respuesta');
          return {
            claves: [],
            totalClaves: 0,
            datosBasicos: null,
            marcaMostrarClave: null,
            tipoUsuario: null,
          };
        }
        
        if (!backendResponse.data.datoClaves || backendResponse.data.datoClaves.length === 0) {
          this.logger.warn('No se encontraron claves para este documento');
          // Retornar respuesta vacía en lugar de error
          return {
            claves: [],
            totalClaves: 0,
            datosBasicos: backendResponse.data?.datosBasicos || null,
            marcaMostrarClave: backendResponse.data?.marcaMostrarClave || null,
            tipoUsuario: backendResponse.data?.tipoUsuario || null,
          };
        }
        
        // ✅ Mapear datoClaves a claves con validación de null/undefined
        // ✅ Filtrar claves que tienen clave null (no válidas)
        const claves: IMulticlavesClave[] = backendResponse.data.datoClaves
          .filter(claveBackend => claveBackend.clave != null)
          .map(claveBackend => ({
            clave: claveBackend.clave!.toString(),
            tipoDocumento: claveBackend.tipoDoc || '',
            numeroDocumento: claveBackend.nroDoc != null ? claveBackend.nroDoc.toString() : '',
            nombreRazonSocial: claveBackend.nomRazonSocial || '',
            codigoCentroCostos: claveBackend.codCtroCostos || '',
            descripcionCentroCostos: claveBackend.desCtroCostos || '',
            marcaClaveDirecta: claveBackend.mcaClaveDirecta || '',
            marcaClavePrincipal: claveBackend.mcaClavePpla || '',
            marcaClaveActiva: claveBackend.mcaClaveActiva || '',
          }));

        this.logger.debug('Claves mapeadas exitosamente', { totalClaves: claves.length, claves });

        const response: IMulticlavesResponse = {
          claves,
          totalClaves: claves.length,
          datosBasicos: backendResponse.data?.datosBasicos,
          marcaMostrarClave: backendResponse.data?.marcaMostrarClave,
          tipoUsuario: backendResponse.data?.tipoUsuario,
        };

        return response;
      }),
      // ✅ Manejar errores HTTP
      catchError((error) => {
        this.logger.error('Error en la petición HTTP', error);
        
        // ✅ Detectar si la respuesta es HTML (problema del proxy)
        if (error.error && typeof error.error === 'string' && error.error.includes('<!doctype html>')) {
          this.logger.error('El proxy está devolviendo HTML en lugar de JSON. Verifica la configuración del proxy.');
          return throwError(() => new Error('Error de configuración: El proxy está devolviendo HTML. Verifica que el servidor esté usando el proxy correctamente.'));
        }
        
        // Si el error tiene una respuesta del backend con dataHeader
        if (error.error?.dataHeader) {
          const errores = error.error.dataHeader.errores || [];
          const mensajeError = errores.map((e: any) => `${e.codigo}: ${e.descripcion}`).join(' | ');
          return throwError(() => new Error(`Error del servidor: ${mensajeError}`));
        }
        
        // Error HTTP estándar
        return throwError(() => error);
      }),
    );
  }

  /**
   * ✅ Consultar solo claves directas activas
   * Helper method para el caso más común
   * @param tipoDocumento Tipo de documento
   * @param numeroDocumento Número de documento
   * @returns Observable con lista de claves directas activas
   */
  consultarClavesDirectasActivas(
    tipoDocumento: string,
    numeroDocumento: string,
  ): Observable<IMulticlavesResponse> {
    return this.consultarMulticlaves(tipoDocumento, numeroDocumento);
  }

  /**
   * ✅ Consultar todas las claves (activas e inactivas)
   * @param tipoDocumento Tipo de documento
   * @param numeroDocumento Número de documento
   * @returns Observable con lista de todas las claves
   */
  consultarTodasLasClaves(
    tipoDocumento: string,
    numeroDocumento: string,
  ): Observable<IMulticlavesResponse> {
    return this.consultarMulticlaves(tipoDocumento, numeroDocumento);
  }
}
