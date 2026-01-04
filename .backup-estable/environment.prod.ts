/**
 * ✅ Environment de Producción
 * Este archivo se usa cuando ejecutas: ng build --configuration=production
 * 
 * TODO: Configurar con las URLs reales de tu API de producción
 */
export const environment = {
  production: true,
  
  // ========== API URLs ==========
  apiUrl: 'https://api.segurosbolivar.com/api', // TODO: Cambiar por URL real de producción
  
  // ========== Servicios Externos ==========
  // authApiUrl: 'https://auth.segurosbolivar.com',
  // filesApiUrl: 'https://files.segurosbolivar.com',
  
  // ========== Configuración ==========
  appName: 'Cumplimiento Digital',
  version: '1.0.0',
  
  // ========== Feature Flags ==========
  enableDebugLogs: false,
  enableMockData: false, // En producción siempre usar API real
  
  // ========== Timeouts ==========
  httpTimeout: 60000, // 60 segundos
  
  // ========== Storage Keys ==========
  tokenKey: 'auth_token',
  userKey: 'auth_user',
};

