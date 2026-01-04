```typescript
// Componente LibTbInputTextAreaComponent creado y exportado desde la librería tech-block-lib
import { ILibTbInputTextAreaArea } from './input-text-area.interface';
@Component({
  selector: 'lib-tb-input-text-area',
  templateUrl: './input-text-area.component.html'
})
export class LibTbInputTextAreaComponent extends LibTbAssignmentTemplatesForm {
    // custom: ILibTbInputTextArea, es el único @Input() que tiene el componente lib-tb-input-text-area, para los atributos y eventos del mismo.
    @Input() custom: ILibTbInputTextArea = {};
    ... // No existen @Output() porque los eventos se definen en la interface ILibTbInputTextArea
}
```

```typescript
// Modulo donde se declara y se exporta LibTbInputTextAreaComponent
import { LibTbInputTextAreaComponent } from './input-text-area.component';
@NgModule({
  declarations: [LibTbInputTextAreaComponent],
  exports: [LibTbInputTextAreaComponent, ...],
  ...
})
export class LibTbInputTextAreaModule {}
```
