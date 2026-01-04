```typescript
// Componente LibTbProgressSpinnerComponent creado y exportado desde la librería tech-block-lib
import { ILibTbProgressSpinner } from './progress-spinner.interface';
@Component({
  selector: 'lib-tb-progress-spinner',
  templateUrl: './progress-spinner.component.html'
})
export class LibTbProgressSpinnerComponent {
    // custom: ILibTbProgressSpinner, es el único @Input() que tiene definido el componente lib-tb-progress-spinner
  @Input() custom: ILibTbProgressSpinner = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbProgressSpinner
}
```

```typescript
// Modulo donde se declara y se exporta LibTbProgressSpinnerComponent
import { LibTbProgressSpinnerComponent } from './progress-spinner.component';
@NgModule({
  declarations: [LibTbProgressSpinnerComponent],
  exports: [LibTbProgressSpinnerComponent, ...],
  ...
})
export class LibTbProgressSpinnerModule {}
```
