# 📚 Cómo Funcionan las Funcionalidades de las HUs Desarrolladas

## 🎯 Resumen General

Se desarrollaron **3 Historias de Usuario (HUs)** con funcionalidades completas:

- ✅ **RF-005**: Identificación y Validación del Tomador y Asegurado (6 reglas)
- ✅ **RF-007**: Validaciones Específicas de Cupo y Condiciones Programas 440 (4 reglas)
- ✅ **RF-008**: Carga y Validación del Archivo del Contrato

---

## 🔍 RF-005: Identificación y Validación del Tomador y Asegurado

### **¿Cuándo se Activan las Validaciones?**

Las validaciones se ejecutan automáticamente en estos momentos:

1. **Al cambiar el tipo de producto** (`onTipoProductoChange`)
2. **Después de buscar el tomador** (`buscarNombreTomador`)
3. **Después de buscar el asegurado** (`buscarNombreAsegurado`)

---

### **Regla 5.3: Validación Producto vs Tipo Cliente**

**¿Qué hace?**
- Valida que el producto seleccionado corresponda al tipo de cliente (tomador)

**¿Cuándo se ejecuta?**
- Al cambiar el tipo de producto
- Después de encontrar el tomador

**¿Cómo funciona?**
1. Detecta si el tomador es una **entidad jurídica pública** (NIT que empieza con 8)
2. Si es entidad pública, verifica que el producto sea **"455 - Cumplimiento Entidades Oficiales"**
3. Si NO coincide → Muestra modal bloqueante:
   ```
   "EL PRODUCTO SELECCIONADO NO CORRESPONDE A LA ENTIDAD QUE ESTÁS SELECCIONANDO COMO TOMADOR/AFIANZADO."
   ```
4. Bloquea el avance hasta que se corrija

**Ejemplo:**
- Usuario selecciona producto "450" (Cumplimiento General)
- Busca tomador con NIT que empieza en 8 (entidad pública)
- ❌ **Modal de error aparece** → Debe cambiar a producto "455"

---

### **Regla 5.4: Validación Combinación de Clientes**

**¿Qué hace?**
- Valida que Tomador y Asegurado NO sean ambos "Natural" para productos 450 y 455

**¿Cuándo se ejecuta?**
- Al cambiar el tipo de producto
- Después de encontrar el asegurado

**¿Cómo funciona?**
1. Verifica si el producto es **450** o **455**
2. Verifica si tanto tomador como asegurado son tipo **"Natural"**
3. Si ambos son naturales → Muestra modal bloqueante:
   ```
   "LA COMBINACIÓN DE CLIENTES NO ES VÁLIDA PARA ESTE PRODUCTO."
   ```
4. Bloquea el avance hasta que se corrija

**Ejemplo:**
- Usuario selecciona producto "450"
- Busca tomador: Juan Pérez (Natural)
- Busca asegurado: María García (Natural)
- ❌ **Modal de error aparece** → Al menos uno debe ser Jurídico

---

### **Regla 5.5: Cliente Consultable (Restringido)**

**¿Qué hace?**
- Valida si el cliente está en lista de restringidos (no puede hacer negocios)

**¿Cuándo se ejecuta?**
- Después de buscar el tomador
- Después de buscar el asegurado

**¿Cómo funciona?**
1. Consulta al servicio `ClienteValidacionService.validarClienteConsultable()`
2. Si el cliente está restringido → Muestra modal con opciones:
   ```
   "CLIENTE RESTRINGIDO"
   - Botón "Marcar al #773" (llama al 773)
   - Botón "Ir al WhatsApp" (abre WhatsApp)
   ```
3. Bloquea el avance hasta que se resuelva

**Ejemplo:**
- Usuario busca tomador con documento `1111111111`
- ❌ **Modal aparece** → Cliente está restringido, debe contactar al 773

---

### **Regla 5.6: Reputación Negativa**

**¿Qué hace?**
- Valida si el cliente tiene reputación negativa (historial de problemas)

