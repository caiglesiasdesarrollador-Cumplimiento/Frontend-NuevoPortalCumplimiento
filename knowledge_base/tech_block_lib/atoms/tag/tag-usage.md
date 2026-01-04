```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbTagModule
  import { LibTbTagModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbTagModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbTag desde la librería tech-block-lib
import { ILibTbTag } from 'tech-block-lib';
@Component()
export class TestComponent {
    tagCustom: ILibTbTag = {
        size: 'large',
        label: 'Info',
        icon: 'fal fa-tag',
        // class: 'custom-class-tag mx-2',
        type: 'info',
        // style: {
        //   color: 'red',
        //   background: 'red',
        //   borderColor: 'var(--primary-400)',
        // },
    }
}
```

```html
<lib-tb-tag [custom]="tagCustom">
  Contenido HTML
</lib-tb-tag>
```
