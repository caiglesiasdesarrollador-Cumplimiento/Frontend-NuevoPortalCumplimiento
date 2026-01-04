```typescript
import { MenuItem } from 'primeng/api';
export interface ILibTbContextMenu {
  dataQaId?: string; // Establece el atributo data-qa-id para el componente
  model?: MenuItem[]; // Establece el arreglo que contiene las opciones que despliega el context-menu
  global?: boolean; // Establece si el context-menu es global o no
  style?: Record<string, string | number>; // Establece los estilos que se desean aplicar Formato: { propiedad: valor } Ejemplo: { color: 'red' }
  class?: string; // Establece las clases que se desean agrgar a la opción de menú
  baseZIndex?: number; // Establece el BaseZIndex para usarlo en el layout
  autoZIndex?: boolean; // Establece si el Zindex se maneja automaticamente
  triggerEvent?: string; // Establece el evento por el cual el context-menu es ejecutado
}
```
