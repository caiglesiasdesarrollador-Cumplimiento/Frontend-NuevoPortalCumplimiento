```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbTableModule
  import { LibTbTableModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbTableModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbTable desde la librería tech-block-lib
import { ILibTbTable } from 'tech-block-lib';
@Component()
export class TestComponent {
    headers = [
        { "name": "first", "icon": "fa-solid fa-cloud" },
        { "name": "second", "icon": "" },
        { "name": "third", "icon": "fa-solid fa-star" }
    ];
    body = [
        {
            "first": { "name": "1", "icon": "fal fa-user" },
            "second": { "name": "2", "icon": "fal fa-times" },
            "third": { "name": "3", "icon": "fal fa-house" }
        },
        {
            "first": { "name": "primero", "icon": "fal fa-user" },
            "second": { "name": "primero", "icon": "fal fa-times" },
            "third": { "name": "primero" }
        },
        {
            "first": { "name": "a", "icon": "fal fa-user" },
            "second": { "name": "b", "icon": "fal fa-times" },
            "third": { "name": "c", "icon": "fal fa-house" }
        },
        {
            "first": {
                "name": "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
                "icon": "fal fa-user"
            },
            "second": { "name": "test", "icon": "fal fa-times" },
            "third": {
                "name": "Sapiente quas totam ratione harum. Aspernatur, optio.",
                "icon": "fal fa-house"
            }
        }
    ];
    footer = [
        {
            "first": { "value": "footer 1", "icon": "fal fa-user" },
            "second": { "value": "footer 2", "icon": "fal fa-house" },
            "third": { "value": "footer 3", "icon": "fal fa-user" },
        },
    ];

    tableCustom: ILibTbTable = {
        sortMode: 'single',
        filterLocale: 'name',
        value: this.data,
        rows: 5,
        paginator: true,
        paginatorPosition: 'bottom',
        alwaysShowPaginator: true,
        rowsPerPageOptions: [5, 10, 15],
        style: undefined,
        tableStyle: undefined,
        contextMenuSelection: undefined,
        contextMenu: undefined,
        groupRowsBy: undefined
    }
}
```

```html
<lib-tb-table [custom]="tableCustom"></lib-tb-table>
```
