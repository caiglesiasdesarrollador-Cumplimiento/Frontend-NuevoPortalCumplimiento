```typescript
import { ILibTbButton } from '../button/button.interface';
export interface ILibTbIndicatorGallery {
  dataQaId?: string; // Establece el atributo data-qa-id para el componente
  items?: any[]; // Establece el array de items a mostrar
  activeIndex?: number; // Establece/Retorna el indice que debe/está activo
  visibleItems?: number; // Establece el número de indicadores visibles. Para un funcionamiento óptimo, se recomienda que este valor sea impar (Por defecto: 5)
  width?: number; // Establece el ancho en px del indicador
  height?: number; // Establece el alto en px del indicador
  tabindex?: number; // Establece la propiedad tabindex en los indicadores
  style?: Record<string, string | number>; // Establece los estilos que se desean aplicar formato: { propiedad: valor } ({ color: 'red' })
  class?: string; // Establece las clases que se desean agregar al componente, deben estar separadas por un espacio
  libTbButton?: ILibTbButton; // Establece las propiedades de un **ILibTbButton** para el botón de stop/resume
  positionButton?: 'left' | 'right'; // Establece la posición en la que se mostrará el botón de stop/resume
  autoplayInterval?: number; // Establece el intervalo de tiempo para una reproducción automática
  playIcon?: string; // Establece el icono del botón para reanudar
  pauseIcon?: string; // Establece el icono del botón para pausar
  libTbClick?: ({ index, item }: { index: number; item: any }) => void; // Ejecuta una función cuando se hace clic en un indicador
  libTbChange?: ({ index, item }: { index: number; item: any }) => void; // Ejecuta una función cuando el indicador cambia, solo se ejecuta, cuando existe la propiedad autoplayInterval
}
```
