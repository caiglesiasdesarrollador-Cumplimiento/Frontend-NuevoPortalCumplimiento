import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// NOSONAR: environment se usará cuando se conecte API real
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { environment } from '../../../environments/environment';
import { IProgramaParametrizado, TipoUsuario } from '../interfaces/cupo.interface';

/**
 * ✅ RF-007 Reglas 7.3 y 7.4: Servicio para gestión de programas parametrizados
 * Maneja programas activos, facility y validaciones para producto 440
 */
@Injectable({
  providedIn: 'root',
})
export class ProgramaService {
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
   * ✅ RF-007 Regla 7.3: Obtener programas disponibles para producto 440
   * @param claveIntermediario Clave del intermediario
   * @param tipoDocumentoAsegurado Tipo de documento del asegurado
   * @param numeroDocumentoAsegurado Número de documento del asegurado
   * @param tipoUsuario Tipo de usuario (interno puede ver todos)
   * @returns Observable con lista de programas disponibles
   */
  obtenerProgramasDisponibles(
    _claveIntermediario: string,
    _tipoDocumentoAsegurado: string,
    _numeroDocumentoAsegurado: string,
    tipoUsuario: TipoUsuario = 'intermediario',
  ): Observable<IProgramaParametrizado[]> {
    // TODO: Conectar con API real cuando esté disponible
    // return this.http.get<IProgramaParametrizado[]>(
    //   `${this.apiUrl}/programas/disponibles?claveIntermediario=${_claveIntermediario}&tipoDocumentoAsegurado=${_tipoDocumentoAsegurado}&numeroDocumentoAsegurado=${_numeroDocumentoAsegurado}&tipoUsuario=${tipoUsuario}`
    // );

    // Mock: Simular programas disponibles
    const programasMock: IProgramaParametrizado[] = [
      {
        id: '1',
        codigo: 'PROG-A',
        nombre: 'Programa A - Construcción',
        activo: true,
        tieneClaveExclusiva: false,
        facility: 1000000000, // 1 mil millones
        aseguradoEnPrograma: true,
      },
      {
        id: '2',
        codigo: 'PROG-B',
        nombre: 'Programa B - Servicios',
        activo: true,
        tieneClaveExclusiva: true,
        facility: 800000000, // 800 millones
        aseguradoEnPrograma: true,
      },
      {
        id: '3',
        codigo: 'PROG-C',
        nombre: 'Programa C - Consultoría',
        activo: true,
        tieneClaveExclusiva: false,
        facility: 600000000, // 600 millones
        aseguradoEnPrograma: false, // Asegurado NO está en este programa
      },
      {
        id: '4',
        codigo: 'PROG-D',
        nombre: 'Programa D - Tecnología',
        activo: true,
        tieneClaveExclusiva: false,
        facility: 500000000, // 500 millones
        aseguradoEnPrograma: true,
      },
    ];

    // Filtrar según reglas:
    // - Programas activos asociados al intermediario
    // - Programas sin clave exclusiva donde esté el asegurado
    // - Si es usuario interno, mostrar todos donde esté el asegurado
    let programasFiltrados = programasMock.filter((programa) => {
      if (!programa.activo) return false;

      // Si es usuario interno, mostrar todos donde esté el asegurado
      if (tipoUsuario === 'interno') {
        return programa.aseguradoEnPrograma;
      }

      // Para intermediarios:
      // - Programas activos asociados al intermediario (todos los activos)
      // - Programas sin clave exclusiva donde esté el asegurado
      if (programa.tieneClaveExclusiva) {
        return false; // No mostrar programas con clave exclusiva
      }

      return programa.aseguradoEnPrograma;
    });

    return of(programasFiltrados).pipe(delay(500));
  }

  /**
   * ✅ RF-007 Regla 7.4: Validar si asegurado está en programa seleccionado
   * @param programaId ID del programa seleccionado
   * @param tipoDocumentoAsegurado Tipo de documento del asegurado
   * @param numeroDocumentoAsegurado Número de documento del asegurado
   * @returns Observable con resultado de validación
   */
  validarAseguradoEnPrograma(
    programaId: string,
    _tipoDocumentoAsegurado: string,
    _numeroDocumentoAsegurado: string,
  ): Observable<boolean> {
    // TODO: Conectar con API real cuando esté disponible
    // return this.http.get<boolean>(
    //   `${this.apiUrl}/programas/${programaId}/validar-asegurado?tipoDocumento=${tipoDocumentoAsegurado}&numeroDocumento=${numeroDocumentoAsegurado}`
    // );

    // Mock: Simular validación
    // En el mock, el programa C (id: '3') no tiene al asegurado
    if (programaId === '3') {
      return of(false).pipe(delay(400));
    }

    return of(true).pipe(delay(400));
  }

  /**
   * ✅ RF-007 Regla 7.4: Obtener facility del programa
   * @param programaId ID del programa
   * @returns Observable con facility del programa
   */
  obtenerFacilityPrograma(programaId: string): Observable<number | null> {
    // TODO: Conectar con API real cuando esté disponible
    // return this.http.get<number>(`${this.apiUrl}/programas/${programaId}/facility`);

    // Mock: Simular facility según programa
    const facilities: { [key: string]: number } = {
      '1': 1000000000, // 1 mil millones
      '2': 800000000, // 800 millones
      '3': 600000000, // 600 millones
      '4': 500000000, // 500 millones
    };

    return of(facilities[programaId] || null).pipe(delay(300));
  }

  /**
   * ✅ RF-007 Regla 7.4: Determinar cupo que primará (facility vs cupo cliente)
   * @param facility Facility del programa
   * @param cupoCliente Cupo asignado del cliente
   * @returns Cupo que primará (el mayor)
   */
  determinarCupoPrimario(facility: number | null, cupoCliente: number): number {
    if (!facility) {
      return cupoCliente;
    }

    // El cupo que primará es el mayor entre facility y cupo del cliente
    return Math.max(facility, cupoCliente);
  }
}

