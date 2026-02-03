const { writeFile, existsSync, mkdirSync } = require('fs');
const { argv } = require('yargs');
// read environment variables from .env file
require('dotenv').config();
// read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod' || environment === 'pre';
const targetPath = `./src/environments/environment.ts`;

// Providing path to the `environments` directory
const envDirectory = './src/environments';

// creates the `environments` directory if it does not exist
if (!existsSync(envDirectory)) {
  mkdirSync(envDirectory);
}

// we have access to our environment variables
// in the process.env object thanks to dotenv

// ✅ Validar que las API Keys estén configuradas
if (!process.env['API_KEY']) {
  console.error('❌ ERROR: API_KEY no configurada en variables de entorno');
  console.error('Por favor crea un archivo .env basado en .env.template y configura API_KEY');
  process.exit(1);
}

const environmentFileContent = `
export const environment = {
  production: ${isProduction},
  
  // ========== Configuración de Logging ==========
  enableLogging: ${!isProduction},
  
  // ========== API Gateway Base URL ==========
  apiGatewayUrl: '${process.env['API_GATEWAY_URL'] || 'https://z0jo90imu8.execute-api.us-east-1.amazonaws.com/dev'}',
  
  // ========== API Key (desde variable de entorno) ==========
  apiKey: '${process.env['API_KEY']}',

  // ========== API Gateway Comunes (HTTP Proxy) ==========
  apiGatewayComunes: {
    dev: '${process.env['API_GATEWAY_COMUNES_DEV'] || 'https://z0jo90imu8.execute-api.us-east-1.amazonaws.com/dev/comunes-personas-administracion'}',
    staging: '${process.env['API_GATEWAY_COMUNES_STAGING'] || 'https://c4huz7dmpc-vpce-0d1e15f4e7cf53d97.execute-api.us-east-1.amazonaws.com/stage/comunes-personas-administracion'}',
    prod: '${process.env['API_GATEWAY_COMUNES_PROD'] || 'https://03l44gahq8-vpce-0316f1f34c146e45d.execute-api.us-east-1.amazonaws.com/prod/comunes-personas-administracion'}',
  },

  // ========== API Gateway Multiclaves (HTTP Proxy) ==========
  apiGatewayMulticlaves: {
    dev: '${process.env['API_GATEWAY_MULTICLAVES_DEV'] || 'https://z0jo90imu8.execute-api.us-east-1.amazonaws.com/dev/comunes/api/v1'}',
    staging: '${process.env['API_GATEWAY_MULTICLAVES_STAGING'] || 'https://c4huz7dmpc-vpce-0d1e15f4e7cf53d97.execute-api.us-east-1.amazonaws.com/stage/comunes/api/v1'}',
    prod: '${process.env['API_GATEWAY_MULTICLAVES_PROD'] || 'https://03l44gahq8-vpce-0316f1f34c146e45d.execute-api.us-east-1.amazonaws.com/prod/comunes/api/v1'}',
  },

  // ========== API Key para Comunes (desde variable de entorno) ==========
  apiKeyComunes: '${process.env['API_KEY_COMUNES'] || process.env['API_KEY']}',

  // ========== Legacy (mantener para compatibilidad) ==========
  apiUrl: "${process.env['apiUrl'] || 'https://z0jo90imu8.execute-api.us-east-1.amazonaws.com/dev'}",
  // ✅ secretKey y secretIv removidos - no se usan en el proyecto
};
`;

// write the content to the respective file
writeFile(targetPath, environmentFileContent, (err: unknown) => {
  if (err) {
    console.log(err);
  }
  console.log(`Wrote variables to ${targetPath}`);
});
