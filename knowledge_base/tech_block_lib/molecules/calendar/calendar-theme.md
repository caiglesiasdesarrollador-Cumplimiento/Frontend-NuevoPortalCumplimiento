```css
.calendar-css-variables {
  /* General */
  --c-lib-tb-calendar-font-family: ;
  --c-lib-tb-calendar-text-decoration: ;
  --c-lib-tb-calendar-font-size: ;
  --c-lib-tb-calendar-font-size-title: ;

  /* Default */
  --c-lib-tb-calendar-bg: ;
  --c-lib-tb-calendar-border-color: ;
  --c-lib-tb-calendar-border-radius: ;
  --c-lib-tb-calendar-bg-off: ;
  --c-lib-tb-calendar-bg-on: ;
  --c-lib-tb-calendar-bg-current: ;
  --c-lib-tb-calendar-color: ;
  --c-lib-tb-calendar-color-other: ;
  --c-lib-tb-calendar-border-color-item: ;
  --c-lib-tb-calendar-border-radius-item: ;
  --c-lib-tb-calendar-border-radius-month-year: ;
  --c-lib-tb-calendar-box-shadow: ;

  /* Hover */
  --c-lib-tb-calendar-bg-off-hover: ;
  --c-lib-tb-calendar-bg-on-hover: ;
  --c-lib-tb-calendar-bg-current-hover: ;
  --c-lib-tb-calendar-color-hover: ;
  --c-lib-tb-calendar-border-color-item-hover: ;

  /* Pressed */
  --c-lib-tb-calendar-bg-off-active: ;
  --c-lib-tb-calendar-bg-on-active: ;
  --c-lib-tb-calendar-bg-current-active: ;
  --c-lib-tb-calendar-color-active: ;
  --c-lib-tb-calendar-border-color-item-off-active: ;
  --c-lib-tb-calendar-border-color-item-on-active: ;
  --c-lib-tb-calendar-border-color-item-current-active: ;

  /* Disabled */
  --c-lib-tb-calendar-bg-item-disabled: ;
  --c-lib-tb-calendar-color-disabled: ;
  --c-lib-tb-calendar-border-color-item-disabled: ;
  --c-lib-tb-calendar-text-decoration-disabled: ;

  /* Error */
  --c-lib-tb-calendar-bg-item-error: ;
  --c-lib-tb-calendar-color-error: ;
  --c-lib-tb-calendar-border-color-error: ;
}
```

```typescript
/** COMPONENTE  */
calendarCustomTheme: ILibTbCalendar = {
  ...calendarCustom,
  class: 'calendar-css-variables'
};
```

```html
<lib-tb-calendar [custom]="calendarCustomTheme"></lib-tb-calendar>
```
