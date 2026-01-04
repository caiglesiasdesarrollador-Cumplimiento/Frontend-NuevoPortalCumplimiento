```css
.breadcrumb-css-variables {
  /* General */
  --c-lib-tb-breadcrumb-font-family: ;
  --c-lib-tb-breadcrumb-font-size-icon: ;
  --c-lib-tb-breadcrumb-font-size: ;
  --c-lib-tb-breadcrumb-border-radius: ;
  --c-lib-tb-breadcrumb-shadow-focus: ;
  --c-lib-tb-breadcrumb-bg-component: ;

  /* Default */
  --c-lib-tb-breadcrumb-bg: ;
  --c-lib-tb-breadcrumb-color-label: ;
  --c-lib-tb-breadcrumb-color-icon: ;
  --c-lib-tb-breadcrumb-color-icon-right: ;
  --c-lib-tb-breadcrumb-text-decoration: ;

  /* Hover */
  --c-lib-tb-breadcrumb-bg-hover: ;
  --c-lib-tb-breadcrumb-color-label-hover: ;
  --c-lib-tb-breadcrumb-color-icon-hover: ;
  --c-lib-tb-breadcrumb-text-decoration-hover: ;

  /* Active */
  --c-lib-tb-breadcrumb-bg-active: ;
  --c-lib-tb-breadcrumb-color-label-active: ;
  --c-lib-tb-breadcrumb-color-icon-active: ;
  --c-lib-tb-breadcrumb-text-decoration-active: ;
}
```

```typescript
/** COMPONENTE  */
breadcrumbCustomTheme: ILibTbBreadcrumb = {
  ...breadcrumbCustom,
  class: 'breadcrumb-css-variables'
};
```

```html
<lib-tb-breadcrumb [custom]="breadcrumbCustomTheme"></lib-tb-breadcrumb>
```
