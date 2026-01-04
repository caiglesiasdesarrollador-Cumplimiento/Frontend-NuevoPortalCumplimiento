```css
.input-text-area-css-variables {
  /* General */
  --c-lib-tb-input-text-area-font-family: ;
  --c-lib-tb-input-text-area-font-family-label: ;
  --c-lib-tb-input-text-area-font-family-caption: ;
  --c-lib-tb-input-text-area-font-size: ;
  --c-lib-tb-input-text-area-font-size-label: ;
  --c-lib-tb-input-text-area-font-size-float-label: ;
  --c-lib-tb-input-text-area-font-size-caption: ;
  --c-lib-tb-input-text-area-min-height: ;
  --c-lib-tb-input-text-area-max-height: ;
  --c-lib-tb-input-text-area-border-width-input: ;
  --c-lib-tb-input-text-area-border-radius-input: ;
  --c-lib-tb-input-text-area-color-placeholder-input: ;

  /* Default */
  --c-lib-tb-input-text-area-color-label: ;
  --c-lib-tb-input-text-area-bg-input: ;
  --c-lib-tb-input-text-area-color-input: ;
  --c-lib-tb-input-text-area-border-color-input: ;
  --c-lib-tb-input-text-area-color-caption: ;
  --c-lib-tb-input-text-area-color-icon-caption: ;

  /* Hover */
  --c-lib-tb-input-text-area-color-label-hover: ;
  --c-lib-tb-input-text-area-bg-input-hover: ;
  --c-lib-tb-input-text-area-color-input-hover: ;
  --c-lib-tb-input-text-area-border-color-input-hover: ;
  --c-lib-tb-input-text-area-color-caption-hover: ;
  --c-lib-tb-input-text-area-color-icon-caption-hover: ;

  /* Focus */
  --c-lib-tb-input-text-area-color-label-focus: ;
  --c-lib-tb-input-text-area-bg-input-focus: ;
  --c-lib-tb-input-text-area-color-input-focus: ;
  --c-lib-tb-input-text-area-border-color-input-focus: ;
  --c-lib-tb-input-text-area-box-shadow-input-focus: ;
  --c-lib-tb-input-text-area-color-caption-focus: ;
  --c-lib-tb-input-text-area-color-icon-caption-focus: ;

  /* Active */
  --c-lib-tb-input-text-area-color-label-active: ;
  --c-lib-tb-input-text-area-bg-input-active: ;
  --c-lib-tb-input-text-area-color-input-active: ;
  --c-lib-tb-input-text-area-border-color-input-active: ;
  --c-lib-tb-input-text-area-color-caption-active: ;
  --c-lib-tb-input-text-area-color-icon-caption-active: ;

  /* Disabled */
  --c-lib-tb-input-text-area-color-label-disabled: ;
  --c-lib-tb-input-text-area-bg-input-disabled: ;
  --c-lib-tb-input-text-area-color-input-disabled: ;
  --c-lib-tb-input-text-area-border-color-input-disabled: ;
  --c-lib-tb-input-text-area-color-caption-disabled: ;
  --c-lib-tb-input-text-area-color-icon-caption-disabled: ;

  /* Error */
  --c-lib-tb-input-text-area-color-label-error: ;
  --c-lib-tb-input-text-area-bg-input-error: ;
  --c-lib-tb-input-text-area-color-input-error: ;
  --c-lib-tb-input-text-area-border-color-input-error: ;
  --c-lib-tb-input-text-area-color-caption-error: ;
  --c-lib-tb-input-text-area-color-icon-caption-error: ;

  /* Success */
  --c-lib-tb-input-text-area-color-label-success: ;
  --c-lib-tb-input-text-area-bg-input-success: ;
  --c-lib-tb-input-text-area-color-input-success: ;
  --c-lib-tb-input-text-area-border-color-input-success: ;
  --c-lib-tb-input-text-area-color-caption-success: ;
  --c-lib-tb-input-text-area-color-icon-caption-success: ;

  /* View */
  --c-lib-tb-input-text-area-color-label-view: ;
  --c-lib-tb-input-text-area-color-input-view: ;
  --c-lib-tb-input-text-area-color-caption-view: ;
  --c-lib-tb-input-text-area-color-icon-caption-view: ;
}
```

```typescript
/** COMPONENTE  */
inputTextAreaCustomTheme: ILibTbInputTextArea = {
  ...inputTextAreaCustom,
  class: 'input-text-area-css-variables'
};
```

```html
<lib-tb-input-text-area [custom]="inputTextAreaCustomTheme"></lib-tb-input-text-area>
```
