```css
.button-css-variables {
  /* General */
  --c-lib-tb-btn-font-family: ;
  --c-lib-tb-btn-font-size: ;
  --c-lib-tb-btn-font-size-icon: ;
  --c-lib-tb-btn-text-decoration: ;
  --c-lib-tb-btn-border-radius: ;
  --c-lib-tb-btn-min-width: ;
  --c-lib-tb-btn-height: ;

  /* Default */
  --c-lib-tb-btn-bg: ;
  --c-lib-tb-btn-color: ;
  --c-lib-tb-btn-border-width: ;
  --c-lib-tb-btn-border-color: ;
  --c-lib-tb-btn-box-shadow: ;

  /* Hover */
  --c-lib-tb-btn-bg-hover: ;
  --c-lib-tb-btn-color-hover: ;
  --c-lib-tb-btn-border-width-hover: ;
  --c-lib-tb-btn-border-color-hover: ;
  --c-lib-tb-btn-box-shadow-hover: ;

  /* Pressed */
  --c-lib-tb-btn-bg-pressed: ;
  --c-lib-tb-btn-color-pressed: ;
  --c-lib-tb-btn-border-width-pressed: ;
  --c-lib-tb-btn-border-color-pressed: ;
  --c-lib-tb-btn-box-shadow-pressed: ;

  /* Focus */
  --c-lib-tb-btn-bg-focus: ;
  --c-lib-tb-btn-color-focus: ;
  --c-lib-tb-btn-border-width-focus: ;
  --c-lib-tb-btn-border-color-focus: ;
  --c-lib-tb-btn-box-shadow-focus: ;

  /* Disabled */
  --c-lib-tb-btn-bg-disabled: ;
  --c-lib-tb-btn-color-disabled: ;
  --c-lib-tb-btn-border-width-disabled: ;
  --c-lib-tb-btn-border-color-disabled: ;
  --c-lib-tb-btn-box-shadow-disabled: ;

  /* Disabled - Hover */
  --c-lib-tb-btn-bg-disabled-hover: ;
  --c-lib-tb-btn-color-disabled-hover: ;
  --c-lib-tb-btn-border-width-disabled-hover: ;
  --c-lib-tb-btn-border-color-disabled-hover: ;
  --c-lib-tb-btn-box-shadow-disabled-hover: ;
}
```

```typescript
/** COMPONENTE  */
buttonCustomTheme: ILibTbButton = {
  ...buttonCustom,
  class: 'button-css-variables'
};
```

```html
<lib-tb-button [custom]="buttonCustomTheme"></lib-tb-button>
```
