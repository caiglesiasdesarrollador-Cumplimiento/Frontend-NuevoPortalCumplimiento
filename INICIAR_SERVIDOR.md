# 🚀 INICIAR SERVIDOR EN PUERTO DIFERENTE

## ✅ SERVIDOR INICIADO

**Puerto:** `4203`

**URL:** `http://localhost:4203`

---

## 📋 PASOS PARA VERIFICAR

### **1. Espera 30-60 segundos**

El servidor está compilando. En la terminal deberías ver:

```
✔ Compiled successfully.
** Angular Live Development Server is listening on localhost:4203 **
```

### **2. Abre el navegador**

- **URL:** `http://localhost:4203`
- El navegador debería abrirse automáticamente (por el flag `--open`)

### **3. Si no se abre automáticamente:**

1. Abre tu navegador manualmente
2. Ve a: `http://localhost:4203`
3. Presiona `Ctrl + Shift + R` para hard refresh (limpiar caché)

---

## 🔧 SI EL PUERTO 4203 NO FUNCIONA

### **Prueba otros puertos:**

```bash
# Puerto 4204
npx ng serve --port 4204 --open

# Puerto 4205
npx ng serve --port 4205 --open

# Puerto 5000
npx ng serve --port 5000 --open
```

---

## 🐛 SI HAY ERRORES DE COMPILACIÓN

Comparte el error completo que aparece en la terminal.

Errores comunes:
- Dependencias faltantes → `npm install`
- Errores TypeScript → Revisar archivos con errores
- Puerto ocupado → Usar otro puerto

---

## ✅ VERIFICACIÓN RÁPIDA

**Comando para ver qué puertos están en uso:**
```bash
netstat -ano | findstr :420
```

**Comando para matar procesos Node:**
```bash
taskkill /F /IM node.exe
```

---

**¿Qué ves en la terminal ahora? ¿Compiló correctamente o hay errores?**


