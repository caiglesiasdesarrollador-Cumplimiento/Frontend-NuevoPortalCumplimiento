```typescript
// Componente LibTbTagComponent creado y exportado desde la librería tech-block-lib
import { ILibTbTag } from './tag.interface';
@Component({
  selector: 'lib-tb-tag',
  templateUrl: './tag.component.html'
})
export class LibTbTagComponent {
    // custom: ILibTbTag, es el único @Input() que tiene definido el componente lib-tb-tag
  @Input() custom: ILibTbTag = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbTag
}
```

```typescript
// Modulo donde se declara y se exporta LibTbTagComponent
import { LibTbTagComponent } from './tag.component';
@NgModule({
  declarations: [LibTbTagComponent],
  exports: [LibTbTagComponent, ...],
  ...
})
export class LibTbTagModule {}
```
