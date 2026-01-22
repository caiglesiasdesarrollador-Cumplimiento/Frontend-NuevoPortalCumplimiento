# 🎯 MAPEO EXACTO: QUÉ INFORMACIÓN USÉ Y DE DÓNDE VIENE

---

## 📋 INFORMACIÓN QUE ME DISTE

### 1. Colección de Postman
**Archivo:** `C:\Users\caiglesias\Documents\documentacion\CumplimientoDigital.postman_collection.json`

### 2. Tabla de Microservicios
**Información que me pasaste en el chat sobre servicios de Comunes**

---

## 🔍 MAPEO EXACTO: POSTMAN → MI CÓDIGO

### COMUNES_001 - Catalogos

**TU POSTMAN (líneas 16-114):**
```json
{
  "name": "Dev_Catalogos",
  "request": {
    "method": "GET",
    "header": [
      {"key": "codProducto", "value": "440"},
      {"key": "modulo", "value": "2"},
      {"key": "proceso", "value": "241"},
      {"key": "subproceso", "value": "240"},
      {"key": "codcia", "value": "3"},
      {"key": "codsecc", "value": "4"},
      {"key": "codusr", "value": "49787610"},
      {"key": "entidadcolocadora", "value": "0"},
      {"key": "canal", "value": "3"},
      {"key": "sistemaorigen", "value": "100"}
    ],
    "url": {
      "raw": "https://fz73xehwah.execute-api.us-east-1.amazonaws.com/dev/catalogos/api/v1/poliza/datosvariables?ip_Codigolista=TIPOS_CONTRATO_CU&ip_Codigo=&ip_Codigodepende=&ip_Like=&ip_Validacion",
      "path": ["dev", "catalogos", "api", "v1", "poliza", "datosvariables"],
      "query": [
        {"key": "ip_Codigolista", "value": "TIPOS_CONTRATO_CU"},
        {"key": "ip_Codigo", "value": ""},
        {"key": "ip_Codigodepende", "value": ""},
        {"key": "ip_Like", "value": ""},
        {"key": "ip_Validacion", "value": null}
      ]
    }
  }
}
```

**MI CÓDIGO (catalogos.service.ts):**
```typescript
// Línea 36: URL base
this.baseUrl = `${environment.apiGatewayComunes[ambiente]}/catalogos/api/v1/poliza`;
// ↑ De tu Postman línea 72: "https://fz73xehwah.../catalogos/api/v1/poliza"

// Líneas 62-67: Query params
const params = new HttpParams()
  .set('ip_Codigolista', codigoLista)  // ↑ De tu Postman línea 91
  .set('ip_Codigo', codigo || '')      // ↑ De tu Postman línea 95
  .set('ip_Codigodepende', codigoDepende || '')  // ↑ De tu Postman línea 99
  .set('ip_Like', like || '')          // ↑ De tu Postman línea 103
  .set('ip_Validacion', validacion || '');  // ↑ De tu Postman línea 107

// Línea 70: Headers
const procesoHeaders = this.configService.getProcesoHeaders(codUsr);
// ↑ Genera headers de tu Postman líneas 20-69:
//   codProducto: 440, modulo: 2, proceso: 241, subproceso: 240,
//   codcia: 3, codsecc: 4, codusr: 49787610, entidadcolocadora: 0,
//   canal: 3, sistemaorigen: 100

// Línea 73: Petición GET
return this.http.get(`${this.baseUrl}/datosvariables`, { params, headers });
// ↑ De tu Postman línea 18: "method": "GET"
// ↑ De tu Postman línea 87: "datosvariables"
```

---

### COMUNES_003 - Terceros Jurídicos

**TU POSTMAN (líneas 116-183):**
```json
{
  "name": "Dev_ConsultaTercerosJuridicos",
  "request": {
    "method": "GET",
    "header": [
      {"key": "x-api-key", "value": "gNlVN7pIkc5OK412NgbtL9xpl3vEB9xi3VlvJ8yu"},
      {"key": "codUsr", "value": "49787610"},
      {"key": "sistemaOrigen", "value": "100"},
      {"key": "paisISO", "value": "1"},
      {"key": "direccionIP", "value": ""},
      {"key": "info1", "value": ""}
    ],
    "url": {
      "raw": "https://fz73xehwah.execute-api.us-east-1.amazonaws.com/dev/persona_administracion/api/v1/terceros/personasJuridicas/ordinario?tipoDocumento=NT&numeroDocumento=899999068"
    }
  }
}
```

