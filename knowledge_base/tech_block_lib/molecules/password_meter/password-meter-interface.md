```typescript
// Las propiedades ngModel y formGroup de ILibTbPasswordMeter no son compatibles.
// Si se envían las dos propiedades, formGroup tendrá la relevancia.
type InputTextProperties = Omit<ILibTbInputText, 'type' | 'autocomplete'>; // Propiedades disponibles para el ILibTbInputText en ILibTbPasswordMeter
export interface ILibTbPasswordMeter extends InputTextProperties {
  iconHide?: string; // Establece el icono para ocultar la contraseña
  iconShow?: string; // Establece el icono para mostrar la contraseña
  iconError?: string; // Establece el icono que se mostrará en el tooltip cuando la regla NO se cumpla
  iconCheck?: string; // Establece el icono que se mostrará en el tooltip cuando se cumpla la regla
  classContainer?: string; // Establece las clases que se desean agregar al componente, deben estar separadas por un espacio
  styleContainer?: Record<string, string | number>; // Establece los estilos que se desean aplicar formato: { propiedad: valor } ({ color: 'red' })
  descriptionMeter?: string; // Establece el texto que se mostrará como descripción
  weakLabel?: string; // Establece el texto que se mostrará cuando la seguridad de la contraseña sea baja
  mediumLabel?: string; // Establece el texto que se mostrará cuando la seguridad de la contraseña sea media
  strongLabel?: string; // Establece el texto que se mostrará cuando la seguridad de la contraseña sea alta
  rules?: { // Define las reglas que debe seguir la contraseña para medir su seguridad
    pattern: string;
    description: string;
  }[];
  passwordMeter?: number; // Retorna el indicativo de seguridad para la contraseña 1 = bajo, 2 = medio y 3 = alto (Esta propiedad no debe ser seteada)
  disabledMeter?: boolean; // Establece si el medidor de contraseña debe estar deshabilitado
  libTbPasswordMeterChange?: (passwordMeter: number) => void; // Ejecuta una función cuando el valor del indicativo de seguridad cambia
}
```
