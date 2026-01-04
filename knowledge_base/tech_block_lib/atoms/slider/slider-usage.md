```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbSliderModule
  import { LibTbSliderModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbSliderModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbSlider desde la librería tech-block-lib
import { ILibTbSlider } from 'tech-block-lib';
@Component()
export class testComponent {
    sliderCustom: ILibTbSlider = {
        label: 'Label text',
        // orientation: 'vertical',
        value: [10, 25],
        // value: 50,
        animate: true,
        // disabled: true,
        // min: 10,
        // max: 80,
        range: true,
        // ariaLabelledBy: 'Aria label',
        // step: 10,
        // tabindex: 0,
        // class: 'custom__class',
        libTbChange: e => {
            console.log('libTbChange', e);
        },
        libTbSlideEnd: e => {
            console.log('libTbSlideEnd', e);
        }
    }
}
```

```html
<lib-tb-slider [custom]="sliderCustom"></lib-tb-slider>
<!-- USO DE [(ngModel)] -->
<lib-tb-slider [(ngModel)]="variable" [custom]="sliderCustom"></lib-tb-slider>
```
