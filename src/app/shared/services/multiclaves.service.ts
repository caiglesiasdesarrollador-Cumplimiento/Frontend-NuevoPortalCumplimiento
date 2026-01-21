import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  IMulticlavesRequest,
  IMulticlavesResponse,
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

  constructor(private readonly http: HttpClient) {
    // ✅ Usar API Gateway Comunes según ambiente
    const ambiente = environment.production ? 'prod' : 'dev';
    this.baseUrl = `${environment.apiGatewayComunes[ambiente]}/recursos_humanos/api/v1/terceros`;
  }

  /**
   * ✅ Consultar multiclaves de un tercero
   * @param tipoDocumento Tipo de documento (CC, NT, CE, PP, PE)
   * @param numeroDocumento Número de documento
   * @param pais País (por defecto 'CO')
   * @param clavesActivasEInactivas Incluir claves activas e inactivas ('S' o 'N', por defecto 'N')
   * @param clavesDirectas Incluir solo claves directas ('S' o 'N', por defecto 'S')
   * @returns Observable con lista de claves de intermediación
   */
  consultarMulticlaves(
    tipoDocumento: string,
    numeroDocumento: string,
    pais: string = 'CO',
    clavesActivasEInactivas: string = 'N',
    clavesDirectas: string = 'S',
  ): Observable<IMulticlavesResponse> {
    // ✅ Validar tipo de documento
    const tiposValidos = ['CC', 'NT', 'CE', 'PP', 'PE'];
    if (!tiposValidos.includes(tipoDocumento)) {
      throw new Error(
        `Tipo de documento inválido. Tipos válidos: ${tiposValidos.join(', ')}`,
      );
    }

    // ✅ Validar número de documento
    const numeroDoc = parseInt(numeroDocumento, 10);
    if (isNaN(numeroDoc)) {
      throw new Error('El número de documento debe ser un número válido');
    }

    // ✅ Construir body de la petición
    const requestBody: IMulticlavesRequest = {
      data: {
        clavesActivasEInactivas,
        clavesDirectas,
        nroDocumento: numeroDoc,
        pais,
        tipoDocumento,
      },
    };

    // ✅ Construir headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // ✅ Realizar petición POST
    return this.http.post<IMulticlavesResponse>(`${this.baseUrl}/multiclaves`, requestBody, {
      headers,
    });
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
    return this.consultarMulticlaves(tipoDocumento, numeroDocumento, 'CO', 'N', 'S');
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
    return this.consultarMulticlaves(tipoDocumento, numeroDocumento, 'CO', 'S', 'N');
  }
}

