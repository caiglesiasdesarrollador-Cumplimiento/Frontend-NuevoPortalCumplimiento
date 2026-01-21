import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SessionService } from './session.service';
import { ConfigService } from './config.service';
import {
  ICatalogoRequest,
  ICatalogoResponse,
} from '../interfaces/comunes.interface';

/**
 * ✅ COMUNES_001: Servicio para consultar catálogos comunes
 * 
 * Listas disponibles:
 * - DEPARTAMENTOS_CIUDAD: Ciudades y departamentos
 * - TIPOS_CONTRATO_CU: Tipos de contratos de Cumplimiento
 * - MODALIDAD_REASEGUROS: Modalidades de reaseguros
 * - TIPO_GARANTIA: Tipos de garantía
 * 
 * Basado en documentación de microservicios
 */
@Injectable({
  providedIn: 'root',
})
export class CatalogosService {
  private readonly baseUrl: string;

  constructor(
    private readonly http: HttpClient,
    private readonly sessionService: SessionService,
    private readonly configService: ConfigService,
  ) {
    // ✅ Usar API Gateway Comunes según ambiente
    const ambiente = environment.production ? 'prod' : 'dev';
    this.baseUrl = `${environment.apiGatewayComunes[ambiente]}/catalogos/api/v1/poliza`;
  }

  /**
   * ✅ Obtener catálogo según código de lista
   * @param codigoLista Código de la lista (ej: 'TIPOS_CONTRATO_CU', 'DEPARTAMENTOS_CIUDAD')
   * @param codigo Código específico (opcional)
   * @param codigoDepende Código del que depende (opcional)
   * @param like Búsqueda por coincidencia (opcional)
   * @param validacion Validación (opcional)
   * @returns Observable con lista de items del catálogo
   */
  obtenerCatalogo(
    codigoLista: string,
    codigo?: string,
    codigoDepende?: string,
    like?: string,
    validacion?: string | null,
  ): Observable<ICatalogoResponse> {
    // ✅ Obtener código de usuario de la sesión
    const codUsr = this.sessionService.getCodUsr();
    if (!codUsr) {
      throw new Error('No se encontró código de usuario en la sesión');
    }

    // ✅ Construir parámetros de query
    const params = new HttpParams()
      .set('ip_Codigolista', codigoLista)
      .set('ip_Codigo', codigo || '')
      .set('ip_Codigodepende', codigoDepende || '')
      .set('ip_Like', like || '')
      .set('ip_Validacion', validacion || '');

    // ✅ Obtener headers de proceso
    const procesoHeaders = this.configService.getProcesoHeaders(codUsr);

    // ✅ LOG: Para validación local - Ver en Console del navegador
    const urlCompleta = `${this.baseUrl}/datosvariables?${params.toString()}`;
    console.log('🔍 [CatalogosService] Petición a Comunes:', {
      url: urlCompleta,
      baseUrl: this.baseUrl,
      ambiente: environment.production ? 'prod' : 'dev',
      headers: procesoHeaders,
      params: params.toString(),
    });

    // ✅ Realizar petición GET
    return this.http.get<ICatalogoResponse>(`${this.baseUrl}/datosvariables`, {
      params,
      headers: procesoHeaders,
    }).pipe(
      tap(response => {
        // ✅ LOG: Respuesta exitosa
        console.log('✅ [CatalogosService] Respuesta exitosa:', response);
      }),
      catchError(error => {
        // ✅ LOG: Error en la petición
        console.error('❌ [CatalogosService] Error:', {
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          error: error.error,
          url: urlCompleta,
        });
        return throwError(() => error);
      })
    );
  }

  /**
   * ✅ Obtener lista de departamentos y ciudades
   * @param codigoDepartamento Código del departamento (opcional)
   * @returns Observable con lista de departamentos/ciudades
   */
  obtenerDepartamentosCiudades(codigoDepartamento?: string): Observable<ICatalogoResponse> {
    return this.obtenerCatalogo('DEPARTAMENTOS_CIUDAD', codigoDepartamento);
  }

  /**
   * ✅ Obtener tipos de contrato de Cumplimiento
   * @returns Observable con lista de tipos de contrato
   */
  obtenerTiposContratoCU(): Observable<ICatalogoResponse> {
    return this.obtenerCatalogo('TIPOS_CONTRATO_CU');
  }

  /**
   * ✅ Obtener modalidades de reaseguros
   * @returns Observable con lista de modalidades
   */
  obtenerModalidadReaseguros(): Observable<ICatalogoResponse> {
    return this.obtenerCatalogo('MODALIDAD_REASEGUROS');
  }

  /**
   * ✅ Obtener tipos de garantía
   * @returns Observable con lista de tipos de garantía
   */
  obtenerTiposGarantia(): Observable<ICatalogoResponse> {
    return this.obtenerCatalogo('TIPO_GARANTIA');
  }
}

