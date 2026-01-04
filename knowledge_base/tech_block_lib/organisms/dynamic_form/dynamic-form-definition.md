```typescript
import {
  ILibTbDynamicForm,
  ILibTbDynamicFormConfigType,
  ILibTbDynamicFormContainer,
  ILibTbValidatorConfig,
} from './dynamic-form.interface';
import { LibTbTemplateDirective } from '../shared/template';
// El componente dynamic-form se encarga de crear un formulario a través de una configuración en JSON
// Componente LibTbDynamicFormComponent creado y exportado desde la librería tech-block-lib
@Component({
  selector: 'lib-tb-dynamic-form',
  templateUrl: './dynamic-form.component.html',
})
export class LibTbDynamicFormComponent {
  // custom: ILibTbDynamicForm, es el único @Input() que tiene definido el componente lib-tb-dynamic-form
  @Input() custom: ILibTbDynamicForm = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbDynamicForm
  @ContentChildren(LibTbTemplateDirective) templates?: QueryList<any>;
}
```

```typescript
// Modulo donde se declara y se exporta LibTbDynamicFormComponent
import { LibTbDynamicFormComponent } from './dynamic-form.component';
@NgModule({
  declarations: [LibTbDynamicFormComponent],
  exports: [LibTbDynamicFormComponent, ...],
  ...
})
export class LibTbDynamicFormModule {}
```
