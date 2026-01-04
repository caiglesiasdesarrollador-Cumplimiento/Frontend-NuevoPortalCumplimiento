```typescript
export interface ILibTbTag {
  size?: 'large' | 'small'; // Establece el tamaño que debe tener el tag
  label?: string; // Establece el texto que se debe mostrar en el tag
  icon?: string; // Establece el icono que se debe mostrar en el tag
  rounded?: boolean; // Establece si el tag debe ser redondo
  type?: 'success' | 'info' | 'warning' | 'error'; // Establece la variación para el tipo de tag
  class?: string; // Establece las clases que se desean agregar al tag, deben estar separadas por un espacio
  style?: Record<string, string | number>; // Establece los estilos que se deben aplicar al componente. Formato: { propiedad: valor } ({ color: 'red' })
}
```
