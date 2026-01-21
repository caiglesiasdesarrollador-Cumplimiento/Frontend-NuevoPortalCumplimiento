# 🔗 ANÁLISIS DE COLECCIÓN POSTMAN - INTEGRACIÓN BACKEND

## 📋 RESUMEN EJECUTIVO

Análisis completo de la colección de Postman `CumplimientoDigital.postman_collection.json` para identificar URLs, API Keys, headers y estructura de peticiones necesarias para integrar el frontend con los microservicios del backend.

---

## 🌐 URLs BASE POR AMBIENTE Y SERVICIO

### 🔵 COMUNES (API Gateway HTTP Proxy)

**DEV:**
- **URL Base:** `https://fz73xehwah.execute-api.us-east-1.amazonaws.com/dev`
- **API Key:** `gNlVN7pIkc5OK412NgbtL9xpl3vEB9xi3VlvJ8yu`
- **Servicios disponibles:**
  - Catálogos: `/catalogos/api/v1/poliza/datosvariables`
  - Terceros Jurídicos: `/persona_administracion/api/v1/terceros/personasJuridicas/ordinario`
  - Persona Natural: `/persona_administracion/api/v1/terceros/personasNaturales/ordinario`
  - Persona Consultable: `/persona_administracion/api/v1/terceros/personaConsultable`
  - Consultar Agente: `/persona_administracion/api/v1/terceros/consultarAgente`
  - SARLAFT Obtener Marca: `/sarlaft/api/v1/marcas`
  - SARLAFT Generar URL: `/sarlaft/api/v1/generarUrl`
  - Notificador Transversal: `/notificador/api/v1/notificaciones`
  - Multiclaves: `/comunes/api/v1/redis/multiclaves`
  - Generar PDF Cotización RC: `/poliza_transversal/api/v1/generarPdfCotizacionRC`
  - Generar PDF Cotización CU: `/poliza_transversal/api/v1/generarPdfCotizacionCumplimiento`
  - Generar PDF Póliza RC: `/poliza_transversal/api/v1/generarPdfPolizaRC`
  - Generar PDF Póliza CU: `/poliza_transversal/api/v1/generarPdfPolizaCumplimiento`
  - Generar QR Póliza: `/poliza_transversal/api/v1/procesarestampadocodigoqr`

**STAGE:**
- **URL Base:** `https://[ID_API_GATEWAY_STAGE].execute-api.us-east-1.amazonaws.com/stage`
- **API Key:** (Revisar colección para Stage)

---

### 🟢 CUMPLIMIENTO DIGITAL

**DEV:**
- **URL Base Emisión:** `https://0hnhthss25.execute-api.us-east-1.amazonaws.com/stage/emision`
- **URL Base Negocios:** (Revisar colección)
- **URL Base Comunes:** (Revisar colección)
- **API Keys:** Varias según servicio (revisar colección)

**Servicios disponibles:**
- Health: `/health`
- Mappings: `/mappings`
- Redis Multiclaves: `/comunes/api/v1/redis/multiclaves`
- Cargar Archivos Soporte: `/comunes/api/v1/archivos/cargarArchivosSoporte`
- Adapter Calcular Prima Cumplimiento: `/comunes/adapter/calcularPrimaCumplimiento`
- Adapter Calcular Prima RC: `/comunes/adapter/calcularPrimaRc`
- Adapter Consultar TRM: `/comunes/adapter/consultarTRM`
- Negocios Adapter Consultar Lista Programas GB: `/negocios/adapter/consultarListaProgramasGB`
- Negocios Adapter Consultar Detalle Programas GB: `/negocios/adapter/consultarDetalleProgramasGB`
- Negocios Adapter Consultar Sucursales: `/negocios/adapter/consultarSucursales`
- Negocios Adapter Consultar Cobertura Cliente: `/negocios/adapter/consultarCoberturaCliente`
- Negocios Adapter Consultar Suma Disponible: `/negocios/adapter/consultarSumaDisponible`
- Negocios Adapter Validar NITs Aut Usuario: `/negocios/adapter/validarNitsAutUsuario`
- Negocios Adapter Consultar Listas CU RC: `/negocios/adapter/consultarListasCuRc`
- Negocios Adapter Consultar Cotización Cumplimiento: `/negocios/adapter/consultarCotizacionCumplimiento`
- Negocios Adapter Consultar Póliza Cumplimiento: `/negocios/adapter/consultarPolizaCumplimiento`
- Negocios Adapter Consultar Datos Agente: `/negocios/adapter/consultarDatosAgente`
- Negocios Adapter Validar Cliente GB: `/negocios/adapter/validarClienteGB`
- Emisión Mongo Insertar: `/emision/mongo/insertar`
- Emisión Mongo Consultar: `/emision/mongo/consultar`
- Emisión Mongo Actualizar: `/emision/mongo/actualizar`
- Emisión Mongo Delete: `/emision/mongo/delete`
- Emisión Mongo Consultar Lista Negocios CU: `/emision/mongo/consultarListaNegociosCu`

