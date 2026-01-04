```typescript
// Componente LibTbCardComponent creado y exportado desde la librería tech-block-lib
import { ILibTbCard } from './card.interface';
@Component({
  selector: 'lib-tb-card',
  templateUrl: './card.component.html'
})
export class LibTbCardComponent {
    // custom: ILibTbCard, es el único @Input() que tiene definido el componente lib-tb-card
  @Input() custom: ILibTbCard = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbCard
}
```

```typescript
// Modulo donde se declara y se exporta LibTbCardComponent
import { LibTbCardComponent } from './card.component';
@NgModule({
  declarations: [LibTbCardComponent],
  exports: [LibTbCardComponent, ...],
  ...
})
export class LibTbCardModule {}
```
