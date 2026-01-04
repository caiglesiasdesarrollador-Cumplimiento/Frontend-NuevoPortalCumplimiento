```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbCarouselModule
  import { LibTbCarouselModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbCarouselModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbCarousel desde la librería tech-block-lib
import { ILibTbCarousel } from 'tech-block-lib';
@Component()
export class TestComponent {
    carouselCustom: ILibTbCarousel = {
        items: [
            {
                name: 'Item 1',
                description: 'Description 1',
            },
            {
                name: 'Item 2',
                description: 'Description 2',
            },
            {
                name: 'Item 3',
                description: 'Description 3',
            },
            {
                name: 'Item 3',
                description: 'Description 3',
            }
        ],
        visibleItems: 1,
        scrollItems: 1,
        infinite: true,
        // showControls: false,
        activeIndex: 2,
        responsiveOptions: [
            {
                breakpoint: 1024,
                visibleItems: 2,
                scrollItems: 2,
            },
            {
                breakpoint: 768,
                visibleItems: 1,
                scrollItems: 1,
            }
        ]
    }
}
```

```html
<lib-tb-carousel [custom]="carouselCustom">
  <ng-template let-data libTbTemplate="item">
    <div class="lib-item-test">
      <h1 class="text-center">{{ data.name }}</h1>
      <h4 class="text-center mb-4">{{ data.description }}</h4>
    </div>
  </ng-template>
</lib-tb-carousel>
```
