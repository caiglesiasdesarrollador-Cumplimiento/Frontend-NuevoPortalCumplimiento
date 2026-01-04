/**
 * ✅ Environment de Staging/QA
 * Este archivo se usa cuando ejecutas: ng build --configuration=staging
 * 
 * TODO: Configurar con las URLs de tu ambiente de QA
 */
export const environment = {
  production: false,
  
  // ========== API URLs ==========
  apiUrl: 'https://api-qa.segurosbolivar.com/api', // TODO: Cambiar por URL real de QA
  
  // ========== Servicios Externos ==========
  // authApiUrl: 'https://auth-qa.segurosbolivar.com',
  // filesApiUrl: 'https://files-qa.segurosbolivar.com',
  
  // ========== Configuración ==========
  appName: 'Cumplimiento Digital - QA',
  version: '1.0.0',
  
  // ========== Feature Flags ==========
  enableDebugLogs: true, // Logs habilitados en QA para debugging
  enableMockData: false, // En QA usar API de pruebas
  
  // ========== Timeouts ==========
  httpTimeout: 45000, // 45 segundos
  
  // ========== Storage Keys ==========
  tokenKey: 'qa_auth_token',
  userKey: 'qa_auth_user',
};

