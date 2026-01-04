/**
 * ✅ Environment de Desarrollo
 * Este archivo se usa cuando ejecutas: ng serve
 * 
 * TODO: Configurar con las URLs reales de tu API
 */
export const environment = {
  production: false,
  
  // ========== API URLs ==========
  apiUrl: 'http://localhost:3000/api', // TODO: Cambiar por URL de tu API de desarrollo
  
  // ========== Servicios Externos ==========
  // authApiUrl: 'http://localhost:3000/auth',
  // filesApiUrl: 'http://localhost:3000/files',
  
  // ========== Configuración ==========
  appName: 'Cumplimiento Digital - DEV',
  version: '1.0.0',
  
  // ========== Feature Flags ==========
  enableDebugLogs: true,
  enableMockData: true, // Usar datos mock mientras no hay backend
  
  // ========== Timeouts ==========
  httpTimeout: 30000, // 30 segundos
  
  // ========== Storage Keys ==========
  tokenKey: 'dev_auth_token',
  userKey: 'dev_auth_user',
};
