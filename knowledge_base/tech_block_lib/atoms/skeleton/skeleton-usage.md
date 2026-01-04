```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbSkeletonModule
  import { LibTbSkeletonModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbSkeletonModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbSkeleton desde la librería tech-block-lib
import { ILibTbSkeleton } from 'tech-block-lib';
@Component()
export class TestComponent {
    skeletonCustom: ILibTbSkeleton = {
        rounded: true,
        // width: '100%',
        // height: '2rem',
        class: 'skeleton-cc block mb-1 mx-auto',
        borderRadius: '5px',
        // animation: 'none',
        size: '5rem',
        // style: { background: 'red' },
    }
}
```

```html
<lib-tb-skeleton [custom]="skeletonCustom"></lib-tb-skeleton>
```
