```css
.progress-spinner-css-variables {
  --c-lib-tb-progress-spinner-height: ;
  --c-lib-tb-progress-spinner-width: ;
  --c-lib-tb-progress-spinner-height-basic: ;
  --c-lib-tb-progress-spinner-width-basic: ;
  --c-lib-tb-progress-spinner-height-integrated: ;
  --c-lib-tb-progress-spinner-width-integrated: ;
  --c-lib-tb-progress-spinner-height-only-icon: ;
  --c-lib-tb-progress-spinner-width-only-icon: ;

  --c-lib-tb-progress-spinner-primary-color: ;
  --c-lib-tb-progress-spinner-secondary-color: ;

  --c-lib-tb-progress-spinner-primary-color-integrated: ;
  --c-lib-tb-progress-spinner-secondary-color-integrated: ;
  --c-lib-tb-progress-spinner-tertiary-color-integrated: ;

  --c-lib-tb-progress-spinner-bg: ;
  --c-lib-tb-progress-spinner-bg-container: ;
  --c-lib-tb-progress-spinner-color-body: ;
  --c-lib-tb-progress-spinner-color-description: ;
  --c-lib-tb-progress-spinner-color-icon: ;

  --c-lib-tb-progress-spinner-size-icon-img: ;
  --c-lib-tb-progress-spinner-size-only-icon-img: ;
  --c-lib-tb-progress-spinner-size-body: ;
  --c-lib-tb-progress-spinner-size-label: ;
}
```

```typescript
/** COMPONENTE  */
progressSpinnerCustomTheme: ILibTbProgressSpinner = {
  ...progressSpinnerCustom,
  class: 'progress-spinner-css-variables'
};
```

```html
<lib-tb-progress-spinner [custom]="progressSpinnerCustomTheme"></lib-tb-progress-spinner>
```
