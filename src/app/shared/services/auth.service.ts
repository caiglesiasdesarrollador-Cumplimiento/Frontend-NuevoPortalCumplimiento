import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthTokenService } from './auth-token.service';
import { IAuthToken } from '../interceptors/auth-interceptor.interface';

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = '/api/auth'; // ✅ URLs que incluirán el token automáticamente
  private readonly isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly authTokenService: AuthTokenService,
  ) {
    // ✅ Verificar si hay un token válido al inicializar el servicio
    this.checkInitialAuthState();
  }

  /**
   * ✅ Realizar login y guardar token (automáticamente incluido en futuras peticiones)
   */
  login(credentials: ILoginRequest): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: ILoginResponse) => {
        // ✅ Guardar token usando el AuthTokenService
        const tokenData: IAuthToken = {
          access_token: response.access_token,
          token_type: response.token_type,
          expires_in: response.expires_in,
          refresh_token: response.refresh_token,
        };

        this.authTokenService.setTokenData(tokenData);
        this.isAuthenticatedSubject.next(true);

        console.log('Login exitoso, token guardado');
      }),
    );
  }

  /**
   * ✅ Realizar logout y limpiar tokens
   */
  logout(): Observable<any> {
    // ✅ Esta petición incluirá automáticamente el token gracias al interceptor
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        this.clearAuthData();
      }),
    );
  }

  /**
   * ✅ Refrescar token usando refresh_token
   */
  refreshToken(): Observable<ILoginResponse> {
    const refreshToken = this.authTokenService.getRefreshToken();

    if (!refreshToken) {
      throw new Error('No hay refresh token disponible');
    }

    return this.http
      .post<ILoginResponse>(`${this.apiUrl}/refresh`, {
        refresh_token: refreshToken,
      })
      .pipe(
        tap((response: ILoginResponse) => {
          // ✅ Actualizar token con el nuevo access_token
          const tokenData: IAuthToken = {
            access_token: response.access_token,
            token_type: response.token_type,
            expires_in: response.expires_in,
            refresh_token: response.refresh_token ?? refreshToken,
          };

          this.authTokenService.setTokenData(tokenData);
          console.log('Token refrescado exitosamente');
        }),
      );
  }

  /**
   * ✅ Obtener perfil del usuario (esta petición incluirá el token automáticamente)
   */
  getUserProfile(): Observable<any> {
    // ✅ El interceptor agregará automáticamente el header Authorization
    return this.http.get(`${this.apiUrl}/profile`);
  }

  /**
   * ✅ Ejemplo de petición protegida a una API
   */
  getProtectedData(): Observable<any> {
    // ✅ El interceptor agregará automáticamente el header Authorization
    return this.http.get('/api/protected/data');
  }

  /**
   * ✅ Verificar si el usuario está autenticado
   */
  isLoggedIn(): boolean {
    return this.authTokenService.hasValidToken();
  }

  /**
   * ✅ Obtener tiempo restante hasta expiración del token
   */
  getTokenTimeRemaining(): number {
    return this.authTokenService.getTimeUntilExpiry();
  }

  /**
   * ✅ Limpiar todos los datos de autenticación
   */
  clearAuthData(): void {
    this.authTokenService.clearAuthData();
    this.isAuthenticatedSubject.next(false);
    console.log('Sesión cerrada, datos limpiados');
  }

  /**
   * ✅ Verificar estado inicial de autenticación
   */
  private checkInitialAuthState(): void {
    const hasValidToken = this.authTokenService.hasValidToken();
    this.isAuthenticatedSubject.next(hasValidToken);

    if (hasValidToken) {
      console.log('Token válido encontrado al inicializar');
    } else {
      console.log('No hay token válido al inicializar');
    }
  }
}
