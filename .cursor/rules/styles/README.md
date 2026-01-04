# Reglas de Estilos - SCSS/CSS

Esta carpeta contiene las reglas específicas para estilos SCSS/CSS que se aplican automáticamente en el proyecto.

## 📋 **Reglas Disponibles**

### 1. **BEM Naming Convention** (`bem-naming-convention.mdc`)

- **Propósito**: Enforce usar nomenclatura `Block__Element--Modifier`
- **Se aplica a**: `**/*.scss`, `**/*.css`, `**/*.html`
- **Ejemplos**: `.button__icon--large`, `.form__input--error`

### 2. **Limit SCSS Nesting** (`bem-limit-nesting.mdc`)

- **Propósito**: Limitar anidamiento SCSS a máximo 2-3 niveles
- **Se aplica a**: `**/*.scss`
- **Beneficio**: Mantener selectores legibles y mantenibles

### 3. **One Block per File** (`bem-one-block-per-file.mdc`)

- **Propósito**: Un bloque BEM por archivo SCSS
- **Se aplica a**: `**/*.scss`, `**/*.css`
- **Beneficio**: Mejor organización y mantenimiento

### 4. **No Modificar Tech-Block-Lib** (`no-override-tech-block-lib.mdc`)

- **Propósito**: Preservar la integridad del sistema de diseño tech-block-lib
- **Se aplica a**: `**/*.scss`, `**/*.css`, `**/*.html`, `**/*.component.ts`
- **Crítico**: Nunca sobrescribir estilos nativos de componentes tech-block-lib

### 5. **No @extend en Media Queries** (`no-extend-in-media-queries.mdc`)

- **Propósito**: Prevenir errores de compilación SCSS
- **Se aplica a**: `**/*.scss`, `**/*.sass`
- **Error común**: `You may not @extend selectors across media queries`

### 6. **Usar Clases Tailwind de Tech-Block-Lib** (`use-tech-block-lib-classes.mdc`) ⭐ **NUEVA**

- **Propósito**: Obligar el uso de clases de color tech-block-lib en lugar de Tailwind estándar
- **Se aplica a**: `**/*.html`, `**/*.ts`, `**/*.scss`, `**/*.css`
- **Basado en**: Header y `tailwind.config.js`

## 🚨 **Reglas Críticas:**

### **1. No @extend en Media Queries:**

Esta regla previene uno de los errores más comunes en SCSS:

```scss
// ❌ MAL: Causará error de compilación
@media (max-width: 768px) {
  .component {
    @extend .component--mobile; // Error!
  }
}

// ✅ BIEN: Usar mixins o estilos directos
@media (max-width: 768px) {
  .component {
    @include mobile-styles; // ✅ Mixins funcionan
    // O aplicar estilos directamente ✅
    font-size: 14px;
    padding: 0.5rem;
  }
}
```

### **2. Usar Clases Tech-Block-Lib (NUEVO):**

Esta regla garantiza consistencia visual usando el sistema de diseño:

```html
<!-- ✅ BIEN: Clases tech-block-lib (basado en el header) -->
<div class="bg-grayscaleWhite border border-grayscaleL200 text-grayscaleBlack">
  Content
</div>

<!-- ❌ MAL: Clases Tailwind estándar -->
<div class="bg-white border border-gray-200 text-gray-900">
  Content
</div>
```

**Referencia**: Si el header usa `bg-grayscaleWhite`, úsa el mismo patrón.

## 🔧 **Integración con Otras Reglas**

### **Con reglas BEM:**

- ✅ Usar nomenclatura BEM + responsive directo
- ✅ Un bloque por archivo + media queries integradas
- ✅ Nesting limitado + mixins para reutilización

### **Con reglas Tech-Block-Lib:**

- ✅ No modificar estilos de componentes + responsive nativo
- ✅ Variables CSS permitidas + sin @extend en media queries
- ✅ Clases de color tech-block-lib + sin clases Tailwind estándar
- ✅ Containers centrados + responsive design optimizado

## 💡 **Mejores Prácticas Combinadas**

### **1. Estructura BEM con Responsive:**

```scss
// ✅ BIEN: Siguiendo todas las reglas
.form {
  max-width: 600px;
  margin: 0 auto;

  &__actions {
    display: flex;
    gap: 1rem;
  }

  // ✅ Responsive sin @extend
  @media (max-width: 768px) {
    max-width: 100%;

    &__actions {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
}
```

### **2. Mixins Reutilizables:**

```scss
// ✅ BIEN: Mixins para responsive
@mixin mobile-spacing {
  padding: 0.5rem;
  margin: 0.25rem;
}

.component {
  padding: 1rem;
  margin: 0.5rem;

  @media (max-width: 768px) {
    @include mobile-spacing; // ✅ Sin errores
  }
}
```

### **3. Tech-Block-Lib + Responsive:**

```scss
// ✅ BIEN: Solo containers, no componentes
.form-container {
  max-w-2xl mx-auto px-4;

  @media (max-width: 768px) {
    max-w-full px-2; // ✅ Solo layout
  }
}

// ❌ MAL: No modificar componentes tech-block-lib
/* lib-tb-button {
  @media (max-width: 768px) {
    font-size: 14px; // ❌ Prohibido
  }
} */
```

## 🎯 **Checklist de Cumplimiento**

### **Antes de hacer commit:**

- [ ] ✅ Nomenclatura BEM correcta (`Block__Element--Modifier`)
- [ ] ✅ Máximo 2-3 niveles de anidamiento SCSS
- [ ] ✅ Un bloque BEM por archivo
- [ ] ✅ No modificaste estilos de tech-block-lib
- [ ] ✅ **No usaste @extend dentro de media queries**
- [ ] ✅ **Usaste clases tech-block-lib en lugar de Tailwind estándar**
- [ ] ✅ Usaste mixins para estilos reutilizables en responsive

### **Si hay error de compilación:**

1. **Busca** `@extend` dentro de `@media`
2. **Convierte** a `@mixin` o estilos directos
3. **Verifica** que no modificas tech-block-lib
4. **Revisa** clases Tailwind estándar y cámbialas por tech-block-lib
5. **Compila** nuevamente

## 📚 **Recursos Adicionales**

- [Documentación BEM](http://getbem.com/)
- [SCSS Best Practices](https://sass-guidelin.es/)
- [CSS Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries)
- [Tech-Block-Lib Variables](../techblock/README.md)

---

**Todas estas reglas se aplican automáticamente (`alwaysApply: true`) para garantizar consistencia en el proyecto.**
