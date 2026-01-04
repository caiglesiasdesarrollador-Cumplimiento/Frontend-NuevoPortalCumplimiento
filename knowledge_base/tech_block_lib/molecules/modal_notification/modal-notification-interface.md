```typescript
import { ILibTbButton } from '../../atoms/button/button.interface';
export interface ILibTbModalNotification {
  dataQaId?: string; // Establece el atributo data-qa-id para el componente
  key?: string; // Establece el identificador para el modal
  img?: { // Establece las propiedades de la imagen que se desea mostrar
    src: string; // Establece la url de la imagen
    alt?: string; // Establece el atributo alt de la imagen
    defaultWidth?: number; // Establece el ancho por defecto de la imagen
    defaultHeight?: number; // Establece el alto por defecto de la imagen
  };
  icon?: string; // Establece el icono que se desea mostrar
  iconSize?: number; // Establece el size del icono que se desea mostrar
  title?: string; // Establece el titulo que debe llevar el modal
  message?: string; // Establece el mensaje que debe llevar el modal
  closeOnEscape?: boolean; // Establece si el modal se debe cerrar al presionar la tecla scape
  dismissableMask?: boolean; // Establece si cuando se haga click fuera del modal este debe cerrarse
  baseZIndex?: number; // Establece el zIndex base para usarse en el modal
  autoZIndex?: boolean; // Establece si el zIndex debe ser automático
  transitionOptions?: string; // Establece las opciones de transición para el modal
  showClose?: boolean; // Establece si el botón parra cerrar debe mostrarse
  acceptButtonVisible?: boolean; // Establece si el botón para aceptar debe mostrarse
  rejectButtonVisible?: boolean; // Establece si el botón para rechazar debe mostrarse
  acceptButton?: ILibTbButton; // Establece las propiedades del botón aceptar del modal
  rejectButton?: ILibTbButton; // Establece las propiedades del botón cancelar del modal
  closeButton?: ILibTbButton; // Establece las propiedades del botón cerrar del modal
  class?: string; // Establece las clases que se desean agregar al componente, deben estar separadas por un espacio
  containerClass?: string; // Establece las clases que se desean agregar al contenedor del modal, deben estar separadas por un espacio
  appendTo?: 'body' | HTMLElement; // Establece el elemento al cual se agregará el modal, los valores válidos son "body" o una refencia a un elemento
  libTbOnClose?: () => void; // Ejecuta una función cuando se cierra el modal
}
```
