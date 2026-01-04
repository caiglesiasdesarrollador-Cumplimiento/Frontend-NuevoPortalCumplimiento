```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbSwitchModule
  import { LibTbSwitchModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbSwitchModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbSwitch desde la librería tech-block-lib
import { ILibTbSwitch } from 'tech-block-lib';
@Component()
export class testComponent {
    switchCustom: ILibTbSwitch = {
        label: 'Dark mode',
        class: 'custom-class',
        inputId: 'darkMode',
        name: 'darkMode',
        // disabled: true,
        ngModel: true,
        libTbChange: e => {
            console.log(e);
        }
    }
}
```

```html
<lib-tb-switch [custom]="switchCustom"></lib-tb-switch>
<!-- USO DE [(ngModel)] -->
<lib-tb-switch [(ngModel)]="variable" [custom]="switchCustom"></lib-tb-switch>
```
