```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbProgressSpinnerModule
  import { LibTbProgressSpinnerModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbProgressSpinnerModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbProgressSpinner desde la librería tech-block-lib
import { ILibTbProgressSpinner } from 'tech-block-lib';
@Component()
export class TestComponent {
    progressSpinnerCustom: ILibTbProgressSpinner = {
        value: 75,
        animationDuration: '2s',
        infinite: true,
        strokeWidth: 3,
        // style: { height: '96px', width: '96px' },
        class: 'spinner-cc',
        icon: 'fa fa-flag',
        // img: {
        //   src: 'src-img',
        //   alt: 'Prueba',
        //   defaultWidth: 80,
        //   defaultHeight: 80,
        // },
        text: {
            body: 'Body',
            label: 'Label',
        },
        libTbClick: e => {
            console.log('Click en spinner', e);
        },
    }
}
```

```html
<lib-tb-progress-spinner [custom]="progressSpinnerCustom"></lib-tb-progress-spinner>
```
