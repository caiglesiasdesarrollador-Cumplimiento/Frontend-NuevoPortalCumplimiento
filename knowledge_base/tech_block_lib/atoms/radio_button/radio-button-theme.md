```css
.radio-button-css-variables {
  /* General */
  --c-lib-tb-radiobutton-font-family: ;
  --c-lib-tb-radiobutton-font-size: ;
  --c-lib-tb-radiobutton-border-width: ;

  /* Default */
  --c-lib-tb-radiobutton-bg-radio: ;
  --c-lib-tb-radiobutton-color: ;
  --c-lib-tb-radiobutton-border-color: ;
  --c-lib-tb-radiobutton-color-primary-box-shadow: ;
  --c-lib-tb-radiobutton-color-secondary-box-shadow: ;
  /* Hover */
  --c-lib-tb-radiobutton-bg-radio-hover: ;
  --c-lib-tb-radiobutton-color-hover: ;
  --c-lib-tb-radiobutton-border-color-hover: ;
  --c-lib-tb-radiobutton-color-primary-box-shadow-hover: ;
  --c-lib-tb-radiobutton-color-secondary-box-shadow-hover: ;
  /* Pressed */
  --c-lib-tb-radiobutton-bg-radio-pressed: ;
  --c-lib-tb-radiobutton-color-pressed: ;
  --c-lib-tb-radiobutton-border-color-pressed: ;
  --c-lib-tb-radiobutton-color-primary-box-shadow-pressed: ;
  --c-lib-tb-radiobutton-color-secondary-box-shadow-pressed: ;
  /* Focus */
  --c-lib-tb-radiobutton-bg-radio-focus: ;
  --c-lib-tb-radiobutton-color-focus: ;
  --c-lib-tb-radiobutton-border-color-focus: ;
  --c-lib-tb-radiobutton-color-primary-box-shadow-focus: ;
  --c-lib-tb-radiobutton-color-secondary-box-shadow-focus: ;
  /* Disabled */
  --c-lib-tb-radiobutton-bg-radio-disabled: ;
  --c-lib-tb-radiobutton-color-disabled: ;
  --c-lib-tb-radiobutton-border-color-disabled: ;
  --c-lib-tb-radiobutton-color-primary-box-shadow-disabled: ;
  --c-lib-tb-radiobutton-color-secondary-box-shadow-disabled: ;
  /* Error */
  --c-lib-tb-radiobutton-bg-radio-error: ;
  --c-lib-tb-radiobutton-color-error: ;
  --c-lib-tb-radiobutton-border-color-error: ;
  --c-lib-tb-radiobutton-color-primary-box-shadow-error: ;
  --c-lib-tb-radiobutton-color-secondary-box-shadow-error: ;
  /* Selected Default */
  --c-lib-tb-radiobutton-bg-radio-selected: ;
  --c-lib-tb-radiobutton-color-check-selected: ;
  --c-lib-tb-radiobutton-color-selected: ;
  --c-lib-tb-radiobutton-border-color-selected: ;
  --c-lib-tb-radiobutton-color-primary-box-shadow-selected: ;
  --c-lib-tb-radiobutton-color-secondary-box-shadow-selected: ;
  /* Selected Hover */
  --c-lib-tb-radiobutton-bg-radio-hover-selected: ;
  --c-lib-tb-radiobutton-color-check-hover-selected: ;
  --c-lib-tb-radiobutton-color-hover-selected: ;
  --c-lib-tb-radiobutton-border-color-hover-selected: ;
  --c-lib-tb-radiobutton-color-primary-box-shadow-hover-selected: ;
  --c-lib-tb-radiobutton-color-secondary-box-shadow-hover-selected: ;
  /* Selected Pressed */
  --c-lib-tb-radiobutton-bg-radio-pressed-selected: ;
  --c-lib-tb-radiobutton-color-check-pressed-selected: ;
  --c-lib-tb-radiobutton-color-pressed-selected: ;
  --c-lib-tb-radiobutton-border-color-pressed-selected: ;
  --c-lib-tb-radiobutton-color-primary-box-shadow-pressed-selected: ;
  --c-lib-tb-radiobutton-color-secondary-box-shadow-pressed-selected: ;
  /* Selected Focus */
  --c-lib-tb-radiobutton-bg-radio-focus-selected: ;
  --c-lib-tb-radiobutton-color-check-focus-selected: ;
  --c-lib-tb-radiobutton-color-focus-selected: ;
  --c-lib-tb-radiobutton-border-color-focus-selected: ;
  --c-lib-tb-radiobutton-color-primary-box-shadow-focus: ;
  --c-lib-tb-radiobutton-color-secondary-box-shadow-focus: ;
  /* Selected Disabled */
  --c-lib-tb-radiobutton-bg-radio-disabled-selected: ;
  --c-lib-tb-radiobutton-color-check-disabled-selected: ;
  --c-lib-tb-radiobutton-color-disabled-selected: ;
  --c-lib-tb-radiobutton-border-color-disabled-selected: ;
  --c-lib-tb-radiobutton-color-primary-box-shadow-disabled-selected: ;
  --c-lib-tb-radiobutton-color-secondary-box-shadow-disabled-selected: ;
  /* Selected Error */
  --c-lib-tb-radiobutton-bg-radio-error-selected: ;
  --c-lib-tb-radiobutton-color-check-error-selected: ;
  --c-lib-tb-radiobutton-color-error-selected: ;
  --c-lib-tb-radiobutton-border-color-error-selected: ;
  --c-lib-tb-radiobutton-color-primary-box-shadow-error-selected: ;
  --c-lib-tb-radiobutton-color-secondary-box-shadow-error-selected: ;
}
```

```typescript
/** COMPONENTE  */
radioButtonCustomTheme: ILibTbCalendar = {
  ...radioButtonCustom,
  class: 'radio-button-css-variables'
};
```

```html
<lib-tb-radio-button [custom]="radioButtonCustomTheme"></lib-tb-radio-button>
```
