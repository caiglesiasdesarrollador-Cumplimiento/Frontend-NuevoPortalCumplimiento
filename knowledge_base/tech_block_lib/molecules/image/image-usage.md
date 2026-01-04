```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbImageModule
  import { LibTbImageModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbImageModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbImage desde la librería tech-block-lib
import { ILibTbImage } from 'tech-block-lib';
@Component()
export class TestComponent {
    imageCustom: ILibTbImage = {
        dataQaId: 'dataQaId',
        // preview: true,
        // style: {'witdh':'20px'},
        rotate: true,
        class: 'm-class-image',
        // imageStyle: {'witdh':'20px'},
        // imageClass: 'imageClass',
        // height: '300px',
        // width: '200px',
        img: {
            // src: 'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2021/09/mejor-aplicacion-fondos-pantalla-animados-llegaria-android-dentro-poco-2482649.jpg?tf=3840x',
            src: 'https://images.unsplash.com/photo-1675667329170-736408ff7a68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
            alt: 'alt',
        },
        footer: true,
        title: 'Titulo de prueba',
        description: 'Descripción de prueba',
        // closeIcon: 'fa fa-times',
        // rotateRightIcon: 'fa fa-refresh',
        // rotateLeftIcon: 'fa fa-undo',
        // zoomOutIcon: 'fa fa-minus',
        // zoomInIcon: 'fa fa-plus',
        libTbOnShow: () => console.log('abierto'),
        libTbOnHide: () => console.log('cerrado'),
        libTbOnImageError: e => console.log(e),
    }
}
```

```html
<lib-tb-image [custom]="imageCustom"></lib-tb-image>
```
