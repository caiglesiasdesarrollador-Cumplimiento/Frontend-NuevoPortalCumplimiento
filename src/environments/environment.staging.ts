/**
 * ✅ Environment de Staging/QA
 * Este archivo se usa cuando ejecutas: ng build --configuration=staging
 * 
 * URLs y API Keys extraídas de la documentación de microservicios
 */
export const environment = {
  production: false,
  
  // ========== API Gateway Comunes (HTTP Proxy) ==========
  apiGatewayComunes: {
    dev: 'https://fz73xehwah.execute-api.us-east-1.amazonaws.com/dev',
    staging: 'https://c4huz7dmpc-vpce-0d1e15f4e7cf53d97.execute-api.us-east-1.amazonaws.com/stage',
    prod: 'https://03l44gahq8-vpce-0316f1f34c146e45d.execute-api.us-east-1.amazonaws.com/prod',
  },
  
  // ========== API Keys Comunes (Servicios principales) ==========
  apiKeysComunes: {
    dev: 'gNlVN7pIkc5OK412NgbtL9xpl3vEB9xi3VlvJ8yu',
    staging: 'Du44p3y4VO7wZEjZH1uLH5EBtJg2i0Lj5V1Ws2Ws',
    prod: '[API_KEY_PROD_COMUNES]', // TODO: Obtener de documentación
  },
  
  // ========== API Keys Específicas por Servicio ==========
  apiKeysEspecificas: {
    // Catalogos (COMUNES_001)
    catalogos: {
      dev: 'NvxVuyHpTQ5xs0clq0xob4oVTeFe6omg34FB4Zp7',
      staging: 'ehbquG9hN19cBaHYoEg5Y19H41R50s547JJY6Cpi',
      prod: '[API_KEY_PROD_CATALOGOS]', // TODO: Obtener de documentación
    },
    // Multiclaves (COMUNES_007)
    multiclaves: {
      dev: 'QRfcnqdvG09jrlT7FuBxz5UFrCPTUqdn3QOyIRUq',
      staging: 'DokfT0xwu293outcx9G8o7zxQepOSgg38PI52iF4',
      prod: '[API_KEY_PROD_MULTICLAVES]', // TODO: Obtener de documentación
    },
    // Recuperar Agente (COMUNES_008)
    recuperarAgente: {
      dev: 'kjenaXRJDT9jY0fCB8pNo3753jrRPnH07wvad69K',
      staging: 'b5EW1Ilf215yPfRk86dzI3PM77x01AU49TppJ83R',
      prod: '[API_KEY_PROD_RECUPERAR_AGENTE]', // TODO: Obtener de documentación
    },
    // Notificador Transversal (COMUNES_009)
    notificador: {
      dev: '1KN83VVMjx9l7fQIATjnR6RtvJbc4xxm284tuda8',
      staging: '79OQhRxsUe63HzAGVz9VG8sPkgVn1GJi58pjcTOA',
      prod: '[API_KEY_PROD_NOTIFICADOR]', // TODO: Obtener de documentación
    },
    // Generar PDF Cotización RC (COMUNES_010)
    generarPdfCotizacionRC: {
      dev: 'tbhznwROdEv0NYl0wcmfTSsFOJ2xnr5y4insRi50',
      staging: 'thxjPoo5x03WcHbtNceSS49VbjHkxxOQ979QkVKN',
      prod: 'c3WzrQsykb1yYDmwzyOFK6GUC5S0DFDB9wk8d13T',
    },
    // Generar PDF Póliza (COMUNES_011)
    generarPdfPoliza: {
      dev: 'F0LeMCd5r57WVIKtKkF1K0ZBPRYYQF4aJaLi9VLa',
      staging: 'WursDuwv9Z10ae9yRiDGmxJYq4ZjIx73FUfcMno3',
      prod: '[API_KEY_PROD_GENERAR_PDF_POLIZA]', // TODO: Obtener de documentación
    },
    // Generar QR PDF (COMUNES_012)
    generarQR: {
      dev: '29aLqSMIBl5DuJXxdt9yX9r5PrxzNuhFR4kIzFn3',
      staging: 'vvaduJRpkc85IB3MbGNo86IrfD9ssuRHa4UTgV8S',
      prod: 'nAxa3CQwml4k0AUIkorlE6zXt4SXlpJx48pgGL7l',
    },
  },
  
  // ========== API Gateway Cumplimiento Digital ==========
  apiGatewayCumplimiento: {
    dev: '[URL_DEV_CUMPLIMIENTO]', // TODO: Obtener de documentación
    staging: '[URL_STAGING_CUMPLIMIENTO]', // TODO: Obtener de documentación
    prod: '[URL_PROD_CUMPLIMIENTO]', // TODO: Obtener de documentación
  },
  
  // ========== API Keys Cumplimiento ==========
  apiKeysCumplimiento: {
    dev: '[API_KEY_DEV_CUMPLIMIENTO]', // TODO: Obtener de documentación
    staging: '[API_KEY_STAGING_CUMPLIMIENTO]', // TODO: Obtener de documentación
    prod: '[API_KEY_PROD_CUMPLIMIENTO]', // TODO: Obtener de documentación
  },
  
  // ========== API Gateway GCP (HTTP Proxy) ==========
  apiGatewayGCP: {
    dev: '[URL_DEV_GCP]', // TODO: Obtener de documentación
    staging: '[URL_STAGING_GCP]', // TODO: Obtener de documentación
    prod: '[URL_PROD_GCP]', // TODO: Obtener de documentación
  },
  
  // ========== API Keys GCP (HTTP Proxy) ==========
  apiKeysGCP: {
    dev: '[API_KEY_DEV_GCP]', // TODO: Obtener de documentación
    staging: '[API_KEY_STAGING_GCP]', // TODO: Obtener de documentación
    prod: '[API_KEY_PROD_GCP]', // TODO: Obtener de documentación
  },
  
  // ========== GCP Directo (Cloud Run) ==========
  gcpCloudRun: {
    dev: '[URL_DEV_GCP_CLOUD_RUN]', // TODO: Obtener de documentación
    staging: 'https://ms-aa-analia-suscripcion-cumplimiento-stage-556528296539.us-east1.run.app',
    prod: '[URL_PROD_GCP_CLOUD_RUN]', // TODO: Obtener de documentación
  },
  
  // ========== Access Tokens GCP (Directo) ==========
  gcpAccessTokens: {
    dev: '[TOKEN_DEV_GCP]', // TODO: Obtener de documentación
    staging: 'Analitica2025*',
    prod: '[TOKEN_PROD_GCP]', // TODO: Obtener de documentación
  },
  
  // ========== API Gateway AWS Actuaría (Ingeniero Digital) ==========
  apiGatewayAWSActuaria: {
    dev: '[URL_DEV_AWS_ACTUARIA]', // TODO: Obtener de documentación
    staging: '[URL_STAGING_AWS_ACTUARIA]', // TODO: Obtener de documentación
    prod: '[URL_PROD_AWS_ACTUARIA]', // TODO: Obtener de documentación
  },
  
  // ========== API Keys AWS Actuaría ==========
  apiKeysAWSActuaria: {
    dev: '[API_KEY_DEV_AWS_ACTUARIA]', // TODO: Obtener de documentación
    staging: '[API_KEY_STAGING_AWS_ACTUARIA]', // TODO: Obtener de documentación
    prod: '[API_KEY_PROD_AWS_ACTUARIA]', // TODO: Obtener de documentación
  },
  
  // ========== API Gateway OpenL (Reglas de Negocio) ==========
  apiGatewayOpenL: {
    dev: '[URL_DEV_OPENL]', // TODO: Obtener de documentación
    staging: '[URL_STAGING_OPENL]', // TODO: Obtener de documentación
    prod: '[URL_PROD_OPENL]', // TODO: Obtener de documentación
  },
  
  // ========== API Keys OpenL ==========
  apiKeysOpenL: {
    dev: '[API_KEY_DEV_OPENL]', // TODO: Obtener de documentación
    staging: '[API_KEY_STAGING_OPENL]', // TODO: Obtener de documentación
    prod: '[API_KEY_PROD_OPENL]', // TODO: Obtener de documentación
  },
  
  // ========== Configuración General ==========
  appName: 'Cumplimiento Digital - QA',
  version: '1.0.0',
  
  // ========== Feature Flags ==========
  enableDebugLogs: true,
  enableMockData: false,
  
  // ========== Timeouts ==========
  httpTimeout: 45000, // 45 segundos
  
  // ========== Storage Keys ==========
  tokenKey: 'qa_auth_token',
  userKey: 'qa_auth_user',
  
  // ========== Legacy (mantener para compatibilidad) ==========
  apiUrl: 'https://c4huz7dmpc-vpce-0d1e15f4e7cf53d97.execute-api.us-east-1.amazonaws.com/stage', // API Gateway Comunes Stage
  secretKey: 'undefined',
  secretIv: 'undefined',
};
