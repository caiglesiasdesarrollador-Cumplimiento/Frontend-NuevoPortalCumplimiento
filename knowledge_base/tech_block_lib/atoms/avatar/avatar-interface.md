```typescript
import { ILibTbButton } from '../button/button.interface';
export interface ILibTbAvatar {
  dataQaId?: string; // Establece el atributo data-qa-id para el componente
  label?: string; // Establece el label que tendrá el avatar
  icon?: string; // Establece el icono que tendrá el avatar
  img?: string; // Establece la imagen que tendrá el avatar
  size?: 'small' | 'large' | 'xlarge'; // Establece el tamaño que tendrá el avatar
  style?: Record<string, string | number>; // Establece los estilos que se desean aplicar formato: { propiedad: valor } ({ color: 'red' })
  class?: string; // Establece las clases que se desean agregar al avatar, deben estar separadas por un espacio
  showButton?: boolean; //Establece si se debe mostrar el botón de edición en el avatar
  libTbButton?: ILibTbButton; // Establece las propiedades del botón de edición del avatar
  libTbClick?: (e: any) => void; // Ejecuta una función cuando se hace clic en el contenedor de la imagen, icono o label
}
```
