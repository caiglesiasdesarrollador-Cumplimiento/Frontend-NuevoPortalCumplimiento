# Development Rules / Reglas de Desarrollo

Esta carpeta contiene reglas relacionadas con **errores comunes de desarrollo** y **buenas prácticas de TypeScript** que previenen problemas recurrentes durante el desarrollo.

## 📁 Archivos incluidos:

### `typescript-common-errors.mdc`
**Regla preventiva** para evitar errores frecuentes de TypeScript que rompen la compilación y causan problemas de desarrollo.

**Errores que previene:**
- ✅ **Imports incorrectos**: Validators de 'tech-block-lib' en lugar de '@angular/forms'
- ✅ **Imports no utilizados**: Variables importadas pero nunca usadas
- ✅ **Propiedades inexistentes**: dataQaId en interfaces donde no corresponde
- ✅ **Tipos mal escritos**: ILibTbDynamicFormConfig vs ILibTbDynamicFormConfigType
- ✅ **Variables no utilizadas**: Propiedades declaradas pero nunca referenciadas

**Características:**
- ✅ Guía completa de imports por librería (Angular, RxJS, tech-block-lib)
- ✅ Soluciones específicas para cada tipo de error
- ✅ Templates de corrección rápida
- ✅ Checklist de verificación antes de commit
- ✅ Configuración recomendada de VSCode/IDE

## 🎯 Objetivo

**Prevenir errores de compilación** y **mejorar la productividad** del desarrollo evitando problemas recurrentes que rompen el build y requieren debugging innecesario.

## 📋 Cómo usar

### **Durante desarrollo:**
1. **Antes de crear imports** → Consultar guía de librerías correctas
2. **Después de escribir código** → Verificar que todos los imports se usan
3. **Al usar interfaces** → Verificar propiedades válidas
4. **Antes de commit** → Ejecutar `ng build` para detectar errores

### **Para resolución rápida:**
1. **Error de import** → Buscar la librería correcta en la guía
2. **Import no usado** → Eliminar o usar inmediatamente
3. **Propiedad inexistente** → Verificar documentación de la interfaz
4. **Tipo mal escrito** → Usar nombres exactos de tech-block-lib

## ⚠️ Nota importante

Estas reglas fueron creadas basándose en **errores reales** encontrados durante el desarrollo. Son **100% prevenibles** con verificación adecuada y seguimiento de las guías establecidas.

## 🔧 Comandos útiles

```bash
# Detectar errores de compilación
ng build --configuration development

# Detectar problemas de linting
ng lint --fix

# Organizar imports automáticamente (VSCode)
Shift + Alt + O
```

## 📚 Resumen

| Tipo de Error | Prevención | Comando de Verificación |
|-------|-------|-------|
| **Imports incorrectos** | Consultar guía de librerías | `ng build` |
| **Imports no usados** | Organizar imports regularmente | `ng lint` |
| **Propiedades inexistentes** | Verificar interfaces antes de usar | `ng build` |
| **Tipos mal escritos** | Copy-paste nombres exactos | `ng build` |
| **Variables no usadas** | Code review antes de commit | `ng lint` |

**REGLA DE ORO**: Siempre ejecutar `ng build --configuration development` antes de hacer commit para detectar errores temprano. 