---

### 🟡 GCP (Google Cloud Platform)

**DEV - HTTP Proxy (API Gateway):**
- **URL Base:** `https://z0jo90imu8.execute-api.us-east-1.amazonaws.com/dev`
- **API Key:** `8BKiD5m9kl2mueLPC1byo2n0gEDiXiZ022IQj7xV`
- **Servicios:**
  - Lector Contratos: `/gcp-lector-contratos/contrato/lector-contratos`
  - Lector Estados Financieros: `/gcp-lector-estados-financieros/financiero/extract/extract-variable`

**DEV - Directo (Cloud Run):**
- **URL Base:** `https://ms-aa-analia-suscripcion-cumplimiento-dev-993828145189.us-east1.run.app`
- **Access Token:** `Actuaria2024*`
- **Servicios:**
  - Lector Contratos: `/contrato/lector-contratos`
  - Lector Estados Financieros: `/financiero/extract/extract-variable`

**STAGE - Directo (Cloud Run):**
- **URL Base:** `https://ms-aa-analia-suscripcion-cumplimiento-stage-556528296539.us-east1.run.app`
- **Access Token:** `Analitica2025*`
- **Servicios:**
  - Calcular Cupo: `/financiero/calculate-cupo/calculate-cupo`

---

### 🔴 AWS ACTUARÍA (Ingeniero Digital)

**DEV:**
- **URL Base:** `https://z0jo90imu8.execute-api.us-east-1.amazonaws.com/dev/ingeniero-digital`
- **API Key:** `8BKiD5m9kl2mueLPC1byo2n0gEDiXiZ022IQj7xV`
- **Endpoint GraphQL:** `/dataops/proxy/graphql/empresas`
- **Método:** POST
- **Content-Type:** `application/json`
- **Query GraphQL:** `cumplimientoV5`

---

### 🟣 OPENL (Reglas de Negocio)

**DEV:**
- **URL Base:** `https://o75yqp457c.execute-api.us-east-1.amazonaws.com/dev/negocios-patrimoniales`
- **API Key:** `QD3vfvmrGva9pSjzzXqEI3FDwHZR4iOQ1zacT9CK`
- **Servicios:**
  - Validar Tipo Documento: `/v1/TipoDocumento`
  - Validar Retroactividad/Prospectividad: `/v1/RetroactividadProspectividad`
  - Validar Vigencia Contrato: `/v1/VigenciaContrato`

---

## 📝 HEADERS COMUNES REQUERIDOS

### Headers para Servicios de Comunes (Catálogos sin API Key)

```typescript
{
  "codProducto": "440",
  "modulo": "2",
  "proceso": "241",
  "subproceso": "240",
  "codcia": "3",
  "codsecc": "4",
  "codusr": "49787610", // Del sessionStorage
  "entidadcolocadora": "0",
  "canal": "3",
  "sistemaorigen": "100" // O "196" según el caso
}
```

### Headers para Servicios de Comunes (con API Key)

```typescript
{
  "x-api-key": "gNlVN7pIkc5OK412NgbtL9xpl3vEB9xi3VlvJ8yu",
  "codUsr": "49787610", // Del sessionStorage
  "sistemaOrigen": "100",
  "paisISO": "1",
  "direccionIP": "",
  "info1": ""
}
```

### Headers para Servicios de Cumplimiento

```typescript
{
  "x-api-key": "[API_KEY_CUMPLIMIENTO]",
  "Content-Type": "application/json"
}
```

### Headers para GCP (HTTP Proxy)

