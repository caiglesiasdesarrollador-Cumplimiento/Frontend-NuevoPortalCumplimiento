```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbSnackbarModule
  import { LibTbSnackbarModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbSnackbarModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbSnackbar desde la librería tech-block-lib
import { ILibTbSnackbar } from 'tech-block-lib';
@Component()
export class TestComponent {
    snackbarCustom: ILibTbSnackbar = {
        orientation: 'vertical',
        class: 'snackbar-custom',
        message:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo perferendis qui voluptatem numquam, officia minima.',
        // style: { bottom: '50px' },
        libTbButton: {
            label: 'Cerrar',
            libTbClick: () => {
                this.customSnackbar.show = false;
            },
        }
    }
}
```

```html
<lib-tb-snackbar [custom]="snackbarCustom"></lib-tb-snackbar>
```
