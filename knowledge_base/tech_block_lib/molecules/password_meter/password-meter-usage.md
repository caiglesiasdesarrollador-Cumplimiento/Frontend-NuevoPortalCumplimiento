```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbPasswordMeterModule
  import { LibTbPasswordMeterModule } from 'tech-block-lib';

  @NgModule({
    // ..
    imports: [
      LibTbPasswordMeterModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbPasswordMeter desde la librería tech-block-lib
import { ILibTbPasswordMeter } from 'tech-block-lib';
@Component()
export class testComponent {
    passwordMeterCustom: ILibTbPasswordMeter = {
        name: 'password',
        // id
        // placeholder
        label: 'Contraseña',
        floatLabel: true,
        // icon: 'fal fa-eye',
        dataQaId: 'data-qa-id',
        class: 'class-custom',
        // formGroup: this.formLogin,
        ngModel: '123'
        iconHide: 'fal fa-eye',
        iconHelp: 'fal fa-question-circle',
        rules: [
            {
                pattern: '[a-z]',
                description: 'Contiene al menos un carácter en minúscula',
            },
            {
                pattern: '[A-Z]',
                description: 'Contiene al menos un carácter en mayúscula',
            },
            {
                pattern: '[0-9]',
                description: 'Contiene al menos un dígito',
            },
            {
                pattern: '[(@#+$%^&*)]',
                description: 'Contiene al menos un carácter especial',
            },
            {
                pattern: '.{8}',
                description: 'Contiene al menos 8 caracteres',
            },
        ]
    };
}
```

```html
<lib-tb-password-meter [custom]="passwordMeterCustom"></lib-tb-password-meter>
<!-- USO DE [(ngModel)] -->
<lib-tb-password-meter [(ngModel)]="variable" [custom]="passwordMeterCustom"></lib-tb-password-meter>
```
