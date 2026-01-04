```typescript
export interface ILibTbValidatorConfig {
  name: string; // Establece el nombre del validador
  message: string; // Establece el mensaje que se va a mostrar para esta validación
  validator: ValidatorFn; // Establece el validador para el **FormControl**
}
export interface ILibTbFormGroupProps {
  value?: any; // Establece el valor por defecto que debe tener el **FormControl**
  disabled?: boolean; // Establece si el **FormControl** debe estar **deshabilitado** o no al inicizalizarse el formulario
  /* Función que evalúa una condición para determinar si el **FormControl** debe estar deshabilitado. Esta función recibe el FormGroup del formulario como argumento y debe devolver un booleano. Si devuelve true, el FormControl se deshabilita; si devuelve false, el FormControl se habilita.*/
  disableCondition?: (form: FormGroup) => boolean;
  // Establece un arreglo de validaciones para el **FormControl** con las propiedades de un **ILibTbValidatorConfig**
  validators?: ILibTbValidatorConfig[];
}
export type ILibTbDynamicFormConfigType =
  | ILibTbDynamicFormConfig<'button'>
  | ILibTbDynamicFormConfig<'input'>
  | ILibTbDynamicFormConfig<'number'>
  | ILibTbDynamicFormConfig<'textarea'>
  | ILibTbDynamicFormConfig<'checkbox'>
  | ILibTbDynamicFormConfig<'radio'>
  | ILibTbDynamicFormConfig<'dropdown'>
  | ILibTbDynamicFormConfig<'dropdown-multiple'>
  | ILibTbDynamicFormConfig<'calendar'>
  | ILibTbDynamicFormConfig<'switch'>
  | ILibTbDynamicFormConfig<'slider'>
  | ILibTbDynamicFormConfig<'password-meter'>;
export type LibTbTbType =
  | 'button'
  | 'input'
  | 'number'
  | 'textarea'
  | 'checkbox'
  | 'radio'
  | 'dropdown'
  | 'dropdown-multiple'
  | 'calendar'
  | 'switch'
  | 'slider'
  | 'password-meter';
export type ILibTbCustom<T extends LibTbTbType> = T extends 'button'
  ? ILibTbButton
  : T extends 'input'
  ? ILibTbInputText
  : T extends 'number'
  ? ILibTbInputNumber
  : T extends 'textarea'
  ? ILibTbInputTextArea
  : T extends 'checkbox'
  ? ILibTbCheckbox
  : T extends 'radio'
  ? ILibTbRadioButton
  : T extends 'dropdown'
  ? ILibTbDropdown
  : T extends 'dropdown-multiple'
  ? ILibTbDropdownMultiSelect
  : T extends 'calendar'
  ? ILibTbCalendar
  : T extends 'switch'
  ? ILibTbSwitch
  : T extends 'slider'
  ? ILibTbSlider
  : T extends 'password-meter'
  ? ILibTbPasswordMeter
  : never;
export type ILibTbDynamicFormConfig<T extends LibTbTbType> = {
  tbType?: T; // Establece el tipo de componente Techblock que se desea usar para el formulario
  /* Establece si el elemento debe estar visible o no. Por defecto es true.
     Esto ocultará el elemento visualmente y deshabilitará el FormControl del formulario */
  visible?: boolean;
  /* Función que evalúa una condición para determinar si el elemento debe ser visible.
   Esta función recibe el FormGroup del formulario como argumento y debe devolver un booleano.
   Si devuelve true, el elemento será visible; si devuelve false, el elemento será oculto.
   Útil para implementar lógica de visibilidad dinámica basada en el estado o valor del formulario.*/
  visibilityCondition?: (form: FormGroup) => boolean;
  /* Establece el nombre del template que se desea usar dentro del componente
   Se debe usar la nomenclatura (id:template). Ejemplos: 'checkbox:label', 'dropdown:item'.
   'id' puede ser un texto personalizado.
   'template' debe ser el nombre del template a renderizar en el componente */
  template?: string | string[];
  custom?: ILibTbCustom<T>; // Establece las propiedades **custom** del componente establecido en la propiedad anterior
  containerId?: string; // Establece el id del contenedor al que se desea agregar el control
  component?: Type<any>; // Si se desea agregar un **componente** al formulario, se debe establecer esta propiedad y omitir las demás
  componentInputs?: Record<string, any>; // Establece las propiedades @Input() en el componente a utilizar en la propiedad **component**
  componentOutputs?: Record<string, any>; // Establece las propiedades @Output() en el componente a utilizar en la propiedad **component**
  htmlContent?: string; // Si se desea agregar un contenido HTML, se debe establecer esta propiedad y omitir las demás
  formProps?: ILibTbFormGroupProps; // Establece las propiedades de un **ILibTbFormGroupProps**
  classContainer?: string; // Establece las clases CSS que se desean agregar al contenedor del componente.
  formId?: string; // Identificador único para cada configuración, una vez se establece no debe cambiarse. Si no se asigna, se establecerá un valor por defecto.
};
export type ILibTbDynamicFormContainer = {
  id: string; // Establece el identificador del contenedor. Esta propiedad se debe usar en las configuraciones en su propiedad **containerId**
  tagName?: string; // Establece el nombre del tag, que desea usar para crear el contenedor. Ejemplo: div, section, fieldset, etc
  class?: string; // Establece las clases CSS que se desean agregar al contenedor, deben estar separadas por un espacio
  style?: Record<string, string | number>; // Establece los estilos que se desean aplicar al contenedor. Formato: { propiedad: valor } ({ color: 'red' })
  /* Establece si el contenedor debe estar visible o no. Por defecto es true.
   Esto ocultará/mostrará y habilitará/deshabilitará todos los controles del formulario que pertenezcan a este contenedor */
  visible?: boolean;
  /* Función que evalúa una condición para determinar si el contenedor debe ser visible.
   Esta función recibe el FormGroup del formulario como argumento y debe devolver un booleano.
   Si devuelve true, el elemento será visible; si devuelve false, el elemento será oculto.
   Útil para implementar lógica de visibilidad dinámica basada en el estado o valor del formulario.*/
  visibilityCondition?: (form: FormGroup) => boolean;
};
export type ILibTbDynamicForm = {
  /* Retorna el formulario (**FormGroup**), es recomendable que esta propiedad NO se configure y se deje vacia, pues en ella se seteará automáticamente el formGroup */
  form?: FormGroup;
  validateOnSubmit?: boolean; // Cuando se haga submit del formulario, se realizará la validación de todos los campos (Esto según los validators de cada control)
  validateSuccess?: boolean; // Cuando el formControl no infringe los validators de cada configuración, se establecerá el componente en estado success
  config?: ILibTbDynamicFormConfigType[]; // Establece un arreglo con las propiedades de un **ILibTbDynamicFormConfig**
  configContainers?: ILibTbDynamicFormContainer[]; // Establece un arreglo con las propiedades de un **ILibTbDynamicFormContainer**
  class?: string; // Establece las clases CSS que se desean agregar al formulario, deben estar separadas por un espacio
  libTbInitialized?: (form: FormGroup) => void; // Ejecuta una función cuando el formulario se inicializa completamente
  libTbUpdated?: (form: FormGroup) => void; // Ejecuta una función cuando el formulario se inicializa o se actualiza completamente (creación o eliminación de controles)
  libTbSubmit?: (form: FormGroup) => void; // Ejecuta una función cuando se hace submit del formulario
  libTbCallSubmit?: () => void; // Ejecuta el submit del formulario. **NO** setear, solo ejecutar de la siguiente forma: custom.libTbCallSubmit();
};
```
