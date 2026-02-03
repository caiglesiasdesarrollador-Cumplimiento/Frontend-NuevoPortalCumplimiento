/**
 * ✅ INTERFACES: Servicios de Comunes
 * Definiciones de tipos para servicios de Comunes según documentación de microservicios
 */

// ========================================
// COMUNES_001 - Catalogos
// ========================================

export interface ICatalogoRequest {
  ip_Codigolista: string; // Ej: 'TIPOS_CONTRATO_CU', 'DEPARTAMENTOS_CIUDAD', 'MODALIDAD_REASEGUROS', 'TIPO_GARANTIA'
  ip_Codigo?: string;
  ip_Codigodepende?: string;
  ip_Like?: string;
  ip_Validacion?: string | null;
}

export interface ICatalogoItem {
  codigo: string;
  descripcion: string;
  codigoDepende?: string;
  activo?: boolean;
  orden?: number;
}

export interface ICatalogoResponse {
  lista: ICatalogoItem[];
  totalRegistros?: number;
}

// ========================================
// COMUNES_002 - Tercero Consultable
// ========================================

export interface ITerceroConsultableRequest {
  pTipoDocumento: string; // CC, NT, CE, PP, PE
  pNumeroDocumento: string;
  pCodCia: string; // '3'
  pCodSecc: string; // '66' o '4'
  pCodProducto: string; // '778' o '440'
  pCodUsr: string;
  pSistemaOrigen: string; // '100' o '196'
  pInfo1?: string; // 'N' o ''
  pInfo2?: string; // '1' o ''
  pInfo3?: string; // 'N' o ''
}

export interface ITerceroConsultableResponse {
  esConsultable: boolean;
  motivo?: string;
  fechaConsulta?: string;
}

// ========================================
// COMUNES_003 - Terceros Jurídicos
// ========================================

export interface ITerceroJuridicoRequest {
  tipoDocumento: string; // NT
  numeroDocumento: string;
}

export interface ITerceroJuridicoResponse {
  tipoDocumento: string;
  numeroDocumento: string;
  razonSocial: string;
  digitoVerificacion?: string;
  direccion?: string;
  telefono?: string;
  email?: string;
  ciudad?: string;
  departamento?: string;
  actividadEconomica?: string;
  fechaConstitucion?: string;
  estado?: string;
}

// ========================================
// COMUNES_004 - Terceros Naturales
// ========================================

export interface ITerceroNaturalRequest {
  tipoDocumento: string; // CC, CE, PP, PE
  numeroDocumento: string;
}

// ✅ Estructura real de la respuesta del backend
export interface ITerceroNaturalBackendResponse {
  dataHeader: {
    codRespuesta: number;
    errores: {
      codigo?: string;
      descripcion?: string;
      campo?: string;
    }[];
  };
  data: {
    tercerosNaturalInfo: {
      infoGeneralTerceroNatural: {
        rol: {
          codigo: string;
          valor: string;
        };
        tipoDocumento: {
          codigo: string;
          valor: string;
        };
        numeroDocumento: number;
        fechaNacimiento: string | null;
        primerNombre: string;
        segundoNombre: string | null;
        primerApellido: string;
        segundoApellido: string | null;
        sexo: {
          codigo: string;
          valor: string;
        };
        direccionResidencia: string | null;
        ciudadResidencia: string | null;
        telefonoResidencia: number | null;
        celular: number | null;
        correoElectronico: string | null;
        autorizaRecibirInf: string | null;
        autorizaCompartirInf: string | null;
        solicitaModificacionDatos: string | null;
        mensajeModificacionDatos: string | null;
        fechaExpedicionDocumento: string | null;
        fuenteIngresos: string | null;
      };
    };
  };
}

export interface ITerceroNaturalResponse {
  tipoDocumento: string;
  numeroDocumento: string;
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  nombreCompleto: string;
  fechaNacimiento?: string;
  genero?: string;
  direccion?: string;
  telefono?: string;
  celular?: string;
  email?: string;
  ciudad?: string;
  departamento?: string;
  estadoCivil?: string;
  profesion?: string;
  estado?: string;
}

// ========================================
// COMUNES_005 - SARLAFT Obtener Marca
// ========================================

