```typescript
  /** MÓDULO */
  import { LibTbInputTextAreaModule } from 'tech-block-lib';

  @NgModule({
    // ..
    imports: [
      LibTbInputTextAreaModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbInputTextArea desde la librería tech-block-lib
import { ILibTbInputTextArea } from 'tech-block-lib';
@Component()
export class testComponent {
    inputTextAreaCustom: ILibTbInputTextArea = {
        dataQaId: 'dataQaIdTextArea',
        floatLabel: true,
        // placeholder: 'placeholder',
        // ngModel: '',
        // disabled: false,
        label: 'label Ejemplo',
        view: false,
        required: false,
        columns: 30,
        rows: 4,
        minLenght: 0,
        maxLenght: 200,
        caption: true,
        showIconCaption: true,
        captionText: {
            help: 'Texto de ayuda',
        },
        iconCaption: {
            help: 'fal fa-circle-help',
        },
        name: 'input-text-1',
        // formGroup: new FormGroup(),
        style: { 'width': '100%' },
        class: 'm-input-text-area',
        libTbClick: this.eventFunction(e),
        libTbChange: this.eventFunction(e),
        libTbKeydown: this.eventFunction(e),
        libTbKeypress: this.eventFunction(e),
        libTbKeyup: this.eventFunction(e),
        libTbFocus: this.eventFunction(e),
        libTbBlur: this.eventFunction(e),
    };

    eventFunction(event) {
        console.log('Event: ', event);
    }
}
```

```html
<lib-tb-input-text-area [custom]="inputTextAreaCustom"></lib-tb-input-text-area>
<!-- USO DE [(ngModel)] -->
<lib-tb-input-text-area [(ngModel)]="variable" [custom]="inputTextAreaCustom"></lib-tb-input-text-area>
```
