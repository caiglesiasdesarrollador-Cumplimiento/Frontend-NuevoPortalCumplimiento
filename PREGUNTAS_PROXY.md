# ❓ PREGUNTAS SOBRE EL MICROSERVICIO PROXY

## 🎯 INFORMACIÓN NECESARIA PARA ACTUALIZAR LA CONFIGURACIÓN

### **1. URLs del Microservicio Proxy**

¿Cuáles son las URLs del proxy por ambiente?

```
DEV:    https://[URL_PROXY_DEV]
STAGE:  https://[URL_PROXY_STAGE]
PROD:   https://[URL_PROXY_PROD]
```

### **2. Estructura de Paths**

¿El proxy mantiene la misma estructura de paths o cambia?

**Actual (Sin Proxy):**
```
https://fz73xehwah.execute-api.us-east-1.amazonaws.com/dev/catalogos/api/v1/poliza/datosvariables
```

**¿Nueva (Con Proxy)?**
```
Opción A: https://[URL_PROXY]/catalogos/api/v1/poliza/datosvariables
Opción B: https://[URL_PROXY]/proxy/catalogos/api/v1/poliza/datosvariables
Opción C: https://[URL_PROXY]/api/comunes/catalogos/api/v1/poliza/datosvariables
```

### **3. Headers Requeridos**

¿Qué headers requiere el proxy?

- [ ] ¿Mantiene `x-api-key`? ¿Es la misma API Key o cambia?
- [ ] ¿Mantiene los headers `X-Proceso-*`?
- [ ] ¿Requiere algún header nuevo? (ej: `X-Proxy-Key`, `X-Service-Name`)

### **4. Servicios que Maneja**

¿El proxy maneja todos los servicios de Comunes?

- [ ] Catalogos
- [ ] Terceros (Jurídicos/Naturales)
- [ ] SARLAFT
- [ ] Multiclaves
- [ ] Recuperar Agente
- [ ] Notificador
- [ ] Generar PDF Cotización RC
- [ ] Generar PDF Póliza
- [ ] Generar QR

### **5. Autenticación**

¿El proxy requiere autenticación adicional?

- [ ] ¿Bearer Token?
- [ ] ¿API Key específica del proxy?
- [ ] ¿Otro método?

---

## 🔧 CAMBIOS NECESARIOS EN EL CÓDIGO

Una vez que tengas la información del proxy, necesito actualizar:

1. **`environment.ts`**: Agregar URLs del proxy
2. **Servicios de Comunes**: Cambiar `baseUrl` para usar proxy
3. **`ApiKeyInterceptor`**: Actualizar detección de URLs
4. **Validar que los interceptores funcionen correctamente**

---

**Por favor, comparte la información del proxy para actualizar la configuración.**