export interface ISarlaftMarcaRequest {
  pTipoDocumto: string; // CC, NT, CE, PP, PE
  pNumeroDocumto: string;
  pMcaVlrminAseg: string; // 'S' o 'N'
  pMcaVlrminPrima: string; // 'S' o 'N'
}

export interface ISarlaftMarcaResponse {
  tipoDocumento: string;
  numeroDocumento: string;
  necesitaActualizacion: boolean;
  marcaActualizacion?: string; // 'S' o 'N'
  fechaUltimaActualizacion?: string;
  motivo?: string;
}

// ========================================
// COMUNES_006 - SARLAFT Generar URL
// ========================================

export interface ISarlaftGenerarUrlRequest {
  NumeroDocumentoTercero: string;
  TipoDocumentoTercero: string; // CC, NT, CE, PP, PE
  TipoTercero: string; // 'N' (Natural) o 'J' (Jurídico)
  RolTercero: string; // '16' (Tomador), '17' (Asegurado), etc.
  NumeroCelularTercero: string;
  McaPEPSOperacionesInusuales: string; // 'S' o 'N'
  MarcaExisteTercero: string; // 'S' o 'N'
  ExisteFatca: string; // 'S' o 'N'
  NumeroCelularAsesor: string;
  CorreoElectronicoAsesor: string;
  SistemaOrigen: string; // '1000'
  CodigoSeccion: number;
  CodigoProducto: number;
  CodigoSubproducto: number;
  MarcaVlrAseguradoMinimo: string; // 'S' o 'N'
  MarcaVlrPrimaMinima: string; // 'S' o 'N'
  URLOrigen: string;
  FormularioSarlaft: string; // 'Ordinario'
  FormularioFatca: string; // 'S' o 'N'
  EnvioSMSTercero: string; // 'S' o 'N'
  RequiereExperian: string; // 'S' o 'N'
  AutorizacionInformacion: string; // 'S' o 'N'
  RegValidacion?: string;
  DeclaracionNombrePersona?: string;
  DeclaracionTipoDocumento?: string;
  DeclaracionNumeroDocumento?: string;
  DeclaracionRol?: string;
  OrigenDatos?: string;
  OrigenNombre?: string;
  OrigenApellido?: string;
  OrigenFechaExpedicionDocumento?: string;
  OrigenFechaNacimiento?: string;
  OrigenGenero?: string;
  OrigenDireccion?: string;
  OrigenTelefono?: string;
  OrigenCelular?: string;
  OrigenCorreo?: string;
  EntrevistaNombreResponsable?: string;
  EntrevistaClaveResponsable?: string;
}

export interface ISarlaftGenerarUrlResponse {
  urlConocimiento: string;
  numeroSolicitud?: string;
  fechaGeneracion?: string;
  mensajeEnviado?: boolean;
}

// ========================================
// COMUNES_007 - Multiclaves
// ========================================

export interface IMulticlavesRequest {
  data: {
    clavesActivasEInactivas: string; // 'S' o 'N'
    clavesDirectas: string; // 'S' o 'N'
    nroDocumento: number;
    pais: string; // 'CO'
    tipoDocumento: string; // CC, NT, CE, PP, PE
  };
}

// ✅ Estructura real de la respuesta del backend
export interface IMulticlavesBackendResponse {
  dataHeader: {
    success: boolean;
    errores: any[];
  };
  data: {
    datosBasicos: {
      tipoDoc: string;
      nroDoc: number;
      nomRazonSocial: string;
      codEmpleado: number;
      codTipVinculacion: string;
      descTipVinculacion: string;
      codTipoNomina: number;
      descTipoNomina: string;
      codCarEsp: string;
      desCarEsp: string;
      tipoDocEmprInter: string;
      nroDocEmprInter: number;
      rzonSolEmprInter: string;
      codCtroCostos: string;
      desCtroCostos: string;
      correoElectro: string;
      marcaMostrarClave: string;
      tipoUsuario: string;
      [key: string]: any;
    };
    datoClaves: Array<{
      clave: number;
      tipoDoc: string;
      nroDoc: number;
      nomRazonSocial: string;
      codCtroCostos: string;
      desCtroCostos: string;
      mcaClaveDirecta: string; // 'S' o 'N'
      mcaClavePpla: string; // 'S' o 'N'
      mcaClaveActiva: string; // 'S' o 'N'
      [key: string]: any;
    }>;
    marcaMostrarClave: string; // 'S' o 'N'
    tipoUsuario: string; // 'A' o 'E'
  };
}

