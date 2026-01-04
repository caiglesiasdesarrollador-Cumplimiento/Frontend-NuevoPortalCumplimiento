```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbCheckboxModule
  import { LibTbCheckboxModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbCheckboxModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbCheckbox desde la librería tech-block-lib
import { ILibTbCheckbox } from 'tech-block-lib';
@Component()
export class testComponent {
    checkboxCustom: ILibTbCheckbox = {
        name: 'terms',
        // class: 'custom__class',
        // checkboxIcon: 'fa fa-check-circle',
        ngModel: ['Ok'],
        id: 'terms',
        label: 'Acepto los términos',
        value: 'Ok',
        disabled: false,
        // binary: true,
        // view: true,
        libTbChange: e => {
            console.log(e);
        }
    }
}
```

```html
<lib-tb-checkbox [custom]="checkboxCustom"></lib-tb-checkbox>
<!-- USO DE [(ngModel)] -->
<lib-tb-checkbox [(ngModel)]="variable" [custom]="checkboxCustom"></lib-tb-checkbox>
```
