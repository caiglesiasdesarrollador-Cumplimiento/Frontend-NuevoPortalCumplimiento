# 📋 Validación RF-005: Identificación y Validación del Tomador y Asegurado
## Análisis Detallado Basado en Imágenes de Referencia

**Fecha de Validación**: 2026-01-16  
**Proyecto**: cumplimientodigital-frontend  
**Rama**: GD981-760

---

## ✅ Regla 5.1: Tipos de Documento

**Estado**: ⚠️ **PARCIALMENTE IMPLEMENTADA (80%)**

**Implementado**:
- ✅ Dropdown para tipo de documento del Tomador
- ✅ Dropdown para tipo de documento del Asegurado
- ✅ Tipos disponibles: CC, NT (NIT), CE, PP

**Falta**:
- ❌ **PT (Permiso temporal)** - No está en `DOCUMENT_TYPES_OPTIONS`

**Archivos**:
- `src/app/containers/policy-input/policy-input.interface.ts` (línea 91-96)

**Acción requerida**: Agregar `{ label: 'Permiso temporal', value: 'PT' }` a `DOCUMENT_TYPES_OPTIONS`

---

## ⚠️ Regla 5.2: Invocación Servicios Terceros

**Estado**: ⚠️ **PARCIALMENTE IMPLEMENTADA (30%)**

**Implementado**:
- ✅ Métodos `buscarNombreTomador()` y `buscarNombreAsegurado()` existen
- ✅ Se invocan cuando se ingresa documento (mínimo 5 caracteres)
- ✅ Simulan búsqueda de información del cliente

**Falta**:
- ❌ Invocación real a servicios "Terceros Naturales" o "Terceros Jurídicos"
- ❌ Lógica para determinar qué servicio invocar según tipo de documento:
  - **Naturales**: CC, CE, PP, PT → Servicio "Terceros Naturales"
  - **Jurídicos**: NT, NE → Servicio "Terceros Jurídicos"
- ❌ Obtención de información completa (Razón Social/Nombre, correo, dirección, etc.)

**Archivos**:
- `src/app/containers/policy-input/policy-input.component.ts` (líneas 5261-5360)
- `src/app/services/cliente.service.ts` (existe pero necesita implementación real)

---

## ❌ Regla 5.3: Validación Producto vs Tipo Cliente

**Estado**: ❌ **NO IMPLEMENTADA**

**Requerimiento según imágenes**:
- Si Tomador es **entidad jurídica pública** → Producto debe ser **455 - Cumplimiento Entidades Oficiales**
- Si no coincide → Mostrar **popup de error** con mensaje exacto:
  > **"EL PRODUCTO SELECCIONADO NO CORRESPONDE A LA ENTIDAD QUE ESTÁS SELECCIONANDO COMO TOMADOR/AFIANZADO."**
- Debe ser **ventana emergente** (modal)

**Diseño del modal** (según imágenes):
- Modal de error con mensaje en negrita
- Botón de cerrar (X)
- Botón de confirmación

**Falta**:
- ❌ Validación de si Tomador es entidad jurídica pública
- ❌ Validación de producto seleccionado vs tipo de entidad
- ❌ Modal con mensaje exacto requerido

**Archivos a modificar**:
- `src/app/containers/policy-input/policy-input.component.ts`
- `src/app/containers/policy-input/policy-input.component.html`

---

## ❌ Regla 5.4: Validación Combinación de Clientes

**Estado**: ❌ **NO IMPLEMENTADA**

**Requerimiento según imágenes**:
- Para productos **450** y **455**: No permitir que tanto Tomador como Asegurado sean personas naturales
- Mostrar **popup de error** con mensaje exacto:
  > **"NO ES POSIBLE AVANZAR: AL MENOS UNO ENTRE TOMADOR Y ASEGURADO DEBE SER UNA PERSONA JURÍDICA."**
- Debe ser **ventana emergente** (modal)

**Diseño del modal** (según imágenes):
- Modal de error con mensaje en negrita
- Botón de cerrar (X)
- Botón de confirmación

**Lógica requerida**:
- Determinar tipo de persona según tipo de documento:
  - **Naturales**: CC, CE, PP, PT
  - **Jurídicos**: NT, NE
- Validar cuando producto es 450 o 455
- Bloquear avance si ambos son naturales

**Falta**:
- ❌ Función para determinar tipo de persona (Natural vs Jurídica)
- ❌ Validación cuando producto es 450 o 455
- ❌ Modal con mensaje exacto requerido

**Archivos a modificar**:
- `src/app/containers/policy-input/policy-input.component.ts`
- `src/app/containers/policy-input/policy-input.component.html`

---

