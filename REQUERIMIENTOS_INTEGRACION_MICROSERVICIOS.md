# 📋 REQUERIMIENTOS TÉCNICOS PARA INTEGRACIÓN DE MICROSERVICIOS

## 🎯 OBJETIVO
Documentar los requerimientos técnicos específicos y fundamentados para integrar cada microservicio del backend con el frontend.

---

## 📊 ANÁLISIS DE ESTADO ACTUAL

### ✅ Lo que YA tenemos:
1. **AuthInterceptor** configurado para agregar `Bearer Token` automáticamente
2. **Fake Login** que guarda datos en `sessionStorage` con clave `fakeLoginSession`
3. **Servicios mock** preparados con estructura de interfaces TypeScript
4. **Environment files** básicos (dev, staging, prod) pero sin URLs configuradas

### ❌ Lo que FALTA:
1. **Servicio centralizado de sesión** para obtener datos del usuario logueado
2. **URLs de APIs** en los archivos de environment
3. **API Keys** por ambiente
4. **Interceptores HTTP personalizados** para headers específicos de cada microservicio
5. **Manejo de errores** específico por tipo de servicio

---

## 🔴 REQUERIMIENTOS POR TIPO DE SERVICIO

### 1️⃣ SERVICIOS DE COMUNES (API Gateway HTTP Proxy)

#### 📍 Información Necesaria:

**1.1 URLs del API Gateway por ambiente:**
```
DEV:    https://[ID_API_GATEWAY_DEV].execute-api.[REGION].amazonaws.com/[STAGE]
STG:    https://[ID_API_GATEWAY_STG].execute-api.[REGION].amazonaws.com/[STAGE]
PROD:   https://[ID_API_GATEWAY_PROD].execute-api.[REGION].amazonaws.com/[STAGE]
```

**Fundamento técnico:** 
- Según el documento PDF, estos servicios están en el API Gateway HTTP Proxy de AWS
- Las URLs deben venir del documento Google Sheets mencionado: `https://docs.google.com/spreadsheets/d/1w9LEYVtQuM8BQZSRia6rk5FgNSzwGR1QbG4tNmRUUhM/edit`
- Cada servicio tiene un endpoint específico dentro del API Gateway

**1.2 API Keys por ambiente:**
```
DEV:    [API_KEY_DEV_COMUNES]
STG:    [API_KEY_STG_COMUNES]
PROD:   [API_KEY_PROD_COMUNES]
```

**Fundamento técnico:**
- Todos los servicios de Comunes requieren header `x-api-key` (obligatorio según PDF)
- Las API Keys deben estar en el documento Google Sheets mencionado
- Sin esta key, todas las peticiones fallarán con 403 Forbidden

**1.3 Datos de sesión del usuario:**
```typescript
interface ISessionData {
  numeroDocumento: string;        // Del fake-login: userName
  tipoDocumento: string;          // Del fake-login: employeeType
  claveIntermediario: string;     // Del fake-login: workForceId
  tipoUsuario: 'A' | 'E';         // 'A' = Agente, 'E' = Empleado
  codigoCompania: string;         // Del fake-login: company (default: '3')
  codigoSeccion: string;          // Default: '4' (Cumplimiento)
  codigoProducto: string;         // Del formulario: '440', '450', '455', '214'
  sistemaOrigen: string;           // Default: '196' (Cumplimiento Digital)
  pais: string;                   // Default: '1' (Colombia)
  canal: string;                  // Default: '3' (WEB SERVICE)
  entidadColocadora: string;      // Default: '0' (Seguros Bolívar)
}
```

**Fundamento técnico:**
- Los servicios de Comunes requieren múltiples headers `X-Proceso-*` según el PDF
- Estos datos deben venir de la sesión del usuario o tener valores por defecto
- Actualmente el fake-login guarda en `sessionStorage` pero no hay servicio centralizado para accederlos

**1.4 Servicio de Sesión (NUEVO - Requerido):**
```typescript
// Crear: src/app/shared/services/session.service.ts
@Injectable({ providedIn: 'root' })
export class SessionService {
  getUsuarioEnSesion(): ISessionData { }
  getNumeroDocumentoUsuario(): string { }
  getClaveIntermediario(): string { }
  getTipoUsuario(): 'A' | 'E' { }
  getProductoActual(): string { }
}
```

