```css
.progress-bar-css-variables {
  --c-lib-tb-progressbar-bg: ;
  --c-lib-tb-progressbar-color: ;

  --c-lib-tb-progressbar-bg-indicator: ;
  --c-lib-tb-progressbar-color-indicator: ;

  --c-lib-tb-progressbar-border-width: ;
  --c-lib-tb-progressbar-border-color: ;
  --c-lib-tb-progressbar-border-radius: ;
  --c-lib-tb-progressbar-box-shadow: ;

  --c-lib-tb-progressbar-bg-info: ;
  --c-lib-tb-progressbar-color-info: ;

  --c-lib-tb-progressbar-bg-success: ;
  --c-lib-tb-progressbar-color-success: ;

  --c-lib-tb-progressbar-bg-warning: ;
  --c-lib-tb-progressbar-color-warning: ;

  --c-lib-tb-progressbar-bg-error: ;
  --c-lib-tb-progressbar-color-error: ;
}
```

```typescript
/** COMPONENTE  */
progressBarCustomTheme: ILibTbProgressBar = {
  ...progressBarCustom,
  class: 'progress-bar-css-variables'
};
```

```html
<lib-tb-progress-bar [custom]="progressBarCustomTheme"></lib-tb-progress-bar>
```
