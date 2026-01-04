```typescript
// Componente LibTbPaginatorComponent creado y exportado desde la librería tech-block-lib
import { ILibTbPaginator } from './paginator.interface';
@Component({
  selector: 'lib-tb-paginator',
  templateUrl: './paginator.component.html'
})
export class LibTbPaginatorComponent {
    // custom: ILibTbPaginator, es el único @Input() que tiene definido el componente lib-tb-paginator
  @Input() custom: ILibTbPaginator = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbPaginator
}
```

```typescript
// Modulo donde se declara y se exporta LibTbPaginatorComponent
import { LibTbPaginatorComponent } from './paginator.component';
@NgModule({
  declarations: [LibTbPaginatorComponent],
  exports: [LibTbPaginatorComponent, ...],
  ...
})
export class LibTbPaginatorModule {}
```
