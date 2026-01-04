```css
.empty-message-css-variables {
  /* General */
  --c-lib-tb-empty-message-font-family: ;
  --c-lib-tb-empty-message-text-decoration: ;
  --c-lib-tb-empty-message-font-size-1: ;
  --c-lib-tb-empty-message-font-size-2: ;
  --c-lib-tb-empty-message-font-size-icon: ;

  /* Default */
  --c-lib-tb-empty-message-color-icon: ;
  --c-lib-tb-empty-message-color-title: ;
  --c-lib-tb-empty-message-color-description: ;
}
```

```typescript
/** COMPONENTE  */
emptyMessageCustomTheme: ILibTbEmptyMessage = {
  ...emptyMessageCustom,
  class: 'empty-message-css-variables'
};
```

```html
<lib-tb-empty-message [custom]="emptyMessageCustomTheme"></lib-tb-empty-message>
```
