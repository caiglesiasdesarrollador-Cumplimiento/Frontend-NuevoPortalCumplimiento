```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbProgressBarModule
  import { LibTbProgressBarModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbProgressBarModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbProgressBar desde la librería tech-block-lib
import { ILibTbProgressBar } from 'tech-block-lib';
@Component()
export class TestComponent {
    progressBarCustom: ILibTbProgressBar = {
        value: 100,
        unit: '-',
        // infinite: true,
        // showValue: false,
        color: 'success',
        // style: { height: '6px' },
        // class: 'class__custom'
    }
}
```

```html
<lib-tb-progress-bar [custom]="progressBarCustom"></lib-tb-progress-bar>
```
