```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbEmptyMessageModule
  import { LibTbEmptyMessageModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbEmptyMessageModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbEmptyMessage desde la librería tech-block-lib
import { ILibTbEmptyMessage } from 'tech-block-lib';
@Component()
export class TestComponent {
    emptyMessageCustom: ILibTbEmptyMessage = {
        icon: 'fal fa-house',
        word: 'word',
        text1: 'lo sentimos',
        text2: 'no tiene resultados'
    }
}
```

```html
<lib-tb-empty-message [custom]="emptyMessageCustom"></lib-tb-empty-message>
```
