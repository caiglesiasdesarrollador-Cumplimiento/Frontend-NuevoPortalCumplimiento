```typescript
// Componente LibTbIndicatorGalleryComponent creado y exportado desde la librería tech-block-lib
import { ILibTbIndicatorGallery } from './indicator-gallery.interface';
@Component({
  selector: 'lib-tb-indicator-gallery',
  templateUrl: './indicator-gallery.component.html'
})
export class LibTbIndicatorGalleryComponent {
    // custom: ILibTbIndicatorGallery, es el único @Input() que tiene definido el componente lib-tb-indicator-gallery
  @Input() custom: ILibTbIndicatorGallery = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbIndicatorGallery
}
```

```typescript
// Modulo donde se declara y se exporta LibTbIndicatorGalleryComponent
import { LibTbIndicatorGalleryComponent } from './indicator-gallery.component';
@NgModule({
  declarations: [LibTbIndicatorGalleryComponent],
  exports: [LibTbIndicatorGalleryComponent, ...],
  ...
})
export class LibTbIndicatorGalleryModule {}
```
