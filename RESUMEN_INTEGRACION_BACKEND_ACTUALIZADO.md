# 📋 RESUMEN ACTUALIZADO: INFRAESTRUCTURA BASE PARA INTEGRACIÓN BACKEND

**Última actualización:** 16 de Enero de 2026  
**Fuente:** Documentación de microservicios + Colección de Postman

---

## ✅ LO QUE TENEMOS (COMPLETADO)

### 1. **SessionService** ✅
- Lee datos de `sessionStorage` con clave `fakeLoginSession`
- Métodos para obtener información del usuario logueado

### 2. **ConfigService** ✅
- Valores por defecto del sistema
- Métodos helper para construir headers

### 3. **Environment Files Actualizados** ✅

#### **Dev (Completo):**
- ✅ API Gateway Comunes: `https://fz73xehwah.execute-api.us-east-1.amazonaws.com/dev`
- ✅ API Gateway Comunes Stage: `https://c4huz7dmpc-vpce-0d1e15f4e7cf53d97.execute-api.us-east-1.amazonaws.com/stage`
- ✅ API Gateway Comunes Prod: `https://03l44gahq8-vpce-0316f1f34c146e45d.execute-api.us-east-1.amazonaws.com/prod`
- ✅ API Keys Comunes (Dev/Stage): Configuradas
- ✅ API Keys Específicas por Servicio (Dev/Stage): Configuradas
- ✅ GCP Cloud Run (Dev/Stage): Configuradas
- ✅ GCP Access Tokens (Dev/Stage): Configuradas

#### **Stage (Completo):**
- ✅ API Gateway Comunes: Configurado
- ✅ API Keys Comunes: Configurado
- ✅ API Keys Específicas: Configuradas
- ✅ GCP Cloud Run: Configurado
- ✅ GCP Access Token: Configurado

#### **Prod (Parcial):**
- ✅ API Gateway Comunes: Configurado
- ⚠️ API Keys: Pendientes (algunas configuradas, otras pendientes)

### 4. **Interceptores HTTP** ✅
- `CumplimientoHeadersInterceptor`: Headers de proceso
- `ApiKeyInterceptor`: API Keys automáticas
- `GCPAccessTokenInterceptor`: Access tokens GCP
- Registrados en `app.module.ts`

---

## 📊 API KEYS ESPECÍFICAS POR SERVICIO (COMUNES)

**IMPORTANTE:** No todos los servicios de Comunes usan la misma API Key. Cada servicio tiene su propia API Key:

| Servicio | Dev | Stage | Prod |
|----------|-----|-------|------|
| **Comunes Principal** | `gNlVN7pIkc5OK412NgbtL9xpl3vEB9xi3VlvJ8yu` | `Du44p3y4VO7wZEjZH1uLH5EBtJg2i0Lj5V1Ws2Ws` | Pendiente |
| **Catalogos** | `NvxVuyHpTQ5xs0clq0xob4oVTeFe6omg34FB4Zp7` | `ehbquG9hN19cBaHYoEg5Y19H41R50s547JJY6Cpi` | Pendiente |
| **Multiclaves** | `QRfcnqdvG09jrlT7FuBxz5UFrCPTUqdn3QOyIRUq` | `DokfT0xwu293outcx9G8o7zxQepOSgg38PI52iF4` | Pendiente |
| **Recuperar Agente** | `kjenaXRJDT9jY0fCB8pNo3753jrRPnH07wvad69K` | `b5EW1Ilf215yPfRk86dzI3PM77x01AU49TppJ83R` | Pendiente |
| **Notificador** | `1KN83VVMjx9l7fQIATjnR6RtvJbc4xxm284tuda8` | `79OQhRxsUe63HzAGVz9VG8sPkgVn1GJi58pjcTOA` | Pendiente |
| **Generar PDF Cotización RC** | `tbhznwROdEv0NYl0wcmfTSsFOJ2xnr5y4insRi50` | `thxjPoo5x03WcHbtNceSS49VbjHkxxOQ979QkVKN` | `c3WzrQsykb1yYDmwzyOFK6GUC5S0DFDB9wk8d13T` ✅ |
| **Generar PDF Póliza** | `F0LeMCd5r57WVIKtKkF1K0ZBPRYYQF4aJaLi9VLa` | `WursDuwv9Z10ae9yRiDGmxJYq4ZjIx73FUfcMno3` | Pendiente |
| **Generar QR PDF** | `29aLqSMIBl5DuJXxdt9yX9r5PrxzNuhFR4kIzFn3` | `vvaduJRpkc85IB3MbGNo86IrfD9ssuRHa4UTgV8S` | `nAxa3CQwml4k0AUIkorlE6zXt4SXlpJx48pgGL7l` ✅ |

---

## ❌ LO QUE FALTA

### 1. **API Keys de Prod** ⚠️
- ❌ API Keys de Prod para la mayoría de servicios (solo tenemos algunas)
- **Fuente:** Documentación de microservicios

### 2. **URLs y API Keys de Cumplimiento Digital** ❌
- ❌ URLs de API Gateway para Dev, Stage y Prod
- ❌ API Keys para Dev, Stage y Prod
- **Nota:** Los servicios de Cumplimiento Digital no están en la tabla proporcionada

### 3. **URLs y API Keys de GCP (HTTP Proxy)** ❌
- ❌ URLs de Stage y Prod
- ❌ API Keys de Stage y Prod

### 4. **URLs y API Keys de AWS Actuaría** ❌
- ❌ URLs de Stage y Prod
- ❌ API Keys de Stage y Prod

### 5. **URLs y API Keys de OpenL** ❌
- ❌ URLs de Stage y Prod
- ❌ API Keys de Stage y Prod

### 6. **Servicios TypeScript para Cada Microservicio** ❌

