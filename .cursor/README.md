# 🧩 Cursor Context Rules — Proyecto Angular

Este repositorio define **reglas personalizadas** para mantener buenas prácticas en proyectos **Angular 15**, usando **Cursor Context Rules** en formato `.mdc`.

## ⚙️ ¿Cómo funciona?

- Cada archivo `.mdc` combina **metadata** (`Frontmatter`) con contenido **Markdown**.
- La metadata define:
  - `id`: Identificador único de la regla.
  - `name`: Nombre descriptivo.
  - `description`: Qué hace la regla.
  - `globs`: Rutas de archivos donde se aplica.
  - `type`: Acción de Cursor (`comment`, `lint` o `refactor`).
  - `alwaysApply: true`: Se evalúa siempre.

- El contenido Markdown explica buenas prácticas, ejemplos o contexto adicional para el equipo.

- Cursor recorre de forma **recursiva** todas las subcarpetas dentro de `rules/` — puedes organizar reglas por tema.

---

## 🚀 Uso

1. Guarda todos los `.mdc` en la carpeta `rules/` o en subcarpetas temáticas (`architecture/`, `performance/`, `testing/`, `sonar/`, `styles/`).
2. Cursor detectará automáticamente las reglas al abrir archivos que coincidan con `globs`.
3. Si quieres ajustar una regla, edita su archivo `.mdc` y cambia el `Frontmatter` o el contenido.

---

## ✅ Buenas prácticas

- Mantén esta carpeta bajo control de versiones (`git`).
- Organiza las reglas por carpetas temáticas para mayor claridad:
  - `architecture/` → Reglas de estructura de proyecto y buenas prácticas Angular.
  - `performance/` → Optimización de rendimiento y mejores prácticas de detección de cambios.
  - `testing/` → Cobertura, Jest y calidad de pruebas.
  - `sonar/` → Reglas alineadas con estándares de calidad de SonarQube.
  - `styles/` → Convenciones de estilos como BEM, nesting y estructura de SCSS.
- Complementa las reglas con linters (`ESLint` para TypeScript, `Stylelint` para SCSS) y formateadores (`Prettier`) para máxima consistencia.

---

## 📌 Reglas incluidas

### 🏗️ **Architecture**

- **Delegar lógica a servicios:** Evita lógica de negocio en componentes de `containers/`.
- **Usar OnPush:** Activa `ChangeDetectionStrategy.OnPush` para optimizar rendimiento.
- **No acceso directo al DOM:** Usa `Renderer2` o `ElementRef` en lugar de `document.querySelector`.

### 🚀 **Performance**

- **Lazy Loading:** Divide módulos grandes para cargarlos bajo demanda.
- **Preferir async pipe:** Evita subscribes manuales en componentes.

### 🧪 **Testing**

- **Enforce spec files:** Verifica que cada componente tenga su `.spec.ts`.
- **Buenas prácticas Jest:** Valida estructura, mocks y spies.
- **No tests skip:** Evita `it.skip` y `describe.skip`.

### ✅ **Sonar**

- **Cobertura mínima:** Mantén cobertura mínima de tests según SonarQube.
- **Longitud de funciones:** Divide funciones extensas para reducir deuda técnica.
- **Duplicación de código:** Factoriza bloques repetidos.
- **Complejidad cognitiva:** Mantén funciones con baja complejidad para fácil mantenimiento.

### 🎨 **Styles**

- **Convención BEM:** Usa `Block__Element--Modifier` para nombrar clases CSS.
- **Un bloque por archivo:** Mantén un bloque BEM por archivo SCSS.
- **Limitar nesting:** No anidar selectores SCSS más de 2 niveles.

---

## ⚡ Recomendación extra

- Puedes adaptar `type: comment` o `type: lint` según el nivel de automatización que desees.
- Usa estos recordatorios como complemento a **herramientas reales** de linting y análisis (ESLint, Stylelint, SonarQube).

---

¡A programar limpio y organizado con Angular + Cursor! 🚀✨
