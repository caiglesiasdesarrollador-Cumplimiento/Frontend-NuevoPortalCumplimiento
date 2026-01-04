```css
.password-meter-css-variables {
  --c-lib-tb-password-meter-color-icon-help: ;
  --c-lib-tb-password-meter-color-description: ;
  --c-lib-tb-password-meter-color-weak: ;
  --c-lib-tb-password-meter-color-medium: ;
  --c-lib-tb-password-meter-color-strong: ;

  /* Color de iconos en tooltip */
  --c-lib-tb-password-meter-max-width-tooltip: ;
  --c-lib-tb-password-meter-color-icon-error: ;
  --c-lib-tb-password-meter-color-icon-check: ;
}
.input-text-password-meter-css-variables {
  /* Default */
  --c-lib-tb-inputtext-color-label: ;
  --c-lib-tb-inputtext-bg-input: ;
  --c-lib-tb-inputtext-color-input: ;
  --c-lib-tb-inputtext-color-icon-input: ;
  /* ... Y todas las demás variables css del componente lib-tb-input-text */
}
```

```typescript
/** COMPONENTE  */
passwordMeterCustomTheme: ILibTbPasswordMeter = {
  ...passwordMeterCustom,
  class: 'password-meter-css-variables input-text-password-meter-css-variables'
};
```

```html
<lib-tb-password-meter [custom]="passwordMeterCustomTheme"></lib-tb-password-meter>
```
