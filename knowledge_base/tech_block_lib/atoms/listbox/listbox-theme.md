```css
.listbox-css-variables {
  /* General */
  --c-lib-tb-listbox-font-family: ;
  --c-lib-tb-listbox-text-decoration: ;
  --c-lib-tb-listbox-font-size: ;
  --c-lib-tb-listbox-font-size-filter: ;
  --c-lib-tb-listbox-font-size-icon: ;

  /* Default */
  --c-lib-tb-listbox-bg: ;
  --c-lib-tb-listbox-color-icon: ;
  --c-lib-tb-listbox-color-label: ;
  --c-lib-tb-listbox-color-description: ;
  --c-lib-tb-listbox-box-shadow: ;
  --c-lib-tb-listbox-bg-multiple: ;
  --c-lib-tb-listbox-border-color: ;
  --c-lib-tb-listbox-border-radius-filter: ;
  --c-lib-tb-listbox-bg-filter: ;
  --c-lib-tb-listbox-border-color-filter: ;
  --c-lib-tb-listbox-color-filter: ;
  --c-lib-tb-listbox-color-icon-filter: ;
  --c-lib-tb-listbox-color-separator: ;

  /* Hover */
  --c-lib-tb-listbox-bg-hover: ;
  --c-lib-tb-listbox-color-icon-hover: ;
  --c-lib-tb-listbox-color-label-hover: ;
  --c-lib-tb-listbox-color-description-hover: ;

  /* Focus */
  --c-lib-tb-listbox-bg-focus: ;
  --c-lib-tb-listbox-color-icon-focus: ;
  --c-lib-tb-listbox-color-label-focus: ;
  --c-lib-tb-listbox-color-description-focus: ;
  --c-lib-tb-listbox-border-color-focus: ;

  /* Active */
  --c-lib-tb-listbox-bg-active: ;
  --c-lib-tb-listbox-color-icon-active: ;
  --c-lib-tb-listbox-color-label-active: ;
  --c-lib-tb-listbox-color-description-active: ;
  --c-lib-tb-listbox-bg-multiple-active: ;

  /* Pressed */
  --c-lib-tb-listbox-bg-pressed: ;
  --c-lib-tb-listbox-color-icon-pressed: ;
  --c-lib-tb-listbox-color-label-pressed: ;
  --c-lib-tb-listbox-color-description-pressed: ;

  /* Disabled */
  --c-lib-tb-listbox-bg-disabled: ;
  --c-lib-tb-listbox-color-icon-disabled: ;
  --c-lib-tb-listbox-color-label-disabled: ;
  --c-lib-tb-listbox-color-description-disabled: ;
  --c-lib-tb-listbox-color-separator-disabled: ;
}
```

```typescript
/** COMPONENTE  */
listboxCustomTheme: ILibTbListbox = {
  ...listboxCustom,
  class: 'listbox-css-variables'
};
```

```html
<lib-tb-listbox [custom]="listboxCustomTheme"></lib-tb-listbox>
```
