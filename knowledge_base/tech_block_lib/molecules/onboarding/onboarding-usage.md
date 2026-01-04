```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbOnboardingModule
  import { LibTbOnboardingModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbOnboardingModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa las interface ILibTbButton, ILibTbOnboarding y el servicio LibTbOnboardingService desde la librería tech-block-lib
import { ILibTbButton, ILibTbOnboarding, LibTbOnboardingService } from 'tech-block-lib';
@Component()
export class TestComponent {
    onboardingCustom: ILibTbOnboarding = {
        type: 'guide',
        leitmotiv: true,
        steps: [
            {
                selector: '#opciones',
                title: 'Configuración',
                description:
                    'En esta sección puede configurar las propiedades que debe tener el componente a utilizar',
                position: 'top'
            },
            {
                selector: '#valor',
                title: 'Propiedad',
                description:
                    'Esta es una de las propiedades del componentes. Complete este campo para establecerla de manera correcta',
                position: 'top',
                button: {
                    label: 'Button CTA',
                }
            },
            {
                selector: '#resultado',
                title: 'Resultado',
                description: 'Este es el resultado de la configuración del componente',
                position: 'left'
            },
        ]
    }
    initOnboardingBtnCustom: ILibTbButton = {
        label: 'Iniciar onboarding',
        libTbClick: () => {
            this.initOnboarding();
        },
    }
    constructor(private libTbOnboardingService: LibTbOnboardingService) {}
    initOnboarding(): void {
        this.libTbOnboardingService.show();
    }
    finishOnboarding(): void {
        this.libTbOnboardingService.hide();
    }
}
```

```html
<lib-tb-button [custom]="initOnboardingBtnCustom"></lib-tb-button>
<lib-tb-onboarding [custom]="onboardingCustom"> </lib-tb-onboarding>
```
