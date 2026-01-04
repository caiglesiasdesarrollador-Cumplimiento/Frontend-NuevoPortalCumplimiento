```typescript
// Servicio LibTbAlertService creado y exportado desde la librería tech-block-lib
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ILibTbAlertMessage } from './alert.interface';

@Injectable()
export class LibTbAlertService {
  alertSource = new Subject<ILibTbAlertMessage | ILibTbAlertMessage[]>();
  clearSource = new Subject<string | null>();

  alertObserver = this.alertSource.asObservable();
  clearObserver = this.clearSource.asObservable();

  add(message: ILibTbAlertMessage): void {
    if (message) {
      this.alertSource.next(message);
    }
  }

  addAll(messages: ILibTbAlertMessage[]): void {
    if (messages.length) {
      this.alertSource.next(messages);
    }
  }

  clear(key?: string): void {
    this.clearSource.next(key ?? null);
  }
}
```

```typescript
// Componente LibTbAlertComponent creado y exportado desde la librería tech-block-lib
import { ILibTbAlert, ILibTbAlertMessage } from './alert.interface';
@Component({
  selector: 'lib-tb-alert',
  templateUrl: './alert.component.html'
})
export class LibTbAlertComponent {
    // custom: ILibTbAlert, es el único @Input() que tiene definido el componente lib-tb-alert
  @Input() custom: ILibTbAlert = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbAlert
}
```

```typescript
// Modulo donde se declara y se exporta LibTbAlertComponent
import { LibTbAlertComponent } from './alert.component';
import { LibTbAlertService } from './alert.service';
@NgModule({
  declarations: [LibTbAlertComponent],
  exports: [LibTbAlertComponent, ...],
  providers: [LibTbAlertService, ...]
  ...
})
export class LibTbAlertModule {}
```
