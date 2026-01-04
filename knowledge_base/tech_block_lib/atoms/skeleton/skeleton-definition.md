```typescript
// Componente LibTbSkeletonComponent creado y exportado desde la librería tech-block-lib
import { ILibTbSkeleton } from './skeleton.interface';
@Component({
  selector: 'lib-tb-skeleton',
  templateUrl: './skeleton.component.html'
})
export class LibTbSkeletonComponent {
    // custom: ILibTbSkeleton, es el único @Input() que tiene definido el componente lib-tb-skeleton
  @Input() custom: ILibTbSkeleton = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbSkeleton
}
```

```typescript
// Modulo donde se declara y se exporta LibTbSkeletonComponent
import { LibTbSkeletonComponent } from './skeleton.component';
@NgModule({
  declarations: [LibTbSkeletonComponent],
  exports: [LibTbSkeletonComponent, ...],
  ...
})
export class LibTbSkeletonModule {}
```
