```typescript
  /** MÓDULO */
  // Se debe importar el modulo LibTbCalendarModule
  import { LibTbCalendarModule } from 'tech-block-lib';

  @NgModule({
    // ..
    imports: [
      LibTbCalendarModule
    ],
    // ...
  })
  export class AppModule { }
```

```typescript
/** COMPONENTE  */
// se importa la interface ILibTbCalendar desde la librería tech-block-lib
import { ILibTbCalendar } from 'tech-block-lib';
@Component()
export class testComponent {
    calendarCustom: ILibTbCalendar = {
         //formGroup: this.formCalendar,
        // selectionMode: 'multiple',
        // style: { background: 'red' },
        // class: 'custom__class',
        // inputStyle: { background: 'red', color: '#FFF' },
        // inputClass: 'custom__class',
        id: 'calendarId',
        name: 'fecha',
        placeholder: 'Fecha de nacimiento',
        // disabled: true,
        dateFormat: 'dd-mm-yy',
        // inline: false,
        showOtherMonths: true,
        selectOtherMonths: true,
        showIcon: true,
        showOnFocus: true,
        showWeek: false,
        icon: 'fal fa-calendar-day',
        numberOfMonths: 1,
        // appendTo: '',
        readonlyInput: true,
        shortYearCutoff: '+20',
        disabledDays: [0, 6],
        // minDate: new Date('10-22-2022'),
        // maxDate: new Date('10-30-2022'),
        disabledDates: [new Date('02-22-2023'), new Date('02-23-2023')],
        //disabledDays: [0, 6],
        hourFormat: '12',
        // timeOnly: true,
        timeSeparator: '-',
        dataType: 'string',
        tabindex: 10,
        // maxDateCount: 3,
        showButtonBar: true,
        // todayButtonClass: 'p-button-secondary',
        // clearButtonClass: 'custom__class',
        baseZIndex: 0,
        autoZIndex: true,
        // panelClass: 'custom__class',
        // panelStyle: { background: 'red', color: '#FFF' },
        // hideOnDateTimeSelect: false,
        // numberOfMonths: 1,
        view: 'date',
        multipleSeparator: '-',
        rangeSeparator: '/',
        // touchUI: true,
        focusTrap: false,
        caption: true,
        showIconCaption: true,
        showHelp: true,
        captionText: {
            help: 'Texto de ayuda',
            error: 'Texto de error',
            success: 'Texto de éxito',
        },
        iconCaption: {},
        // showTransitionOptions: '.5s ease',
        // hideTransitionOptions: '1s ease-out',
        firstDayOfWeek: 1,
        libTbOnSelect: e => {
            console.log('libTbOnSelect', e);
        },
        libTbOnBlur: e => {
            console.log('libTbOnBlur', e);
        },
    }
}
```

```html
<lib-tb-calendar [custom]="calendarCustom"></lib-tb-calendar>
<!-- USO DE [(ngModel)] -->
<lib-tb-calendar [(ngModel)]="variable" [custom]="calendarCustom"></lib-tb-calendar>
```
