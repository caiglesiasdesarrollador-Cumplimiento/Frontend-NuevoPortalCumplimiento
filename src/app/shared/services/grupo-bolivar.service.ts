import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// NOSONAR: environment se usará cuando se conecte API real
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { environment } from '../../../environments/environment';
import { IValidacionGrupoBolivar } from '../interfaces/cupo.interface';

/**
 * ✅ RF-007 Regla 7.2: Servicio para validación de Grupo Bolívar
 * Valida si tomador/asegurado pertenecen al Grupo Bolívar
 */
@Injectable({
  providedIn: 'root',
})
export class GrupoBolivarService {
  // NOSONAR: apiUrl se usará cuando se conecte API real
  // TODO: Descomentar cuando se conecte API real:
  // private readonly apiUrl = environment.apiUrl;

  // ✅ RF-007: NITs conocidos del Grupo Bolívar (mock - debe venir de servicio)
  private readonly NITS_GRUPO_BOLIVAR = [
    '890900608',
    '890900609',
    '890900610',
    '890900611',
    // Agregar más NITs según necesidad
  ];

  // ✅ RF-007: Claves directas autorizadas (mock - debe venir de servicio)
  private readonly CLAVES_DIRECTAS_AUTORIZADAS = [
    'DIR001',
    'DIR002',
    'DIR003',
    // Agregar más claves según necesidad
  ];

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
   * ✅ RF-007 Regla 7.2: Validar si empresa pertenece al Grupo Bolívar
   * @param tipoDocumento Tipo de documento (debe ser NIT)
   * @param numeroDocumento Número de documento
   * @returns Observable con resultado de validación
   */
  validarEsGrupoBolivar(
    tipoDocumento: string,
    numeroDocumento: string,
  ): Observable<boolean> {
    // TODO: Conectar con API real cuando esté disponible
    // return this.http.get<boolean>(
    //   `${this.apiUrl}/grupo-bolivar/validar?tipoDocumento=${tipoDocumento}&numeroDocumento=${numeroDocumento}`
    // );

    // Mock: Validar si el NIT está en la lista
    if (tipoDocumento === 'NIT') {
      return of(this.NITS_GRUPO_BOLIVAR.includes(numeroDocumento)).pipe(delay(300));
    }

    return of(false).pipe(delay(300));
  }

  /**
   * ✅ RF-007 Regla 7.2: Validar si clave es directa autorizada
   * @param claveIntermediario Clave de intermediación
   * @returns Observable con resultado de validación
   */
  validarClaveDirectaAutorizada(claveIntermediario: string): Observable<boolean> {
    // TODO: Conectar con API real cuando esté disponible
    // return this.http.get<boolean>(
    //   `${this.apiUrl}/claves-directas/validar?clave=${claveIntermediario}`
    // );

    // Mock: Validar si la clave está en la lista de directas autorizadas
    return of(this.CLAVES_DIRECTAS_AUTORIZADAS.includes(claveIntermediario)).pipe(
      delay(300),
    );
  }

  /**
   * ✅ RF-007 Regla 7.2: Validación completa Grupo Bolívar
   * @param tipoDocumentoTomador Tipo de documento del tomador
   * @param numeroDocumentoTomador Número de documento del tomador
   * @param tipoDocumentoAsegurado Tipo de documento del asegurado
   * @param numeroDocumentoAsegurado Número de documento del asegurado
   * @param claveIntermediario Clave de intermediación
   * @returns Observable con resultado completo de validación
   */
  validarGrupoBolivarCompleto(
    tipoDocumentoTomador: string,
    numeroDocumentoTomador: string,
    tipoDocumentoAsegurado: string | null,
    numeroDocumentoAsegurado: string | null,
    claveIntermediario: string,
  ): Observable<IValidacionGrupoBolivar> {
    // Validar tomador
    const validarTomador$ = this.validarEsGrupoBolivar(
      tipoDocumentoTomador,
      numeroDocumentoTomador,
    );

    // Validar asegurado (si existe)
    const validarAsegurado$ =
      tipoDocumentoAsegurado && numeroDocumentoAsegurado
        ? this.validarEsGrupoBolivar(tipoDocumentoAsegurado, numeroDocumentoAsegurado)
        : of(false);

    // Validar clave directa
    const validarClave$ = this.validarClaveDirectaAutorizada(claveIntermediario);

    // Combinar validaciones
    return new Observable((observer) => {
      validarTomador$.subscribe((tomadorEsGrupoBolivar) => {
        validarAsegurado$.subscribe((aseguradoEsGrupoBolivar) => {
          validarClave$.subscribe((claveEsDirecta) => {
            const resultado: IValidacionGrupoBolivar = {
              tomadorEsGrupoBolivar,
              aseguradoEsGrupoBolivar,
              claveEsDirecta,
              requiereError:
                (tomadorEsGrupoBolivar || aseguradoEsGrupoBolivar) && !claveEsDirecta,
            };

            observer.next(resultado);
            observer.complete();
          });
        });
      });
    });
  }
}

