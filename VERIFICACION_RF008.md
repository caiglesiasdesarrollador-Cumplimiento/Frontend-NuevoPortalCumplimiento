# 🔍 Guía de Verificación RF-008: Carga y Validación del Archivo del Contrato

## 📋 Pasos para Verificar en Local

### 1. Iniciar el Servidor
```bash
npm run serve -- --port 4201
```
**URL:** http://localhost:4201

---

## ✅ Checklist de Verificación

### **Regla 8.1: Cargar Archivo**
- [ ] **Paso:** Navega a la sección de carga de archivos del contrato
- [ ] **Verificar:** Debe aparecer el área de carga de archivos
- [ ] **Acción:** Haz clic en "Seleccionar archivo" o arrastra un archivo
- [ ] **Resultado esperado:** El archivo se selecciona correctamente

---

### **Regla 8.2.1: Validación Tipo de Archivo**

#### ✅ Prueba 1: Archivo válido (PDF, DOCX, XLSX)
- [ ] **Acción:** Intenta cargar un archivo `.pdf`, `.docx` o `.xlsx`
- [ ] **Resultado esperado:** El archivo se carga sin errores

#### ❌ Prueba 2: Archivo inválido (imagen, txt, etc.)
- [ ] **Acción:** Intenta cargar un archivo `.jpg`, `.png`, `.txt`, `.zip`
- [ ] **Resultado esperado:** 
  - Debe mostrar el mensaje exacto: **"Las extensiones soportadas son: *.DOCX, XLSX y *.PDF"**
  - El archivo NO se carga

#### 📍 Ubicación del mensaje:
- Modal de error o notificación en la parte superior de la pantalla

---

### **Regla 8.2.2: Validación Tamaño del Archivo**

#### ❌ Prueba: Archivo mayor a 30 MB
- [ ] **Acción:** Intenta cargar un archivo que pese más de 30 MB
- [ ] **Resultado esperado:**
  - Debe mostrar el mensaje exacto: **"El tamaño máximo del archivo 30 MB"**
  - El archivo NO se carga

#### ✅ Prueba: Archivo menor a 30 MB
- [ ] **Acción:** Intenta cargar un archivo que pese menos de 30 MB
- [ ] **Resultado esperado:** El archivo se carga correctamente

---

### **Regla 8.2.3: Validación Longitud del Nombre**

#### ❌ Prueba: Nombre muy largo (más de 255 caracteres)
- [ ] **Acción:** Intenta cargar un archivo cuyo nombre tenga más de 255 caracteres
- [ ] **Resultado esperado:**
  - Debe mostrar: **"La cantidad máxima de caracteres del nombre del archivo es de 255"**
  - El archivo NO se carga

#### ✅ Prueba: Nombre normal (menos de 255 caracteres)
- [ ] **Acción:** Intenta cargar un archivo con nombre normal
- [ ] **Resultado esperado:** El archivo se carga correctamente

**💡 Tip:** Para crear un archivo con nombre largo, puedes renombrar un archivo de prueba con un nombre muy extenso.

---

### **Regla 8.3: Eliminar Archivo con Confirmación**

#### ✅ Prueba: Eliminar archivo cargado
- [ ] **Paso 1:** Carga un archivo válido (PDF, DOCX o XLSX menor a 30 MB)
- [ ] **Paso 2:** Haz clic en el botón de eliminar (ícono de basura) del archivo cargado
- [ ] **Resultado esperado:**
  - Debe aparecer un modal de confirmación
  - El mensaje debe ser exactamente: **"¡Estás seguro de que quieres borrar el documento?"**
  - Debe tener botones "Cancelar" y "Eliminar"

#### ✅ Prueba: Cancelar eliminación
- [ ] **Acción:** Haz clic en "Cancelar" en el modal de confirmación
- [ ] **Resultado esperado:** 
  - El modal se cierra
  - El archivo permanece cargado

#### ✅ Prueba: Confirmar eliminación
- [ ] **Acción:** Haz clic en "Eliminar" en el modal de confirmación
- [ ] **Resultado esperado:**
  - El modal se cierra
  - El archivo se elimina
  - El área de carga vuelve a estar vacía

---

## 🎯 Ruta de Navegación Sugerida

1. **Inicia sesión** en la aplicación
2. **Navega a:** Crear nueva póliza / Ingreso de póliza
3. **Busca la sección:** "Carga de archivo del contrato" o "Documento soporte"
4. **Ubicación típica:** Paso 1 o Paso 2 del formulario de póliza

---

## 🔧 Archivos Modificados (Para Referencia)

- `src/app/containers/policy-input/policy-input.component.ts`
- `src/app/containers/policy-input/policy-input.component.html`

---

## 📝 Notas Importantes

1. **Límite de caracteres:** Actualmente configurado en **255 caracteres**. Si arquitectura define otro valor, se debe actualizar la constante `MAX_FILE_NAME_LENGTH` en el componente.

2. **Mensajes exactos:** Los mensajes deben coincidir EXACTAMENTE con los especificados en RF-008.

3. **Validaciones múltiples:** Las validaciones se ejecutan en este orden:
   - Tipo de archivo
   - Tamaño del archivo
   - Longitud del nombre

4. **Confirmación de eliminación:** Funciona tanto desde:
   - El botón personalizado de eliminar
   - La librería tech-block-lib (si se usa)

---

## ✅ Criterios de Éxito

- ✅ Todos los mensajes de error coinciden exactamente con RF-008
- ✅ Las validaciones funcionan correctamente
- ✅ El modal de confirmación aparece antes de eliminar
- ✅ El mensaje de confirmación es exacto
- ✅ No hay errores en la consola del navegador

---

## 🐛 Si Encuentras Problemas

1. **Abre la consola del navegador** (F12)
2. **Revisa errores** en la pestaña "Console"
3. **Verifica la red** en la pestaña "Network" si hay problemas de carga
4. **Revisa los logs** del servidor de desarrollo

---

**Última actualización:** 2026-01-16
**HU:** RF-008

