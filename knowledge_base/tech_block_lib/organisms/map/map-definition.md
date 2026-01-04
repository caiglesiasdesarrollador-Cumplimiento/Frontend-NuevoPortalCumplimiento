```typescript
// Componente LibTbMapComponent creado y exportado desde la librería tech-block-lib
import { ILibTbMap } from './map.interface';
@Component({
  selector: 'lib-tb-map',
  templateUrl: './map.component.html'
})
export class LibTbMapComponent {
    // custom: ILibTbMap, es el único @Input() que tiene definido el componente lib-tb-map
  @Input() custom: ILibTbMap = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbMap
}
```

```typescript
// Modulo donde se declara y se exporta LibTbMapComponent
import { LibTbMapComponent } from './map.component';
@NgModule({
  declarations: [LibTbMapComponent],
  exports: [LibTbMapComponent, ...],
  ...
})
export class LibTbMapModule {}
```
