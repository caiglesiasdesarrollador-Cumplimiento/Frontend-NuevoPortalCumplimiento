```typescript
// Componente LibTbTableComponent creado y exportado desde la librería tech-block-lib
import { ILibTbTable } from './table.interface';
@Component({
  selector: 'lib-tb-table',
  templateUrl: './table.component.html'
})
export class LibTbTableComponent {
    // custom: ILibTbTable, es el único @Input() que tiene definido el componente lib-tb-table
  @Input() custom: ILibTbTable = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbTable
}
```

```typescript
// Modulo donde se declara y se exporta LibTbTableComponent
import { LibTbTableComponent } from './table.component';
@NgModule({
  declarations: [LibTbTableComponent],
  exports: [LibTbTableComponent, ...],
  ...
})
export class LibTbTableModule {}
```
