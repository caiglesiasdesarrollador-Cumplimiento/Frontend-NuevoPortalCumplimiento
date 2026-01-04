```typescript
// Componente LibTbProgressBarComponent creado y exportado desde la librería tech-block-lib
import { ILibTbProgressBar } from './progress-bar.interface';
@Component({
  selector: 'lib-tb-progress-bar',
  templateUrl: './progress-bar.component.html'
})
export class LibTbProgressBarComponent {
    // custom: ILibTbProgressBar, es el único @Input() que tiene definido el componente lib-tb-progress-bar
  @Input() custom: ILibTbProgressBar = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbProgressBar
}
```

```typescript
// Modulo donde se declara y se exporta LibTbProgressBarComponent
import { LibTbProgressBarComponent } from './progress-bar.component';
@NgModule({
  declarations: [LibTbProgressBarComponent],
  exports: [LibTbProgressBarComponent, ...],
  ...
})
export class LibTbProgressBarModule {}
```
