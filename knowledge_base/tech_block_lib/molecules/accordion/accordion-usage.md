```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbAccordionModule
  import { LibTbAccordionModule } from 'tech-block-lib';
  @NgModule({
    // ..
    imports: [
      LibTbAccordionModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbAccordion desde la librería tech-block-lib
import { ILibTbAccordion } from 'tech-block-lib';
@Component()
export class TestComponent {
    accordionCustom: ILibTbAccordion = {
        multiple: false,
        // expandIcon: 'fa fa-user',
        // collapseIcon: 'fa fa-heart',
        // activeIndex: '2',
        style: { width: '500px' },
        // class: 'custom__class',
        libTbOnOpen: e => {
            console.log('Open', e);
        }
    }
}
```

```html
<lib-tb-accordion [custom]="accordionCustom">
  <lib-tb-accordion-tab [custom]="{ header: 'header 1', selected: true }">
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione expedita
      exercitationem, voluptatum consequuntur fugit in!
    </p>
  </lib-tb-accordion-tab>
  <lib-tb-accordion-tab [custom]="{ header: 'header 2' }">
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione expedita
      exercitationem, voluptatum consequuntur fugit in!
    </p>
  </lib-tb-accordion-tab>
</lib-tb-accordion>
```
