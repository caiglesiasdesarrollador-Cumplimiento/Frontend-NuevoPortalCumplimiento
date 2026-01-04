# Interceptor de Autorización - Tech Block

## 🎯 **Descripción**

El interceptor de autorización (`AuthInterceptor`) se encarga automáticamente de:
- ✅ Inyectar el token de autorización en las peticiones HTTP
- ✅ Verificar la expiración del token antes de cada petición
- ✅ Manejar errores de autenticación (401, 403)
- ✅ Excluir URLs que no requieren autenticación

## 📋 **Configuración Automática**

El interceptor está configurado automáticamente en `app.module.ts` y se aplicará a **todas** las peticiones HTTP realizadas con `HttpClient`.

### **URLs Excluidas (No incluyen token):**
- `/auth/login`
- `/auth/register` 
- `/auth/refresh`
- `/public`
- `assets/`

### **URLs Incluidas (Incluyen token automáticamente):**
- `/api/`
- `/v1/`
- `/secure/`

## 💡 **Uso Básico**

### **1. Login y Guardar Token:**
```typescript
import { AuthService } from '../shared/services/auth.service';

// En tu componente de login
constructor(private authService: AuthService) {}

login() {
  const credentials = { email: 'user@example.com', password: 'password' };
  
  this.authService.login(credentials).subscribe({
    next: (response) => {
      console.log('Login exitoso');
      // El token se guarda automáticamente
      // Futuras peticiones incluirán el token automáticamente
    },
    error: (error) => {
      console.error('Error en login:', error);
    }
  });
}
```

### **2. Peticiones Protegidas (Automáticas):**
```typescript
import { HttpClient } from '@angular/common/http';

// En cualquier servicio
constructor(private http: HttpClient) {}

// ✅ Esta petición incluirá automáticamente el header Authorization
getUserData() {
  return this.http.get('/api/user/profile');
  // Headers automáticos: Authorization: Bearer <token>
}

// ✅ Esta petición también incluirá el token automáticamente
updateUser(userData: any) {
  return this.http.put('/api/user/profile', userData);
  // Headers automáticos: Authorization: Bearer <token>
}
```

### **3. Logout y Limpiar Token:**
```typescript
logout() {
  this.authService.logout().subscribe({
    next: () => {
      console.log('Logout exitoso');
      // Token eliminado automáticamente
      // Futuras peticiones no incluirán token
    }
  });
}
```

## 🔧 **AuthTokenService - Métodos Disponibles**

```typescript
import { AuthTokenService } from '../shared/services/auth-token.service';

constructor(private authTokenService: AuthTokenService) {}

// ✅ Verificar si hay token válido
hasValidToken(): boolean

// ✅ Obtener token actual
getToken(): string | null

// ✅ Verificar si token expiró
isTokenExpired(): boolean

// ✅ Tiempo restante en segundos
getTimeUntilExpiry(): number

// ✅ Limpiar todos los tokens
clearAuthData(): void

// ✅ Guardar token manualmente
setToken(token: string): void

// ✅ Guardar datos completos del token
setTokenData(tokenData: IAuthToken): void
```

## 🛡️ **Manejo de Errores Automático**

El interceptor maneja automáticamente:

### **Error 401 (No Autorizado):**
- ❌ Token inválido o expirado
- 🗑️ Token eliminado automáticamente del localStorage
- 📝 Log de error en consola

### **Error 403 (Prohibido):**
- ❌ Sin permisos suficientes  
- 📝 Log de error en consola

### **Error 0 (Sin Conexión):**
- ❌ No se pudo conectar al servidor
- 📝 Log de error en consola

## 📊 **Estados de Autenticación**

```typescript
import { AuthService } from '../shared/services/auth.service';

constructor(private authService: AuthService) {}

ngOnInit() {
  // ✅ Suscribirse a cambios de autenticación
  this.authService.isAuthenticated$.subscribe(isAuth => {
    if (isAuth) {
      console.log('Usuario autenticado');
    } else {
      console.log('Usuario no autenticado');
    }
  });
}
```

## 🔄 **Refresh Token (Opcional)**

```typescript
// El AuthService incluye soporte para refresh tokens
refreshToken() {
  this.authService.refreshToken().subscribe({
    next: () => {
      console.log('Token refrescado automáticamente');
    },
    error: (error) => {
      console.error('Error al refrescar token:', error);
      // Redirigir a login
    }
  });
}
```

## ⚙️ **Configuración Personalizada**

Si necesitas modificar las URLs incluidas/excluidas, edita `auth.interceptor.ts`:

```typescript
private readonly config: IAuthInterceptorConfig = {
  headerName: 'Authorization',
  tokenPrefix: 'Bearer',
  excludedUrls: [
    '/auth/login',
    '/auth/register',
    '/public',
    'assets/',
    // ✅ Agregar más URLs que NO necesiten token
  ],
  includedUrls: [
    '/api/',
    '/v1/',
    '/secure/',
    // ✅ Agregar más URLs que SÍ necesiten token
  ],
};
```

## 🚀 **Beneficios**

✅ **Automático**: No necesitas agregar headers manualmente  
✅ **Seguro**: Verifica expiración antes de cada petición  
✅ **Flexible**: Configurable qué URLs incluir/excluir  
✅ **Robusto**: Manejo automático de errores de autenticación  
✅ **Eficiente**: Solo intercepta las peticiones necesarias  

## 📝 **Ejemplo Completo - Login Flow**

```typescript
// 1. Login
this.authService.login(credentials).subscribe(response => {
  // Token guardado automáticamente
});

// 2. Petición protegida (automática)
this.http.get('/api/protected/data').subscribe(data => {
  // Authorization header agregado automáticamente
});

// 3. Logout  
this.authService.logout().subscribe(() => {
  // Token eliminado automáticamente
});
```

**¡El interceptor funciona completamente automático!** 🎯 