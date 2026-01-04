```typescript
// Componente LibTbDropdownComponent creado y exportado desde la librería tech-block-lib
import { ILibTbDropdown } from './dropdown.interface';
@Component({
  selector: 'lib-tb-dropdown',
  templateUrl: './dropdown.component.html'
})
export class LibTbDropdownComponent extends LibTbAssignmentTemplatesForm {
    // custom: ILibTbDropdown , es el único @Input() que tiene el componente lib-tb-dropdown.
    @Input() custom: ILibTbDropdown  = {};
    ... // No existen @Output() porque los eventos se definen en la interface ILibTbDropdown
```

```typescript
// Modulo donde se declara y se exporta LibTbDropdownComponent
import { LibTbDropdownComponent } from './dropdown.component';
@NgModule({
  declarations: [LibTbDropdownComponent],
  exports: [LibTbDropdownComponent, ...],
  ...
})
export class LibTbDropdownModule {}
```
