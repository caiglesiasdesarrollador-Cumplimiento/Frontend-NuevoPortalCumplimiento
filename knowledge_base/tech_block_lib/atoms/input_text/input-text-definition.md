```typescript
// Componente LibTbInputTextComponent creado y exportado desde la librería tech-block-lib
import { ILibTbInputText } from './input-text.interface';
@Component({
  selector: 'lib-tb-input-text',
  templateUrl: './input-text.component.html'
})
export class LibTbInputTextComponent extends LibTbAssignmentTemplatesForm {
    // custom: ILibTbInputText, es el único @Input() que tiene el componente lib-tb-input-text, para los atributos y eventos del mismo.
    @Input() custom: ILibTbInputText = {};
    // Solo existen 2 @Input() más, encargados de gestionar templates (labelTemplate y captionTemplate)
    @Input() labelTemplate: any;
    @Input() captionTemplate: any;
    ... // No existen @Output() porque los eventos se definen en la interface ILibTbInputText
}
```

```typescript
// Modulo donde se declara y se exporta LibTbInputTextComponent
import { LibTbInputTextComponent } from './input-text.component';
@NgModule({
  declarations: [LibTbInputTextComponent],
  exports: [LibTbInputTextComponent, ...],
  ...
})
export class LibTbInputTextModule {}
```
