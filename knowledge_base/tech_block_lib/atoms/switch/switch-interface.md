```typescript
// Las propiedades ngModel y formGroup de ILibTbSwitch no son compatibles.
// Si se envían las dos propiedades, formGroup tendrá la relevancia.
export interface ILibTbSwitch {
  dataQaId?: string; // Establece el atributo data-qa-id para el componente
  label?: string; // Establece el label que debe aparecer junto al switch
  name?: string; // Establece el atributo name del input para el componente o establece el formControlName
  inputId?: string; // Establece el atributo id
  style?: Record<string, string | number>; // Establece los estilos que se desean aplicar formato: { propiedad: valor } ({ color: 'red' })
  class?: string; // Establece las clases que se desean agregar al componente, deben estar separadas por un espacio
  disabled?: boolean; // Establece el componente switch como deshabilitado
  error?: boolean; // Establece el componente switch como error
  ngModel?: any; // Establece y retorna el valor del componente
  formGroup?: FormGroup; // Establece el formGroup al que pertenece el componente
  libTbChange?: (e: any) => void; // Ejecuta una función cuando el valor cambia
}
```
