```typescript
import { ILibTbButton } from '../../atoms/button/button.interface';
export interface ILibTbUploadingFile {
  dataQaId?: string; // Establece el data-id para el componente
  style?: Record<string, string>; // Establece los estilos a usar en el componente
  class?: string; // Indica la clase que se le asignará al componente
  fileName?: string; // Establece el nombre del archivo
  size?: number; // Establece el tamaño del archivo
  iconCaption?: { // Establece los distintos iconos que afectan en el componente
    uploadingIcon?: string; // Establece el icono de archivo cargando
    successIcon?: string; // Establece el icono de archivo guardando
    uploadedIcon?: string; // Establece el icono del archivo subido
    errorIcon?: string; // Establece el icono de que ha ocurrido un error
  };
  minIconCaption?: { // Establece los iconos que acompañaran al progress label
    uploadingMinIcon?: string; // Establece el icono miniatura para el estado uploading
    uploadedMinIcon?: string; // Establece el icono miniatura al subir archivo.
    successMinIcon?: string; // Establece el icono miniatura para el estado success
    errorMinIcon?: string; // Establece el icono miniatura para el estado error
  };
  textCaption?: { // Establece los diferentes textos disponibles para el avance del progreso
    uploading?: string; // Establece el texto para cuando esté cargando el archivo
    uploaded?: string; // Estabece el texto para cuando el archivo se haya cargado
    error?: string; // Establece el texto para cuando ocurre un error
  };
  haveError?: boolean; // Indica si existe un error con el archivo
  progress?: number; // Establece el porcentaje de progreso de la barra
  libTbReloadBtn?: ILibTbButton; // Establece el custom para el botón reload
  libTbCancelBtn?: ILibTbButton; // Establece el custom para el botón cancel
  libTbDeleteBtn?: ILibTbButton; // Establece el custom para el botón delete
  libTbOnCancel?: (c: ILibTbUploadingFile) => void; // Ejecuta una función cuando se oprime sobre el botón cancelar
  libTbOnDelete?: (c: ILibTbUploadingFile) => void; // Ejecuta una función cuando se oprime sobre el botón eliminar
  libTbOnReload?: (c: ILibTbUploadingFile) => void; // Ejecuta una función cuando se oprime sobre el botón de recargar archivo
}
```
