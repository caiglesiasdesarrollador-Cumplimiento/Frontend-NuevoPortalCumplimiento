# 🔍 CÓMO VALIDAR LOS SERVICIOS DE COMUNES LOCALMENTE

## 📋 ESTRUCTURA ACTUAL

### ✅ Configuración Actual (Sin Proxy Intermedio)
```
Frontend → API Gateway Comunes → Microservicios Comunes
```

**URLs actuales:**
- **Dev:** `https://fz73xehwah.execute-api.us-east-1.amazonaws.com/dev`
- **Stage:** `https://c4huz7dmpc-vpce-0d1e15f4e7cf53d97.execute-api.us-east-1.amazonaws.com/stage`
- **Prod:** `https://03l44gahq8-vpce-0316f1f34c146e45d.execute-api.us-east-1.amazonaws.com/prod`

### ⚠️ Nueva Estructura (Con Proxy Intermedio)
```
Frontend → Microservicio Proxy → API Gateway Comunes → Microservicios Comunes
```

**¿Qué cambia?**
- La URL base ya no es directamente el API Gateway
- Ahora hay un microservicio proxy intermedio
- El proxy maneja el routing a los diferentes servicios de Comunes

---

## 🔧 CÓMO VALIDAR LOCALMENTE DESDE EL FRONTEND

### **1. Usar DevTools del Navegador (Chrome/Edge)**

#### **Paso 1: Abrir DevTools**
- Presiona `F12` o `Ctrl + Shift + I`
- Ve a la pestaña **Network** (Red)

#### **Paso 2: Filtrar peticiones**
- En el filtro, escribe: `execute-api` o `catalogos` o `terceros`
- Esto mostrará solo las peticiones a los servicios de Comunes

#### **Paso 3: Ejecutar una acción en el frontend**
Ejemplos:
- Seleccionar un departamento/ciudad (llama a Catalogos)
- Buscar un tercero (llama a Terceros)
- Consultar SARLAFT (llama a SARLAFT)

#### **Paso 4: Revisar la petición**
1. **Click en la petición** → Verás:
   - **Request URL:** URL completa que se está llamando
   - **Request Headers:** Headers enviados (incluyendo `x-api-key`)
   - **Request Payload:** Datos enviados (si es POST/PUT)
   - **Response:** Respuesta del servidor

2. **Verificar:**
   - ✅ ¿La URL es correcta?
   - ✅ ¿El header `x-api-key` está presente?
   - ✅ ¿Los headers `X-Proceso-*` están presentes?
   - ✅ ¿La respuesta es exitosa (200) o hay error?

---

### **2. Usar Console.log en el Código**

#### **Ejemplo: Validar CatalogosService**

```typescript
// En catalogos.service.ts
obtenerCatalogo(codigoLista: string, ...): Observable<ICatalogoResponse> {
  const codUsr = this.sessionService.getCodUsr();
  
  // ✅ LOG: Verificar datos antes de la petición
  console.log('🔍 [CatalogosService] Datos de petición:', {
    codigoLista,
    codUsr,
    baseUrl: this.baseUrl,
    ambiente: environment.production ? 'prod' : 'dev'
  });
  
  const params = new HttpParams()...;
  const procesoHeaders = this.configService.getProcesoHeaders(codUsr);
  
  // ✅ LOG: Verificar headers
  console.log('📤 [CatalogosService] Headers:', procesoHeaders);
  console.log('📤 [CatalogosService] Params:', params.toString());
  console.log('📤 [CatalogosService] URL completa:', `${this.baseUrl}/datosvariables?${params.toString()}`);
  
  return this.http.get<ICatalogoResponse>(`${this.baseUrl}/datosvariables`, {
    params,
    headers: procesoHeaders,
  }).pipe(
    tap(response => {
      // ✅ LOG: Verificar respuesta
      console.log('✅ [CatalogosService] Respuesta exitosa:', response);
    }),
    catchError(error => {
      // ✅ LOG: Verificar error
      console.error('❌ [CatalogosService] Error:', {
        status: error.status,
        statusText: error.statusText,
        message: error.message,
        error: error.error
      });
      return throwError(() => error);
    })
  );
}
```

