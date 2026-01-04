```css
.alert-css-variables {
  --c-lib-tb-alert-font-family-title: ;
  --c-lib-tb-alert-font-family-description: ;
  --c-lib-tb-alert-font-size-title: ;
  --c-lib-tb-alert-font-size-description: ;
  --c-lib-tb-alert-font-size-icon: ;
  --c-lib-tb-alert-font-size-close-icon: ;
  --c-lib-tb-alert-border-width: ;
  --c-lib-tb-alert-border-color: ;
  --c-lib-tb-alert-max-width: ;
  --c-lib-tb-alert-max-width-inline: ;
  --c-lib-tb-alert-color-title: ;
  --c-lib-tb-alert-color-description: ;

  --c-lib-tb-alert-bg: ;
  --c-lib-tb-alert-color-alert: ;
  --c-lib-tb-alert-color-close-icon: ;
  --c-lib-tb-alert-box-shadow: ;
  --c-lib-tb-alert-border-radius: ;
}
```

```typescript
/** COMPONENTE  */
alertCustomTheme: ILibTbAlert = {
  ...alertFloatCustom,
  class: 'alert-css-variables'
};
```

```html
<lib-tb-alert [custom]="alertCustomTheme"></lib-tb-alert>
```
