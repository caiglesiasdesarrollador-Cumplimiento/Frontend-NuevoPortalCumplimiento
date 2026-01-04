```typescript
import { ILibTbButton } from '../../atoms/button/button.interface';
export interface ILibTbAnswerState {
  number?: string; // Establece el texto que debe estar en el número de error
  pictograma?: 'not-found' | 'no-internet' | 'timeout' | 'in-construction'; // Establece el nombre del pictograma, si no se establece la propiedad img, se traera un pictograma con el valor de esta propiedad
  title?: string; // Establece el texto que debe tener el título
  description?: string; // Establece el texto que debe tener la descripción
  libTbButton?: ILibTbButton; // Establece las propiedades que debe tener el botón que se desea mostrar
  img?: { // Establece la imagen que se desea mostrar junto con el contenido
    src: string; // Establece la url de la imagen
    alt?: string; // Establece el atributo alt de la imagen
    defaultWidth?: number; // Establece el ancho por defecto de la imagen
    defaultHeight?: number; // Establece el alto por defecto de la imagen
  };
  style?: Record<string, string | number>; // Establece los estilos que se desean aplicar formato: { propiedad: valor } ({ color: 'red' })
  class?: string; // Establece las clases que se desean agregar al componente, deben estar separadas por un espacio
}
```
