```css
.tag-css-variables {
  --c-lib-tb-tag-font-family: ;
  --c-lib-tb-tag-font-size: ;
  --c-lib-tb-tag-height: ;
  --c-lib-tb-tag-box-shadow: ;
  --c-lib-tb-tag-bg: ;
  --c-lib-tb-tag-color: ;
  --c-lib-tb-tag-border-width: ;
  --c-lib-tb-tag-border-color: ;
  --c-lib-tb-tag-border-radius: ;

  --c-lib-tb-tag-info-color: ;
  --c-lib-tb-tag-warning-color: ;
  --c-lib-tb-tag-error-color: ;
  --c-lib-tb-tag-success-color: ;
}
```

```typescript
/** COMPONENTE  */
tagCustomTheme: ILibTbTag = {
  ...tagCustom,
  class: 'tag-css-variables'
};
```

```html
<lib-tb-tag [custom]="tagCustomTheme"></lib-tb-tag>
```
