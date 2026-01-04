```css
.tooltip-css-variables {
  --c-lib-tb-tooltip-font-family: ;
  --c-lib-tb-tooltip-font-size: ;
  --c-lib-tb-tooltip-max-width: ;
  --c-lib-tb-tooltip-bg: ;
  --c-lib-tb-tooltip-color: ;
  --c-lib-tb-tooltip-border-width: ;
  --c-lib-tb-tooltip-border-color: ;
  --c-lib-tb-tooltip-border-radius: ;
  --c-lib-tb-tooltip-box-shadow: ;
}
```

```typescript
/** COMPONENTE  */
tooltipCustomTheme: ILibTbTooltip = {
  ...tooltipCustom,
  class: 'tooltip-css-variables'
};
```

```html
<button libTbTooltip [customTooltip]="tooltipCustomTheme">Button</button>
```
