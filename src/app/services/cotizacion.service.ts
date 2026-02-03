import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  ICotizacionExistente,
  IQuoteSummaryData,
} from '../containers/policy-input/policy-input.interfaces';

/**
 * ✅ Servicio de Cotizaciones
 * Preparado para conectar con el backend.
 */
@Injectable({
  providedIn: 'root',
})
export class CotizacionService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ========== OBTENER COTIZACIONES ==========

  /**
   * Obtener lista de cotizaciones existentes
   * TODO: Conectar con API real
   */
  getCotizaciones(): Observable<ICotizacionExistente[]> {
    // Cuando tengas la API:
    // return this.http.get<ICotizacionExistente[]>(`${this.apiUrl}/cotizaciones`);

    return of([]);
  }

  /**
   * Obtener cotización por ID
   * TODO: Conectar con API real
   */
  getCotizacionById(id: string): Observable<IQuoteSummaryData | null> {
    // Cuando tengas la API:
    // return this.http.get<IQuoteSummaryData>(`${this.apiUrl}/cotizaciones/${id}`);

    return of(null);
  }

  /**
   * Buscar cotizaciones por filtros
   * TODO: Conectar con API real
   */
  buscarCotizaciones(filtros: any): Observable<ICotizacionExistente[]> {
    // Cuando tengas la API:
    // return this.http.post<ICotizacionExistente[]>(`${this.apiUrl}/cotizaciones/buscar`, filtros);

    console.log('🔍 [CotizacionService] Buscar cotizaciones:', filtros);
    return of([]);
  }

  // ========== CREAR/GUARDAR COTIZACIONES ==========

  /**
   * Crear nueva cotización
   * TODO: Conectar con API real
   */
  crearCotizacion(datos: any): Observable<{ id: string; quoteNumber: string }> {
    // Cuando tengas la API:
    // return this.http.post<{ id: string; quoteNumber: string }>(`${this.apiUrl}/cotizaciones`, datos);

    console.log('📤 [CotizacionService] Crear cotización:', datos);
    const mockId = Date.now().toString();
    return of({ id: mockId, quoteNumber: mockId.slice(-6) });
  }

  /**
   * Actualizar cotización existente
   * TODO: Conectar con API real
   */
  actualizarCotizacion(id: string, datos: any): Observable<any> {
    // Cuando tengas la API:
    // return this.http.put(`${this.apiUrl}/cotizaciones/${id}`, datos);

    console.log('📤 [CotizacionService] Actualizar cotización:', id, datos);
    return of({ success: true });
  }

  // ========== EMITIR ==========

  /**
   * Generar emisión desde cotización
   * TODO: Conectar con API real
   */
  generarEmision(cotizacionId: string): Observable<{ polizaId: string; polizaNumber: string }> {
    // Cuando tengas la API:
    // return this.http.post<any>(`${this.apiUrl}/cotizaciones/${cotizacionId}/emitir`, {});

    console.log('🚀 [CotizacionService] Generar emisión:', cotizacionId);
    const mockPolizaId = Date.now().toString();
    return of({ polizaId: mockPolizaId, polizaNumber: mockPolizaId.slice(-6) });
  }

  // ========== VALIDACIONES ==========

  /**
   * Validar cotización antes de emitir
   * TODO: Conectar con API real
   */
  validarCotizacion(cotizacionId: string): Observable<{ valid: boolean; errors: string[] }> {
    // Cuando tengas la API:
    // return this.http.get<any>(`${this.apiUrl}/cotizaciones/${cotizacionId}/validar`);

    return of({ valid: true, errors: [] });
  }
}
