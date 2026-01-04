```typescript
// Componente LibTbContextMenuComponent creado y exportado desde la librería tech-block-lib
import { ILibTbContextMenu } from './context-menu.interface';
@Component({
  selector: 'lib-tb-context-menu',
  templateUrl: './context-menu.component.html'
})
export class LibTbContextMenuComponent {
    // custom: ILibTbContextMenu y target?: any, son los únicos @Input() que tiene definido el componente lib-tb-context-menu
  @Input() custom: ILibTbContextMenu = {};
  @Input() target?: any;
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbContextMenu
}
```

```typescript
// Modulo donde se declara y se exporta LibTbContextMenuComponent
import { LibTbContextMenuComponent } from './context-menu.component';
@NgModule({
  declarations: [LibTbContextMenuComponent],
  exports: [LibTbContextMenuComponent, ...],
  ...
})
export class LibTbContextMenuModule {}
```
