# Reglas de Arquitectura para Tech-Block-Lib

Este directorio contiene las reglas de arquitectura para el uso consistente de tech-block-lib en formularios dinámicos.

## 🎨 **Integración con Reglas BEM**

Todas las reglas de formularios dinámicos están **integradas con las reglas BEM** ubicadas en `.cursor/rules/styles/`:

- ✅ **BEM Naming Convention**: `Block__Element--Modifier`
- ✅ **Limit SCSS Nesting**: Máximo 2-3 niveles de anidamiento
- ✅ **One Block per File**: Un bloque BEM por archivo SCSS

Las reglas BEM se aplican **automáticamente** (`alwaysApply: true`) a todos los archivos `.scss`, `.css` y `.html`.

## 🚫 **Regla Crítica: No Modificar Tech-Block-Lib**

**NUNCA** modifiques los estilos nativos de componentes tech-block-lib. Usa las propiedades definidas en las interfaces y variables CSS de tema cuando sea necesario:

### **Jerarquía de personalización:**

1. ✅ **PRIMERO**: Propiedades nativas (`styleBtn`, `typeBtn`, `iconPosition`)
2. ✅ **SI ES NECESARIO**: Variables CSS de forma (solo cuando el usuario lo solicite)
3. ❌ **PROHIBIDO**: Variables CSS de colores, `::ng-deep`, modificadores arbitrarios

### **Variables CSS permitidas/prohibidas:**

- ✅ **Forma y dimensiones**: `border-radius`, `height`, `border-width`, `min-width`
- ❌ **Colores**: `bg`, `color`, `border-color`, estados de color (`hover`, `focus`, etc.)
- ❌ **Tipografía**: `font-size`, `font-family`, `font-weight` (preservar sistema tipográfico)

### **Aplicación en Formularios:**

- **Login**: `.login`, `.login__actions`, `.login--mobile`
- **Formularios simples**: `.form`, `.form__actions`, `.form--mobile`
- **Formularios stepper**: `.stepper-form`, `.stepper-form__content`, `.stepper-form__step`, `.stepper-form__actions`

## 📋 Reglas Disponibles

### 1. **Organización de Contenedores** (`dynamic-form-containers.mdc`)

- **Propósito**: Organizar componentes usando `configContainers` y `containerId`
- **Cuándo usar**: En **todos** los formularios dinámicos
- **Beneficios**: Separación lógica, estilos independientes, HTML semántico

### 2. **Formularios Dinámicos Simples** (`simple-dynamic-form-structure.mdc`)

- **Propósito**: Estructura para formularios de **un solo paso** sin stepper
- **Cuándo usar**: Formularios simples, contacto, login, configuraciones básicas
- **Características**: Un solo `ILibTbDynamicForm`, botones Submit/Reset

### 3. **Formularios Dinámicos con Stepper** (`stepper-dynamic-form-structure.mdc`)

- **Propósito**: Estructura para formularios **multi-paso** con navegación
- **Cuándo usar**: Formularios complejos, registros, wizards, onboarding
- **Características**: Múltiples `ILibTbDynamicForm`, navegación entre pasos

### 4. **Integración Stepper** (`stepper-dynamic-form-integration.mdc`)

- **Propósito**: Patrón específico de integración `lib-tb-stepper` + `lib-tb-dynamic-form`
- **Cuándo usar**: Complementa la regla #3 con detalles técnicos de implementación
- **Características**: Validación por pasos, combinación de datos

## 🎯 Decisión de Arquitectura: ¿Qué Regla Seguir?

### **Formulario Simple** → Regla #2 + #1

```
✅ Una sola vista/paso
✅ Información directa sin navegación
✅ Casos: contacto, login, filtros, feedback
```

### **Formulario Multi-paso** → Regla #3 + #4 + #1

```
✅ Múltiples pasos con navegación
✅ Validación progresiva
✅ Casos: registro, configuración compleja, wizards
```

## 📦 Módulos Requeridos por Tipo

### **Formularios Simples**

```typescript
import {
  LibTbDynamicFormModule,  // ✅ Formularios dinámicos
  LibTbButtonModule        // ✅ Botones Submit/Reset
} from 'tech-block-lib';
```

### **Formularios con Stepper**

