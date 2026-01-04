```typescript
import { ILibTbButton } from '../../atoms/button/button.interface';
import { ILibTbIndicatorGallery } from '../../atoms/indicator-gallery/indicator-gallery.interface';
export interface ILibTbCarousel {
  items?: any[]; // Establece los items que tendrá el carousel
  visibleItems?: number; // Establece el número de items visibles
  scrollItems?: number; // Establece el número de items que se desplazará el carousel al cambiar de item
  infinite?: boolean; // Establece si el carousel debe ser infinito
  activeIndex?: number; // Establece el índice del item activo
  class?: string; // Establece las clases CSS que se desean agregar al carousel, deben estar separadas por un espacio
  showControls?: boolean; // Establece si se deben mostrar los botones de desplazamiento
  insetControls?: boolean; // Establece si se desean mostrar los botones de desplazamiento dentro de carousel
  showIndicators?: boolean; // Establece si se desean mostrar los indicadores
  insetIndicators?: boolean; // Establece si se desean mostrar los indicadores dentro de carousel
  autoplayInterval?: number; // Establece el intervalo de tiempo para una reproducción automática
  buttonPrev?: Omit<ILibTbButton, 'libTbClick'>; // Establece las propiedades del botón de retroceder
  buttonNext?: Omit<ILibTbButton, 'libTbClick'>; // Establece las propiedades del botón de avanzar
  libTbIndicatorGallery?: Omit<ILibTbIndicatorGallery, 'items' | 'activeIndex'>; // Establece algunas propiedades para el indicator gallery del carousel
  responsiveOptions?: { // Establece las opciones para la adaptación a diferentes tamaños de dispositivos
    breakpoint: number; // Número en pixeles del punto de quiebre
    visibleItems: number; // Número de items visibles
    scrollItems: number; // Número de items que se desplazarán
  }[];
}
```
