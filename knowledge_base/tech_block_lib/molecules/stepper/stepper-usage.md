```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbStepperModule
  import { LibTbStepperModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbStepperModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbStepper desde la librería tech-block-lib
import { ILibTbStepper } from 'tech-block-lib';
@Component()
export class TestComponent {
    stepperCustom: ILibTbStepper = {
        activeIndex: 0,
        readonly: false,
        // style: {'witdh':'100%'},
        class: 'm-stepper',
        design: 'desk',
        type: 'number',
        items: [
            {
                label: 'Step 1',
                icon: 'fa fa-times',
                command: (): void => {
                    console.log('click');
                    this.stepperCustom.activeIndex = 0;
                },

            },
            {
                disabled: false,
                label: 'Step 2',
                icon: 'fa fa-user',
                command: (): void => {
                    console.log('click');
                    this.stepperCustom.activeIndex = 1;
                },
            },
            {
                label: 'Step 3',
                icon: 'fa fa-user',
                command: (): void => {
                    console.log('click');
                    this.stepperCustom.activeIndex = 2;
                },
                styleClass: 'view'
            }
        ]
    }
}
```

```html
<lib-tb-stepper [custom]="stepperCustom"></lib-tb-stepper>
```
