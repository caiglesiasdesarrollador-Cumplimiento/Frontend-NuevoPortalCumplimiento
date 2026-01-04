```typescript
// Componente LibTbBannerComponent creado y exportado desde la librería tech-block-lib
import { ILibTbBanner } from './banner.interface';
@Component({
  selector: 'lib-tb-banner',
  templateUrl: './banner.component.html'
})
export class LibTbBannerComponent {
    // custom: ILibTbBanner, es el único @Input() que tiene definido el componente lib-tb-banner
  @Input() custom: ILibTbBanner = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbBanner
}
```

```typescript
// Modulo donde se declara y se exporta LibTbBannerComponent
import { LibTbBannerComponent } from './banner.component';
@NgModule({
  declarations: [LibTbBannerComponent],
  exports: [LibTbBannerComponent, ...],
  ...
})
export class LibTbBannerModule {}
```
