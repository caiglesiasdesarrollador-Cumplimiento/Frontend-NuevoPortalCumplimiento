```typescript
// Las propiedades ngModel y formGroup de ILibTbCalendar no son compatibles.
// Si se envían las dos propiedades, formGroup tendrá la relevancia.
import { ILibTbButton } from '../../atoms/button/button.interface';
export interface ILibTbCalendar {
  dataQaId?: string; // Establece el atributo data-qa-id para el componente
  defaultDate?: Date; // Establece la fecha que se debe resaltar en la primera apertura si el campo está en blanco
  selectionMode?: 'single' | 'multiple' | 'range'; // Establece el tipo de selección que tendrá el calendario
  style?: Record<string, string | number>; // Establece los estilos que se desean aplicar - formato: { propiedad: valor } ({ color: 'red' })
  class?: string; // Establece las clases que se desean agregar al componente, deben estar separadas por un espacio
  inputStyle?: Record<string, string | number>; // Establece los estilos que se desean aplicar al input del calendario - formato: { propiedad: valor } ({ color: 'red' })
  inputClass?: string; // Establece las clases que se desean agregar al input del calendario, deben estar separadas por un espacio
  id?: string; // Establece el atributo id para el input del calendario
  name?: string; // Establece el atributo name para el input del calendario
  placeholder?: string; // Establece el placeholder que debe tener el input del calendario
  disabled?: boolean; // Establece el componente como deshabilitado
  dateFormat?: string; // Establece el formato de la fecha (ej. 'mm/dd/yy')
  inline?: boolean; // Establece si el calendario debe estar visible y sin input
  showOtherMonths?: boolean; // Establece si se deben mostrar los dias de otros meses
  selectOtherMonths?: boolean; // Establece si se pueden seleccionar dias de otros meses
  showIcon?: boolean; // Establece si se debe mostrar el icono y botón para el calendario
  icon?: string; // Establece el icono para el botón del calendario
  showWeek?: boolean; // Establece si se desea mostrar el número de la semana en el calendario
  showOnFocus?: boolean; // Establece si el calendario se debe mostrar cuando se haga focus al input
  readonlyInput?: boolean; // Establece si el input del calendario debe ser de solo lectura
  shortYearCutoff?: string; // Establece el año límite para determinar el siglo de una fecha
  minDate?: Date; // Establece la fecha mínima que se puede seleccionar
  maxDate?: Date; // Establece la fecha máxima que se puede seleccionar
  disabledDates?: Array<Date>; // Establece las fechas que deben estar deshabilitadas
  disabledDays?: Array<number>; // Establece los dias de la semana que deben estar deshabilitados
  hourFormat?: '12' | '24'; // Establece el formato que debe tener la hora
  timeOnly?: boolean; // Establece si el calendario debe mostrar solo el selector de tiempo
  timeSeparator?: string; // Establece el separador que debe tener el selector de tiempo
  dataType?: 'date' | 'string'; // Establece el tipo de dato que debe retornar el ngModel
  required?: boolean; // Establece si el componente es requerido
  tabindex?: number; // Establece el atributo tab-index que debe llevar el componente
  showSeconds?: boolean; // Establece si se debe mostrar el selector de segundos en el calendario
  stepHour?: number; // Establece la cantidad de horas a aumentar o disminuir al usar el selector de horas
  stepMinute?: number; // Establece la cantidad de minutos a aumentar o disminuir al usar el selector de minutos
  stepSecond?: number; // Establece la cantidad de segundos a aumentar o disminuir al usar el selector de segundos
  maxDateCount?: number; // Establece el número máximo de fechas que se pueden seleccioanr en el modo 'multiple'
  showButtonBar?: boolean; // Establece si se debe mostrar la barra de botones
  libTbButtonToday?: ILibTbButton; // Establece las propiedades del botón que se mostrará en el calendar
  libTbButtonClear?: ILibTbButton; // Establece las propiedades del botón que se mostrará en el calendar
  baseZIndex?: number; // Establece el z-index base para el calendario
  autoZIndex?: boolean; // Establece si el z-index del calendario debe ser automático
  panelClass?: string; // Establece las clases que se desean agregar al panel del calendario, deben estar separadas por un espacio
  panelStyle?: Record<string, string | number>; // Establece los estilos que se desean aplicar al panel del calendario - formato: { propiedad: valor } ({ color: 'red' })
  hideOnDateTimeSelect?: boolean; // Establece si se desea ocultar el calendario cuando se seleccione la fecha
  numberOfMonths?: number; // Establece el número de meses a mostrar para seleccionar
  view?: 'date' | 'month' | 'year'; // Establece el modo de selección para el calendario
  multipleSeparator?: string; //  Establece el separador que deben tener las fechas cuando el tipo de selección es múltiple
  rangeSeparator?: string; // Establece el separador que deben tener las fechas cuando el tipo de selección sea un rango
  touchUI?: boolean; // Establece si el calendario se debe mostrar de manera optimizada para dispositivos táctiles
  focusTrap?: boolean; // Establece que cuando el calendario este activo, solo se pueda hacer focus en elementos del mismo
  showTransitionOptions?: string; // Establece las opciones de transición cuando se muestre el calendario
  hideTransitionOptions?: string; // Establece las opciones de transición cuando se oculte el calendario
  firstDayOfWeek?: number; // Establece cual debe ser el primer dia de la semana
  error?: boolean; // Establece el estado error
  formGroup?: FormGroup; // Establece el formGroup al que pertenece
  ngModel?: string; // Establece y retorna el valor de la opción que se encuentra seleccionada
  floatLabel?: boolean; // Establece si el label, se debe mostrar como un texto flotante
  label?: string; // Establece el texto del label
  success?: boolean; // Establece si el componente es válido, y debe presentarse success
  caption?: boolean; // Establece si se debe mostrar el caption
  showHelp?: boolean; // Establece si se debe mostrar la ayuda
  captionText?: { // Establece el texto que se debe mostrar según sea el caso
    help?: string; // Mensaje de ayuda para el caption
    error?: string; // Mensaje de error para el caption
    success?: string; // Mensaje de éxito para el caption
  };
  showIconCaption?: boolean; // Establece si se debe mostrar el icono en el caption
  iconCaption?: { // Establece el icono que se debe mostrar en el caption según sea el caso
    help?: string; // Icono de ayuda para el caption
    error?: string; // Icono de error para el caption
    success?: string; // Icono de éxito para el caption
  };
  appendTo?: 'body' | HTMLElement; // Establece el elemento al cual se agregará el panel, los valores válidos son "body" o una refencia a un elemento
  keepInvalid?: boolean; // Establece si se debe mantener el valor del input cuando no es válido
  arrowStyleBtn?: 'fill' | 'stroke' | 'text'; // Establece el tipo de botón de las flechas
  arrowTypeBtn?: 'primary' | 'secondary' | 'tertiary' | 'error'; // Establece el estilo de visualización del botón
  arrowsIcon?: { // Establece los iconos para las flechas
    right?: string; // Establece el icono para la flecha derecha
    left?: string; // Establece el icono para la flecha izquierda
  };
  libTbOnSelect?: (e: any) => void; // Ejecuta una función cuando se selecciona una fecha
  libTbOnBlur?: (e: any) => void; // Ejecuta una función cuando quita el foco del input del calendario
  libTbOnFocus?: (e: any) => void; // Ejecuta una función cuando el input del calendario obtiene el focus
  libTbOnClose?: (e: any) => void; // Ejecuta una función cuando cierra el calendario
  libTbOnShow?: (e: any) => void; // Ejecuta una función cuando se muestra el calendario
  libTbOnClickOutside?: (e: any) => void; // Ejecuta una función cuando se hace clic fuera del calendario
  libTbOnInput?: (e: any) => void; // Ejecuta una función cuando se escribe en el input del calendario
  libTbOnMonthChange?: (e: any) => void; // Ejecuta una función cuando el mes cambia
  libTbOnYearChange?: (e: any) => void; // Ejecuta una función cuando el año cambia
  libTbChange?: (e: any) => void; // Ejecuta una función cuando el ngModel cambia
}
```
