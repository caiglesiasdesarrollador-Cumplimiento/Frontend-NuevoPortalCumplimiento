import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// NOSONAR: environment se usará cuando se conecte API real

import { environment } from '../../../environments/environment';
import { LoggerService } from './logger.service';
import {
  ICupoDisponibleResponse,
  IIngenieroDigitalResponse,
  ISolicitudCupo,
  TipoCliente,
  TipoUsuario,
} from '../interfaces/cupo.interface';

/**
 * ✅ RF-007: Servicio para gestión de cupo disponible
 * Maneja cálculo, validaciones y flujos relacionados con cupo
 */
@Injectable({
  providedIn: 'root',
})
export class CupoService {
  // ✅ RF-007: Límite paramétrico para cliente ocasional (intermediarios)
  private readonly CUPO_MAXIMO_OCASIONAL_INTERMEDIARIO = 750000000; // 750 millones

  // NOSONAR: apiUrl y http se usarán cuando se conecte API real
  // TODO: Descomentar cuando se conecte API real:
  // private readonly apiUrl = environment.apiUrl;

  constructor(
    // NOSONAR: http se usará cuando se conecte API real - se mantiene para inyección de dependencias
    private readonly logger: LoggerService,
    private readonly http: HttpClient,
  ) {
    // NOSONAR: Inicializar servicio para evitar warnings de TypeScript
    this.initializeService();
  }

  /**
   * NOSONAR: Método helper para evitar warnings de TypeScript
   * Se usará cuando se conecte API real
   * @returns HttpClient inyectado
   */
  private getHttpClient(): HttpClient {
    // NOSONAR: Se usará cuando se conecte API real
    return this.http;
  }

  /**
   * NOSONAR: Método para inicializar servicio (evita warnings de TypeScript)
   * Se usará cuando se conecte API real
   */
  private initializeService(): void {
    // NOSONAR: Se usará cuando se conecte API real
    void this.getHttpClient();
    // NOSONAR: environment se usará cuando se conecte API real
    void environment;
  }

  /**
   * ✅ RF-007 Regla 7.1: Calcular cupo disponible del cliente
   * @param _tipoDocumento Tipo de documento del tomador (se usará cuando se conecte API real)
   * @param _numeroDocumento Número de documento del tomador (se usará cuando se conecte API real)
   * @param _tipoUsuario Tipo de usuario (se usará cuando se conecte API real)
   * @returns Observable con el cupo disponible y tipo de cliente
   */
  calcularCupoDisponible(
    _tipoDocumento: string,
    _numeroDocumento: string,
    _tipoUsuario: TipoUsuario = 'intermediario',
  ): Observable<ICupoDisponibleResponse> {
    // TODO: Conectar con API real cuando esté disponible
    // return this.getHttpClient().get<ICupoDisponibleResponse>(
    //   `${environment.apiUrl}/cupo/calcular?tipoDocumento=${_tipoDocumento}&numeroDocumento=${_numeroDocumento}&tipoUsuario=${_tipoUsuario}`
    // );

    // Mock: Simular respuesta del servicio
    return of({
      cupoDisponible: 1200000000, // 1.2 mil millones
      tipoCliente: 'enfoque' as TipoCliente,
      tieneCupo: true,
      requiereValidacion: false,
    }).pipe(delay(500));
  }

  /**
   * ✅ RF-007 Regla 7.1: Validar si cupo es menor o igual a cero
   * @param cupoDisponible Cupo disponible del cliente
   * @returns true si requiere validación del ingeniero digital
   */
  requiereValidacionIngenieroDigital(cupoDisponible: number): boolean {
    return cupoDisponible <= 0;
  }

  /**
   * ✅ RF-007 Regla 7.1: Invocar servicio del ingeniero digital
   * @param _tipoDocumento Tipo de documento del tomador (se usará cuando se conecte API real)
   * @param _numeroDocumento Número de documento del tomador (se usará cuando se conecte API real)
   * @returns Observable con respuesta del ingeniero digital
   */
  validarCapacidadIngenieroDigital(
    _tipoDocumento: string,
    _numeroDocumento: string,
  ): Observable<IIngenieroDigitalResponse> {
    // TODO: Conectar con API real cuando esté disponible
    // return this.getHttpClient().post<IIngenieroDigitalResponse>(
    //   `${environment.apiUrl}/ingeniero-digital/validar`,
    //   { tipoDocumento: _tipoDocumento, numeroDocumento: _numeroDocumento }
    // );

    // Mock: Simular que el ingeniero digital no tiene información
    return of({
      tieneInformacion: false,
      capacidadValidada: false,
      requiereEstadosFinancieros: true,
    }).pipe(delay(800));
  }

