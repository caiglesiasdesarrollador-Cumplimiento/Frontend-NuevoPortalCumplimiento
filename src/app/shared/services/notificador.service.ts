import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  INotificadorRequest,
  INotificadorResponse,
  INotificadorGrupo,
  INotificadorDato,
} from '../interfaces/comunes.interface';

/**
 * ✅ COMUNES_009: Servicio para Notificador Transversal
 * 
 * Servicio para enviar correos con PDFs de cotización y códigos OTP al cliente.
 * 
 * Basado en documentación de microservicios
 */
@Injectable({
  providedIn: 'root',
})
export class NotificadorService {
  private readonly baseUrl: string;
  private readonly aplicacionDefault = 'U8C4K6FJ51PYPPX'; // Valor por defecto según documentación

  constructor(private readonly http: HttpClient) {
    // ✅ Usar API Gateway Comunes según ambiente
    const ambiente = environment.production ? 'prod' : 'dev';
    this.baseUrl = `${environment.apiGatewayComunes[ambiente]}/notificacion/api/v1/mensajeria/notificador`;
  }

  /**
   * ✅ Enviar notificación con PDF y OTP
   * @param request Datos de la notificación
   * @returns Observable con resultado del envío
   */
  enviarNotificacion(request: INotificadorRequest): Observable<INotificadorResponse> {
    // ✅ Validar que la aplicación esté configurada
    if (!request.aplicacion) {
      request.aplicacion = this.aplicacionDefault;
    }

    // ✅ Construir headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // ✅ Realizar petición POST
    return this.http.post<INotificadorResponse>(`${this.baseUrl}/mensajes`, request, {
      headers,
    });
  }

  /**
   * ✅ Enviar cotización con PDF y OTP (método helper)
   * @param emailDestino Email del destinatario
   * @param nombreDestino Nombre del destinatario
   * @param numeroCotizacion Número de cotización
   * @param pdfBase64 PDF en Base64
   * @param nombreArchivoPdf Nombre del archivo PDF
   * @param codigoOTP Código OTP (opcional)
   * @param emailCopia Email en copia (opcional)
   * @param emailCopiaOculta Email en copia oculta (opcional)
   * @returns Observable con resultado del envío
   */
  enviarCotizacionConPDF(
    emailDestino: string,
    nombreDestino: string,
    numeroCotizacion: string,
    pdfBase64: string,
    nombreArchivoPdf: string,
    codigoOTP?: string,
    emailCopia?: string,
    emailCopiaOculta?: string,
  ): Observable<INotificadorResponse> {
    // ✅ Construir datos de plantilla
    const datosPlantilla: INotificadorDato[] = [
      {
        codDato: 'NOMBRE',
        valDato: nombreDestino,
      },
      {
        codDato: 'NOT',
        valDato: codigoOTP || '',
      },
      {
        codDato: 'ORIGEN',
        valDato: 'cumplimiento@segurosbolivar.com',
      },
      {
        codDato: 'BINARIO',
        valDato: nombreArchivoPdf,
        binDato: pdfBase64,
      },
    ];

    // ✅ Construir datos de envío
    const datosEnvio: INotificadorDato[] = [
      {
        codDato: 'PARA_EMAIL',
        valDato: emailDestino,
      },
    ];

    // ✅ Agregar copia si se proporciona
    if (emailCopia) {
      datosEnvio.push({
        codDato: 'COPIA',
        valDato: emailCopia,
      });
    }

    // ✅ Agregar copia oculta si se proporciona
    if (emailCopiaOculta) {
      datosEnvio.push({
        codDato: 'COPIAOCULTA',
        valDato: emailCopiaOculta,
      });
    }

    // ✅ Construir grupos
    const grupos: INotificadorGrupo[] = [
      {
        agrupador: 'DatosPlantilla',
        datos: datosPlantilla,
      },
      {
        agrupador: 'DatosEnvio',
        datos: datosEnvio,
      },
    ];

    // ✅ Construir request
    const request: INotificadorRequest = {
      aplicacion: this.aplicacionDefault,
      notificacion: 'CAP35', // Plantilla de cotización según documentación
      grupo: grupos,
    };

    // ✅ Enviar notificación
    return this.enviarNotificacion(request);
  }
}

