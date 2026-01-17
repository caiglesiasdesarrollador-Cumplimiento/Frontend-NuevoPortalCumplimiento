import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// NOSONAR: environment se usará cuando se conecte API real
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { environment } from '../../../environments/environment';

/**
 * ✅ RF-005: Interfaces para validaciones de cliente
 */
export interface IClienteConsultableResponse {
  esConsultable: boolean;
  motivo?: string;
}

export interface IReputacionNegativaResponse {
  tieneReputacionNegativa: boolean;
  motivo?: string;
}

export interface IConsorcioUnionTemporalResponse {
  perteneceConsorcio: boolean;
  perteneceUnionTemporal: boolean;
  perteneceGrupoEmpresarial: boolean;
  cupoGrupo?: number;
}

/**
 * ✅ RF-005: Servicio para validaciones de cliente
 * Maneja validaciones de cliente consultable, reputación negativa y consorcio/uniones temporales
 */
@Injectable({
  providedIn: 'root',
})
export class ClienteValidacionService {
  // NOSONAR: apiUrl se usará cuando se conecte API real
  // TODO: Descomentar cuando se conecte API real:
  // private readonly apiUrl = environment.apiUrl;

  constructor(
    // NOSONAR: http se usará cuando se conecte API real - se mantiene para inyección de dependencias
    private readonly http: HttpClient,
  ) {
    // NOSONAR: Inicializar servicio para evitar warnings de TypeScript
    this.initializeService();
  }

  /**
   * NOSONAR: Método para inicializar servicio (evita warnings de TypeScript)
   * Se usará cuando se conecte API real
   */
  private initializeService(): void {
    // NOSONAR: Se usará cuando se conecte API real
    void this.http;
    // NOSONAR: environment se usará cuando se conecte API real
    void environment;
  }

  /**
   * ✅ RF-005 Regla 5.5: Validar si cliente es consultable (restringido)
   * @param tipoDocumento Tipo de documento del cliente
   * @param numeroDocumento Número de documento del cliente
   * @returns Observable con resultado de validación
   */
  validarClienteConsultable(
    _tipoDocumento: string,
    numeroDocumento: string,
  ): Observable<IClienteConsultableResponse> {
    // TODO: Conectar con API real cuando esté disponible
    // return this.http.get<IClienteConsultableResponse>(
    //   `${this.apiUrl}/cliente/validar-consultable?tipoDocumento=${tipoDocumento}&numeroDocumento=${numeroDocumento}`
    // );

    // Mock: Simular validación
    // En el mock, algunos documentos específicos son consultables
    const documentosConsultables = ['1234567890', '9876543210'];
    const esConsultable = documentosConsultables.includes(numeroDocumento);

    return of({
      esConsultable,
      motivo: esConsultable ? 'Cliente restringido por políticas internas' : undefined,
    }).pipe(delay(300));
  }

  /**
   * ✅ RF-005 Regla 5.6: Validar si cliente tiene reputación negativa
   * @param tipoDocumento Tipo de documento del cliente
   * @param numeroDocumento Número de documento del cliente
   * @returns Observable con resultado de validación
   */
  validarReputacionNegativa(
    _tipoDocumento: string,
    numeroDocumento: string,
  ): Observable<IReputacionNegativaResponse> {
    // TODO: Conectar con API real cuando esté disponible
    // return this.http.get<IReputacionNegativaResponse>(
    //   `${this.apiUrl}/cliente/validar-reputacion?tipoDocumento=${tipoDocumento}&numeroDocumento=${numeroDocumento}`
    // );

    // Mock: Simular validación
    // En el mock, algunos documentos específicos tienen reputación negativa
    const documentosReputacionNegativa = ['1111111111', '2222222222'];
    const tieneReputacionNegativa = documentosReputacionNegativa.includes(numeroDocumento);

    return of({
      tieneReputacionNegativa,
      motivo: tieneReputacionNegativa ? 'Cliente con historial de incumplimientos' : undefined,
    }).pipe(delay(300));
  }

  /**
   * ✅ RF-005 Regla 5.7: Validar si cliente pertenece a consorcio o uniones temporales
   * @param tipoDocumento Tipo de documento del cliente
   * @param numeroDocumento Número de documento del cliente
   * @returns Observable con resultado de validación
   */
  validarConsorcioUnionTemporal(
    _tipoDocumento: string,
    numeroDocumento: string,
  ): Observable<IConsorcioUnionTemporalResponse> {
    // TODO: Conectar con API real cuando esté disponible
    // return this.http.get<IConsorcioUnionTemporalResponse>(
    //   `${this.apiUrl}/cliente/validar-consorcio?tipoDocumento=${tipoDocumento}&numeroDocumento=${numeroDocumento}`
    // );

    // Mock: Simular validación
    // En el mock, algunos documentos específicos pertenecen a consorcio/grupo
    const documentosConsorcio = ['3333333333'];
    const documentosGrupo = ['4444444444'];
    const perteneceConsorcio = documentosConsorcio.includes(numeroDocumento);
    const perteneceGrupoEmpresarial = documentosGrupo.includes(numeroDocumento);

    return of({
      perteneceConsorcio,
      perteneceUnionTemporal: perteneceConsorcio, // En el mock, si es consorcio también es unión temporal
      perteneceGrupoEmpresarial,
      cupoGrupo: perteneceGrupoEmpresarial ? 2000000000 : undefined, // 2 mil millones si pertenece a grupo
    }).pipe(delay(300));
  }
}