**¿Cuándo se ejecuta?**
- Después de buscar el tomador
- Después de buscar el asegurado

**¿Cómo funciona?**
1. Consulta al servicio `ClienteValidacionService.validarReputacionNegativa()`
2. Si tiene reputación negativa → Muestra modal con opciones:
   ```
   "REPUTACIÓN NEGATIVA"
   - Botón "Marcar al #773" (llama al 773)
   - Botón "Ir al WhatsApp" (abre WhatsApp)
   ```
3. Bloquea el avance hasta que se resuelva

**Ejemplo:**
- Usuario busca tomador con documento `3333333333`
- ❌ **Modal aparece** → Cliente tiene reputación negativa

---

### **Regla 5.7: Consorcio/Uniones Temporales**

**¿Qué hace?**
- Valida si el cliente pertenece a consorcio, unión temporal o grupo empresarial

**¿Cuándo se ejecuta?**
- Después de buscar el tomador

**¿Cómo funciona?**
1. Consulta al servicio `ClienteValidacionService.validarConsorcioUnionTemporal()`
2. Si pertenece a consorcio/uniones temporales → Muestra modal informativo
3. Si pertenece a **grupo empresarial** → Actualiza el cupo disponible automáticamente
4. El cupo del grupo se muestra en lugar del cupo individual

**Ejemplo:**
- Usuario busca tomador con documento `4444444444`
- ✅ **Modal informativo aparece**
- ✅ **Cupo disponible se actualiza** al cupo del grupo empresarial (ej: 2 mil millones)

---

### **Regla 5.10: Cliente Enfoque - NITs Autorizados**

**¿Qué hace?**
- Valida si el NIT del tomador está autorizado para el intermediario actual

**¿Cuándo se ejecuta?**
- Después de buscar el tomador
- Solo aplica para intermediarios y clientes tipo "Enfoque"

**¿Cómo funciona?**
1. Consulta al servicio `ClienteEnfoqueService.validarNitAutorizado()`
2. Si el NIT NO está autorizado → Muestra modal bloqueante:
   ```
   "EL NIT DEL TOMADOR NO ESTÁ AUTORIZADO PARA ESTE INTERMEDIARIO."
   ```
3. Bloquea el avance hasta que se corrija

**Ejemplo:**
- Usuario intermediario "INT001" busca tomador con NIT `999999999`
- ❌ **Modal aparece** → NIT no autorizado para este intermediario

---

## 💰 RF-007: Validaciones Específicas de Cupo y Condiciones Programas 440

### **Regla 7.1: Cálculo y Visualización de Cupo Disponible**

**¿Qué hace?**
- Calcula y muestra el cupo disponible del cliente para expedir negocios

**¿Cuándo se ejecuta?**
- Automáticamente después de buscar el tomador
- Después de cargar estados financieros (si aplica)

**¿Cómo funciona?**

#### **1. Cálculo Inicial:**
```
Usuario busca tomador → Sistema calcula cupo disponible → Muestra en pantalla
```

- Campo visible con formato: **"$ 1.500.000.000"** (solo lectura)
- Se calcula usando `CupoService.calcularCupoDisponible()`

#### **2. Si Cupo <= 0:**
```
Cupo <= 0 → Invoca Ingeniero Digital → Si no tiene info → Habilita carga de estados financieros
```

- Se invoca automáticamente `CupoService.validarCapacidadIngenieroDigital()`
- Si el ingeniero digital NO tiene información → Se habilita modal "Solicitar Cupo"
- Usuario puede cargar estados financieros (PDF, Excel, Word)
- Después de cargar → Se recalcula el cupo automáticamente

#### **3. Si NO hay Cupo Disponible:**
```
No hay cupo → Modal bloqueante con mensaje exacto
```

- Muestra modal:
  ```
  "EL TOMADOR O AFINAZADO NO CUENTA CON CUPO DISPONIBLE. POR FAVOR COMUNICATE CON LA UNIDAD DE CUMPLIMIENTO: unidaddecumplimiento@segurosbolivar.com NO OLVIDES ADJUNTAR LOS ESTADOS FINANCIEROS ACTUALIZADOS Y SOLICITAR LA VALIDACIÓN DE UN NUEVO CUPO PARA EL CLIENTE"
  ```
