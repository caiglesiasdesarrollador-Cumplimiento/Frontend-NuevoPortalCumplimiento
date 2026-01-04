```typescript
  /** MÓDULO */
  import { LibTbButtonModule } from 'tech-block-lib';

  @NgModule({
    // ..
    imports: [
      LibTbButtonModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbButton desde la librería tech-block-lib
import { ILibTbButton } from 'tech-block-lib';
@Component()
export class testComponent {
    buttonCustom: ILibTbButton = {
        label: 'Cancelar',
        ..., // otros atributos de la interface ILibTbButton
        libTbClick: (e) => {
        console.log('Evento clic en el botón', e)
        }
    }
}
```

```html
<!-- HTML -->
<lib-tb-button [custom]="buttonCustom"></lib-tb-button>
```
