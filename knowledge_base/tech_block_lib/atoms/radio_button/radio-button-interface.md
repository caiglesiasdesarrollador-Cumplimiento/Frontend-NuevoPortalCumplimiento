```typescript
// Las propiedades ngModel y formGroup de ILibTbRadioButton no son compatibles.
// Si se envían las dos propiedades, formGroup tendrá la relevancia.
export interface ILibTbRadioButton {
  dataQaId?: string; // Establece el atributo data-qa-id para el componente
  name?: string; // Establece el nombre del radio button o establece el formControlName
  value?: any; // Establece el valor que retorna el input al seleccionarse
  label?: string; // Establece el label que aparece junto con el radio button
  id?: string; // Establece el atributo id del radio button
  style?: Record<string, string | number>; // Establece los estilos que se desean aplicar formato: { propiedad: valor } ({ color: 'red' })
  class?: string; // Establece las clases que se desean agregar al componente, deben estar separadas por un espacio
  disabled?: boolean; // Establece el componente radio button como deshabilitado
  error?: boolean; // Establece el componente radio button como error
  ngModel?: any; // Establece y retorna el valor de la opción que se encuentra seleccionada
  formGroup?: FormGroup; // Establece el formGroup al que pertenece el componente
  libTbClick?: (e: any) => void; // Ejecuta una función cuando se hace clic en el radio button
  libTbFocus?: (e: any) => void; // Ejecuta una función cuando el componente recibe el foco
  libTbBlur?: (e: any) => void; // Ejecuta una función cuando el componente pierde el foco
  libTbChange?: (e: any) => void; // Ejecuta una función cuando el valor cambia
}
```
