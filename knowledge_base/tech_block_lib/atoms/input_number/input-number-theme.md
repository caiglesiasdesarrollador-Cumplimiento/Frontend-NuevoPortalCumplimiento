```css
.input-number-css-variables {
    /* Generals */
    --c-lib-tb-input-number-font-family: ;
    --c-lib-tb-input-number-font-family-label: ;
    --c-lib-tb-input-number-font-family-caption: ;
    --c-lib-tb-input-number-font-size: ;
    --c-lib-tb-input-number-font-size-label: ;
    --c-lib-tb-input-number-font-size-float: ;
    --c-lib-tb-input-number-font-size-caption: ;
    --c-lib-tb-input-number-font-size-view: ;
    --c-lib-tb-input-number-button-icon-font-size: ;
    --c-lib-tb-input-number-height: ;
    --c-lib-tb-input-number-border-width-input: ;
    --c-lib-tb-input-number-border-radius-input: ;
    --c-lib-tb-input-number-color-placeholder-input: ;

    /* Default */
    --c-lib-tb-input-number-color-label: ;
    --c-lib-tb-input-number-bg-input: ;
    --c-lib-tb-input-number-color-input: ;
    --c-lib-tb-input-number-border-color-input: ;
    --c-lib-tb-input-number-color-caption: ;
    --c-lib-tb-input-number-color-icon-caption: ;

    /* Hover */
    --c-lib-tb-input-number-color-label-hover: ;
    --c-lib-tb-input-number-bg-input-hover: ;
    --c-lib-tb-input-number-color-input-hover: ;
    --c-lib-tb-input-number-border-color-input-hover: ;
    --c-lib-tb-input-number-color-caption-hover: ;
    --c-lib-tb-input-number-color-icon-caption-hover: ;

    /* Focus */
    --c-lib-tb-input-number-color-label-focus: ;
    --c-lib-tb-input-number-bg-input-focus: ;
    --c-lib-tb-input-number-color-input-focus: ;
    --c-lib-tb-input-number-border-color-input-focus: ;
    --c-lib-tb-input-number-box-shadow-input-focus: ;
    --c-lib-tb-input-number-color-caption-focus: ;
    --c-lib-tb-input-number-color-icon-caption-focus: ;

    /* Active */
    --c-lib-tb-input-number-color-label-active: ;
    --c-lib-tb-input-number-bg-input-active: ;
    --c-lib-tb-input-number-color-input-active: ;
    --c-lib-tb-input-number-border-color-input-active: ;
    --c-lib-tb-input-number-color-caption-active: ;
    --c-lib-tb-input-number-color-icon-caption-active: ;

    /* Disabled */
    --c-lib-tb-input-number-color-label-disabled: ;
    --c-lib-tb-input-number-bg-input-disabled: ;
    --c-lib-tb-input-number-color-input-disabled: ;
    --c-lib-tb-input-number-border-color-input-disabled: ;
    --c-lib-tb-input-number-color-caption-disabled: ;
    --c-lib-tb-input-number-color-icon-caption-disabled: ;

    /* Error */
    --c-lib-tb-input-number-bg-error: ;
    --c-lib-tb-input-number-color-error: ;
    --c-lib-tb-input-number-color-label-error: ;
    --c-lib-tb-input-number-bg-input-error: ;
    --c-lib-tb-input-number-color-input-error: ;
    --c-lib-tb-input-number-border-color-input-error: ;
    --c-lib-tb-input-number-color-caption-error: ;
    --c-lib-tb-input-number-color-icon-caption-error: ;

    /* Success */
    --c-lib-tb-input-number-bg-success: ;
    --c-lib-tb-input-number-color-success: ;
    --c-lib-tb-input-number-color-label-success: ;
    --c-lib-tb-input-number-bg-input-success: ;
    --c-lib-tb-input-number-color-input-success: ;
    --c-lib-tb-input-number-border-color-input-success: ;
    --c-lib-tb-input-number-color-caption-success: ;
    --c-lib-tb-input-number-color-icon-caption-success: ;

    /* View */
    --c-lib-tb-input-number-color-view: ;
}
```

```typescript
/** COMPONENTE  */
inputNumberCustomTheme: ILibTbInputNumber  = {
  ...inputNumberCustom,
  class: 'input-number-css-variables'
};
```

```html
<lib-tb-input-number [custom]="inputNumberCustomTheme"></lib-tb-input-number>
```