#### **Servicios de Comunes (12 servicios):**
- ❌ `CatalogosService`: COMUNES_001 - Core Catalogos
- ❌ `TercerosConsultableService`: COMUNES_002 - Tercero consultable
- ❌ `TercerosJuridicosService`: COMUNES_003 - Consultar Terceros Jurídico
- ❌ `TercerosNaturalesService`: COMUNES_004 - Consulta Terceros Naturales
- ❌ `SarlaftMarcaService`: COMUNES_005 - Sarlaft Obtener Marca
- ❌ `SarlaftGenerarUrlService`: COMUNES_006 - Sarlaft Generar Url
- ❌ `MulticlavesService`: COMUNES_007 - Multiclaves
- ❌ `RecuperarAgenteService`: COMUNES_008 - Recuperar Agente
- ❌ `NotificadorService`: COMUNES_009 - Notificador Transversal
- ❌ `GenerarPdfCotizacionRCService`: COMUNES_010 - Generar PDF Cotización RC
- ❌ `GenerarPdfPolizaService`: COMUNES_011 - Generar PDF Póliza
- ❌ `GenerarQRService`: COMUNES_012 - Generar QR PDF

#### **Servicios de Cumplimiento Digital:**
- ❌ Servicios Mongo (Consulta, Insertar, Actualizar, Eliminar)
- ❌ Servicios de Negocios (Programas GB, Sucursales, Coberturas, etc.)
- ❌ Servicios de Emisión

#### **Servicios GCP:**
- ❌ `GCPLectorContratosService`: Lector de contratos
- ❌ `GCPLectorEstadosFinancierosService`: Lector de estados financieros

#### **Servicios AWS Actuaría:**
- ❌ `AWSActuariaIngenieroDigitalService`: Ingeniero Digital (GraphQL)

#### **Servicios OpenL:**
- ❌ `OpenLService`: Reglas de negocio

### 7. **Interfaces TypeScript** ❌
- ❌ Interfaces para todas las respuestas de los servicios
- ❌ Interfaces para parámetros de entrada

### 8. **Actualizar ApiKeyInterceptor** ⚠️
- ⚠️ El interceptor actual usa una API Key genérica
- ⚠️ Necesita usar API Keys específicas según el servicio
- **Solución:** Modificar `ApiKeyInterceptor` para detectar el servicio y usar la API Key correcta

### 9. **Manejo de Errores Específico** ❌
- ❌ `ErrorHandlerService`: Manejo centralizado de errores
- ❌ Manejo de errores específicos por servicio

### 10. **Configuración Dinámica de Ambiente** ❌
- ❌ Lógica para determinar automáticamente qué ambiente usar
- ❌ Actualizar interceptores para usar ambiente dinámico

### 11. **Tests Unitarios** ❌
- ❌ Tests para `SessionService`
- ❌ Tests para `ConfigService`
- ❌ Tests para interceptores

---

## 🔧 ACCIONES INMEDIATAS REQUERIDAS

### 1. **Actualizar ApiKeyInterceptor** 🔴 PRIORITARIO
El interceptor actual no maneja las API Keys específicas por servicio. Necesita:
- Detectar qué servicio se está llamando (por URL)
- Usar la API Key correcta según el servicio
- Acceder a `environment.apiKeysEspecificas.[servicio]`

### 2. **Crear Servicios TypeScript Base** 🔴 PRIORITARIO
Empezar con los servicios de Comunes más usados:
- `CatalogosService`
- `TercerosJuridicosService`
- `TercerosNaturalesService`
- `SarlaftMarcaService`

### 3. **Obtener URLs y API Keys Faltantes** 🟡 IMPORTANTE
- URLs y API Keys de Cumplimiento Digital
- URLs y API Keys de GCP (HTTP Proxy) Stage/Prod
- URLs y API Keys de AWS Actuaría Stage/Prod
- URLs y API Keys de OpenL Stage/Prod
- API Keys de Prod para servicios de Comunes

---

## 📝 NOTAS IMPORTANTES

1. **API Keys diferentes por servicio:** Cada servicio de Comunes tiene su propia API Key. El interceptor debe detectar el servicio y usar la API Key correcta.

2. **Estructura de environment:** Se agregó `apiKeysEspecificas` para manejar las diferentes API Keys por servicio.

3. **GCP tiene dos formas de acceso:**
   - HTTP Proxy (API Gateway): Usa `x-api-key`
   - Directo (Cloud Run): Usa `access_token`

4. **Headers de proceso:** Solo se agregan a servicios de Cumplimiento que los requieren.

5. **GraphQL para AWS Actuaría:** El servicio de Ingeniero Digital usa GraphQL, no REST.

---

## 🎯 PRÓXIMOS PASOS SUGERIDOS

### Paso 1: Actualizar ApiKeyInterceptor (URGENTE)
1. Modificar `ApiKeyInterceptor` para detectar servicio por URL
2. Usar API Key específica según el servicio
3. Probar con servicios de Comunes

### Paso 2: Crear Servicios TypeScript Base
1. Crear `CatalogosService` con método `obtenerCatalogo()`
2. Crear `TercerosJuridicosService` con método `consultarTerceroJuridico()`
3. Crear `TercerosNaturalesService` con método `consultarTerceroNatural()`
4. Crear `SarlaftMarcaService` con método `obtenerMarca()`

### Paso 3: Obtener Información Faltante
1. Solicitar URLs y API Keys de Cumplimiento Digital
2. Solicitar URLs y API Keys de GCP, AWS Actuaría, OpenL para Stage/Prod
3. Solicitar API Keys de Prod para servicios de Comunes

---

**Estado General:** ✅ Infraestructura base completa | ⚠️ Configuración parcial | ❌ Servicios pendientes


