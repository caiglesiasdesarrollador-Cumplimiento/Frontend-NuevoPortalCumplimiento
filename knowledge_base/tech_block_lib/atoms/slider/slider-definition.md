```typescript
// Componente LibTbSliderComponent creado y exportado desde la librería tech-block-lib
import { ILibTbSlider } from './slider.interface';
@Component({
  selector: 'lib-tb-slider',
  templateUrl: './slider.component.html'
})
export class LibTbSliderComponent {
    // custom: ILibTbSlider, es el único @Input() que tiene definido el componente lib-tb-slider
  @Input() custom: ILibTbSlider = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbSlider
}
```

```typescript
// Modulo donde se declara y se exporta LibTbSliderComponent
import { LibTbSliderComponent } from './slider.component';
@NgModule({
  declarations: [LibTbSliderComponent],
  exports: [LibTbSliderComponent, ...],
  ...
})
export class LibTbSliderModule {}
```
