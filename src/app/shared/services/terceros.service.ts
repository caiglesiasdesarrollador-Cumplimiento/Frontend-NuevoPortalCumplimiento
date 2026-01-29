import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { SessionService } from './session.service';
import { ConfigService } from './config.service';
import { LoggerService } from './logger.service';
import {
  // ITerceroConsultableRequest, // Reservado para uso futuro
  ITerceroConsultableResponse,
  // ITerceroJuridicoRequest, // Reservado para uso futuro
  ITerceroJuridicoResponse,
  // ITerceroNaturalRequest, // Reservado para uso futuro
  ITerceroNaturalResponse,
  ITerceroNaturalBackendResponse,
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
    private readonly logger: LoggerService,
  ) {
    // ✅ Usar proxy en desarrollo para evitar CORS, URL directa en producción
    // En desarrollo: /proxy/comunes-personas-administracion/api/v1/terceros
    // En producción: https://z0jo90imu8.execute-api.us-east-1.amazonaws.com/dev/comunes-personas-administracion/api/v1/terceros
    const ambiente = environment.production ? 'prod' : 'dev';
    
    if (environment.production) {
      // ✅ Producción: usar URL directa del API Gateway
      const apiGateway = environment.apiGatewayComunes[ambiente];
      this.baseUrl = `${apiGateway}/api/v1/terceros`;
      this.baseUrlV2 = `${apiGateway}/api/v2/terceros`;
    } else {
      // ✅ Desarrollo: usar proxy para evitar CORS (igual que Multiclaves)
      // El proxy ya está configurado en proxy.conf.json
      this.baseUrl = `/proxy/comunes-personas-administracion/api/v1/terceros`;
      this.baseUrlV2 = `/proxy/comunes-personas-administracion/api/v2/terceros`;
    }
    
    this.logger.debug('Base URL configurada', { baseUrl: this.baseUrl, production: environment.production });
  }

  /**
   * ✅ COMUNES_002: Validar si un tercero es consultable (Regla 5.5)
   * Endpoint: /api/v2/terceros/clientesconsultables
   * @param tipoDocumento Tipo de documento (CC, NT, CE, PP, PE)
   * @param numeroDocumento Número de documento
   * @param codProducto Código de producto (opcional, por defecto '440')
   * @param codSecc Código de sección (opcional, por defecto '66' según Postman)
   * @returns Observable con resultado de validación
   */
  validarTerceroConsultable(
    tipoDocumento: string,
    numeroDocumento: string,
    codProducto: string = '440',
    codSecc: string = '66',
  ): Observable<ITerceroConsultableResponse> {
    // ✅ Obtener código de usuario de la sesión
    const codUsr = this.sessionService.getCodUsr();
    if (!codUsr) {
      throw new Error('No se encontró código de usuario en la sesión');
    }

    // ✅ Construir parámetros de query (según colección Postman DEV)
    const params = new HttpParams()
      .set('pTipoDocumento', tipoDocumento)
      .set('pNumeroDocumento', numeroDocumento)
      .set('pCodCia', this.configService.codCia) // 3
      .set('pCodSecc', codSecc) // 66 por defecto
      .set('pCodProducto', codProducto) // dinámico
      .set('pCodUsr', codUsr)
      .set('pSistemaOrigen', '190') // Específico para clientesconsultables
      .set('pInfo1', '') // vacío según Postman
      .set('pInfo2', '1')
      .set('pInfo3', ''); // vacío según Postman

    // ✅ Headers: solo x-api-key según Postman
    const headers = {
      'x-api-key': environment.apiKeyComunes || '',
    };

    // ✅ Realizar petición GET
    return this.http.get<ITerceroConsultableResponse>(`${this.baseUrlV2}/clientesconsultables`, {
      params,
      headers,
    });
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
    // ✅ Normalizar tipo de documento: NIT -> NT (el backend espera NT)
    const tipoDocNormalizado = tipoDocumento === 'NIT' ? 'NT' : tipoDocumento;
    
    // ✅ Validar que el tipo de documento sea NT o NE
    if (tipoDocNormalizado !== 'NT' && tipoDocNormalizado !== 'NE') {
      throw new Error('El tipo de documento para terceros jurídicos debe ser NIT, NT o NE');
    }

    // ✅ Obtener código de usuario de la sesión
    const codUsr = this.sessionService.getCodUsr();
    if (!codUsr) {
      throw new Error('No se encontró código de usuario en la sesión');
    }

    // ✅ Construir parámetros de query (usar tipo normalizado)
    const params = new HttpParams()
      .set('tipoDocumento', tipoDocNormalizado)
      .set('numeroDocumento', numeroDocumento);

    // ✅ Obtener headers comunes
    const comunesHeaders = this.configService.getComunesHeaders(codUsr);

    // ✅ Realizar petición GET
    return this.http.get<ITerceroJuridicoResponse>(`${this.baseUrl}/personasJuridicas/ordinario`, {
      params,
      headers: comunesHeaders,
    });
  }

  /**
   * ✅ COMUNES_004: Consultar tercero natural
   * Endpoint: /api/v1/terceros/personasNaturales/simplificado
   * @param tipoDocumento Tipo de documento (CC, CE, PP, PE, PA, TI)
   * @param numeroDocumento Número de documento
   * @returns Observable con datos del tercero natural
   */
  consultarTerceroNatural(
    tipoDocumento: string,
    numeroDocumento: string,
  ): Observable<ITerceroNaturalResponse> {
    // ✅ Validar que el tipo de documento sea válido para persona natural
    const tiposValidos = ['CC', 'CE', 'PP', 'PE', 'PA', 'TI', 'PT'];
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

    // ✅ Obtener headers específicos para personas naturales
    const headers = this.configService.getComunesHeadersNaturales(codUsr);

    this.logger.debug('Consultando tercero natural', {
      tipoDocumento,
      numeroDocumento,
      codUsr,
      url: `${this.baseUrl}/personasNaturales/simplificado`,
    });

    // ✅ Realizar petición GET y mapear respuesta del backend
    return this.http
      .get<ITerceroNaturalBackendResponse>(`${this.baseUrl}/personasNaturales/simplificado`, {
        params,
        headers,
      })
      .pipe(
        map((backendResponse: ITerceroNaturalBackendResponse) => {
          this.logger.debug('Respuesta completa del backend', backendResponse);

          // ✅ Validar que la respuesta sea exitosa
          if (backendResponse.dataHeader?.codRespuesta !== 0) {
            const errores = backendResponse.dataHeader?.errores || [];
            const mensajeError = errores
              .map((e: any) => `${e.codigo || ''}: ${e.descripcion || ''}`)
              .join(' | ');
            this.logger.error('Error del backend', { mensajeError, errores });
            throw new Error(`Error del servidor: ${mensajeError || 'Respuesta no exitosa'}`);
          }

          // ✅ Validar que existan datos
          if (!backendResponse.data?.tercerosNaturalInfo?.infoGeneralTerceroNatural) {
            this.logger.error('No hay datos en la respuesta', backendResponse);
            throw new Error('No se encontraron datos del tercero');
          }

          const info = backendResponse.data.tercerosNaturalInfo.infoGeneralTerceroNatural;

          // ✅ Construir nombre completo
          const nombreCompleto = [
            info.primerNombre || '',
            info.segundoNombre || '',
            info.primerApellido || '',
            info.segundoApellido || '',
          ]
            .filter(n => n.trim() !== '')
            .join(' ')
            .trim();

          // ✅ Mapear respuesta del backend a la estructura esperada por el frontend
          const response: ITerceroNaturalResponse = {
            tipoDocumento: info.tipoDocumento?.codigo || tipoDocumento,
            numeroDocumento: info.numeroDocumento?.toString() || numeroDocumento,
            primerNombre: info.primerNombre || '',
            segundoNombre: info.segundoNombre || undefined,
            primerApellido: info.primerApellido || '',
            segundoApellido: info.segundoApellido || undefined,
            nombreCompleto: nombreCompleto || `${info.primerNombre} ${info.primerApellido}`.trim(),
            fechaNacimiento: info.fechaNacimiento || undefined,
            genero: info.sexo?.valor || info.sexo?.codigo || undefined,
            direccion: info.direccionResidencia || undefined,
            telefono: info.telefonoResidencia?.toString() || undefined,
            celular: info.celular?.toString() || undefined,
            email: info.correoElectronico || undefined,
            ciudad: info.ciudadResidencia || undefined,
            departamento: undefined, // No viene en la respuesta simplificada
            estadoCivil: undefined, // No viene en la respuesta simplificada
            profesion: undefined, // No viene en la respuesta simplificada
            estado: undefined, // No viene en la respuesta simplificada
          };

          this.logger.debug('Respuesta mapeada exitosamente', response);
          return response;
        }),
        catchError((error) => {
          this.logger.error('Error en la petición HTTP', error);
          
          // Si el error tiene una respuesta del backend con dataHeader
          if (error.error?.dataHeader) {
            const errores = error.error.dataHeader.errores || [];
            const mensajeError = errores
              .map((e: any) => `${e.codigo || ''}: ${e.descripcion || ''}`)
              .join(' | ');
            return throwError(() => new Error(`Error del servidor: ${mensajeError}`));
          }
          
          // Error HTTP estándar
          return throwError(() => error);
        }),
      );
  }
}
