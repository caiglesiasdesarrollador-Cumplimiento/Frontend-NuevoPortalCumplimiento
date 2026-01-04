```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbBannerModule
  import { LibTbBannerModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbBannerModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbBanner desde la librería tech-block-lib
import { ILibTbBanner } from 'tech-block-lib';
@Component()
export class TestComponent {
    bannerCustom: ILibTbBanner = {
        showFooter: true,
        title: 'Titulo',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
        showGradient: true,
        horizontalAlign: 'left',
        verticalAlign: 'center',
    }
}
```

```html
<lib-tb-banner [custom]="bannerCustom"></lib-tb-banner>
```
