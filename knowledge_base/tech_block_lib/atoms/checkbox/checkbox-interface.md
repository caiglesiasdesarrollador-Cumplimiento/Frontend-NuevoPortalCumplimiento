```typescript
// Las propiedades ngModel y formGroup de ILibTbCheckbox no son compatibles.
// Si se envían las dos propiedades, formGroup tendrá la relevancia.
export interface ILibTbCheckbox {
  dataQaId?: string; // Establece el atributo data-qa-id para el componente
  id?: string; // Establece el atributo id para el checkbox
  name?: string; // Establece el nombre para el checkbox
  label?: string; // Establece el label que debe aparecer junto con el checkbox
  value?: any; // Establece el valor que retorna el checkbox cuando se checkea
  disabled?: boolean; // Establece el checkbox como deshabilitado
  binary?: boolean; // Establece el valor del checkbox como booleano en lugar de múltiples valores.
  tabindex?: number; // Establece el índice del elemento para el orden de tabulación.
  style?: Record<string, string | number>; // Establece los estilos que se desean aplicar formato: { propiedad: valor } ({ color: 'red' })
  class?: string; // Establece las clases que se desean agregar al checkbox, deben estar separadas por un espacio
  checkboxIcon?: string; // Establece el icono que debe llevar el checkbox cuando este checkeado
  error?: boolean; // Establece si el checkbox se debe mostrar en estado de error
  view?: boolean; // Establece si el checkbox se debe mostrar en estado de visualización
  ngModel?: any; // Establece/retorna el valor de las opciones que se encuentran seleccionadas
  formGroup?: FormGroup; // Establece el formGroup al que pertenece el componente
  libTbChange?: (e: { checked: any; originalEvent: PointerEvent }) => void; // Ejecuta una función cuando el valor de algún checkbox cambia
}
```
