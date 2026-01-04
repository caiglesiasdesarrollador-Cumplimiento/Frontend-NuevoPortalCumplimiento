```typescript
export interface ILibTbChip {
  dataQaId?: string; // Establece el atributo data-qa-id para el componente
  label?: string; // Establece el texto que se debe mostrar en el chip
  icon?: string; // Establece el icono que debe tener el chip
  img?: string; // Establece la imagen que debe tener el chip
  size?: 'large' | 'small'; // Establece el tamaño del chip
  removable?: boolean; // Establece si se debe mostrar la opción de eliminar el chip
  iconRemove?: string; // Establece el icono que debe llevar la opción de eliminar el chip
  style?: Record<string, string | number>; // Establece los estilos que se desean aplicar formato: { propiedad: valor } ({ color: 'red' })
  class?: string; // Establece las clases que se desean agregar al chip, deben estar separadas por un espacio
  tabIndex?: number; // Establece el atributo tabindex del componente
  disabled?: boolean; // Establece si el componente debe estar deshabilitado
  active?: boolean; // Establece si el chip debe estar activo
  libTbOnRemove?: (e: any) => void; // Ejecuta una función cuando el chip se ha eliminado
  libTbClick?: (e: any) => void; // Ejecuta una función cuando se hace click en el chip
}
```
