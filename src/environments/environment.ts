/**
 * ✅ Environment de Desarrollo Local
 * Este archivo se usa cuando ejecutas: ng serve
 */
export const environment = {
  production: false,
  
  // ========== API URLs ==========
  apiUrl: 'http://localhost:3000/api', // API local de desarrollo
  
  // ========== Configuración ==========
  appName: 'Cumplimiento Digital - DEV',
  version: '1.0.0',
  
  // ========== Feature Flags ==========
  enableDebugLogs: true, // Logs habilitados en desarrollo
  enableMockData: true, // Usar datos mock en desarrollo
  
  // ========== Timeouts ==========
  httpTimeout: 30000, // 30 segundos
  
  // ========== Storage Keys ==========
  tokenKey: 'dev_auth_token',
  userKey: 'dev_auth_user',
};

