```typescript
// Las propiedades ngModel y formGroup de ILibTbDropdownMultiSelect no son compatibles.
// Si se envían las dos propiedades, formGroup tendrá la relevancia.
export interface ILibTbDropdownMultiSelect {
  dataQaId?: string; // Establece el atributo data-qa-id para el componente
  options?: any[]; // Establece las opciones a mostrar dentro del panel de opciones
  required?: boolean; // Establece el atributo required al componente
  optionLabel?: string; // Establece el nombre de la propiedad que va a mostrar como opción
  optionValue?: string; // Establece el nombre de la propiedad que se tendrá en cuenta para retornar el valor cuando una opción sea seleccionada
  optionDisabled?: string; // Establece la propiedad que se tendrá en cuenta para que una opción este deshabilitada
  style?: Record<string, string | number>; // Establece los estilos que se desean aplicar formato: { propiedad: valor } ({ color: 'red' })
  class?: string; // Establece las clases que se desean agregar al componente, deben estar separadas por un espacio
  panelClass?: string; // Establece las clases que se desean agregar al panel de opciones, deben estar separadas por un espacio
  id?: string; // Establece el valor del atributo "id" en el input del componente
  ariaFilterLabel?: string; // Establece el texto del aria-label en el input de texto que filtra las opciones
  ariaLabelledBy?: string; // Establece a que elemento(s) se debe asociar el texto que describe el proposito de este componente
  autofocusFilter?: boolean; // Establece si el filtro debe obtener el foco inmediatamente cuando se muestra
  disabled?: boolean; // Deshabilita el componente y no permitirá desplegar el panel de opciones
  dropdownIcon?: string; // Establece el icono para el dropdown multi select
  dropdownIconUp?: string; // Establece el icono para el up del dropdown multi select
  emptyFilterMessage?: string; // Establece el mensaje que se mostrará cuando la opciones estan vacias o cuando no hay coincidencias al filtrar las opciones, Por defecto: No hay opciones
  filter?: boolean; // Establece si se debe mostrar el filtro para las opciones
  filterValue?: string; // Establece el valor por defecto que tendrá el filtro
  filterBy?: string; // Establece la propiedad que se debe terner en cuenta para realizar el filtrado
  filterPlaceholder?: string; // Establece el placeholder que tendrá el filtro - Por defecto: Buscar
  placeholder?: string; // Establece el placeholder que tendrá el componente
  name?: string; // Establece el atributo name que tendrá el elemento input del componente
  group?: boolean; // Establece si las opciones deben mostrarse de manera agrupada
  optionGroupLabel?: string; // Establece el nombre de la propiedad que se va a mostrar como nombre del grupo
  optionGroupChildren?: string; // Establece el nombre de la propiedad que contiene las opciones dentro del grupo
  overlayVisible?: boolean; // Establece la visibilidad del panel de opciones
  readonly?: boolean; // Establece si el componente es de solo lectura
  resetFilterOnHide?: boolean; // Establece el valor del filtro se debe reiniciar al cerrar el panel de opciones
  scrollHeight?: string; // Establece la altura que tendrá el panel de opciones (Debe ser en px, por defecto: 200px)
  selectionLimit?: number; // Establece el número máximo de opciones que se permite seleccionar
  showHeader?: boolean; // Establece si el encabezado de opciones será visible en el panel de opciones
  showToggleAll?: boolean; // Establece si debe estar visible la casilla para seleccionar todas las opciones
  toggleAllLabel?: string; // Establece el texto que debe aparecer en el item para seleccionar todas las opciones
  virtualScroll?: boolean; // Establece si las opciones deben cargarse según la visibilidad del scroll, se debe establecer la propiedad **itemSize**
  itemSize?: number; // Establece la altura de un elemento para usarse cuando se habilita la propiedad **virtualScroll**.
  virtualScrollOptions?: ILibTbScrollerOptions; // Establece las opciones que se deben utilizar para el virtual scroll
  overlayOptions?: ILibTbOverlayOptions; // Establece las opciones que se dean utilizar para el overlay de los items
  lazy?: boolean; // Establece si los datos se deben cargar de manera perezosa o diferida
  ngModel?: any[]; // Establece y retorna el valor de la opción que se encuentra seleccionada
  dataKey?: string; // Establece el nombre de la propiedad que se tendrá en cuenta para identificar una opción
  label?: string; // Establece el texto del label que llevará el input
  chip?: boolean; // Establece si el dropdown va a tener chips
  ellipsis?: boolean; // Establece si terminara en puntos suspensivos o en agrupacion.
  floatLabel?: boolean; // Establece el tipo de label que va a tener el dropdown
  view?: boolean; // Establece si se activará el modo de vista.
  formGroup?: FormGroup; // Establece formgroup al que pertenece
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
  error?: boolean; // Establece si tiene el estado de error
  success?: boolean; // Establece el componente como válido, y debe presentarse a manera de éxito
  emptyMessage?: ILibTbEmptyMessage; // Establece las propiedades del mensaje cuando no hay resultados
  appendTo?: 'body' | HTMLElement; // Establece el elemento al cual se agregará el panel, los valores válidos son "body" o una refencia a un elemento
  libTbClick?: (e: any) => void; // Ejecuta una función cuando se hace clic en el componente
  libTbChange?: (e: any) => void; // Ejecuta una función cuando el valor cambia
  libTbFilter?: (e: ILibTbDropdownMultiSelectFilter) => void; // Ejecuta una función cuando se realiza un filtrado de datos
  libTbFocus?: (e: any) => void; // Ejecuta una función cuando el componente recibe el foco
  libTbBlur?: (e: any) => void; // Ejecuta una función cuando el componente pierde el foco
  libTbPanelHide?: (e: any) => void; // Ejecuta una función cuando el panel de opciones se oculta
  libTbPanelShow?: (e: any) => void; // Ejecuta una función cuando el panel de opciones se muestra
  libTbOnLazyLoad?: (e: any) => void; // Ejecuta una función cuando el componente es lazy y carga nuevas opciones
}
```
