import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

/**
 * ✅ Servicio de Autenticación
 * Preparado para conectar con el backend.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = environment.apiUrl;
  private readonly tokenKey = 'auth_token';
  private readonly userKey = 'auth_user';

  // Estado de autenticación reactivo
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  // Usuario actual
  private currentUserSubject = new BehaviorSubject<any>(this.getStoredUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) { }

  // ========== LOGIN/LOGOUT ==========

  /**
   * Iniciar sesión
   * TODO: Conectar con API real
   */
  login(credentials: { username: string; password: string }): Observable<any> {
    // Cuando tengas la API:
    // return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials).pipe(
    //   tap(response => {
    //     this.setToken(response.token);
    //     this.setUser(response.user);
    //     this.isAuthenticatedSubject.next(true);
    //     this.currentUserSubject.next(response.user);
    //   })
    // );

    console.log('🔐 [AuthService] Login:', credentials.username);
    
    // Mock login - siempre exitoso
    const mockResponse = {
      token: 'mock-jwt-token-' + Date.now(),
      user: {
        id: '1',
        username: credentials.username,
        nombre: 'Usuario Demo',
        rol: 'asesor'
      }
    };

    this.setToken(mockResponse.token);
    this.setUser(mockResponse.user);
    this.isAuthenticatedSubject.next(true);
    this.currentUserSubject.next(mockResponse.user);

    return of(mockResponse);
  }

  /**
   * Cerrar sesión
   */
  logout(): void {
    console.log('🚪 [AuthService] Logout');
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
  }

  // ========== TOKEN MANAGEMENT ==========

  /**
   * Obtener token almacenado
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Guardar token
   */
  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * Verificar si hay token
   */
  private hasToken(): boolean {
    return !!this.getToken();
  }

  // ========== USER MANAGEMENT ==========

  /**
   * Obtener usuario almacenado
   */
  private getStoredUser(): any {
    const userStr = localStorage.getItem(this.userKey);
    return userStr ? JSON.parse(userStr) : null;
  }

  /**
   * Guardar usuario
   */
  private setUser(user: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  /**
   * Obtener usuario actual
   */
  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  /**
   * Verificar si está autenticado
   */
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  // ========== REFRESH TOKEN ==========

  /**
   * Refrescar token
   * TODO: Conectar con API real
   */
  refreshToken(): Observable<any> {
    // Cuando tengas la API:
    // return this.http.post<any>(`${this.apiUrl}/auth/refresh`, {}).pipe(
    //   tap(response => {
    //     this.setToken(response.token);
    //   })
    // );

    console.log('🔄 [AuthService] Refresh token');
    return of({ token: 'refreshed-mock-token-' + Date.now() });
  }
}

