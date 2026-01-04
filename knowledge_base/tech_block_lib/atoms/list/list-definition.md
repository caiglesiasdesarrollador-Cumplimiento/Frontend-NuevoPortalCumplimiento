```typescript
// Componente LibTbListComponent creado y exportado desde la librería tech-block-lib
import { ILibTbList } from './list.interface';
@Component({
  selector: 'lib-tb-list',
  templateUrl: './list.component.html'
})
export class LibTbListComponent {
    // custom: ILibTbList, es el único @Input() que tiene definido el componente lib-tb-list
  @Input() custom: ILibTbList = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbList
}
```

```typescript
// Modulo donde se declara y se exporta LibTbListComponent
import { LibTbListComponent } from './list.component';
@NgModule({
  declarations: [LibTbListComponent],
  exports: [LibTbListComponent, ...],
  ...
})
export class LibTbListModule {}
```
