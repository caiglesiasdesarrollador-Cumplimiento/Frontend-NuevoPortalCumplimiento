```typescript
// Componente LibTbStepperComponent creado y exportado desde la librería tech-block-lib
import { ILibTbStepper } from './stepper.interface';
@Component({
  selector: 'lib-tb-stepper',
  templateUrl: './stepper.component.html'
})
export class LibTbStepperComponent {
    // custom: ILibTbStepper, es el único @Input() que tiene definido el componente lib-tb-stepper
  @Input() custom: ILibTbStepper = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbStepper
}
```

```typescript
// Modulo donde se declara y se exporta LibTbStepperComponent
import { LibTbStepperComponent } from './stepper.component';
@NgModule({
  declarations: [LibTbStepperComponent],
  exports: [LibTbStepperComponent, ...],
  ...
})
export class LibTbStepperModule {}
```
