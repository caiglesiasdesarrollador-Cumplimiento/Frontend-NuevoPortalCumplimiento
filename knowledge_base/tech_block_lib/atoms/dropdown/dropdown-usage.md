```typescript
  /** MÓDULO */
  import { LibTbDropdownModule } from 'tech-block-lib';

  @NgModule({
    // ..
    imports: [
      LibTbDropdownModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbDropdown desde la librería tech-block-lib
import { ILibTbDropdown } from 'tech-block-lib';
@Component()
export class testComponent {
    // Ejemplo de opciones sin agrupación
    dropdownOptions = [
        { name: 'Opción 1', id: 1 },
        { name: 'Opción 2', id: 2, disabled: true },
        { name: 'Opción 3', id: 3 }
    ];

    // Ejemplo de opciones agrupadas
    dropdownOptionsGroup = [
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
                { name: 'Opción 4', id: 4, disabled: true },
            ]
        },
    ];

    dropdownCustom: ILibTbDropdown = {
        options: this.dropdownOptions,
        // options: this.dropdownOptionsGroup,
        optionLabel: 'name',
        optionValue: 'name',
        showClear: true,
        filter: true,
        filterPlaceholder: 'Buscar',
        resetFilterOnHide: true,
        placeholder: 'Seleccione',
        style: {'width': '200px'},
        // class: 'custom__class',
        dataKey: 'id',
        captionIcon: {
            helpIcon: 'fal fa-circle-question',
            errorIcon: 'fal fa-xmark',
        },
        captionText: {
            helpText: 'Help text',
            errorText: 'Error text',
        },
        // disabled: true,
        // optionValue: 'id',
        optionDisabled: 'disabled',
        // group: true,
        optionGroupLabel: 'value',
        optionGroupChildren: 'items',
        scrollHeight: '300px',
        required: true,
        // virtualScroll: true,
        libTbClick: (event) => this.eventFunction(event),
        libTbChange: (event) => this.eventFunction(event),
        libTbFilter: (event) => this.eventFunction(event),
        libTbBlur: (event) => this.eventFunction(event),
        libTbFocus: (event) => this.eventFunction(event),
        libTbHide: (event) => this.eventFunction(event),
        libTbShow: (event) => this.eventFunction(event),
    }

    eventFunction(event) {
        console.log('Event: ', event);
    }
}
```

```html
<lib-tb-dropdown [custom]="dropdownCustom"></lib-tb-dropdown>
<!-- USO DE [(ngModel)] -->
<lib-tb-dropdown [(ngModel)]="variable" [custom]="dropdownCustom"></lib-tb-dropdown>
```
