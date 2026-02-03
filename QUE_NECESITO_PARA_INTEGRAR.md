# 🎯 QUÉ NECESITO PARA INTEGRAR CADA MICROSERVICIO CON EL FRONTEND

## 📋 RESUMEN EJECUTIVO

Para iniciar la integración de cada microservicio con el frontend, necesito **información específica del documento Google Sheets** que mencionaste. Sin esta información, **no puedo avanzar** porque cada servicio requiere URLs y API Keys diferentes por ambiente.

---

## 🔴 INFORMACIÓN CRÍTICA REQUERIDA (DEL GOOGLE SHEETS)

### 1️⃣ SERVICIOS DE COMUNES (API Gateway HTTP Proxy)

**¿Qué necesito?**
- **URLs del API Gateway HTTP Proxy** para DEV, STG y PROD
- **API Keys** (`x-api-key`) para DEV, STG y PROD

**¿Por qué lo necesito?**
- Según el PDF, todos los servicios de Comunes (Catálogos, Terceros, SARLAFT, Notificador, Impresión) están detrás del API Gateway HTTP Proxy
- Sin la URL base, no puedo construir los endpoints completos
- Sin la API Key, todas las peticiones fallarán con 403 Forbidden

**Ejemplo de lo que necesito:**
```
DEV:    https://[ID_API_GATEWAY_DEV].execute-api.[REGION].amazonaws.com/[STAGE]
STG:    https://[ID_API_GATEWAY_STG].execute-api.[REGION].amazonaws.com/[STAGE]
PROD:   https://[ID_API_GATEWAY_PROD].execute-api.[REGION].amazonaws.com/[STAGE]

API Keys:
DEV:    [API_KEY_DEV_COMUNES]
STG:    [API_KEY_STG_COMUNES]
PROD:   [API_KEY_PROD_COMUNES]
```

**¿Qué puedo hacer mientras tanto?**
- ✅ Crear el `SessionService` para obtener datos de sesión
- ✅ Crear el interceptor `CumplimientoHeadersInterceptor` para headers `X-Proceso-*`
- ✅ Crear interfaces TypeScript para las respuestas
- ❌ **NO puedo conectar con las APIs reales** sin las URLs y API Keys

---

### 2️⃣ SERVICIOS DE CUMPLIMIENTO

**¿Qué necesito?**
- **URLs base** de los microservicios de Cumplimiento para DEV, STG y PROD
- **API Keys** (`x-api-key`) para DEV, STG y PROD

**¿Por qué lo necesito?**
- Según el PDF, hay 3 microservicios:
  - `cumplimientodigital-negocios-ms`
  - `cumplimientodigital-comunes-ms`
  - `cumplimientodigital-emision-ms`
- Cada uno puede tener una URL diferente o estar en el mismo dominio con diferentes paths
- Sin las URLs, no sé dónde hacer las peticiones

**Ejemplo de lo que necesito:**
```
DEV:    https://[URL_CUMPLIMIENTO_DEV]/api/v1
STG:    https://[URL_CUMPLIMIENTO_STG]/api/v1
PROD:   https://[URL_CUMPLIMIENTO_PROD]/api/v1

API Keys:
DEV:    [API_KEY_DEV_CUMPLIMIENTO]
STG:    [API_KEY_STG_CUMPLIMIENTO]
PROD:   [API_KEY_PROD_CUMPLIMIENTO]
```

**¿Qué puedo hacer mientras tanto?**
- ✅ Crear los servicios TypeScript con la estructura de interfaces
- ✅ Preparar los métodos con los parámetros correctos según el PDF
- ❌ **NO puedo hacer peticiones reales** sin las URLs y API Keys

---

### 3️⃣ SERVICIOS GCP (Google Cloud Platform)

**¿Qué necesito?**
- **URLs del API Gateway HTTP Proxy GCP** para DEV, STG y PROD
- **Access Tokens** (`access_token`) para DEV, STG y PROD
- **Límites de tamaño de archivo** para el Lector de Contratos y Estados Financieros

**¿Por qué lo necesito?**
- Según el PDF, el token por defecto es `Actuaria2024*`, pero necesito confirmar si es el mismo para todos los ambientes
- Los servicios GCP manejan archivos (PDFs, Excel), necesito saber el límite máximo para validar antes de subir
- Sin la URL del API Gateway, no puedo construir los endpoints

