```typescript
// Componente LibTbTabsComponent creado y exportado desde la librería tech-block-lib
import { ILibTbTabs } from './tabs.interface';
@Component({
  selector: 'lib-tb-tabs',
  templateUrl: './tabs.component.html'
})
export class LibTbTabsComponent {
    // custom: ILibTbTabs, es el único @Input() que tiene definido el componente lib-tb-tabs
  @Input() custom: ILibTbTabs = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbTabs
}
```

```typescript
// Modulo donde se declara y se exporta LibTbTabsComponent
import { LibTbTabsComponent } from './tabs.component';
@NgModule({
  declarations: [LibTbTabsComponent],
  exports: [LibTbTabsComponent, ...],
  ...
})
export class LibTbTabsModule {}
```
