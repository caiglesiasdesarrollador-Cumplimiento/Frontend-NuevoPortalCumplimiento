```css
.list-css-variables {
  /* Generals */
  --c-lib-tb-list-font-family: ;
  --c-lib-tb-list-font-size-label: ;
  --c-lib-tb-list-font-size-description: ;
  --c-lib-tb-list-font-size-icon: ;

  /* Default */
  --c-lib-tb-list-bg: ;
  --c-lib-tb-list-color: ;
  --c-lib-tb-list-color-icon: ;
  --c-lib-tb-list-color-label: ;
  --c-lib-tb-list-font-weight-label: ;
  --c-lib-tb-list-box-shadow: ;

  /* Hover */
  --c-lib-tb-list-bg-hover: ;
  --c-lib-tb-list-color-hover: ;
  --c-lib-tb-list-color-icon-hover: ;
  --c-lib-tb-list-color-label-hover: ;
  --c-lib-tb-list-font-weight-label-hover: ;
  --c-lib-tb-list-box-shadow-hover: ;

  /* Pressed */
  --c-lib-tb-list-bg-pressed: ;
  --c-lib-tb-list-color-pressed: ;
  --c-lib-tb-list-color-icon-pressed: ;
  --c-lib-tb-list-color-label-pressed: ;
  --c-lib-tb-list-font-weight-label-pressed: ;
  --c-lib-tb-list-box-shadow-pressed: ;

  /* Focus */
  --c-lib-tb-list-bg-focus: ;
  --c-lib-tb-list-color-focus: ;
  --c-lib-tb-list-color-icon-focus: ;
  --c-lib-tb-list-color-label-focus: ;
  --c-lib-tb-list-font-weight-label-focus: ;
  --c-lib-tb-list-box-shadow-focus: ;

  /* Active */
  --c-lib-tb-list-bg-active: ;
  --c-lib-tb-list-color-active: ;
  --c-lib-tb-list-color-icon-active: ;
  --c-lib-tb-list-color-label-active: ;
  --c-lib-tb-list-font-weight-label-active: ;
  --c-lib-tb-list-box-shadow-active: ;

  /* Disabled */
  --c-lib-tb-list-bg-disabled: ;
  --c-lib-tb-list-color-disabled: ;
  --c-lib-tb-list-color-icon-disabled: ;
  --c-lib-tb-list-color-label-disabled: ;
  --c-lib-tb-list-font-weight-label-disabled: ;
  --c-lib-tb-list-box-shadow-disabled: ;

  /* View */
  --c-lib-tb-list-bg-view: ;
  --c-lib-tb-list-color-view: ;
  --c-lib-tb-list-color-icon-view: ;
  --c-lib-tb-list-color-label-view: ;
  --c-lib-tb-list-font-weight-label-view: ;
  --c-lib-tb-list-box-shadow-view: ;
}
```

```typescript
/** COMPONENTE  */
listCustomTheme: ILibTbList = {
  ...listCustom,
  class: 'list-css-variables'
};
```

```html
<lib-tb-list [custom]="listCustomTheme"></lib-tb-list>
```
