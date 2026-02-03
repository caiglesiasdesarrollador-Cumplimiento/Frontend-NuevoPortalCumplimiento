import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SessionService } from './session.service';
import { ConfigService } from './config.service';
import { IRecuperarAgenteResponse } from '../interfaces/comunes.interface';

/**
 * ✅ COMUNES_008: Servicio para recuperar información de agente
 *
 * Recibe la clave de intermediación y retorna la información del agente si existe.
 *
 * Basado en documentación de microservicios
 */
@Injectable({
  providedIn: 'root',
})
export class RecuperarAgenteService {
  private readonly baseUrl: string;

  constructor(
    private readonly http: HttpClient,
    private readonly sessionService: SessionService,
    private readonly configService: ConfigService,
  ) {
    // ✅ Usar proxy en desarrollo para evitar CORS, URL directa en producción
    const ambiente = environment.production ? 'prod' : 'dev';
    
    if (environment.production) {
      // ✅ Producción: usar URL directa del API Gateway
      this.baseUrl = `${environment.apiGatewayComunes[ambiente]}/personas/api/v1/terceros/agentes`;
    } else {
      // ✅ Desarrollo: usar proxy para evitar CORS
      // El proxy ya está configurado en proxy.conf.json
      this.baseUrl = `/proxy/comunes-personas-administracion/personas/api/v1/terceros/agentes`;
    }
  }

  /**
   * ✅ Recuperar información de agente por clave de intermediación
   * @param codigoAgente Clave de intermediación
   * @param codProducto Código de producto (opcional, por defecto '455')
   * @returns Observable con información del agente
   */
  recuperarAgente(
    codigoAgente: string,
    codProducto: string = '455',
  ): Observable<IRecuperarAgenteResponse> {
    // ✅ Validar que se proporcione código de agente
    if (!codigoAgente || codigoAgente.trim() === '') {
      throw new Error('El código de agente es requerido');
    }

    // ✅ Obtener código de usuario de la sesión
    const codUsr = this.sessionService.getCodUsr();
    if (!codUsr) {
      throw new Error('No se encontró código de usuario en la sesión');
    }

    // ✅ Construir headers específicos para Recuperar Agente
    const headers = new HttpHeaders({
      sistemaOrigen: '102', // Valor específico según documentación
      codUsr: codUsr,
      paisISO: this.configService.pais,
      info1: 'N',
      direccionIp: '1.1.1.1', // Valor por defecto según documentación
      codSecc: this.configService.codSecc,
      modulo: this.configService.modulo,
      codCia: this.configService.codCia,
      codProducto: codProducto,
      proceso: this.configService.proceso,
      subProceso: this.configService.subproceso,
      entidadColocadora: this.configService.entidadColocadora,
      canal: this.configService.canal,
    });

    // ✅ Realizar petición GET con código de agente en la URL
    return this.http.get<IRecuperarAgenteResponse>(`${this.baseUrl}/${codigoAgente}`, {
      headers,
    });
  }

  /**
   * ✅ Validar si existe un agente con la clave proporcionada
   * @param codigoAgente Clave de intermediación
   * @returns Observable con true si existe, false si no
   */
  existeAgente(codigoAgente: string): Observable<boolean> {
    return new Observable(observer => {
      this.recuperarAgente(codigoAgente).subscribe({
        next: response => {
          observer.next(!!response && !!response.codigoAgente);
          observer.complete();
        },
        error: () => {
          observer.next(false);
          observer.complete();
        },
      });
    });
  }
}
