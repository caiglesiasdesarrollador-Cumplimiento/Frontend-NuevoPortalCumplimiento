```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbBreadcrumbModule
  import { LibTbBreadcrumbModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbBreadcrumbModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbBreadcrumb desde la librería tech-block-lib
import { ILibTbBreadcrumb } from 'tech-block-lib';
@Component()
export class testComponent {
    breadcrumbCustom: ILibTbBreadcrumb = {
        home: {
            label: 'Inicio',
            icon: 'fa fa-user',
        },
        items: [
            { label: 'F.C. Barcelona', icon: 'fa fa-heart' },
            { label: 'Squad' },
            { label: 'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi' },
        ],
        libTbOnItemClick: e => {
            console.log(e);
        }
    }
}
```

```html
<lib-tb-breadcrumb [custom]="breadcrumbCustom"></lib-tb-breadcrumb>
```
