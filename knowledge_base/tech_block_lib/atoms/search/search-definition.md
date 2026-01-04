```typescript
// Componente LibTbSearchComponent creado y exportado desde la librería tech-block-lib
import { ILibTbSearch } from './search.interface';
@Component({
  selector: 'lib-tb-search',
  templateUrl: './search.component.html'
})
export class LibTbSearchComponent {
    // custom: ILibTbSearch, es el único @Input() que tiene definido el componente lib-tb-search
  @Input() custom: ILibTbSearch = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbSearch
}
```

```typescript
// Modulo donde se declara y se exporta LibTbSearchComponent
import { LibTbSearchComponent } from './search.component';
@NgModule({
  declarations: [LibTbSearchComponent],
  exports: [LibTbSearchComponent, ...],
  ...
})
export class LibTbSearchModule {}
```
