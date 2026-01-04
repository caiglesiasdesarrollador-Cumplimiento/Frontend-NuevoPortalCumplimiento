```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbAnswerStateModule
  import { LibTbAnswerStateModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbAnswerStateModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbAnswerState desde la librería tech-block-lib
import { ILibTbAnswerState } from 'tech-block-lib';
@Component()
export class TestComponent {
    answerStateCustom: ILibTbAnswerState = {
        number: '404',
        title: 'No encontramos esta página',
        description: 'Busca otros servicios, ¡<<MARCA>> está lleno de soluciones!',
        // style: { zIndex: '10' },
        img: {
            src: 'assets/img/states/404.png',
            // defaultWidth: 300,
            // defaultHeight: 300,
            // alt: 'atributo alt',
        },
        // class: 'class-answer-state',
        libTbButton: {
            label: 'Inicio',
            icon: 'fa-solid fa-arrow-left',
            // class: 'custom__class',
            libTbClick: () => {
                alert('Ok');
            }
        }
    }
}
```

```html
<lib-tb-answer-state [custom]="answerStateCustom">
  Contenido HTML
</lib-tb-answer-state>
```