**Fundamento técnico:**
- Evita duplicación de código para obtener datos de sesión
- Centraliza la lógica de lectura de `sessionStorage`
- Facilita testing y mantenimiento

---

### 2️⃣ SERVICIOS DE CUMPLIMIENTO

#### 📍 Información Necesaria:

**2.1 URL Base del API de Cumplimiento:**
```
DEV:    https://[URL_API_CUMPLIMIENTO_DEV]/api/v1
STG:    https://[URL_API_CUMPLIMIENTO_STG]/api/v1
PROD:   https://[URL_API_CUMPLIMIENTO_PROD]/api/v1
```

**Fundamento técnico:**
- Según el PDF, estos servicios están en repositorios GitHub específicos:
  - `cumplimientodigital-negocios-ms`
  - `cumplimientodigital-comunes-ms`
  - `cumplimientodigital-emision-ms`
- Necesitamos la URL base donde están desplegados estos microservicios

**2.2 API Key de Cumplimiento:**
```
DEV:    [API_KEY_DEV_CUMPLIMIENTO]
STG:    [API_KEY_STG_CUMPLIMIENTO]
PROD:   [API_KEY_PROD_CUMPLIMIENTO]
```

**Fundamento técnico:**
- Todos los servicios requieren header `x-api-key` según el PDF
- Debe estar en el documento Google Sheets

**2.3 Headers X-Proceso-* (Igual que Comunes):**
- Mismos datos de sesión que en punto 1.3
- Todos los servicios requieren estos headers según el PDF

**2.4 Interceptor HTTP Personalizado (NUEVO - Requerido):**
```typescript
// Crear: src/app/shared/interceptors/cumplimiento-headers.interceptor.ts
@Injectable()
export class CumplimientoHeadersInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Agregar automáticamente headers X-Proceso-* si la URL es de Cumplimiento
    if (req.url.includes('/api/v1/')) {
      const headers = this.buildCumplimientoHeaders();
      req = req.clone({ setHeaders: headers });
    }
    return next.handle(req);
  }
}
```

**Fundamento técnico:**
- Evita repetir código de headers en cada servicio
- Centraliza la lógica de construcción de headers `X-Proceso-*`
- Facilita mantenimiento si cambian los headers requeridos

---

### 3️⃣ SERVICIOS GCP (Google Cloud Platform)

#### 📍 Información Necesaria:

**3.1 URL del API Gateway HTTP Proxy GCP:**
```
DEV:    https://[URL_API_GATEWAY_GCP_DEV]
STG:    https://[URL_API_GATEWAY_GCP_STG]
PROD:   https://[URL_API_GATEWAY_GCP_PROD]
```

**Fundamento técnico:**
- Según el PDF, estos servicios están en GCP y tienen API Gateway HTTP Proxy
- Las URLs deben estar en el documento Google Sheets

**3.2 Access Token de GCP:**
```
DEV:    Actuaria2024*  (según PDF, este es el token por defecto)
STG:    [TOKEN_STG_GCP]
PROD:   [TOKEN_PROD_GCP]
```

**Fundamento técnico:**
- El PDF indica que el header `access_token` es `Actuaria2024*`
- Necesitamos confirmar si este token es el mismo para todos los ambientes o si cambia

**3.3 Configuración de FormData:**
- Los servicios GCP requieren `multipart/form-data` para archivos
- Necesitamos validar límites de tamaño de archivo:
  - Lector de Contratos: ¿Límite de tamaño?
  - Estados Financieros: ¿Límite de tamaño?

**Fundamento técnico:**
- Evitar errores de timeout o rechazo por archivos muy grandes
- Mejorar UX mostrando límites antes de subir

---

### 4️⃣ SERVICIOS AWS ACTUARÍA

#### 📍 Información Necesaria:

**4.1 URL del API Gateway HTTP Proxy AWS:**
```
DEV:    https://[URL_API_GATEWAY_AWS_DEV]
STG:    https://[URL_API_GATEWAY_AWS_STG]
PROD:   https://[URL_API_GATEWAY_AWS_PROD]
```

**Fundamento técnico:**
- Según el PDF, el servicio está en AWS y tiene API Gateway HTTP Proxy
- URL debe estar en el documento Google Sheets

