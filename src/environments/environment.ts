/**
 * ✅ Environment de Desarrollo
 * Este archivo se genera automáticamente con: npm run config:env:dev
 * 
 * URLs y API Keys extraídas de la colección de Postman: CumplimientoDigital.postman_collection.json
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
    prod: '',
  },
  
  // ========== API Keys Específicas por Servicio ==========
  apiKeysEspecificas: {
    // Catalogos (COMUNES_001)
    catalogos: {
      dev: 'NvxVuyHpTQ5xs0clq0xob4oVTeFe6omg34FB4Zp7',
      staging: 'ehbquG9hN19cBaHYoEg5Y19H41R50s547JJY6Cpi',
      prod: '',
    },
    // Multiclaves (COMUNES_007)
    multiclaves: {
      dev: 'QRfcnqdvG09jrlT7FuBxz5UFrCPTUqdn3QOyIRUq',
      staging: 'DokfT0xwu293outcx9G8o7zxQepOSgg38PI52iF4',
      prod: '',
    },
    // Recuperar Agente (COMUNES_008)
    recuperarAgente: {
      dev: 'kjenaXRJDT9jY0fCB8pNo3753jrRPnH07wvad69K',
      staging: 'b5EW1Ilf215yPfRk86dzI3PM77x01AU49TppJ83R',
      prod: '',
    },
    // Notificador Transversal (COMUNES_009)
    notificador: {
      dev: '1KN83VVMjx9l7fQIATjnR6RtvJbc4xxm284tuda8',
      staging: '79OQhRxsUe63HzAGVz9VG8sPkgVn1GJi58pjcTOA',
      prod: '',
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
      prod: '',
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
    dev: '',
    staging: '',
    prod: '',
  },
  
  // ========== API Keys Cumplimiento ==========
  apiKeysCumplimiento: {
    dev: '',
    staging: '',
    prod: '',
  },
  
  // ========== API Gateway GCP (HTTP Proxy) ==========
  apiGatewayGCP: {
    dev: '',
    staging: '',
    prod: '',
  },
  
  // ========== API Keys GCP (HTTP Proxy) ==========
  apiKeysGCP: {
    dev: '',
    staging: '',
    prod: '',
  },
  
  // ========== GCP Directo (Cloud Run) ==========
  gcpCloudRun: {
    dev: '',
    staging: 'https://ms-aa-analia-suscripcion-cumplimiento-stage-556528296539.us-east1.run.app',
    prod: '',
  },
  
  // ========== Access Tokens GCP (Directo) ==========
  gcpAccessTokens: {
    dev: '',
    staging: 'Analitica2025*',
    prod: '',
  },
  
  // ========== API Gateway AWS Actuaría (Ingeniero Digital) ==========
  apiGatewayAWSActuaria: {
    dev: '',
    staging: '',
    prod: '',
  },
  
  // ========== API Keys AWS Actuaría ==========
  apiKeysAWSActuaria: {
    dev: '',
    staging: '',
    prod: '',
  },
  
  // ========== API Gateway OpenL (Reglas de Negocio) ==========
  apiGatewayOpenL: {
    dev: '',
    staging: '',
    prod: '',
  },
  
  // ========== API Keys OpenL ==========
  apiKeysOpenL: {
    dev: '',
    staging: '',
    prod: '',
  },
  
  // ========== Configuración General ==========
  appName: 'Cumplimiento Digital',
  version: '1.0.0',
  
  // ========== Feature Flags ==========
  enableDebugLogs: true,
  enableMockData: true, // Usar mocks en desarrollo
  
  // ========== Timeouts ==========
  httpTimeout: 30000, // 30 segundos
  
  // ========== Storage Keys ==========
  tokenKey: 'auth_token',
  userKey: 'auth_user',
  
  // ========== Legacy (mantener para compatibilidad) ==========
  apiUrl: 'https://fz73xehwah.execute-api.us-east-1.amazonaws.com/dev',
  secretKey: 'undefined',
  secretIv: 'undefined',
};