**Ejemplo de lo que necesito:**
```
DEV:    https://[URL_API_GATEWAY_GCP_DEV]
STG:    https://[URL_API_GATEWAY_GCP_STG]
PROD:   https://[URL_API_GATEWAY_GCP_PROD]

Access Tokens:
DEV:    Actuaria2024* (¿confirmar?)
STG:    [TOKEN_STG_GCP]
PROD:   [TOKEN_PROD_GCP]

Límites de archivo:
- Lector de Contratos: ¿MB máximo?
- Estados Financieros: ¿MB máximo?
```

**¿Qué puedo hacer mientras tanto?**
- ✅ Crear los servicios con FormData para multipart/form-data
- ✅ Preparar la validación de tipos de archivo (PDF, Excel)
- ❌ **NO puedo validar límites de tamaño** sin esa información
- ❌ **NO puedo hacer peticiones reales** sin las URLs y tokens

---

### 4️⃣ SERVICIOS AWS ACTUARÍA

**¿Qué necesito?**
- **URLs del API Gateway HTTP Proxy AWS** para DEV, STG y PROD
- **API Keys** (`x-api-key`) para DEV, STG y PROD
- **User Keys** (`x-user-key`) para DEV, STG y PROD

**¿Por qué lo necesito?**
- Según el PDF, requiere **ambos headers**: `x-api-key` y `x-user-key`
- El servicio usa GraphQL, necesito la URL del endpoint GraphQL
- Sin ambos headers, la petición fallará

**Ejemplo de lo que necesito:**
```
DEV:    https://[URL_API_GATEWAY_AWS_DEV]
STG:    https://[URL_API_GATEWAY_AWS_STG]
PROD:   https://[URL_API_GATEWAY_AWS_PROD]

API Keys:
DEV:    x-api-key: [API_KEY_AWS_DEV], x-user-key: [USER_KEY_AWS_DEV]
STG:    x-api-key: [API_KEY_AWS_STG], x-user-key: [USER_KEY_AWS_STG]
PROD:   x-api-key: [API_KEY_AWS_PROD], x-user-key: [USER_KEY_AWS_PROD]
```

**¿Qué puedo hacer mientras tanto?**
- ✅ Decidir si usar Apollo Client o HTTP POST directo para GraphQL
- ✅ Crear las queries GraphQL según el PDF
- ❌ **NO puedo hacer peticiones reales** sin las URLs y ambos keys

---

### 5️⃣ SERVICIOS OPENL

**¿Qué necesito?**
- **URLs base** del API OpenL para DEV, STG y PROD
- **API Keys** (`x-api-key`) para DEV, STG y PROD

**¿Por qué lo necesito?**
- Según el PDF, está en el repositorio `reglas-negocio-negocios-patrimoniales-ms`
- Necesito la URL base donde está desplegado
- Sin la API Key, las peticiones fallarán

**Ejemplo de lo que necesito:**
```
DEV:    https://[URL_OPENL_DEV]
STG:    https://[URL_OPENL_STG]
PROD:   https://[URL_OPENL_PROD]

API Keys:
DEV:    [API_KEY_OPENL_DEV]
STG:    [API_KEY_OPENL_STG]
PROD:   [API_KEY_OPENL_PROD]
```

**¿Qué puedo hacer mientras tanto?**
- ✅ Crear los servicios con mapeo de respuestas (`0`/`1` a booleanos)
- ✅ Preparar las interfaces según el PDF
- ❌ **NO puedo hacer peticiones reales** sin las URLs y API Keys

---

### 6️⃣ SERVICIOS MONGO (Emisión)

**¿Qué necesito?**
- **URLs base** del API de Emisión para DEV, STG y PROD
- **API Keys** (`x-api-key`) para DEV, STG y PROD
- **Validación de estructura de datos** que espera el backend

**¿Por qué lo necesito?**
- Según el PDF, está en `cumplimientodigital-emision-ms`
- El PDF muestra estructura compleja con `datosNegocio.formPaso1` y `datosNegocio.formPaso2`
- Necesito confirmar que la estructura que envío coincide con la esperada

**Ejemplo de lo que necesito:**
```
DEV:    https://[URL_EMISION_DEV]/api/v1
STG:    https://[URL_EMISION_STG]/api/v1
PROD:   https://[URL_EMISION_PROD]/api/v1

API Keys:
DEV:    [API_KEY_EMISION_DEV]
STG:    [API_KEY_EMISION_STG]
PROD:   [API_KEY_EMISION_PROD]
```

