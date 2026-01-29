/**
 * ✅ RF-007: Interfaces para gestión de cupo disponible
 * Definiciones de tipos para validaciones de cupo y condiciones
 */

/** Tipo de cliente según RF-007 */
export type TipoCliente = 'enfoque' | 'ocasional';

/** Tipo de usuario */
export type TipoUsuario = 'administrador' | 'intermediario' | 'interno';

/** Respuesta del servicio de cálculo de cupo */
export interface ICupoDisponibleResponse {
  cupoDisponible: number;
  tipoCliente: TipoCliente;
  tieneCupo: boolean;
  requiereValidacion?: boolean;
}

/** Respuesta del servicio de ingeniero digital */
export interface IIngenieroDigitalResponse {
  tieneInformacion: boolean;
  capacidadValidada: boolean;
  cupoCalculado?: number;
  requiereEstadosFinancieros: boolean;
}

/** Datos para solicitar cupo */
export interface ISolicitudCupo {
  tipoDocumentoTomador: string;
  numeroDocumentoTomador: string;
  tipoDocumentoAsegurado?: string;
  numeroDocumentoAsegurado?: string;
  estadosFinancierosFile?: File;
  actividadEconomica: string;
}

/** Programa parametrizado para producto 440 */
export interface IProgramaParametrizado {
  id: string;
  codigo: string;
  nombre: string;
  activo: boolean;
  tieneClaveExclusiva: boolean;
  facility?: number;
  aseguradoEnPrograma: boolean;
}

/** Validación de Grupo Bolívar */
export interface IValidacionGrupoBolivar {
  tomadorEsGrupoBolivar: boolean;
  aseguradoEsGrupoBolivar: boolean;
  claveEsDirecta: boolean;
  requiereError: boolean;
}
