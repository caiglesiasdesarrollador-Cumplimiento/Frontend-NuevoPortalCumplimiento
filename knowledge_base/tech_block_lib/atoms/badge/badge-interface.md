```typescript
export interface ILibTbBadge {
  value?: string | number; // Establece el valor que se debe mostrar en el badge
  icon?: string; // Establece el icono que se debe mostrar en el badge
  type?: 'success' | 'info' | 'warning' | 'error'; // Establece el tipo de badge
  size?: 'large' | 'xlarge'; // Establece el tamaño del badge
  class?: string; // Establece las clases que se desean agregar al badge, deben estar separadas por un espacio
  style?: Record<string, string | number>; // Establece los estilos que se deben aplicar al badge. Formato: { propiedad: valor } ({ color: 'red' })
}
```
