```typescript
// Componente LibTbCheckboxComponent creado y exportado desde la librería tech-block-lib
import { ILibTbCheckbox } from './checkbox.interface';
@Component({
  selector: 'lib-tb-checkbox',
  templateUrl: './checkbox.component.html'
})
export class LibTbCheckboxComponent {
    // custom: ILibTbCheckbox, es el único @Input() que tiene definido el componente lib-tb-checkbox
  @Input() custom: ILibTbCheckbox = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbCheckbox
}
```

```typescript
// Modulo donde se declara y se exporta LibTbCheckboxComponent
import { LibTbCheckboxComponent } from './checkbox.component';
@NgModule({
  declarations: [LibTbCheckboxComponent],
  exports: [LibTbCheckboxComponent, ...],
  ...
})
export class LibTbCheckboxModule {}
```
