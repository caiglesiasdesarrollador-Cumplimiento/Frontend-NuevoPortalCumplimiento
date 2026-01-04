# bolivar-core-template-frontend

## Instalación e Inicialización

Versión de `node` requerida:

```bash
  18.20.7
```

Para iniciar el proyecto se debe realizar la instalación de las dependencias de **npm**

```bash
  npm install
```

Posteriormente puede lanzar el proyecto usando el comando:

```bash
  npm run start
```

### 🔧 Solución de Errores de Watchpack (Windows)

Si experimentas errores de Watchpack como:

```
Watchpack Error (stats): Error: EINVAL: invalid argument, lstat 'C:\System Volume Information'
```

**Solución rápida:**

```bash
# Opción 1: Usar el script de limpieza (PowerShell)
.\scripts\clean-watchpack.ps1

# Opción 2: Limpiar manualmente
npm run serve:clean

# Opción 3: Reiniciar con polling
npm run serve
```

**Configuraciones aplicadas:**

- ✅ Exclusiones de directorios del sistema en `angular.json`
- ✅ Configuración de polling para evitar errores de archivos
- ✅ Scripts optimizados en `package.json`

Si se desea correr las pruebas unitarias del código de la librería, puede ejecutar el comando:

```bash
  npm run test
```

## Environments

El archivo `/src/environments/environment.ts` es creado a partir del archivo `.env` que localmente se debe tener en la carpeta raíz, para poder ejecutar la aplicación con el script `npm run start`, de lo contrario se generará el archivo `environment.ts` con valores `undefined`.

Los dos archivos tanto `environment.ts` y `.env`, se deben ignorar en el archivo `.gitignore` por cuestión de seguridad.

Al ejecutar el comando `npm run | build:dev | build:stage | build:prod`, se activa el script `npm run config:env:dev | npm run config:env:stage | npm run config:env:prod`, según sea el caso, donde se ejecuta una porción de código nodejs del archivo `/src/app/core/setenv.config.ts`, que ayuda en la generación de la carpeta `/src/environments/` y el archivo `environment.ts`, a partir del `.env`, usando `dotenv`. Luego se ejecuta el script correspondiente al build del ambiente y se construye la app.

Antes de hacer el despligue en algún ambiente, es necesario tener configuradas las variables de entorno en el repositorio de terraform del proyecto y las mismas configuradas en el archivo `WorkflowFile.json`. Tambíen en el archivo `/src/app/core/setenv.config.ts` según se hayan nombrado en el `WorkflowFile.json`.

Cuando se despliega la aplicación por medio de github actions, se crea el archivo `.env` a partir de la configuración de `environments` del archivo `WorkflowFile.json`.

A continuación un ejemplo del archivo `WorkflowFile.json`:

```json
    "environments": {
        "dev": {
            "apiUrl": "/projectName/dev/environment/front/apiUrlFront",
            ...
        },
        "stage":{
            "apiUrl": "/projectName/stage/environment/front/apiUrlFront",
            ...
        },
        "prod":{
            "apiUrl": "/projectName/prod/environment/front/apiUrlFront",
            ...
        }
    }
```

A continuación un ejemplo del archivo `setenv.config.ts`:

```typescript
    // we have access to our environment variables
    // in the process.env object thanks to dotenv
    const environmentFileContent = `
    export const environment = {
        production: ${isProduction},
        apiUrl: '${process.env['apiUrl']}',
        ...
    };
    `;
    ...
```

En el archivo `angular.json` se elimina la configuración de `fileReplacements` para todos los ambientes, ya que no es necesario tener los tres o cuatro archivos de `environment.*.ts`.

Para más información de cómo crear una `nueva variable de entorno` y cómo eliminar el archivo `environment.ts`, remitirse a este documento: [Configuración Environments - Angular](https://docs.google.com/document/d/1FVmakTzDRZPj4A6VcyLdKJWVymZB0NJD3IR0-56Id9Q)
