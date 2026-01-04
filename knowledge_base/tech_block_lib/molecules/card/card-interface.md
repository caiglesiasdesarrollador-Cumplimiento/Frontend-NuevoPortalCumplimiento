```typescript
import { ILibTbButton } from '../../atoms/button/button.interface';
import { ILibTbTag } from '../../atoms/tag/tag.interface';
export interface ILibTbCard {
  class?: string; // Establece las clases que se desean agregar al componente, deben estar separadas por un espacio
  style?: Record<string, string | number>; // Establece los estilos que se desean aplicar. Formato: { propiedad: valor } Ejemplo: { color: 'red' }
  orientation?: 'vertical' | 'horizontal' | 'horizontal-reverse'; // Establece la orientación en la que debe mostrar la card
  showHeader?: boolean; // Muestra el header de la card
  img?: { // Establece la imagen que se desea mostrar en el header de la card
    src: string; // Establece la url de la imagen
    alt?: string; // Establece el atributo alt de la imagen
    defaultWidth?: number; // Establece el ancho por defecto de la imagen
    defaultHeight?: number; // Establece el alto por defecto de la imagen
  };
  title?: string; // Establece el título
  subtitle?: string; // Establece el subtitulo
  subtitleIcon?: string; // Establece un icono que va a acompañar al subtitulo
  description?: string; // Establece el descripción
  observation?: string; // Establece la observación
  tagHeader?: ILibTbTag; // Establece las propiedades del átomo tag para mostrarse en la card
  buttonHeader?: ILibTbButton; // Establece las propiedades del átomo button para mostrarse en la card
  boxItems?: { // Establece los items que deben aparecer en el footer
    icon?: string; // Establece el icono del item
    text?: string; // Establece el texto del item
    libTbClick?: (e: any) => void; // Ejecuta una función cuando se hace click en el item
  }[];
}
```
