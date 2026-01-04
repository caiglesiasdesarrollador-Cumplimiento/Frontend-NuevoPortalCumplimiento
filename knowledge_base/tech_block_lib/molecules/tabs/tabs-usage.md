```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbTabsModule
  import { LibTbTabsModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbTabsModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbTabs desde la librería tech-block-lib
import { ILibTbTabs } from 'tech-block-lib';
@Component()
export class TestComponent {
    tabsCustom: ILibTbTabs = {
        fullTabs: false,
        showIcon: true,
        showDescription: true,
        centerTabs: true,
        activeItem: 2,
        items: [
            {
                label: 'Home',
                icon: 'fal fa-house',
                command: (): void => {
                    console.log('click');
                },
                description: 'description'
            },
            { label: 'Calendar', icon: 'fal fa-calendar', description: 'desc 1' },
            { label: 'Edit', icon: 'fal fa-pencil', description: 'desc 2' },
            { label: 'Documentation', icon: 'fal fa-file', description: 'desc 3' },
            { label: 'Settings', icon: 'fal fa-gear', description: 'desc 4' }
        ]
    }
}
```

```html
<lib-tb-tabs [custom]="tabsCustom"></lib-tb-tabs>
```
