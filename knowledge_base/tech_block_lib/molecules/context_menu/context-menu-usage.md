```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbContextMenuModule
  import { LibTbContextMenuModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbContextMenuModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbContextMenu desde la librería tech-block-lib
import { ILibTbContextMenu } from 'tech-block-lib';
@Component()
export class TestComponent {
    contextMenuCustom: ILibTbContextMenu = {
        global: false,
        model: [
            {
                label: 'File',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        items: [{ label: 'Project' }, { label: 'Other' }],
                    },
                    { label: 'Open' },
                    { label: 'Quit' },
                ],
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    { label: 'Delete', icon: 'pi pi-fw pi-trash' },
                    { label: 'Refresh', icon: 'pi pi-fw pi-refresh' },
                ],
            }
        ]
    }
}
```

```html
<lib-tb-context-menu [target]="element" [custom]="contextMenuCustom"></lib-tb-context-menu>
<!-- Se puede tener el target de la siguiente manera -->
<img #element src="url" alt="img" />
```
