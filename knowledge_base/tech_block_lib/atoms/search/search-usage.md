```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbSearchModule
  import { LibTbSearchModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbSearchModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbSearch desde la librería tech-block-lib
import { ILibTbSearch } from 'tech-block-lib';
@Component()
export class TestComponent {
    searchCustom: ILibTbSearch = {
        name: 'search',
        placeholder:'Buscar algo...',
        // icon:'fa fa-search',
        // class:'custom__class',
        ngModel: 'Hola',
        // style: { color: 'red' },
        // disabled: true,
        libTbClick: (event) => this.eventFunction(event)
    }

    eventFunction(event) {
        console.log('Event: ', event);
    }
}
```

```html
<lib-tb-search [custom]="searchCustom"></lib-tb-search>
<!-- USO DE [(ngModel)] -->
<lib-tb-search [(ngModel)]="variable" [custom]="searchCustom"></lib-tb-search>
```
