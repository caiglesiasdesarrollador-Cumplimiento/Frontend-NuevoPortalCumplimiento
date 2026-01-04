```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbChipModule
  import { LibTbChipModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbChipModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbChip desde la librería tech-block-lib
import { ILibTbChip } from 'tech-block-lib';
@Component()
export class TestComponent {
    chipCustom: ILibTbChip = {
        label: 'Text string',
        icon: 'fal fa-location-circle',
        img: 'src-img',
        // style: {'color': 'red'},
        class: 'class__custom',
        removable: true,
        libTbOnRemove: () => this.chipDelete()
    }

    chipDelete(): void {
        console.log('Chip eliminado');
    }
}
```

```html
<lib-tb-chip [custom]="chipCustom">
  Contenido HTML
</lib-tb-chip>
```
