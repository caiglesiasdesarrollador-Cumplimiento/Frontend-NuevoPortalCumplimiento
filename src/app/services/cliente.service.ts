import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { ICliente, ITomador, IAsegurado } from '../containers/policy-input/policy-input.interfaces';

/**
 * ✅ Servicio de Clientes (Tomador/Asegurado)
 * Preparado para conectar con el backend.
 */
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // ========== BUSCAR CLIENTE ==========

  /**
   * Buscar cliente por tipo y número de documento
   * TODO: Conectar con API real
   */
  buscarCliente(tipoDocumento: string, numeroDocumento: string): Observable<ICliente | null> {
    // Cuando tengas la API:
    // return this.http.get<ICliente>(`${this.apiUrl}/clientes/buscar?tipo=${tipoDocumento}&numero=${numeroDocumento}`);
    
    console.log('🔍 [ClienteService] Buscar cliente:', tipoDocumento, numeroDocumento);
    return of(null);
  }

  /**
   * Verificar si cliente existe
   * TODO: Conectar con API real
   */
  verificarClienteExiste(tipoDocumento: string, numeroDocumento: string): Observable<boolean> {
    // Cuando tengas la API:
    // return this.http.get<boolean>(`${this.apiUrl}/clientes/existe?tipo=${tipoDocumento}&numero=${numeroDocumento}`);
    
    return of(false);
  }

  // ========== TOMADOR ==========

  /**
   * Obtener información del tomador
   * TODO: Conectar con API real
   */
  getTomador(tipoDocumento: string, numeroDocumento: string): Observable<ITomador | null> {
    // Cuando tengas la API:
    // return this.http.get<ITomador>(`${this.apiUrl}/tomadores/${tipoDocumento}/${numeroDocumento}`);
    
    return of(null);
  }

  /**
   * Validar SARLAFT del tomador
   * TODO: Conectar con API real
   */
  validarSarlaftTomador(tipoDocumento: string, numeroDocumento: string): Observable<{ valido: boolean; mensaje: string }> {
    // Cuando tengas la API:
    // return this.http.get<any>(`${this.apiUrl}/tomadores/${tipoDocumento}/${numeroDocumento}/sarlaft`);
    
    console.log('🔍 [ClienteService] Validar SARLAFT:', tipoDocumento, numeroDocumento);
    return of({ valido: true, mensaje: '' });
  }

  // ========== ASEGURADO ==========

  /**
   * Obtener información del asegurado
   * TODO: Conectar con API real
   */
  getAsegurado(tipoDocumento: string, numeroDocumento: string): Observable<IAsegurado | null> {
    // Cuando tengas la API:
    // return this.http.get<IAsegurado>(`${this.apiUrl}/asegurados/${tipoDocumento}/${numeroDocumento}`);
    
    return of(null);
  }

  // ========== CUPO ==========

  /**
   * Obtener cupo disponible del cliente
   * TODO: Conectar con API real
   */
  getCupoDisponible(tipoDocumento: string, numeroDocumento: string): Observable<number> {
    // Cuando tengas la API:
    // return this.http.get<number>(`${this.apiUrl}/clientes/${tipoDocumento}/${numeroDocumento}/cupo`);
    
    return of(0);
  }

  // ========== CREAR CLIENTE ==========

  /**
   * Crear nuevo cliente (cuando no existe)
   * TODO: Conectar con API real
   */
  crearCliente(cliente: ICliente): Observable<{ id: string }> {
    // Cuando tengas la API:
    // return this.http.post<{ id: string }>(`${this.apiUrl}/clientes`, cliente);
    
    console.log('📤 [ClienteService] Crear cliente:', cliente);
    return of({ id: Date.now().toString() });
  }

  /**
   * Actualizar SARLAFT del cliente
   * TODO: Conectar con API real
   */
  actualizarSarlaft(tipoDocumento: string, numeroDocumento: string, datos: any): Observable<any> {
    // Cuando tengas la API:
    // return this.http.put(`${this.apiUrl}/clientes/${tipoDocumento}/${numeroDocumento}/sarlaft`, datos);
    
    console.log('📤 [ClienteService] Actualizar SARLAFT:', tipoDocumento, numeroDocumento);
    return of({ success: true });
  }
}

