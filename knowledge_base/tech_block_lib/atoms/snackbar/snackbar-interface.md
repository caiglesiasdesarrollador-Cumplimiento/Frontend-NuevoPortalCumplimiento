```typescript
import { ILibTbButton } from '../button/button.interface';
export interface ILibTbSnackbar {
  message?: string; // Establece el texto del snackbar
  libTbButton?: ILibTbButton; // Establece las propiedades del botón que se mostrará en el snackbar
  position?: // Establece la posición donde se debe mostrar el snackbar
    | 'top-right'
    | 'top-left'
    | 'bottom-left'
    | 'bottom-right'
    | 'top-center'
    | 'bottom-center'
    | 'center';
  orientation?: 'horizontal' | 'vertical'; // Establece la orientación del snackbar (Por defecto: horizontal)
  show?: boolean; // Muestra u oculta el snackbar
  life?: number; // Establece el tiempo en ms que tardará el snackbar en desaparecer. Si no se establece, el snackbar no desaparecerá
  autoZIndex?: boolean; // Establece si el valor z-index del snackbar debe ser automático (Por defecto: true)
  baseZIndex?: number; // Establece el valor base del z-index para el snackbar (Por defecto: 0)
  showTransitionOptions?: string; // Establece las opciones de transición cuando se muestra el snackbar (Por defecto: 300ms ease-out)
  hideTransitionOptions?: string; // Establece las opciones de transición cuando se oculta el snackbar (Por defecto: 250ms ease-in)
  showTransformOptions?: string; // Establece las opciones de transformación cuando se muestra el snackbar (Por defecto: translateY(100%))
  hideTransformOptions?: string; // Establece las opciones de transformación cuando se oculta el snackbar (Por defecto: translateY(-100%))
  style?: Record<string, string | number>; // Establece los estilos que se desean aplicar formato: { propiedad: valor } ({ color: 'red' })
  class?: string; // Establece las clases que se desean agregar al snackbar, deben estar separadas por un espacio
}
```
