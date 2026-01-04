```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbPaginatorModule
  import { LibTbPaginatorModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbPaginatorModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbPaginator desde la librería tech-block-lib
import { ILibTbPaginator } from 'tech-block-lib';
@Component()
export class TestComponent {
    paginatorCustom: ILibTbPaginator = {
        totalRecords: 10,
        rows: 2,
        first: 5,
        // pageLinkSize: 3,
        // rowsPerPageOptions: [1, 2, 5, { showAll: 'Todos' }],
        // showFirstLastIcon: false,
        // showPageLinks: false,
        libTbOnPageChange: e => {
            console.log('Cambio de página: ', e);
        },
    }
}
```

```html
<lib-tb-paginator [custom]="paginatorCustom"></lib-tb-paginator>
```
