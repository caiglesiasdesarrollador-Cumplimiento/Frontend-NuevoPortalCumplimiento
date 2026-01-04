```css
.badge-css-variables {
  --c-lib-tb-badge-bg: ;
  --c-lib-tb-badge-color: ;
  --c-lib-tb-badge-border-color: ;
  --c-lib-tb-badge-border-width: ;

  --c-lib-tb-badge-error-color: ;
  --c-lib-tb-badge-warning-color: ;
  --c-lib-tb-badge-info-color: ;
  --c-lib-tb-badge-success-color: ;
}
```

```typescript
/** COMPONENTE  */
badgeCustomTheme: ILibTbBadge = {
  ...badgeCustom,
  class: 'badge-css-variables'
};
```

```html
<lib-tb-badge [custom]="badgeCustomTheme"></lib-tb-badge>
```
