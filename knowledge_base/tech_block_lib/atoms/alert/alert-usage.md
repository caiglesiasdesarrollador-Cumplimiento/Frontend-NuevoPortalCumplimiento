```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbAlertModule
  import { LibTbAlertModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbAlertModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbAlert y el servicio LibTbAlertService desde la librería tech-block-lib
import { ILibTbAlert, LibTbAlertService } from 'tech-block-lib';
@Component()
export class TestComponent {
    alertFloatCustom: ILibTbAlert = {
        key: 'alert',
        position: 'top-right',
        libTbOnClose: e => {
            console.log('Se cerró la alerta', e);
        }
    };
    alertFixedCustom: ILibTbAlert = {
        float: false,
        alerts: [{ // Pueden existir, tantas alertas como se desee y si es necesario se pueden agregar más, programáticamente
            type: 'info',
            title: 'Título',
            description: 'Contenido',
            closable: true,
            icon: 'fa fa-user-circle',
        }],
        bgColor: true,
        class: 'alert-custom',
        libTbOnClose: e => {
            console.log(e);
        }
    };
    constructor(private alertService: LibTbAlertService) {}
    showAlerts(): void {
        this.alertService.addAll([
            {
                key: 'alert',
                type: 'success',
                title: 'Correcto',
                description: 'Message Content',
            },
            {
                key: 'alert',
                type: 'info',
                title: 'Información',
                description: 'Message Content',
                sticky: true,
            },
            {
                key: 'alert',
                type: 'warning',
                title: 'Advertencia',
                description: 'Message Content',
                sticky: true,
            },
            {
                key: 'alert',
                type: 'error',
                title: 'Error',
                description: 'Message Content',
                sticky: true,
            },
        ]);
    }
}
```

```html
<!-- Alerta Flotante -->
<lib-tb-alert [custom]="alertFloatCustom"></lib-tb-alert>
<button (click)="showAlerts()">Mostrar alertas flotantes</button>
<!-- Alerta Fija -->
<lib-tb-alert [custom]="alertFixedCustom"></lib-tb-alert>
```
