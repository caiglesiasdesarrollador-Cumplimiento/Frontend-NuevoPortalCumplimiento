```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbCardModule
  import { LibTbCardModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbCardModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbCard desde la librería tech-block-lib
import { ILibTbCard } from 'tech-block-lib';
@Component()
export class TestComponent {
    cardCustom: ILibTbCard = {
        orientation: 'horizontal',
        img: {
            src: 'https://img-exapmle.com/img.jpg',
        },
        tagHeader: {
            label: 'Tag',
            icon: 'fa fa-heart',
            rounded: true,
        },
        buttonHeader: {
            icon: 'fa fa-heart',
            class: 'btn-card-cc',
            libTbClick: e => {
                console.log(e);
            },
        },
        title: 'Title H6',
        subtitle: 'Subtitle',
        description: 'Texto de la descripción',
        observation: 'Observation',
        boxItems: [
            {
                icon: 'fa fa-heart',
                text: 'Corazón',
            },
            {
                icon: 'fa fa-arrow-up',
                text: 'Arriba',
            },
            {
                icon: 'fa fa-left',
                text: 'Iquierda',
            },
            {
                icon: 'fa fa-users',
                text: 'Amigos',
            },
        ],
    }
}
```

```html
<lib-tb-card [custom]="cardCustom"></lib-tb-card>
```
