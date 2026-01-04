```typescript
// Componente LibTbChartComponent creado y exportado desde la librería tech-block-lib
import { ILibTbChart } from './chart.interface';
@Component({
  selector: 'lib-tb-chart',
  templateUrl: './chart.component.html'
})
export class LibTbChartComponent {
    // custom: ILibTbChart, es el único @Input() que tiene definido el componente lib-tb-chart
  @Input() custom: ILibTbChart = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbChart
}
```

```typescript
// Modulo donde se declara y se exporta LibTbChartComponent
import { LibTbChartComponent } from './chart.component';
@NgModule({
  declarations: [LibTbChartComponent],
  exports: [LibTbChartComponent, ...],
  ...
})
export class LibTbChartModule {}
```
