```typescript
// Componente LibTbImageComponent creado y exportado desde la librería tech-block-lib
import { ILibTbImage } from './image.interface';
@Component({
  selector: 'lib-tb-image',
  templateUrl: './image.component.html'
})
export class LibTbImageComponent {
    // custom: ILibTbImage, es el único @Input() que tiene definido el componente lib-tb-image
  @Input() custom: ILibTbImage = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbImage
}
```

```typescript
// Modulo donde se declara y se exporta LibTbImageComponent
import { LibTbImageComponent } from './image.component';
@NgModule({
  declarations: [LibTbImageComponent],
  exports: [LibTbImageComponent, ...],
  ...
})
export class LibTbImageModule {}
```
