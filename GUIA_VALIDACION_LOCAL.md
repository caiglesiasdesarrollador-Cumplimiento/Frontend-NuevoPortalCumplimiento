# 🧪 GUÍA RÁPIDA: VALIDAR SERVICIOS COMUNES LOCALMENTE

## 🎯 PASOS RÁPIDOS

### **1. Iniciar el servidor Angular**
```bash
cd C:\Users\caiglesias\Documents\bolivar-angular20-migration
npx ng serve --port 4201
```

### **2. Abrir el navegador**
- URL: `http://localhost:4201`
- Abrir DevTools: `F12`
- Ir a pestaña **Network** (Red)

### **3. Hacer login fake**
- Ir a: `http://localhost:4201/fake-login`
- Llenar datos y hacer login
- Esto guarda datos en `sessionStorage`

### **4. Ejecutar una acción que llame a Comunes**

#### **Ejemplo 1: Consultar Catálogo**
1. En el formulario, seleccionar un campo que use catálogo (ej: Departamento)
2. En Network, buscar petición a `datosvariables` o `catalogos`
3. Click en la petición → Ver:
   - **Request URL:** ¿Es correcta?
   - **Request Headers:** ¿Tiene `x-api-key`?
   - **Response:** ¿Qué devuelve?

#### **Ejemplo 2: Consultar Tercero**
1. Buscar un tomador o asegurado
2. En Network, buscar petición a `terceros` o `personasJuridicas`
3. Verificar headers y respuesta

### **5. Verificar en Console**
- Abrir pestaña **Console** en DevTools
- Buscar logs que empiecen con:
  - `🔍 [CatalogosService]`
  - `📤 [TercerosService]`
  - `🔑 [ApiKeyInterceptor]`

---

## 🔍 QUÉ VERIFICAR

### **✅ Headers Correctos:**
```
x-api-key: [API_KEY_CORRECTA]
codProducto: 440
modulo: 2
proceso: 241
subproceso: 240
codcia: 3
codsecc: 4
codusr: [CÓDIGO_USUARIO]
...
```

### **✅ URL Correcta:**
```
https://fz73xehwah.execute-api.us-east-1.amazonaws.com/dev/catalogos/api/v1/poliza/datosvariables?ip_Codigolista=...
```

### **✅ Respuesta Exitosa:**
- Status: `200 OK`
- Response body con datos del catálogo

### **❌ Si hay Error:**
- Status: `403 Forbidden` → API Key incorrecta
- Status: `401 Unauthorized` → Falta autenticación
- Status: `400 Bad Request` → Parámetros incorrectos
- Status: `500 Internal Server Error` → Error del servidor

---

## 📋 SERVICIOS PARA VALIDAR

1. **Catalogos** (`CatalogosService`)
   - Acción: Seleccionar departamento/ciudad
   - URL esperada: `/catalogos/api/v1/poliza/datosvariables`

2. **Terceros** (`TercerosService`)
   - Acción: Buscar tomador/asegurado
   - URL esperada: `/persona_administracion/api/v1/terceros/...`

3. **SARLAFT** (`SarlaftService`)
   - Acción: Validar marca SARLAFT
   - URL esperada: `/personas_sarlaft/api/v1/...`

4. **Multiclaves** (`MulticlavesService`)
   - Acción: Consultar clave intermediario
   - URL esperada: `/recursos_humanos/api/v1/terceros/multiclaves`

---

## ⚠️ SOBRE EL PROXY

Si ahora hay un **microservicio proxy intermedio**, necesito saber:

1. **URL del proxy:**
   - Dev: `https://[URL_PROXY_DEV]`
   - Stage: `https://[URL_PROXY_STAGE]`
   - Prod: `https://[URL_PROXY_PROD]`

2. **¿Mantiene la misma estructura de paths?**
   - Actual: `/catalogos/api/v1/poliza/datosvariables`
   - Nueva: ¿`/catalogos/api/v1/poliza/datosvariables` o cambia?

3. **¿Requiere headers adicionales?**
   - ¿Mantiene `x-api-key`?
   - ¿Requiere algún header nuevo?

---

**¿Tienes la información del proxy para actualizar la configuración?**

