```typescript
// Componente LibTbEmptyStateComponent creado y exportado desde la librería tech-block-lib
import { ILibTbEmptyState } from './empty-state.interface';
@Component({
  selector: 'lib-tb-empty-state',
  templateUrl: './empty-state.component.html'
})
export class LibTbEmptyStateComponent {
    // custom: ILibTbEmptyState, es el único @Input() que tiene definido el componente lib-tb-empty-state
  @Input() custom: ILibTbEmptyState = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbEmptyState
}
```

```typescript
// Modulo donde se declara y se exporta LibTbEmptyStateComponent
import { LibTbEmptyStateComponent } from './empty-state.component';
@NgModule({
  declarations: [LibTbEmptyStateComponent],
  exports: [LibTbEmptyStateComponent, ...],
  ...
})
export class LibTbEmptyStateModule {}
```
