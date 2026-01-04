# Reglas de Arquitectura

Este directorio contiene las reglas de arquitectura que se aplican automáticamente a todo el proyecto para mantener consistencia, calidad y mejores prácticas.

## 📋 **Reglas Disponibles:**

### **🔤 Nomenclatura y Documentación**

- **[english-naming-spanish-docs.mdc](./english-naming-spanish-docs.mdc)**: Nomenclatura en inglés con documentación en español
  - Define que los nombres de componentes, archivos, variables y código deben estar en inglés
  - La documentación y comentarios deben estar en español
  - Garantiza consistencia internacional del código con accesibilidad local

### **⚡ Calidad de Código TypeScript**

- **[typescript-best-practices.mdc](./typescript-best-practices.mdc)**: Mejores prácticas de TypeScript
  - Previene errores comunes como parámetros no utilizados, interfaces incorrectas
  - Define uso correcto de `readonly`, prefijos `_`, y verificación de interfaces externas
  - Establece estándares para type safety y mantenibilidad del código

### **🧩 Integración con Tech-Block-Lib**

- **[check-tech-block-lib-first.mdc](./check-tech-block-lib-first.mdc)**: Consultar tech-block-lib antes de crear componentes
  - Mapeo automático de palabras clave a componentes tech-block-lib
  - Proceso obligatorio de consulta de documentación
  - Evita duplicación de componentes existentes

### **🏗️ Arquitectura Angular**

- **[delegation-to-services.mdc](./delegation-to-services.mdc)**: Delegar lógica a servicios
  - Mantiene los componentes limpios delegando lógica de negocio a servicios
  - Promueve la separación de responsabilidades

- **[no-direct-dom.mdc](./no-direct-dom.mdc)**: Evitar acceso directo al DOM
  - Usar `Renderer2` o `ElementRef` para mantener compatibilidad con Angular y SSR
  - Evita manipulación directa del DOM

- **[use-onpush-strategy.mdc](./use-onpush-strategy.mdc)**: ChangeDetectionStrategy.OnPush
  - Mejora el rendimiento usando la estrategia OnPush para la detección de cambios
  - Optimiza el ciclo de detección de cambios de Angular

## 🎯 **Cómo Funcionan las Reglas:**

### **Aplicación Automática:**

Todas las reglas tienen `alwaysApply: true`, lo que significa que se aplican automáticamente cuando trabajas en archivos que coinciden con los patrones definidos en `globs`.

### **Cobertura de Archivos:**

Las reglas cubren diferentes tipos de archivos:

- **TypeScript**: `**/*.ts`
- **HTML Templates**: `**/*.html`
- **Estilos**: `**/*.scss`, `**/*.css`
- **JavaScript**: `**/*.js`
- **Configuración**: `**/*.json`
- **Documentación**: `**/*.md`

### **Tipos de Reglas:**

- **comment**: Reglas que proporcionan comentarios y guías durante el desarrollo
- **architecture**: Reglas que definen patrones estructurales del proyecto

## 📚 **Beneficios:**

### **✅ Consistencia:**

- Nomenclatura estandarizada en todo el proyecto
- Patrones de código unificados
- Estructura de archivos coherente

### **✅ Calidad:**

- Prevención de errores comunes
- Mejores prácticas aplicadas automáticamente
- Código más mantenible y legible

### **✅ Productividad:**

- Reducción del tiempo de revisión de código
- Guías automáticas durante el desarrollo
- Integración optimizada con tech-block-lib

### **✅ Escalabilidad:**

- Código compatible con estándares internacionales
- Facilita la incorporación de nuevos desarrolladores
- Soporte para equipos distribuidos

## 🔧 **Agregar Nuevas Reglas:**

Para crear una nueva regla de arquitectura:

1. **Crear archivo `.mdc`** en este directorio
2. **Definir front matter YAML:**
   ```yaml
   ---
   id: nombre-unico-regla
   name: Nombre descriptivo de la regla
   description: Descripción detallada de qué hace la regla
   globs:
     - "**/*.ts"
     - "**/*.html"
   type: comment
   alwaysApply: true
   ---
   ```
3. **Escribir contenido en Markdown** con ejemplos y explicaciones
4. **Actualizar este README** agregando la nueva regla

## 📖 **Estructura de una Regla:**

Cada archivo `.mdc` debe contener:

### **Front Matter (YAML):**

- `id`: Identificador único
- `name`: Nombre descriptivo
- `description`: Explicación breve
- `globs`: Patrones de archivos afectados
- `type`: Tipo de regla (comment, architecture, etc.)
- `alwaysApply`: Si se aplica automáticamente

### **Contenido (Markdown):**

- Explicación detallada de la regla
- Ejemplos de código correcto e incorrecto
- Casos de uso y excepciones
- Beneficios y justificación

## ⚠️ **Reglas Críticas:**

Las siguientes reglas son **especialmente importantes** y afectan directamente la arquitectura del proyecto:

1. **english-naming-spanish-docs**: Base para toda la nomenclatura del proyecto
2. **typescript-best-practices**: Previene errores comunes de TypeScript y mejora la calidad del código
3. **check-tech-block-lib-first**: Evita duplicación de componentes y asegura consistencia con el sistema de diseño

**Estas reglas deben seguirse estrictamente para mantener la calidad y consistencia del código.**
