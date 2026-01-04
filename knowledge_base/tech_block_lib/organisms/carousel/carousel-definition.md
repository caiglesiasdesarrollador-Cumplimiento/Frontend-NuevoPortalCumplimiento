```typescript
// Componente LibTbCarouselComponent creado y exportado desde la librería tech-block-lib
import { ILibTbCarousel } from './carousel.interface';
@Component({
  selector: 'lib-tb-carousel',
  templateUrl: './carousel.component.html'
})
export class LibTbCarouselComponent {
    // custom: ILibTbCarousel, es el único @Input() que tiene definido el componente lib-tb-carousel
  @Input() custom: ILibTbCarousel = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbCarousel
}
```

```typescript
// Modulo donde se declara y se exporta LibTbCarouselComponent
import { LibTbCarouselComponent } from './carousel.component';
@NgModule({
  declarations: [LibTbCarouselComponent],
  exports: [LibTbCarouselComponent, ...],
  ...
})
export class LibTbCarouselModule {}
```