```typescript
import {
  LibTbDynamicFormModule,  // ✅ Formularios dinámicos
  LibTbStepperModule,      // ✅ Navegación entre pasos
  LibTbButtonModule        // ✅ Botones de navegación
} from 'tech-block-lib';
```

## 📁 Ejemplo de Estructura de Proyecto

```
src/app/containers/
├── contacto-form/                    # 📝 Formulario simple
│   ├── configs/
│   │   ├── nombre.ts
│   │   ├── email.ts
│   │   └── contacto-form.config.ts   # Config principal
│   ├── contacto-form.component.ts    # Un dynamicForm
│   └── contacto-form.component.html  # Sin stepper
│
└── registro-stepper/                 # 🔄 Formulario multi-paso
    ├── configs/
    │   ├── config-step-1/            # 📂 Configuraciones paso 1
    │   │   ├── nombre.ts
    │   │   ├── email.ts
    │   │   └── step1-personal.config.ts
    │   └── config-step-2/            # 📂 Configuraciones paso 2
    │       ├── pais.ts
    │       ├── ciudades.ts
    │       └── step2-ubicacion.config.ts
    ├── registro-stepper.component.ts  # step1Form + step2Form
    └── registro-stepper.component.html # Con stepper
```

## 🚦 Checklist de Implementación

### **Para Formularios Simples:**

- [ ] Seguir estructura de carpetas (Regla #2)
- [ ] Usar configContainers para organización (Regla #1)
- [ ] Un solo `ILibTbDynamicForm`
- [ ] Métodos `submitForm()` y `resetForm()`
- [ ] Importar módulos básicos

### **Para Formularios Multi-paso:**

- [ ] Seguir estructura de stepper (Regla #3)
- [ ] Usar configContainers por paso (Regla #1)
- [ ] Organizar configs en carpetas `config-step-X/`
- [ ] Un `ILibTbDynamicForm` por paso
- [ ] Configurar `ILibTbStepper` con navegación (Regla #4)
- [ ] Implementar validación por pasos
- [ ] Importar módulos con stepper

### **⭐ Mejora de Organización para Steppers:**

**Estructura mejorada por carpetas de paso:**

```
configs/
├── config-step-1/     # ✅ Todos los configs del paso 1
├── config-step-2/     # ✅ Todos los configs del paso 2
└── config-step-N/     # ✅ Escalable a N pasos
```

**Beneficios:**

- 🎯 **Claridad**: Cada paso autocontenido en su carpeta
- 📈 **Escalabilidad**: Fácil agregar pasos sin saturar directorios
- 🤝 **Colaboración**: Equipos pueden trabajar en pasos independientes
- 🔍 **Mantenimiento**: Localización rápida de configs específicos

## 🔄 Migración entre Tipos

### **Simple → Multi-paso:**

1. Separar config en pasos (`step1-*.config.ts`, `step2-*.config.ts`)
2. Agregar `ILibTbStepper` configuration
3. Implementar métodos de navegación (`nextStep()`, `previousStep()`)
4. Actualizar template con renderizado condicional
5. Importar `LibTbStepperModule`

### **Multi-paso → Simple:**

1. Combinar configs de pasos en una sola config principal
2. Remover lógica de stepper
3. Simplificar template a un solo formulario
4. Remover `LibTbStepperModule`

## 📚 Contribución

Al agregar nuevas funcionalidades:

1. **Evalúa el tipo**: ¿Es formulario simple o multi-paso?
2. **Sigue la regla correspondiente**: Usa la estructura establecida
3. **Mantén consistencia**: Usa los mismos patrones de nomenclatura
4. **Documenta excepciones**: Si no puedes seguir una regla, documenta por qué

## 🎯 Resumen Ejecutivo

| Tipo           | Reglas       | Módulos                    | Casos de Uso                  |
| -------------- | ------------ | -------------------------- | ----------------------------- |
| **Simple**     | #1 + #2      | Dynamic + Button           | Contacto, Login, Filtros      |
| **Multi-paso** | #1 + #3 + #4 | Dynamic + Stepper + Button | Registro, Wizards, Onboarding |

**Principio clave**: Empieza simple, evoluciona a multi-paso solo cuando sea necesario para la UX.
