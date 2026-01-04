```css
.file-upload-field-css-variables {
  /* Generals */
  --c-lib-tb-file-upload-field-font-family: ; /* Establece el tipo de fuente del componente */
  --c-lib-tb-file-upload-field-label-font-size: ; /* Establece el tamaño de fuente del label */
  --c-lib-tb-file-upload-field-field-border-radius: ; /* Establece el grado de borde del field */
  --c-lib-tb-file-upload-field-desktop-field-border-style: ; /* Establece el estilo de borde del field */
  --c-lib-tb-file-upload-field-desktop-field-border-width: ; /* Establece el ancho de borde del field */
  --c-lib-tb-file-upload-field-desktop-drag-drop-border-radius: ; /* Establece el grado de borde del drag-drop */
  --c-lib-tb-file-upload-field-desktop-drag-drop-border-style: ; /* Establece el estilo de borde del drag-drop */
  --c-lib-tb-file-upload-field-desktop-drag-drop-border-width: ; /* Establece el ancho de borde del drag-drop */
  --c-lib-tb-file-upload-field-mobile-field-border-radius: ; /* Establece el grado de borde del field */
  --c-lib-tb-file-upload-field-mobile-field-border-style: ; /* Establece el estilo de borde del field */
  --c-lib-tb-file-upload-field-mobile-field-border-width: ; /* Establece el ancho de borde del field */
  --c-lib-tb-file-upload-field-mobile-drag-drop-border-radius: ; /* Establece el grado de borde del drag-drop */
  --c-lib-tb-file-upload-field-mobile-drag-drop-border-style: ; /* Establece el estilo de borde del drag-drop */
  --c-lib-tb-file-upload-field-mobile-drag-drop-border-width: ; /* Establece el ancho de borde del drag-drop */
  --c-lib-tb-file-upload-field-drag-drop-icon-font-size: ; /* Establece el tamaño del icono del drag-drop */
  --c-lib-tb-file-upload-field-drag-drop-label-font-size: ; /* Establece el tamaño del label del drag-drop */
  --c-lib-tb-file-upload-field-caption-font-size: ; /* Establece el tamaño del caption del field */

  /* Default */
  --c-lib-tb-file-upload-field-label-color: ; /* Establece el color del label */
  --c-lib-tb-file-upload-field-drag-drop-icon-color: ; /* Establece el color del icono del drag-drop */
  --c-lib-tb-file-upload-field-drag-drop-label-color: ; /* Establece el color del icono del drag-drop */
  --c-lib-tb-file-upload-field-drag-drop-border-color: ; /* Establece el color del borde del drag-drop */
  --c-lib-tb-file-upload-field-drag-drop-bg-color: ; /* Establece el color del fondo del drag-drop */
  --c-lib-tb-file-upload-field-mobile-caption-color: ; /* Establece el color del caption del field */
  --c-lib-tb-file-upload-field-desktop-caption-color: ; /* Establece el color del caption del field */
  --c-lib-tb-file-upload-field-border-color: ; /* Establece el color del borde del field */
  --c-lib-tb-file-upload-field-bg-color: ; /* Establece el color del fondo del field */
}
```

```typescript
/** COMPONENTE  */
fileUploadFieldCustomTheme: ILibTbFileUploadField = {
  ...fileUploadFieldCustom,
  class: 'file-upload-field-css-variables'
};
```

```html
<lib-tb-file-upload-field [custom]="fileUploadFieldCustomTheme"></lib-tb-file-upload-field>
```
