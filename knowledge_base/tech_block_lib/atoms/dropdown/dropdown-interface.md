```typescript
// Las propiedades ngModel y formGroup de ILibTbDropdown no son compatibles.
// Si se envían las dos propiedades, formGroup tendrá la relevancia.
export interface ILibTbDropdown {
  dataQaId?: string; // Establece el atributo data-qa-id para el componente
  id?: string; // Establece el atributo id
  name?: string; // Establece el atributo name
  placeholder?: string; // Establece el placeholder para el dropdown
  options?: any[]; // Establece las opciones del dropdown
  optionLabel?: string; // Nombre de la propiedad que va a mostrar como opción
  optionValue?: string; // Nombre de la propiedad que se tendrá en cuenta para retornar el valor cuando una opción sea seleccionada
  showClear?: boolean; // Muestra la opción para limpiar la selección
  filter?: boolean; // Muestra una entrada de texto para filtrar opciones
  filterValue?: string; // Establece el valor que debe tener por defecto el filtro cuando se muestra
  filterBy?: string; // Establece en qué campo o campos (separados por comas) debe realizar la busqueda.
  filterPlaceholder?: string; // Establece el placeholder en la entrada de texto que filtra las opciones
  resetFilterOnHide?: boolean; // Borra la entrada de texto que filtra las opciones al ocultar o cerrar el menu de opciones
  dropdownIcon?: string; // Establece el icono para el dropdown
  dropdownIconUp?: string; // Establece el icono para el dropdown up
  style?: Record<string, string | number>; // Estilos que se desean aplicar
  class?: string; // Establece las clases que se desean agregar al componente, deben estar separadas por un espacio
  panelClass?: string; // Establece las clases que se desean agregar al panel de opciones, deben estar separadas por un espacio
  ngModel?: any; // Establece/retorna el valor de la opción que se encuentra seleccionada
  dataKey?: string; // Nombre de la propiedad que se tendrá en cuenta para identificar una opción
  disabled?: boolean; // Deshabilita el dropdown y no permite desplegar las opciones
  autofocus?: boolean; // Establece si el componente debe obtener el foco al cargarse
  autofocusFilter?: boolean; // Establece si el filtro debe obtener el foco al mostrarse
  optionDisabled?: string; // Propiedad que se tendrá en cuenta para que una opción este deshabilitada
  group?: boolean; // Establece si las opciones están agrupadas
  optionGroupLabel?: string; // Nombre de la propiedad que se va a mostrar como nombre del grupo
  optionGroupChildren?: string; // Nombre de la propiedad que contiene las opciones dentro del grupo
  scrollHeight?: string; // Establece la altura que tendrá el panel de opciones (Debe ser en px - Por defecto: 200px)
  virtualScroll?: boolean; // Establece si las opciones deben cargarse según la visibilidad del scroll, se debe establecer la propiedad **itemSize**
  itemSize?: number; // Establece la altura de un elemento para usarse cuando se habilita la propiedad **virtualScroll**
  virtualScrollOptions?: ILibTbScrollerOptions; // Establece las opciones que se deben utilizar para el virtual scroll
  overlayOptions?: ILibTbOverlayOptions; // Establece las opciones que se dean utilizar para el overlay de los items
  lazy?: boolean; // Establece si los datos se deben cargar de manera perezosa o diferida
  required?: boolean; // Establece si este campo es requerido
  error?: boolean; // Establece si tiene el estado de error
  success?: boolean; // Establece el componente como válido, y debe presentarse a manera de éxito
  view?: boolean; // Establece si tiene el estado view
  editable?: boolean; // Establece si el campo es editable
  floatLabel?: boolean; // Establece si tiene el estado float
  label?: string; // Establece el nombre del label
  iconClear?: string; // Establece el icono de clear
  caption?: boolean; // Establece si se desea mostrar el caption
  showHelp?: boolean; // Establece si se debe mostrar la ayuda
  captionText?: { // Establece el texto del caption que se muestra según el caso
    help?: string; // Mensaje de ayuda para el caption
    error?: string; // Mensaje de error para el caption
    success?: string; // Mensaje de éxito para el caption
  };
  iconCaption?: { // Establece el icono del caption que se muestra según el caso
    help?: string; // Icono de ayuda para el caption
    error?: string; // Icono de error para el caption
    success?: string; // Icono de éxito para el caption
  };
  showIconCaption?: boolean; // Establece si se debe o no mostrar el icono del caption
  formGroup?: FormGroup; // Establece formgroup al que pertenece
  emptyMessage?: ILibTbEmptyMessage; // Establece las propiedades del mensaje cuando no hay resultados
  appendTo?: 'body' | HTMLElement; // Establece el elemento al cual se agregará el panel, los valores válidos son "body" o una referencia a un elemento
  libTbClick?: (e: any) => void; // Ejecuta una función cuando se hace clic en el componente
  libTbChange?: (e: any) => void; // Ejecuta una función cuando el valor cambia
  libTbFilter?: (e: any) => void; // Ejecuta una función cuando se realiza un filtrado de datos
  libTbFocus?: (e: any) => void; // Ejecuta una función cuando el componente recibe el foco
  libTbBlur?: (e: any) => void; // Ejecuta una función cuando el componente pierde el foco
  libTbHide?: (e: any) => void; // Ejecuta una función cuando el panel de opciones se oculta
  libTbShow?: (e: any) => void; // Ejecuta una función cuando el panel de opciones se muestra
  libTbOnLazyLoad?: (e: any) => void; // Ejecuta una función cuando el componente es lazy y cargar nuevas opciones
}
```
