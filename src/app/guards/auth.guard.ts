import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * ✅ Guard de Autenticación
 * - Protege rutas que requieren login
 * - Redirige a login si no está autenticado
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      console.log('✅ [AuthGuard] Usuario autenticado');
      return true;
    }

    console.log('🚫 [AuthGuard] Usuario no autenticado - Redirigiendo a login');

    // Guardar URL intentada para redirigir después del login
    const returnUrl = state.url;

    // TODO: Ajustar ruta de login según tu configuración
    return this.router.createUrlTree(['/login'], {
      queryParams: { returnUrl },
    });
  }
}
