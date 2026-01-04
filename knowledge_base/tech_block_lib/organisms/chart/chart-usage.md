```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbChartModule
  import { LibTbChartModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbChartModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbChart desde la librería tech-block-lib
import { ILibTbChart } from 'tech-block-lib';
@Component()
export class TestComponent {
    chartCustom: ILibTbChart = {
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Dataset 1',
                    backgroundColor: [
                        '#48555B',
                        '#AFC4CC',
                        '#BEC0C6',
                        '#32383B',
                        '#90ADB8',
                        '#A5A7B0',
                        '#769AA8'
                    ],
                    yAxisID: 'y',
                    data: [65, 59, 80, 81, 56, 55, 10]
                },
                {
                    label: 'Dataset 2',
                    backgroundColor: '#78909C',
                    yAxisID: 'y1',
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        }
    }
}
```

```html
<lib-tb-chart [custom]="chartCustom"></lib-tb-chart>
```
