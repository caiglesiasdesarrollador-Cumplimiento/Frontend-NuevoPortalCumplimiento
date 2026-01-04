```typescript
// Componente LibTbChipComponent creado y exportado desde la librería tech-block-lib
import { ILibTbChip } from './chip.interface';
@Component({
  selector: 'lib-tb-chip',
  templateUrl: './chip.component.html'
})
export class LibTbChipComponent {
    // custom: ILibTbChip, es el único @Input() que tiene definido el componente lib-tb-chip
  @Input() custom: ILibTbChip = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbChip
}
```

```typescript
// Modulo donde se declara y se exporta LibTbChipComponent
import { LibTbChipComponent } from './chip.component';
@NgModule({
  declarations: [LibTbChipComponent],
  exports: [LibTbChipComponent, ...],
  ...
})
export class LibTbChipModule {}
```
