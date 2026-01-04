```typescript
export interface ILibTbProgressBar {
  value?: number; // Establece el valor del progreso en un rango entre 1 a 100
  showValue?: boolean; // Establece si el valor debe estar visible u oculto
  unit?: string; // Establece la unidad con la que desea representar el progreso - Por defecto: (%)
  infinite?: boolean; // Establece si la barra de progreso es infinita
  style?: Record<string, string | number>; // Establece los estilos que se desean aplicar formato: { propiedad: valor } ({ color: 'red' })
  class?: string; // Establece las clases que se desean agregar al componente, deben estar separadas por un espacio
  color?: 'info' | 'success' | 'warning' | 'error'; // Establece la variación de color para la barra de progreso
}
```
