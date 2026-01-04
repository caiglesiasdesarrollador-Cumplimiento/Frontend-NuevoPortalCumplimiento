```typescript
// Componente LibTbEmptyMessageComponent creado y exportado desde la librería tech-block-lib
import { ILibTbEmptyMessage } from './empty-message.interface';
@Component({
  selector: 'lib-tb-empty-message',
  templateUrl: './empty-message.component.html'
})
export class LibTbEmptyMessageComponent {
    // custom: ILibTbEmptyMessage, es el único @Input() que tiene definido el componente lib-tb-empty-message
  @Input() custom: ILibTbEmptyMessage = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbEmptyMessage
}
```

```typescript
// Modulo donde se declara y se exporta LibTbEmptyMessageComponent
import { LibTbEmptyMessageComponent } from './empty-message.component';
@NgModule({
  declarations: [LibTbEmptyMessageComponent],
  exports: [LibTbEmptyMessageComponent, ...],
  ...
})
export class LibTbEmptyMessageModule {}
```
