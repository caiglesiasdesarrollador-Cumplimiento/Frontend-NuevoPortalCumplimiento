```typescript
// Las propiedades ngModel y formGroup de ILibTbSlider no son compatibles.
// Si se envían las dos propiedades, formGroup tendrá la relevancia.
export interface ILibTbSlider {
  dataQaId?: string; // Establece el atributo data-qa-id para el componente
  label?: string; // Establece el texto para el label
  value?: number | [number, number]; // Establece el valor que tendrá el slider
  floatValues?: boolean; // Establece si los valores se visualizarán flotantes en el slider o fijos en el label
  animate?: boolean; // Establece si al seleccionar un valor se muestra una animación
  disabled?: boolean; // Deshabilita el componente y no permitirá desplegar el panel de opciones
  min?: number; // Establece el valor mínimo para la selección de valores
  max?: number; // Establece el valor máximo para la selección de valores
  orientation?: 'horizontal' | 'vertical'; // Establece la orientación del slider
  step?: number; // Establece el valor de incremento al deslizar
  range?: boolean; // Habilita la selección de dos valores
  style?: Record<string, string | number>; // Establece los estilos que se desean aplicar formato: { propiedad: valor } ({ color: 'red' })
  class?: string; // Establece las clases que se desean agregar al componente, deben estar separadas por un espacio
  tabindex?: number; // Establece el índice del elemento en orden de tabulación
  ariaLabelledBy?: string; // Establece relaciones entre el componente y la(s) etiqueta(s) donde su valor debe ser uno o más ID de elementos
  name?: string; // Establece el atributo name que tendrá el elemento input del componente
  error?: boolean; // Establece si existe un error en el componente
  formGroup?: FormGroup; // Establece el formGroup al que pertenece el componente
  libTbChange?: (e: any) => void; // Ejecuta una función cuando el valor cambia
  libTbSlideEnd?: (e: any) => void; // Ejecuta una función cuando el deslizador se detiene
}
```
