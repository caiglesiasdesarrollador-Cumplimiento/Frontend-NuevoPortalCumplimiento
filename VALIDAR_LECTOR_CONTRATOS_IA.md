# 🤖 VALIDAR LECTOR DE CONTRATOS (IA) LOCALMENTE

## 🚀 SERVIDOR INICIADO

El servidor Angular está corriendo en:
- **URL:** `http://localhost:4201`
- **Puerto:** 4201

---

## 📋 PASOS PARA VALIDAR EL LECTOR DE CONTRATOS

### **Paso 1: Abrir el navegador**
1. Abre: `http://localhost:4201`
2. Presiona `F12` para abrir DevTools
3. Ve a la pestaña **Console** (Consola)
4. Ve a la pestaña **Network** (Red) - opcional para ver peticiones

### **Paso 2: Ir al formulario de cotización**
1. Haz login fake: `http://localhost:4201/fake-login`
2. Completa el formulario y haz login
3. Ve al formulario de cotización/emisión

### **Paso 3: Cargar un archivo de contrato**

#### **En el Paso 1 del formulario:**
1. Busca la sección **"Carga de contrato"**
2. Selecciona **"Tipo de documento"** (ej: CONTRATO, PLIEGO, OFERTA MERCANTIL)
3. **Arrastra o selecciona** un archivo PDF, Word o Excel
4. Haz click en **"Agregar Documento"**

### **Paso 4: Verificar que la IA simula la extracción**

#### **En la Consola del navegador, deberías ver:**

```
📁 Documentos soporte: [...]
🤖 IA extrajo valor del contrato: 150.000.000
🔄 SERIEDAD DE LA OFERTA: 10% de 150.000.000 = 15.000.000
🔄 MANEJO DEL ANTICIPO: 50% de 150.000.000 = 75.000.000
...
```

#### **En el formulario:**
1. Ve al **Paso 2** (Detalles del Contrato)
2. Verifica que el campo **"Valor del contrato"** tiene el valor: `150.000.000`
3. Esto fue extraído automáticamente por la IA (mock)

### **Paso 5: Verificar cálculo automático de valores asegurados**

#### **En el Paso 2:**
1. Ve a la sección **"Coberturas Cumplimiento"**
2. **Selecciona algunas coberturas** (checkbox)
3. **Verifica que los valores asegurados se calculan automáticamente:**
   - Si seleccionas "SERIEDAD DE LA OFERTA" (10%) → Valor asegurado = 15.000.000
   - Si seleccionas "MANEJO DEL ANTICIPO" (50%) → Valor asegurado = 75.000.000
   - Si seleccionas "CUMPLIMIENTO" (20%) → Valor asegurado = 30.000.000

#### **En la Consola, deberías ver:**
```
🔄 SERIEDAD DE LA OFERTA: 10% de 150.000.000 = 15.000.000
🔄 MANEJO DEL ANTICIPO: 50% de 150.000.000 = 75.000.000
🔄 CUMPLIMIENTO: 20% de 150.000.000 = 30.000.000
```

### **Paso 6: Verificar ajuste manual**

#### **Si la IA no extrajo el valor correctamente:**
1. Ve al **Paso 2** → Campo **"Valor del contrato"**
2. **Modifica manualmente** el valor (ej: cambiar a 200.000.000)
3. **Presiona Tab** o haz click fuera del campo
4. **Verifica que se recalculan automáticamente** los valores asegurados de las coberturas seleccionadas

#### **En la Consola, deberías ver:**
```
💰 Valor del Contrato actualizado: 200.000.000
🔄 SERIEDAD DE LA OFERTA: 10% de 200.000.000 = 20.000.000
🔄 MANEJO DEL ANTICIPO: 50% de 200.000.000 = 100.000.000
...
```

---

## ✅ CHECKLIST DE VALIDACIÓN

### **Funcionalidad del Lector de Contratos:**

- [ ] **Carga de archivo funciona:**
  - [ ] Se puede seleccionar tipo de documento
  - [ ] Se puede arrastrar/seleccionar archivo PDF/Word/Excel
  - [ ] El archivo se muestra después de cargar

- [ ] **Mock de IA funciona:**
  - [ ] Después de cargar archivo, aparece en consola: `🤖 IA extrajo valor del contrato`
  - [ ] El valor del contrato se llena automáticamente en el Paso 2
  - [ ] El valor por defecto es 150.000.000 (mock)

- [ ] **Cálculo automático funciona:**
  - [ ] Al seleccionar coberturas, se calculan valores asegurados
  - [ ] Fórmula: `valorAsegurado = (valorContrato * porcentaje) / 100`
  - [ ] Los valores se actualizan en tiempo real

- [ ] **Ajuste manual funciona:**
  - [ ] Se puede modificar el valor del contrato manualmente
  - [ ] Al cambiar el valor, se recalculan automáticamente las coberturas seleccionadas
  - [ ] Los valores se actualizan correctamente

- [ ] **Coberturas inician en $0:**
  - [ ] Todas las coberturas Cumplimiento tienen `valorAsegurado: 0` inicialmente
  - [ ] Solo se calculan cuando se seleccionan Y hay valor del contrato

---

## 🔍 QUÉ VERIFICAR EN LA CONSOLA

### **Logs esperados:**

1. **Al cargar archivo:**
```
📁 Documentos soporte: [{ tipo: "CONTRATO", nombreArchivo: "...", ... }]
```

2. **Simulación de IA (1 segundo después):**
```
🤖 IA extrajo valor del contrato: 150.000.000
```

3. **Al seleccionar cobertura:**
```
🔄 SERIEDAD DE LA OFERTA: 10% de 150.000.000 = 15.000.000
```

4. **Al modificar valor del contrato manualmente:**
```
💰 Valor del Contrato actualizado: 200.000.000
🔄 SERIEDAD DE LA OFERTA: 10% de 200.000.000 = 20.000.000
```

---

## 🐛 SI ALGO NO FUNCIONA

### **El archivo no se carga:**
- Verificar que el tipo de archivo es PDF, Word o Excel
- Verificar que el tamaño es ≤ 30 MB
- Verificar en Console si hay errores

### **La IA no extrae el valor:**
- Verificar en Console si aparece el log `🤖 IA extrajo valor del contrato`
- Verificar que el archivo se cargó correctamente
- El mock se ejecuta 1 segundo después de cargar el archivo

### **Los valores no se calculan:**
- Verificar que hay un valor del contrato > 0
- Verificar que las coberturas están seleccionadas
- Verificar en Console los logs de recálculo

---

## 📝 NOTAS IMPORTANTES

1. **Mock de IA:** Actualmente simula extracción después de 1 segundo
2. **Valor por defecto:** 150.000.000 (mock)
3. **Cálculo automático:** Solo funciona para coberturas seleccionadas
4. **Ajuste manual:** El usuario puede modificar el valor del contrato en cualquier momento

---

**¿Todo funciona correctamente? ¿Hay algo que no funciona como esperabas?**


