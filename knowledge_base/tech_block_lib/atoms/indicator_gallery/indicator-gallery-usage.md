```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbIndicatorGalleryModule
  import { LibTbIndicatorGalleryModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbIndicatorGalleryModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbIndicatorGallery desde la librería tech-block-lib
import { ILibTbIndicatorGallery } from 'tech-block-lib';
@Component()
export class TestComponent {
    indicatorGalleryCustom: ILibTbIndicatorGallery = {
        dataQaId: 'dataQaId',
        items: this.options2,
        // tabindex: 1,
        // activeIndex: 0,
        // visibleItems: 7,
        width: 50,
        height: 50,
        // libTbClick: console.log
    }
}
```

```html
<lib-tb-indicator-gallery [custom]="indicatorGalleryCustom"></lib-tb-indicator-gallery>
```
