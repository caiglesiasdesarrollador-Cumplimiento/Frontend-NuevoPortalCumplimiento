```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbStepperVerticalModule
  import { LibTbStepperVerticalModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbStepperVerticalModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbStepperVertical y ILibTbStep desde la librería tech-block-lib
import { ILibTbStepperVertical, ILibTbStep } from 'tech-block-lib';
@Component()
export class TestComponent {
    stepperVerticalCustom: ILibTbStepperVertical = {
        type: 'mix',
        activeIndex: 0,
        class: 'stepper-vertical',
    }

    stepperVerticalStep1: ILibTbStep = {
        title: 'Información Básica',
    }

    stepperVerticalStep2: ILibTbStep = {
        title: 'Información de contacto',
        view: true,
    }
}
```

```html
<lib-tb-stepper-vertical [custom]="stepperVerticalCustom">
  <lib-tb-step [custom]="stepperVerticalStep1">
    <!-- CONTENIDO -->
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione expedita
      exercitationem, voluptatum consequuntur fugit in!
    </p>
  </lib-tb-step>

  <lib-tb-step [custom]="stepperVerticalStep2">
    <!-- CONTENIDO -->
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione expedita
      exercitationem, voluptatum consequuntur fugit in!
    </p>
  </lib-tb-step>
</lib-tb-stepper-vertical>
```
