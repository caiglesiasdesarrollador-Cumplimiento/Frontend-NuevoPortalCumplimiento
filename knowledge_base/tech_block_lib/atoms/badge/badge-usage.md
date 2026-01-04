```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbBadgeModule
  import { LibTbBadgeModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbBadgeModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbBadge desde la librería tech-block-lib
import { ILibTbBadge } from 'tech-block-lib';
@Component()
export class testComponent {
    badgeCustom: ILibTbBadge = {
        value: '5',
        size: 'xlarge',
        type: 'error',
        style: {
            top: '10px',
            right: '10px',
        },
    }
}
```

```html
<!-- Individual -->
<lib-tb-badge [custom]="badgeCustom"></lib-tb-badge>
<!-- Dentro de otro componente -->
<button libTbBadge [customBadge]="badgeCustom"> Button </button>
```
