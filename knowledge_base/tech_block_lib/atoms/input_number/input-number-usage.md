```typescript
  /** MÓDULO */
  import { LibTbInputNumberModule } from 'tech-block-lib';

  @NgModule({
    // ..
    imports: [
      LibTbInputNumberModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbInputNumber desde la librería tech-block-lib
import { ILibTbInputNumber } from 'tech-block-lib';
@Component()
export class testComponent {
    inputNumberCustom: ILibTbInputNumber = {
        name: 'price',
        label: 'Precio',
        value: 50000,
        // format: false,
        // showButtons: false,
        // incrementButtonIcon: 'fal fa-plus',
        // decrementButtonIcon: 'fal fa-minus',
        // prefix: 'Estaré ',
        // suffix: ' días',
        // mode: 'currency',
        // currency: 'EUR',
        // currencyDisplay: 'symbol',
        localeMatcher: 'lookup',
        // useGrouping: false,
        // minFractionDigits: 2,
        // maxFractionDigits: 3,
        // min: 10,
        // max: 50,
        step: 10,
        style: { color: 'red' },
        // class: 'custom__class',
        inputId: 'number',
        placeholder: 'Precio',
        // size: 8,
        maxlength: 10,
        // disabled: true,
        required: true,
        // view: true,
        // success: true,
        // error: true,
        caption: true,
        showIconCaption: true,
        captionText: {
            help: 'Texto de ayuda',
            error: 'Texto de error',
            success: 'Texto de éxito',
        },

        libTbFocus: e => {
            console.log(e);
        },
        libTbBlur: e => {
            console.log(e);
        },
        libTbChange: e => {
            console.log(e);
        },
        libTbKeydown: e => {
            console.log(e);
        }
    }
```

```html
<lib-tb-input-number [custom]="inputNumberCustom"></lib-tb-input-number>
<!-- USO DE [(ngModel)] -->
<lib-tb-input-number [(ngModel)]="variable" [custom]="inputNumberCustom"></lib-tb-input-number>
```