- Bloquea completamente el proceso

#### **4. Diferenciación Cliente Enfoque vs Ocasional:**

**Cliente Enfoque:**
- Administrativos: Ven **todo el cupo disponible**
- Intermediarios: Ven **todo el cupo disponible**

**Cliente Ocasional:**
- Administrativos: Ven **todo el cupo disponible**
- Intermediarios: Ven **máximo 750 millones** (paramétrico)

**Ejemplo:**
- Cliente ocasional con cupo de 2 mil millones
- Intermediario ve: **$ 750.000.000** (limitado)
- Administrativo ve: **$ 2.000.000.000** (completo)

---

### **Regla 7.2: Validación Grupo Bolívar**

**¿Qué hace?**
- Valida si el Tomador o Asegurado son empresas del Grupo Bolívar
- Valida si la clave de intermediación NO es directa autorizada

**¿Cuándo se ejecuta?**
- Después de buscar tomador/asegurado
- Solo aplica para **clientes ocasionales**
- Aplica para cotizaciones y pólizas

**¿Cómo funciona?**
1. Consulta si tomador es del Grupo Bolívar → `GrupoBolivarService.validarTomadorGrupoBolivar()`
2. Consulta si asegurado es del Grupo Bolívar → `GrupoBolivarService.validarAseguradoGrupoBolivar()`
3. Consulta si clave de intermediación NO es directa autorizada
4. Si **ambas condiciones** se cumplen → Muestra modal bloqueante:
   ```
   "ESTÁS INGRESANDO A UN TOMADOR O ASEGURADO DE EMPRESAS DEL GRUPO BOLÍVAR, ESTAS EMISIONES DEBEN SER CON CLAVE DIRECTA DE LA COMPAÑÍA."
   ```
5. Bloquea el avance hasta que se corrija

**Ejemplo:**
- Usuario intermediario busca tomador del Grupo Bolívar
- Clave de intermediación NO es directa autorizada
- ❌ **Modal aparece** → Debe usar clave directa

---

### **Regla 7.3: Lista Desplegable de Programas (Producto 440)**

**¿Qué hace?**
- Muestra lista de programas disponibles para producto "Grandes Beneficiarios" (440)

**¿Cuándo se ejecuta?**
- Solo cuando el producto es **"440 - Grandes Beneficiarios"**
- Solo cuando hay información del **asegurado**

**¿Cómo funciona?**
1. Usuario selecciona producto **440**
2. Usuario busca **asegurado**
3. Sistema consulta programas disponibles → `ProgramaService.obtenerProgramasDisponibles()`
4. Muestra dropdown con programas:
   - Programas activos asociados al intermediario
   - Programas sin clave exclusiva donde esté el asegurado
   - Usuarios internos ven todos los programas donde esté el asegurado
5. Usuario **debe seleccionar un programa** (obligatorio)

**Ejemplo:**
- Usuario selecciona producto "440 - Grandes Beneficiarios"
- Busca asegurado "Empresa XYZ"
- ✅ **Dropdown aparece** con programas disponibles
- Usuario selecciona "Programa A"

---

### **Regla 7.4: Validación de Programa y Facility**

**¿Qué hace?**
- Valida si el asegurado está en el programa seleccionado
- Calcula el cupo primario (cupo del cliente vs facility del programa)

**¿Cuándo se ejecuta?**
- Después de seleccionar un programa
- Al intentar avanzar al siguiente paso

**¿Cómo funciona?**

#### **1. Validación de Programa:**
```
Usuario selecciona programa → Sistema valida si asegurado está en ese programa
```

