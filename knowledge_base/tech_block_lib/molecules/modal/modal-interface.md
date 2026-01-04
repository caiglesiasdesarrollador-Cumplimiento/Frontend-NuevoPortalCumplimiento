```typescript
import { ILibTbButton } from '../../atoms/button/button.interface';
export interface ILibTbModal {
  dataQaId?: string; // Establece el atributo data-qa-id para el componente
  title?: string; // Estabece el título del modal
  description?: string; // Estabece la descripción del modal
  resizable?: boolean; // Establece si el modal puede cambiar de tamaño
  visible?: boolean; // Establece si el modal debe estar visible o no
  size?: 'small' | 'medium' | 'large'; // Establece el tamaño del modal
  closable?: boolean; // Establece si el modal se puede cerrar o no
  closeOnEscape?: boolean; // Establece si el modal se puede cerrar al precionar la tecla scape
  dismissableMask?: boolean; // Establece si cuando se haga click fuera del modal este debe cerrarse
  style?: Record<string, string | number>; // Establece los estilos que se desean aplicar al modal formato: { propiedad: valor } ({ color: 'red' })
  class?: string; // Establece las clases que se desean agregar al modal, deben estar separadas por un espacio
  containerClass?: string; // Establece las clases que se desean agregar al contenedor del modal, deben estar separadas por un espacio
  contentStyle?: Record<string, string | number>; // Establece los estilos que se desean aplicar al contenido del modal - formato: { propiedad: valor } ({ color: 'red' })
  contentStyleClass?: string; // Establece las clases que se desean agregar al contenido del modal, deben estar separadas por un espacio
  baseZIndex?: number; // Establece el zIndex base para usarse en el modal
  autoZIndex?: boolean; // Establece si el zIndex debe ser automático
  focusOnShow?: boolean; // Establece si el primer botón del modal debe recibir el foco
  focusTrap?: boolean; // Establece si el foco debe solo estar dentro de los elementos del modal
  closeIcon?: string; // Establece el icono que se debe mostrar en el botón de cerrar
  transitionOptions?: string; // Establece las opciones de transición para el modal
  primaryButton?: ILibTbButton; // Establece las propiedades del botón primario para el footer del modal
  secondaryButton?: ILibTbButton; // Establece las propiedades del botón secundario para el footer del modal
  closeButton?: ILibTbButton; // Establece las propiedades del botón para cerrar del modal
  appendTo?: 'body' | HTMLElement; // Establece el elemento al cual se agregará el modal, los valores válidos son "body" o una refencia a un elemento
  libTbOnShow?: (e: any) => void; // Ejecuta una función cuando se muestra el modal
  libTbOnHide?: (e: any) => void; // Ejecuta una función cuando se oculta el modal
}
```
