import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// NOSONAR: environment se usará cuando se conecte API real
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { environment } from '../../../environments/environment';
import { TipoUsuario } from '../interfaces/cupo.interface';

/**
 * ✅ RF-005: Respuesta de validación de NITs autorizados
 */
export interface INITsAutorizadosResponse {
  nitAutorizado: boolean;
  motivo?: string;
}

/**
 * ✅ RF-005 Regla 5.10: Servicio para validación de cliente Enfoque - NITs autorizados
 * Valida si un NIT está autorizado para un usuario intermediario específico
 */
@Injectable({
  providedIn: 'root',
})
export class ClienteEnfoqueService {
  // NOSONAR: apiUrl se usará cuando se conecte API real
  // TODO: Descomentar cuando se conecte API real:
  // private readonly apiUrl = environment.apiUrl;

  // ✅ RF-005: NITs autorizados por usuario (mock - debe venir de servicio)
  // En producción, esto vendría de un servicio que consulta los NITs autorizados para cada usuario
  private readonly NITS_AUTORIZADOS_POR_USUARIO: { [key: string]: string[] } = {
    intermediario1: ['900123456', '900234567', '900345678'],
    intermediario2: ['900456789', '900567890'],
    // Agregar más según necesidad
  };

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
   * ✅ RF-005 Regla 5.10: Validar si NIT está autorizado para usuario intermediario
   * @param nit NIT del tomador
   * @param tipoUsuario Tipo de usuario (intermediario, administrador, interno)
   * @param usuarioId ID del usuario (opcional, para consultar NITs autorizados específicos)
   * @returns Observable con resultado de validación
   */
  validarNITAutorizado(
    nit: string,
    tipoUsuario: TipoUsuario,
    usuarioId?: string,
  ): Observable<INITsAutorizadosResponse> {
    // TODO: Conectar con API real cuando esté disponible
    // return this.http.get<INITsAutorizadosResponse>(
    //   `${this.apiUrl}/cliente-enfoque/validar-nit?nit=${nit}&tipoUsuario=${tipoUsuario}&usuarioId=${usuarioId || ''}`
    // );

    // Regla 5.10: Solo aplica para intermediarios
    if (tipoUsuario !== 'intermediario') {
      return of({
        nitAutorizado: true, // Administradores e internos no tienen restricción
      }).pipe(delay(200));
    }

    // Mock: Validar si el NIT está en la lista de autorizados para el usuario
    // En producción, esto vendría del backend según el usuario logueado
    const usuarioMock = usuarioId || 'intermediario1';
    const nitsAutorizados = this.NITS_AUTORIZADOS_POR_USUARIO[usuarioMock] || [];
    const nitAutorizado = nitsAutorizados.includes(nit);

    return of({
      nitAutorizado,
      motivo: nitAutorizado
        ? undefined
        : 'El NIT no está autorizado para este usuario intermediario',
    }).pipe(delay(300));
  }
}

