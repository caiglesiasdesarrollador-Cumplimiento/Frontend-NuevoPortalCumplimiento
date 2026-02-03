# 📋 Validación RF-005: Identificación y Validación del Tomador y Asegurado

## 📊 Resumen Ejecutivo

**Fecha de Validación**: 2026-01-16  
**Proyecto**: cumplimientodigital-frontend  
**Rama**: GD981-760

---

## ✅ Reglas Implementadas

### ✅ Regla 5.1: Tipos de Documento - PARCIALMENTE IMPLEMENTADA

**Estado**: ⚠️ **FALTA PT (Permiso temporal)**

**Implementado**:
- ✅ Dropdown para tipo de documento del Tomador
- ✅ Dropdown para tipo de documento del Asegurado
- ✅ Tipos disponibles: CC, NT (NIT), CE, PP

**Falta**:
- ❌ PT (Permiso temporal) - No está en `DOCUMENT_TYPES_OPTIONS`

**Archivos**:
- `src/app/containers/policy-input/policy-input.interface.ts` (línea 91-96)
- `src/app/containers/policy-input/configs/config-step-1/tipo-documento-tomador.ts`
- `src/app/containers/policy-input/configs/config-step-1/tipo-documento-asegurado.ts`

---

### ⚠️ Regla 5.2: Invocación Servicios Terceros - PARCIALMENTE IMPLEMENTADA

**Estado**: ⚠️ **IMPLEMENTADO CON MOCKS**

**Implementado**:
- ✅ Métodos `buscarNombreTomador()` y `buscarNombreAsegurado()` existen
- ✅ Se invocan cuando se ingresa documento (mínimo 5 caracteres)
- ✅ Simulan búsqueda de información del cliente

**Falta**:
- ❌ Invocación real a servicios "Terceros Naturales" o "Terceros Jurídicos"
- ❌ Lógica para determinar qué servicio invocar según tipo de documento:
  - CC, CE, PP, PT → Terceros Naturales
  - NT, NE → Terceros Jurídicos
- ❌ Obtención de información completa (Razón Social/Nombre, correo, dirección, etc.)

**Archivos**:
- `src/app/containers/policy-input/policy-input.component.ts` (líneas 5261-5360)
- `src/app/services/cliente.service.ts` (existe pero necesita revisión)

---

### ❌ Regla 5.3: Validación Producto vs Tipo Cliente - NO IMPLEMENTADA

**Estado**: ❌ **NO IMPLEMENTADA**

**Requerimiento**:
- Si Tomador es entidad jurídica pública → Producto debe ser 455 (Cumplimiento Entidades Oficiales)
- Si no coincide → Mostrar mensaje de error exacto:
  "EL PRODUCTO SELECCIONADO NO CORRESPONDE A LA ENTIDAD QUE ESTÁS SELECCIONANDO COMO TOMADOR/AFIANZADO."
- Debe ser ventana emergente (modal)

**Falta**:
- ❌ Validación de si Tomador es entidad jurídica pública
- ❌ Validación de producto seleccionado vs tipo de entidad
- ❌ Modal con mensaje exacto requerido

**Archivos a modificar**:
- `src/app/containers/policy-input/policy-input.component.ts`
- `src/app/containers/policy-input/policy-input.component.html`

---

### ❌ Regla 5.4: Validación Combinación de Clientes - NO IMPLEMENTADA

**Estado**: ❌ **NO IMPLEMENTADA**

**Requerimiento**:
- Para productos 450 y 455: No permitir que tanto Tomador como Asegurado sean personas naturales
- Mostrar mensaje de error exacto:
  "NO ES POSIBLE AVANZAR: AL MENOS UNO ENTRE TOMADOR Y ASEGURADO DEBE SER UNA PERSONA JURÍDICA."
- Debe ser ventana emergente (modal)

**Falta**:
- ❌ Validación de tipo de persona (Natural vs Jurídica) según tipo de documento
- ❌ Validación cuando producto es 450 o 455
- ❌ Modal con mensaje exacto requerido

**Archivos a modificar**:
- `src/app/containers/policy-input/policy-input.component.ts`
- `src/app/containers/policy-input/policy-input.component.html`

---

### ❌ Regla 5.5: Validación Cliente Consultable (Restringido) - NO IMPLEMENTADA

