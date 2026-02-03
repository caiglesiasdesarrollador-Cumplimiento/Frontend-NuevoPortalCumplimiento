export const environment = {
  production: false,

  // ========== API Gateway Comunes (gestión local vía proxy) ==========
  apiGatewayComunes: {
    dev: '/proxy/comunes-personas-administracion',
    staging: 'https://c4huz7dmpc-vpce-0d1e15f4e7cf53d97.execute-api.us-east-1.amazonaws.com/stage/comunes-personas-administracion',
    prod: 'https://03l44gahq8-vpce-0316f1f34c146e45d.execute-api.us-east-1.amazonaws.com/prod/comunes-personas-administracion',
  },

  // ========== API Key para Comunes (se mantiene la misma clave que en dev) ==========
  apiKeyComunes: '8BKiD5m9kI2mueLPC1byo2n0gEDiXiZ022IQj7xV',

  // ========== API Gateway Multiclaves (local vía proxy) ==========
  apiGatewayMulticlaves: {
    dev: '/proxy/comunes-multiclaves',
    staging: 'https://c4huz7dmpc-vpce-0d1e15f4e7cf53d97.execute-api.us-east-1.amazonaws.com/stage/comunes/api/v1',
    prod: 'https://03l44gahq8-vpce-0316f1f34c146e45d.execute-api.us-east-1.amazonaws.com/prod/comunes/api/v1',
  },

  // ========== Legacy (mantener para compatibilidad) ==========
  apiUrl: 'https://z0jo90imu8.execute-api.us-east-1.amazonaws.com/dev',
  secretKey: 'undefined',
  secretIv: 'undefined',
};
