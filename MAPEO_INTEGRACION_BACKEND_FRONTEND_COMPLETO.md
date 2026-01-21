# 🔗 MAPEO COMPLETO: Integración Backend ↔ Frontend

## 📋 Índice
1. [Servicios de Comunes (API Gateway HTTP Proxy)](#servicios-de-comunes)
2. [Servicios de Cumplimiento](#servicios-de-cumplimiento)
3. [Servicios GCP](#servicios-gcp)
4. [Servicios AWS Actuaría](#servicios-aws-actuaría)
5. [Servicios OpenL](#servicios-openl)
6. [Servicios Mongo](#servicios-mongo)

---

## 🔵 SERVICIOS DE COMUNES (API Gateway HTTP Proxy)

Estos servicios se consumen desde el frontend a través del **API Gateway HTTP Proxy** para evitar errores de CORS.

### ✅ COMUNES_001 - Catálogos

**Backend (Documento PDF):**
- **API:** `GET api/v1/poliza/datosvariables`
- **Header:** `x-api-key`
- **Parámetros:** `ip_Codigolista`, `ip_Codigo`, `ip_Codigodepende`, `ip_Like`

**Frontend (Actual):**
- **Servicio:** No existe servicio específico
- **Uso:** Se usa directamente en componentes para listas desplegables

**Integración Requerida:**
```typescript
// Crear servicio: catalogos.service.ts
obtenerCatalogo(codigoLista: string, codigo?: string, like?: string): Observable<ICatalogoResponse>
// Endpoint: GET ${apiGatewayUrl}/api/v1/poliza/datosvariables
// Headers: { 'x-api-key': environment.apiKey }
```

**Listas que se usan:**
- `DEPARTAMENTOS_CIUDAD` - Ciudades
- `TIPOS_CONTRATO_CU` - Tipos de contratos
- `MODALIDAD_REASEGUROS` - Modalidad de reaseguros
- `TIPO_GARANTIA` - Tipo de garantía

---

### ✅ COMUNES_002 - Tercero Consultable

**Backend (Documento PDF):**
- **API:** `GET api/v2/terceros/clientesconsultables`
- **Header:** `x-api-key` (obligatorio)
- **Parámetros:** `pTipoDocumento`, `pNumeroDocumento`, `pCodCia`, `pCodSecc`, `pCodProducto`, `pCodUsr`, `pSistemaOrigen`, `pInfo1`, `pInfo2`, `pInfo3`

**Frontend (Actual):**
- **Servicio:** `ClienteValidacionService.validarClienteConsultable()`
- **Archivo:** `src/app/shared/services/cliente-validacion.service.ts`
- **Línea:** 65-83

**Integración Requerida:**
```typescript
// Modificar: cliente-validacion.service.ts
validarClienteConsultable(tipoDocumento: string, numeroDocumento: string): Observable<IValidacionClienteResponse> {
  // TODO: Conectar con API Gateway HTTP Proxy
  // return this.http.get<IValidacionClienteResponse>(
  //   `${environment.apiGatewayUrl}/api/v2/terceros/clientesconsultables`,
  //   {
  //     params: {
  //       pTipoDocumento: tipoDocumento,
  //       pNumeroDocumento: numeroDocumento,
  //       pCodCia: '3',
  //       pCodSecc: '4',
  //       pCodProducto: this.productoActual,
  //       pCodUsr: this.usuarioEnSesion,
  //       pSistemaOrigen: '196',
  //       pInfo1: 'N',
  //       pInfo2: '1',
  //       pInfo3: 'N'
  //     },
  //     headers: { 'x-api-key': environment.apiKey }
  //   }
  // );
}
```

**Respuesta Backend:**
```json
{
  "consultaClientesConsultables": {
    "codigo": "4",  // 1=Restringido, 2/3/4=No restringido
    "valor": "NO BLOQUEO.",
    "pmsjUsuario": "IDENTIFICACION NO CONSULTABLE..."
  }
}
```

---

### ✅ COMUNES_003 - Consultar Terceros Jurídico

**Backend (Documento PDF):**
- **API:** `GET api/v1/terceros/personasJuridicas/ordinario`
- **Headers:** `codUsr`, `sistemaOrigen`, `paisISO`, `direccionIp`, `info1`, `x-api-key`
- **Parámetros:** `tipoDocumento`, `numeroDocumento`

**Frontend (Actual):**
- **Servicio:** `ClienteService.getTomador()`
- **Archivo:** `src/app/services/cliente.service.ts`
- **Línea:** 51-56

**Integración Requerida:**
```typescript
// Modificar: cliente.service.ts
getTomador(tipoDocumento: string, numeroDocumento: string): Observable<ITomador | null> {
  // TODO: Conectar con API Gateway HTTP Proxy
  // return this.http.get<ITomador>(
  //   `${environment.apiGatewayUrl}/api/v1/terceros/personasJuridicas/ordinario`,
  //   {
  //     params: { tipoDocumento, numeroDocumento },
  //     headers: {
  //       'codUsr': this.usuarioEnSesion,
  //       'sistemaOrigen': '100',
  //       'paisISO': '1',
  //       'direccionIp': '',
  //       'info1': '',
  //       'x-api-key': environment.apiKey
  //     }
  //   }
  // );
}
```

**Respuesta Backend:**
```json
{
  "dataHeader": { "codRespuesta": 0, "errores": [] },
  "data": {
    "tercerosJuridicosInfo": {
      "infoGeneralTerceroJuridico": {
        "tipoDocumento": { "codigo": "NT", "valor": "N.I.T." },
        "numeroDocumento": "830136332",
        "razonSocial": "CGM RECURSOS CREATIVOS S A S",
        "correoElectronico": "DIEGO.ACUNA@ACES.COM.CO",
        // ... más campos
      }
    }
  }
}
```

---

### ✅ COMUNES_004 - Consultar Terceros Natural

**Backend (Documento PDF):**
- **API:** `GET api/v1/terceros/personasNaturales/simplificado`
- **Headers:** `codUsr`, `sistemaOrigen`, `paisISO`, `direccionIp`, `info1`, `x-api-key`
- **Parámetros:** `tipoDocumento`, `numeroDocumento`

**Frontend (Actual):**
- **Servicio:** `ClienteService.getTomador()` (también para naturales)
- **Archivo:** `src/app/services/cliente.service.ts`

**Integración Requerida:**
```typescript
// Modificar: cliente.service.ts
getTomadorNatural(tipoDocumento: string, numeroDocumento: string): Observable<ITomador | null> {
  // TODO: Conectar con API Gateway HTTP Proxy
  // return this.http.get<ITomador>(
  //   `${environment.apiGatewayUrl}/api/v1/terceros/personasNaturales/simplificado`,
  //   {
  //     params: { tipoDocumento, numeroDocumento },
  //     headers: {
  //       'codUsr': this.usuarioEnSesion,
  //       'sistemaOrigen': '100',
  //       'paisISO': '1',
  //       'x-api-key': environment.apiKey
  //     }
  //   }
  // );
}
```

---

### ✅ COMUNES_005 - SARLAFT - Obtener Marca

**Backend (Documento PDF):**
- **API:** `GET api/v1/terceros/marcas/datosbasicos`
- **Headers:** `x-api-key`, `pCodUsr`, `pAgenciaUsr`, `pSistemaOrigen`, `pPais`, `pDireccionIp`, `pInfo`, `pIpProceso`, `pIpSubProceso`, `pCodCia`, `pCodSecc`, `pCodProducto`, `pSubProducto`, `pInfo2`
- **Parámetros:** `pTipoDocumto`, `pNumeroDocumto`, `pMcaVlrminAseg`, `pMcaVlrminPrima`

**Frontend (Actual):**
- **Servicio:** `ClienteService.validarSarlaftTomador()`
- **Archivo:** `src/app/services/cliente.service.ts`
- **Línea:** 62-68

**Integración Requerida:**
```typescript
// Modificar: cliente.service.ts
validarSarlaftTomador(tipoDocumento: string, numeroDocumento: string): Observable<ISarlaftResponse> {
  // TODO: Conectar con API Gateway HTTP Proxy
  // return this.http.get<ISarlaftResponse>(
  //   `${environment.apiGatewayUrl}/api/v1/terceros/marcas/datosbasicos`,
  //   {
  //     params: {
  //       pTipoDocumto: tipoDocumento,
  //       pNumeroDocumto: numeroDocumento,
  //       pMcaVlrminAseg: 'S',
  //       pMcaVlrminPrima: 'S'
  //     },
  //     headers: {
  //       'x-api-key': environment.apiKey,
  //       'pCodUsr': this.usuarioEnSesion,
  //       'pAgenciaUsr': '4000',
  //       'pSistemaOrigen': '190',
  //       'pPais': '1',
  //       'pInfo': 'N',
  //       'pIpProceso': '240',
  //       'pIpSubProceso': '241',
  //       'pCodCia': '3',
  //       'pCodSecc': '66',
  //       'pCodProducto': this.productoActual,
  //       'pSubProducto': '1',
  //       'pInfo2': '1'
  //     }
  //   }
  // );
}
```

**Respuesta Backend:**
```json
{
  "continuarProceso": "N",  // "N" = No continuar, "S" = Continuar
  "generarUrl": "S",        // "S" = Generar URL SARLAFT
  "tipoTercero": "J",       // "J" = Jurídico, "N" = Natural
  "clienteConsultable": "NO BLOQUEO...",
  "formularioCliente": "Ordinario",
  // ... más campos
}
```

---

### ✅ COMUNES_006 - SARLAFT - Generar URL

**Backend (Documento PDF):**
- **API:** `POST api/v1/sarlaft/urlConocimiento`
- **Header:** `x-api-key`
- **Body:** Objeto completo con datos del servicio de marcas

**Frontend (Actual):**
- **Servicio:** No existe servicio específico
- **Uso:** Se debe invocar cuando `continuarProceso: "N"` y `generarUrl: "S"`

**Integración Requerida:**
```typescript
// Crear método en: cliente.service.ts
generarUrlSarlaft(datosSarlaft: ISarlaftMarcaResponse): Observable<ISarlaftUrlResponse> {
  // TODO: Conectar con API Gateway HTTP Proxy
  // return this.http.post<ISarlaftUrlResponse>(
  //   `${environment.apiGatewayUrl}/api/v1/sarlaft/urlConocimiento`,
  //   datosSarlaft,
  //   {
  //     headers: { 'x-api-key': environment.apiKey }
  //   }
  // );
}
```

---

### ✅ COMUNES_007 - Multiclaves

**Backend (Documento PDF):**
- **API:** `POST api/v1/terceros/multiclaves`
- **Header:** `x-api-key`
- **Body:** `{ data: { clavesActivasEInactivas, clavesDirectas, nroDocumento, pais, tipoDocumento } }`

**Frontend (Actual):**
- **Servicio:** No existe servicio específico
- **Uso:** Para obtener información del usuario en sesión y sus claves

**Integración Requerida:**
```typescript
// Crear servicio: multiclaves.service.ts
obtenerMulticlaves(tipoDocumento: string, numeroDocumento: number): Observable<IMulticlavesResponse> {
  // TODO: Conectar con API Gateway HTTP Proxy
  // return this.http.post<IMulticlavesResponse>(
  //   `${environment.apiGatewayUrl}/api/v1/terceros/multiclaves`,
  //   {
  //     data: {
  //       clavesActivasEInactivas: 'N',
  //       clavesDirectas: 'S',
  //       nroDocumento: numeroDocumento,
  //       pais: 'CO',
  //       tipoDocumento: tipoDocumento
  //     }
  //   },
  //   {
  //     headers: { 'x-api-key': environment.apiKey }
  //   }
  // );
}
```

---

### ✅ COMUNES_008 - Recuperar Agente

**Backend (Documento PDF):**
- **API:** `GET api/v1/terceros/agentes/{codigo}`
- **Headers:** `modulo`, `proceso`, `subProceso`, `codCia`, `codSecc`, `codProducto`, `codUsr`, `entidadColocadora`, `canal`, `sistemaOrigen`, `paisISO`, `direccionIp`, `info1`, `x-api-key`

**Frontend (Actual):**
- **Servicio:** No existe servicio específico
- **Uso:** Validar clave de intermediación

**Integración Requerida:**
```typescript
// Crear método en: cliente.service.ts o nuevo servicio
recuperarAgente(codigoAgente: string): Observable<IAgenteResponse> {
  // TODO: Conectar con API Gateway HTTP Proxy
  // return this.http.get<IAgenteResponse>(
  //   `${environment.apiGatewayUrl}/api/v1/terceros/agentes/${codigoAgente}`,
  //   {
  //     headers: {
  //       'modulo': '2',
  //       'proceso': '241',
  //       'subProceso': '240',
  //       'codCia': '3',
  //       'codSecc': '4',
  //       'codProducto': this.productoActual,
  //       'codUsr': this.usuarioEnSesion,
  //       'entidadColocadora': '0',
  //       'canal': '3',
  //       'sistemaOrigen': '196',
  //       'paisISO': '1',
  //       'info1': 'N',
  //       'x-api-key': environment.apiKey
  //     }
  //   }
  // );
}
```

---

### ✅ COMUNES_009 - Notificador Transversal

**Backend (Documento PDF):**
- **API:** `POST api/v1/mensajeria/notificador/mensajes`
- **Header:** `x-api-key`
- **Body:** Objeto con `aplicacion`, `notificacion`, `grupo` (DatosPlantilla, DatosEnvio)

**Frontend (Actual):**
- **Servicio:** No existe servicio específico
- **Uso:** Enviar correos y SMS

**Integración Requerida:**
```typescript
// Crear servicio: notificador.service.ts
enviarNotificacion(datosNotificacion: INotificacionRequest): Observable<INotificacionResponse> {
  // TODO: Conectar con API Gateway HTTP Proxy
  // return this.http.post<INotificacionResponse>(
  //   `${environment.apiGatewayUrl}/api/v1/mensajeria/notificador/mensajes`,
  //   datosNotificacion,
  //   {
  //     headers: { 'x-api-key': environment.apiKey }
  //   }
  // );
}
```

---

### ✅ COMUNES_010 - Generar PDF Cotización

**Backend (Documento PDF):**
- **API:** `GET api/v1/cotizacion/pdf`
- **Header:** `x-api-key`
- **Parámetros:** `compania`, `endoso`, `numeroCotizacion`, `ramo`, `riesgo`, `seccion`, `secuPoliza`, `tipoCotizacion`, `usuario`

**Frontend (Actual):**
- **Servicio:** No existe servicio específico
- **Uso:** Generar PDF de cotización

**Integración Requerida:**
```typescript
// Crear método en: cotizacion.service.ts
generarPdfCotizacion(params: IPdfCotizacionParams): Observable<Blob> {
  // TODO: Conectar con API Gateway HTTP Proxy
  // return this.http.get(
  //   `${environment.apiGatewayUrl}/api/v1/cotizacion/pdf`,
  //   {
  //     params: {
  //       compania: '3',
  //       endoso: params.endoso,
  //       numeroCotizacion: params.numeroCotizacion,
  //       ramo: params.ramo,
  //       riesgo: '1',
  //       seccion: params.seccion,
  //       secuPoliza: params.secuPoliza,
  //       tipoCotizacion: '3',
  //       usuario: this.usuarioEnSesion
  //     },
  //     headers: { 'x-api-key': environment.apiKey },
  //     responseType: 'blob'
  //   }
  // );
}
```

---

### ✅ COMUNES_011 - Generar PDF Póliza

**Backend (Documento PDF):**
- **API:** `GET api/v1/polizas/Pdf`
- **Header:** `x-api-key`
- **Parámetros:** `compania`, `endoso`, `numeroPoliza`, `ramo`, `riesgo`, `seccion`, `secuPoliza`, `numeroSubProducto`, `tipoPoliza`, `usuario`

**Frontend (Actual):**
- **Servicio:** No existe servicio específico
- **Uso:** Generar PDF de póliza

**Integración Requerida:**
```typescript
// Crear método en: poliza.service.ts
generarPdfPoliza(params: IPdfPolizaParams): Observable<Blob> {
  // TODO: Conectar con API Gateway HTTP Proxy
  // return this.http.get(
  //   `${environment.apiGatewayUrl}/api/v1/polizas/Pdf`,
  //   {
  //     params: {
  //       compania: '3',
  //       endoso: params.endoso,
  //       numeroPoliza: params.numeroPoliza,
  //       ramo: params.ramo,
  //       riesgo: '1',
  //       seccion: params.seccion,
  //       secuPoliza: params.secuPoliza,
  //       numeroSubProducto: null,
  //       tipoPoliza: '1',
  //       usuario: this.usuarioEnSesion
  //     },
  //     headers: { 'x-api-key': environment.apiKey },
  //     responseType: 'blob'
  //   }
  // );
}
```

---

## 🟢 SERVICIOS DE CUMPLIMIENTO

### ✅ CUMPL_025 - Validar Cliente por Intermediario

**Backend (Documento PDF):**
- **API:** `POST api/v1/validarNitsautUsuario`
- **Headers:** `x-api-key`, `Content-Type`, `X-Proceso-*` (múltiples headers)
- **Body:** `{ ipTipoDocumento, ipNumeroDocumento, ipTipoUsuario }`

**Frontend (Actual):**
- **Servicio:** `ClienteEnfoqueService.validarNITAutorizado()`
- **Archivo:** `src/app/shared/services/cliente-enfoque.service.ts`
- **Línea:** 63-92

**Integración Requerida:**
```typescript
// Modificar: cliente-enfoque.service.ts
validarNITAutorizado(nit: string, tipoUsuario: TipoUsuario): Observable<INITsAutorizadosResponse> {
  // TODO: Conectar con API de Cumplimiento
  // return this.http.post<INITsAutorizadosResponse>(
  //   `${environment.apiUrl}/api/v1/validarNitsautUsuario`,
  //   {
  //     ipTipoDocumento: 'NT',
  //     ipNumeroDocumento: nit,
  //     ipTipoUsuario: tipoUsuario === 'intermediario' ? 'A' : 'E'
  //   },
  //   {
  //     headers: {
  //       'x-api-key': environment.apiKey,
  //       'Content-Type': 'application/json',
  //       'X-Proceso-modulo': '2',
  //       'X-Proceso-proceso': '241',
  //       'X-Proceso-subproceso': '240',
  //       'X-Proceso-cod_cia': '3',
  //       'X-Proceso-cod_secc': '4',
  //       'X-Proceso-cod_producto': this.productoActual,
  //       'X-Proceso-cod_usr': this.usuarioEnSesion,
  //       'X-Proceso-entidad_colocadora': '0',
  //       'X-Proceso-canal': '3',
  //       'X-Proceso-sistema_origen': '196',
  //       'X-Proceso-pais': '1',
  //       'X-Proceso-info1': tipoUsuario === 'intermediario' ? 'A' : 'E',
  //       'X-Proceso-info2': this.claveIntermediario
  //     }
  //   }
  // );
}
```

**Respuesta Backend:**
```json
{
  "dataHeader": { "success": true, "errores": [] },
  "data": [{ "OP_MCA_AUTORIZADO": "S" }]  // "S" = Autorizado, "N" = No autorizado
}
```

---

### ✅ CUMPL_027 - Cálculo de Suma Asegurada Disponible

**Backend (Documento PDF):**
- **API:** `GET api/v1/consultarSumaDisponible`
- **Headers:** `x-api-key`, `X-Proceso-*` (múltiples headers)
- **Parámetros:** `ipTipoDocumento`, `ipNumeroDocumento`, `ipFeciniVigencia`, `ipFechaEmision`

**Frontend (Actual):**
- **Servicio:** `CupoService.calcularCupoDisponible()`
- **Archivo:** `src/app/shared/services/cupo.service.ts`
- **Línea:** 65-82

**Integración Requerida:**
```typescript
// Modificar: cupo.service.ts
calcularCupoDisponible(tipoDocumento: string, numeroDocumento: string): Observable<ICupoDisponibleResponse> {
  // TODO: Conectar con API de Cumplimiento
  // return this.http.get<ICupoDisponibleResponse>(
  //   `${environment.apiUrl}/api/v1/consultarSumaDisponible`,
  //   {
  //     params: {
  //       ipTipoDocumento: tipoDocumento,
  //       ipNumeroDocumento: numeroDocumento,
  //       ipFeciniVigencia: this.fechaInicioVigencia,
  //       ipFechaEmision: new Date().toISOString().split('T')[0]
  //     },
  //     headers: {
  //       'x-api-key': environment.apiKey,
  //       'X-Proceso-modulo': '2',
  //       'X-Proceso-proceso': '241',
  //       'X-Proceso-subproceso': '240',
  //       'X-Proceso-cod_cia': '3',
  //       'X-Proceso-cod_secc': '4',
  //       'X-Proceso-cod_producto': this.productoActual,
  //       'X-Proceso-cod_usr': this.usuarioEnSesion,
  //       'X-Proceso-entidad_colocadora': '0',
  //       'X-Proceso-canal': '3',
  //       'X-Proceso-sistema_origen': '196',
  //       'X-Proceso-pais': '1'
  //     }
  //   }
  // ).pipe(
  //   map(response => ({
  //     cupoDisponible: parseFloat(response.data[0].opSumaDisponible),
  //     tipoCliente: this.determinarTipoCliente(response),
  //     tieneCupo: parseFloat(response.data[0].opSumaDisponible) > 0,
  //     requiereValidacion: false
  //   }))
  // );
}
```

**Respuesta Backend:**
```json
{
  "dataHeader": { "success": true, "errores": [] },
  "data": [{
    "opSumaDisponible": "210000000",
    "opErrores": [{
      "DESC_ERROR": "La suma disponible para expedir polizas es de 210,000,000"
    }]
  }]
}
```

---

### ✅ CUMPL_037 - Validar Empresas Grupo Bolívar

**Backend (Documento PDF):**
- **API:** `GET api/v1/validarMiembroGrupoBolivar` (versión antigua)
- **API:** `POST api/v1/validarClienteGrupoBolivar` (versión nueva)
- **Headers:** `x-api-key`, `X-Proceso-*` (múltiples headers)
- **Body (POST):** `{ ipTipoTomador, ipNroTomador, ipTipoAseg, ipNroAseg, ipClaveAgente }`

**Frontend (Actual):**
- **Servicio:** `GrupoBolivarService.validarGrupoBolivarCompleto()`
- **Archivo:** `src/app/shared/services/grupo-bolivar.service.ts`
- **Línea:** 106-147

**Integración Requerida:**
```typescript
// Modificar: grupo-bolivar.service.ts
validarGrupoBolivarCompleto(
  tipoDocumentoTomador: string,
  numeroDocumentoTomador: string,
  tipoDocumentoAsegurado: string | null,
  numeroDocumentoAsegurado: string | null,
  claveIntermediario: string
): Observable<IValidacionGrupoBolivar> {
  // TODO: Conectar con API de Cumplimiento (versión POST)
  // return this.http.post<IValidacionGrupoBolivar>(
  //   `${environment.apiUrl}/api/v1/validarClienteGrupoBolivar`,
  //   {
  //     ipTipoTomador: tipoDocumentoTomador,
  //     ipNroTomador: numeroDocumentoTomador,
  //     ipTipoAseg: tipoDocumentoAsegurado || '',
  //     ipNroAseg: numeroDocumentoAsegurado || '',
  //     ipClaveAgente: claveIntermediario
  //   },
  //   {
  //     headers: {
  //       'x-api-key': environment.apiKey,
  //       'X-Proceso-modulo': '2',
  //       'X-Proceso-proceso': '241',
  //       'X-Proceso-subproceso': '240',
  //       'X-Proceso-cod_cia': '3',
  //       'X-Proceso-cod_secc': '4',
  //       'X-Proceso-cod_producto': this.productoActual,
  //       'X-Proceso-cod_usr': this.usuarioEnSesion,
  //       'X-Proceso-entidad_colocadora': '0',
  //       'X-Proceso-canal': '3',
  //       'X-Proceso-sistema_origen': '196',
  //       'X-Proceso-pais': '1',
  //       'X-Proceso-info4': this.tipoUsuario === 'intermediario' ? 'A' : 'E'
  //     }
  //   }
  // ).pipe(
  //   map(response => ({
  //     tomadorEsGrupoBolivar: response.data.tomadorEsGrupoBolivar,
  //     aseguradoEsGrupoBolivar: response.data.aseguradoEsGrupoBolivar,
  //     claveEsDirecta: response.data.claveEsDirecta,
  //     requiereError: response.data.esBloqueante
  //   }))
  // );
}
```

**Respuesta Backend:**
```json
{
  "dataHeader": { "success": true, "errores": [] },
  "data": {
    "esBloqueante": false,
    "mensaje": "El cliente puede ser emitido/cotizado con el agente actual."
  }
}
```

---

### ✅ CUMPL_021 - Consultar Lista de Programas GB

**Backend (Documento PDF):**
- **API:** `GET api/v1/consultarListaProgramasGB`
- **Headers:** `x-api-key`, `X-Proceso-*` (múltiples headers)
- **Parámetros:** `ipTipoDocAseg`, `ipNroDocAseg`, `ipClave`

**Frontend (Actual):**
- **Servicio:** `ProgramaService.obtenerProgramasDisponibles()`
- **Archivo:** `src/app/shared/services/programa.service.ts`
- **Línea:** 48-122

**Integración Requerida:**
```typescript
// Modificar: programa.service.ts
obtenerProgramasDisponibles(
  claveIntermediario: string,
  tipoDocumentoAsegurado: string,
  numeroDocumentoAsegurado: string,
  tipoUsuario: TipoUsuario
): Observable<IProgramaParametrizado[]> {
  // TODO: Conectar con API de Cumplimiento
  // return this.http.get<IProgramaGBResponse>(
  //   `${environment.apiUrl}/api/v1/consultarListaProgramasGB`,
  //   {
  //     params: {
  //       ipTipoDocAseg: tipoDocumentoAsegurado,
  //       ipNroDocAseg: numeroDocumentoAsegurado,
  //       ipClave: claveIntermediario
  //     },
  //     headers: {
  //       'x-api-key': environment.apiKey,
  //       'X-Proceso-modulo': '2',
  //       'X-Proceso-proceso': '241',
  //       'X-Proceso-subproceso': '240',
  //       'X-Proceso-cod_cia': '3',
  //       'X-Proceso-cod_secc': '4',
  //       'X-Proceso-cod_producto': '440',
  //       'X-Proceso-cod_usr': this.usuarioEnSesion,
  //       'X-Proceso-entidad_colocadora': '0',
  //       'X-Proceso-canal': '3',
  //       'X-Proceso-sistema_origen': '196',
  //       'X-Proceso-pais': '1'
  //     }
  //   }
  // ).pipe(
  //   map(response => response.data.map(programa => ({
  //     id: programa.SEQ_PROGRAMA_GB.toString(),
  //     codigo: programa.SEQ_PROGRAMA_GB.toString(),
  //     nombre: programa.NOMBRE_PROGRAMA_GB,
  //     activo: programa.ESTADO_PROGRAMA_GB === 'A',
  //     tieneClaveExclusiva: programa.MCA_CLAVE_EXCLU === 'S',
  //     facility: programa.CUPO_FACILITY,
  //     aseguradoEnPrograma: true // Se filtra según reglas
  //   })))
  // );
}
```

**Respuesta Backend:**
```json
{
  "dataHeader": { "success": true, "errores": [] },
  "data": [{
    "SEQ_PROGRAMA_GB": 2885,
    "NOMBRE_PROGRAMA_GB": "4GS SECURE SOLUTION",
    "CUPO_FACILITY": 200000000,
    "MCA_CLAVE_EXCLU": "S",
    "ESTADO_PROGRAMA_GB": "A",
    // ... más campos
  }]
}
```

---

### ✅ CUMPL_022 - Detalle del Programa GB

**Backend (Documento PDF):**
- **API:** `GET api/v1/consultarDetalleProgramasGB`
- **Headers:** `x-api-key`, `X-Proceso-*` (múltiples headers)
- **Parámetros:** `ipIdPrograma`, `ipFechaInicioVig`

**Frontend (Actual):**
- **Servicio:** `ProgramaService.obtenerFacilityPrograma()`
- **Archivo:** `src/app/shared/services/programa.service.ts`
- **Línea:** 155-168

**Integración Requerida:**
```typescript
// Modificar: programa.service.ts
obtenerFacilityPrograma(programaId: string): Observable<number | null> {
  // TODO: Conectar con API de Cumplimiento
  // return this.http.get<IProgramaDetalleResponse>(
  //   `${environment.apiUrl}/api/v1/consultarDetalleProgramasGB`,
  //   {
  //     params: {
  //       ipIdPrograma: programaId,
  //       ipFechaInicioVig: this.fechaInicioVigencia
  //     },
  //     headers: {
  //       'x-api-key': environment.apiKey,
  //       'X-Proceso-modulo': '2',
  //       'X-Proceso-proceso': '241',
  //       'X-Proceso-subproceso': '240',
  //       'X-Proceso-cod_cia': '3',
  //       'X-Proceso-cod_secc': '4',
  //       'X-Proceso-cod_producto': '440',
  //       'X-Proceso-cod_usr': this.usuarioEnSesion,
  //       'X-Proceso-entidad_colocadora': '0',
  //       'X-Proceso-canal': '3',
  //       'X-Proceso-sistema_origen': '196',
  //       'X-Proceso-pais': '1'
  //     }
  //   }
  // ).pipe(
  //   map(response => response.data.PROGRAMA_GB?.cupo_facility || null)
  // );
}
```

---

## 🟡 SERVICIOS GCP

### ✅ GCP_001 - Lector de Contratos

**Backend (Documento PDF):**
- **API:** `POST contrato/lector-contratos`
- **Headers:** `access_token`, `accept`, `Content-Type`
- **Body:** `FormData` con `correo_usuario`, `file`, `id_front`

**Frontend (Actual):**
- **Servicio:** No existe servicio específico
- **Uso:** Procesar contratos para extraer información

**Integración Requerida:**
```typescript
// Crear servicio: lector-contratos.service.ts
procesarContrato(archivo: File, correoUsuario: string): Observable<IContratoProcesadoResponse> {
  // TODO: Conectar con API Gateway HTTP Proxy GCP
  // const formData = new FormData();
  // formData.append('correo_usuario', correoUsuario);
  // formData.append('file', archivo);
  // formData.append('id_front', this.idFrontend);
  //
  // return this.http.post<IContratoProcesadoResponse>(
  //   `${environment.apiGatewayGcpUrl}/contrato/lector-contratos`,
  //   formData,
  //   {
  //     headers: {
  //       'access_token': environment.gcpAccessToken,
  //       'accept': 'application/json'
  //     }
  //   }
  // );
}
```

---

### ✅ GCP_002 - Lector Estados Financieros - Procesar

**Backend (Documento PDF):**
- **API:** `POST financiero/extract/extract-variable`
- **Headers:** `access_token`, `accept`, `Content-Type`
- **Body:** `FormData` con `correo_usuario`, `file`

**Frontend (Actual):**
- **Servicio:** `CupoService.recalcularCupoConEstadosFinancieros()`
- **Archivo:** `src/app/shared/services/cupo.service.ts`
- **Línea:** 122-142

**Integración Requerida:**
```typescript
// Modificar: cupo.service.ts
procesarEstadosFinancieros(archivo: File, correoUsuario: string): Observable<IEstadosFinancierosResponse> {
  // TODO: Conectar con API Gateway HTTP Proxy GCP
  // const formData = new FormData();
  // formData.append('correo_usuario', correoUsuario);
  // formData.append('file', archivo);
  //
  // return this.http.post<IEstadosFinancierosResponse>(
  //   `${environment.apiGatewayGcpUrl}/financiero/extract/extract-variable`,
  //   formData,
  //   {
  //     headers: {
  //       'access_token': environment.gcpAccessToken,
  //       'accept': 'application/json'
  //     }
  //   }
  // );
}
```

**Respuesta Backend:**
```json
{
  "resultado_extraccion": {
    "id_proceso_IA": "bd3cce84-d7a2-47d1-8ffd-42847942e8c2",
    "eeff_IA": {
      "numero_documento": 900937335.0,
      "tipo_documento": "NT",
      "nombre_empresa": "PROYECTOS CON INGENIERIA S.A.S.",
      "total_activo": { "anio_1": 5154016767.0 },
      // ... más campos financieros
    }
  }
}
```

---

### ✅ GCP_003 - Lector Estados Financieros - Calcular Cupo

**Backend (Documento PDF):**
- **API:** `POST financiero/calculate-cupo/calculate-cupo`
- **Headers:** `access_token`, `accept`, `Content-Type`
- **Body:** `id_documento`, `pgb_davivienda`, `sector`, `id_documento_edit_analista`

**Frontend (Actual):**
- **Servicio:** `CupoService.recalcularCupoConEstadosFinancieros()`
- **Archivo:** `src/app/shared/services/cupo.service.ts`
- **Línea:** 122-142

**Integración Requerida:**
```typescript
// Modificar: cupo.service.ts
calcularCupoConEstadosFinancieros(
  idProcesoIA: string,
  pgbDavivienda: boolean,
  sectores: string[]
): Observable<ICupoCalculadoResponse> {
  // TODO: Conectar con API Gateway HTTP Proxy GCP
  // const formData = new URLSearchParams();
  // formData.append('id_documento', idProcesoIA);
  // formData.append('pgb_davivienda', pgbDavivienda ? 'S' : 'N');
  // formData.append('sector', JSON.stringify(sectores));
  //
  // return this.http.post<ICupoCalculadoResponse>(
  //   `${environment.apiGatewayGcpUrl}/financiero/calculate-cupo/calculate-cupo`,
  //   formData.toString(),
  //   {
  //     headers: {
  //       'access_token': environment.gcpAccessToken,
  //       'accept': 'application/json',
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     }
  //   }
  // );
}
```

**Respuesta Backend:**
```json
{
  "resultado_extraccion": {
    "modelo_cupo": "Modelo Davivienda para Pymes",
    "calificacion_de_riesgo": "R2",
    "valor_cupo": 278831899.0,
    "tasas": {
      "tasa_seriedad_y_oferta": 0.14,
      "tasa_otras_coberturas_de_cumplimiento": 0.22,
      "tasa_resposabilidad_civil": 0.24
    }
  }
}
```

---

## 🔴 SERVICIOS AWS ACTUARÍA

### ✅ AWS_001 - Ingeniero Digital

**Backend (Documento PDF):**
- **API:** `POST dataops/proxy/graphql/empresas`
- **Headers:** `x-api-key`, `x-user-key`, `Content-Type`, `Cookie`
- **Body:** GraphQL query `cumplimientoV5`

**Frontend (Actual):**
- **Servicio:** `CupoService.validarCapacidadIngenieroDigital()`
- **Archivo:** `src/app/shared/services/cupo.service.ts`
- **Línea:** 99-115

**Integración Requerida:**
```typescript
// Modificar: cupo.service.ts
validarCapacidadIngenieroDigital(
  tipoDocumento: string,
  numeroDocumento: string
): Observable<IIngenieroDigitalResponse> {
  // TODO: Conectar con API Gateway HTTP Proxy AWS Actuaría
  // const query = `
  //   query cumplimientoV5($tipoDocumentoEmpresa: String!, $numeroDocumento: String!) {
  //     cumplimientoV5(tipoDocumento: $tipoDocumentoEmpresa, numeroDocumento: $numeroDocumento) {
  //       tipoDocumentoEmpresa
  //       cupoFinalCumplimiento
  //       seriedadOfertaCumplimiento
  //       otrasCoberturasCumplimiento
  //       riesgoFinalBolivar
  //     }
  //   }
  // `;
  //
  // return this.http.post<IGraphQLResponse>(
  //   `${environment.apiGatewayAwsUrl}/dataops/proxy/graphql/empresas`,
  //   {
  //     query: query,
  //     variables: {
  //       tipoDocumentoEmpresa: tipoDocumento,
  //       numeroDocumento: numeroDocumento
  //     }
  //   },
  //   {
  //     headers: {
  //       'x-api-key': environment.awsApiKey,
  //       'x-user-key': environment.awsUserKey,
  //       'Content-Type': 'application/json'
  //     }
  //   }
  // ).pipe(
  //   map(response => ({
  //     tieneInformacion: !!response.data.cumplimientoV5.cupoFinalCumplimiento,
  //     capacidadValidada: true,
  //     requiereEstadosFinancieros: !response.data.cumplimientoV5.cupoFinalCumplimiento,
  //     cupoDisponible: response.data.cumplimientoV5.cupoFinalCumplimiento || 0
  //   }))
  // );
}
```

**Respuesta Backend:**
```json
{
  "data": {
    "cumplimientoV5": {
      "cupoFinalCumplimiento": 10451562560.0,
      "seriedadOfertaCumplimiento": "0.09",
      "otrasCoberturasCumplimiento": "0.15",
      "riesgoFinalBolivar": "R1+"
    }
  }
}
```

---

## 🟣 SERVICIOS OPENL

### ✅ OPENL_001 - Validar Tipo Documento Tomador/Asegurado

**Backend (Documento PDF):**
- **API:** `POST v1/TipoDocumento`
- **Headers:** `x-api-key`, `Content-Type`
- **Body:** `{ docContratista, docContratante }`

**Frontend (Actual):**
- **Servicio:** `ProductoValidacionService.validarCombinacionClientes()`
- **Archivo:** `src/app/shared/services/producto-validacion.service.ts`

**Integración Requerida:**
```typescript
// Modificar: producto-validacion.service.ts
validarCombinacionClientes(
  tipoProducto: string,
  tipoPersonaTomador: TipoPersona,
  tipoPersonaAsegurado: TipoPersona
): Observable<boolean> {
  // TODO: Conectar con API OpenL
  // return this.http.post<number>(
  //   `${environment.openlUrl}/v1/TipoDocumento`,
  //   {
  //     docContratista: tipoPersonaTomador === 'Natural' ? 'CC' : 'NT',
  //     docContratante: tipoPersonaAsegurado === 'Natural' ? 'CC' : 'NT'
  //   },
  //   {
  //     headers: {
  //       'x-api-key': environment.openlApiKey,
  //       'Content-Type': 'application/json'
  //     }
  //   }
  // ).pipe(
  //   map(response => response === 1)  // 1 = Puede continuar, 0 = No puede continuar
  // );
}
```

---

### ✅ OPENL_002 - Validar Retroactividad/Prospectividad

**Backend (Documento PDF):**
- **API:** `POST v1/RetroactividadProspectividad`
- **Headers:** `x-api-key`, `Content-Type`
- **Body:** `{ fechaContrato }`

**Frontend (Actual):**
- **Servicio:** No existe servicio específico
- **Uso:** Validar fecha de inicio del contrato

**Integración Requerida:**
```typescript
// Crear método en: validaciones.service.ts
validarRetroactividadProspectividad(fechaContrato: string): Observable<boolean> {
  // TODO: Conectar con API OpenL
  // return this.http.post<number>(
  //   `${environment.openlUrl}/v1/RetroactividadProspectividad`,
  //   { fechaContrato },
  //   {
  //     headers: {
  //       'x-api-key': environment.openlApiKey,
  //       'Content-Type': 'application/json'
  //     }
  //   }
  // ).pipe(
  //   map(response => response === 1)
  // );
}
```

---

### ✅ OPENL_003 - Validar Vigencia Contrato

**Backend (Documento PDF):**
- **API:** `POST v1/VigenciaContrato`
- **Headers:** `x-api-key`, `Content-Type`
- **Body:** `{ fechaInicioContrato, fechaFinContrato }`

**Frontend (Actual):**
- **Servicio:** No existe servicio específico
- **Uso:** Validar duración del contrato

**Integración Requerida:**
```typescript
// Crear método en: validaciones.service.ts
validarVigenciaContrato(fechaInicio: string, fechaFin: string): Observable<boolean> {
  // TODO: Conectar con API OpenL
  // return this.http.post<number>(
  //   `${environment.openlUrl}/v1/VigenciaContrato`,
  //   { fechaInicioContrato: fechaInicio, fechaFinContrato: fechaFin },
  //   {
  //     headers: {
  //       'x-api-key': environment.openlApiKey,
  //       'Content-Type': 'application/json'
  //     }
  //   }
  // ).pipe(
  //   map(response => response === 1)
  // );
}
```

---

### ✅ OPENL_004 - Validar Asegurabilidad Ubicación

**Backend (Documento PDF):**
- **API:** `POST v1/UbicacionRiesgo`
- **Headers:** `x-api-key`, `Content-Type`
- **Body:** `{ CodDep, CodMun }`

**Frontend (Actual):**
- **Servicio:** No existe servicio específico
- **Uso:** Validar si la ciudad es asegurable

**Integración Requerida:**
```typescript
// Crear método en: validaciones.service.ts
validarUbicacionRiesgo(codigoDepartamento: number, codigoMunicipio: string): Observable<boolean> {
  // TODO: Conectar con API OpenL
  // return this.http.post<number>(
  //   `${environment.openlUrl}/v1/UbicacionRiesgo`,
  //   { CodDep: codigoDepartamento, CodMun: codigoMunicipio },
  //   {
  //     headers: {
  //       'x-api-key': environment.openlApiKey,
  //       'Content-Type': 'application/json'
  //     }
  //   }
  // ).pipe(
  //   map(response => response === 1)
  // );
}
```

---

### ✅ OPENL_005 - Validar Clientes Restringidos

**Backend (Documento PDF):**
- **API:** `POST v1/ClientesRestringidos`
- **Headers:** `x-api-key`, `Content-Type`
- **Body:** `{ TipoDocumento, NumeroDoc }`

**Frontend (Actual):**
- **Servicio:** `ClienteValidacionService.validarClienteConsultable()`
- **Archivo:** `src/app/shared/services/cliente-validacion.service.ts`

**Integración Requerida:**
```typescript
// Modificar: cliente-validacion.service.ts
validarClienteConsultable(tipoDocumento: string, numeroDocumento: string): Observable<IClienteConsultableResponse> {
  // TODO: También conectar con API OpenL para validación adicional
  // return this.http.post<number>(
  //   `${environment.openlUrl}/v1/ClientesRestringidos`,
  //   { TipoDocumento: tipoDocumento, NumeroDoc: numeroDocumento },
  //   {
  //     headers: {
  //       'x-api-key': environment.openlApiKey,
  //       'Content-Type': 'application/json'
  //     }
  //   }
  // ).pipe(
  //   map(response => ({
  //     esConsultable: response === 1,
  //     motivo: response === 0 ? 'Cliente restringido por línea de negocio' : undefined
  //   }))
  // );
}
```

---

## 🟠 SERVICIOS MONGO

### ✅ CUMPL_017 - Insertar Datos

**Backend (Documento PDF):**
- **API:** `POST api/v1/insertarNegociosCu`
- **Header:** `x-api-key`
- **Body:** Objeto completo con estructura de negocio

**Frontend (Actual):**
- **Servicio:** No existe servicio específico
- **Uso:** Guardar cotización/póliza en Mongo

**Integración Requerida:**
```typescript
// Crear servicio: mongo.service.ts
insertarNegocio(negocio: INegocioMongo): Observable<{ id: string, message: string }> {
  // TODO: Conectar con API de Cumplimiento
  // return this.http.post<{ id: string, message: string }>(
  //   `${environment.apiUrl}/api/v1/insertarNegociosCu`,
  //   negocio,
  //   {
  //     headers: { 'x-api-key': environment.apiKey }
  //   }
  // );
}
```

---

### ✅ CUMPL_016 - Consultar Datos

**Backend (Documento PDF):**
- **API:** `GET api/v1/consultarDetalleNegociosCu`
- **Header:** `x-api-key`
- **Parámetros:** `id`

**Frontend (Actual):**
- **Servicio:** No existe servicio específico
- **Uso:** Recuperar cotización/póliza guardada

**Integración Requerida:**
```typescript
// Crear método en: mongo.service.ts
consultarNegocio(id: string): Observable<INegocioMongo> {
  // TODO: Conectar con API de Cumplimiento
  // return this.http.get<INegocioMongo>(
  //   `${environment.apiUrl}/api/v1/consultarDetalleNegociosCu`,
  //   {
  //     params: { id },
  //     headers: { 'x-api-key': environment.apiKey }
  //   }
  // );
}
```

---

### ✅ CUMPL_018 - Actualizar Datos

**Backend (Documento PDF):**
- **API:** `POST api/v1/actualizarNegociosCu`
- **Header:** `x-api-key`
- **Body:** Objeto completo con `id` y datos actualizados

**Frontend (Actual):**
- **Servicio:** No existe servicio específico
- **Uso:** Actualizar cotización/póliza guardada

**Integración Requerida:**
```typescript
// Crear método en: mongo.service.ts
actualizarNegocio(id: string, negocio: INegocioMongo): Observable<{ id: string, mensaje: string }> {
  // TODO: Conectar con API de Cumplimiento
  // return this.http.post<{ id: string, mensaje: string }>(
  //   `${environment.apiUrl}/api/v1/actualizarNegociosCu`,
  //   { ...negocio, id },
  //   {
  //     headers: { 'x-api-key': environment.apiKey }
  //   }
  // );
}
```

---

### ✅ CUMPL_019 - Eliminar Datos

**Backend (Documento PDF):**
- **API:** `DELETE api/v1/eliminarNegociosCu`
- **Header:** `x-api-key`
- **Parámetros:** `tipoBorrado`, `id` (si Individual), `diasVencimiento` (si Todas)

**Frontend (Actual):**
- **Servicio:** No existe servicio específico
- **Uso:** Eliminar cotización/póliza guardada

**Integración Requerida:**
```typescript
// Crear método en: mongo.service.ts
eliminarNegocio(tipoBorrado: 'I' | 'T', id?: string, diasVencimiento?: number): Observable<{ negociosEliminados: number }> {
  // TODO: Conectar con API de Cumplimiento
  // const params: any = { tipoBorrado };
  // if (tipoBorrado === 'I' && id) params.id = id;
  // if (tipoBorrado === 'T' && diasVencimiento) params.diasVencimiento = diasVencimiento;
  //
  // return this.http.delete<{ negociosEliminados: number }>(
  //   `${environment.apiUrl}/api/v1/eliminarNegociosCu`,
  //   {
  //     params,
  //     headers: { 'x-api-key': environment.apiKey }
  //   }
  // );
}
```

---

### ✅ CUMPL_015 - Consultar Lista de Negocios

**Backend (Documento PDF):**
- **API:** `GET api/v1/PENDIENTE` (pendiente endpoint)
- **Header:** `x-api-key`
- **Parámetros:** Múltiples filtros (tipo documento, nombre, fechas, estado, etc.)

**Frontend (Actual):**
- **Servicio:** No existe servicio específico
- **Uso:** Listar cotizaciones/pólizas guardadas

**Integración Requerida:**
```typescript
// Crear método en: mongo.service.ts
consultarListaNegocios(filtros: IFiltrosNegocios): Observable<INegocioListaResponse> {
  // TODO: Conectar con API de Cumplimiento cuando esté disponible
  // return this.http.get<INegocioListaResponse>(
  //   `${environment.apiUrl}/api/v1/consultarListaNegocios`,
  //   {
  //     params: filtros,
  //     headers: { 'x-api-key': environment.apiKey }
  //   }
  // );
}
```

---

## 📝 RESUMEN DE CONFIGURACIÓN

### Variables de Entorno Requeridas

```typescript
// environment.ts
export const environment = {
  // API Gateway HTTP Proxy Comunes
  apiGatewayUrl: 'https://api-gateway-cumplimiento-dev...',
  apiKey: 'tu-api-key-comunes',
  
  // API Cumplimiento
  apiUrl: 'https://api-cumplimiento-dev...',
  
  // API Gateway HTTP Proxy GCP
  apiGatewayGcpUrl: 'https://api-gateway-gcp-dev...',
  gcpAccessToken: 'Actuaria2024*',
  
  // API Gateway HTTP Proxy AWS Actuaría
  apiGatewayAwsUrl: 'https://api-gateway-aws-dev...',
  awsApiKey: 'tu-aws-api-key',
  awsUserKey: 'tu-aws-user-key',
  
  // API OpenL
  openlUrl: 'https://api-openl-dev...',
  openlApiKey: 'tu-openl-api-key',
  
  // Usuario en sesión (debe venir del servicio de autenticación)
  usuarioEnSesion: '',
  claveIntermediario: '',
  productoActual: '450' // o '440', '455', '214'
};
```

### Headers Comunes

Todos los servicios requieren:
- `x-api-key`: API Key del ambiente correspondiente
- Headers específicos según el servicio (ver documentación de cada servicio)

### Interceptor HTTP

El `AuthInterceptor` ya está configurado para agregar automáticamente:
- Token Bearer a URLs que contengan `/api/`, `/v1/`, `/secure/`
- Headers comunes si es necesario

---

## ✅ PRÓXIMOS PASOS

1. **Configurar variables de entorno** con las URLs y API Keys de cada ambiente
2. **Implementar servicios faltantes** según el mapeo anterior
3. **Actualizar servicios existentes** para conectar con APIs reales
4. **Crear interfaces TypeScript** para todas las respuestas de los servicios
5. **Implementar manejo de errores** para cada servicio
6. **Agregar tests unitarios** para cada integración
7. **Validar flujos completos** con datos reales en ambiente de desarrollo

---

**Última actualización:** 16 de Enero de 2026
**Documento base:** Cumplimiento_Microservicios.pdf