// ✅ Estructura que usa el frontend (normalizada)
export interface IMulticlavesClave {
  clave: string;
  tipoDocumento: string;
  numeroDocumento: string;
  nombreRazonSocial: string;
  codigoCentroCostos: string;
  descripcionCentroCostos?: string;
  marcaClaveDirecta?: string; // 'S' o 'N'
  marcaClavePrincipal?: string; // 'S' o 'N'
  marcaClaveActiva: string; // 'S' o 'N'
}

export interface IMulticlavesResponse {
  claves: IMulticlavesClave[];
  totalClaves?: number;
  datosBasicos?: any;
  marcaMostrarClave?: string;
  tipoUsuario?: string;
}

// ========================================
// COMUNES_008 - Recuperar Agente
// ========================================

export interface IRecuperarAgenteRequest {
  codigoAgente: string; // Clave de intermediación
}

export interface IRecuperarAgenteResponse {
  codigoAgente: string;
  tipoDocumento: string;
  numeroDocumento: string;
  nombreRazonSocial: string;
  estado?: string;
  tipoAgente?: string;
  tasaComision?: number;
  fechaInicio?: string;
  fechaFin?: string;
}

// ========================================
// COMUNES_009 - Notificador Transversal
// ========================================

export interface INotificadorDato {
  codDato: string;
  valDato: string;
  binDato?: string; // Base64 para archivos
}

export interface INotificadorGrupo {
  agrupador: string; // 'DatosPlantilla' o 'DatosEnvio'
  datos: INotificadorDato[];
}

export interface INotificadorRequest {
  aplicacion: string; // 'U8C4K6FJ51PYPPX'
  notificacion: string; // 'CAP35'
  grupo: INotificadorGrupo[];
}

export interface INotificadorResponse {
  exito: boolean;
  mensaje?: string;
  numeroEnvio?: string;
  fechaEnvio?: string;
}

// ========================================
// COMUNES_010 - Generar PDF Cotización RC
// ========================================

export interface IGenerarPdfCotizacionRCRequest {
  compania: string; // '3'
  seccion: string; // '10' o '66'
  ramo: string; // '214' o '778'
  endoso: string; // '0'
  secuPoliza: string;
  numeroCotizacion: string;
  riesgo: string; // '1'
  tipoCotizacion: string; // '3'
  usuario: string;
}

export interface IGenerarPdfCotizacionRCResponse {
  pdfBase64: string;
  nombreArchivo?: string;
  fechaGeneracion?: string;
}

// ========================================
// COMUNES_011 - Generar PDF Póliza
// ========================================

export interface IGenerarPdfPolizaRequest {
  compania: string; // '3'
  endoso: string; // '0'
  numeroPoliza: string;
  ramo: string; // '214' o '778'
  riesgo: string; // '1'
  seccion: string; // '10' o '66'
  secuPoliza: string;
  numeroSubProducto?: string;
  tipoPoliza: string; // '1' o '2'
  usuario: string;
}

export interface IGenerarPdfPolizaResponse {
  pdfBase64: string;
  nombreArchivo?: string;
  fechaGeneracion?: string;
}

// ========================================
// COMUNES_012 - Generar QR PDF
// ========================================

export interface IGenerarQRRequest {
  compania: string; // '3'
  ramo: string; // '450', '455', '214', '778'
  riesgo: string; // '1'
  seccion: string; // '4' o '10' o '66'
  secuPoliza: string;
  tipoPoliza: string; // '1' o '2'
  endoso: string; // '0'
  numeroPoliza: string;
  numeroPolizaHija?: string;
  fileName: string;
  file: string; // PDF en Base64
  p_info1?: string;
  p_info2?: string;
  p_info3?: string;
  p_info4?: string;
  p_info5?: string;
}

export interface IGenerarQRResponse {
  pdfConQRBase64: string;
  nombreArchivo?: string;
  fechaProcesamiento?: string;
  numeroSolicitud?: string;
}
