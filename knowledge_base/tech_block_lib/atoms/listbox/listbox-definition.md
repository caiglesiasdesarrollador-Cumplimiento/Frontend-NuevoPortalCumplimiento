```typescript
// Componente LibTbListboxComponent creado y exportado desde la librería tech-block-lib
import { ILibTbListbox } from './listbox.interface';
@Component({
  selector: 'lib-tb-listbox',
  templateUrl: './listbox.component.html'
})
export class LibTbListboxComponent {
    // custom: ILibTbListbox, es el único @Input() que tiene definido el componente lib-tb-listbox
  @Input() custom: ILibTbListbox = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbListbox
}
```

```typescript
// Modulo donde se declara y se exporta LibTbListboxComponent
import { LibTbListboxComponent } from './listbox.component';
@NgModule({
  declarations: [LibTbListboxComponent],
  exports: [LibTbListboxComponent, ...],
  ...
})
export class LibTbListboxModule {}
```
