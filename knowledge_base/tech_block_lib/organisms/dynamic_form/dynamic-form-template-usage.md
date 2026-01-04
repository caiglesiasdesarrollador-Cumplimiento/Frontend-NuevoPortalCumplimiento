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
import { ILibTbDynamicForm, ILibTbDropdown, ILibTbCheckbox } from 'tech-block-lib';
@Component()
export class testComponent {
    cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
    ];
    dynamicFormCustom: ILibTbDynamicForm = {
        config: [
            {
                tbType: 'dropdown',
                template: 'dropdown:item', // El componente utilizará este template (si existe)
                custom: {
                    name: 'city',
                    options: this.cities,
                    optionLabel: 'name',
                    optionValue: 'code',
                    filter: true,
                    label: 'Ciudad',
                    placeholder: 'Seleccione...',
                } as ILibTbDropdown,
            },
            {
                tbType: 'checkbox',
                template: 'terms:label', // El componente utilizará este template (si existe)
                custom: {
                    name: 'terms',
                    binary: true,
                } as ILibTbCheckbox,
            },
        ],
        libTbSubmit: form => console.log(form),
    };
}
```

```html
    <!-- HTML -->
    <lib-tb-dynamic-form [custom]="dynamicFormCustom">
        <ng-template libTbTemplate="terms:label">
            {{ variable }} <a href="https://www.google.com/" target="_blank">Terminos y condiciones</a>
        </ng-template>
        <ng-template libTbTemplate="dropdown:item" let-item>
            <div class="item">
            <lib-tb-avatar [custom]="{label: 'A'}"></lib-tb-avatar>
            {{ item.name }}
            </div>
        </ng-template>
    </lib-tb-dynamic-form>
```
