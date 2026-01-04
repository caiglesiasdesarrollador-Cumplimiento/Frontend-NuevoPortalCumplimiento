```css
.image-css-variables {
  /*  generals */
  --c-lib-tb-image-title-font-family: ; /* Define la fuente para el título */
  --c-lib-tb-image-title-font-size: ; /* Define el tamaño de la fuente para el título */
  --c-lib-tb-image-description-font-family: ; /* Define la fuente para la descripción */
  --c-lib-tb-image-description-font-size: ; /* Define el tamaño de la fuente para la descripción */
  --c-lib-tb-image-icon-font-size: ; /* Define el tamaño de la fuente para el icon */
  --c-lib-tb-image-preview-font-size: ; /* Define el tamaño de la fuente para el preview */
  --c-lib-tb-image-error-icon-font-size: ; /* Define el tamaño de la fuente para el icono de error */
  --c-lib-tb-image-toolbar-icon-font-size: ; /* Define el tamaño de los iconos de la barra de herramientas */
  --c-lib-tb-image-mask-opacity: ; /* Define la opacidad del color de fondo al visualizar una imagen en pantalla completa */

  /* Estado: default */
  --c-lib-tb-image-footer-bg: ; /* Define el color de fondo del footer */
  --c-lib-tb-image-footer-color: ; /* Define el color de la fuente para el footer */
  --c-lib-tb-image-preview: ; /* Define el color del icono del preview */
  --c-lib-tb-image-tools: ; /* Define el color de los iconos del toolbar */
  --c-lib-tb-image-error-icon: ; /* Define el color del icono de error */
  --c-lib-tb-image-mask-color: ; /* Define la opacidad del color de fondo al visualizar una imagen en pantalla completa */

  /* Estado: hover */
  --c-lib-tb-image-preview-hover: ; /* Define el color del fondo del preview en hover */
  --c-lib-tb-image-tools-hover: ; /* Define el color de fondo de los iconos del toolbar en hover */
  --c-lib-tb-image-tools-box-shadow: ;/* Define el box shadow de los iconos del toolbar */
}
```

```typescript
/** COMPONENTE  */
imageCustomTheme: ILibTbImage = {
  ...imageCustom,
  class: 'image-css-variables'
};
```

```html
<lib-tb-image [custom]="imageCustomTheme"></lib-tb-image>
```
