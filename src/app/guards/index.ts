/**
 * ✅ Barrel export para todos los guards
 * 
 * Uso en rutas:
 * 
 * { 
 *   path: 'admin', 
 *   component: AdminComponent,
 *   canActivate: [AuthGuard, RoleGuard],
 *   data: { roles: ['admin', 'supervisor'] }
 * }
 */

export * from './auth.guard';
export * from './role.guard';

