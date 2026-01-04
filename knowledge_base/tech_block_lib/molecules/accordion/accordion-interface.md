```typescript
import { ILibTbButton } from '../../atoms/button/button.interface';
export interface ILibTbAccordion {
  dataQaId?: string; // Establece el atributo data-qa-id para el componente
  multiple?: boolean; // Establece si se permiten tener activos varios tabs a la vez
  style?: Record<string, string | number>; // Establece los estilos que se desean aplicar formato: { propiedad: valor } ({ color: 'red' })
  class?: string; // Establece las clases que se desean agregar al componente, deben estar separadas por un espacio
  activeIndex?: any; // Establece que tab debe estar activa al mostrar el accordion
  expandIcon?: string; // Establece el icono que expande los tabs
  collapseIcon?: string; // Establece el icono que contrae los tabs
  alwaysShow?: boolean; // Si se encuentra en true siempre se mostrará activo un tab
  libTbOnOpen?: (e: any) => void; // Ejecuta una función cuando se abre un tab
  libTbOnClose?: (e: any) => void; // Ejecuta una función cuando se cierra un tab
  libTbActiveIndexChange?: (e: any) => void; // Ejecuta una función cuando se cambia el index activo
}
export interface ILibTbAccordionTab {
  header?: string; // Establece el título del item para el componente
  selected?: boolean; // Establece si el item debe estar activo / seleccionado
  disabled?: boolean; // Establece el item como deshabilitado
  transitionOptions?: string; // Establece las opciones de transición para el item
  cache?: boolean; // Establece si un item debe evitar que se vuelva a cargar cuando se seleccion nuevamente
  button?: ILibTbButton; // Establece las propiedades del botón.
  icon?: string; // Establece el icono que acompañará al header.
  libTbSelectedChange?: (e: any) => void; // Ejecuta una función cuando se cambia la seleccion del tab
}
```
