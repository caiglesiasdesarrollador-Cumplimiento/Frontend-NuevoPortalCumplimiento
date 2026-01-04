```css
.switch-css-variables {
  /* General */
  --c-lib-tb-switch-font-family: ;
  --c-lib-tb-switch-font-size: ;
  --c-lib-tb-switch-box-shadow-bull: ;
  --c-lib-tb-switch-box-shadow-bull-checked: ;
  --c-lib-tb-switch-box-shadow-bull-disabled: ;
  --c-lib-tb-switch-width-box-shadow: ;
  --c-lib-tb-switch-opacity-box-shadow: ;
  --c-lib-tb-switch-height: ;
  --c-lib-tb-switch-width: ;
  --c-lib-tb-switch-bull-diameter: ;
  --c-lib-tb-switch-bull-mr: ;
  --c-lib-tb-switch-border-width: ;
  --c-lib-tb-switch-border-style: ;

  /* Default */
  --c-lib-tb-switch-label: ;
  --c-lib-tb-switch-bg-track: ;
  --c-lib-tb-switch-bg-bull: ;
  --c-lib-tb-switch-color-box-shadow: ;
  --c-lib-tb-switch-box-shadow: ;
  --c-lib-tb-switch-border-color: ;

  /* Hover */
  --c-lib-tb-switch-label-hover: ;
  --c-lib-tb-switch-bg-track-hover: ;
  --c-lib-tb-switch-bg-bull-hover: ;
  --c-lib-tb-switch-color-box-shadow-hover: ;
  --c-lib-tb-switch-box-shadow-hover: ;
  --c-lib-tb-switch-border-color-hover: ;

  /* Pressed */
  --c-lib-tb-switch-label-pressed: ;
  --c-lib-tb-switch-bg-track-pressed: ;
  --c-lib-tb-switch-bg-bull-pressed: ;
  --c-lib-tb-switch-color-box-shadow-pressed: ;
  --c-lib-tb-switch-box-shadow-pressed: ;
  --c-lib-tb-switch-border-color-pressed: ;

  /* Focus */
  --c-lib-tb-switch-label-focus: ;
  --c-lib-tb-switch-bg-track-focus: ;
  --c-lib-tb-switch-bg-bull-focus: ;
  --c-lib-tb-switch-color-box-shadow-focus: ;
  --c-lib-tb-switch-box-shadow-focus: ;
  --c-lib-tb-switch-border-color-focus: ;

  /* Disabled */
  --c-lib-tb-switch-label-disabled: ;
  --c-lib-tb-switch-bg-track-disabled: ;
  --c-lib-tb-switch-bg-bull-disabled: ;
  --c-lib-tb-switch-color-box-shadow-disabled: ;
  --c-lib-tb-switch-box-shadow-disabled: ;
  --c-lib-tb-switch-border-color-disabled: ;

  /* Error */
  --c-lib-tb-switch-label-error: ;
  --c-lib-tb-switch-bg-track-error: ;
  --c-lib-tb-switch-bg-bull-error: ;
  --c-lib-tb-switch-color-box-shadow-error: ;
  --c-lib-tb-switch-box-shadow-error: ;
  --c-lib-tb-switch-border-color-error: ;

  /* Checked - Default */
  --c-lib-tb-switch-label-checked: ;
  --c-lib-tb-switch-bg-track-checked: ;
  --c-lib-tb-switch-bg-bull-checked: ;
  --c-lib-tb-switch-color-box-shadow-checked: ;
  --c-lib-tb-switch-box-shadow-checked: ;
  --c-lib-tb-switch-border-color-checked: ;

  /* Checked - Hover */
  --c-lib-tb-switch-label-checked-hover: ;
  --c-lib-tb-switch-bg-track-checked-hover: ;
  --c-lib-tb-switch-bg-bull-checked-hover: ;
  --c-lib-tb-switch-color-box-shadow-checked-hover: ;
  --c-lib-tb-switch-box-shadow-checked-hover: ;
  --c-lib-tb-switch-border-color-checked-hover: ;

  /* Checked - Pressed */
  --c-lib-tb-switch-label-checked-pressed: ;
  --c-lib-tb-switch-bg-track-checked-pressed: ;
  --c-lib-tb-switch-bg-bull-checked-pressed: ;
  --c-lib-tb-switch-color-box-shadow-checked-pressed: ;
  --c-lib-tb-switch-box-shadow-checked-pressed: ;
  --c-lib-tb-switch-border-color-checked-pressed: ;

  /* Checked - Focus */
  --c-lib-tb-switch-label-checked-focus: ;
  --c-lib-tb-switch-bg-track-checked-focus: ;
  --c-lib-tb-switch-bg-bull-checked-focus: ;
  --c-lib-tb-switch-color-box-shadow-checked-focus: ;
  --c-lib-tb-switch-box-shadow-checked-focus: ;
  --c-lib-tb-switch-border-color-checked-focus: ;

  /* Checked - Disabled */
  --c-lib-tb-switch-label-checked-disabled: ;
  --c-lib-tb-switch-bg-track-checked-disabled: ;
  --c-lib-tb-switch-bg-bull-checked-disabled: ;
  --c-lib-tb-switch-color-box-shadow-checked-disabled: ;
  --c-lib-tb-switch-box-shadow-checked-disabled: ;
  --c-lib-tb-switch-border-color-checked-disabled: ;

  /* Checked - Error */
  --c-lib-tb-switch-label-checked-error: ;
  --c-lib-tb-switch-bg-track-checked-error: ;
  --c-lib-tb-switch-bg-bull-checked-error: ;
  --c-lib-tb-switch-color-box-shadow-checked-error: ;
  --c-lib-tb-switch-box-shadow-checked-error: ;
  --c-lib-tb-switch-border-color-checked-error: ;
}
```

```typescript
/** COMPONENTE  */
switchCustomTheme: ILibTbSwitch = {
  ...switchCustom,
  class: 'switch-css-variables'
};
```

```html
<lib-tb-switch [custom]="switchCustomTheme"></lib-tb-switch>
```
