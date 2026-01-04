```css
.empty-state-css-variables {
/*  generals */
  --c-lib-tb-empty-state-title-font-family: ; /* Establece la fuente del título */
  --c-lib-tb-empty-state-title-font-size: ; /* Establece el tamaño de la fuente del título */
  --c-lib-tb-empty-state-description-font-family: ; /* Establece la fuente de la descripción */
  --c-lib-tb-empty-state-description-font-size: ; /* Establece el tamaño de la fuente de la descripción */
  --c-lib-tb-empty-state-icon-font-size: ; /* Establece el tamaño de la fuente del icono */
  --c-lib-tb-empty-state-image-width-size: ; /* Establece el tamaño del ancho de la imagen/pictograma */
  /* Estado: default */
  --c-lib-tb-empty-state-bg: ; /* El color de fondo */
  --c-lib-tb-empty-state-icon-color: ; /* El color del icono */
  --c-lib-tb-empty-state-title-color: ; /* El color de la fuente del título */
  --c-lib-tb-empty-state-description-color: ; /* El color de la fuente de la descripción */
}
```

```typescript
/** COMPONENTE  */
emptyStateCustomTheme: ILibTbEmptyState = {
  ...emptyStateCustom,
  class: 'empty-state-css-variables'
};
```

```html
<lib-tb-empty-state [custom]="emptyStateCustomTheme"></lib-tb-empty-state>
```
