```typescript
type styleBtn = 'fill' | 'stroke' | 'text';
type typeBtn = 'primary' | 'secondary' | 'tertiary' | 'error';
export interface ILibTbMap {
  options?: any; // Establece la configuracion del api de Google Maps
  overlays?: any[]; // Una lista con las superposiciones para mostrar
  style?: Record<string, string>; // Establece los estilos a usar en el componente
  class?: string; // Indica la clase que se le asignará al componente
  tabsMap?: boolean; // Establece si el mapa va a tener los tabs superiores
  fullScreenButton?: boolean; // Establece si el mapa va a tener botón de pantalla completa
  streetButton?: boolean; // Establece si el mapa va a tener botón de street
  centerButton?: boolean; // Establece si el mapa va a tener botón de centrar
  zoomButtons?: boolean; // Establece si el mapa va a tener botones de zoom
  streetViewPosition?: any; // Establece la posición para el streetView
  streetViewPov?: any; // Establece el pov para el streetView
  styleBtn?: { // Establece los estilos de los botones
    fullScreenBtn?: styleBtn; // Establece el estilo del botón de pantalla completa
    streetBtn?: styleBtn; // Establece el estilo del botón de street
    centerBtn?: styleBtn; // Establece el estilo del botón de centro
    zoomInBtn?: styleBtn; // Establece el estilo del botón de zoomIn
    zoomOutBtn?: styleBtn; // Establece el estilo del botón de zoomOut
  };
  typeBtn?: { // Establece los tipos de los botones
    fullScreenBtn?: typeBtn; // Establece el tipo del botón de pantalla completa
    streetBtn?: typeBtn; // Establece el tipo del botón de street
    centerBtn?: typeBtn; // Establece el tipo del botón de centrar
    zoomInBtn?: typeBtn; // Establece el tipo del botón de zoomIn
    zoomOutBtn?: typeBtn; // Establece el tipo del botón de zoomOut
  };
  iconBtn?: { // Establece los iconos de los botones
    fullScreenBtn?: string; // Establece el icono del botón de panalla completa
    streetBtn?: string; // Establece el icono del botón de street
    centerBtn?: string; // Establece el icono del botón de centrar
    zoomInBtn?: string; // Establece el icono del botón de zoomIn
    zoomOutBtn?: string; // Establece el icono del botón de zoomOut
  };
  customMap?: boolean; // Establece si no se quiere usar los estilos base
  libTbOnMapClick?: (e: any) => void; // Ejecuta una función cuando se da click sobre el mapa, a exepcion de los marcadores.
  libTbOnMapDragEnd?: () => void; // Ejecuta una función cuando finaliza el drag sobre el mapa.
  libTbOnMapReady?: (e: any) => void; // Ejecuta una función cuando el mapa está listo para ser usado.
  libTbOnOverlayClick?: (e: any) => void; // Ejecuta una función cuando es clickeado una superposición.
  libTbOnOverlayDblClick?: (e: any) => void; // Ejecuta una función cuando es doblemente clickeada una superposición.
  libTbOnOverlayDrag?: (e: any) => void; // Ejecuta una función cuando un overlay es arrastrado.
  libTbOnOverlayDragEnd?: (e: any) => void; // Ejecuta una función cuando un overlay deja de ser arrastrado.
  libTbOnOverlayDragStart?: (e: any) => void; // Ejecuta una función cuando un overlay comienza a ser arrastrado.
  libTbOnZoomChanged?: () => void; // Ejecuta una función cuando el zoom es cambiado.
  libTbOnZoomInClick?: () => void; // Ejecuta una función cuando el zoom es aumentado por el botón.
  libTbOnZoomOutClick?: () => void; // Ejecuta una función cuando el zoom es disminuido por el botón.
  libTbOnCenterClick?: () => void; // Ejecuta una función cuando el mapa es centrado por el botón.
  libTbOnStreetClick?: () => void; // Ejecuta una función cuando se pasa a modo street view por el botón.
  libTbOnFullScreenClick?: () => void; // Ejecuta una función cuando se abre el modo de pantalla completa por el botón.
  libTbOnMapTabClick?: () => void; // Ejecuta una función cuando es seleccionado el tab del mapa.
  libTbOnSatelliteTabClick?: () => void; // Ejecuta una función cuando es seleccionado el tap del satelite.
}
```
