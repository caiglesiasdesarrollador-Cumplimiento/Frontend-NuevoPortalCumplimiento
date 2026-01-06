/**
 * ✅ Environment de Producción
 * Este archivo se usa cuando ejecutas: ng build --configuration=production
 */
export const environment = {
  production: true,
  
  // ========== API URLs ==========
  apiUrl: 'https://api.segurosbolivar.com/api', // TODO: URL de producción
  
  // ========== Configuración ==========
  appName: 'Cumplimiento Digital',
  version: '1.0.0',
  
  // ========== Feature Flags ==========
  enableDebugLogs: false, // Logs deshabilitados en producción
  enableMockData: false, // Usar API real
  
  // ========== Timeouts ==========
  httpTimeout: 60000, // 60 segundos
  
  // ========== Storage Keys ==========
  tokenKey: 'auth_token',
  userKey: 'auth_user',
};

