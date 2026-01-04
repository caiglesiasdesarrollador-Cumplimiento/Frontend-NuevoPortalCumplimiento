```css
.banner-css-variables {
  /* General */
  --c-lib-tb-banner-font-family: ;
  --c-lib-tb-banner-text-decoration: ;
  --c-lib-tb-banner-font-size-title: ;
  --c-lib-tb-banner-font-size-content: ;

  /* Default */
  --c-lib-tb-banner-gradient: ;
  --c-lib-tb-banner-bg-box: ;
  --c-lib-tb-banner-bg-box-mobile: ;
  --c-lib-tb-banner-color-title: ;
  --c-lib-tb-banner-color-description: ;
  --c-lib-tb-banner-color-description-link: ;
  --c-lib-tb-banner-border-radius: ;
  --c-lib-tb-banner-height: ;
  --c-lib-tb-banner-card-width: ;
  --c-lib-tb-banner-border: ;
  --c-lib-tb-banner-box-shadow: ;
}
```

```typescript
/** COMPONENTE  */
bannerCustomTheme: ILibTbBanner = {
  ...bannerCustom,
  class: 'banner-css-variables'
};
```

```html
<lib-tb-banner [custom]="bannerCustomTheme"></lib-tb-banner>
```
