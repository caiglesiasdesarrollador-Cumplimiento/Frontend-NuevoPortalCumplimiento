```typescript
import { SortMeta } from 'primeng/api';
import { ILibTbPaginator } from '../../molecules/paginator/paginator.interface';
import { ContextMenu } from 'primeng/contextmenu/';
export interface ILibTbTable {
  alwaysShowPaginator?: boolean; // Establece si el paginator se mostrara siempre.
  autoLayout?: boolean; // Establece si los anchos de celda se escalan según su contenido o no.
  breakpoint?: string; // Establece el punto de interrupción para definir el límite de ancho máximo cuando se usa el diseño de respuesta de pila.
  columnResizeMode?: 'fit' | 'expand'; // Define si el ancho general de la tabla debe cambiar, al cambiar el tamaño de la columna, los valores válidos son "fit" y "expand".
  columns?: any[]; // Establece una matriz de objetos para representar columnas dinámicas.
  compareSelectionBy?: 'deepEquals' | 'equals'; // Establece el algoritmo para definir si se selecciona una fila, los valores válidos son 'equals' que compara por referencia y 'deepEquals' que compara todos los campos.
  contextMenu?: ContextMenu; // Establece la plantilla ng local variable de un elemento ContextMenu.
  contextMenuSelection?: any; // Establece la fila seleccionada con un ContextMenu.
  contextMenuSelectionMode?: 'separate' | 'joint'; // Define cómo el menú contextual maneja la selección: en modo "separate", actualiza contextMenuSelection; en modo "joint", comparte la selección con las filas cuando esta opción está habilitada.
  csvSeparator?: string; // Establece el carácter a utilizar como separadora csv.
  customPaginator?: ILibTbPaginator; // Establece las propiedades customizada para el/los paginadores de la tabla.
  customSort?: boolean; // Establece las propiedades customizadas para el/los sort.
  dataKey?: string | null; // Establece una propiedad para identificar de forma única un registro en los datos.
  dataQaId?: string; // Establece el atributo data-qa-id para el componente
  defaultSortOrder?: number; // Establece el orden de clasificación para usar cuando una columna sin ordenar se ordena por la interacción del usuario.
  editingRowKeys?: { [s: string]: boolean }; // Establece la instancia de mapa para mantener las filas editadas donde la clave del mapa es la clave de datos de la fila.
  editMode?: 'row' | 'cell'; // Define el modo de edición, los valores válidos son "row" y "cell".
  expandedRowKeys?: { [s: string]: boolean }; // Establece la instancia de mapa para mantener las filas expandidas donde la clave del mapa es la clave de datos de la fila.
  exportFilename?: string; // Establece el nombre del archivo exportado.
  exportFunction?: any; // Establece una función para implementar la exportación personalizada. Necesidad de devolver el valor de la cadena. event.data: datos de campo. event.field: Campo de columna.
  exportHeader?: string; // Establece el encabezado de exportación personalizado de la columna que se exportará como CSV.
  filterDelay?: number; // Establece el retraso en milisegunds para mostrar la información.
  filterLocale?: string; // Establece el locale para usar en el filtrado. La configuración regional predeterminada es la configuración regional actual del entorno host.
  filters?: any; // Establece un arreglo de objetos FilterMetadata para proporcionar filtros externos.
  first?: number; // Establece el index del elemento que se desea mostrar por defecto, relativo desde 0. Propiedad similar al *first* del **customPaginator**.
  frozenValue?: any[]; // Establece una matriz de objetos para mostrar como congelados
  globalFilterFields?: string[]; // Establece una matriz de campos como cadena para usar en el filtrado global.
  groupRowsBy?: any; // Establece uno o más nombres de campo para usar en la agrupación de filas.
  groupRowsByOrder?: number; // Establece el número para ordenar cuando la agrupación de filas predeterminada está habilitada.
  lazy?: boolean; // Define si los datos se cargan y se interactúa con ellos de forma perezosa.
  lazyLoadOnInit?: boolean; // Define si se llama la carga en la inicialización.
  loading?: boolean; // Muestra un cargador para indicar que la carga de datos está en curso.
  loadingIcon?: string; // Establece el icono que se muestra mientras indica que la carga de datos está en curso.
  maxBufferPx?: number; // Establece la configuración de cuánto espacio de búfer se debe volver a representar cuando detecta que se requiere más búfer.
  metaKeySelection?: boolean; // Define si se debe considerar metaKey para la selección. En dispositivos táctiles, metaKeySelection se apaga automáticamente.
  minBufferPx?: number; // Establece la cantidad mínima de búfer de contenido (en píxeles) que debe representar la ventana gráfica.
  multiSortMeta?: SortMeta[]; // Establece una matriz de objetos SortMeta para ordenar los datos de forma predeterminada en el modo de ordenación múltiple.
  pageLinks?: number; // Establece el número de enlaces de página para mostrar en el paginador.
  paginator?: boolean; // Cuando se establece verdadero, habilita el paginador.
  paginatorPosition?: 'bottom' | 'top' | 'both'; // Establece la posición en la que se mostrará el paginador
  paginatorAlign?: 'left' | 'center' | 'right'; // Establece la alineación horizontal del paginador
  reorderableColumns?: boolean; // Establece si las columnas se podran re ordenar o no
  resetPageOnSort?: boolean; // Cuando es verdadero, restablece el paginador a la primera página después de ordenar. Disponible solo cuando sortMode está establecido en único.
  resizableColumns?: boolean; // Cuando está habilitado, las columnas se pueden cambiar de tamaño arrastrando y soltando.
  responsive?: boolean; // Establece si es o no responsive la tabla.
  responsiveLayout?: 'scroll' | 'stack'; // Define el modo de respuesta, las opciones válidas son "scroll" y "stack".
  rowExpandMode?: 'multiple' | 'single'; // Define si se pueden expandir varias filas en cualquier momento. Los valores válidos son "multiple" y "single".
  rowGroupMode?: 'subheader' | 'rowspan'; // Define el tipo de agrupación de filas, los valores válidos son "subheader" y "rowspan".
  rowHover?: boolean; // Define si se agrega efecto de desplazamiento a las filas sin necesidad de modo de selección. Tenga en cuenta que los elementos tr que se pueden desplazar deben tener la clase "p-selectable-row" para que rowHover funcione.
  rows?: number; // Establece el número de filas a mostrar por página. Propiedad similar a *rows* del **customPaginator**.
  rowSelectable?: any; // Establece una función para decidir si una fila es seleccionable. Necesidad de devolver el valor booleano event.data: datos de campo. event.index: Índice de datos.
  rowsPerPageOptions?: any[]; // Establece la matriz de valores enteros/objetos para mostrar dentro de las filas por página desplegable del paginador.
  rowTrackBy?: any; // Establece la función para optimizar las operaciones dom delegando a ngForTrackBy, el algoritmo predeterminado verifica la identidad del objeto.
  scrollable?: boolean; // Cuando se activa, habilita el scroll vertical y horizontal.
  scrollDirection?: 'vertical' | 'horizontal' | 'both'; // Orientación a la que se habilita el scroll.
  scrollHeight?: string; // Establece la altura de la vista de desplazamiento en píxeles fijos o la palabra clave "flex" para un tamaño dinámico.
  selectAll?: boolean | null; // Establece si todos los datos están seleccionados.
  selection?: any; // Establece una matriz con los datos seleccionados.
  selectionMode?: 'single' | 'multiple'; // Establece el tipo de selección que se puede realizar en la tabla
  selectionPageOnly?: boolean; // Cuando está habilitado con el paginador y el modo de selección de casillas de verificación, la casilla de verificación seleccionar "all" en el encabezado seleccionará todas las filas en la página actual.
  showInitialSortBadge?: boolean; // Establece si usar o no el distintivo de clasificación inicial.
  showLoader?: boolean; // Establece si mostrar la máscara de carga cuando se carga la propiedad es verdadero.
  sortField?: string; // Establece el nombre del campo para ordenar los datos por defecto.
  sortMode?: 'single' | 'multiple'; // Define si la clasificación funciona en una sola columna o en varias columnas.
  sortOrder?: number; // Ordena cuando la clasificación predeterminada está habilitada.
  stateKey?: string; // Establece el identificador único de una tabla con estado para usar en el almacenamiento de estado.
  stateStorage?: 'local' | 'session'; // Define dónde una tabla con estado mantiene su estado, los valores válidos son "session" para sessionStorage y "local" para localStorage.
  style?: any; // Establece el estilo en línea del componente.
  class?: string; // Establece una clase para los estilos personalizables.
  styleClass?: string; // Establece una clase para los estilos personalizables de la tabla.
  tableStyle?: any; // Establece el estilo en linea de la tabla.
  tableStyleClass?: string; // Establece una clase para los estilos personalizables de la tabla.
  value?: any[]; // Establece una matriz con los objetos a recorrer.
  virtualRowHeight?: number; // Establece la altura de una fila para usar en cálculos de desplazamiento virtual.
  virtualScroll?: boolean; // Establece si los datos deben cargarse a pedido durante el desplazamiento.
  virtualScrollDelay?: number; // Establece el umbral en milisegundos para retrasar la carga diferida durante el desplazamiento.
  headerSeparator?: boolean; // Establece si el header va a tener separador
  libTbReload?: () => void; // Función que actualiza propiedades de la tabla.
  libTbContextMenuSelectionChange?: (e?: any) => void; // Ejecuta una función cuando el contextMenu recibe un cambio
  libTbFirstChange?: (e?: any) => void; // Ejecuta una función cuando first row recibe un cambio
  libTbOnColReorder?: (e?: any) => void; // Ejecuta una función cuando se reordena una columna
  libTbOnColResize?: (e?: any) => void; // Ejecuta una función cuando se cambia el tamaño de una columna
  libTbOnContextMenuSelect?: (e?: any) => void; // Ejecuta una función cuando se elige una opción del contextMenu
  libTbOnEditCancel?: (e?: any) => void; // Ejecuta una función cuando la edición de celda se cancela con la tecla de escape
  libTbOnEditComplete?: (e?: any) => void; // Ejecuta una función cuando se ha completado la edición de la celda
  libTbOnEditInit?: (e?: any) => void; // Ejecuta una función cuando una celda cambia al modo de edición
  libTbOnFilter?: (e?: any) => void; // Ejecuta una función cuando se filtran los datos
  libTbOnHandleRowTouchEnd?: (e?: any) => void; // Ejecuta una función cuando finaliza el touch al handle row
  libTbOnHeaderCheckboxToggle?: (e?: any) => void; // Ejecuta una función cuando cambia el estado de la casilla de verificación del encabezado
  libTbOnLazyLoad?: (e?: any) => void; // Ejecuta una función cuando la paginación, la clasificación o el filtrado ocurren en modo diferido
  libTbOnPage?: (e?: any) => void; // Ejecuta una función cuando se produce la paginación
  libTbOnRowCollapse?: (e?: any) => void; // Ejecuta una función cuando se contrae una fila
  libTbOnRowDragEnd?: (e?: any) => void; // Ejecuta una función cuando finaliza el arrastre de una fila
  libTbOnRowDragLeave?: (e?: any) => void; // Ejecuta una función cuando se suelta el arrastre de una fila
  libTbOnRowExpand?: (e?: any) => void; // Ejecuta una función cuando se expande una fila
  libTbOnRowReorder?: (e?: any) => void; // Ejecuta una función cuando se reordena una fila
  libTbOnRowSelect?: (e?: any) => void; // Ejecuta una función cuando se selecciona una fila
  libTbOnRowUnselect?: (e?: any) => void; // Ejecuta una función cuando se deselecciona una fila
  libTbOnSort?: (e?: any) => void; // Ejecuta una función cuando se ordena una columna
  libTbOnStateRestore?: (e?: any) => void; // Ejecuta una función cuando se restaura el estado
  libTbOnStateSave?: (e?: any) => void; // Ejecuta una función cuando se guarda el estado
  libTbRowsChange?: (e?: any) => void; // Ejecuta una función cuando las filas cambian
  libTbSelectAllChange?: (e?: any) => void; // Ejecuta una función cuando cambia el seleccionar todos
  libTbSelectionChange?: (e?: any) => void; // Ejecuta una función cuando cambian los elementos seleccionados
  libTbSortFunction?: (e?: any) => void; // Establece una función para implementar la clasificación personalizada
}
```
