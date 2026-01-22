import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  IGenerarQRRequest,
  IGenerarQRResponse,
} from '../interfaces/comunes.interface';

/**
 * ✅ COMUNES_012: Servicio para generar estampado de código QR en PDFs
 * 
 * Genera el código QR en los PDFs de pólizas de Cumplimiento y Responsabilidad Civil.
 * 
 * Basado en documentación de microservicios
 */
@Injectable({
  providedIn: 'root',
})
export class GenerarQRService {
  private readonly baseUrl: string;

  constructor(private readonly http: HttpClient) {
    // ✅ Usar API Gateway Comunes según ambiente
    const ambiente = environment.production ? 'prod' : 'dev';
    this.baseUrl = `${environment.apiGatewayComunes[ambiente]}/poliza_transversal/api/v1`;
  }

  /**
   * ✅ Generar código QR en PDF de póliza
   * @param request Datos para generar el QR
   * @returns Observable con PDF con QR en Base64
   */
  generarQR(request: IGenerarQRRequest): Observable<IGenerarQRResponse> {
    // ✅ Validar parámetros requeridos
    this.validarRequest(request);

    // ✅ Construir XML SOAP según documentación
    const soapBody = this.construirSoapBody(request);

    // ✅ Construir headers
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
    });

    // ✅ Realizar petición POST con XML SOAP
    return this.http.post<IGenerarQRResponse>(
      `${this.baseUrl}/procesarestampadocodigoqr`,
      soapBody,
      {
        headers,
        responseType: 'json' as 'json',
      },
    );
  }

  /**
   * ✅ Validar request antes de enviar
   * @param request Request a validar
   */
  private validarRequest(request: IGenerarQRRequest): void {
    if (!request.compania || !request.ramo || !request.secuPoliza || !request.numeroPoliza) {
      throw new Error('Compañía, ramo, secuencia de póliza y número de póliza son requeridos');
    }

    if (!request.file || !request.fileName) {
      throw new Error('Archivo PDF (Base64) y nombre de archivo son requeridos');
    }

    if (!request.tipoPoliza || (request.tipoPoliza !== '1' && request.tipoPoliza !== '2')) {
      throw new Error('Tipo de póliza debe ser "1" o "2"');
    }
  }

  /**
   * ✅ Construir cuerpo SOAP según documentación
   * @param request Datos del request
   * @returns XML SOAP como string
   */
  private construirSoapBody(request: IGenerarQRRequest): string {
    const soapEnvelope = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soap="http://com.bolivar.documentosarchivo/signing-stamping">
    <soapenv:Header/>
    <soapenv:Body>
        <soap:encolarEstampadoCodigoQrRequest>
            <soap:compania>${request.compania}</soap:compania>
            <soap:ramo>${request.ramo}</soap:ramo>
            <soap:riesgo>${request.riesgo || '1'}</soap:riesgo>
            <soap:seccion>${request.seccion}</soap:seccion>
            <soap:secuPoliza>${request.secuPoliza}</soap:secuPoliza>
            <soap:tipoPoliza>${request.tipoPoliza}</soap:tipoPoliza>
            <soap:endoso>${request.endoso || '0'}</soap:endoso>
            <soap:numeroPoliza>${request.numeroPoliza}</soap:numeroPoliza>
            ${request.numeroPolizaHija ? `<soap:numeroPolizaHija>${request.numeroPolizaHija}</soap:numeroPolizaHija>` : ''}
            <soap:fileName>${request.fileName}</soap:fileName>
            <soap:file>${request.file}</soap:file>
            <soap:p_info1>${request.p_info1 || ''}</soap:p_info1>
            <soap:p_info2>${request.p_info2 || ''}</soap:p_info2>
            <soap:p_info3>${request.p_info3 || ''}</soap:p_info3>
            <soap:p_info4>${request.p_info4 || ''}</soap:p_info4>
            <soap:p_info5>${request.p_info5 || ''}</soap:p_info5>
        </soap:encolarEstampadoCodigoQrRequest>
    </soapenv:Body>
</soapenv:Envelope>`.trim();

    return soapEnvelope;
  }

  /**
   * ✅ Generar QR para póliza de Cumplimiento (método helper)
   * @param compania Código de compañía
   * @param secuPoliza Secuencia de póliza
   * @param numeroPoliza Número de póliza
   * @param pdfBase64 PDF en Base64
   * @param nombreArchivo Nombre del archivo PDF
   * @param ramo Código de ramo (por defecto '450' para Cumplimiento)
   * @param seccion Código de sección (por defecto '4')
   * @returns Observable con PDF con QR en Base64
   */
  generarQRPolizaCumplimiento(
    compania: string,
    secuPoliza: string,
    numeroPoliza: string,
    pdfBase64: string,
    nombreArchivo: string,
    ramo: string = '450',
    seccion: string = '4',
  ): Observable<IGenerarQRResponse> {
    const request: IGenerarQRRequest = {
      compania,
      ramo,
      riesgo: '1',
      seccion,
      secuPoliza,
      tipoPoliza: '2', // Tipo 2 para Cumplimiento según documentación
      endoso: '0',
      numeroPoliza,
      fileName: nombreArchivo,
      file: pdfBase64,
    };

    return this.generarQR(request);
  }

  /**
   * ✅ Generar QR para póliza de RC (método helper)
   * @param compania Código de compañía
   * @param secuPoliza Secuencia de póliza
   * @param numeroPoliza Número de póliza
   * @param pdfBase64 PDF en Base64
   * @param nombreArchivo Nombre del archivo PDF
   * @param ramo Código de ramo (por defecto '214' para RC)
   * @param seccion Código de sección (por defecto '10')
   * @returns Observable con PDF con QR en Base64
   */
  generarQRPolizaRC(
    compania: string,
    secuPoliza: string,
    numeroPoliza: string,
    pdfBase64: string,
    nombreArchivo: string,
    ramo: string = '214',
    seccion: string = '10',
  ): Observable<IGenerarQRResponse> {
    const request: IGenerarQRRequest = {
      compania,
      ramo,
      riesgo: '1',
      seccion,
      secuPoliza,
      tipoPoliza: '1', // Tipo 1 para RC según documentación
      endoso: '0',
      numeroPoliza,
      fileName: nombreArchivo,
      file: pdfBase64,
    };

    return this.generarQR(request);
  }
}


