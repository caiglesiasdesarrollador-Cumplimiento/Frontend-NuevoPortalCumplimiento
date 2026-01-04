```css
.slider-css-variables {
  /* General */
  --c-lib-tb-slider-font-color: ;
  --c-lib-tb-slider-font-family: ;
  --c-lib-tb-slider-label-font-size: ;
  --c-lib-tb-slider-float-font-size: ;
  --c-lib-tb-slider-box-shadow-opacity: ;
  --c-lib-tb-slider-width-box-shadow-primary: ;
  --c-lib-tb-slider-width-box-shadow-secondary: ;

  /* Default */
  --c-lib-tb-slider-bg: ;
  --c-lib-tb-slider-bg-handle: ;
  --c-lib-tb-slider-bg-range: ;
  --c-lib-tb-slider-color-float: ;
  --c-lib-tb-slider-color-primary-box-shadow: ;
  --c-lib-tb-slider-color-secondary-box-shadow: ;

  /* Focus */
  --c-lib-tb-slider-bg-handle-focus: ;
  --c-lib-tb-slider-color-float-focus: ;
  --c-lib-tb-slider-color-primary-box-shadow-focus: ;
  --c-lib-tb-slider-color-secondary-box-shadow-focus: ;

  /* Pressed */
  --c-lib-tb-slider-bg-handle-pressed: ;
  --c-lib-tb-slider-color-float-pressed: ;
  --c-lib-tb-slider-color-primary-box-shadow-pressed: ;
  --c-lib-tb-slider-color-secondary-box-shadow-pressed: ;

  /* Hover */
  --c-lib-tb-slider-bg-handle-hover: ;
  --c-lib-tb-slider-color-float-hover: ;
  --c-lib-tb-slider-color-primary-box-shadow-hover: ;
  --c-lib-tb-slider-color-secondary-box-shadow-hover: ;

  /* Error */
  --c-lib-tb-slider-bg-error: ;
  --c-lib-tb-slider-bg-handle-error: ;
  --c-lib-tb-slider-bg-range-error: ;
  --c-lib-tb-slider-color-float-error: ;
  --c-lib-tb-slider-color-primary-box-shadow-error: ;
  --c-lib-tb-slider-color-secondary-box-shadow-error: ;

  /* Disabled */
  --c-lib-tb-slider-bg-disabled: ;
  --c-lib-tb-slider-bg-handle-disabled: ;
  --c-lib-tb-slider-bg-range-disabled: ;
  --c-lib-tb-slider-color-float-disabled: ;
  --c-lib-tb-slider-color-primary-box-shadow-disabled: ;
  --c-lib-tb-slider-color-secondary-box-shadow-disabled: ;
}
```

```typescript
/** COMPONENTE  */
sliderCustomTheme: ILibTbSlider = {
  ...sliderCustom,
  class: 'slider-css-variables'
};
```

```html
<lib-tb-slider [custom]="sliderCustomTheme"></lib-tb-slider>
```
