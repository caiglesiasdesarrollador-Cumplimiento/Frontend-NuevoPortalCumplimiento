/**
 * ✅ Barrel export para todos los interceptores
 * 
 * Para usar en app.module.ts:
 * 
 * import { HTTP_INTERCEPTORS } from '@angular/common/http';
 * import { AuthInterceptor, ErrorInterceptor, LoadingInterceptor } from './interceptors';
 * 
 * providers: [
 *   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
 *   { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
 *   { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
 * ]
 */

export * from './auth.interceptor';
export * from './error.interceptor';
export * from './loading.interceptor';

