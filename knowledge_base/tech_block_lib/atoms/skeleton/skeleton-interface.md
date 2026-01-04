```typescript
export interface ILibTbSkeleton {
  rounded?: boolean; // Establece la forma que debe tener el componente
  size?: string; // Establece el tamaño que debe tener el componente, si se establece esta medida (px, rem, %, etc) se tomará tanto para el ancho y el alto
  width?: string; // Establece el ancho que debe tener el componente. Unidades de medida (px, rem, %, etc)
  height?: string; // Establece el alto que debe tener el componente. Unidades de medida (px, rem, %, etc)
  borderRadius?: string; // Establece el radio que debe tener el borde para el componente
  animation?: boolean; // Establece si el skeleton debe tener animación
  style?: Record<string, string | number>; // Establece los estilos que se desean aplicar formato: { propiedad: valor } ({ color: 'red' })
  class?: string; // Establece las clases que se desean agregar al componente, deben estar separadas por un espacio
}
```
