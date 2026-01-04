```typescript
export interface ILibTbBanner {
  dataQaId?: string; // Establece el atributo data-qa-id para el componente
  class?: string; // Establece las clases que se desean agregar al componente, deben estar separadas por un espacio
  showFooter?: boolean; // Establece si debe mostrar el footer
  images?: { // Establece las url de las imagenes que se usaran de fondo
    image?: string;
    imageTablet?: string;
    imageMobile?: string;
  };
  horizontalAlign?: 'left' | 'center' | 'right'; // Establece la alineacion horizontal de la tarjeta
  verticalAlign?: 'top' | 'center' | 'bottom'; // Establece la alineacion vertical de la tarjeta
  title?: string; // Establece el titulo de la tarjeta
  content?: string; // Establece el contenido de la tarjeta
  showGradient?: boolean; // Establece si se muestra o no el gradiente
  maxTitleCharacters?: number; // Establece el número máximo de caracteres para el título
  maxContentCharacters?: number; // Establece el número máximo de caracteres para el título
}
```
