```typescript
// Directiva LibTbTooltipDirective creada y exportada desde la librería tech-block-lib
import { ILibTbTooltip } from './tooltip.interface';

@Directive({
  selector: '[libTbTooltip]',
})
export class LibTbTooltipDirective {
    // customTooltip: ILibTbTooltip, es el único @Input() que tiene definida la directiva
   @Input() customTooltip: ILibTbTooltip = {};
  ... // No existen más @Input(), ni existen @Output().
}
```

```typescript
// Modulo donde se declara y se exporta LibTbTooltipDirective
import { LibTbTooltipDirective } from './tooltip.directive';
@NgModule({
  declarations: [LibTbTooltipDirective],
  exports: [LibTbTooltipDirective, ...],
  ...
})
export class LibTbTooltipModule {}
```