**¿Qué puedo hacer mientras tanto?**
- ✅ Crear las interfaces TypeScript según el PDF
- ✅ Preparar los métodos CRUD (crear, leer, actualizar, eliminar negocios)
- ❌ **NO puedo validar la estructura** sin confirmación del backend
- ❌ **NO puedo hacer peticiones reales** sin las URLs y API Keys

---

## 🛠️ LO QUE PUEDO HACER AHORA (SIN LA INFORMACIÓN DEL GOOGLE SHEETS)

### ✅ Fase 1: Infraestructura Base (Puedo hacerlo ahora)

1. **Crear `SessionService`** (`src/app/shared/services/session.service.ts`)
   - Leer datos de `sessionStorage` con clave `fakeLoginSession`
   - Proporcionar métodos para obtener: `numeroDocumento`, `tipoDocumento`, `claveIntermediario`, `tipoUsuario`, etc.
   - **Fundamento:** Centraliza acceso a datos de sesión, evita duplicación de código

2. **Crear `ConfigService`** (`src/app/shared/services/config.service.ts`)
   - Valores por defecto: `codCia: '3'`, `codSecc: '4'`, `sistemaOrigen: '196'`, `pais: '1'`, `canal: '3'`, `entidadColocadora: '0'`
   - **Fundamento:** Evita hardcodear valores en múltiples lugares

3. **Crear `CumplimientoHeadersInterceptor`** (`src/app/shared/interceptors/cumplimiento-headers.interceptor.ts`)
   - Agregar automáticamente headers `X-Proceso-*` a todas las peticiones de Cumplimiento
   - Usar `SessionService` y `ConfigService` para construir los headers
   - **Fundamento:** Evita repetir código de headers en cada servicio

4. **Crear interfaces TypeScript** para todas las respuestas según el PDF
   - **Fundamento:** Type safety, autocompletado, validación en tiempo de compilación

5. **Actualizar `environment.ts`** con estructura para URLs y API Keys (valores placeholder)
   - **Fundamento:** Preparar la estructura para cuando tengamos los valores reales

---

## ❌ LO QUE NO PUEDO HACER SIN LA INFORMACIÓN DEL GOOGLE SHEETS

1. **Conectar con APIs reales** - Necesito las URLs
2. **Agregar API Keys reales** - Necesito las keys de cada ambiente
3. **Validar límites de archivo** - Necesito los límites de GCP
4. **Probar peticiones reales** - Sin URLs y keys, todas fallarán
5. **Configurar interceptores con keys reales** - Necesito las keys

---

## 📝 PREGUNTAS ESPECÍFICAS PARA TI

1. **¿Tienes acceso al documento Google Sheets?**
   - Si sí, ¿puedes compartir las URLs y API Keys?
   - Si no, ¿quién tiene acceso y puedo contactarlo?

2. **¿Las API Keys son las mismas para todos los servicios dentro de un mismo ambiente?**
   - Ejemplo: ¿La API Key de Comunes es la misma para Catálogos, Terceros, SARLAFT?

3. **¿Los tokens de GCP (`Actuaria2024*`) son los mismos en todos los ambientes o cambian?**

4. **¿Hay límites de tamaño de archivo para los servicios GCP?**
   - Lector de Contratos: ¿MB máximo?
   - Estados Financieros: ¿MB máximo?

5. **¿Prefieres que empiece con la infraestructura base (SessionService, interceptores, interfaces) mientras obtienes las URLs y API Keys?**

---

## 🚀 PLAN DE ACCIÓN SUGERIDO

### Opción A: Empezar con Infraestructura Base (Recomendado)
1. Creo `SessionService`, `ConfigService`, `CumplimientoHeadersInterceptor`
2. Creo todas las interfaces TypeScript
3. Actualizo `environment.ts` con estructura (valores placeholder)
4. **Mientras tanto, tú obtienes las URLs y API Keys del Google Sheets**
5. Cuando tengas la información, actualizo los valores reales y conecto las APIs

### Opción B: Esperar a tener toda la información
1. Obtienes todas las URLs y API Keys del Google Sheets
2. Creo toda la infraestructura base + conecto directamente con las APIs reales
3. Pruebo todo de una vez

**Mi recomendación:** Opción A, porque puedo avanzar con la infraestructura base mientras obtienes la información crítica.

---

**Última actualización:** 16 de Enero de 2026
**Documento relacionado:** `REQUERIMIENTOS_INTEGRACION_MICROSERVICIOS.md`, `MAPEO_INTEGRACION_BACKEND_FRONTEND_COMPLETO.md`