**Estado**: ❌ **NO IMPLEMENTADA**

**Requerimiento**:
- Validar si cliente es "consultable" (restringido)
- Si es restringido → Mostrar popup y detener proceso
- Popup debe tener diseño específico con botones para llamar o WhatsApp

**Falta**:
- ❌ Invocación a servicio para validar si cliente es consultable
- ❌ Modal/popup con diseño específico requerido
- ❌ Botones para llamar (#773) y WhatsApp

**Archivos a modificar**:
- `src/app/containers/policy-input/policy-input.component.ts`
- `src/app/containers/policy-input/policy-input.component.html`
- Crear servicio para validación de cliente consultable

---

### ❌ Regla 5.6: Validación Reputación Negativa - NO IMPLEMENTADA

**Estado**: ❌ **NO IMPLEMENTADA**

**Requerimiento**:
- Invocar servicio para validar si cliente tiene "reputación negativa"
- Si tiene reputación negativa → Mostrar popup y detener proceso
- Popup debe tener diseño específico con botones para llamar o WhatsApp
- En mobile: Al seleccionar marcar al #773, direccionar al teclado del teléfono
- En mobile: Al seleccionar WhatsApp, direccionar a WhatsApp

**Falta**:
- ❌ Invocación a servicio para validar reputación negativa
- ❌ Modal/popup con diseño específico requerido
- ❌ Botones para llamar (#773) y WhatsApp
- ❌ Funcionalidad mobile para direccionar a teléfono/WhatsApp

**Archivos a modificar**:
- `src/app/containers/policy-input/policy-input.component.ts`
- `src/app/containers/policy-input/policy-input.component.html`
- Crear servicio para validación de reputación negativa

---

### ❌ Regla 5.7: Validación Consorcio/Uniones Temporales - NO IMPLEMENTADA

**Estado**: ❌ **NO IMPLEMENTADA**

**Requerimiento**:
- Validar si Tomador pertenece a consorcio o uniones temporales
- Si pertenece → Mostrar mensaje informativo:
  "EL TOMADOR HACE PARTE DE UN CONSORCIO O UNIÓN TEMPORAL, ESTO IMPACTA EL CUPO DEL GRUPO."
- Mostrar en ventana emergente
- Si pertenece a grupo empresarial → Tomar cupo del grupo del Core (no ir a ingeniero digital ni Lector de Estados Financieros)

**Falta**:
- ❌ Invocación a servicio para validar consorcio/uniones temporales
- ❌ Modal con mensaje exacto requerido
- ❌ Lógica para usar cupo del grupo cuando pertenece a grupo empresarial

**Archivos a modificar**:
- `src/app/containers/policy-input/policy-input.component.ts`
- `src/app/containers/policy-input/policy-input.component.html`
- Integrar con `CupoService` para manejar cupo del grupo

---

### ⚠️ Regla 5.8: Cliente No Creado - SARLAFT - PARCIALMENTE IMPLEMENTADA

**Estado**: ⚠️ **PARCIALMENTE IMPLEMENTADA**

**Implementado**:
- ✅ Modal "Cliente no creado" existe
- ✅ Se muestra cuando cliente no existe (mock: NIT + 12345679)
- ✅ Diferencia entre modo COTIZAR y EMITIR
- ✅ Campos para celular y correo del cliente e intermediario

**Falta**:
- ❌ Validación real de si cliente existe (actualmente es mock)
- ❌ Validación de formato de correo electrónico en tiempo real
- ❌ Validación de número de celular (10 dígitos, numérico) en tiempo real
- ❌ Campo de correo del Tomador debe ser editable
- ❌ Envío real de información del formulario SARLAFT 4.0
- ❌ Botón "Regresar" que devuelve al paso 1
- ❌ Botón "Continuar" solo para cotización (permite continuar con info desactualizada)
- ❌ En emisión: Campos obligatorios, no puede avanzar sin diligenciar

**Archivos**:
- `src/app/containers/policy-input/policy-input.component.ts` (líneas 1605-1662)
- `src/app/containers/policy-input/policy-input.component.html` (líneas 1310-1339)
- `src/app/containers/policy-input/configs/sarlaft-modal.config.ts`

---

### ⚠️ Regla 5.9: Estado SARLAFT - PARCIALMENTE IMPLEMENTADA

**Estado**: ⚠️ **PARCIALMENTE IMPLEMENTADA**

**Implementado**:
- ✅ Modal SARLAFT existe
- ✅ Diferencia entre modo COTIZAR (informativo) y EMITIR (bloqueante)
- ✅ Método `shouldShowSarlaftModal()` existe

**Falta**:
- ❌ Validación real del estado SARLAFT del cliente
- ❌ Verificación de si cliente está creado (no se puede cotizar ni emitir si no está creado)
- ❌ Lógica para detener proceso hasta que se llene formulario SARLAFT
- ❌ Integración con servicio real de SARLAFT

**Archivos**:
- `src/app/containers/policy-input/policy-input.component.ts` (líneas 295-320, 1605-1662)
- `src/app/containers/policy-input/configs/sarlaft-modal.config.ts`

---

### ❌ Regla 5.10: Validación Cliente Enfoque - NO IMPLEMENTADA

**Estado**: ❌ **NO IMPLEMENTADA**

**Requerimiento**:
- Para intermediarios: Si Tomador es tipo "Enfoque", validar que NIT del Tomador esté en NITs autorizados para ese usuario
- Si no está autorizado → Mostrar popup de error
- No aplica para asegurado
- Las validaciones se realizarán en el backend (pero frontend debe mostrar el error)

**Falta**:
- ❌ Validación de si Tomador es tipo "Enfoque"
- ❌ Validación de NITs autorizados para el usuario intermediario
- ❌ Modal con mensaje de error (mensaje pendiente según HU)
- ❌ Integración con backend para validación

**Nota**: El proyecto ya tiene `tipoCliente` (enfoque/ocasional) en `CupoService`, pero falta la validación de NITs autorizados.

**Archivos a modificar**:
- `src/app/containers/policy-input/policy-input.component.ts`
- `src/app/containers/policy-input/policy-input.component.html`
- Integrar con servicio de validación de NITs autorizados

---

## 📊 Resumen de Cumplimiento

| Regla | Estado | Cumplimiento |
|-------|--------|--------------|
| 5.1 | ⚠️ Parcial | 80% (falta PT) |
| 5.2 | ⚠️ Parcial | 30% (mocks, falta servicios reales) |
| 5.3 | ❌ No implementada | 0% |
| 5.4 | ❌ No implementada | 0% |
| 5.5 | ❌ No implementada | 0% |
| 5.6 | ❌ No implementada | 0% |
| 5.7 | ❌ No implementada | 0% |
| 5.8 | ⚠️ Parcial | 50% (estructura existe, falta validaciones y lógica real) |
| 5.9 | ⚠️ Parcial | 40% (modal existe, falta validación real) |
| 5.10 | ❌ No implementada | 0% |

**Cumplimiento Total RF-005**: **~24%** (2.4/10 reglas completamente implementadas)

---

## 🔧 Acciones Requeridas

### Prioridad Alta (Bloqueantes):
1. ✅ Agregar PT (Permiso temporal) a tipos de documento
2. ✅ Implementar Regla 5.3 (Validación Producto vs Tipo Cliente)
3. ✅ Implementar Regla 5.4 (Validación Combinación de Clientes)
4. ✅ Implementar Regla 5.5 (Cliente Consultable)
5. ✅ Implementar Regla 5.6 (Reputación Negativa)
6. ✅ Implementar Regla 5.7 (Consorcio/Uniones Temporales)
7. ✅ Implementar Regla 5.10 (Cliente Enfoque - NITs autorizados)

### Prioridad Media:
8. ✅ Completar Regla 5.8 (Validaciones y lógica real de SARLAFT)
9. ✅ Completar Regla 5.9 (Validación real de estado SARLAFT)
10. ✅ Conectar Regla 5.2 con servicios reales de Terceros

---

## 📝 Notas

- El proyecto tiene una buena base con modales y estructura, pero falta la lógica de negocio específica de RF-005
- Muchas validaciones están implementadas con mocks y necesitan conectarse a servicios reales
- Los mensajes de error deben ser exactos según la HU
- Las validaciones deben bloquear el proceso cuando corresponda según la HU


