# 🔧 SOLUCIÓN: Servidor No Inicia

## 🚨 PROBLEMA

El servidor Angular no inicia y aparece el error:
```
ERR_CONNECTION_REFUSED
localhost rechazó la conexión
```

---

## ✅ SOLUCIONES PASO A PASO

### **Solución 1: Usar el script correcto del proyecto**

El proyecto tiene un script `start` que configura el entorno antes de iniciar:

```bash
cd C:\Users\caiglesias\Documents\bolivar-angular20-migration
npm start
```

Este comando:
1. Ejecuta `config:env:dev` (configura el entorno de desarrollo)
2. Ejecuta `ng serve --poll=2000` (inicia el servidor)

**Espera 30-60 segundos** hasta que veas:
```
✔ Compiled successfully.
** Angular Live Development Server is listening on localhost:4200 **
```

**Nota:** El script `start` usa el puerto **4200** por defecto, no 4201.

---

### **Solución 2: Verificar que no haya otro proceso usando el puerto**

Si el puerto está ocupado, puedes:

1. **Usar otro puerto:**
```bash
npx ng serve --port 4202
```

2. **O matar el proceso que usa el puerto:**
```bash
# Ver qué proceso usa el puerto 4200
netstat -ano | findstr :4200

# Matar el proceso (reemplaza PID con el número que aparezca)
taskkill /PID [PID] /F
```

---

### **Solución 3: Verificar dependencias**

Si hay errores de compilación, reinstala las dependencias:

```bash
cd C:\Users\caiglesias\Documents\bolivar-angular20-migration
npm install
```

Luego intenta de nuevo:
```bash
npm start
```

---

### **Solución 4: Limpiar caché y reinstalar**

Si nada funciona, limpia todo y reinstala:

```bash
cd C:\Users\caiglesias\Documents\bolivar-angular20-migration

# Limpiar caché de npm
npm cache clean --force

# Eliminar node_modules y package-lock.json
rmdir /s /q node_modules
del package-lock.json

# Reinstalar dependencias
npm install

# Iniciar servidor
npm start
```

---

## 🔍 VERIFICAR QUE EL SERVIDOR ESTÁ CORRIENDO

### **En la terminal deberías ver:**

```
> bolivar-angular20-migration@1.0.0 start
> npm run config:env:dev && npm run serve

> bolivar-angular20-migration@1.0.0 config:env:dev
> ts-node ./src/app/core/setenv.config.ts --environment=dev

> bolivar-angular20-migration@1.0.0 serve
> ng serve --poll=2000

✔ Browser application bundle generation complete.
✔ Compiled successfully.

** Angular Live Development Server is listening on localhost:4200 **
```

### **En el navegador:**

1. Ve a: **`http://localhost:4200`** (nota: puerto 4200, no 4201)
2. Deberías ver la aplicación Angular

---

## 📝 NOTA IMPORTANTE SOBRE EL PUERTO

- **Script `npm start`:** Usa puerto **4200** (configuración por defecto)
- **Comando `ng serve --port 4201`:** Usa puerto **4201** (personalizado)

**Recomendación:** Usa `npm start` que es el script oficial del proyecto.

---

## 🐛 SI SIGUE SIN FUNCIONAR

Comparte el **error completo** que aparece en la terminal cuando ejecutas `npm start`. Los errores comunes son:

1. **Error de compilación TypeScript:** Archivos con errores de sintaxis
2. **Dependencias faltantes:** `npm install` no se ejecutó correctamente
3. **Puerto ocupado:** Otro proceso está usando el puerto
4. **Problemas de permisos:** Windows bloquea el acceso al puerto

---

**¿Qué error específico ves en la terminal cuando ejecutas `npm start`?**

