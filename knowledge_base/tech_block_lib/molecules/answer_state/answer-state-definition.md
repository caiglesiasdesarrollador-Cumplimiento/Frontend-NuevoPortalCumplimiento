```typescript
// Componente LibTbAnswerStateComponent creado y exportado desde la librería tech-block-lib
import { ILibTbAnswerState } from './answer-state.interface';
@Component({
  selector: 'lib-tb-answer-state',
  templateUrl: './answer-state.component.html'
})
export class LibTbAnswerStateComponent {
    // custom: ILibTbAnswerState, es el único @Input() que tiene definido el componente lib-tb-answer-state
  @Input() custom: ILibTbAnswerState = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbAnswerState
}
```

```typescript
// Modulo donde se declara y se exporta LibTbAnswerStateComponent
import { LibTbAnswerStateComponent } from './answer-state.component';
@NgModule({
  declarations: [LibTbAnswerStateComponent],
  exports: [LibTbAnswerStateComponent, ...],
  ...
})
export class LibTbAnswerStateModule {}
```
