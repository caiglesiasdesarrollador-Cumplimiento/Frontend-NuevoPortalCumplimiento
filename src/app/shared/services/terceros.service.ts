import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SessionService } from './session.service';
import { ConfigService } from './config.service';
import {
  ITerceroConsultableRequest,
  ITerceroConsultableResponse,
  ITerceroJuridicoRequest,
  ITerceroJuridicoResponse,
  ITerceroNaturalRequest,
  ITerceroNaturalResponse,
} from '../interfaces/comunes.interface';

/**
 * ✅ COMUNES_002, COMUNES_003, COMUNES_004: Servicio para consultar terceros
 * 
 * Servicios disponibles:
 * - COMUNES_002: Tercero consultable (validar si es consultable)
 * - COMUNES_003: Consultar terceros jurídicos
 * - COMUNES_004: Consultar terceros naturales
 * 
 * Basado en documentación de microservicios
 */
@Injectable({
  providedIn: 'root',
})
export class TercerosService {
  private readonly baseUrl: string;
  private readonly baseUrlV2: string;

  constructor(
    private readonly http: HttpClient,
    private readonly sessionService: SessionService,
    private readonly configService: ConfigService,
  ) {
    // ✅ Usar API Gateway Comunes según ambiente
    const ambiente = environment.production ? 'prod' : 'dev';
    const apiGateway = environment.apiGatewayComunes[ambiente];
    this.baseUrl = `${apiGateway}/persona_administracion/api/v1/terceros`;
    this.baseUrlV2 = `${apiGateway}/persona_administracion/api/v2/terceros`;
  }

  /**
   * ✅ COMUNES_002: Validar si un tercero es consultable
   * @param tipoDocumento Tipo de documento (CC, NT, CE, PP, PE)
   * @param numeroDocumento Número de documento
   * @param codProducto Código de producto (opcional, por defecto '440')
   * @param codSecc Código de sección (opcional, por defecto '4')
   * @returns Observable con resultado de validación
   */
  validarTerceroConsultable(
    tipoDocumento: string,
    numeroDocumento: string,
    codProducto: string = '440',
    codSecc: string = '4',
  ): Observable<ITerceroConsultableResponse> {
    // ✅ Obtener código de usuario de la sesión
    const codUsr = this.sessionService.getCodUsr();
    if (!codUsr) {
      throw new Error('No se encontró código de usuario en la sesión');
    }

    // ✅ Construir parámetros de query
    const params = new HttpParams()
      .set('pTipoDocumento', tipoDocumento)
      .set('pNumeroDocumento', numeroDocumento)
      .set('pCodCia', this.configService.codCia)
      .set('pCodSecc', codSecc)
      .set('pCodProducto', codProducto)
      .set('pCodUsr', codUsr)
      .set('pSistemaOrigen', this.configService.sistemaOrigen)
      .set('pInfo1', 'N')
      .set('pInfo2', '1')
      .set('pInfo3', 'N');

    // ✅ Obtener headers comunes
    const comunesHeaders = this.configService.getComunesHeaders(codUsr);

    // ✅ Realizar petición GET
    return this.http.get<ITerceroConsultableResponse>(
      `${this.baseUrlV2}/clientesconsultables`,
      {
        params,
        headers: comunesHeaders,
      },
    );
  }

  /**
   * ✅ COMUNES_003: Consultar tercero jurídico
   * @param tipoDocumento Tipo de documento (debe ser NT)
   * @param numeroDocumento Número de documento (NIT)
   * @returns Observable con datos del tercero jurídico
   */
  consultarTerceroJuridico(
    tipoDocumento: string,
    numeroDocumento: string,
  ): Observable<ITerceroJuridicoResponse> {
    // ✅ Validar que el tipo de documento sea NT
    if (tipoDocumento !== 'NT') {
      throw new Error('El tipo de documento para terceros jurídicos debe ser NT');
    }

    // ✅ Obtener código de usuario de la sesión
    const codUsr = this.sessionService.getCodUsr();
    if (!codUsr) {
      throw new Error('No se encontró código de usuario en la sesión');
    }

    // ✅ Construir parámetros de query
    const params = new HttpParams()
      .set('tipoDocumento', tipoDocumento)
      .set('numeroDocumento', numeroDocumento);

    // ✅ Obtener headers comunes
    const comunesHeaders = this.configService.getComunesHeaders(codUsr);

    // ✅ Realizar petición GET
    return this.http.get<ITerceroJuridicoResponse>(
      `${this.baseUrl}/personasJuridicas/ordinario`,
      {
        params,
        headers: comunesHeaders,
      },
    );
  }

  /**
   * ✅ COMUNES_004: Consultar tercero natural
   * @param tipoDocumento Tipo de documento (CC, CE, PP, PE)
   * @param numeroDocumento Número de documento
   * @returns Observable con datos del tercero natural
   */
  consultarTerceroNatural(
    tipoDocumento: string,
    numeroDocumento: string,
  ): Observable<ITerceroNaturalResponse> {
    // ✅ Validar que el tipo de documento sea válido para persona natural
    const tiposValidos = ['CC', 'CE', 'PP', 'PE'];
    if (!tiposValidos.includes(tipoDocumento)) {
      throw new Error(
        `Tipo de documento inválido para persona natural. Tipos válidos: ${tiposValidos.join(', ')}`,
      );
    }

    // ✅ Obtener código de usuario de la sesión
    const codUsr = this.sessionService.getCodUsr();
    if (!codUsr) {
      throw new Error('No se encontró código de usuario en la sesión');
    }

    // ✅ Construir parámetros de query
    const params = new HttpParams()
      .set('tipoDocumento', tipoDocumento)
      .set('numeroDocumento', numeroDocumento);

    // ✅ Obtener headers comunes
    const comunesHeaders = this.configService.getComunesHeaders(codUsr);

    // ✅ Realizar petición GET
    return this.http.get<ITerceroNaturalResponse>(
      `${this.baseUrl}/personasNaturales/simplificado`,
      {
        params,
        headers: comunesHeaders,
      },
    );
  }
}

