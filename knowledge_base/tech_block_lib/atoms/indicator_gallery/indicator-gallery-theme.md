```css
.indicator-gallery-css-variables {
  /* Generals */
  --c-lib-tb-indicator-gallery-border-radius-container: ;
  --c-lib-tb-indicator-gallery-bg-container: ;
  --c-lib-tb-indicator-gallery-opacity-bg-container: ;
  --c-lib-tb-indicator-gallery-border-radius: ;
  --c-lib-tb-indicator-gallery-border-width: ;
  --c-lib-tb-indicator-gallery-width-box-shadow-primary-standar: ;
  --c-lib-tb-indicator-gallery-width-box-shadow-secondary-standar: ;
  --c-lib-tb-indicator-gallery-width-box-shadow-primary-small: ;
  --c-lib-tb-indicator-gallery-width-box-shadow-secondary-small: ;

  /* Default */
  --c-lib-tb-indicator-gallery-bg: ;
  --c-lib-tb-indicator-gallery-border-color: ;
  --c-lib-tb-indicator-gallery-box-shadow: ;
  --c-lib-tb-indicator-gallery-color-primary-box-shadow: ;
  --c-lib-tb-indicator-gallery-color-secondary-box-shadow: ;

  /* Hover */
  --c-lib-tb-indicator-gallery-bg-hover: ;
  --c-lib-tb-indicator-gallery-border-color-hover: ;
  --c-lib-tb-indicator-gallery-box-shadow-hover: ;
  --c-lib-tb-indicator-gallery-color-primary-box-shadow-hover: ;
  --c-lib-tb-indicator-gallery-color-secondary-box-shadow-hover: ;

  /* Pressed */
  --c-lib-tb-indicator-gallery-bg-pressed: ;
  --c-lib-tb-indicator-gallery-border-color-pressed: ;
  --c-lib-tb-indicator-gallery-box-shadow-pressed: ;
  --c-lib-tb-indicator-gallery-color-primary-box-shadow-pressed: ;
  --c-lib-tb-indicator-gallery-color-secondary-box-shadow-pressed: ;

  /* Focus */
  --c-lib-tb-indicator-gallery-bg-focus: ;
  --c-lib-tb-indicator-gallery-border-color-focus: ;
  --c-lib-tb-indicator-gallery-box-shadow-focus: ;
  --c-lib-tb-indicator-gallery-color-primary-box-shadow-focus: ;
  --c-lib-tb-indicator-gallery-color-secondary-box-shadow-focus: ;

  /* Active - Default */
  --c-lib-tb-indicator-gallery-bg-active: ;
  --c-lib-tb-indicator-gallery-border-color-active: ;
  --c-lib-tb-indicator-gallery-box-shadow-active: ;
  --c-lib-tb-indicator-gallery-color-primary-box-shadow-active: ;
  --c-lib-tb-indicator-gallery-color-secondary-box-shadow-active: ;

  /* Active - Hover */
  --c-lib-tb-indicator-gallery-bg-active-hover: ;
  --c-lib-tb-indicator-gallery-border-color-active-hover: ;
  --c-lib-tb-indicator-gallery-box-shadow-active-hover: ;
  --c-lib-tb-indicator-gallery-color-primary-box-shadow-active-hover: ;
  --c-lib-tb-indicator-gallery-color-secondary-box-shadow-active-hover: ;

  /* Active - Pressed */
  --c-lib-tb-indicator-gallery-bg-active-pressed: ;
  --c-lib-tb-indicator-gallery-border-color-active-pressed: ;
  --c-lib-tb-indicator-gallery-box-shadow-active-pressed: ;
  --c-lib-tb-indicator-gallery-color-primary-box-shadow-active-pressed: ;
  --c-lib-tb-indicator-gallery-color-secondary-box-shadow-active-pressed: ;

  /* Active - Focus */
  --c-lib-tb-indicator-gallery-bg-active-focus: ;
  --c-lib-tb-indicator-gallery-border-color-active-focus: ;
  --c-lib-tb-indicator-gallery-box-shadow-active-focus: ;
  --c-lib-tb-indicator-gallery-color-primary-box-shadow-active-focus: ;
  --c-lib-tb-indicator-gallery-color-secondary-box-shadow-active-focus: ;
}
```

```typescript
/** COMPONENTE  */
indicatorGalleryCustomTheme: ILibTbIndicatorGallery = {
  ...indicatorGalleryCustom,
  class: 'indicator-gallery-css-variables'
};
```

```html
<lib-tb-indicator-gallery [custom]="indicatorGalleryCustomTheme"></lib-tb-indicator-gallery>
```
