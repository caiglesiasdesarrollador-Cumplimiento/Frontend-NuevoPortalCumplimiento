# 🏗️ Arquitectura del Proyecto - Cumplimiento Digital

## 📋 Resumen Ejecutivo

**Arquitectura:** Layered Architecture + Feature Module Pattern  
**Tipo:** Monolítica Modular (Feature-based)  
**Angular:** v20.3.15  
**Estado:** ✅ Profesional y lista para producción

---

## 🎯 Principios Arquitectónicos

### 1. **Separación de Responsabilidades**
- **Presentation Layer:** Components (UI)
- **Application Layer:** Services (Lógica de negocio)
- **Domain Layer:** Interfaces y Models
- **Infrastructure Layer:** HTTP, Storage

### 2. **Feature Module Pattern**
Cada feature es un módulo independiente con lazy loading.

### 3. **Service Layer Pattern**
Lógica de negocio centralizada en servicios compartidos.

### 4. **Facade Pattern**
Servicios facade para reducir acoplamiento en componentes complejos.

---

## 📁 Estructura del Proyecto

```
src/app/
├── app.module.ts              # ✅ Módulo raíz
├── app-routing.module.ts      # ✅ Rutas principales (Lazy Loading)
│
├── containers/                # ✅ FEATURE MODULES
│   ├── dashboard/            # Feature: Dashboard principal
│   ├── policy-input/         # Feature: Formulario principal (8K líneas - requiere refactor)
│   ├── contract-reader/      # Feature: Lector IA de contratos
│   ├── fake-login/          # Feature: Login simulado (Dev/Stage)
│   ├── redirect/            # Feature: Redirección y carga de Multiclaves
│   └── ... (15+ features)
│
├── shared/                    # ✅ RECURSOS COMPARTIDOS
│   ├── components/           # Componentes UI reutilizables
│   │   ├── header/
│   │   ├── loader/
│   │   ├── notification/
│   │   └── breadcrumb/
│   │
│   ├── services/             # Servicios de negocio
│   │   ├── LoggerService           # ✅ Logging configurable
│   │   ├── SessionService          # ✅ Gestión de sesión
│   │   ├── MulticlavesService      # ✅ COMUNES_007
│   │   ├── TercerosService         # ✅ COMUNES_004
│   │   ├── SarlaftService          # ✅ COMUNES_005
│   │   ├── PolicyInputFacadeService # ✅ Facade Pattern
│   │   └── ... (30+ servicios)
│   │
│   ├── interceptors/         # HTTP Interceptors
│   │   ├── auth.interceptor.ts
│   │   ├── api-key.interceptor.ts
│   │   └── cumplimiento-headers.interceptor.ts
│   │
│   └── interfaces/           # TypeScript Interfaces
│
├── core/                     # ✅ CONFIGURACIÓN CORE
│   └── setenv.config.ts      # Generación de environments
│
├── guards/                   # ✅ GUARDS DE RUTAS
│   ├── auth.guard.ts
│   └── role.guard.ts
│
└── interceptors/             # ✅ INTERCEPTORES GLOBALES
```

---

## 🔄 Flujo de Datos

```
┌─────────────┐
│  Component  │ (Presentation Layer)
└──────┬──────┘
       │
       ↓
┌─────────────┐
│   Facade    │ (Application Layer - Opcional)
│   Service   │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│   Service   │ (Business Logic)
└──────┬──────┘
       │
       ↓
┌─────────────┐
│ Interceptor│ (Cross-cutting: Headers, Auth, API Keys)
└──────┬──────┘
       │
       ↓
┌─────────────┐
│   HTTP API  │ (Infrastructure Layer)
└─────────────┘
```

---

## 🎨 Patrones de Diseño Implementados

### 1. **Feature Module Pattern**
```typescript
// Cada feature es un módulo independiente
containers/policy-input/
├── policy-input.module.ts
├── policy-input-routing.module.ts
└── policy-input.component.ts
```

### 2. **Lazy Loading Pattern**
```typescript
// app-routing.module.ts
{
  path: 'policy-input',
  loadChildren: () => import('./containers/policy-input/...')
    .then(m => m.PolicyInputModule),  // ✅ Carga bajo demanda
}
```