---

### **3. Usar Interceptor para Logging**

Ya tenemos `ApiKeyInterceptor` - podemos agregar logging:

```typescript
// En api-key.interceptor.ts
intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  const apiKey = this.getApiKeyForUrl(request.url);
  
  // ✅ LOG: Ver qué API Key se está usando
  if (apiKey) {
    console.log('🔑 [ApiKeyInterceptor] Agregando API Key:', {
      url: request.url,
      apiKey: apiKey.substring(0, 10) + '...', // Solo primeros 10 caracteres por seguridad
      servicio: this.detectarServicio(request.url)
    });
  }
  
  // ... resto del código
}
```

---

### **4. Validar con Postman/Thunder Client**

#### **Opción A: Usar Postman**
1. Abre Postman
2. Importa la colección: `CumplimientoDigital.postman_collection.json`
3. Compara las peticiones de Postman con las del frontend:
   - Misma URL
   - Mismos headers
   - Mismos parámetros

#### **Opción B: Usar Thunder Client (VS Code)**
1. Instala extensión "Thunder Client" en VS Code
2. Crea una nueva petición
3. Copia la URL y headers del DevTools
4. Ejecuta y compara resultados

---

### **5. Validar Estructura de URLs**

#### **URL Actual (Sin Proxy):**
```
https://fz73xehwah.execute-api.us-east-1.amazonaws.com/dev/catalogos/api/v1/poliza/datosvariables
```

#### **URL Nueva (Con Proxy):**
```
https://[URL_PROXY]/catalogos/api/v1/poliza/datosvariables
```

**¿Qué necesito saber?**
- ¿Cuál es la URL base del microservicio proxy?
- ¿El proxy mantiene la misma estructura de paths?
- ¿El proxy requiere headers adicionales?

---

## 🧪 CHECKLIST DE VALIDACIÓN LOCAL

### **Antes de probar:**
- [ ] Servidor Angular corriendo (`ng serve --port 4201`)
- [ ] Fake Login completado (datos en `sessionStorage`)
- [ ] DevTools abierto (pestaña Network)

### **Al ejecutar una acción:**
- [ ] Verificar que la petición aparece en Network
- [ ] Verificar URL completa
- [ ] Verificar headers (`x-api-key`, `X-Proceso-*`)
- [ ] Verificar parámetros (query params o body)
- [ ] Verificar respuesta (status 200, 400, 500, etc.)

### **Si hay error:**
- [ ] Verificar mensaje de error en Console
- [ ] Verificar status code en Network
- [ ] Verificar respuesta del servidor (pestaña Response)
- [ ] Comparar con Postman (¿funciona en Postman?)

---

## 📝 PREGUNTAS PARA CLARIFICAR EL PROXY

1. **¿Cuál es la URL base del microservicio proxy?**
   - Dev: `https://[URL_PROXY_DEV]`
   - Stage: `https://[URL_PROXY_STAGE]`
   - Prod: `https://[URL_PROXY_PROD]`

2. **¿El proxy mantiene la misma estructura de paths?**
   - Ejemplo: `/catalogos/api/v1/poliza/datosvariables`
   - ¿O cambia a algo como `/proxy/catalogos/...`?

3. **¿El proxy requiere headers adicionales?**
   - ¿Mantiene `x-api-key`?
   - ¿Requiere algún header nuevo?

4. **¿El proxy maneja todos los servicios de Comunes?**
   - Catalogos
   - Terceros
   - SARLAFT
   - Multiclaves
   - Notificador
   - Generar PDF
   - Generar QR

---

## 🚀 PRÓXIMOS PASOS

Una vez que tengas la información del proxy:
1. Actualizar `environment.ts` con URLs del proxy
2. Actualizar servicios para usar URLs del proxy
3. Validar que los interceptores funcionan correctamente
4. Probar cada servicio desde el frontend local

---

**¿Tienes la URL del microservicio proxy para actualizar la configuración?**

