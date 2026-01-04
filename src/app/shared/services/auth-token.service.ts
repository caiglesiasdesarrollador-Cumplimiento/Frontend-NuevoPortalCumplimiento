import { Injectable } from '@angular/core';
import { IAuthToken, IAuthStorage } from '../interceptors/auth-interceptor.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthTokenService implements IAuthStorage {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly TOKEN_EXPIRY_KEY = 'auth_token_expiry';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';

  /**
   * ✅ Obtener el token de autorización del localStorage
   */
  getToken(): string | null {
    try {
      const token = localStorage.getItem(this.TOKEN_KEY);
      return token;
    } catch (error) {
      console.error('Error al obtener token del localStorage:', error);
      return null;
    }
  }

  /**
   * ✅ Guardar el token de autorización en localStorage
   */
  setToken(token: string): void {
    try {
      localStorage.setItem(this.TOKEN_KEY, token);

      // ✅ Calcular y guardar fecha de expiración (por defecto 1 hora)
      const expiryTime = Date.now() + 60 * 60 * 1000; // 1 hora
      localStorage.setItem(this.TOKEN_EXPIRY_KEY, expiryTime.toString());

      console.log('Token guardado exitosamente');
    } catch (error) {
      console.error('Error al guardar token en localStorage:', error);
    }
  }

  /**
   * ✅ Guardar token completo con información de expiración
   */
  setTokenData(tokenData: IAuthToken): void {
    try {
      // ✅ Guardar access token
      this.setToken(tokenData.access_token);

      // ✅ Guardar refresh token si existe
      if (tokenData.refresh_token) {
        localStorage.setItem(this.REFRESH_TOKEN_KEY, tokenData.refresh_token);
      }

      // ✅ Calcular y guardar fecha de expiración real
      if (tokenData.expires_in) {
        const expiryTime = Date.now() + tokenData.expires_in * 1000;
        localStorage.setItem(this.TOKEN_EXPIRY_KEY, expiryTime.toString());
      }

      console.log('Datos de token guardados exitosamente');
    } catch (error) {
      console.error('Error al guardar datos de token:', error);
    }
  }

  /**
   * ✅ Obtener el refresh token
   */
  getRefreshToken(): string | null {
    try {
      return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Error al obtener refresh token:', error);
      return null;
    }
  }

  /**
   * ✅ Eliminar el token de autorización del localStorage
   */
  removeToken(): void {
    try {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.TOKEN_EXPIRY_KEY);
      localStorage.removeItem(this.REFRESH_TOKEN_KEY);
      console.log('Tokens eliminados exitosamente');
    } catch (error) {
      console.error('Error al eliminar tokens del localStorage:', error);
    }
  }

  /**
   * ✅ Verificar si el token ha expirado
   */
  isTokenExpired(): boolean {
    try {
      const expiryTime = localStorage.getItem(this.TOKEN_EXPIRY_KEY);

      if (!expiryTime) {
        return true; // Si no hay fecha de expiración, considerar expirado
      }

      const now = Date.now();
      const expiry = parseInt(expiryTime, 10);

      return now >= expiry;
    } catch (error) {
      console.error('Error al verificar expiración del token:', error);
      return true; // En caso de error, considerar expirado por seguridad
    }
  }

  /**
   * ✅ Verificar si hay un token válido disponible
   */
  hasValidToken(): boolean {
    const token = this.getToken();
    return !!(token && !this.isTokenExpired());
  }

  /**
   * ✅ Obtener tiempo restante hasta la expiración en segundos
   */
  getTimeUntilExpiry(): number {
    try {
      const expiryTime = localStorage.getItem(this.TOKEN_EXPIRY_KEY);

      if (!expiryTime) {
        return 0;
      }

      const now = Date.now();
      const expiry = parseInt(expiryTime, 10);
      const timeRemaining = Math.max(0, expiry - now);

      return Math.floor(timeRemaining / 1000); // Retornar en segundos
    } catch (error) {
      console.error('Error al calcular tiempo de expiración:', error);
      return 0;
    }
  }

  /**
   * ✅ Limpiar todos los datos de autenticación
   */
  clearAuthData(): void {
    this.removeToken();
    console.log('Datos de autenticación limpiados');
  }
}
