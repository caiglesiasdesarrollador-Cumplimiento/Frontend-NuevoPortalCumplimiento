```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbListModule
  import { LibTbListModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbListModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbList desde la librería tech-block-lib
import { ILibTbList } from 'tech-block-lib';
@Component()
export class TestComponent {
    listCustom: ILibTbList = {
        dataQaId: 'dataId',
        // name: 'terms',
        // class: 'custom__class',
        // checkboxIcon: 'fa fa-check-circle',
        ngModel: ['Ok'],
        // id: 'terms',
        // icon: 'fa fa-user',
        label: 'Acepto los términos',
        // description: 'Descripción',
        value: 'Ok',
        // disabled: false,
        // binary: true,
        // view: true,
        // formGroup: this.form,
        libTbChange: e => {
            console.log(e);
        }
    }

}
```

```html
<lib-tb-list [custom]="listCustom"></lib-tb-list>
<!-- USO DE [(ngModel)] -->
<lib-tb-list [(ngModel)]="variable" [custom]="listCustom"></lib-tb-list>
```
