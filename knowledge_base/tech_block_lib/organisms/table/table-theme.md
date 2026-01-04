```css
.table-css-variables {
/* General */
--c-lib-tb-table-font-family: ;
--c-lib-tb-table-text-decoration: ;
--c-lib-tb-table-font-size-header: ;
--c-lib-tb-table-font-size-body: ;
--c-lib-tb-table-font-size-footer: ;
--c-lib-tb-table-font-size-icon: ;
--c-lib-tb-table-column-resize-width: ;
--c-lib-tb-table-header-separator-width: ;
--c-lib-tb-table-header-separator-style: ;

/* Default */
--c-lib-tb-table-bg-header: ;
--c-lib-tb-table-bg-body: ;
--c-lib-tb-table-bg-footer: ;
--c-lib-tb-table-color-icon-header: ;
--c-lib-tb-table-color-icon: ;
--c-lib-tb-table-color-header: ;
--c-lib-tb-table-header-separator-color: ;
--c-lib-tb-table-color-body: ;
--c-lib-tb-table-color-expanded-row: ;
--c-lib-tb-table-color-footer: ;
--c-lib-tb-table-border-color: ;
--c-lib-tb-table-border-width: ;
--c-lib-tb-table-border-width-header: ;
--c-lib-tb-table-border-width-body: ;
--c-lib-tb-table-border-width-footer: ;
--c-lib-tb-table-border-width-header-th: ;
--c-lib-tb-table-border-width-body-td: ;
--c-lib-tb-table-border-width-footer-td: ;
--c-lib-tb-table-border-radius: ;
--c-lib-tb-table-column-resizer-color: ;
--c-lib-tb-table-column-resizer-helper-color: ;

/* Hover */
--c-lib-tb-table-bg-hover: ;
--c-lib-tb-table-color-icon-hover: ;
--c-lib-tb-table-color-hover: ;
--c-lib-tb-table-border-color-hover: ;
--c-lib-tb-table-column-resizer-color-hover: ;

/* Focus */
--c-lib-tb-table-bg-focus: ;
--c-lib-tb-table-color-icon-focus: ;
--c-lib-tb-table-color-focus: ;
--c-lib-tb-table-border-color-focus: ;

/* Active */
--c-lib-tb-table-bg-active: ;
--c-lib-tb-table-color-icon-active: ;
--c-lib-tb-table-color-active: ;
--c-lib-tb-table-border-color-active: ;
--c-lib-tb-table-column-resizer-color-active: ;
}
```

```typescript
/** COMPONENTE  */
tableCustomTheme: ILibTbTable = {
  ...tableCustom,
  class: 'table-css-variables'
};
```

```html
<lib-tb-table [custom]="tableCustomTheme"></lib-tb-table>
```
