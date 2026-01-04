```typescript
export interface ILibTbPaginatorPageChange {
  page: number;
  first: number;
  rows: number;
  pageCount: number;
}
export interface ILibTbPaginator {
  dataQaId?: string; // Establece el atributo data-qa-id para el componente
  totalRecords?: number; // Establece el número total de elementos
  rows?: number; // Establece el número de elementos disponibles por página
  first?: number; // Establece el index del elemento que se desea mostrar por defecto, relativo desde 0
  pageLinkSize?: number; // Establece el número de paginadores que se mostrarán
  rowsPerPageOptions?: any[]; // Establece las opciones disponibles para ajustar el paginador
  style?: Record<string, string | number>; // Establece los estilos que se desean aplicar al paginador - formato: { propiedad: valor } ({ color: 'red' })
  class?: string; // Establece las clases que se desean agregar al paginador, deben estar separadas por un espacio
  alwaysShow?: boolean; // Establece si el paginador debe mostrarse siempre, incluso cuando solo hay una página
  showFirstLastIcon?: boolean; // Establece si se debe mostrar el botón para ir a la primera o última página
  styleBtnPaginator?: 'fill' | 'stroke' | 'text'; // Establece el estilo de visualización del botón
  typeBtnPaginator?: 'primary' | 'secondary' | 'tertiary' | 'error'; // Establece el estilo de visualización del botón
  showJumpToPageDropdown?: boolean; // Establece si dentro del paginador, se debe mostrar un dropdown para cambiar de página
  showPageLinks?: boolean; // Establece si se deben mostrar los botones para cambiar de página
  complementaryText?: boolean; // Establece si el paginator tendrá texto complementario
  dropdownIcon?: string; // Establece el icono del dropdown
  dropdownAppendTo?: 'body' | HTMLElement; // Establece el elemento al cual se agregará el panel del dropdown, los valores válidos son "body" o una refencia a un elemento
  dropdownScrollHeight?: string; // Establece la altura máxima del dropdown
  /**
   * currentPageReportTemplate: Establece el template para mostrar el reporte de la página actual por defecto: '{currentPage} de {totalPages}'
   * Posibles valores:
   * {currentPage} -> Página actual,
   * {totalPages} -> Total de páginas,
   * {first} -> Primer registro de la página,
   * {last} -> Último registro de la página,
   * {rows} -> Número de registros por página,
   * {totalRecords} -> Total de registros
   */
  currentPageReportTemplate?: string;
  /**
   * complementaryTextTemplate: Establece el template del texto complementario, por defecto: 'Mostrando {first} a {last} registros de {totalRecords}'
   * Posibles valores:
   * {currentPage} -> Página actual,
   * {totalPages} -> Total de páginas,
   * {first} -> Primer registro de la página,
   * {last} -> Último registro de la página,
   * {rows} -> Número de registros por página,
   * {totalRecords} -> Total de registros
   */
  complementaryTextTemplate?: string;
  templateLeft?: TemplateRef<unknown>; // Establece el template para mostrar la parte izquierda del paginador
  templateRight?: TemplateRef<unknown>; // Establece el template para mostrar la parte derecha del paginador
  libTbOnPageChange?: (e: ILibTbPaginatorPageChange) => void; // Ejecuta una función cuando se cambia de página
}
```
