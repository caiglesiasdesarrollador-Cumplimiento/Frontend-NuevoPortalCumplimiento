```typescript
export interface ILibTbChart {
  data?: any; // Establece los datos a mostrar
  class?: string; // Establece las clases que se desean agregar al componente, deben estar separadas por un espacio
  type?: 'bar' | 'line' | 'scatter' | 'bubble' | 'pie' | 'doughnut' | 'polarArea' | 'radar'; // Establece el tipo de gráfico que se desea
  plugins?: any[]; // Establece los plugins para personalizar el gráfico
  options?: any; // Establece las opciones para personalizar el gráfico.
  width?: string; // Establece el ancho del gráfico
  height?: string; // Establece el alto del gráfico
  responsive?: boolean; // Establece el gráfico como adaptable a los cambios de pantalla
  libTbOnDataSelect?: (e: any) => void; // Ejecuta una función cuando se hace clic en un elemento en el gráfico
}
```
