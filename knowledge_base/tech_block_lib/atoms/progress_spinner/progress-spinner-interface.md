```typescript
export interface ILibTbProgressSpinner {
  dataQaId?: string; // Establece el atributo data-qa-id para el componente
  value?: number; // Establece el valor del progreso en un rango entre 1 a 100
  infinite?: boolean; // Establece si el indicador de progreso debe estar en constante movimiento
  style?: Record<string, string | number>; // Establece los estilos que se desean aplicar formato: { propiedad: valor } ({ color: 'red' })
  class?: string; // Establece las clases que se desean agregar al componente, deben estar separadas por un espacio
  strokeWidth?: number; // Establece el ancho del indicador de progreso
  animationDuration?: string; // Establece la duración de la animación en el progreso
  basic?: boolean; // Establece si el spinner debe ser básico
  integrated?: boolean; // Establece si el spinner debe ser de este tipo (integrated)
  text?: { // Establece el texto que se debe mostrar dentro del indicador de progreso
    body?: string;
    label?: string;
  };
  icon?: string; // Establece el icono que se debe mostrar dentro del indicador de progreso
  img?: { // Establece las propiedades de la imagen que se desea mostrar dentro del indicador de progreso
    src: string; // Establece la url de la imagen
    alt?: string; // Establece el atributo alt de la imagen
    defaultWidth?: number; // Establece el ancho por defecto de la imagen
    defaultHeight?: number; // Establece el alto por defecto de la imagen
  };
  fillContainer?: boolean; // Establece si el progress spinner deberá rellenar el contenedor, debe tener un contenedor con tamaño definido
  libTbClick?: (e: any) => void; // Ejecuta una función cuando se hace clic en el indicador de progreso
}
```
