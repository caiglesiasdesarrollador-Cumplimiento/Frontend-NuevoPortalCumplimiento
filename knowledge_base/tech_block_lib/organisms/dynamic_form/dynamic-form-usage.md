```typescript
  /** MÓDULO */
  import { LibTbDynamicFormModule } from 'tech-block-lib';

  @NgModule({
    // ..
    imports: [
      LibTbDynamicFormModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// Se importa la interface ILibTbDynamicForm desde la librería tech-block-lib
import { ILibTbDynamicForm, ILibTbInputText } from 'tech-block-lib';
@Component()
export class testComponent {
    dynamicFormCustom: ILibTbDynamicForm = {
        config: [
            {
                htmlContent: '<h2>Titulo HTML</h2>'
            },
            {
                tbType: 'input',
                custom: {
                    label: 'Email',
                    name: 'email',
                } as ILibTbInputText,
                formProps: {
                    validators: [
                        {
                            name: 'required',
                            message: 'Debe completar su correo',
                            validator: Validators.required,
                        },
                        {
                            name: 'email',
                            message: 'Correo inválido',
                            validator: Validators.email,
                        },
                    ],
                },
            },
        ],
        libTbSubmit: form => console.log(form),
    };
}
```

```html
    <!-- HTML -->
    <lib-tb-dynamic-form [custom]="dynamicFormCustom"></lib-tb-dynamic-form>
```
