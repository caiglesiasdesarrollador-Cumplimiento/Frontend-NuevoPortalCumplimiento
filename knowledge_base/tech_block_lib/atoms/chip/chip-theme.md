```css
.chip-css-variables {
  /* Generals */
  --c-lib-tb-chip-font-family: ;
  --c-lib-tb-chip-font-size: ;

  /* Default */
  --c-lib-tb-chip-bg: ;
  --c-lib-tb-chip-color: ;
  --c-lib-tb-chip-border-radius: ;
  --c-lib-tb-chip-border-width: ;
  --c-lib-tb-chip-border-color: ;
  --c-lib-tb-chip-box-shadow: ;

  /* Hover */
  --c-lib-tb-chip-bg-hover: ;
  --c-lib-tb-chip-color-hover: ;
  --c-lib-tb-chip-border-radius-hover: ;
  --c-lib-tb-chip-border-width-hover: ;
  --c-lib-tb-chip-border-color-hover: ;
  --c-lib-tb-chip-box-shadow-hover: ;

  /* Focus */
  --c-lib-tb-chip-bg-focus: ;
  --c-lib-tb-chip-color-focus: ;
  --c-lib-tb-chip-border-radius-focus: ;
  --c-lib-tb-chip-border-width-focus: ;
  --c-lib-tb-chip-border-color-focus: ;
  --c-lib-tb-chip-box-shadow-focus: ;

  /* Pressed */
  --c-lib-tb-chip-bg-pressed: ;
  --c-lib-tb-chip-color-pressed: ;
  --c-lib-tb-chip-border-radius-pressed: ;
  --c-lib-tb-chip-border-width-pressed: ;
  --c-lib-tb-chip-border-color-pressed: ;
  --c-lib-tb-chip-box-shadow-pressed: ;

  /* Active */
  --c-lib-tb-chip-bg-active: ;
  --c-lib-tb-chip-color-active: ;
  --c-lib-tb-chip-border-radius-active: ;
  --c-lib-tb-chip-border-width-active: ;
  --c-lib-tb-chip-border-color-active: ;
  --c-lib-tb-chip-box-shadow-active: ;

  /* Disabled */
  --c-lib-tb-chip-bg-disabled: ;
  --c-lib-tb-chip-color-disabled: ;
  --c-lib-tb-chip-border-radius-disabled: ;
  --c-lib-tb-chip-border-width-disabled: ;
  --c-lib-tb-chip-border-color-disabled: ;
  --c-lib-tb-chip-box-shadow-disabled: ;
}
```

```typescript
/** COMPONENTE  */
chipCustomTheme: ILibTbChip = {
  ...chipCustom,
  class: 'chip-css-variables'
};
```

```html
<lib-tb-chip [custom]="chipCustomTheme"></lib-tb-chip>
```
