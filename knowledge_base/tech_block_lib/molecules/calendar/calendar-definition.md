```typescript
// Componente LibTbCalendarComponent creado y exportado desde la librería tech-block-lib
import { ILibTbCalendar } from './calendar.interface';
@Component({
  selector: 'lib-tb-calendar',
  templateUrl: './calendar.component.html'
})
export class LibTbCalendarComponent extends LibTbAssignmentTemplatesForm {
    // custom: ILibTbCalendar, es el único @Input() que tiene el componente lib-tb-calendar, para los atributos y eventos del mismo.
    @Input() custom: ILibTbCalendar = {};
    ... // No existen @Output() porque los eventos se definen en la interface ILibTbCalendar
}
```

```typescript
// Modulo donde se declara y se exporta LibTbCalendarComponent
import { LibTbCalendarComponent } from './calendar.component';
import { LibTbButtonModule } from '../../atoms/button/button.module';
@NgModule({
  declarations: [LibTbCalendarComponent],
  exports: [LibTbCalendarComponent, ...],
  imports: [
    ...
    LibTbButtonModule,
    ...
  ],
  ...
})
export class LibTbCalendarModule {}
```
