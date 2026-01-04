```typescript
import { ILibTbScrollerOptions } from '../../shared/interfaces/scroller-options';
import { ILibTbEmptyMessage } from '../empty-message/empty-message.interface';
export interface ILibTbSearch {
  dataQaId?: string; // Establece el atributo dataQaId
  id?: string; // Establece el atributo id que tendrá el elemento input del componente
  name?: string; // Establece el atributo name que tendrá el elemento input del componente
  placeholder?: string; // Establece el placeholder que tendrá el componente
  icon?: string; // Establece el icono que se mostrará para buscar
  iconClear?: string; // Establece el icono que se tendrá para limpiar la busqueda
  iconPosition?: 'left' | 'right'; // Establece la posición del icono de busqueda
  class?: string; // Establece las clases que se desean agregar al componente, deben estar separadas por un espacio
  panelClass?: string; // Establece las clases que se desean agregar al panel de opciones, deben estar separadas por un espacio
  ngModel?: any; // Establece y retorna el valor de la opción que se encuentra seleccionada
  style?: Record<string, string | number>; // Establece los estilos que se desean aplicar formato: { propiedad: valor } ({ color: 'red' })
  disabled?: boolean; // Establece el componente como Deshabilitado
  cornerRounded?: 'on' | 'off'; // Establece redondeado de las esquinas
  size?: 'large' | 'base' | 'small'; // Establece las diferentes alturas que tiene el search
  field?: string; // Establece la clave que se va a mostrar en las sugerencias
  suggestions?: any[]; // Establece los datos que se pueden mostrar en las sugerencias formato [{id:'id':value:'valor'}]
  dataKey?: string; // Establece el nombre de la propiedad que se debe tener en cuenta para identificar una opción
  group?: boolean; // Establece si las sugerenicas estan agrupadas
  optionGroupLabel?: string; // Establece el nombre del grupo que se va a mostrar
  optionGroupChildren?: string; // Establece la clave que contiene los items del grupo
  emptyMessage?: ILibTbEmptyMessage; // Establece las propiedades del mensaje cuando no hay resultados
  semantic?: boolean; // Establece cuando se debe mostrar en semantic
  delay?: number; // Establece el tiempo entre pulsaciones de teclas para esperar antes de realizar una consulta.
  scrollHeight?: string; // Establece la altura máxima del panel de sugerencias. Por defecto: 200px
  minLength?: number; // Establece el número mínimo de caracteres para iniciar una búsqueda
  maxLength?: number; // Establece el número máximo de caracteres permitidos en el input
  completeOnFocus?: boolean; // Establece si se desea ejecutar una consulta cuando el input recibe el foco
  autoHighlight?: boolean; // Establece si se desea resaltar el primer elemento de la lista de forma predeterminada
  autofocus?: boolean; // Establece si el componente debe obtener el foco cuando se carga
  forceSelection?: boolean; // Establece si debe borrar la entrada manual si no coincide con las sugerencias para obligar a aceptar solo los valores de las sugerencias
  autocomplete?: string; // Establece una cadena que autocompleta el atributo del elemento actual
  virtualScroll?: boolean; // Establece si las sugerencias deben cargarse según la visibilidad del scroll, se debe establecer la propiedad **itemSize**
  itemSize?: number; // Establece la altura de un elemento para usarse cuando se habilita la propiedad **virtualScroll**
  virtualScrollOptions?: ILibTbScrollerOptions; // Establece las opciones que se deben utilizar para el virtual scroll
  lazy?: boolean; // Establece si los datos se deben cargar de manera perezosa o diferida
  appendTo?: 'body' | HTMLElement; // Establece el elemento al cual se agregará el panel, los valores válidos son "body" o una refencia a un elemento
  libTbClick?: (e: any) => void; // Ejecuta una función cuando se hace clic en el input de texto para buscar
  libTbKeyUp?: (e: any) => void; // Ejecuta una función cuando se deja de presionar una tecla
  libTbFocus?: (e: any) => void; // Ejecuta una función cuando el componente recibe el foco
  libTbBlur?: (e: any) => void; // Ejecuta una función cuando el componente pierde el foco
  libTbCompleteMethod?: (e: any) => void; // Ejecuta una función cuando se introducen valores en el input, teniendo en cuenta el delay establecido
  libTbSelect?: (e: any) => void; // Ejecuta una función cuando se selecciona una opción
  libTbClear?: () => void; // Ejecuta una función cuando se limpia el componente
  libTbShow?: (e: any) => void; // Ejecuta una función cuando se muestra el panel de sugerencias
  libTbHide?: () => void; // Ejecuta una función cuando se oculta el panel de sugerencias
  libTbOnLazyLoad?: (e: any) => void; // Ejecuta una función cuando el componente es lazy y carga nuevas opciones
}
```
