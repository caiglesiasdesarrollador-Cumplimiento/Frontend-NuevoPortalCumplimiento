# 🧪 PASOS PARA PROBAR EL LECTOR DE CONTRATOS (IA)

## 🚀 PASO 1: Iniciar el servidor

El servidor está iniciando en segundo plano. Espera unos segundos hasta que veas:

```
✔ Compiled successfully.
** Angular Live Development Server is listening on localhost:4201 **
```

---

## 📋 PASO 2: Abrir el navegador

1. Abre tu navegador (Chrome, Edge, Firefox)
2. Ve a: **`http://localhost:4201`**
3. Presiona **`F12`** para abrir las **DevTools**
4. Ve a la pestaña **"Console"** (Consola)

---

## 🔐 PASO 3: Hacer login fake

1. Ve a: **`http://localhost:4201/fake-login`**
2. Completa el formulario con cualquier dato
3. Haz click en **"Ingresar"**

---

## 📝 PASO 4: Ir al formulario de cotización

1. Después del login, busca el botón o enlace para **"Cotizar"** o **"Nueva Cotización"**
2. Haz click para abrir el formulario

---

## 📄 PASO 5: Cargar un archivo de contrato

### **En el Paso 1 del formulario:**

1. Busca la sección **"Carga de contrato"** o **"Documentos de soporte"**
2. Selecciona el **"Tipo de documento"**:
   - Ejemplo: `CONTRATO`, `PLIEGO`, `OFERTA MERCANTIL`, etc.
3. **Arrastra un archivo** o haz click en **"Seleccionar archivo"**
   - Puede ser un PDF, Word (.docx) o Excel (.xlsx)
   - **Importante:** El archivo puede ser cualquier archivo válido (el mock no lee el contenido real)
4. Haz click en **"Agregar Documento"** o el botón equivalente

---

## ✅ PASO 6: Verificar que la IA extrajo el valor

### **En la Consola del navegador (F12 → Console):**

**Espera 1 segundo** después de agregar el documento. Deberías ver:

```
📁 Documentos soporte: [{ tipo: "...", nombreArchivo: "...", ... }]
🤖 IA extrajo valor del contrato: 150.000.000
```

### **En el formulario:**

1. Ve al **Paso 2** (Detalles del Contrato o similar)
2. Busca el campo **"Valor del contrato"**
3. **Verifica que tiene el valor:** `150.000.000` (o `150.000.000` según formato)

---

## 🧮 PASO 7: Verificar cálculo automático de valores asegurados

### **En el Paso 2:**

1. Ve a la sección **"Coberturas Cumplimiento"**
2. **Selecciona algunas coberturas** (marca los checkboxes):
   - Ejemplo: "SERIEDAD DE LA OFERTA" (10%)
   - Ejemplo: "MANEJO DEL ANTICIPO" (50%)
   - Ejemplo: "CUMPLIMIENTO" (20%)

### **En la Consola, deberías ver:**

```
🔄 SERIEDAD DE LA OFERTA: 10% de 150.000.000 = 15.000.000
🔄 MANEJO DEL ANTICIPO: 50% de 150.000.000 = 75.000.000
🔄 CUMPLIMIENTO: 20% de 150.000.000 = 30.000.000
```

### **En el formulario:**

- Verifica que los **valores asegurados** se llenaron automáticamente:
  - SERIEDAD DE LA OFERTA: `15.000.000`
  - MANEJO DEL ANTICIPO: `75.000.000`
  - CUMPLIMIENTO: `30.000.000`

---

## ✏️ PASO 8: Probar ajuste manual del valor del contrato

### **En el Paso 2:**

1. Busca el campo **"Valor del contrato"**
2. **Modifica el valor manualmente:**
   - Cambia de `150.000.000` a `200.000.000`
3. **Presiona Tab** o haz click fuera del campo

### **En la Consola, deberías ver:**

```
💰 Valor del Contrato actualizado: 200.000.000
🔄 SERIEDAD DE LA OFERTA: 10% de 200.000.000 = 20.000.000
🔄 MANEJO DEL ANTICIPO: 50% de 200.000.000 = 100.000.000
🔄 CUMPLIMIENTO: 20% de 200.000.000 = 40.000.000
```

### **En el formulario:**

- Verifica que los **valores asegurados se recalcularon automáticamente:**
  - SERIEDAD DE LA OFERTA: `20.000.000` (antes era 15.000.000)
  - MANEJO DEL ANTICIPO: `100.000.000` (antes era 75.000.000)
  - CUMPLIMIENTO: `40.000.000` (antes era 30.000.000)

---

## ✅ CHECKLIST DE VALIDACIÓN

Marca cada punto cuando lo verifiques:

- [ ] **Servidor iniciado** - Veo `Angular Live Development Server is listening on localhost:4201`
- [ ] **Login fake funciona** - Puedo ingresar al sistema
- [ ] **Formulario de cotización se abre** - Veo el formulario con pasos
- [ ] **Puedo cargar un archivo** - El archivo se muestra después de seleccionarlo
- [ ] **IA extrae valor** - Veo en consola: `🤖 IA extrajo valor del contrato: 150.000.000`
- [ ] **Valor aparece en formulario** - El campo "Valor del contrato" tiene `150.000.000`
- [ ] **Cálculo automático funciona** - Al seleccionar coberturas, se calculan valores asegurados
- [ ] **Ajuste manual funciona** - Al cambiar valor del contrato, se recalculan las coberturas

---

## 🐛 SI ALGO NO FUNCIONA

### **El servidor no inicia:**
- Verifica que el puerto 4201 no esté ocupado
- Cierra otros procesos que usen el puerto
- Intenta con otro puerto: `npx ng serve --port 4202`

### **No veo el log de IA en consola:**
- Verifica que agregaste el documento correctamente
- Espera 1 segundo después de agregar el documento
- Verifica que la consola no tenga errores (pestaña "Console" en rojo)

### **El valor del contrato no aparece:**
- Verifica que estás en el Paso 2 del formulario
- Busca el campo "Valor del contrato" o "Valor contrato"
- Verifica en consola si hay errores

### **Los valores no se calculan:**
- Verifica que hay un valor del contrato > 0
- Verifica que las coberturas están seleccionadas (checkbox marcado)
- Verifica en consola los logs de recálculo

---

## 📸 CAPTURAS ESPERADAS

### **Consola (F12 → Console):**
```
📁 Documentos soporte: [{ tipo: "CONTRATO", nombreArchivo: "contrato.pdf", ... }]
🤖 IA extrajo valor del contrato: 150.000.000
🔄 SERIEDAD DE LA OFERTA: 10% de 150.000.000 = 15.000.000
```

### **Formulario:**
- Campo "Valor del contrato": `150.000.000`
- Tabla de coberturas con valores asegurados calculados automáticamente

---

**¿Todo funciona correctamente? Si algo no funciona, comparte el error que ves en la consola.**

