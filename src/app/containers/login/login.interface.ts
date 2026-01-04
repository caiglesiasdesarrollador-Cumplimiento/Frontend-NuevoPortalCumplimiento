// ✅ APLICANDO REGLA: Estructura para formularios dinámicos simples

export interface ILoginData {
  email: string;
  password: string;
}

export interface ILoginComponent {
  loginForm: any; // ILibTbDynamicForm será tipado en el componente
  btnSubmit: any; // ILibTbButton será tipado en el componente
  btnReset: any; // ILibTbButton será tipado en el componente

  // Métodos principales
  submitForm(): void;
  resetForm(): void;

  // Métodos auxiliares
  isFormValid: boolean;
  formData: ILoginData | null;

  // Navegación tras login exitoso
  navigateToDynamicForm(): void;
}
