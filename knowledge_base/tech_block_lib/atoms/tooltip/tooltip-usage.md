```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbTooltipModule
  import { LibTbTooltipModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbTooltipModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbTooltip desde la librería tech-block-lib
import { ILibTbTooltip } from 'tech-block-lib';
@Component()
export class TestComponent {
    tooltipCustom: ILibTbTooltip = {
        tooltipLabel: 'Texto del Tooltip',
        tooltipPosition: 'left',
        tooltipStyleClass: 'class__custom',
        // fitContent: false,
        tooltipEvent: 'hover',
        // life: 1000,
        // hideDelay: 5000,
        // positionLeft: 10,
        // positionTop: 10,
        // showDelay: 1000,
        // tooltipDisabled: true,
        // tooltipZIndex: '1',
    }
}
```

```html
<button libTbTooltip [customTooltip]="tooltipCustom">Button</button>
```
