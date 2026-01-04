```css
.jelpit-btn {
  /* Default */
  --c-lib-tb-btn-bg: #82e778;
  --c-lib-tb-btn-color: #2e0063;
  --c-lib-tb-btn-border-width: 2px;
  --c-lib-tb-btn-border-color: #82e778;

  /* Hover */
  --c-lib-tb-btn-bg-hover: #82e778;
  --c-lib-tb-btn-color-hover: #2e0063;
  --c-lib-tb-btn-border-width-hover: 2px;
  --c-lib-tb-btn-border-color-hover: #82e778;
  --c-lib-tb-btn-box-shadow-hover: 1px 4px 4px rgba(51, 51, 51, 0.04),
    1px 1px 8px rgba(51, 51, 51, 0.16);

    /* Pressed */
  --c-lib-tb-btn-bg-pressed: #82e778;
  --c-lib-tb-btn-color-pressed: #2e0063;
  --c-lib-tb-btn-border-width-pressed: 2px;
  --c-lib-tb-btn-border-color-pressed: #82e778;
  --c-lib-tb-btn-box-shadow-pressed: inset 2px 4px 8px rgba(0, 0, 0, 0.16);

  /* Focus */
  --c-lib-tb-btn-bg-focus: #82e778;
  --c-lib-tb-btn-color-focus: #2e0063;
  --c-lib-tb-btn-border-width-focus: 2px;
  --c-lib-tb-btn-border-color-focus: #82e778;
  --c-lib-tb-btn-box-shadow-focus: 0 0 0 1px #ffffff, 0 0 0 3px #58c657;

  /* Disabled */
  --c-lib-tb-btn-bg-disabled: #e1e1e1;
  --c-lib-tb-btn-color-disabled: #9b9b9b;
  --c-lib-tb-btn-border-width-disabled: 2px;
  --c-lib-tb-btn-border-color-disabled: #e1e1e1;

  /* Disabled hover */
  --c-lib-tb-btn-bg-disabled-hover: #bfc9cf;
  --c-lib-tb-btn-color-disabled-hover: #5d6f7e;
  --c-lib-tb-btn-border-width-disabled-hover: 2px;
  --c-lib-tb-btn-border-color-disabled-hover: #bfc9cf;
}
```

```typescript
/** COMPONENTE  */
buttonCustomTheme: ILibTbButton = {
  ...buttonCustom,
  class: 'jelpit-btn'
};
```

```html
<!-- HTML -->
<lib-tb-button [custom]="buttonCustomTheme"></lib-tb-button>
```
