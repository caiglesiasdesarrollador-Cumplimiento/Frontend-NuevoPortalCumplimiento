/**
 * ✅ Environment de Producción
 * Este archivo se usa cuando ejecutas: ng build --configuration=production
 *
 * URLs y API Keys extraídas de la colección de Postman: CumplimientoDigital.postman_collection.json
 * TODO: Completar con URLs y API Keys de Prod de la colección de Postman
 */
export const environment = {
  production: true,

  // ========== API Gateway Comunes (HTTP Proxy) ==========
  apiGatewayComunes: {
    dev: '[URL_DEV_COMUNES]', // TODO: Obtener de colección de Postman
    staging: '[URL_STAGING_COMUNES]', // TODO: Obtener de colección de Postman
    prod: '[URL_PROD_COMUNES]', // TODO: Obtener de colección de Postman
  },

  apiGatewayMulticlaves: {
    dev: '[URL_DEV_MULTICLAVES]', // TODO: Obtener de colección de Postman
    staging: '[URL_STAGING_MULTICLAVES]', // TODO: Obtener de colección de Postman
    prod: '[URL_PROD_MULTICLAVES]', // TODO: Obtener de colección de Postman
  },

  // ========== API Keys Comunes (configurar en CI/CD o .env) ==========
  apiKeysComunes: {
    dev: '[API_KEY_DEV_COMUNES]',
    staging: '[API_KEY_STAGING_COMUNES]',
    prod: '[API_KEY_PROD_COMUNES]',
  },

  // ========== API Gateway Cumplimiento Digital ==========
  apiGatewayCumplimiento: {
    dev: '[URL_DEV_CUMPLIMIENTO]', // TODO: Obtener de colección de Postman
    staging: '[URL_STAGING_CUMPLIMIENTO]', // TODO: Obtener de colección de Postman
    prod: '[URL_PROD_CUMPLIMIENTO]', // TODO: Obtener de colección de Postman
  },

  // ========== API Keys Cumplimiento ==========
  apiKeysCumplimiento: {
    dev: '[API_KEY_DEV_CUMPLIMIENTO]', // TODO: Obtener de colección de Postman
    staging: '[API_KEY_STAGING_CUMPLIMIENTO]', // TODO: Obtener de colección de Postman
    prod: '[API_KEY_PROD_CUMPLIMIENTO]', // TODO: Obtener de colección de Postman
  },

  // ========== API Gateway GCP (HTTP Proxy) ==========
  apiGatewayGCP: {
    dev: '[URL_DEV_GCP]', // TODO: Obtener de colección de Postman
    staging: '[URL_STAGING_GCP]', // TODO: Obtener de colección de Postman
    prod: '[URL_PROD_GCP]', // TODO: Obtener de colección de Postman
  },

  // ========== API Keys GCP (HTTP Proxy) ==========
  apiKeysGCP: {
    dev: '[API_KEY_DEV_GCP]', // TODO: Obtener de colección de Postman
    staging: '[API_KEY_STAGING_GCP]', // TODO: Obtener de colección de Postman
    prod: '[API_KEY_PROD_GCP]', // TODO: Obtener de colección de Postman
  },

  // ========== GCP Directo (Cloud Run) ==========
  gcpCloudRun: {
    dev: '[URL_DEV_GCP_CLOUD_RUN]', // TODO: Obtener de colección de Postman
    staging: '[URL_STAGING_GCP_CLOUD_RUN]', // TODO: Obtener de colección de Postman
    prod: '[URL_PROD_GCP_CLOUD_RUN]', // TODO: Obtener de colección de Postman
  },

  // ========== Access Tokens GCP (Directo) ==========
  gcpAccessTokens: {
    dev: '[TOKEN_DEV_GCP]', // TODO: Obtener de colección de Postman
    staging: '[TOKEN_STAGING_GCP]', // TODO: Obtener de colección de Postman
    prod: '[TOKEN_PROD_GCP]', // TODO: Obtener de colección de Postman
  },

  // ========== API Gateway AWS Actuaría (Ingeniero Digital) ==========
  apiGatewayAWSActuaria: {
    dev: '[URL_DEV_AWS_ACTUARIA]', // TODO: Obtener de colección de Postman
    staging: '[URL_STAGING_AWS_ACTUARIA]', // TODO: Obtener de colección de Postman
    prod: '[URL_PROD_AWS_ACTUARIA]', // TODO: Obtener de colección de Postman
  },

  // ========== API Keys AWS Actuaría ==========
  apiKeysAWSActuaria: {
    dev: '[API_KEY_DEV_AWS_ACTUARIA]', // TODO: Obtener de colección de Postman
    staging: '[API_KEY_STAGING_AWS_ACTUARIA]', // TODO: Obtener de colección de Postman
    prod: '[API_KEY_PROD_AWS_ACTUARIA]', // TODO: Obtener de colección de Postman
  },

  // ========== API Gateway OpenL (Reglas de Negocio) ==========
  apiGatewayOpenL: {
    dev: '[URL_DEV_OPENL]', // TODO: Obtener de colección de Postman
    staging: '[URL_STAGING_OPENL]', // TODO: Obtener de colección de Postman
    prod: '[URL_PROD_OPENL]', // TODO: Obtener de colección de Postman
  },

  // ========== API Keys OpenL ==========
  apiKeysOpenL: {
    dev: '[API_KEY_DEV_OPENL]', // TODO: Obtener de colección de Postman
    staging: '[API_KEY_STAGING_OPENL]', // TODO: Obtener de colección de Postman
    prod: '[API_KEY_PROD_OPENL]', // TODO: Obtener de colección de Postman
  },

  // ========== Configuración General ==========
  appName: 'Cumplimiento Digital',
  version: '1.0.0',

  // ========== Feature Flags ==========
  enableDebugLogs: false, // Logs deshabilitados en producción
  enableLogging: false, // ✅ Logger deshabilitado en producción (solo errores críticos)
  enableMockData: false, // Usar API real

  // ========== Timeouts ==========
  httpTimeout: 60000, // 60 segundos

  // ========== Storage Keys ==========
  tokenKey: 'auth_token',
  userKey: 'auth_user',

  // ========== Legacy (mantener para compatibilidad) ==========
  apiUrl: '[URL_PROD_COMUNES]', // TODO: API Gateway Comunes por defecto
  // ✅ secretKey y secretIv removidos - no se usan en el proyecto
};
