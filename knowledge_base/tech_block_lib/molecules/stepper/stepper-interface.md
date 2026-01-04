```typescript
import { ILibTbMenuItem } from '../../atoms/panel-menu/panel-menu.interface';
export interface ILibTbStepper {
  dataQaId?: string; // Establece el atributo data-qa-id para el componente
  items?: ILibTbMenuItem[]; // Lista con los pasos y las propiedades de los mismos.
  activeIndex?: number; // Posición del paso actualmente activo.
  readonly?: boolean; // Establece si el stepper será clickeable o no
  style?: Record<string, string | number>; // Establece los estilos que se desean aplicar formato: { propiedad: valor } ({ color: 'red' })
  class?: string; // Establece las clases que se desean agregar al componente, deben estar separadas por un espacio
  type?: 'number' | 'icon' | 'mix'; // Establece el tipo de stepper que se quiere utilizar.
  libTbActiveIndexChange?: (index: number) => void; // Ejecuta una función cuando el stepper cambia de paso.
}
```
