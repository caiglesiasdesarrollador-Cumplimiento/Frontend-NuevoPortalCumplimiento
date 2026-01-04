```typescript
// Componente LibTbStepperVerticalComponent creado y exportado desde la librería tech-block-lib
import { ILibTbStepperVertical } from './stepper-vertical.interface';
@Component({
  selector: 'lib-tb-stepper-vertical',
  templateUrl: './stepper-vertical.component.html'
})
export class LibTbStepperVerticalComponent {
    // custom: ILibTbStepperVertical, es el único @Input() que tiene definido el componente lib-tb-stepper-vertical
  @Input() custom: ILibTbStepperVertical = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbStepperVertical
}
```

```typescript
// Modulo donde se declara y se exporta LibTbStepperVerticalComponent
import { LibTbStepperVerticalComponent } from './stepper-vertical.component';
@NgModule({
  declarations: [LibTbStepperVerticalComponent],
  exports: [LibTbStepperVerticalComponent, ...],
  ...
})
export class LibTbStepperVerticalModule {}
```