**4.2 API Key y User Key de AWS:**
```
DEV:    x-api-key: [API_KEY_AWS_DEV], x-user-key: [USER_KEY_AWS_DEV]
STG:    x-api-key: [API_KEY_AWS_STG], x-user-key: [USER_KEY_AWS_STG]
PROD:   x-api-key: [API_KEY_AWS_PROD], x-user-key: [USER_KEY_AWS_PROD]
```

**Fundamento técnico:**
- El PDF indica que requiere ambos headers: `x-api-key` y `x-user-key`
- Sin estos headers, la petición GraphQL fallará

**4.3 Configuración de GraphQL:**
- El servicio usa GraphQL, no REST
- Necesitamos validar si hay algún cliente GraphQL configurado o si usamos HTTP POST directo

**Fundamento técnico:**
- GraphQL requiere estructura diferente a REST
- Necesitamos decidir si usar librería (Apollo Client) o HTTP POST directo

---

### 5️⃣ SERVICIOS OPENL

#### 📍 Información Necesaria:

**5.1 URL Base del API OpenL:**
```
DEV:    https://[URL_OPENL_DEV]
STG:    https://[URL_OPENL_STG]
PROD:   https://[URL_OPENL_PROD]
```

**Fundamento técnico:**
- Según el PDF, estos servicios están en repositorio `reglas-negocio-negocios-patrimoniales-ms`
- Necesitamos la URL base donde están desplegados

**5.2 API Key de OpenL:**
```
DEV:    [API_KEY_OPENL_DEV]
STG:    [API_KEY_OPENL_STG]
PROD:   [API_KEY_OPENL_PROD]
```

**Fundamento técnico:**
- Todos los servicios requieren header `x-api-key` según el PDF

**5.3 Validación de Respuestas:**
- Los servicios retornan `0` o `1` (no objetos JSON complejos)
- Necesitamos mapear estas respuestas a booleanos

**Fundamento técnico:**
- Simplifica el código del frontend
- Facilita el manejo de errores

---

### 6️⃣ SERVICIOS MONGO

#### 📍 Información Necesaria:

**6.1 URL Base del API de Emisión (Mongo):**
```
DEV:    https://[URL_EMISION_DEV]/api/v1
STG:    https://[URL_EMISION_STG]/api/v1
PROD:   https://[URL_EMISION_PROD]/api/v1
```

**Fundamento técnico:**
- Según el PDF, estos servicios están en `cumplimientodigital-emision-ms`
- Necesitamos la URL base donde está desplegado

**6.2 API Key de Emisión:**
```
DEV:    [API_KEY_EMISION_DEV]
STG:    [API_KEY_EMISION_STG]
PROD:   [API_KEY_EMISION_PROD]
```

**Fundamento técnico:**
- Requiere header `x-api-key` según el PDF

**6.3 Estructura de Datos Mongo:**
- Necesitamos validar que la estructura del objeto que enviamos coincide con la esperada por el backend
- El PDF muestra estructura compleja con `datosNegocio.formPaso1` y `datosNegocio.formPaso2`

**Fundamento técnico:**
- Evitar errores de validación en el backend
- Asegurar que todos los campos requeridos están presentes

---

## 🛠️ COMPONENTES TÉCNICOS A CREAR

### 1. Servicio de Sesión (`session.service.ts`)
**Prioridad:** ALTA
**Fundamento:** Centraliza acceso a datos de sesión, evita duplicación

### 2. Interceptor de Headers Cumplimiento (`cumplimiento-headers.interceptor.ts`)
**Prioridad:** ALTA
**Fundamento:** Agrega automáticamente headers `X-Proceso-*` a todas las peticiones de Cumplimiento

### 3. Servicio de Configuración (`config.service.ts`)
**Prioridad:** MEDIA
**Fundamento:** Centraliza valores por defecto (codCia, codSecc, sistemaOrigen, etc.)

### 4. Servicio de Manejo de Errores (`error-handler.service.ts`)
**Prioridad:** MEDIA
**Fundamento:** Maneja errores específicos por tipo de servicio y muestra mensajes apropiados

### 5. Interfaces TypeScript para todas las respuestas
**Prioridad:** ALTA
**Fundamento:** Type safety, autocompletado, validación en tiempo de compilación

