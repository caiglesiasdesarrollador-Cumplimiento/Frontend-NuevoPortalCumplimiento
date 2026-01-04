```typescript
export interface ILibTbTooltip {
  tooltipLabel?: string; // Establece el texto que tendrá el tooltip
  tooltipPosition?: 'right' | 'left' | 'top' | 'bottom'; // Establece la posición en la cual se mostrará el tooltip
  appendTo?: string; // Establece el elemento donde se debe agregar el tooltip
  positionTop?: number; // Establece una posición relativa a la original para mover el tooltip horizontalmente
  positionLeft?: number; // Establece una posición relativa a la original para mover el tooltip verticalmente
  fitContent?: boolean; // Establece si la posición del tooltip se debe ajustar automáticamente cuando no hay suficiente espacio para la posición configurada
  tooltipEvent?: 'hover' | 'focus' | 'click'; // Establece el evento que debe mostrar el tooltip
  tooltipDisabled?: boolean; // Establece si el tooltip debe estar deshabilitado y ya no se debe mostrar
  hideDelay?: number; // Establece el tiempo de espera para que el tooltip se oculte automáticamente luego de mostrarse - (Tiempo en ms)
  showDelay?: number; // Establece el tiempo de espera para que el tooltip se muestre una vez activado el evento que lo habilita - (Tiempo en ms)
  life?: number; // Establece el tiempo de vida que tendrá el tooltip luego de mostrarse - (Tiempo en ms)
  tooltipStyleClass?: string; // Establece las clases que se desean agregar al componente, deben estar separadas por un espacio
  tooltipZIndex?: string; // Establece la propiedad z-index que tendrá el componente - (Por defecto: auto)
  escape?: boolean; // Establece si se debe mantener la etiquetas HTML como texto para el contenido
  positionStyle?: string; // Establece el tipo de posición que debe tener el tooltip (Por defecto: absolute)
  component?: Type<any> | ComponentRef<any>; // Establece si se desea agregar un componente al tooltip
}
```
