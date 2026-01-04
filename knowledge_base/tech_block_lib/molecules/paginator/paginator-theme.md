```css
.paginator-css-variables {
  /* Generals */
  --c-lib-tb-paginator-font-family: ;
  --c-lib-tb-paginator-label-font-size: ;
  --c-lib-tb-paginator-icon-font-size: ;
  --c-lib-tb-paginator-border-radius: ;
  --c-lib-tb-paginator-border-style: ;
  --c-lib-tb-paginator-border-width: ;
  --c-lib-tb-paginator-border-width-focus: ;
  --c-lib-tb-paginator-background-color: ;

  /* Default */
  --c-lib-tb-paginator-label: ;
  /* Pressed */
  --c-lib-tb-paginator-box-shadow-color-pressed: ;
}
```

```typescript
/** COMPONENTE  */
paginatorCustomTheme: ILibTbPaginator = {
  ...paginatorCustom,
  class: 'paginator-css-variables'
};
```

```html
<lib-tb-paginator [custom]="paginatorCustomTheme"></lib-tb-paginator>
```
