```typescript
  /** MÓDULO */
  import { LibTbInputTextModule } from 'tech-block-lib';

  @NgModule({
    // ..
    imports: [
      LibTbInputTextModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbInputText desde la librería tech-block-lib
import { ILibTbInputText } from 'tech-block-lib';
@Component()
export class testComponent {
    inputTextCustom: ILibTbInputText = {
        type: 'email',
        name: 'correo',
        floatLabel: true,
        placeholder: 'Correo',
        icon: 'fal fa-user',
        iconPosition: 'right',
        label: 'Correo',
        showIconCaption: true,
        iconCaption: {
            help: 'fas fa-info-circle',
            error: 'fas fa-times-circle',
            success: 'fas fa-check-circle',
        },
        caption: true,
        ngModel: 'example@example.com',
        required: true,
        captionText: {
            help: 'Escriba aquí su correo',
            error: 'Falta este campo',
            success: 'Muy bien',
        },
        libTbClick: this.eventFunction(e),
        libTbChange: this.eventFunction(e),
        libTbKeydown: this.eventFunction(e),
        libTbFocus: this.eventFunction(e),
        libTbBlur: this.eventFunction(e),
        libTbKeypress: this.eventFunction(e),
        libTbKeyup: this.eventFunction(e),
    }
    eventFunction(event) {
        console.log('Event: ', event);
    }
}
```

```html
    <lib-tb-input-text [custom]="inputTextCustom"></lib-tb-input-text>
    <!-- USO DE [(ngModel)] -->
    <lib-tb-input-text [(ngModel)]="variable" [custom]="inputTextCustom"></lib-tb-input-text>
```
