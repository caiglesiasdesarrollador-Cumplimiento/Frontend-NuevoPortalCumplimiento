```typescript
import { ILibTbButton } from '../../atoms/button/button.interface';
import { ILibTbAlertMessage, ILibTbAlert } from '../../atoms/alert/alert.interface';
import { ILibTbUploadingFile } from '../../molecules/uploading-file/uploading-file.interface';
export interface ILibTbFileUploadField {
  dataQaId?: string; // Establece el atributo data-qa-id para el componente
  avaibleTypes?: string[]; // Establece los tipos de archivo disponibles
  multiple?: boolean; // Establece si se podrán agregar multiples archivos
  length?: number; // Establece la cantidad máxima de archivos que se pueden seleccionar
  maxSize?: number; // Establece el tamaño máximo de los archivos
  errorTitleLength?: string; // Establece el título en la alerta cuando el error es por cantidad de archivos. Propiedad: **length**
  errorTitleType?: string; // Establece el título en la alerta cuando el error es por tipo de archivo. Propiedad: **avaibleTypes**
  errorTitleMaxSize?: string; // Establece el título en la alerta cuando el error es por tamaño máximo de archivos. Propiedad: **maxSize**
  errorText?: { // Establece los mensajes de error para diferentes situaciones
    maxSize?: string; // Establece el mensaje de error cuando el archivo tiene un tamaño más grande que la propiedad maxSize
    isFileSelected?: string; // Establece el mensaje de error cuando el archivo se encuentra seleccionado, y la propiedad preventDuplicated esta activada
    length?: string; // Establece el mensaje de error cuando se han seleccionado más archivos de los permitidos en la propiedad length
    type?: string; // Establece el mensaje de error cuando se han seleccionado archivos que no cumplen con el tipo de archivo en la propiedad avaibleTypes
  };
  style?: Record<string, string | number>; // Establece los estilos que se desean aplicar formato: { propiedad: valor } ({ color: 'red' })
  class?: string; // Establece las clases que se desean agregar al componente, deben estar separadas por un espacio
  label?: string; // Establece el texto del label
  dragDropIcon?: string; // Establece el icono del drag and drop
  dragDropLabel?: string; // Establece el label del drag and drop
  caption?: string; // Establece el texto del caption
  customBtn?: ILibTbButton; // Establece la configuración para el botón de selección de archivos
  customAlertMessage?: ILibTbAlertMessage; // Establece la configuración para los mensajes de alerta
  customAlert?: ILibTbAlert; // Establece la configuración para las alertas
  customUploadingFile?: ILibTbUploadingFile; // Establece las propiedades que tendrá por defecto cada archivo seleccionado
  selectedFiles?: (ILibTbUploadingFile & { file: File })[]; // Arreglo de archivos que se han seleccionado
  libTbOnDragEnter?: (event: DragEvent) => void; // Ejecuta una función cuando un elemento entra en el area de selección
  libTbOnDragLeave?: (event: DragEvent) => void; // Ejecuta una función cuando un elemento sale del area de selección
  libTbOnDrop?: (event: DragEvent) => void; // Ejecuta una función cuando un elemento es agregado al area de selección
  libTbOnCatchFile?: (files: File[]) => void; // Ejecuta una función cuando se agregan archivos al componente
  libTbOnCancelFile?: (file: File) => void; // Ejecuta una función cuando se cancela un archivo del componente
  libTbOnDeleteFile?: (file: File) => void; // Ejecuta una función cuando se elimina un archivo del componente
  libTbOnReloadFile?: (file: ILibTbUploadingFile & { file: File }) => void; // Ejecuta una función cuando se elimina un archivo del componente
}
```
