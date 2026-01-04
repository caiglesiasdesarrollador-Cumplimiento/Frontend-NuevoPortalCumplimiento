```css
.input-text-css-variables {
  /* General */
  --c-lib-tb-inputtext-font-family: ;
  --c-lib-tb-inputtext-font-family-label: ;
  --c-lib-tb-inputtext-font-family-caption: ;
  --c-lib-tb-inputtext-font-size: ;
  --c-lib-tb-inputtext-font-size-label: ;
  --c-lib-tb-inputtext-font-size-icon: ;
  --c-lib-tb-inputtext-font-size-caption: ;
  --c-lib-tb-inputtext-height: ;
  --c-lib-tb-inputtext-border-width-input: ;
  --c-lib-tb-inputtext-border-radius-input: ;
  --c-lib-tb-inputtext-color-placeholder-input: ;

  /* Default */
  --c-lib-tb-inputtext-color-label: ;
  --c-lib-tb-inputtext-bg-input: ;
  --c-lib-tb-inputtext-color-input: ;
  --c-lib-tb-inputtext-color-icon-input: ;
  --c-lib-tb-inputtext-border-color-input: ;
  --c-lib-tb-inputtext-color-caption: ;
  --c-lib-tb-inputtext-color-icon-caption: ;

  /* Hover */
  --c-lib-tb-inputtext-color-label-hover: ;
  --c-lib-tb-inputtext-bg-input-hover: ;
  --c-lib-tb-inputtext-color-input-hover: ;
  --c-lib-tb-inputtext-color-icon-input-hover: ;
  --c-lib-tb-inputtext-border-color-input-hover: ;
  --c-lib-tb-inputtext-color-caption-hover: ;
  --c-lib-tb-inputtext-color-icon-caption-hover: ;

  /* Focus */
  --c-lib-tb-inputtext-color-label-focus: ;
  --c-lib-tb-inputtext-bg-input-focus: ;
  --c-lib-tb-inputtext-color-input-focus: ;
  --c-lib-tb-inputtext-color-icon-input-focus: ;
  --c-lib-tb-inputtext-border-color-input-focus: ;
  --c-lib-tb-inputtext-box-shadow-input-focus: ;
  --c-lib-tb-inputtext-color-caption-focus: ;
  --c-lib-tb-inputtext-color-icon-caption-focus: ;

  /* Active */
  --c-lib-tb-inputtext-color-label-active: ;
  --c-lib-tb-inputtext-bg-input-active: ;
  --c-lib-tb-inputtext-color-input-active: ;
  --c-lib-tb-inputtext-color-icon-input-active: ;
  --c-lib-tb-inputtext-border-color-input-active: ;
  --c-lib-tb-inputtext-color-caption-active: ;
  --c-lib-tb-inputtext-color-icon-caption-active: ;

  /* Disabled */
  --c-lib-tb-inputtext-color-label-disabled: ;
  --c-lib-tb-inputtext-bg-input-disabled: ;
  --c-lib-tb-inputtext-color-input-disabled: ;
  --c-lib-tb-inputtext-color-icon-input-disabled: ;
  --c-lib-tb-inputtext-border-color-input-disabled: ;
  --c-lib-tb-inputtext-color-caption-disabled: ;
  --c-lib-tb-inputtext-color-icon-caption-disabled: ;

  /* Error */
  --c-lib-tb-inputtext-color-label-error: ;
  --c-lib-tb-inputtext-bg-input-error: ;
  --c-lib-tb-inputtext-color-input-error: ;
  --c-lib-tb-inputtext-color-icon-input-error: ;
  --c-lib-tb-inputtext-border-color-input-error: ;
  --c-lib-tb-inputtext-color-caption-error: ;
  --c-lib-tb-inputtext-color-icon-caption-error: ;

  /* Success */
  --c-lib-tb-inputtext-color-label-success: ;
  --c-lib-tb-inputtext-bg-input-success: ;
  --c-lib-tb-inputtext-color-input-success: ;
  --c-lib-tb-inputtext-color-icon-input-success: ;
  --c-lib-tb-inputtext-border-color-input-success: ;
  --c-lib-tb-inputtext-color-caption-success: ;
  --c-lib-tb-inputtext-color-icon-caption-success: ;

  /* View */
  --c-lib-tb-inputtext-color-label-view: ;
  --c-lib-tb-inputtext-color-input-view: ;
  --c-lib-tb-inputtext-color-caption-view: ;
  --c-lib-tb-inputtext-color-icon-caption-view: ;
}
```

```typescript
/** COMPONENTE  */
inputTextCustomTheme: ILibTbInputText = {
  ...inputTextCustom,
  class: 'input-text-css-variables'
};
```

```html
<lib-tb-input-text [custom]="inputTextCustomTheme"></lib-tb-input-text>
```
