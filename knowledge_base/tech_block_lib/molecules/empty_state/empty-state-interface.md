```typescript
import { ILibTbButton } from '../../atoms/button/button.interface';
export interface ILibTbEmptyState {
  style?: Record<string, string>; // Establece los estilos a usar en el componente
  class?: string; // Indica la clase que se le asignará al componente
  icon?: string; // Establece el icono que se asignará al componente
  src?: string; // Establece el src del pictograma, valido si no existe icono
  alt?: string; // Establece el alt de la imagen, valido si no existe icono
  title?: string; // Establece el titulo que se le asignará al componente
  description?: string; // Establece la descripción que se le asignará al componente
  primaryBtn?: ILibTbButton; // Establece las caracteristicas que se le agregarán al botón principal
  secondaryBtn?: ILibTbButton; // Establece las caracteristicas que se le agregarán al botón secundario
}
```
