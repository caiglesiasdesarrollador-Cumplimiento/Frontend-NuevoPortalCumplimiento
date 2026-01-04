```typescript
// Componente LibTbSwitchComponent creado y exportado desde la librería tech-block-lib
import { ILibTbSwitch } from './switch.interface';
@Component({
  selector: 'lib-tb-switch',
  templateUrl: './switch.component.html'
})
export class LibTbSwitchComponent {
    // custom: ILibTbSwitch, es el único @Input() que tiene definido el componente lib-tb-switch
  @Input() custom: ILibTbSwitch = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbSwitch
}
```

```typescript
// Modulo donde se declara y se exporta LibTbSwitchComponent
import { LibTbSwitchComponent } from './switch.component';
@NgModule({
  declarations: [LibTbSwitchComponent],
  exports: [LibTbSwitchComponent, ...],
  ...
})
export class LibTbSwitchModule {}
```
