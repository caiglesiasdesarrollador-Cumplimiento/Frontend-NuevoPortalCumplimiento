```typescript
import { ILibTbMenuItem } from '../panel-menu/panel-menu.interface';
export interface ILibTbBreadcrumb {
  dataQaId?: string; // Establece el atributo data-qa-id para el componente
  items?: ILibTbMenuItem[]; // Establece las opciones que se debe tener
  iconRight?: string; // Establece el icono que se mostrará como indicador a la derecha
  home?: ILibTbMenuItem; // Establece la configuracion del menú de inicio
  style?: Record<string, string | number>; // Establece los estilos que se desean aplicar formato: { propiedad: valor } ({ color: 'red' })
  class?: string; // Establece las clases que se desean agregar al breadcrumb, deben estar separadas por un espacio
  libTbOnItemClick?: (e: any) => void; // Ejecuta una función cuando se hace clic en un item
}
```
