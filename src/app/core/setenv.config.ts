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

// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
export const environment = {
  production: ${isProduction},
  apiUrl: "${process.env['apiUrl']}",
  secretKey: "${process.env['secretKey']}",
  secretIv: "${process.env['secretIv']}",
};
`;

// write the content to the respective file
writeFile(targetPath, environmentFileContent, (err: unknown) => {
  if (err) {
    console.log(err);
  }
  console.log(`Wrote variables to ${targetPath}`);
});
