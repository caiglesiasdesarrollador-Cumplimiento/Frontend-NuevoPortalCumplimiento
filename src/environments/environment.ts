
export const environment = {
  production: false,
  apiUrl: 'http://localhost:4200/api',
  secretKey: 'dev-secret-key',
  secretIv: 'dev-secret-iv',

  // ✅ API Keys específicas por servicio de Comunes
  apiKeysEspecificas: {
    catalogos: {
      dev: '',
      staging: '',
      prod: '',
    },
    multiclaves: {
      dev: '',
      staging: '',
      prod: '',
    },
    recuperarAgente: {
      dev: '',
      staging: '',
      prod: '',
    },
    notificador: {
      dev: '',
      staging: '',
      prod: '',
    },
    generarPdfCotizacionRC: {
      dev: '',
      staging: '',
      prod: '',
    },
    generarPdfPoliza: {
      dev: '',
      staging: '',
      prod: '',
    },
    generarQR: {
      dev: '',
      staging: '',
      prod: '',
    },
  },

  // ✅ API Keys genéricas por tipo de servicio
  apiKeysComunes: {
    dev: '',
    staging: '',
    prod: '',
  },

  apiKeysGCP: {
    dev: '',
    staging: '',
    prod: '',
  },

  apiKeysAWSActuaria: {
    dev: '',
    staging: '',
    prod: '',
  },

  apiKeysOpenL: {
    dev: '',
    staging: '',
    prod: '',
  },

  apiKeysCumplimiento: {
    dev: '',
    staging: '',
    prod: '',
  },

  // ✅ Access tokens para GCP
  gcpAccessTokens: {
    dev: '',
    staging: '',
    prod: '',
  },
};
