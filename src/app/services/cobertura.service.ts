import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { ICoberturaCumplimiento, ICoberturaRC } from '../containers/policy-input/policy-input.interfaces';

/**
 * ✅ Servicio de Coberturas
 * Preparado para conectar con el backend.
 * Por ahora retorna datos mock, cuando tengas la API real solo cambias las URLs.
 */
@Injectable({
  providedIn: 'root'
})
export class CoberturaService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // ========== COBERTURAS CUMPLIMIENTO ==========

  /**
   * Obtener todas las coberturas de cumplimiento
   * TODO: Conectar con API real
   */
  getCoberturasCumplimiento(): Observable<ICoberturaCumplimiento[]> {
    // Cuando tengas la API, descomentar esta línea:
    // return this.http.get<ICoberturaCumplimiento[]>(`${this.apiUrl}/coberturas/cumplimiento`);
    
    // Por ahora retorna observable vacío (los datos están en el componente)
    return of([]);
  }

  /**
   * Guardar coberturas de cumplimiento seleccionadas
   * TODO: Conectar con API real
   */
  guardarCoberturasCumplimiento(coberturas: ICoberturaCumplimiento[]): Observable<any> {
    // Cuando tengas la API:
    // return this.http.post(`${this.apiUrl}/coberturas/cumplimiento`, coberturas);
    
    console.log('📤 [CoberturaService] Guardar coberturas cumplimiento:', coberturas);
    return of({ success: true, message: 'Coberturas guardadas (mock)' });
  }

  // ========== COBERTURAS RC ==========

  /**
   * Obtener todas las coberturas RC
   * TODO: Conectar con API real
   */
  getCoberturasRC(): Observable<ICoberturaRC[]> {
    // Cuando tengas la API:
    // return this.http.get<ICoberturaRC[]>(`${this.apiUrl}/coberturas/rc`);
    
    return of([]);
  }

  /**
   * Guardar coberturas RC seleccionadas
   * TODO: Conectar con API real
   */
  guardarCoberturasRC(coberturas: ICoberturaRC[]): Observable<any> {
    // Cuando tengas la API:
    // return this.http.post(`${this.apiUrl}/coberturas/rc`, coberturas);
    
    console.log('📤 [CoberturaService] Guardar coberturas RC:', coberturas);
    return of({ success: true, message: 'Coberturas RC guardadas (mock)' });
  }

  // ========== CÁLCULOS ==========

  /**
   * Calcular prima de una cobertura
   * TODO: Puede ser cálculo en backend o frontend según requisitos
   */
  calcularPrima(valorAsegurado: number, tasa: number, porcentaje: number): number {
    return Math.round(valorAsegurado * (tasa / 100) * (porcentaje / 100));
  }

  /**
   * Liquidar prima total
   * TODO: Conectar con API real si el cálculo es en backend
   */
  liquidarPrimaTotal(coberturas: (ICoberturaCumplimiento | ICoberturaRC)[]): Observable<number> {
    // Cuando tengas la API:
    // return this.http.post<number>(`${this.apiUrl}/coberturas/liquidar`, coberturas);
    
    const total = coberturas.reduce((sum, c) => sum + (c.prima || 0), 0);
    return of(total);
  }
}

