import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

/**
 * ✅ INTERFAZ: Datos de sesión del fake login
 */
export interface IFakeLoginSession {
  employeeType: string; // Tipo de documento (CC, NT, CE, PP, PE)
  userName: string; // Número de documento
  fullName: string; // Nombre completo
  sbCodeActBenef: string; // Tipo de usuario ('48' = Administrativo, '2' = Intermediario)
  usrSubTipo: string; // Tipo de nómina
  workForceId: string; // Clave de intermediación
  email: string;
  usrLocationCode: string; // Código de localidad
  company: string; // Código de compañía
  jobCode: string; // Código del cargo
  country: string; // País
  tipoUsuario: 'intermediario' | 'administrativo' | 'interno'; // Calculado
  timestamp?: string;
  isAuthenticated?: boolean;
}

/**
 * ✅ Servicio para gestión de sesión del usuario
 * Lee datos de sessionStorage con clave 'fakeLoginSession'
 * Proporciona métodos para obtener información del usuario logueado
 */
@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private readonly SESSION_KEY = 'fakeLoginSession';
  private readonly context = 'SessionService';

  constructor(private readonly logger: LoggerService) {}

  /**
   * ✅ Obtener datos completos de la sesión
   * @returns Datos de sesión o null si no existe
   */
  getSession(): IFakeLoginSession | null {
    try {
      const sessionData = sessionStorage.getItem(this.SESSION_KEY);
      if (!sessionData) {
        return null;
      }
      return JSON.parse(sessionData) as IFakeLoginSession;
    } catch (error) {
      this.logger.logWithContext(this.context, 'error', 'Error al leer sesión de sessionStorage', error);
      return null;
    }
  }

  /**
   * ✅ Verificar si hay una sesión activa
   * @returns true si existe sesión y está autenticada
   */
  isAuthenticated(): boolean {
    const session = this.getSession();
    return session?.isAuthenticated === true;
  }

  /**
   * ✅ Obtener número de documento del usuario
   * @returns Número de documento o null
   */
  getNumeroDocumento(): string | null {
    const session = this.getSession();
    return session?.userName || null;
  }

  /**
   * ✅ Obtener tipo de documento del usuario
   * @returns Tipo de documento (CC, NT, CE, PP, PE) o null
   */
  getTipoDocumento(): string | null {
    const session = this.getSession();
    return session?.employeeType || null;
  }

  /**
   * ✅ Obtener código de usuario (codUsr) para headers
   * @returns Código de usuario o null
   */
  getCodUsr(): string | null {
    const session = this.getSession();
    return session?.userName || null;
  }

  /**
   * ✅ Obtener clave de intermediación (claveIntermediario)
   * @returns Clave de intermediación o null
   */
  getClaveIntermediario(): string | null {
    const session = this.getSession();
    return session?.workForceId || null;
  }

  /**
   * ✅ Obtener tipo de usuario
   * @returns 'intermediario', 'administrativo' o 'interno'
   */
  getTipoUsuario(): 'intermediario' | 'administrativo' | 'interno' {
    const session = this.getSession();
    return session?.tipoUsuario || 'intermediario';
  }

  /**
   * ✅ Obtener email del usuario
   * @returns Email o null
   */
  getEmail(): string | null {
    const session = this.getSession();
    return session?.email || null;
  }

  /**
   * ✅ Obtener código de compañía
   * @returns Código de compañía o null
   */
  getCompany(): string | null {
    const session = this.getSession();
    return session?.company || null;
  }

  /**
   * ✅ Obtener código de localidad
   * @returns Código de localidad o null
   */
  getUsrLocationCode(): string | null {
    const session = this.getSession();
    return session?.usrLocationCode || null;
  }

  /**
   * ✅ Obtener nombre completo del usuario
   * @returns Nombre completo o null
   */
  getFullName(): string | null {
    const session = this.getSession();
    return session?.fullName || null;
  }

  /**
   * ✅ Limpiar sesión (logout)
   */
  clearSession(): void {
    try {
      sessionStorage.removeItem(this.SESSION_KEY);
    } catch (error) {
      this.logger.logWithContext(this.context, 'error', 'Error al limpiar sesión', error);
    }
  }
}
