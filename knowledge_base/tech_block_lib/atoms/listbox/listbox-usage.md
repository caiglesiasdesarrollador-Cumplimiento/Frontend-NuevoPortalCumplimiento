```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbListboxModule
  import { LibTbListboxModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbListboxModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbListbox desde la librería tech-block-lib
import { ILibTbListbox } from 'tech-block-lib';
@Component()
export class TestComponent {

    // Ejemplo de opciones sin agrupación
    options = [
        { name: 'Opción 1', id: 1 },
        { name: 'Opción 2', id: 2, disabled: true },
        { name: 'Opción 3', id: 3, ihabilitada: true },
        { name: 'Opción 4', id: 4 },
        { name: 'Opción 5', id: 5 },
    ];

    options2 = [1, 2, 3, 4];

    optionsGroup = [
        {
            grupo: 'Grupo 1',
            value: 'G1',
            opciones: [
                { name: 'Opción 1', id: 1 },
                { name: 'Opción 2', id: 2 },
            ],
        },
        {
            grupo: 'Grupo 2',
            value: 'G2',
            opciones: [
                { name: 'Opción 3', id: 3 },
                { name: 'Opción 4', id: 4 },
            ],
        },
    ];

    optionSelected = [{ id: 1 }];

    listboxCustom: ILibTbListbox = {
        options: this.options,
        // options: this.optionsGroup,
        optionLabel: 'name',
        // optionValue: 'id',
        optionDisabled: 'inhabilitada',
        style: { width: '200px' },
        ariaFilterLabel: 'ariaFilterLabel',
        checkbox: true,
        multiple: true,
        // disabled: true,
        filter: true,
        // filterValue: '1',
        // filterBy: 'name',
        filterPlaceholder: 'Filtrar',
        // placeholder: 'Seleccione una opción',
        // group: true,
        optionGroupLabel: 'grupo',
        optionGroupChildren: 'opciones',
        // readonly: true,
        // showToggleAll: false,
        // class: 'custom__class',
        // ngModel: this.optionSelected,
        libTbOnChange: e => {
            console.log('libTbOnChange - listbox: ', e);
        },
        libTbOnDblClick: e => {
            console.log('libTbOnDblClick - listbox: ', e);
        },
        libTbOnClick: e => {
            console.log('libTbOnClick - listbox: ', e);
        }
    }
}
```

```html
<lib-tb-listbox [custom]="listboxCustom"></lib-tb-listbox>
<!-- USO DE [(ngModel)] -->
<lib-tb-listbox [(ngModel)]="variable" [custom]="listboxCustom"></lib-tb-listbox>
```
