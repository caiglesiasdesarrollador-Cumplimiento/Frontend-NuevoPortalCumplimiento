```typescript
// Componente LibTbDropdownMultiSelectComponent creado y exportado desde la librería tech-block-lib
import { ILibTbDropdownMultiSelect } from './dropdown-multi-select.interface';
@Component({
  selector: 'lib-tb-dropdown-multi-select',
  templateUrl: './dropdown-multi-select.component.html'
})
export class LibTbDropdownMultiSelectComponent extends LibTbAssignmentTemplatesForm {
    // custom: ILibTbDropdownMultiSelect , es el único @Input() que tiene el componente lib-tb-dropdown-multi-select.
    @Input() custom: ILibTbDropdownMultiSelect  = {};
    ... // No existen @Output() porque los eventos se definen en la interface ILibTbDropdownMultiSelect
```

```typescript
// Modulo donde se declara y se exporta LibTbDropdownMultiSelectComponent
import { LibTbDropdownMultiSelectComponent } from './dropdown-multi-select.component';
@NgModule({
  declarations: [LibTbDropdownMultiSelectComponent],
  exports: [LibTbDropdownMultiSelectComponent, ...],
  ...
})
export class LibTbDropdownMultiSelectModule {}
```
