```css
.checkbox-css-variables {
  /* General */
  --c-lib-tb-checkbox-font-family: ;
  --c-lib-tb-checkbox-font-size: ;
  --c-lib-tb-checkbox-border-width: ;
  --c-lib-tb-checkbox-border-radius: ;

  /* Default */
  --c-lib-tb-checkbox-bg-box: ;
  --c-lib-tb-checkbox-bg-box-checked: ;
  --c-lib-tb-checkbox-color-box: ;
  --c-lib-tb-checkbox-border-color: ;
  --c-lib-tb-checkbox-border-color-checked: ;
  --c-lib-tb-checkbox-color-label: ;

  /* Hover */
  --c-lib-tb-checkbox-bg-box-hover: ;
  --c-lib-tb-checkbox-bg-box-checked-hover: ;
  --c-lib-tb-checkbox-color-box-hover: ;
  --c-lib-tb-checkbox-border-color-hover: ;
  --c-lib-tb-checkbox-border-color-checked-hover: ;
  --c-lib-tb-checkbox-color-label-hover: ;
  --c-lib-tb-checkbox-color-primary-box-shadow-hover: ;
  --c-lib-tb-checkbox-color-secondary-box-shadow-hover: ;

  /* Pressed */
  --c-lib-tb-checkbox-bg-box-pressed: ;
  --c-lib-tb-checkbox-bg-box-checked-pressed: ;
  --c-lib-tb-checkbox-color-box-pressed: ;
  --c-lib-tb-checkbox-border-color-pressed: ;
  --c-lib-tb-checkbox-border-color-checked-pressed: ;
  --c-lib-tb-checkbox-color-label-pressed: ;
  --c-lib-tb-checkbox-color-primary-box-shadow-pressed: ;
  --c-lib-tb-checkbox-color-secondary-box-shadow-pressed: ;

  /* Focus */
  --c-lib-tb-checkbox-bg-box-focus: ;
  --c-lib-tb-checkbox-bg-box-checked-focus: ;
  --c-lib-tb-checkbox-color-box-focus: ;
  --c-lib-tb-checkbox-border-color-focus: ;
  --c-lib-tb-checkbox-border-color-checked-focus: ;
  --c-lib-tb-checkbox-color-label-focus: ;
  --c-lib-tb-checkbox-color-primary-box-shadow-focus: ;
  --c-lib-tb-checkbox-color-secondary-box-shadow-focus: ;
  --c-lib-tb-checkbox-box-shadow-focus: ;

  /* Disabled */
  --c-lib-tb-checkbox-bg-box-disabled: ;
  --c-lib-tb-checkbox-bg-box-checked-disabled: ;
  --c-lib-tb-checkbox-color-box-disabled: ;
  --c-lib-tb-checkbox-border-color-disabled: ;
  --c-lib-tb-checkbox-border-color-checked-disabled: ;
  --c-lib-tb-checkbox-color-label-disabled: ;

  /* Active */
  --c-lib-tb-checkbox-bg-box-active: ;
  --c-lib-tb-checkbox-color-box-active: ;
  --c-lib-tb-checkbox-border-color-active: ;
  --c-lib-tb-checkbox-color-label-active: ;

  /* Error */
  --c-lib-tb-checkbox-bg-box-error: ;
  --c-lib-tb-checkbox-bg-box-checked-error: ;
  --c-lib-tb-checkbox-color-box-error: ;
  --c-lib-tb-checkbox-border-color-error: ;
  --c-lib-tb-checkbox-border-color-checked-error: ;
  --c-lib-tb-checkbox-color-label-error: ;

  /* View */
  --c-lib-tb-checkbox-bg-box-view: ;
  --c-lib-tb-checkbox-bg-box-checked-view: ;
  --c-lib-tb-checkbox-color-box-view: ;
  --c-lib-tb-checkbox-border-color-view: ;
  --c-lib-tb-checkbox-border-color-checked-view: ;
  --c-lib-tb-checkbox-color-label-view: ;
}
```

```typescript
/** COMPONENTE  */
checkboxCustomTheme: ILibTbCheckbox = {
  ...checkboxCustom,
  class: 'checkbox-css-variables'
};
```

```html
<lib-tb-checkbox [custom]="checkboxCustomTheme"></lib-tb-checkbox>
```