### 3. **Singleton Pattern**
```typescript
@Injectable({
  providedIn: 'root',  // ✅ Singleton en toda la app
})
export class LoggerService { }
```

### 4. **Facade Pattern**
```typescript
// ✅ PolicyInputFacadeService reduce acoplamiento
// De 15+ servicios → 1 facade service
@Injectable({ providedIn: 'root' })
export class PolicyInputFacadeService {
  // Orquesta múltiples servicios
}
```

### 5. **Interceptor Pattern (Middleware)**
```typescript
// Orden de ejecución:
1. CumplimientoHeadersInterceptor  // Headers de proceso
2. ApiKeyInterceptor                // API Keys
3. GCPAccessTokenInterceptor        // Tokens GCP
4. AuthInterceptor                  // Autenticación
```

### 6. **Guard Pattern (Security)**
```typescript
// Protección de rutas
{
  path: 'policy-input',
  canActivate: [AuthGuard],  // ✅ Requiere autenticación
}
```

---

## 📦 Estándares de Componentes

### ✅ Standalone Components (Estándar)
```typescript
@Component({
  selector: 'app-example',
  standalone: true,  // ✅ Estándar único
  imports: [CommonModule, FormsModule],
  templateUrl: './example.component.html',
})
export class ExampleComponent { }
```

### ✅ Feature Modules (Routing)
```typescript
// Solo para routing de componentes standalone
@NgModule({
  imports: [RouterModule.forChild(routes), ExampleComponent],
})
export class ExampleModule {}
```

---

## 🔐 Seguridad

### Variables de Entorno
- ✅ API Keys en variables de entorno (`.env`)
- ✅ `.env` en `.gitignore`
- ✅ Script `setenv.config.ts` para generar environments

### Autenticación
- ✅ Tokens en `localStorage` (práctica estándar Angular)
- ✅ Guards protegen rutas
- ✅ Interceptores agregan headers automáticamente

### Logging
- ✅ Logger configurable por ambiente
- ✅ Desarrollo: todos los logs
- ✅ Producción: solo errores

---

## 🧪 Testing

### Estructura
```
*.component.spec.ts  # Tests de componentes
*.service.spec.ts    # Tests de servicios
```

### Cobertura Actual
- ✅ 22 tests pasando (fake-login)
- ✅ 100% cobertura en fake-login
- ⚠️ Pendiente: aumentar cobertura general

---

## 📊 Métricas de Calidad

| Métrica | Valor | Estado |
|---------|-------|--------|
| Arquitectura | Feature Module | ✅ |
| Lazy Loading | Implementado | ✅ |
| Standalone | Estandarizado | ✅ |
| Logger | Configurable | ✅ |
| API Keys | Variables de entorno | ✅ |
| Tests | 22 pasando | ✅ |
| Archivos backup | Eliminados | ✅ |
| Facade Pattern | Implementado | ✅ |

---

## 🚀 Mejoras Implementadas

### ✅ Completadas
1. **Estandarización:** Todos los componentes migrados a standalone
2. **Facade Pattern:** `PolicyInputFacadeService` creado
3. **Logger:** Sistema configurable implementado
4. **Archivos backup:** 31 archivos eliminados
5. **Variables de entorno:** API Keys configuradas

### ⚠️ Pendientes (Futuro)
1. **Refactorización:** Dividir `policy-input.component.ts` (8K líneas)
2. **Domain Layer:** Agregar modelos de dominio claros
3. **Testing:** Aumentar cobertura general

---

## 📚 Referencias

- **Angular Style Guide:** https://angular.io/guide/styleguide
- **Feature Modules:** https://angular.io/guide/feature-modules
- **Standalone Components:** https://angular.io/guide/standalone-components
- **Lazy Loading:** https://angular.io/guide/lazy-loading-ngmodules

---

## 👥 Mantenimiento

**Última actualización:** Enero 2025  
**Arquitecto:** Equipo de Desarrollo  
**Versión:** 1.0.0
