```typescript
// Componente LibTbUploadingFileComponent creado y exportado desde la librería tech-block-lib
import { ILibTbUploadingFile } from './uploading-file.interface';
@Component({
  selector: 'lib-tb-uploading-file',
  templateUrl: './uploading-file.component.html'
})
export class LibTbUploadingFileComponent {
    // custom: ILibTbUploadingFile, es el único @Input() que tiene definido el componente lib-tb-uploading-file
  @Input() custom: ILibTbUploadingFile = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbUploadingFile
}
```

```typescript
// Modulo donde se declara y se exporta LibTbUploadingFileComponent
import { LibTbUploadingFileComponent } from './uploading-file.component';
@NgModule({
  declarations: [LibTbUploadingFileComponent],
  exports: [LibTbUploadingFileComponent, ...],
  ...
})
export class LibTbUploadingFileModule {}
```
