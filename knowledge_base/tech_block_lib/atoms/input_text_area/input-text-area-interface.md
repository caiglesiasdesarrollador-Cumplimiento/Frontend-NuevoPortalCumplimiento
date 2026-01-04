```typescript
// Las propiedades ngModel y formGroup de ILibTbInputTextArea no son compatibles.
// Si se envían las dos propiedades, formGroup tendrá la relevancia.
export interface ILibTbInputTextArea {
  dataQaId?: string; // Establece el atributo data-qa-id para el componente
  id?: string; // Establece el atributo id para el componente
  autoResize?: boolean; // Establece si el componente debe redimensionar su tamaño de acuerdo al contenido del textarea
  caption?: boolean; //  Establece si se desea mostrar el caption
  floatLabel?: boolean; // Establece el tipo de label que va a tener el componente
  placeholder?: string; // Establece el placeholder del componente
  ngModel?: string; // Establece y retorna el valor del value
  disabled?: boolean; // Establece si el componente se encuentra deshabilitado
  label?: string; // Establece el label del componente
  view?: boolean; // Establece si se activará el modo view
  required?: boolean; // Establece si el componente es requerido
  columns?: number; // Establece la cantidad de columnas del input text area
  rows?: number; // Establece la cantidad de filas en el input text area
  minLength?: number; // Establece la cantidad mínima de caracteres en el input
  maxLength?: number; // Establece la cantidad máxima de caracteres en el input
  name?: string; // Establece el nombre del componente
  formGroup?: FormGroup; // Establece el formGroup al que pertenece el componente
  style?: Record<string, string | number>; // Establece los estilos que se desean aplicar formato: { propiedad: valor } ({ color: 'red' })
  class?: string; // Establece las clases que se desean agregar al componente, deben estar separadas por un espacio
  error?: boolean; // Establece si el componente no es válido, y debe presentarse un error
  success?: boolean; // Establece si el componente es válido, y debe presentarse a manera de éxito
  showHelp?: boolean; // Establece si el input debe mostrar la ayuda
  captionText?: { // Establece el texto del caption que se muestra según el caso
    help?: string; // Mensaje de ayuda para el caption
    error?: string; // Mensaje de error para el caption
    success?: string; // Mensaje de éxito para el caption
  };
  showIconCaption?: boolean; // Establece si se debe mostrar el icono en el caption
  iconCaption?: { // Establece el icono del caption que se muestra según el caso
    help?: string; // Icono de ayuda para el caption
    error?: string; // Icono de error para el caption
    success?: string; // Icono de éxito para el caption
  };
  disabledCopy?: boolean; // Establece si el componente debe deshabilitar las opciones de copiado en el input
  disabledPaste?: boolean; // Establece si el componente debe deshabilitar la opción de pegado en el input
  libTbClick?: (e: any) => void; // Ejecuta una función cuando se hace clic en el area del input de texto
  libTbChange?: (e: any) => void; // Ejecuta una función cuando el valor cambia
  libTbKeydown?: (e: any) => void; // Ejecuta una función cuando se presiona una tecla
  libTbKeypress?: (e: any) => void; // Ejecuta una función cuando se presiona una tecla
  libTbKeyup?: (e: any) => void; // Ejecuta una función cuando se deja de presionar una tecla
  libTbFocus?: (e: any) => void; // Ejecuta una función cuando el componente recibe el foco
  libTbBlur?: (e: any) => void; // Ejecuta una función cuando el componente pierde el foco
}
```
