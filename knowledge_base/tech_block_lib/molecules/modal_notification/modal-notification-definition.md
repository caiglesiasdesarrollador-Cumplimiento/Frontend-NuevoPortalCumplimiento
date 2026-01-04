```typescript
// Componente LibTbModalNotificationComponent creado y exportado desde la librería tech-block-lib
import { ILibTbModalNotification } from './modal-notification.interface';
@Component({
  selector: 'lib-tb-modal-notification',
  templateUrl: './modal-notification.component.html'
})
export class LibTbModalNotificationComponent {
    // custom: ILibTbModalNotification, es el único @Input() que tiene definido el componente lib-tb-modal-notification
  @Input() custom: ILibTbModalNotification = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbModalNotification
}
```

```typescript
// Modulo donde se declara y se exporta LibTbModalNotificationComponent
import { LibTbModalNotificationComponent } from './modal-notification.component';
@NgModule({
  declarations: [LibTbModalNotificationComponent],
  exports: [LibTbModalNotificationComponent, ...],
  ...
})
export class LibTbModalNotificationModule {}
```
