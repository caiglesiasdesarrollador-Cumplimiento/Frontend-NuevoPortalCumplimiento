import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  IGenerarPdfCotizacionRCRequest,
  IGenerarPdfCotizacionRCResponse,
  IGenerarPdfPolizaRequest,
  IGenerarPdfPolizaResponse,
} from '../interfaces/comunes.interface';

/**
 * ✅ COMUNES_010, COMUNES_011: Servicio para generar PDFs
 *
 * Servicios disponibles:
 * - COMUNES_010: Generar PDF de cotización de RC
 * - COMUNES_011: Generar PDF de póliza (CU y RC)
 *
 * Basado en documentación de microservicios
 */
@Injectable({
  providedIn: 'root',
})
export class GenerarPdfService {
  private readonly baseUrlCotizacion: string;
  private readonly baseUrlPoliza: string;

  constructor(private readonly http: HttpClient) {
    // ✅ Usar proxy en desarrollo para evitar CORS, URL directa en producción
    const ambiente = environment.production ? 'prod' : 'dev';
    
    if (environment.production) {
      // ✅ Producción: usar URL directa del API Gateway
      const apiGateway = environment.apiGatewayComunes[ambiente];
      this.baseUrlCotizacion = `${apiGateway}/poliza_administracion/api/v1/cotizacion`;
      this.baseUrlPoliza = `${apiGateway}/poliza/api/v1/polizas`;
    } else {
      // ✅ Desarrollo: usar proxy para evitar CORS
      // El proxy ya está configurado en proxy.conf.json
      this.baseUrlCotizacion = `/proxy/comunes-personas-administracion/poliza_administracion/api/v1/cotizacion`;
      this.baseUrlPoliza = `/proxy/comunes-personas-administracion/poliza/api/v1/polizas`;
    }
  }

  /**
   * ✅ COMUNES_010: Generar PDF de cotización de RC
   * @param compania Código de compañía (por defecto '3')
   * @param seccion Código de sección ('10' o '66')
   * @param ramo Código de ramo ('214' o '778')
   * @param endoso Número de endoso (por defecto '0')
   * @param secuPoliza Secuencia de póliza
   * @param numeroCotizacion Número de cotización
   * @param riesgo Código de riesgo (por defecto '1')
   * @param tipoCotizacion Tipo de cotización (por defecto '3')
   * @param usuario Código de usuario
   * @returns Observable con PDF en Base64
   */
  generarPdfCotizacionRC(
    compania: string,
    seccion: string,
    ramo: string,
    secuPoliza: string,
    numeroCotizacion: string,
    usuario: string,
    endoso: string = '0',
    riesgo: string = '1',
    tipoCotizacion: string = '3',
  ): Observable<IGenerarPdfCotizacionRCResponse> {
    // ✅ Validar parámetros requeridos
    if (!secuPoliza || !numeroCotizacion || !usuario) {
      throw new Error('Secuencia de póliza, número de cotización y usuario son requeridos');
    }

    // ✅ Construir parámetros de query
    const params = new HttpParams()
      .set('compania', compania)
      .set('seccion', seccion)
      .set('ramo', ramo)
      .set('endoso', endoso)
      .set('secuPoliza', secuPoliza)
      .set('numeroCotizacion', numeroCotizacion)
      .set('riesgo', riesgo)
      .set('tipoCotizacion', tipoCotizacion)
      .set('usuario', usuario);

    // ✅ Realizar petición GET
    return this.http.get<IGenerarPdfCotizacionRCResponse>(`${this.baseUrlCotizacion}/pdf`, {
      params,
    });
  }

  /**
   * ✅ COMUNES_011: Generar PDF de póliza
   * @param compania Código de compañía (por defecto '3')
   * @param seccion Código de sección ('10' o '66')
   * @param ramo Código de ramo ('214' o '778')
   * @param endoso Número de endoso (por defecto '0')
   * @param secuPoliza Secuencia de póliza
   * @param numeroPoliza Número de póliza
   * @param riesgo Código de riesgo (por defecto '1')
   * @param tipoPoliza Tipo de póliza ('1' o '2')
   * @param usuario Código de usuario
   * @param numeroSubProducto Número de subproducto (opcional)
   * @returns Observable con PDF en Base64
   */
  generarPdfPoliza(
    compania: string,
    seccion: string,
    ramo: string,
    secuPoliza: string,
    numeroPoliza: string,
    tipoPoliza: string,
    usuario: string,
    endoso: string = '0',
    riesgo: string = '1',
    numeroSubProducto?: string,
  ): Observable<IGenerarPdfPolizaResponse> {
    // ✅ Validar parámetros requeridos
    if (!secuPoliza || !numeroPoliza || !tipoPoliza || !usuario) {
      throw new Error(
        'Secuencia de póliza, número de póliza, tipo de póliza y usuario son requeridos',
      );
    }

    // ✅ Construir parámetros de query
    const params = new HttpParams()
      .set('compania', compania)
      .set('endoso', endoso)
      .set('numeroPoliza', numeroPoliza)
      .set('ramo', ramo)
      .set('riesgo', riesgo)
      .set('seccion', seccion)
      .set('secuPoliza', secuPoliza)
      .set('numeroSubProducto', numeroSubProducto || '')
      .set('tipoPoliza', tipoPoliza)
      .set('usuario', usuario);

    // ✅ Realizar petición GET
    return this.http.get<IGenerarPdfPolizaResponse>(`${this.baseUrlPoliza}/Pdf`, {
      params,
    });
  }
}
