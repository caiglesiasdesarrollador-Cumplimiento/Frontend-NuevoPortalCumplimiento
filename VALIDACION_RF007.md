# 📋 Validación RF-007: Validaciones Específicas de cupo y condiciones programas 440

## 🔍 Análisis de Cumplimiento

### **Regla 7.1: Cálculo y Visualización de Cupo Disponible**

#### ✅ **CUMPLE PARCIALMENTE:**

**Lo que SÍ está implementado:**
- ✅ Campo de "Cupo Disponible del Cliente" visible en pantalla
- ✅ Campo no editable (solo lectura)
- ✅ Modal "Solicitar Cupo" cuando no hay cupo disponible
- ✅ Carga de estados financieros en el modal
- ✅ Selección de actividad económica

**Lo que NO está implementado:**
- ❌ **Cálculo dinámico del cupo disponible** (actualmente está hardcodeado: $100.000.000)
- ❌ **Validación cuando cupo <= 0** para invocar servicio ingeniero digital
- ❌ **Invocación del servicio del ingeniero digital** para validar capacidad
- ❌ **Habilitación automática del lector de estados financieros** cuando ingeniero digital no tiene info
- ❌ **Re-invocación del cálculo de cupo** después de cargar estados financieros
- ❌ **Mensaje bloqueante exacto requerido:**
  ```
  "EL TOMADOR O AFINAZADO NO CUENTA CON CUPO DISPONIBLE. POR FAVOR COMUNICATE CON LA UNIDAD DE CUMPLIMIENTO: unidaddecumplimiento@segurosbolivar.com NO OLVIDES ADJUNTAR LOS ESTADOS FINANCIEROS ACTUALIZADOS Y SOLICITAR LA VALIDACIÓN DE UN NUEVO CUPO PARA EL CLIENTE"
  ```
- ❌ **Actualización en Tronador** (no se ve en frontend)
- ❌ **Diferenciación cliente enfoque vs ocasional:**
  - Cliente enfoque: mostrar todo el cupo (admin e intermediarios)
  - Cliente ocasional: intermediario máximo 750M (paramétrico), admin todo el cupo

---

### **Regla 7.2: Validación Grupo Bolívar**

#### ❌ **NO CUMPLE:**

**Lo que NO está implementado:**
- ❌ **Validación si Tomador es del Grupo Bolívar**
- ❌ **Validación si Asegurado es del Grupo Bolívar**
- ❌ **Validación si clave de intermediación NO es directa autorizada**
- ❌ **Popup de error** cuando se cumplen ambas condiciones
- ❌ **Mensaje exacto requerido:**
  ```
  "ESTÁS INGRESANDO A UN TOMADOR O ASEGURADO DE EMPRESAS DEL GRUPO BOLÍVAR, ESTAS EMISIONES DEBEN SER CON CLAVE DIRECTA DE LA COMPAÑÍA."
  ```
- ❌ **Aplicación solo para cliente ocasional**
- ❌ **Aplicación para cotizaciones y pólizas**

---

### **Regla 7.3: Lista Desplegable de Programas (Producto 440)**

#### ⚠️ **CUMPLE PARCIALMENTE:**

**Lo que SÍ está implementado:**
- ✅ Lista desplegable de programas para producto 440 (Grandes Beneficiarios)
- ✅ Campo visible cuando se selecciona producto "Grandes Beneficiarios"
- ✅ Programas mock disponibles (Programa A, B, C, D)

**Lo que NO está implementado:**
- ❌ **Filtrado por programas activos asociados al intermediario**
- ❌ **Filtrado por programas sin clave exclusiva donde esté el asegurado**
- ❌ **Integración con servicio para obtener programas reales**
- ❌ **Lógica de filtrado según intermediario y asegurado**

---

### **Regla 7.4: Flujo Producto 440 - Grandes Beneficiarios**

#### ⚠️ **CUMPLE PARCIALMENTE:**

**Lo que SÍ está implementado:**
- ✅ **Solicitud primero del Asegurado** antes de habilitar programas
- ✅ Campo de programas se habilita solo cuando hay información del asegurado
- ✅ Mensaje informativo: "Complete la información del asegurado primero"
- ✅ Validación obligatoria del programa para producto 440
- ✅ Mensaje de error cuando no se selecciona programa

**Lo que NO está implementado:**
- ❌ **Obtención de programas según asegurado** (actualmente son mock)
- ❌ **Validación de facility** del programa seleccionado
- ❌ **Comparación de facility con cupo asignado del cliente**
- ❌ **Determinación de cupo que primará** (facility vs cupo cliente)
- ❌ **Facility parametrizado** del programa
- ❌ **Diferenciación para usuarios internos** (mostrar todos los programas donde esté el asegurado)
- ❌ **Validación si asegurado NO está en programa seleccionado**
- ❌ **Mensaje exacto requerido cuando no hay programa:**
  ```
  "EL ASEGURADO NO SE ENCUENTRA EN EL PROGRAMA SELECCIONADO, REVISA CON TU DIRECTOR COMERCIAL O COMUNICATE A LA UNIDAD DE SERVICIO DE CUMPLIMIENTO AL BUZÓN: unidaddecumplimiento@segurosbolivar.com"
  ```
- ❌ **Bloqueo del proceso** cuando no se encuentra programa

---

## 📊 Resumen General

| Regla | Estado | % Cumplimiento |
|-------|--------|----------------|
| **7.1** - Cálculo y visualización cupo | ⚠️ Parcial | ~30% |
| **7.2** - Validación Grupo Bolívar | ❌ No cumple | 0% |
| **7.3** - Lista programas 440 | ⚠️ Parcial | ~40% |
| **7.4** - Flujo producto 440 | ⚠️ Parcial | ~50% |

**Cumplimiento Total RF-007: ~30%**

---

## 🔧 Cambios Necesarios para Cumplir al 100%

### **Prioridad ALTA:**

1. **Regla 7.1:**
   - Implementar cálculo dinámico de cupo disponible
   - Agregar validación cupo <= 0
   - Integrar servicio ingeniero digital
   - Implementar flujo: ingeniero digital → lector estados financieros → recalcular cupo
   - Agregar mensaje bloqueante exacto
   - Implementar diferenciación cliente enfoque/ocasional (750M paramétrico)

2. **Regla 7.2:**
   - Crear validación Grupo Bolívar (Tomador y Asegurado)
   - Validar clave directa autorizada
   - Implementar popup de error con mensaje exacto
   - Aplicar solo para cliente ocasional
   - Aplicar para cotizaciones y pólizas

3. **Regla 7.4:**
   - Integrar servicio para obtener programas según asegurado
   - Implementar validación de facility
   - Comparar facility con cupo del cliente
   - Agregar mensaje cuando asegurado no está en programa
   - Bloquear proceso cuando no hay programa válido

### **Prioridad MEDIA:**

4. **Regla 7.3:**
   - Filtrar programas activos asociados al intermediario
   - Filtrar programas sin clave exclusiva donde esté el asegurado
   - Integrar con servicios reales

---

## 📝 Notas Técnicas

- El campo de cupo actualmente está hardcodeado en el HTML: `$100.000.000`
- Los programas son mock (Programa A, B, C, D) - no hay integración con servicios
- No hay servicios integrados para:
  - Cálculo de cupo disponible
  - Ingeniero digital
  - Validación Grupo Bolívar
  - Obtención de programas según asegurado
  - Validación de facility

---

**Fecha de validación:** 2026-01-16
**Proyecto:** bolivar-angular20-migration

