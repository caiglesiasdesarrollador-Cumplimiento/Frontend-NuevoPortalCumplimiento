```typescript
import { ILibTbEmptyMessage } from '../empty-message';
// Las propiedades ngModel y formGroup de ILibTbListbox no son compatibles.
// Si se envían las dos propiedades, formGroup tendrá la relevancia.
export interface ILibTbListbox {
  dataQaId?: string; // Establece el atributo data-qa-id para el componente
  ariaFilterLabel?: string; // Establece el aria-label para el input de texto en el filtro
  checkbox?: boolean; // Establece si se desea mostrar un checkbox para las opciones
  class?: string; // Establece las clases que se desean agregar al componente, deben estar separadas por un espacio
  dataKey?: string; // Establece el nombre de la propiedad que se debe tener en cuenta para identificar una opción
  disabled?: boolean; // Establece si se debe deshabilitar el listbox y no permite seleccionar opciones
  filter?: boolean; // Establece si se debe mostrar el filtro para las opciones
  filterPlaceholder?: string; // Establece el placeholder que debe llevar el filtro
  filterValue?: string; // Establece el nombre de la propiedad que se debe tener en cuenta para realizar el filtrado
  group?: boolean; // Establece si las opciones del listbox se encuentran agrupadas
  listStyle?: Record<string, string | number>; // Establece los estilos que se desean aplicar a la lista de opciones. Formato: { propiedad: valor } ({ color: 'red' })
  listClass?: string; // Establece las clases que se desean agregar a la lista de opciones, deben estar separadas por un espacio
  multiple?: boolean; // Establece si se pueden seleccionar multiples opciones
  optionDisabled?: string; // Establece el nombre de la propiedad que se debe tener en cuenta para mostrar una opcion como deshabilitada
  optionGroupChildren?: string; // Establece el nombre de la propiedad que contiene las opciones dentro de la agrupación
  optionGroupLabel?: string; // Establece el nombre de la propiedad que se debe mostrar como título del grupo de opciones
  optionLabel?: string; // Establece el nombre de la propiedad que se debe mostrar como opción
  options?: any[]; // Establece las opciones que deben estar disponibles para seleccionar
  optionValue?: string; // Establece el nombre de la propiedad que se va a retornar cuando se seleccione una opción
  readonly?: boolean; // Establece el componente en modo lectura
  showToggleAll?: boolean; // Establece si se debe mostrar la opción para seleccionar o deseleccionar todas las opciones
  style?: Record<string, string | number>; // Establece los estilos que se desean aplicar formato: { propiedad: valor } ({ color: 'red' })
  ngModel?: any; // Establece/retorna el valor de la(s) opción(es) que se encuentra(n) seleccionada(s)
  semantic?: boolean; // Establece si se debe mostrar en forma semantic
  formGroup?: FormGroup; // Establece a que formulario pertenece
  name?: string; // Establece el nombre del formControlName
  error?: boolean; // Establece el estado de error
  emptyMessage?: ILibTbEmptyMessage; // Establece las propiedades del mensaje cuando no hay resultados
  libTbOnFilter?: (e?: { filterValue: string; filteredOptions: any[] }) => void; // Ejecuta una función cuando se filtran las opciones
  libTbOnClick?: (e: any) => void; // Ejecuta una función cuando se hace click en el componente
  libTbOnChange?: (e: any) => void; // Ejecuta una función cuando el valor del componente cambia
  libTbOnDblClick?: (e: any) => void; // Ejecuta una función cuando se hace doble click en el componente
}
```
