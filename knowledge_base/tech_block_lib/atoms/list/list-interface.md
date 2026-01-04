```typescript
// Las propiedades ngModel y formGroup de ILibTbList no son compatibles.
// Si se envían las dos propiedades, formGroup tendrá la relevancia.
export interface ILibTbList {
  dataQaId?: string; // Establece el atributo data-qa-id para el componente
  id?: string; // Establece el atributo id para el componente
  name?: string; // Establece el nombre para el componente
  label?: string; // Establece el label que debe aparecer junto con el checkbox
  description?: string; // Establece la descripción que debe aparecer bajo el label
  showCheckbox?: boolean; // Establece si se debe mostrar u ocultar la caja del checkbox (Por defecto: true)
  checkboxIcon?: string; // Establece el icono que debe llevar el checkbox cuando este checkeado
  icon?: string; // Establece el icono que se desea mostrar en lugar del checkbox. Si se establece no se mostrará el checkbox
  value?: any; // Establece el valor que retorna el checkbox cuando se checkea
  disabled?: boolean; // Establece el componente como deshabilitado
  binary?: boolean; // Establece el valor del checkbox como booleano en lugar de múltiples valores.
  tabindex?: number; // Establece el índice del elemento para el orden de tabulación.
  style?: Record<string, string | number>; // Establece los estilos que se desean aplicar formato: { propiedad: valor } ({ color: 'red' })
  class?: string; // Establece las clases que se desean agregar al componente, deben estar separadas por un espacio
  view?: boolean; // Establece si el checkbox debe mostrarse en estado de visualización
  ngModel?: any; // Establece/retorna el valor de las opciones que se encuentran seleccionadas
  formGroup?: FormGroup; // Establece el formGroup al que pertenece el componente
  libTbChange?: (e: any) => void; // Ejecuta una función cuando el valor del componente cambia
}
```
