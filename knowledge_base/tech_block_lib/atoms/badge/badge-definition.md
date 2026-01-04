```typescript
// Directiva LibTbBadgeDirective creada y exportada desde la librería tech-block-lib
import { ILibTbBadge } from './badge.interface';

@Directive({
  selector: '[libTbBadge]',
})
export class LibTbBadgeDirective {
    // customBadge: ILibTbBadge, es el único @Input() que tiene definida la directiva
  @Input() customBadge: ILibTbBadge = {};
  ... // No existen más @Input(), ni existen @Output().
}
```

```typescript
// Componente LibTbBadgeComponent creado y exportado desde la librería tech-block-lib
import { ILibTbBadge } from './badge.interface';
@Component({
  selector: 'lib-tb-badge',
  templateUrl: './badge.component.html'
})
export class LibTbBadgeComponent {
    // custom: ILibTbBadge, es el único @Input() que tiene definido el componente lib-tb-badge
  @Input() custom: ILibTbBadge = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbBadge
}
```

```typescript
// Modulo donde se declara y se exporta LibTbBadgeComponent
import { LibTbBadgeComponent, LibTbBadgeDirective } from './badge.component';
@NgModule({
  declarations: [LibTbBadgeComponent, LibTbBadgeDirective],
  exports: [LibTbBadgeComponent, LibTbBadgeDirective, ...],
  ...
})
export class LibTbBadgeModule {}
```
