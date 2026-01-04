```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbFileUploadFieldModule
  import { LibTbFileUploadFieldModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbFileUploadFieldModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbFileUploadField desde la librería tech-block-lib
import { ILibTbFileUploadField } from 'tech-block-lib';
@Component()
export class TestComponent {
    fileUploadFieldCustom: ILibTbFileUploadField = {
        dataQaId: 'dataQaid',
        multiple: true,
        dragDropLabel: 'Arrastra tus archivos aquí',
        avaibleTypes: [
            'image/gif',
            'image/jpg',
            'image/jpeg',
            'image/png',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ],
        maxSize: 500000,
        // length: 3,
        errorText: {
            length: 'El número máximo de archivos permitidos es 3',
            type: 'Tipo de arhivo no permitido',
            maxSize: 'El peso máximo del archivo es 400KB',
            isFileSelected: 'El archivo ya fue seleccionado',
        },
        customAlert: {
            position: 'bottom-center',
        },
        customUploadingFile: {
            textCaption: {
            uploaded: 'Archivo cargado correctamente',
            uploading: 'Cargado archivo...',
            error: 'Ocurrió un error al cargar el archivo',
            },
        },
        //Eventos
        libTbOnCatchFile: console.log,
        libTbOnDeleteFile: console.log,
        libTbOnReloadFile: console.log,
        libTbOnDragEnter: console.log,
        libTbOnDragLeave: console.log,
        libTbOnDrop: console.log,
    }
}
```

```html
<lib-tb-file-upload-field [custom]="fileUploadFieldCustom"></lib-tb-file-upload-field>
```
