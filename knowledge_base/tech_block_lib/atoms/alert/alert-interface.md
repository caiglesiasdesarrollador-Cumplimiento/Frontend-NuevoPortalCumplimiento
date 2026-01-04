```typescript
export interface ILibTbAlertMessage {
  key?: string; // Establece el identificador de la alerta, a la cual se agregarán los mensajes
  id?: string; // Establece el atributo id para la alerta
  type?: 'info' | 'success' | 'warning' | 'error'; // Establece el tipo de alerta que se desea mostrar
  title?: string; // Establece el título de la alerta
  description?: string; // Establece la descripción de la alerta
  class?: string; // Establece las clases que se desean agregar a la alerta, deben estar separadas por un espacio
  style?: Record<string, string | number>; // Establece los estilos que se desean aplicar formato: { propiedad: valor } ({ color: 'red' })
  icon?: string; // Establece el icono que se desea mostrar en la alerta
  sticky?: boolean; // Establece si la alerta debe permanecer siempre visible
  closable?: boolean; // Establece si la alerta puede eliminarse
  data?: any; // Establece alguna información para la alerta, esta se retornará en el evento libTbOnClose
  life?: number; // Establece el tiempo de vida de la alerta
}
export interface ILibTbAlert {
  key?: string; // Establece el identificador para la alerta
  float?: boolean; // Establece si la alerta debe mostrarse flotante (Por defecto: true)
  alerts?: ILibTbAlertMessage[]; // Cuando la alerta se establece en float = false, se tomarán estos valores para mostrar la alerta
  style?: Record<string, string | number>; // Establece los estilos que se desean aplicar formato: { propiedad: valor } ({ color: 'red' })
  class?: string; // Establece las clases que se desean agregar a la alerta, deben estar separadas por un espacio
  bgColor?: boolean; // Establece si la alerta debe tener fondo de color
  position?: // Establece la posición donde se debe mostrar la alerta
    | 'top-right'
    | 'top-left'
    | 'bottom-left'
    | 'bottom-right'
    | 'top-center'
    | 'bottom-center'
    | 'center';
  baseZIndex?: number; // Establece el valor base del z-index de la alerta
  autoZIndex?: boolean; // Establece si el valor z-index de la alerta debe ser automático
  showTransitionOptions?: string; // Establece las opciones de transición cuando se muestra la alerta
  hideTransitionOptions?: string; // Establece las opciones de transición cuando se oculta la alerta
  showTransformOptions?: string; // Establece las opciones de transformación cuando se muestra la alerta
  hideTransformOptions?: string; // Establece las opciones de transformación cuando se oculta la alerta
  preventOpenDuplicates?: boolean; // Establece si se desea NO agregar más alertas, si ya hay otra con el mismo contenido
  preventDuplicates?: boolean; // Establece si se desea mostrar una sola vez una alerta con el mismo contenido.
  libTbOnClose?: (e: any) => void; // Ejecuta una función cuando se cierra una alerta
}
```
