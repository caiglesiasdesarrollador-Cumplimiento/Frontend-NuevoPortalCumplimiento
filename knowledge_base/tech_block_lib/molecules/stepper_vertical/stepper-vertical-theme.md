```css
.stepper-vertical-css-variables {
 /* Generals */
  --c-lib-tb-stepper-vertical-size: ;
  --c-lib-tb-stepper-vertical-size-mix: ;
  --c-lib-tb-stepper-vertical-border-radius-step: ;
  --c-lib-tb-stepper-vertical-border-radius-mix: ;
  --c-lib-tb-stepper-vertical-font-size-icon: ;
  --c-lib-tb-stepper-vertical-font-size-number: ;
  --c-lib-tb-stepper-vertical-font-size-mix: ;
  --c-lib-tb-stepper-vertical-width-line: ;
  --c-lib-tb-stepper-vertical-style-line: ;
  --c-lib-tb-stepper-vertical-style-line-active: ;
  --c-lib-tb-stepper-vertical-color-line: ;
  --c-lib-tb-stepper-vertical-color-line-active: ;
  --c-lib-tb-stepper-vertical-font-family-title: ;
  --c-lib-tb-stepper-vertical-font-family-number: ;
  --c-lib-tb-stepper-vertical-font-size-title: ;
  --c-lib-tb-stepper-vertical-border-width: ;

  /* Default */
  --c-lib-tb-stepper-vertical-shadow: ;
  --c-lib-tb-stepper-vertical-border-color: ;
  --c-lib-tb-stepper-vertical-bg: ;
  --c-lib-tb-stepper-vertical-color-icon: ;
  --c-lib-tb-stepper-vertical-color-title: ;
  --c-lib-tb-stepper-vertical-font-weight-title: ;
  --c-lib-tb-stepper-vertical-bg-mix: ;
  --c-lib-tb-stepper-vertical-color-mix: ;

  /* Active */
  --c-lib-tb-stepper-vertical-shadow-active: ;
  --c-lib-tb-stepper-vertical-border-color-active: ;
  --c-lib-tb-stepper-vertical-bg-active: ;
  --c-lib-tb-stepper-vertical-color-icon-active: ;
  --c-lib-tb-stepper-vertical-color-title-active: ;
  --c-lib-tb-stepper-vertical-font-weight-title-active: ;
  --c-lib-tb-stepper-vertical-bg-mix-active: ;
  --c-lib-tb-stepper-vertical-color-mix-active: ;

  /* View */
  --c-lib-tb-stepper-vertical-shadow-view: ;
  --c-lib-tb-stepper-vertical-border-color-view: ;
  --c-lib-tb-stepper-vertical-bg-view: ;
  --c-lib-tb-stepper-vertical-color-icon-view: ;
  --c-lib-tb-stepper-vertical-color-title-view: ;
  --c-lib-tb-stepper-vertical-font-weight-title-view: ;
  --c-lib-tb-stepper-vertical-bg-mix-view: ;
  --c-lib-tb-stepper-vertical-color-mix-view: ;

  /* View Active */
  --c-lib-tb-stepper-vertical-shadow-view-active: ;
  --c-lib-tb-stepper-vertical-border-color-view-active: ;
  --c-lib-tb-stepper-vertical-bg-view-active: ;
  --c-lib-tb-stepper-vertical-color-icon-view-active: ;
  --c-lib-tb-stepper-vertical-color-title-view-active: ;
  --c-lib-tb-stepper-vertical-font-weight-title-view-active: ;
  --c-lib-tb-stepper-vertical-bg-mix-view-active: ;
  --c-lib-tb-stepper-vertical-color-mix-view-active: ;
}
```

```typescript
/** COMPONENTE  */
stepperVerticalCustomTheme: ILibTbStepperVertical = {
  ...stepperVerticalCustom,
  class: 'stepper-vertical-css-variables'
};
```

```html
<lib-tb-stepper-vertical [custom]="stepperVerticalCustomTheme"></lib-tb-stepper-vertical>
```
