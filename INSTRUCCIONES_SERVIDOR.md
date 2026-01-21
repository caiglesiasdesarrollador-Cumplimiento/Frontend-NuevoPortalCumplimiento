# 🚨 INSTRUCCIONES: Servidor No Inicia Localmente

## 🔍 DIAGNÓSTICO

El servidor está compilando pero **no está escuchando en el puerto 4200**.

---

## ✅ SOLUCIÓN PASO A PASO

### **PASO 1: Abre una terminal NUEVA (PowerShell o CMD)**

**NO uses la terminal donde estoy ejecutando comandos.** Abre una terminal nueva tú mismo.

### **PASO 2: Ve al proyecto**

```bash
cd C:\Users\caiglesias\Documents\bolivar-angular20-migration
```

### **PASO 3: Ejecuta el servidor**

```bash
npm start
```

### **PASO 4: ESPERA 60-90 SEGUNDOS**

Deberías ver en la terminal:

```
> bolivar-angular20-migration@1.0.0 start
> npm run config:env:dev && npm run serve

> bolivar-angular20-migration@1.0.0 config:env:dev
> npm run config:env -- --environment=dev

Wrote variables to ./src/environments/environment.ts

> bolivar-angular20-migration@1.0.0 serve
> ng serve --poll=2000

✔ Compiled successfully.
** Angular Live Development Server is listening on localhost:4200 **
```

### **PASO 5: Abre el navegador**

1. **Espera** hasta ver "Compiled successfully" y "listening on localhost:4200"
2. **Abre:** `http://localhost:4200`
3. **Hard refresh:** `Ctrl + Shift + R`

---

## 🐛 SI SIGUE SIN FUNCIONAR

### **Opción A: Ver errores en la terminal**

**Comparte el error completo** que aparece después de "Building..." o "Compiling..."

### **Opción B: Probar otro puerto**

```bash
npx ng serve --port 4207 --open
```

Luego abre: `http://localhost:4207`

### **Opción C: Verificar que no hay procesos bloqueando**

```bash
# Ver qué procesos usan el puerto 4200
netstat -ano | findstr :4200

# Matar procesos Node
taskkill /F /IM node.exe

# Intentar de nuevo
npm start
```

---

## ⚠️ IMPORTANTE

**El servidor DEBE mostrar en la terminal:**
```
** Angular Live Development Server is listening on localhost:4200 **
```

**Si NO ves esa línea, el servidor NO está corriendo.**

---

## 📝 QUÉ COMPARTIR CONMIGO

Si sigue sin funcionar, comparte:

1. **El mensaje completo** que aparece en la terminal después de ejecutar `npm start`
2. **Si ves algún error en rojo**
3. **Si la terminal se queda esperando** sin mostrar "listening on localhost"

---

**Ejecuta `npm start` en una terminal nueva y comparte qué ves.**

