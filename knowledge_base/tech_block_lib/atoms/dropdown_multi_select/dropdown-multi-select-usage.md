```typescript
  /** MÓDULO */
  import { LibTbDropdownMultiSelectModule } from 'tech-block-lib';

  @NgModule({
    // ..
    imports: [
      LibTbDropdownMultiSelectModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbDropdownMultiSelect desde la librería tech-block-lib
import { ILibTbDropdownMultiSelect } from 'tech-block-lib';
@Component()
export class testComponent {
    // Ejemplo de opciones sin agrupación
    dropdownMultiSelectOptions = [
        {name: 'Opción 1', id: 1},
        {name: 'Opción 2', id: 2},
        {name: 'Opción 3', id: 3, ihabilitada: true},
        {name: 'Opción 4', id: 4},
        {name: 'Opción 5', id: 5},
    ];

    // Ejemplo de opciones agrupadas
    dropdownMultiSelectOptionsGroup = [
        {
            label: 'Grupo 1', value: 'G1',
            items: [
                { name: 'Opción 1', id: 1 },
                { name: 'Opción 2', id: 2 },
            ]
        },
        {
            label: 'Grupo 2', value: 'G2',
            items: [
                { name: 'Opción 3', id: 3 },
                { name: 'Opción 4', id: 4, ihabilitada: true },
            ]
        },
    ];

    optionSelected = [{ id: 1 }];

    dropdownMultiSelectCustom: ILibTbDropdownMultiSelect = {
        options: this.dropdownMultiSelectOptions,
        // options: this.dropdownMultiSelectOptionsGroup,
        optionLabel: 'name',
        // optionValue: 'id',
        optionDisabled: 'disabled',
        // style: { width: '250px' },
        ariaFilterLabel: 'ariaFilterLabel',
        ariaLabelledBy: 'ariaLabelledBy',
        filterValue: '',
        showIconCaption: true,
        iconCaption: {
            help: 'fa fa-question',
        },
        caption: true,
        label: 'Label Txt',
        chip: true,
        ellipsis: true,
        floatLabel: false,
        view: false,
        captionText: {
            help: 'Texto de ayuda',
        },
        // formGroup: this.formMulti,
        // autofocusFilter: true,
        // disabled: true,
        // dropdownIcon: 'fa fa-user',
        // emptyFilterMessage: 'Nada que ver',
        // filter: true,
        // filterValue: '1',
        // filterBy: 'name',
        // filterPlaceholder: 'Filtrar'
        // placeholder: 'Seleccione una opción',
        id: 'dropdownmultiselectId',
        // name: 'multi',
        // group: true,
        // optionGroupLabel: 'grupo',
        // optionGroupChildren: 'opciones',
        // overlayVisible: true,
        // readonly: true,
        // resetFilterOnHide: true,
        // scrollHeight: '500px',
        // selectionLimit: 2,
        // showHeader: false,
        // showToggleAll: false,
        // class: 'custom__class',
        // virtualScroll: true,
        dataKey: 'id',
        ngModel: this.optionSelected,
        required: false,
        libTbClick: (event) => this.eventFunction(event),
    }

    eventFunction(event) {
        console.log('Event: ', event);
    }
}
```

```html
<lib-tb-dropdown-multi-select [custom]="dropdownMultiSelectCustom"></lib-tb-dropdown-multi-select>
<!-- USO DE [(ngModel)] -->
<lib-tb-dropdown-multi-select [(ngModel)]="variable" [custom]="dropdownMultiSelectCustom"></lib-tb-dropdown-multi-select>
```
