```typescript
// Las propiedades ngModel y formGroup de ILibTbInputText no son compatibles.
// Si se envían las dos propiedades, formGroup tendrá la relevancia.
export interface ILibTbInputText {
  dataQaId?: string; // Establece el atributo data-qa-id para el componente
  type?: string; // Establece el tipo de input
  multiline?: boolean; // Establece si el componente debe ser multilinea
  maxLines?: number; // Establece el número máximo de líneas que se deben mostrar el input, cuando es multiline
  submitOnEnter?: boolean; // Establece si el componente debe hacer submit al presionar enter
  id?: string; // Establece el atributo id que tendrá el elemento input del componente
  name?: string; // Establece el atributo name que tendrá el elemento input del componente
  label?: string; // Establece el texto del label
  placeholder?: string; // Establece el placeholder que tendrá el componente
  icon?: string; // Establece el icono que se mostrará en el input de texto
  iconSecondary?: string; // Establece el icono secundario que se mostrará en el input de texto. Este se ubicará en la posición contraria al icono de la propiedad **icon**
  iconPosition?: 'left' | 'right'; // Establece la posición que tendrá el icono para el input de texto
  class?: string; // Establece las clases que se desean agregar al componente, deben estar separadas por un espacio
  style?: Record<string, string | number>; // Establece los estilos que se desean aplicar formato: { propiedad: valor } ({ color: 'red' })
  floatLabel?: boolean; //Establece si el placeholder, se debe mostrar como un texto flotante
  caption?: boolean; // Establece si el input debe tener la propiedad de mostrar un mensaje en el caption
  disabled?: boolean; // Establece el componente como Deshabilitado
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
  view?: boolean; // Establece si el input-text es solo para visualización
  ngModel?: string; // Establece y retorna el valor del valor
  formGroup?: FormGroup; // Establece el formGroup al que pertenece el componente
  autocomplete?: string; // Deshabilita el autocompletado en el input valores recomendados ('on' | 'off')
  suggestion?: boolean; // Establece si el input debe comportarse como un campo de búsqueda con sugerencias
  libTbSuggestion?: ILibTbSuggestion; // Establece las opciones de configuración para el comportamiento de las sugerencias
  required?: boolean; // Establece el input como un campo obligatorio y requerido
  error?: boolean; // Establece si el componente no es válido, y debe presentarse un error
  success?: boolean; // Establece si el componente es válido, y debe presentarse a manera de éxito
  minLength?: number; // Establece el número mínimo de caracteres
  maxLength?: number; // Establece el número máximo de caracteres
  disabledCopy?: boolean; // Establece si el componente debe deshabilitar las opciones de copiado en el input
  disabledPaste?: boolean; // Establece si el componente debe deshabilitar la opción de pegado en el input
  keyFilter?: any; // Establece el bloqueo para el input dependiendo del tipo de datos que recibe
  filterValidateOnly?: boolean; // Cuando está habilitado, en lugar de bloquear claves, la entrada se valida internamente para probarla con la expresión regular.
  libTbClickIcon?: (e: any) => void; // Ejecuta una función cuando se hace clic en el icono
  libTbClickIconSecondary?: (e: any) => void; // Ejecuta una función cuando se hace clic en el icono secundario
  libTbClick?: (e: any) => void; // Ejecuta una función cuando se hace clic en el input de texto
  libTbChange?: (e: any) => void; // Ejecuta una función cuando el valor cambia
  libTbKeydown?: (e: any) => void; // Ejecuta una función cuando se presiona una tecla - independientemente de si esta es un caracter o no
  libTbKeypress?: (e: any) => void; // Ejecuta una función cuando se presiona una tecla
  libTbKeyup?: (e: any) => void; // Ejecuta una función cuando se deja de presionar una tecla
  libTbFocus?: (e: any) => void; // Ejecuta una función cuando el componente recibe el foco
  libTbBlur?: (e: any) => void; // Ejecuta una función cuando el componente pierde el foco
  libTbOnSubmit?: (value: string) => void; // Ejecuta una función cuando se presiona enter en el input y la opcion 'submitOnEnter' está habilitada
}
```
