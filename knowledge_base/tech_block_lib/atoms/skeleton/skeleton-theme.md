```css
.skeleton-css-variables {
  --c-lib-tb-skeleton-bg: ;
  --c-lib-tb-skeleton-bg-animation: ;
  --c-lib-tb-skeleton-border-radius: ;
  --c-lib-tb-skeleton-animation-duration: ;
}
```

```typescript
/** COMPONENTE  */
skeletonCustomTheme: ILibTbSkeleton = {
  ...skeletonCustom,
  class: 'skeleton-css-variables'
};
```

```html
<lib-tb-skeleton [custom]="skeletonCustomTheme"></lib-tb-skeleton>
```
