/* eslint-disable @typescript-eslint/no-var-requires */
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

// Usar acceso con acceso seguro a variables de entorno
const apiGatewayId = process.env.NG_APP_API_GATEWAY_ID || 'default-gateway-id';
const awsRegion = process.env.NG_APP_AWS_REGION || 'us-east-1';

const environmentFileContent = `
 export const environment = {
   production: ${isProduction},
    apiGateway: {
      id: "${apiGatewayId}",
      region: "${awsRegion}",
      get baseUrl() {
        return "https://${apiGatewayId}.execute-api.${awsRegion}.amazonaws.com";
      },
      stage: 'dev',
      endpoints: {
        lambda: '/cumplimientodigital/',
        ecs: '/cumplimiento/api/hello'
      }
    }
 };
 `;

writeFile(targetPath, environmentFileContent, (err: any) => {
  if (err) {
    console.log(err);
  }
  console.log(`Wrote variables to {targetPath}`);
});
