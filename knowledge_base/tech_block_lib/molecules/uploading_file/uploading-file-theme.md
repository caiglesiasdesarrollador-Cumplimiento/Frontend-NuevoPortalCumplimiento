```css
.uploading-file-css-variables {
  /*  generals */
  --c-lib-tb-uploading-file-font-family: ; /* Define la fuente para el componente */
  --c-lib-tb-uploading-file-name-font-size: ; /* Define el tamaño de la fuente para el nombre */
  --c-lib-tb-uploading-file-icon-font-size: ; /* Define el tamaño de la fuente para el icono */
  --c-lib-tb-uploading-file-progress-label-font-size: ; /* Define el tamaño de la fuente para la descripción del progreso */
  --c-lib-tb-uploading-file-progress-icon-font-size: ; /* Define el tamaño de la fuente para el icono del progreso */
  --c-lib-tb-uploading-file-border-radius: ; /* Define el valor de borde del componente */
  --c-lib-tb-uploading-file-border-style: ; /* Define el tipo de borde del componente */
  --c-lib-tb-uploading-file-border-width: ; /* Define el ancho de borde del componente */
  --c-lib-tb-uploading-file-progress-delete-border-radius: ; /* Define el tamaño del borde para el icono de delete del progreso */

  /* Estado: default */
  --c-lib-tb-uploading-file-border-color: ; /* Define el color del borde del componente */
  --c-lib-tb-uploading-file-name: ; /* Define el color de la fuente para el nombre del archivo */
  --c-lib-tb-uploading-file-progress-label: ; /* Define el color de la fuente para la descripción del progreso */
  --c-lib-tb-uploading-file-icon: ; /* Define el color de la fuente para el icono */
  --c-lib-tb-uploading-file-icon-bg: ; /* Define el color del fondo para el icono */
  --c-lib-tb-uploading-file-state-bg: ; /* Define el color del fondo para el estado */
  --c-lib-tb-uploading-file-progress-delete-shadow: ; /* Define el color del box shadow para el delete del progreso */

  /* Estado: default mobile */
  --c-lib-tb-uploading-file-border-color-mobile: ; /* Define el color del borde del componente */
  --c-lib-tb-uploading-file-name-mobile: ; /* Define el color de la fuente para el nombre del archivo */
  --c-lib-tb-uploading-file-progress-label-mobile: ; /* Define el color de la fuente para la descripción del progreso */
  --c-lib-tb-uploading-file-icon-mobile: ; /* Define el color de la fuente para el icono */
  --c-lib-tb-uploading-file-icon-bg-mobile: ; /* Define el color del fondo para el icono */
  --c-lib-tb-uploading-file-state-bg-mobile: ; /* Define el color del fondo para el estado */
  --c-lib-tb-uploading-file-progress-delete-shadow-mobile: ; /* Define el color del box shadow para el delete del progreso */

  /* Estado: uploading */
  --c-lib-tb-uploading-file-min-icon-uploading: ; /* Define el color del icono de descripción del progreso */

  /* Estado: success */
  --c-lib-tb-uploading-file-min-icon-success: ; /* Define el color del icono de descripción del progreso */

  /* Estado: error */
  --c-lib-tb-uploading-file-min-icon-error: ; /* Define el color del icono de descripción del progreso */
  --c-lib-tb-uploading-file-caption-error: ;

  /* Estado: uploaded */
  --c-lib-tb-uploading-file-min-icon-uploaded: ; /* Define el color del icono de descripción del progreso */
}
```

```typescript
/** COMPONENTE  */
uploadingFileCustomTheme: ILibTbUploadingFile = {
  ...uploadingFileCustom,
  class: 'uploading-file-css-variables'
};
```

```html
<lib-tb-uploading-file [custom]="uploadingFileCustomTheme"></lib-tb-uploading-file>
```
