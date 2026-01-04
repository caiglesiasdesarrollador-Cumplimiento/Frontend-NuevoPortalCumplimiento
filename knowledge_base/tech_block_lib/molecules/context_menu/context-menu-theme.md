```css
.context-menu-css-variables {
    /* Generals */
    --c-lib-tb-context-menu-font-family: ;
    --c-lib-tb-context-menu-font-size: ;
    --c-lib-tb-context-menu-font-size-icon: ;
    --c-lib-tb-context-menu-box-shadow: ;
    --c-lib-tb-context-menu-bg: ;

  /* Default */
    --c-lib-tb-context-menu-bg-item: ;
    --c-lib-tb-context-menu-color: ;
    --c-lib-tb-context-menu-color-icon: ;

  /* Hover */
    --c-lib-tb-context-menu-bg-item-hover: ;
    --c-lib-tb-context-menu-color-hover: ;
    --c-lib-tb-context-menu-color-icon-hover: ;

  /* Focus */
    --c-lib-tb-context-menu-bg-item-focus: ;
    --c-lib-tb-context-menu-color-focus: ;
    --c-lib-tb-context-menu-color-icon-focus: ;

  /* Pressed */
    --c-lib-tb-context-menu-bg-item-pressed: ;
    --c-lib-tb-context-menu-color-pressed: ;
    --c-lib-tb-context-menu-color-icon-pressed: ;

  /* Active */
    --c-lib-tb-context-menu-bg-item-active: ;
    --c-lib-tb-context-menu-color-active: ;
    --c-lib-tb-context-menu-color-icon-active: ;

  /* Active */
    --c-lib-tb-context-menu-bg-item-active: ;
    --c-lib-tb-context-menu-color-active: ;
    --c-lib-tb-context-menu-color-icon-active: ;

  /* Disabled */
    --c-lib-tb-context-menu-bg-item-disabled: ;
    --c-lib-tb-context-menu-color-disabled: ;
    --c-lib-tb-context-menu-color-icon-disabled: ;
}
```

```typescript
/** COMPONENTE  */
contextMenuCustomTheme: ILibTbContextMenu = {
  ...contextMenuCustom,
  class: 'context-menu-css-variables'
};
```

```html
<lib-tb-context-menu [target]="element" [custom]="contextMenuCustomTheme"></lib-tb-context-menu>
<!-- Se puede tener el target de la siguiente manera -->
<img #element src="url" alt="img" />
```