---

## 📝 CHECKLIST DE INFORMACIÓN REQUERIDA

### ✅ Información del Documento Google Sheets:
- [ ] URLs del API Gateway HTTP Proxy Comunes (DEV, STG, PROD)
- [ ] API Keys de Comunes (DEV, STG, PROD)
- [ ] URLs del API Gateway HTTP Proxy GCP (DEV, STG, PROD)
- [ ] Tokens de acceso GCP (DEV, STG, PROD)
- [ ] URLs del API Gateway HTTP Proxy AWS (DEV, STG, PROD)
- [ ] API Keys y User Keys de AWS (DEV, STG, PROD)
- [ ] URLs del API de Cumplimiento (DEV, STG, PROD)
- [ ] API Keys de Cumplimiento (DEV, STG, PROD)
- [ ] URLs del API OpenL (DEV, STG, PROD)
- [ ] API Keys de OpenL (DEV, STG, PROD)
- [ ] URLs del API de Emisión/Mongo (DEV, STG, PROD)
- [ ] API Keys de Emisión (DEV, STG, PROD)

### ✅ Información Técnica Adicional:
- [ ] Límites de tamaño de archivo para servicios GCP
- [ ] Timeouts recomendados por servicio
- [ ] Estrategia de retry para servicios críticos
- [ ] Configuración de CORS (si aplica)
- [ ] Validación de estructura de datos Mongo

---

## 🚀 PLAN DE IMPLEMENTACIÓN SUGERIDO

### Fase 1: Infraestructura Base (Semana 1)
1. Crear `SessionService` para acceso centralizado a datos de sesión
2. Crear `ConfigService` para valores por defecto
3. Actualizar `environment.ts` con todas las URLs y API Keys
4. Crear interfaces TypeScript para respuestas principales

### Fase 2: Interceptores HTTP (Semana 1-2)
1. Crear `CumplimientoHeadersInterceptor` para headers `X-Proceso-*`
2. Crear `ApiKeyInterceptor` para agregar `x-api-key` automáticamente
3. Actualizar `AuthInterceptor` si es necesario

### Fase 3: Servicios de Comunes (Semana 2)
1. Implementar servicios de Comunes uno por uno
2. Conectar con API Gateway HTTP Proxy
3. Validar respuestas y manejo de errores

### Fase 4: Servicios de Cumplimiento (Semana 2-3)
1. Implementar servicios de Cumplimiento
2. Validar headers `X-Proceso-*`
3. Probar flujos completos

### Fase 5: Servicios GCP, AWS, OpenL (Semana 3-4)
1. Implementar servicios GCP (Lector de Contratos, Estados Financieros)
2. Implementar servicio AWS (Ingeniero Digital)
3. Implementar servicios OpenL (Validaciones)

### Fase 6: Servicios Mongo (Semana 4)
1. Implementar CRUD completo de negocios
2. Validar estructura de datos
3. Probar persistencia y recuperación

---

## ❓ PREGUNTAS PENDIENTES PARA EL EQUIPO BACKEND

1. **¿Las API Keys son las mismas para todos los servicios dentro de un mismo ambiente?**
   - Ejemplo: ¿La API Key de Comunes es la misma para Catálogos, Terceros, SARLAFT?

2. **¿Los tokens de GCP (`Actuaria2024*`) son los mismos en todos los ambientes o cambian?**

3. **¿Hay límites de tamaño de archivo para los servicios GCP?**
   - Lector de Contratos: ¿MB máximo?
   - Estados Financieros: ¿MB máximo?

4. **¿Los servicios de Cumplimiento requieren autenticación adicional además de `x-api-key`?**
   - ¿Necesitan Bearer Token además de los headers `X-Proceso-*`?

5. **¿El servicio de Mongo requiere algún header adicional además de `x-api-key`?**

6. **¿Hay algún rate limiting configurado en los APIs?**
   - ¿Cuántas peticiones por segundo/minuto podemos hacer?

7. **¿Los servicios retornan errores en formato estándar?**
   - ¿Estructura de error es consistente entre servicios?

---

**Última actualización:** 16 de Enero de 2026
**Documento relacionado:** `MAPEO_INTEGRACION_BACKEND_FRONTEND_COMPLETO.md`

