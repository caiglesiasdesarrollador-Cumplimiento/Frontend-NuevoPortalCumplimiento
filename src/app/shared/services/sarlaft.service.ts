import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SessionService } from './session.service';
import { ConfigService } from './config.service';
import {
  ISarlaftMarcaRequest,
  ISarlaftMarcaResponse,
  ISarlaftGenerarUrlRequest,
  ISarlaftGenerarUrlResponse,
} from '../interfaces/comunes.interface';

/**
 * ✅ COMUNES_005, COMUNES_006: Servicio para SARLAFT
 * 
 * Servicios disponibles:
 * - COMUNES_005: Obtener marca SARLAFT (validar si necesita actualización)
 * - COMUNES_006: Generar URL de conocimiento de cliente
 * 
 * Basado en documentación de microservicios
 */
@Injectable({
  providedIn: 'root',
})
export class SarlaftService {
  private readonly baseUrl: string;
  private readonly baseUrlV1: string;

  constructor(
    private readonly http: HttpClient,
    private readonly sessionService: SessionService,
    private readonly configService: ConfigService,
  ) {
    // ✅ Usar API Gateway Comunes según ambiente
    const ambiente = environment.production ? 'prod' : 'dev';
    const apiGateway = environment.apiGatewayComunes[ambiente];
    this.baseUrl = `${apiGateway}/personas_sarlaft/api/v1`;
    this.baseUrlV1 = `${apiGateway}/personas_sarlaft/api/v1`;
  }

  /**
   * ✅ COMUNES_005: Obtener marca SARLAFT
   * Valida si un tercero necesita actualización de información SARLAFT
   * @param tipoDocumento Tipo de documento (CC, NT, CE, PP, PE)
   * @param numeroDocumento Número de documento
   * @param marcaVlrMinAseg Marca valor mínimo asegurado ('S' o 'N')
   * @param marcaVlrMinPrima Marca valor mínimo prima ('S' o 'N')
   * @returns Observable con resultado de validación SARLAFT
   */
  obtenerMarca(
    tipoDocumento: string,
    numeroDocumento: string,
    marcaVlrMinAseg: string = 'N',
    marcaVlrMinPrima: string = 'N',
  ): Observable<ISarlaftMarcaResponse> {
    // ✅ Obtener código de usuario de la sesión
    const codUsr = this.sessionService.getCodUsr();
    if (!codUsr) {
      throw new Error('No se encontró código de usuario en la sesión');
    }

    // ✅ Construir parámetros de query
    const params = new HttpParams()
      .set('pTipoDocumto', tipoDocumento)
      .set('pNumeroDocumto', numeroDocumento)
      .set('pMcaVlrminAseg', marcaVlrMinAseg)
      .set('pMcaVlrminPrima', marcaVlrMinPrima);

    // ✅ Construir headers específicos para SARLAFT
    const headers = new HttpHeaders({
      'pCodUsr': codUsr,
      'pAgenciaUsr': '4000', // Valor por defecto según documentación
      'pSistemaOrigen': this.configService.sistemaOrigen,
      'pPais': this.configService.pais,
      'pDireccionIp': '',
      'pInfo': 'N',
      'pIpProceso': this.configService.proceso,
      'pIpSubProceso': this.configService.subproceso,
      'pCodCia': this.configService.codCia,
      'pCodSecc': this.configService.codSecc,
      'pCodProducto': this.configService.codProducto,
      'pSubProducto': '1', // Valor por defecto según documentación
      'pInfo2': '1',
    });

    // ✅ Realizar petición GET
    return this.http.get<ISarlaftMarcaResponse>(
      `${this.baseUrl}/terceros/marcas/datosbasicos`,
      {
        params,
        headers,
      },
    );
  }

  /**
   * ✅ COMUNES_006: Generar URL de conocimiento de cliente
   * Genera una URL para el proceso de conocimiento del cliente y envía SMS
   * @param request Datos para generar la URL
   * @returns Observable con URL generada
   */
  generarUrl(request: ISarlaftGenerarUrlRequest): Observable<ISarlaftGenerarUrlResponse> {
    // ✅ Construir headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // ✅ Realizar petición POST
    return this.http.post<ISarlaftGenerarUrlResponse>(
      `${this.baseUrlV1}/sarlaft/urlConocimiento`,
      request,
      { headers },
    );
  }
}


