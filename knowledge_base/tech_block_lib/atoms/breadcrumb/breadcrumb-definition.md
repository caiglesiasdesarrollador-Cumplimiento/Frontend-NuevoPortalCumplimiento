```typescript
// Componente LibTbBreadcrumbComponent creado y exportado desde la librería tech-block-lib
import { ILibTbBreadcrumb } from './breadcrumb.interface';
@Component({
  selector: 'lib-tb-breadcrumb',
  templateUrl: './breadcrumb.component.html'
})
export class LibTbBreadcrumbComponent {
    // custom: ILibTbBreadcrumb, es el único @Input() que tiene definido el componente lib-tb-breadcrumb
  @Input() custom: ILibTbBreadcrumb = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbBreadcrumb
}
```

```typescript
// Modulo donde se declara y se exporta LibTbBreadcrumbComponent
import { LibTbBreadcrumbComponent } from './breadcrumb.component';
@NgModule({
  declarations: [LibTbBreadcrumbComponent],
  exports: [LibTbBreadcrumbComponent, ...],
  ...
})
export class LibTbBreadcrumbModule {}
```
