```typescript
// Componente LibTbModalComponent creado y exportado desde la librería tech-block-lib
import { ILibTbModal } from './modal.interface';
@Component({
  selector: 'lib-tb-modal',
  templateUrl: './modal.component.html'
})
export class LibTbModalComponent {
    // custom: ILibTbModal, es el único @Input() que tiene definido el componente lib-tb-modal
  @Input() custom: ILibTbModal = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbModal
}
```

```typescript
// Modulo donde se declara y se exporta LibTbModalComponent
import { LibTbModalComponent } from './modal.component';
@NgModule({
  declarations: [LibTbModalComponent],
  exports: [LibTbModalComponent, ...],
  ...
})
export class LibTbModalModule {}
```