## ❌ Regla 5.5: Validación Cliente Consultable (Restringido)

**Estado**: ❌ **NO IMPLEMENTADA**

**Requerimiento según imágenes**:
- Validar si cliente es "consultable" (restringido)
- Si es restringido → Mostrar **popup específico** y detener proceso

**Diseño del popup** (según imágenes):
- **Título**: "No es posible activar el seguro para el cliente"
- **Icono**: Círculo verde con exclamación amarilla en el centro
- **Mensaje principal**: "No es posible activar el seguro para el cliente"
- **Instrucciones**: "Para más información, escríbanos a WhatsApp o comuníquese al #773."
- **Botones**:
  - **"Marcar al #773"**: Botón verde con texto blanco (enlace/acción para llamar)
  - **"Ir al WhatsApp"**: Botón amarillo prominente con texto blanco (acción para WhatsApp)

**Funcionalidad mobile**:
- Al seleccionar "Marcar al #773" → Direccionar al teclado del teléfono con #773 precargado
- Al seleccionar "Ir al WhatsApp" → Direccionar a WhatsApp para comunicarse con la línea

**Falta**:
- ❌ Invocación a servicio para validar si cliente es consultable
- ❌ Modal/popup con diseño exacto según imágenes
- ❌ Botones funcionales para llamar (#773) y WhatsApp
- ❌ Funcionalidad mobile para direccionar a teléfono/WhatsApp

**Archivos a crear/modificar**:
- Crear servicio para validación de cliente consultable
- `src/app/containers/policy-input/policy-input.component.ts`
- `src/app/containers/policy-input/policy-input.component.html`

---

## ❌ Regla 5.6: Validación Reputación Negativa

**Estado**: ❌ **NO IMPLEMENTADA**

**Requerimiento según imágenes**:
- Invocar servicio para validar si cliente tiene "reputación negativa"
- Si tiene reputación negativa → Mostrar **popup específico** y detener proceso

**Diseño del popup** (según imágenes - **IDÉNTICO AL DE REGLA 5.5**):
- **Título**: "No es posible activar el seguro para el cliente"
- **Icono**: Círculo verde con exclamación amarilla en el centro
- **Mensaje principal**: "No es posible activar el seguro para el cliente"
- **Instrucciones**: "Para más información, escríbanos a WhatsApp o comuníquese al #773."
- **Botones**:
  - **"Marcar al #773"**: Botón verde con texto blanco (enlace/acción para llamar)
  - **"Ir al WhatsApp"**: Botón amarillo prominente con texto blanco (acción para WhatsApp)

**Funcionalidad mobile**:
- Al seleccionar "Marcar al #773" → Direccionar al teclado del teléfono con #773 precargado
- Al seleccionar "Ir al WhatsApp" → Direccionar a WhatsApp para comunicarse con la línea

**Falta**:
- ❌ Invocación a servicio para validar reputación negativa
- ❌ Modal/popup con diseño exacto según imágenes (mismo que Regla 5.5)
- ❌ Botones funcionales para llamar (#773) y WhatsApp
- ❌ Funcionalidad mobile para direccionar a teléfono/WhatsApp

**Archivos a crear/modificar**:
- Crear servicio para validación de reputación negativa
- `src/app/containers/policy-input/policy-input.component.ts`
- `src/app/containers/policy-input/policy-input.component.html`

**Nota**: El popup puede ser el mismo componente reutilizable para Reglas 5.5 y 5.6, solo cambia el trigger.

---

## ❌ Regla 5.7: Validación Consorcio/Uniones Temporales

**Estado**: ❌ **NO IMPLEMENTADA**

**Requerimiento según imágenes**:
- Validar si Tomador pertenece a consorcio o uniones temporales
- Si pertenece → Mostrar **mensaje informativo** en ventana emergente:
  > **"EL TOMADOR HACE PARTE DE UN CONSORCIO O UNIÓN TEMPORAL, ESTO IMPACTA EL CUPO DEL GRUPO."**
- Si pertenece a grupo empresarial → Tomar cupo del grupo del Core (no ir a ingeniero digital ni Lector de Estados Financieros)

**Diseño del modal** (según imágenes):
- Modal informativo (no bloqueante)
- Mensaje en negrita
- Botón de cerrar/confirmar

**Falta**:
- ❌ Invocación a servicio para validar consorcio/uniones temporales
- ❌ Modal con mensaje exacto requerido
- ❌ Lógica para usar cupo del grupo cuando pertenece a grupo empresarial
- ❌ Integración con `CupoService` para manejar cupo del grupo

**Archivos a crear/modificar**:
- Crear servicio para validación de consorcio/uniones temporales
- `src/app/containers/policy-input/policy-input.component.ts`
- `src/app/containers/policy-input/policy-input.component.html`
- Integrar con `CupoService` para manejar cupo del grupo

---

## ⚠️ Regla 5.8: Cliente No Creado - SARLAFT

**Estado**: ⚠️ **PARCIALMENTE IMPLEMENTADA (50%)**

**Requerimiento según imágenes**:
- Si es proceso de **emisión** y cliente **no existe** → Mostrar popup solicitando datos
- Popup debe solicitar:
  - Número celular del tomador (10 dígitos, numérico)
  - Correo electrónico del tomador (formato válido, editable)
  - Número celular del intermediario/asesor
  - Correo electrónico del intermediario/asesor (formato válido)
- Validaciones en tiempo real al ingresar información
- En **emisión**: Datos obligatorios, no puede avanzar sin diligenciar
- En **cotización**: Puede continuar con botón "Continuar" (info desactualizada)

**Diseño del modal según imágenes**:

**Modal "Tomador no creado"**:
- **Título**: "Tomador no creado" (barra verde con texto blanco)
- **Icono**: Persona con documento y flecha circular (actualización)
- **Mensaje**: "Ingresa los datos solicitados para comenzar el registro de tomador."
- **Campos**:
  1. Número celular del tomador (placeholder: "Ingresa el número de celular del tomador")
  2. Correo del tomador (placeholder: "Ingresa el correo electrónico del tomador")
  3. Número celular del asesor (placeholder: "Ingresa el número de celular del asesor")
  4. Correo del asesor (placeholder: "Ingresa el correo electrónico del asesor")
- **Botones**:
  - **Cotizar**: "← Regresar" (gris), "Actualizar" (gris), "Continuar →" (amarillo)
  - **Emitir**: "← Regresar" (gris), "Actualizar" (amarillo) - **NO tiene "Continuar"**

**Funcionalidad**:
- Botón "Actualizar": Envía información del formulario SARLAFT 4.0 a teléfonos y correos diligenciados
- Botón "Regresar": Devuelve al formulario del paso 1
- Botón "Continuar": Solo para cotización, permite continuar al paso 2 con info desactualizada

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
- ❌ Diseño exacto según imágenes (barra verde, iconos específicos)

**Archivos**:
- `src/app/containers/policy-input/policy-input.component.ts` (líneas 1605-1662)
- `src/app/containers/policy-input/policy-input.component.html` (líneas 1310-1339)
- `src/app/containers/policy-input/configs/sarlaft-modal.config.ts`

---

## ⚠️ Regla 5.9: Estado SARLAFT

**Estado**: ⚠️ **PARCIALMENTE IMPLEMENTADA (40%)**

**Requerimiento según imágenes**:
- Si cliente existe → Verificar estado del SARLAFT
- Si no está actualizado → Mostrar **popup informativo** y detener proceso
- El proceso puede continuar cuando se llene el formulario de SARLAFT
- **Si el cliente no está creado no se puede cotizar ni emitir**

**Diseño del modal según imágenes**:

**Modal "El tomador tiene sarlaft desactualizado"**:
- **Título**: "El tomador tiene sarlaft desactualizado" (barra verde con texto blanco)
- **Icono**: Persona con documento y flecha circular (actualización)
- **Mensaje**: "El tomador tiene sarlaft desactualizado"
- **Instrucciones**: "Ingresa la siguiente información para iniciar actualización en línea."
- **Campos** (iguales que Regla 5.8):
  1. Número celular del tomador
  2. Correo del tomador
  3. Número celular del asesor
  4. Correo del asesor
- **Botones**:
  - **Cotizar**: "← Regresar" (gris), "Actualizar" (gris), "Continuar →" (amarillo)
  - **Emitir**: "← Regresar" (gris), "Actualizar" (amarillo) - **NO tiene "Continuar"**

**Implementado**:
- ✅ Modal SARLAFT existe
- ✅ Diferencia entre modo COTIZAR (informativo) y EMITIR (bloqueante)
- ✅ Método `shouldShowSarlaftModal()` existe

**Falta**:
- ❌ Validación real del estado SARLAFT del cliente
- ❌ Verificación de si cliente está creado (no se puede cotizar ni emitir si no está creado)
- ❌ Lógica para detener proceso hasta que se llene formulario SARLAFT
- ❌ Integración con servicio real de SARLAFT
- ❌ Diseño exacto según imágenes (barra verde, iconos específicos)

**Archivos**:
- `src/app/containers/policy-input/policy-input.component.ts` (líneas 295-320, 1605-1662)
- `src/app/containers/policy-input/configs/sarlaft-modal.config.ts`

---

## ❌ Regla 5.10: Validación Cliente Enfoque

**Estado**: ❌ **NO IMPLEMENTADA**

**Requerimiento según imágenes**:
- Para **intermediarios**: Si Tomador es tipo "Enfoque", validar que NIT del Tomador esté en NITs autorizados para ese usuario
- Si no está autorizado → Mostrar **popup de error**
- **No aplica para asegurado**
- Las validaciones se realizarán en el backend (pero frontend debe mostrar el error)

**Mensaje**: Pendiente agregar el mensaje a mostrar (según HU)

**Falta**:
- ❌ Validación de si Tomador es tipo "Enfoque"
- ❌ Validación de NITs autorizados para el usuario intermediario
- ❌ Modal con mensaje de error (mensaje pendiente según HU)
- ❌ Integración con backend para validación

**Nota**: El proyecto ya tiene `tipoCliente` (enfoque/ocasional) en `CupoService`, pero falta la validación de NITs autorizados.

**Archivos a modificar**:
- `src/app/containers/policy-input/policy-input.component.ts`
- `src/app/containers/policy-input/policy-input.component.html`
- Crear servicio para validación de NITs autorizados o integrar con backend

---

## 📊 Resumen de Cumplimiento Detallado

| Regla | Estado | Cumplimiento | Prioridad |
|-------|--------|--------------|-----------|
| 5.1 | ⚠️ Parcial | 80% (falta PT) | Media |
| 5.2 | ⚠️ Parcial | 30% (mocks, falta servicios reales) | Media |
| 5.3 | ❌ No implementada | 0% | **Alta** |
| 5.4 | ❌ No implementada | 0% | **Alta** |
| 5.5 | ❌ No implementada | 0% | **Alta** |
| 5.6 | ❌ No implementada | 0% | **Alta** |
| 5.7 | ❌ No implementada | 0% | **Alta** |
| 5.8 | ⚠️ Parcial | 50% (estructura existe, falta validaciones y diseño exacto) | **Alta** |
| 5.9 | ⚠️ Parcial | 40% (modal existe, falta validación real y diseño exacto) | **Alta** |
| 5.10 | ❌ No implementada | 0% | **Alta** |

**Cumplimiento Total RF-005**: **~24%** (2.4/10 reglas completamente implementadas)

---

## 🎨 Detalles de Diseño Según Imágenes

### Popup Cliente Restringido/Reputación Negativa (Reglas 5.5 y 5.6):
- Icono: Círculo verde con exclamación amarilla
- Título: "No es posible activar el seguro para el cliente"
- Botón verde: "Marcar al #773"
- Botón amarillo: "Ir al WhatsApp"

### Modal SARLAFT Desactualizado (Regla 5.9):
- Barra superior verde con texto blanco
- Icono: Persona con documento y flecha circular
- Campos: 4 campos de entrada (celular y correo de tomador y asesor)
- Botones según acción (cotizar vs emitir)

### Modal Tomador No Creado (Regla 5.8):
- Barra superior verde con texto blanco
- Icono: Persona con plus
- Campos: 4 campos de entrada
- Botones según acción (cotizar vs emitir)

---

## 🔧 Acciones Requeridas Priorizadas

### Prioridad CRÍTICA (Bloqueantes):
1. ✅ Implementar Regla 5.3 (Validación Producto vs Tipo Cliente) - Modal de error
2. ✅ Implementar Regla 5.4 (Validación Combinación de Clientes) - Modal de error
3. ✅ Implementar Regla 5.5 (Cliente Consultable) - Popup específico con diseño exacto
4. ✅ Implementar Regla 5.6 (Reputación Negativa) - Popup específico con diseño exacto
5. ✅ Implementar Regla 5.7 (Consorcio/Uniones Temporales) - Modal informativo
6. ✅ Completar Regla 5.8 (Validaciones y diseño exacto según imágenes)
7. ✅ Completar Regla 5.9 (Validación real y diseño exacto según imágenes)
8. ✅ Implementar Regla 5.10 (Cliente Enfoque - NITs autorizados)

### Prioridad Media:
9. ✅ Agregar PT (Permiso temporal) a tipos de documento
10. ✅ Conectar Regla 5.2 con servicios reales de Terceros

---

## 📝 Notas Importantes

- Los modales deben tener el diseño exacto según las imágenes proporcionadas
- Los mensajes deben ser exactos según la HU (texto en mayúsculas donde corresponda)
- Las validaciones deben bloquear el proceso cuando corresponda según la HU
- Los botones deben tener funcionalidad mobile específica (teléfono y WhatsApp)
- Los modales de SARLAFT deben diferenciarse claramente entre modo COTIZAR y EMITIR

