# 🚀 CÓMO EJECUTAR EL SERVIDOR

## ✅ OPCIÓN 1: Script Batch (MÁS FÁCIL)

**Doble click en:** `EJECUTAR_SERVIDOR.bat`

Este script:
1. Limpia procesos Node anteriores
2. Configura el entorno
3. Inicia el servidor en puerto 4200
4. Te muestra la URL cuando esté listo

---

## ✅ OPCIÓN 2: Manualmente en PowerShell

```powershell
cd C:\Users\caiglesias\Documents\bolivar-angular20-migration
taskkill /F /IM node.exe
npm start
```

**Espera 60-90 segundos** hasta ver:
```
✔ Compiled successfully.
** Angular Live Development Server is listening on localhost:4200 **
```

Luego abre: `http://localhost:4200`

---

## ✅ OPCIÓN 3: Con puerto específico

```powershell
cd C:\Users\caiglesias\Documents\bolivar-angular20-migration
taskkill /F /IM node.exe
npx ng serve --port 4207 --open
```

Luego abre: `http://localhost:4207`

---

## 🔍 VERIFICAR QUE ESTÁ CORRIENDO

Después de 60-90 segundos, ejecuta:

```powershell
netstat -ano | findstr :4200
```

Si ves algo como:
```
TCP    0.0.0.0:4200    0.0.0.0:0    LISTENING    12345
```

**El servidor está corriendo.** Abre `http://localhost:4200`

---

## 🐛 SI NO FUNCIONA

1. **Mata todos los procesos Node:**
   ```powershell
   taskkill /F /IM node.exe
   ```

2. **Limpia caché de Angular:**
   ```powershell
   cd C:\Users\caiglesias\Documents\bolivar-angular20-migration
   Remove-Item -Recurse -Force .angular -ErrorAction SilentlyContinue
   ```

3. **Intenta de nuevo:**
   ```powershell
   npm start
   ```

---

**Ejecuta el script `EJECUTAR_SERVIDOR.bat` o `npm start` y comparte qué ves en la terminal.**