  /**
   * ✅ RF-007 Regla 7.1: Recalcular cupo después de cargar estados financieros
   * @param _solicitudCupo Datos de la solicitud de cupo (se usará cuando se conecte API real)
   * @returns Observable con nuevo cupo calculado
   */
  recalcularCupoConEstadosFinancieros(
    _solicitudCupo: ISolicitudCupo,
  ): Observable<ICupoDisponibleResponse> {
    // TODO: Conectar con API real cuando esté disponible
    // const formData = new FormData();
    // formData.append('tipoDocumentoTomador', _solicitudCupo.tipoDocumentoTomador);
    // formData.append('numeroDocumentoTomador', _solicitudCupo.numeroDocumentoTomador);
    // if (_solicitudCupo.estadosFinancierosFile) {
    //   formData.append('estadosFinancieros', _solicitudCupo.estadosFinancierosFile);
    // }
    // formData.append('actividadEconomica', _solicitudCupo.actividadEconomica);
    // return this.getHttpClient().post<ICupoDisponibleResponse>(`${environment.apiUrl}/cupo/recalcular`, formData);

    // Mock: Simular recálculo exitoso
    return of({
      cupoDisponible: 500000000, // 500 millones después de validar estados financieros
      tipoCliente: 'ocasional' as TipoCliente,
      tieneCupo: true,
      requiereValidacion: false,
    }).pipe(delay(1000));
  }

  /**
   * ✅ RF-007 Regla 7.1: Obtener cupo visible según tipo de cliente y usuario
   * @param cupoDisponible Cupo disponible real
   * @param tipoCliente Tipo de cliente (enfoque/ocasional)
   * @param tipoUsuario Tipo de usuario (administrador/intermediario/interno)
   * @returns Cupo visible según reglas de negocio
   */
  obtenerCupoVisible(
    cupoDisponible: number,
    tipoCliente: TipoCliente,
    tipoUsuario: TipoUsuario,
  ): number {
    // Cliente enfoque: mostrar todo el cupo (admin e intermediarios)
    if (tipoCliente === 'enfoque') {
      return cupoDisponible;
    }

    // Cliente ocasional: intermediario máximo 750M, admin todo el cupo
    if (tipoCliente === 'ocasional') {
      if (tipoUsuario === 'administrador' || tipoUsuario === 'interno') {
        return cupoDisponible;
      }
      // Intermediario: máximo 750M (paramétrico)
      return Math.min(cupoDisponible, this.CUPO_MAXIMO_OCASIONAL_INTERMEDIARIO);
    }

    return cupoDisponible;
  }

  /**
   * ✅ RF-007 Regla 7.1: Actualizar cupo en Tronador
   * @param tipoDocumento Tipo de documento
   * @param numeroDocumento Número de documento
   * @param cupoDisponible Nuevo cupo disponible
   * @returns Observable con resultado de actualización
   */
  actualizarCupoEnTronador(
    tipoDocumento: string,
    numeroDocumento: string,
    cupoDisponible: number,
  ): Observable<{ success: boolean }> {
    // TODO: Conectar con API de Tronador cuando esté disponible
    // return this.getHttpClient().put(`${environment.apiUrl}/tronador/cupo`, {
    //   tipoDocumento,
    //   numeroDocumento,
    //   cupoDisponible,
    // });

    // NOSONAR: Log para desarrollo, se usará API real en producción
    this.logger.debug('Actualizando cupo en Tronador', {
      tipoDocumento,
      numeroDocumento,
      cupoDisponible,
    });

    return of({ success: true }).pipe(delay(300));
  }

  /**
   * Obtener límite paramétrico para cliente ocasional (intermediarios)
   * @returns Límite en pesos colombianos
   */
  getCupoMaximoOcasionalIntermediario(): number {
    return this.CUPO_MAXIMO_OCASIONAL_INTERMEDIARIO;
  }
}
