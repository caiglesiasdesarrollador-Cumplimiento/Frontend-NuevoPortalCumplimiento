```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbRadioButtonModule
  import { LibTbRadioButtonModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbRadioButtonModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbRadioButton desde la librería tech-block-lib
import { ILibTbRadioButton } from 'tech-block-lib';
@Component()
export class testComponent {
    radioButtonCustom: ILibTbRadioButton = {
        name: 'sexo',
        value: 'hombre',
        label: 'Hombre',
        // disabled: true,
        inputId: 'hombre',
        // style: { height: '25px', width: '25px' },
        // class: 'class__custom',
        // ngModel: 'hombre',
        libTbClick: e => {
            console.log(e);
        },
        libTbFocus: e => {
            console.log(e);
        },
        libTbBlur: e => {
            console.log(e);
        },
    }
}
```

```html
<lib-tb-radio-button [custom]="radioButtonCustom"></lib-tb-radio-button>
<!-- USO DE [(ngModel)] -->
<lib-tb-radio-button [(ngModel)]="variable" [custom]="radioButtonCustom"></lib-tb-radio-button>
```