```typescript
{
  "x-api-key": "8BKiD5m9kl2mueLPC1byo2n0gEDiXiZ022IQj7xV"
}
```

### Headers para GCP (Directo)

```typescript
{
  "accept": "application/json",
  "access_token": "Actuaria2024*", // Dev: Actuaria2024*, Stage: Analitica2025*
  "Content-Type": "multipart/form-data" // Para upload de archivos
}
```

### Headers para AWS Actuaría (Ingeniero Digital)

```typescript
{
  "x-api-key": "8BKiD5m9kl2mueLPC1byo2n0gEDiXiZ022IQj7xV",
  "Content-Type": "application/json"
}
```

### Headers para OpenL

```typescript
{
  "x-api-key": "QD3vfvmrGva9pSjzzXqEI3FDwHZR4iOQ1zacT9CK",
  "Content-Type": "application/json"
}
```

---

## 🔧 ESTRUCTURA DE PETICIONES

### Ejemplo: Consultar Catálogo

**Endpoint:** `GET /catalogos/api/v1/poliza/datosvariables`

**Query Parameters:**
- `ip_Codigolista`: `TIPOS_CONTRATO_CU`
- `ip_Codigo`: (opcional)
- `ip_Codigodepende`: (opcional)
- `ip_Like`: (opcional)
- `ip_Validacion`: (opcional)

**Headers:** (Ver sección "Headers para Servicios de Comunes (Catálogos sin API Key)")

---

### Ejemplo: Consultar Terceros Jurídicos

**Endpoint:** `GET /persona_administracion/api/v1/terceros/personasJuridicas/ordinario`

**Query Parameters:**
- `tipoDocumento`: `NT`
- `numeroDocumento`: `899999068`

**Headers:** (Ver sección "Headers para Servicios de Comunes (con API Key)")

---

### Ejemplo: Lector de Contratos (GCP - HTTP Proxy)

**Endpoint:** `POST /gcp-lector-contratos/contrato/lector-contratos`

**Headers:**
```typescript
{
  "x-api-key": "8BKiD5m9kl2mueLPC1byo2n0gEDiXiZ022IQj7xV"
}
```

**Body (FormData):**
- `correo_usuario`: `sheila-uhia@segurosbolivar.com`
- `file`: (archivo PDF)
- `id_front`: `dadf`

---

### Ejemplo: Ingeniero Digital (AWS Actuaría - GraphQL)

**Endpoint:** `POST /ingeniero-digital/dataops/proxy/graphql/empresas`

**Headers:**
```typescript
{
  "x-api-key": "8BKiD5m9kl2mueLPC1byo2n0gEDiXiZ022IQj7xV",
  "Content-Type": "application/json"
}
```

**Body (GraphQL):**
```json
{
  "query": "query cumplimientoV5($tipoDocumentoEmpresa: String!, $numeroDocumento: String!) { cumplimientoV5(tipoDocumento: $tipoDocumentoEmpresa, numeroDocumento: $numeroDocumento) { tipoDocumentoEmpresa keyIdEmpresa ano segmento clasificacionBolivar clasificacionDavivienda pgbDavivienda cupoCalculadoBolivar cupoPropuestoBolivar cupoFinalBolivar cupoCalculadoDavivienda cupoFinalDavivienda cupoFinalCumplimiento seriedadOfertaCumplimiento otrasCoberturasCumplimiento riesgoFinalBolivar riesgoFinalDavivienda } }",
  "variables": {
    "tipoDocumentoEmpresa": "NT",
    "numeroDocumento": "800250275"
  }
}
```

---

## ✅ LO QUE NECESITO PARA INTEGRAR

### 1. Crear `SessionService`

Leer datos de `sessionStorage` con clave `fakeLoginSession` para obtener:
- `codUsr` (codusr)
- `tipoDocumento`
- `numeroDocumento`
- `claveIntermediario`
- `tipoUsuario`
- `email`

### 2. Crear `ConfigService`

Valores por defecto:
- `codCia`: `'3'`
- `codSecc`: `'4'`
- `sistemaOrigen`: `'196'` (o `'100'` según el caso)
- `pais`: `'1'`
- `canal`: `'3'`
- `entidadColocadora`: `'0'`
- `modulo`: `'2'`
- `proceso`: `'241'`
- `subproceso`: `'240'`
- `codProducto`: `'440'`

