const Dotenv = require('dotenv-webpack');
const { DefinePlugin } = require('webpack');

module.exports = {
  plugins: [
    new Dotenv({
      path: './.env', // Ruta al archivo .env
      safe: true, // Solo carga variables que están definidas en .env.example (opcional)
      systemvars: true, // También carga variables del sistema
      silent: true // No muestra advertencias si el archivo .env no existe
    }),
    new DefinePlugin({
      'process.env': {
        'NG_APP_API_GATEWAY_ID': JSON.stringify(process.env.NG_APP_API_GATEWAY_ID),
        'NG_APP_AWS_REGION': JSON.stringify(process.env.NG_APP_AWS_REGION)
      }
    })
  ]
};
