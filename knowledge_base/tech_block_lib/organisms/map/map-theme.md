```css
.map-css-variables {
  /* PRIMARY */
  --c-lib-tb-map-bg-stroke-btn-primary: ;
  --c-lib-tb-map-bg-stroke-btn-hover-primary: ;
  --c-lib-tb-map-bg-stroke-btn-pressed-primary: ;
  --c-lib-tb-map-bg-stroke-btn-focus-primary: ;
  --c-lib-tb-map-bg-stroke-btn-disabled-primary: ;
  --c-lib-tb-map-bg-stroke-btn-disabled-hover-primary: ;
  /* SECONDARY */
  --c-lib-tb-map-bg-stroke-btn-secondary: ;
  --c-lib-tb-map-bg-stroke-btn-hover-secondary: ;
  --c-lib-tb-map-bg-stroke-btn-pressed-secondary: ;
  --c-lib-tb-map-bg-stroke-btn-focus-secondary: ;
  --c-lib-tb-map-bg-stroke-btn-disabled-secondary: ;
  --c-lib-tb-map-bg-stroke-btn-disabled-hover-secondary: ;
  /* TERTIARY */
  --c-lib-tb-map-bg-stroke-btn-tertiary: ;
  --c-lib-tb-map-bg-stroke-btn-hover-tertiary: ;
  --c-lib-tb-map-bg-stroke-btn-pressed-tertiary: ;
  --c-lib-tb-map-bg-stroke-btn-focus-tertiary: ;
  --c-lib-tb-map-bg-stroke-btn-disabled-tertiary: ;
  --c-lib-tb-map-bg-stroke-btn-disabled-hover-tertiary: ;

  /* BOX SHADOW */
  --c-lib-tb-map-box-shadow-btn: ;
}
```

```typescript
/** COMPONENTE  */
mapCustomTheme: ILibTbMap = {
  ...mapCustom,
  class: 'map-css-variables'
};
```

```html
<lib-tb-map [custom]="mapCustomTheme"></lib-tb-map>
```
