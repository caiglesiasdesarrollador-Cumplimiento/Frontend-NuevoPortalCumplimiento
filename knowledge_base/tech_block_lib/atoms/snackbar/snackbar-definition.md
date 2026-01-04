```typescript
// Componente LibTbSnackbarComponent creado y exportado desde la librería tech-block-lib
import { ILibTbSnackbar } from './snackbar.interface';
@Component({
  selector: 'lib-tb-snackbar',
  templateUrl: './snackbar.component.html'
})
export class LibTbSnackbarComponent {
    // custom: ILibTbSnackbar, es el único @Input() que tiene definido el componente lib-tb-snackbar
  @Input() custom: ILibTbSnackbar = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbSnackbar
}
```

```typescript
// Modulo donde se declara y se exporta LibTbSnackbarComponent
import { LibTbSnackbarComponent } from './snackbar.component';
@NgModule({
  declarations: [LibTbSnackbarComponent],
  exports: [LibTbSnackbarComponent, ...],
  ...
})
export class LibTbSnackbarModule {}
```