- Consulta `ProgramaService.validarAseguradoEnPrograma()`
- Si el asegurado **NO está** en el programa → Modal bloqueante:
  ```
  "EL ASEGURADO NO SE ENCUENTRA EN EL PROGRAMA SELECCIONADO, REVISA CON TU DIRECTOR COMERCIAL O COMUNICATE A LA UNIDAD DE SERVICIO DE CUMPLIMIENTO AL BUZÓN: unidaddecumplimiento@segurosbolivar.com"
  ```
- Bloquea el avance hasta que se corrija

#### **2. Cálculo de Facility:**
```
Programa seleccionado → Sistema obtiene facility del programa → Compara con cupo del cliente
```

- Consulta `ProgramaService.obtenerFacilityPrograma()`
- Compara facility del programa vs cupo disponible del cliente
- El cupo que **prima** es el **mayor** entre ambos
- Se actualiza automáticamente el cupo visible

**Ejemplo:**
- Cliente tiene cupo: **$ 1.000.000.000**
- Programa tiene facility: **$ 1.500.000.000**
- ✅ **Cupo visible se actualiza** a **$ 1.500.000.000** (el mayor)

---

## 📄 RF-008: Carga y Validación del Archivo del Contrato

### **¿Cuándo se Activan las Validaciones?**

Las validaciones se ejecutan automáticamente cuando:
1. Usuario **selecciona un archivo** (`onFileSelected`)
2. Usuario **arrastra y suelta un archivo** (`onDropDocumentoSoporte`)

---

### **Validación 1: Formato del Archivo**

**¿Qué hace?**
- Valida que el archivo sea PDF, Word o Excel

**Formatos permitidos:**
- ✅ `.pdf` (PDF)
- ✅ `.doc` (Word antiguo)
- ✅ `.docx` (Word moderno)
- ✅ `.xls` (Excel antiguo)
- ✅ `.xlsx` (Excel moderno)

**¿Cómo funciona?**
1. Usuario selecciona archivo
2. Sistema verifica la extensión del archivo
3. Si el formato **NO es válido** → Muestra modal bloqueante:
   ```
   "El archivo '[nombre del archivo]' no se puede procesar. Por favor, selecciona un archivo en uno de los formatos permitidos."
   ```
4. Bloquea la carga del archivo

**Ejemplo:**
- Usuario intenta cargar `video.mp4`
- ❌ **Modal aparece** con el nombre del archivo
- Usuario debe seleccionar un archivo PDF, Word o Excel

---

### **Validación 2: Tamaño del Archivo**

**¿Qué hace?**
- Valida que el archivo no exceda 30 MB

**¿Cómo funciona?**
1. Usuario selecciona archivo
2. Sistema verifica el tamaño del archivo
3. Si el tamaño **excede 30 MB** → Muestra notificación de error:
   ```
   "El tamaño máximo del archivo 30 MB"
   ```
4. Bloquea la carga del archivo

**Ejemplo:**
- Usuario intenta cargar archivo de 50 MB
- ❌ **Error aparece** → Debe comprimir o dividir el archivo

---

### **Validación 3: Longitud del Nombre del Archivo**

**¿Qué hace?**
- Valida que el nombre del archivo no exceda 255 caracteres

**¿Cómo funciona?**
1. Usuario selecciona archivo
2. Sistema verifica la longitud del nombre
3. Si el nombre **excede 255 caracteres** → Muestra notificación de error:
   ```
   "La cantidad máxima de caracteres del nombre del archivo es de 255"
   ```
4. Bloquea la carga del archivo

**Ejemplo:**
- Usuario intenta cargar archivo con nombre muy largo (300 caracteres)
- ❌ **Error aparece** → Debe renombrar el archivo

---

### **Confirmación de Eliminación**

**¿Qué hace?**
- Muestra confirmación antes de eliminar un archivo cargado

**¿Cuándo se ejecuta?**
- Cuando el usuario hace clic en eliminar archivo

**¿Cómo funciona?**
1. Usuario hace clic en botón "Eliminar" del archivo
2. Sistema muestra modal de confirmación:
   ```
   "¿Estás seguro de que deseas eliminar este archivo?"
   - Botón "Cancelar" (verde, outline)
   - Botón "Eliminar" (amarillo, sólido)
   ```
