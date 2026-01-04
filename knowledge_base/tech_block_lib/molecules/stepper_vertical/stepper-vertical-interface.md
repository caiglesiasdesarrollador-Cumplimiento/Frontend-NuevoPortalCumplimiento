```typescript
export interface ILibTbStepperVertical {
  activeIndex?: number; // Establece el índice del step que debe estar activo por defecto
  type?: 'number' | 'icon' | 'mix'; // Establece el tipo de stepper que se desea
  class?: string; // Establece las clases que se desean agregar al componente, deben estar separadas por un espacio
}
export interface ILibTbStep {
  dataQaId?: string; // Establece el atributo data-qa-id para el componente
  title?: string; // Establece el título del step
  icon?: string; // Establece el icono que se desea mostrar en el step
  iconCheck?: string; // Establece el icono que se desea mostrar cuando el step esta en view
  class?: string; // Establece las clases que se desean agregar al componente, deben estar separadas por un espacio
  disabled?: boolean; // Establece si se desea deshabilitar el step
  view?: boolean; // Establece si se desea marcar el step en estado view (visto, visitado, finalizado)
}
```
