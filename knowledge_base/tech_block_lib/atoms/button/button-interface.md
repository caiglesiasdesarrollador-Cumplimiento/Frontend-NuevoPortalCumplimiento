```typescript
interface ILibTbButton {
  dataQaId?: string; // Establece el atributo data-qa-id para el componente
  styleBtn?: 'fill' | 'stroke' | 'text'; // Establece el estilo de visualización del botón
  typeBtn?: 'primary' | 'secondary' | 'tertiary' | 'error'; // Establece el estilo de visualización del botón
  label?: string; // Establece el texto que se debe mostrar en el botón
  type?: string; // Establece el atributo [type] del botón. Por defecto: button
  loading?: boolean; // Establece si el botón debe mostrarse en el estado cargando, default=false
  iconLoading?: string; // Establece el icono que se desea tener cuando el botón esta en estado cargando
  disabled?: boolean; // Establece si el botón debe estar deshabilitado, default=false
  icon?: string; // Establece el icono que debe tener el botón
  iconPosition?: 'left' | 'right'; // Establece la posición del icono en el botón
  class?: string; // Establece las clases que se desean agregar al botón, deben estar separadas por un espacio
  style?: Record<string, string | number>; // Establece los estilos que se deben aplicar al botón. Formato: { propiedad: valor } ({ color: 'red' })
  name?: string; // Establece el atributo name que tendrá el elemento input del componente
  formGroup?: FormGroup; // Establece el formGroup al que pertenece el componente
  tabindex?: number; // Establece el atributo tabindex para el botón
  // Eventos
  libTbClick?: (e: any) => void;
  libTbKeydown?: (e: any) => void;
}
```
