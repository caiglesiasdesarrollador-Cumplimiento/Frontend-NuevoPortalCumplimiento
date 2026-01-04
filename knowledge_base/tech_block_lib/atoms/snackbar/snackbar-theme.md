```css
.snackbar-css-variables {
  --c-lib-tb-snackbar-font-family: ;
  --c-lib-tb-snackbar-font-size: ;
  --c-lib-tb-snackbar-max-width: ;
  --c-lib-tb-snackbar-bg: ;
  --c-lib-tb-snackbar-color: ;
  --c-lib-tb-snackbar-border-radius: ;
  --c-lib-tb-snackbar-border-width: ;
  --c-lib-tb-snackbar-border-color: ;
  --c-lib-tb-snackbar-box-shadow: ;
}
```

```typescript
/** COMPONENTE  */
snackbarCustomTheme: ILibTbSnackbar = {
  ...snackbarCustom,
  class: 'snackbar-css-variables'
};
```

```html
<lib-tb-snackbar [custom]="snackbarCustomTheme"></lib-tb-snackbar>
```
