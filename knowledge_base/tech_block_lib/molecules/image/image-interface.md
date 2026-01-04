```typescript
export interface ILibTbImage {
  dataQaId?: string; // Establece el atributo data-qa-id para el componente
  preview?: boolean; // Establece si se utilizara la funcionalidad de preview
  rotate?: boolean; // Establece si en el visor de la imagen se puede rotar
  zoom?: boolean; // Establece si mostrará o no los botones de zoom
  style?: Record<string, string>; // Establece los estilos a usar en el componente
  class?: string; // Indica la clase que se le asignará al componente
  imageStyle?: Record<string, string>; // Establece los estilos a la imagen
  imageClass?: string; // Establece la clase a añadir a la imagen
  width?: string; // Establece el ancho de la imagen
  height?: string; // Establece el alto de la imagen
  footer?: boolean; // Establece si la imagen tendrá o no footer
  title?: string; // Establece el texto del título.
  errorIcon?: string; // Establece el icono del error
  description?: string; // Establece el texto de la descripción.
  previewIcon?: string; // Establece el icono del preview
  expandIcon?: string; // Establece el icono del expand
  rotateRightIcon?: string; // Establece el icono de rotar a la derecha
  rotateLeftIcon?: string; // Establece el icono de rotar a la izquierda
  zoomOutIcon?: string; // Establece el icono de quitar zoom
  zoomInIcon?: string; // Establece el icono de poner zoom
  closeIcon?: string; // Establece el icono de cerrar
  img?: { // Establece las propiedades de la imagen que se desea mostrar dentro del indicador de progreso
    src: string; // Establece la url de la imagen
    alt?: string; // Establece el atributo alt de la imagen
  };
  libTbOnShow?: () => void; // Ejecuta una función cuando se abra el modo preview
  libTbOnHide?: () => void; // Ejecuta una función cuando se cierre el modo preview
  libTbOnImageError?: (e: any) => void; // Ejecuta una función cuando la imagen suministrada sea un error
}
```
