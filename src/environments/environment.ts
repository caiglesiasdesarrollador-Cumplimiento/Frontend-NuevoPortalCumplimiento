
export const environment = {
  production: false,
  
  // ========== Configuración de Logging ==========
  enableLogging: true,
  
  // ========== API Gateway Base URL ==========
  apiGatewayUrl: 'https://z0jo90imu8.execute-api.us-east-1.amazonaws.com/dev',
  
  // ========== API Key (desde variable de entorno) ==========
  apiKey: 'gNlVN7pIkc5OK412NgbtL9xpl3vEB9xi3VlvJ8yu',

  // ========== API Gateway Comunes (HTTP Proxy) ==========
  apiGatewayComunes: {
    dev: 'https://fz73xehwah.execute-api.us-east-1.amazonaws.com/dev/persona_administracion',
    staging: 'https://c4huz7dmpc-vpce-0d1e15f4e7cf53d97.execute-api.us-east-1.amazonaws.com/stage/comunes-personas-administracion',
    prod: 'https://03l44gahq8-vpce-0316f1f34c146e45d.execute-api.us-east-1.amazonaws.com/prod/comunes-personas-administracion',
  },

  // ========== API Gateway Multiclaves (HTTP Proxy) ==========
  apiGatewayMulticlaves: {
    dev: 'https://z0jo90imu8.execute-api.us-east-1.amazonaws.com/dev/comunes/api/v1',
    staging: 'https://c4huz7dmpc-vpce-0d1e15f4e7cf53d97.execute-api.us-east-1.amazonaws.com/stage/comunes/api/v1',
    prod: 'https://03l44gahq8-vpce-0316f1f34c146e45d.execute-api.us-east-1.amazonaws.com/prod/comunes/api/v1',
  },

  // ========== API Key para Comunes (desde variable de entorno) ==========
  apiKeyComunes: 'gNlVN7pIkc5OK412NgbtL9xpl3vEB9xi3VlvJ8yu',

  // ========== Legacy (mantener para compatibilidad) ==========
  apiUrl: "https://z0jo90imu8.execute-api.us-east-1.amazonaws.com/dev",
  // ✅ secretKey y secretIv removidos - no se usan en el proyecto
};
