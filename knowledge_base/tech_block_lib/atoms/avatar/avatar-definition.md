```typescript
// Componente LibTbAvatarComponent creado y exportado desde la librería tech-block-lib
import { ILibTbAvatar } from './avatar.interface';
@Component({
  selector: 'lib-tb-avatar',
  templateUrl: './avatar.component.html'
})
export class LibTbAvatarComponent {
    // custom: ILibTbAvatar, es el único @Input() que tiene definido el componente lib-tb-avatar
  @Input() custom: ILibTbAvatar = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbAvatar
}
```

```typescript
// Modulo donde se declara y se exporta LibTbAvatarComponent
import { LibTbAvatarComponent } from './avatar.component';
@NgModule({
  declarations: [LibTbAvatarComponent],
  exports: [LibTbAvatarComponent, ...],
  ...
})
export class LibTbAvatarModule {}
```
