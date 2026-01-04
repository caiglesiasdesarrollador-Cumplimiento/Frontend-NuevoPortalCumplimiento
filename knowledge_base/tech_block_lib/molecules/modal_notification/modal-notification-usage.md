```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbModalNotificationModule
  import { LibTbModalNotificationModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbModalNotificationModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
import { ConfirmationService } from 'primeng/api';
// se importa la interface ILibTbModalNotification desde la librería tech-block-lib
import { ILibTbModalNotification } from 'tech-block-lib';
@Component()
export class TestComponent {
    modalNotificationCustom: ILibTbModalNotification = {
        title: 'Titulo del modal',
        message:
            'Manchego emmental cheddar. Dolcelatte swiss say cheese pecorino rubber cheese babybel caerphilly fromage.',
        dismissableMask: true,
        // key: 'modalConfirm',
        // acceptButtonVisible: false
    }
    constructor(private confirmationService: ConfirmationService) {}

    ngOnInit(): void {
        this.confirmationService.confirm({
            // key: 'modalConfirm',
            accept: () => {
            // Cuando se confirma el modal
            this.confirmationService.close();
            },
        });
    }
}
```

```html
<lib-tb-modal-notification [custom]="modalNotificationCustom"></lib-tb-modal-notification>
```
