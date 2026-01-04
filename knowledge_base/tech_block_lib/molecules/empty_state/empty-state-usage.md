```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbEmptyStateModule
  import { LibTbEmptyStateModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbEmptyStateModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbEmptyState desde la librería tech-block-lib
import { ILibTbEmptyState } from 'tech-block-lib';
@Component()
export class TestComponent {
    emptyStateCustom: ILibTbEmptyState = {
        // style: {'witdh':'20px'},
        class: 'empty-state-jelpit',
        // icon: 'fal fa-globe',
        // src: 'https://www.pictotraductor.com/img/pictogramas/H134617144952.png',
        title: 'Titulo de prueba',
        description: 'Descripción de prueba',
    }
}
```

```html
<lib-tb-empty-state [custom]="emptyStateCustom"></lib-tb-empty-state>
```
