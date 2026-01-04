/**
 * Interfaces para el componente FakeLogin
 * Simulación de ingreso IDM para ambientes Dev/Stage
 */

/**
 * Datos del formulario de Fake Login
 * Basado en los parámetros del IDM de Seguros Bolívar
 */
export interface IFakeLoginData {
  /** EMPLOYEE TYPE - Tipo de documento (CC, NT, CE, PP, PE) */
  employeeType: string;
  
  /** USER NAME - Número de documento del usuario */
  userName: string;
  
  /** FULL NAME - Nombre o razón social del usuario */
  fullName: string;
  
  /** SB CODE ACT BENEF - Tipo de usuario (48=Administrativo, 2=Intermediario) */
  sbCodeActBenef: string;
  
  /** USR SUB TIPO - Tipo de nómina */
  usrSubTipo: string;
  
  /** WORK FORCE ID - Clave de intermediación */
  workForceId: string;
  
  /** EMAIL - Correo electrónico */
  email: string;
  
  /** USR LOCATION CODE - Código de la localidad */
  usrLocationCode: string;
  
  /** COMPANY - Código de la compañía Seguros Bolívar */
  company: string;
  
  /** JOB_CODE - Código del cargo */
  jobCode: string;
  
  /** COUNTRY - País */
  country: string;
}

/**
 * Datos de sesión almacenados tras el login
 */
export interface IFakeLoginSession extends IFakeLoginData {
  /** Tipo de usuario (intermediario o administrativo) */
  tipoUsuario: 'intermediario' | 'administrativo';
  
  /** Timestamp de la sesión */
  timestamp: string;
  
  /** Estado de autenticación */
  isAuthenticated: boolean;
}

/**
 * Estructura de datos para Redis - Usuario
 */
export interface IRedisUsuario {
  tipo_doc_usuario: string;
  nro_doc_usuario: string;
  nombre_razon_social: string;
  codigo_empleado: string;
  codigo_tipo_vinculacion?: string;
  desc_tipo_vinculacion?: string;
  codigo_tipo_nomina: string;
  desc_tipo_nomina?: string;
  codigo_cargo_esp: string;
  desc_cargo_esp?: string;
  codigo_empresa_bolivar: string;
  rzon_empresa_bolivar?: string;
  tipo_doc_empresa_inter?: string;
  nro_doc_empresa_inter?: string;
  rzon_soc_empresa_inter?: string;
  codigo_ctro_costos: string;
  des_ctro_costos?: string;
  codigo_designacion?: string;
  desc_designacion?: string;
  tipo_usuario: 'E' | 'A'; // E = Empleado, A = Agente/Intermediario
  marca_mostrar_clave: 'S' | 'N';
  email: string;
}

/**
 * Estructura de datos para Redis - Claves
 */
export interface IRedisUsuarioClaves {
  nro_doc_usuario: string;
  clave: string;
  tipo_documento: string;
  nro_documento: string;
  nombre_razon_social: string;
  codigo_ctro_costos: string;
  des_ctro_costos?: string;
  marca_clave_directa?: 'S' | 'N';
  marca_clave_ppal?: 'S' | 'N';
  marca_clave_activa: 'S' | 'N';
}

/**
 * Opciones de tipo de documento
 */
export interface ITipoDocumentoOption {
  value: string;
  label: string;
}

/**
 * Opciones de tipo de usuario
 */
export interface ITipoUsuarioOption {
  value: string;
  label: string;
}

/**
 * Opciones de tipo de nómina
 */
export interface ITipoNominaOption {
  value: string;
  label: string;
}

