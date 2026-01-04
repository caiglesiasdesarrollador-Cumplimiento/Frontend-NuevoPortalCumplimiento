```css
.stepper-css-variables {
  /*  generals */
  --c-lib-tb-stepper-font-family: ;
  --c-lib-tb-stepper-font-family-number: ;
  --c-lib-tb-stepper-number-font-size: ;
  --c-lib-tb-stepper-diameter: ;
  --c-lib-tb-stepper-diameter-higger: ;
  --c-lib-tb-stepper-diameter-minnus: ;
  --c-lib-tb-stepper-mix-diameter: ;
  --c-lib-tb-stepper-mix-distance: ;
  --c-lib-tb-stepper-mix-distance-active: ;
  --c-lib-tb-stepper-icon-font-size: ;
  --c-lib-tb-stepper-label-font-size: ;
  --c-lib-tb-stepper-mix-font-size: ;
  --c-lib-tb-stepper-border-style: ;
  --c-lib-tb-stepper-border-width: ;

  /* Default */
  --c-lib-tb-stepper-label: ;
  --c-lib-tb-stepper-border: ;
  --c-lib-tb-stepper-content: ;
  --c-lib-tb-stepper-bg: ;
  --c-lib-tb-stepper-mix: ;
  --c-lib-tb-stepper-mix-background: ;
  --c-lib-tb-stepper-line: ;
  --c-lib-tb-stepper-border-radius: ;
  /* Active */
  --c-lib-tb-stepper-label-active: ;
  --c-lib-tb-stepper-content-active: ;
  --c-lib-tb-stepper-icon-active: ;
  --c-lib-tb-stepper-bg-active: ;
  --c-lib-tb-stepper-border-active: ;
  --c-lib-tb-stepper-mix-active: ;
  --c-lib-tb-stepper-mix-background-active: ;
  --c-lib-tb-stepper-line-active: ;
  --c-lib-tb-stepper-border-radius-active: ;
  --c-lib-tb-stepper-background-between-active: ;
  /* View */
  --c-lib-tb-stepper-label-view: ;
  --c-lib-tb-stepper-bg-view: ;
  --c-lib-tb-stepper-content-view: ;
  /* View Active */
  --c-lib-tb-stepper-label-view-active: ;
  --c-lib-tb-stepper-bg-view-active: ;
  --c-lib-tb-stepper-border-view-active: ;
  --c-lib-tb-stepper-content-view-active: ;
}
```

```typescript
/** COMPONENTE  */
stepperCustomTheme: ILibTbStepper = {
  ...stepperCustom,
  class: 'stepper-css-variables'
};
```

```html
<lib-tb-stepper [custom]="stepperCustomTheme"></lib-tb-stepper>
```
