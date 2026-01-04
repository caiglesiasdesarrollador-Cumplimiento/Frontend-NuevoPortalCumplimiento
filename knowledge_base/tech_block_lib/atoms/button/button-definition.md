```typescript
// Componente LibTbButtonComponent creado y exportado desde la librería tech-block-lib
import { ILibTbButton } from './button.interface';
@Component({
  selector: 'lib-tb-button',
  templateUrl: './button.component.html',
})
export class LibTbButtonComponent {
    // custom: ILibTbButton, es el único @Input() que tiene definido el componente lib-tb-button
  @Input() custom: ILibTbButton = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbButton
}
```

```typescript
// Modulo donde se declara y se exporta LibTbButtonComponent
import { LibTbButtonComponent } from './button.component';
@NgModule({
  declarations: [LibTbButtonComponent],
  exports: [LibTbButtonComponent, ...],
  ...
})
export class LibTbButtonModule {}
```