3. Si confirma → Archivo se elimina
4. Si cancela → Archivo se mantiene

**Ejemplo:**
- Usuario carga archivo `contrato.pdf`
- Usuario hace clic en "Eliminar"
- ✅ **Modal de confirmación aparece**
- Usuario confirma → Archivo se elimina

---

## 🔄 Flujo Completo de las Validaciones

### **Flujo RF-005 (Tomador):**

```
1. Usuario busca tomador
   ↓
2. Sistema ejecuta validaciones RF-005:
   - Regla 5.3: Producto vs Tipo Cliente
   - Regla 5.5: Cliente Consultable
   - Regla 5.6: Reputación Negativa
   - Regla 5.7: Consorcio/Uniones Temporales
   - Regla 5.10: NITs Autorizados
   ↓
3. Si alguna validación falla → Modal bloqueante
4. Si todas pasan → Continúa el flujo
```

### **Flujo RF-005 (Asegurado):**

```
1. Usuario busca asegurado
   ↓
2. Sistema ejecuta validaciones RF-005:
   - Regla 5.4: Combinación de Clientes
   - Regla 5.5: Cliente Consultable
   - Regla 5.6: Reputación Negativa
   ↓
3. Si alguna validación falla → Modal bloqueante
4. Si todas pasan → Continúa el flujo
```

### **Flujo RF-007 (Cupo y Programas):**

```
1. Usuario busca tomador
   ↓
2. Sistema calcula cupo disponible (Regla 7.1)
   ↓
3. Si cupo <= 0:
   - Invoca Ingeniero Digital
   - Si no tiene info → Habilita carga estados financieros
   - Recalcula cupo
   ↓
4. Si no hay cupo → Modal bloqueante
5. Si hay cupo → Muestra cupo visible (según tipo cliente/usuario)
   ↓
6. Usuario selecciona producto 440
   ↓
7. Sistema muestra programas disponibles (Regla 7.3)
   ↓
8. Usuario selecciona programa
   ↓
9. Sistema valida asegurado en programa (Regla 7.4)
   ↓
10. Sistema calcula cupo primario (facility vs cupo cliente)
```

### **Flujo RF-008 (Archivo):**

```
1. Usuario selecciona archivo
   ↓
2. Sistema valida formato (PDF, Word, Excel)
   ↓
3. Si formato inválido → Modal bloqueante
   ↓
4. Sistema valida tamaño (máximo 30 MB)
   ↓
5. Si tamaño excede → Error
   ↓
6. Sistema valida longitud nombre (máximo 255 caracteres)
   ↓
7. Si longitud excede → Error
   ↓
8. Si todas las validaciones pasan → Archivo se carga
   ↓
9. Usuario puede eliminar archivo → Confirmación requerida
```

---

## 🎯 Puntos Clave

### **Bloqueo del Proceso:**
- Todas las validaciones que fallan **bloquean el avance** al siguiente paso
- El usuario **NO puede continuar** hasta resolver el problema

### **Modales Bloqueantes:**
- RF-005: 6 modales diferentes según la regla que falle
- RF-007: 3 modales (cupo no disponible, Grupo Bolívar, asegurado no en programa)
- RF-008: 1 modal (archivo no compatible)

### **Validaciones Automáticas:**
- Todas las validaciones se ejecutan **automáticamente**
- No requiere acción manual del usuario
- Se ejecutan en el momento correcto del flujo

### **Servicios Separados:**
- Cada regla tiene su propio servicio (arquitectura limpia)
- Fácil de mantener y testear
- Código profesional y escalable

---

## ✅ Resumen Final

**RF-005**: 6 reglas de validación que se ejecutan automáticamente al buscar tomador/asegurado  
**RF-007**: 4 reglas de validación de cupo y programas que se ejecutan automáticamente  
**RF-008**: 3 validaciones de archivo que se ejecutan al seleccionar archivo

**Todas las validaciones bloquean el proceso si fallan y permiten continuar si pasan.**

