```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbMapModule
  import { LibTbMapModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbMapModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbMap desde la librería tech-block-lib
import { ILibTbMap } from 'tech-block-lib';
@Component()
export class TestComponent {
    center = { lat: 7.882694862839355, lng: -72.4869862843825 };

    options: any = {
        center: this.center,
        zoom: 15,
    };

    mapCustom: ILibTbMap = {
        options: this.options,
        // class: 'file-upload-file-jelpit',
        // style: {'widht':'100%'},
        libTbOnMapClick: console.log,
        libTbOnMapDragEnd: console.log,
        libTbOnMapReady: console.log,
        libTbOnOverlayClick: console.log,
        libTbOnOverlayDblClick: console.log,
        libTbOnOverlayDrag: console.log,
        libTbOnOverlayDragEnd: console.log,
        libTbOnOverlayDragStart: console.log,
        libTbOnZoomChanged: console.log,
    }
}
```

```html
<lib-tb-map [custom]="mapCustom"></lib-tb-map>
```
