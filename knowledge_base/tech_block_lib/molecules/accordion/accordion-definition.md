```typescript
// Componente LibTbAccordionComponent creado y exportado desde la librería tech-block-lib
import { ILibTbAccordion } from './accordion.interface';
@Component({
  selector: 'lib-tb-accordion',
  templateUrl: './accordion.component.html'
})
export class LibTbAccordionComponent {
    // custom: ILibTbAccordion, es el único @Input() que tiene definido el componente lib-tb-accordion
  @Input() custom: ILibTbAccordion = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbAccordion
}
```

```typescript
// Componente LibTbAccordionTabComponent creado y exportado desde la librería tech-block-lib
import { ILibTbAccordionTab } from './accordion.interface';
@Component({
  selector: 'lib-tb-accordion-tab',
  templateUrl: './accordion-tab.component.html'
})
export class LibTbAccordionTabComponent {
    // custom: ILibTbAccordionTab, es el único @Input() que tiene definido el componente lib-tb-accordion-tab
  @Input() custom: ILibTbAccordionTab = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbAccordionTab
}
```

```typescript
// Modulo donde se declara y se exporta LibTbAccordionComponent
import { LibTbAccordionComponent } from './accordion.component';
import { LibTbAccordionTabComponent } from './accordion-tab.component';
@NgModule({
  declarations: [LibTbAccordionComponent, LibTbAccordionTabComponent],
  exports: [LibTbAccordionComponent, LibTbAccordionTabComponent, ...],
  ...
})
export class LibTbAccordionModule {}
```
