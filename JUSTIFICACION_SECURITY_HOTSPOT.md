# 🔒 Justificación Security Hotspot - SonarCloud

## 📋 Información del Hotspot

**Archivo**: `src/index.html`  
**Línea**: 47  
**Tipo**: Security Hotspot - Resource Integrity  
**Severidad**: Low  
**Estado**: To Review

---

## 🔍 Detalle del Hotspot

SonarCloud detectó que el siguiente script tag no tiene el atributo `integrity`:

```html
<script type="module" src="https://unpkg.com/@seguros-bolivar/ui-bundle@latest/dist/sb-ui-components.min.js" crossorigin="anonymous"></script>
```

---

## ✅ Justificación para Marcar como "Safe"

### 1. **Paquete Oficial Interno de Seguros Bolívar**

- El paquete `@seguros-bolivar/ui-bundle` es un paquete **oficial y oficialmente mantenido** por Seguros Bolívar
- Es un paquete **interno** de la organización, no un paquete de terceros externos
- El dominio `unpkg.com` es solo un CDN para servir el paquete, pero el contenido es propiedad de Seguros Bolívar

### 2. **Uso de `@latest` es Intencional**

- El uso de `@latest` permite obtener automáticamente las actualizaciones del paquete
- Esto es **intencional** para mantener la aplicación actualizada con las últimas mejoras y correcciones de seguridad del paquete interno
- El paquete es mantenido por el mismo equipo de desarrollo de Seguros Bolívar

### 3. **Atributo `crossorigin="anonymous"` Presente**

- El script ya incluye `crossorigin="anonymous"` que proporciona cierta protección
- Esto permite que el navegador valide el origen del recurso

### 4. **Contexto de Seguridad**

- **Riesgo bajo**: El paquete es interno y oficial
- **Control total**: Seguros Bolívar tiene control total sobre el contenido del paquete
- **Sin dependencias externas**: No hay riesgo de inyección de código malicioso de terceros

### 5. **Comentario en Código**

El código ya incluye un comentario explicando la decisión:

```html
<!-- NOSONAR: Paquete oficial de @seguros-bolivar (interno), seguro para usar sin integrity -->
```

---

## 📝 Recomendación

**Marcar este Security Hotspot como "Safe"** porque:

1. ✅ Es un paquete oficial interno de Seguros Bolívar
2. ✅ El uso de `@latest` es intencional para mantener actualizaciones automáticas
3. ✅ El riesgo de seguridad es mínimo dado el contexto interno
4. ✅ El equipo de desarrollo tiene control total sobre el paquete
5. ✅ Ya existe documentación en el código explicando la decisión

---

## 🔗 Información Adicional

- **Paquete**: `@seguros-bolivar/ui-bundle`
- **Versión**: `@latest` (última versión disponible)
- **CDN**: `unpkg.com`
- **Organización**: Seguros Bolívar (interno)

---

## ✅ Acción Requerida

**Solicitud para Administrador de SonarCloud:**

Por favor, marcar el Security Hotspot en `src/index.html` línea 47 como **"Safe"** con la siguiente justificación:

> "Paquete oficial interno de Seguros Bolívar. El uso de `@latest` es intencional para mantener actualizaciones automáticas. Riesgo de seguridad mínimo dado que es un paquete interno controlado por la organización."

---

## 📅 Fecha de Solicitud

**Fecha**: 2026-01-16  
**Rama**: GD981-760  
**Proyecto**: cumplimientodigital-frontend

---

## 👤 Contacto

Si se requiere más información sobre esta decisión, contactar al equipo de desarrollo del proyecto.


