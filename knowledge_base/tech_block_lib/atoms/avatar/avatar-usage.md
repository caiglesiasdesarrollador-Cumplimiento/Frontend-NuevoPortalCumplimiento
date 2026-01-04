```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbAvatarModule
  import { LibTbAvatarModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbAvatarModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbAvatar desde la librería tech-block-lib
import { ILibTbAvatar } from 'tech-block-lib';
@Component()
export class testComponent {
    avatarCustom: ILibTbAvatar = {
        label: 'SB',
        icon: 'fa-light fa-user',
        img: 'image',
        size: 'xlarge',
        // style: { fontWeight: 'bold', background: 'var(--primary-400)', color: 'var(--grayscale--white)' },
        showButton: true,
        customButton: {
            icon: 'fa-light fa-pencil',
            libTbClick: () => functionClickBtn(),
        },
        libTbClick: () => functionClickAvatar()
    }
}
```

```html
<lib-tb-avatar [custom]="avatarCustom"></lib-tb-avatar>
```
