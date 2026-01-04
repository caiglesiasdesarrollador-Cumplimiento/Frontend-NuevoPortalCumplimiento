```typescript
import { ILibTbButton } from '../../atoms/button/button.interface';
import { ILibTbIndicatorGallery } from '../../atoms/indicator-gallery/indicator-gallery.interface';
export interface ILibTbOnboardingStep {
  selector?: string; // Establece el selector (CSS) para el elemento que desea enmarcar, valido solo para el tipo de onboarding 'guide'. Si un elemento no es encontrado mediante el selector, se omite.
  title?: string; // Establece el título del paso
  description?: string; // Establece la descripción del paso
  position?: 'top' | 'bottom' | 'left' | 'right'; // Establece la posición en la que se mostrará el paso al enmarcar un elemento, valido solo para el tipo de onboarding 'guide'
  button?: ILibTbButton; // Establece las propiedades del botón para el "call to action"
  img?: { // Establece las propiedades de la imagen que se desea mostrar en el paso
    src: string; // Establece la url de la imagen
    alt?: string; // Establece el atributo alt de la imagen
    defaultWidth?: number; // Establece el ancho por defecto de la imagen
    defaultHeight?: number; // Establece el alto por defecto de la imagen
  };
  video?: { // Establece las propiedades del video que se desea mostrar en el paso
    src: { // Establece el source del video, puede enviar multiples links y formatos
      link: string; // Link o src del video a mostrar
      format?: string; // Formato del video
    }[];
    poster?: string; // Establece el poster o portada que tendrá el video cuando se cargue
    controls?: boolean; // Establece si desea mostrar los controles de reproducción
    loop?: boolean; // Establce si se desea un video en ciclo
    muted?: boolean; // Establece si desea tener el video silenciado
    preload?: 'none' | 'metadata' | 'auto'; // Estableece el tipo de pre-carga para el video
  };
}
export interface ILibTbOnboarding {
  steps?: ILibTbOnboardingStep[]; // Establece los pasos a tener en cuenta el onboarding
  buttonClose?: Omit<ILibTbButton, 'libTbClick'>; // Establece las propiedades del botón de cerrar
  buttonPrev?: Omit<ILibTbButton, 'libTbClick'>; // Establece las propiedades del botón de retroceder un paso
  buttonNext?: Omit<ILibTbButton, 'libTbClick'>; // Establece las propiedades del botón de avanzar un paso
  buttonEnd?: Omit<ILibTbButton, 'libTbClick'>; // Establece las propiedades del botón cuando se llega al paso final
  leitmotiv?: boolean; // Establce si se desea mostrar el leitmotiv en el tipo de onboarding 'welcome'
  type?: 'welcome' | 'guide'; // Establece el tipo de onboarding que se mostrará
  class?: string; // Establece las clases CSS que se desean agregar al componente, deben estar separadas por un espacio
  libTbIndicatorGallery?: Omit<ILibTbIndicatorGallery, 'items' | 'activeIndex'>; // Establece algunas propiedades para el indicator gallery del onboarding
}
```
