```typescript
// Componente LibTbInputNumberComponent creado y exportado desde la librería tech-block-lib
import { ILibTbInputNumber  } from './input-number.interface';
@Component({
  selector: 'lib-tb-input-number',
  templateUrl: './input-number.component.html'
})
export class LibTbInputNumberComponent extends LibTbAssignmentTemplatesForm {
    // custom: ILibTbInputNumber , es el único @Input() que tiene el componente lib-tb-input-number.
    @Input() custom: ILibTbInputNumber  = {};
    ... // No existen @Output() porque los eventos se definen en la interface ILibTbInputNumber
```

```typescript
// Modulo donde se declara y se exporta LibTbInputNumberComponent
import { LibTbInputNumberComponent } from './input-number.component';
@NgModule({
  declarations: [LibTbInputNumberComponent],
  exports: [LibTbInputNumberComponent, ...],
  ...
})
export class LibTbInputNumberModule {}
```
