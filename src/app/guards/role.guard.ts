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
 * ✅ Guard de Roles
 * - Verifica que el usuario tenga el rol requerido
 * - Usar en rutas: data: { roles: ['admin', 'supervisor'] }
 */
@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Primero verificar autenticación
    if (!this.authService.isAuthenticated()) {
      console.log('🚫 [RoleGuard] Usuario no autenticado');
      return this.router.createUrlTree(['/login']);
    }

    // Obtener roles requeridos de la ruta
    const requiredRoles = route.data['roles'] as string[];

    if (!requiredRoles || requiredRoles.length === 0) {
      console.log('✅ [RoleGuard] No hay roles requeridos');
      return true;
    }

    // Obtener rol del usuario
    const user = this.authService.getCurrentUser();
    const userRole = user?.rol || '';

    // Verificar si el usuario tiene alguno de los roles requeridos
    const hasRole = requiredRoles.includes(userRole);

    if (hasRole) {
      console.log(`✅ [RoleGuard] Usuario tiene rol permitido: ${userRole}`);
      return true;
    }

    console.log(
      `🚫 [RoleGuard] Usuario con rol '${userRole}' no tiene acceso. Roles requeridos: ${requiredRoles.join(', ')}`,
    );

    // TODO: Ajustar ruta de acceso denegado según tu configuración
    return this.router.createUrlTree(['/acceso-denegado']);
  }
}
