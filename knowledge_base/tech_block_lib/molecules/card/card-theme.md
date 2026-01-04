```css
.card-css-variables {
  /* Generals */
  --c-lib-tb-card-color: ;
  --c-lib-tb-card-border-radius: ;
  --c-lib-tb-card-bg: ;
  --c-lib-tb-card-box-shadow: ;
  --c-lib-tb-card-max-width: ;
  --c-lib-tb-card-max-height: ;
  --c-lib-tb-card-max-height-header: ;
  --c-lib-tb-card-font-family-title: ;
  --c-lib-tb-card-font-size-title: ;
  --c-lib-tb-card-color-title: ;
  --c-lib-tb-card-font-size-subtitle: ;
  --c-lib-tb-card-font-size-subtitle-icon: ;
  --c-lib-tb-card-color-subtitle: ;
  --c-lib-tb-card-color-subtitle-icon: ;
  --c-lib-tb-card-font-size-description: ;
  --c-lib-tb-card-color-description: ;
  --c-lib-tb-card-font-size-observation: ;
  --c-lib-tb-card-color-observation: ;
  --c-lib-tb-card-font-size-box-items-icon: ;
  --c-lib-tb-card-color-box-items-icon: ;
  --c-lib-tb-card-font-size-box-items-text: ;
  --c-lib-tb-card-color-box-items-text: ;
  --c-lib-tb-card-color-box-items-separator: ;
  --c-lib-tb-card-width-box-items-separator: ;
}
```

```typescript
/** COMPONENTE  */
cardCustomTheme: ILibTbCard = {
  ...cardCustom,
  class: 'card-css-variables'
};
```

```html
<lib-tb-card [custom]="cardCustomTheme"></lib-tb-card>
```
