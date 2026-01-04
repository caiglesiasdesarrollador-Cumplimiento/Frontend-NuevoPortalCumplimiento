```typescript
// Las propiedades ngModel y formGroup de ILibTbInputNumber no son compatibles.
// Si se envían las dos propiedades, formGroup tendrá la relevancia.
import { ILibTbButton } from '../button/button.interface';
export interface ILibTbInputNumber {
  dataQaId?: string; // Establece el atributo data-qa-id para el componente
  label?: string; // Establece el texto que debe tener el label
  ngModel?: number; // Establece/retorna el valor del input
  format?: boolean; // Establece si se le debe dar formato al texto
  showButtons?: boolean; // Establece si se deben mostrar los botones para cambiar el valor
  incrementButtonIcon?: string; // Establece el icono que debe llevar el botón de incremento
  decrementButtonIcon?: string; // Establece el icono que debe llevar el botón de decremento
  locale?: string; // Establece la configuración regional que se utilizará en el formateo
  localeMatcher?: 'lookup' | 'best fit'; // Establece el algoritmo de coincidencia para la configuración regional que se desea utilizar
  mode?: 'decimal' | 'currency'; // Establece el comportamiento para el valor
  prefix?: string; // Establece el texto a mostrar antes del valor
  suffix?: string; // Establece el texto a mostrar después del valor
  currency?: string; // Establece la moneda que se desea utilizar en el formato de moneda
  currencyDisplay?: 'symbol' | 'name'; // Establece como se desea mostrar el formato de moneda
  useGrouping?: boolean; // Establece si se desea usar separadores de agrupación
  minFractionDigits?: number; // Establece el número mínimo de fracción o decimales para el valor
  maxFractionDigits?: number; // Establece el número máximo de fracción o decimales para el valor
  min?: number; // Establece el valor mínimo que puede tener el valor
  max?: number; // Establece el valor máximo que puede tener el valor
  step?: number; // Establece el salto que debe realizar al incrementar o decrementar el valor
  style?: Record<string, string | number>; // Establece los estilos que se desean aplicar, formato: { propiedad: valor } ({ color: 'red' })
  class?: string; // Establece las clases que se desean agregar al componente, deben estar separadas por un espacio
  id?: string; // Establece el id que debe llevar el input
  placeholder?: string; // Establece el placeholder que debe llevar el input
  size?: number; // Establece el tamaño del input
  maxlength?: number; // Establece el número máximo de caracteres que puede tener el valor
  disabled?: boolean; // Establece el componente como deshabilitado
  name?: string; // Establece el nombre que debe tener el input
  autocomplete?: string; // Establece si el input puede ser autocompletado
  required?: boolean; // Establece el componente como requerido
  view?: boolean; // Establece si el input-text es solo para visualización
  error?: boolean; // Establece el componente como no válido, y debe presentarse un error
  success?: boolean; // Establece el componente como válido, y debe presentarse a manera de éxito
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
  caption?: boolean; // Establece si el input-number debe mostrar un mensaje en el caption
  showHelp?: boolean; // Establece si el input-number debe mostrar la ayuda
  floatLabel?: boolean; // Establece si el label va a ser flotante
  formGroup?: FormGroup; // Establece el formGroup al que pertenecerá el componente
  libTbButtomMinus?: ILibTbButton; // Establece las propiedades del botón para disminuir el valor
  libTbButtomPlus?: ILibTbButton; // Establece las propiedades del botón para aumentar el valor
  libTbFocus?: (e: any) => void; // Ejecuta una función cuando el componente recibe el foco
  libTbBlur?: (e: any) => void; // Ejecuta una función cuando el componente pierde el foco
  libTbChange?: (e: any) => void; // Ejecuta una función cuando el valor cambia
  libTbKeydown?: (e: any) => void; // Ejecuta una función cuando se presiona una tecla - independientemente de si esta es un caracter o no
}
```