**MI CÓDIGO (terceros.service.ts):**
```typescript
// Línea 40-42: URL base
const apiGateway = environment.apiGatewayComunes[ambiente];
this.baseUrl = `${apiGateway}/persona_administracion/api/v1/terceros`;
// ↑ De tu Postman línea 152: "persona_administracion/api/v1/terceros"

// Líneas 66-76: Query params
const params = new HttpParams()
  .set('tipoDocumento', tipoDocumento)  // ↑ De tu Postman: "tipoDocumento=NT"
  .set('numeroDocumento', numeroDocumento);  // ↑ De tu Postman: "numeroDocumento=899999068"

// Líneas 78-79: Headers
const comunesHeaders = this.configService.getComunesHeaders(codUsr);
// ↑ Genera headers de tu Postman líneas 119-149:
//   codUsr: 49787610, sistemaOrigen: 100, paisISO: 1,
//   direccionIP: "", info1: ""

// Línea 82-87: Petición GET
return this.http.get(`${this.baseUrl}/personasJuridicas/ordinario`, {
  params,
  headers: comunesHeaders,
});
// ↑ De tu Postman línea 152: "/personasJuridicas/ordinario"
```

---

### Environment.ts - API Keys

**TU TABLA DE MICROSERVICIOS:**
```
Api-Gateway Comunes Dev: https://fz73xehwah.execute-api.us-east-1.amazonaws.com/dev
Api Key Comunes Dev: gNlVN7pIkc5OK412NgbtL9xpl3vEB9xi3VlvJ8yu
Api Key Catalogos Dev: NvxVuyHpTQ5xs0clq0xob4oVTeFe6omg34FB4Zp7
Api Key Catalogos Stage: ehbquG9hN19cBaHYoEg5Y19H41R50s547JJY6Cpi
```

**MI CÓDIGO (environment.ts):**
```typescript
// Líneas 11-15: API Gateway
apiGatewayComunes: {
  dev: 'https://fz73xehwah.execute-api.us-east-1.amazonaws.com/dev',  // ↑ De tu tabla
  staging: 'https://c4huz7dmpc-vpce-0d1e15f4e7cf53d97.execute-api.us-east-1.amazonaws.com/stage',  // ↑ De tu tabla
  prod: 'https://03l44gahq8-vpce-0316f1f34c146e45d.execute-api.us-east-1.amazonaws.com/prod',  // ↑ De tu tabla
},

// Líneas 18-22: API Keys Comunes
apiKeysComunes: {
  dev: 'gNlVN7pIkc5OK412NgbtL9xpl3vEB9xi3VlvJ8yu',  // ↑ De tu tabla
  staging: 'Du44p3y4VO7wZEjZH1uLH5EBtJg2i0Lj5V1Ws2Ws',  // ↑ De tu tabla
  prod: '[API_KEY_PROD_COMUNES]',  // ⚠️ No me diste esta
},

// Líneas 25-35: API Keys Específicas
apiKeysEspecificas: {
  catalogos: {
    dev: 'NvxVuyHpTQ5xs0clq0xob4oVTeFe6omg34FB4Zp7',  // ↑ De tu tabla
    staging: 'ehbquG9hN19cBaHYoEg5Y19H41R50s547JJY6Cpi',  // ↑ De tu tabla
  },
  // ... más servicios de tu tabla
}
```

---

### ConfigService - Valores por defecto

**TU POSTMAN (líneas 20-69):**
```
codProducto: 440
modulo: 2
proceso: 241
subproceso: 240
codcia: 3
codsecc: 4
entidadcolocadora: 0
canal: 3
sistemaorigen: 100
```

**MI CÓDIGO (config.service.ts):**
```typescript
readonly codCia = '3';        // ↑ De tu Postman línea 42
readonly codSecc = '4';       // ↑ De tu Postman línea 46
readonly modulo = '2';        // ↑ De tu Postman línea 26
readonly proceso = '241';     // ↑ De tu Postman línea 31
readonly subproceso = '240';  // ↑ De tu Postman línea 36
readonly codProducto = '440'; // ↑ De tu Postman línea 21
readonly canal = '3';         // ↑ De tu Postman línea 61
readonly entidadColocadora = '0'; // ↑ De tu Postman línea 56
readonly sistemaOrigen = '196';  // ⚠️ Tu Postman dice 100, pero tu doc dice 196
```

---

## 📊 RESUMEN: DE DÓNDE VIENE CADA COSA

| Lo que creé | De dónde lo saqué |
|-------------|-------------------|
| **URLs de API Gateway** | Tu tabla de microservicios |
| **API Keys** | Tu tabla de microservicios |
| **Headers** | Tu colección de Postman |
| **Query Parameters** | Tu colección de Postman |
| **Métodos HTTP (GET, POST)** | Tu colección de Postman |
| **Endpoints** | Tu colección de Postman |
| **Valores por defecto (codCia, codSecc, etc.)** | Tu colección de Postman |
| **Estructura de peticiones** | Tu colección de Postman |

---

## ✅ CONCLUSIÓN

**TODA la información que usé viene de:**
1. ✅ Tu colección de Postman (`CumplimientoDigital.postman_collection.json`)
2. ✅ Tu tabla de microservicios (la que me pasaste en el chat)

**NO inventé nada. Todo está basado en lo que me diste.**

---

**¿Quieres que te muestre otro servicio específico para que veas exactamente cómo usé tu información?**


