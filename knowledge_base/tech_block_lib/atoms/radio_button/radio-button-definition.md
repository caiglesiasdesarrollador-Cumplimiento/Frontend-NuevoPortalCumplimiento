```typescript
// Componente LibTbRadioButtonComponent creado y exportado desde la librería tech-block-lib
import { ILibTbRadioButton } from './radio-button.interface';
@Component({
  selector: 'lib-tb-radio-button',
  templateUrl: './radio-button.component.html'
})
export class LibTbRadioButtonComponent {
    // custom: ILibTbRadioButton, es el único @Input() que tiene definido el componente lib-tb-radio-button
  @Input() custom: ILibTbRadioButton = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbRadioButton
}
```

```typescript
// Modulo donde se declara y se exporta LibTbRadioButtonComponent
import { LibTbRadioButtonComponent } from './radio-button.component';
@NgModule({
  declarations: [LibTbRadioButtonComponent],
  exports: [LibTbRadioButtonComponent, ...],
  ...
})
export class LibTbRadioButtonModule {}
```
