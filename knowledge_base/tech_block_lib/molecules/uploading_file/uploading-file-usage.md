```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbUploadingFileModule
  import { LibTbUploadingFileModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbUploadingFileModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbUploadingFile desde la librería tech-block-lib
import { ILibTbUploadingFile } from 'tech-block-lib';
@Component()
export class TestComponent {
    uploadingFileCustom: ILibTbUploadingFile = {
        dataQaId: 'dataQaid',
        fileName: 'Nombre archivo',
        progress: 0,
        iconCaption: {
            errorIcon: 'fa fa-times',
            successIcon: 'fa fa-o',
            uploadedIcon: 'fa fa-circle',
            uploadingIcon: 'fa fa-rotate-right'
        },
        // haveError: false,
        // progressBarIcon: {
        //   error: 'fa fa-times',
        //   uploaded: 'fa fa-circle',
        //   uploading: 'fa fa-rotate-right'
        // },
        // textCaption: {
        //   error: 'Ha ocurrido un error',
        //   uploaded: 'El archivo ha sido cargado',
        //   uploading: 'El archivo se esta subiendodo'
        // },
        // style: {'witdh':'20px'},
        // class: 'uploading-file-jelpit',
        // minIconCaption: {
            // cancelMinIcon: 'fa fa-times'
        // },
        libTbOnCancel: c => console.log(c),
        libTbOnDelete: c => console.log('Eliminar: ',c),
        libTbOnReload: () => this.newFile(),
    }
}
```

```html
<lib-tb-uploading-file [custom]="uploadingFileCustom"></lib-tb-uploading-file>
```
