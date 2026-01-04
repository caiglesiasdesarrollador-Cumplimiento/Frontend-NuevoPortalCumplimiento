```typescript
// Componente LibTbFileUploadFieldComponent creado y exportado desde la librería tech-block-lib
import { ILibTbFileUploadField } from './file-upload-field.interface';
@Component({
  selector: 'lib-tb-file-upload-field',
  templateUrl: './file-upload-field.component.html'
})
export class LibTbFileUploadFieldComponent {
    // custom: ILibTbFileUploadField, es el único @Input() que tiene definido el componente lib-tb-file-upload-field
  @Input() custom: ILibTbFileUploadField = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbFileUploadField
}
```

```typescript
// Modulo donde se declara y se exporta LibTbFileUploadFieldComponent
import { LibTbFileUploadFieldComponent } from './file-upload-field.component';
@NgModule({
  declarations: [LibTbFileUploadFieldComponent],
  exports: [LibTbFileUploadFieldComponent, ...],
  ...
})
export class LibTbFileUploadFieldModule {}
```