### 3. Actualizar `environment.ts`

```typescript
export const environment = {
  production: false,
  
  // API Gateway Comunes
  apiGatewayComunes: {
    dev: 'https://fz73xehwah.execute-api.us-east-1.amazonaws.com/dev',
    staging: '[URL_STAGING]',
    prod: '[URL_PROD]'
  },
  
  // API Keys Comunes
  apiKeysComunes: {
    dev: 'gNlVN7pIkc5OK412NgbtL9xpl3vEB9xi3VlvJ8yu',
    staging: '[API_KEY_STAGING]',
    prod: '[API_KEY_PROD]'
  },
  
  // API Gateway Cumplimiento
  apiGatewayCumplimiento: {
    dev: 'https://0hnhthss25.execute-api.us-east-1.amazonaws.com/stage',
    staging: '[URL_STAGING]',
    prod: '[URL_PROD]'
  },
  
  // API Gateway GCP (HTTP Proxy)
  apiGatewayGCP: {
    dev: 'https://z0jo90imu8.execute-api.us-east-1.amazonaws.com/dev',
    staging: '[URL_STAGING]',
    prod: '[URL_PROD]'
  },
  
  // API Keys GCP
  apiKeysGCP: {
    dev: '8BKiD5m9kl2mueLPC1byo2n0gEDiXiZ022IQj7xV',
    staging: '[API_KEY_STAGING]',
    prod: '[API_KEY_PROD]'
  },
  
  // GCP Directo (Cloud Run)
  gcpCloudRun: {
    dev: 'https://ms-aa-analia-suscripcion-cumplimiento-dev-993828145189.us-east1.run.app',
    staging: 'https://ms-aa-analia-suscripcion-cumplimiento-stage-556528296539.us-east1.run.app',
    prod: '[URL_PROD]'
  },
  
  // Access Tokens GCP
  gcpAccessTokens: {
    dev: 'Actuaria2024*',
    staging: 'Analitica2025*',
    prod: '[TOKEN_PROD]'
  },
  
  // API Gateway AWS Actuaría
  apiGatewayAWSActuaria: {
    dev: 'https://z0jo90imu8.execute-api.us-east-1.amazonaws.com/dev/ingeniero-digital',
    staging: '[URL_STAGING]',
    prod: '[URL_PROD]'
  },
  
  // API Gateway OpenL
  apiGatewayOpenL: {
    dev: 'https://o75yqp457c.execute-api.us-east-1.amazonaws.com/dev/negocios-patrimoniales',
    staging: '[URL_STAGING]',
    prod: '[URL_PROD]'
  },
  
  // API Keys OpenL
  apiKeysOpenL: {
    dev: 'QD3vfvmrGva9pSjzzXqEI3FDwHZR4iOQ1zacT9CK',
    staging: '[API_KEY_STAGING]',
    prod: '[API_KEY_PROD]'
  }
};
```

### 4. Crear Interceptores HTTP

- **`CumplimientoHeadersInterceptor`**: Agregar headers `X-Proceso-*` automáticamente
- **`ApiKeyInterceptor`**: Agregar `x-api-key` según el tipo de servicio
- **`GCPAccessTokenInterceptor`**: Agregar `access_token` para servicios GCP directos

### 5. Crear Servicios TypeScript

Para cada microservicio, crear servicios con métodos que:
- Construyan la URL completa
- Agreguen headers necesarios
- Manejen parámetros y body
- Retornen Observables tipados

---

## 📌 NOTAS IMPORTANTES

1. **API Keys diferentes por servicio**: Cada servicio tiene su propia API Key, no es la misma para todos.

2. **GCP tiene dos formas de acceso**:
   - HTTP Proxy (API Gateway): Usa `x-api-key`
   - Directo (Cloud Run): Usa `access_token`

3. **Headers de proceso**: Los servicios de Comunes requieren headers específicos (`codProducto`, `modulo`, `proceso`, etc.) que deben construirse dinámicamente.

4. **GraphQL para AWS Actuaría**: El servicio de Ingeniero Digital usa GraphQL, no REST.

5. **FormData para archivos**: Los servicios GCP requieren `multipart/form-data` para subir archivos.

---

**Última actualización:** 16 de Enero de 2026
**Fuente:** `CumplimientoDigital.postman_collection.json`

