```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbModalModule
  import { LibTbModalModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbModalModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbModal desde la librería tech-block-lib
import { ILibTbModal } from 'tech-block-lib';
@Component()
export class TestComponent {
    modalCustom: ILibTbModal = {
        title: 'Titulo del modal [Ac]',
        resizable: true,
        closable: true,
        closeOnEscape: true,
        dismissableMask: true,
        // style: { width: '220px' },
        // class: 'custom__class',
        // containerClass: 'custom__class',
        // contentStyle: { width: '220px' },
        // contentStyleClass: 'custom__class',
        baseZIndex: 10,
        // autoZIndex: false,
        // focusOnShow: false,
        // focusTrap: false,
        // closeIcon: 'fa fa-check',
        libTbOnShow: () => {
            console.log('Se muestra');
        },
        libTbOnHide: () => {
            console.log('Se oculta');
        }
    }

    ngOnInit(): void {
        this.modalCustom.visible = true;
    }
}
```

```html
<!-- Para renderizar contenido dinámico dentro del modal, se puede insertar HTML dentro del mismo. -->
<lib-tb-modal [custom]="modalCustom">
  <div class="flex flex-col items-center justify-center">
    <lib-tb-avatar [custom]="{ label: 'SB' }"></lib-tb-avatar>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum facilis ratione
      nobis atque voluptates fuga totam numquam. Enim, fugiat libero. Eligendi qui labore
      vel aut fuga? Accusamus cumque odit quos?
    </p>
  </div>
</lib-tb-modal>
```
