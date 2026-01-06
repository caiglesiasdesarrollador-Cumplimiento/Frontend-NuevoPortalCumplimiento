/**
 * ✅ Interfaces para el módulo Policy Input
 * Estas interfaces definen los tipos de datos sin afectar la funcionalidad existente.
 * Se pueden usar gradualmente para mejorar el tipado del código.
 */

// ========== COBERTURAS ==========

/** Cobertura de Cumplimiento */
export interface ICoberturaCumplimiento {
  id: number;
  nombre: string;
  porcentaje: number;
  valorAsegurado: number;
  tasa: number;
  fechaInicio: string;
  tiempoAdicional: number;
  fechaFin: string;
  fechaVencimiento: string;
  prima: number;
  seleccionada: boolean;
}

/** Cobertura de Responsabilidad Civil (RC) */
export interface ICoberturaRC {
  id: number;
  nombre: string;
  porcentaje: number;
  valorAsegurado: number;
  tasa: number;
  fechaInicio: string;
  tiempoAdicional: number;
  fechaFin: string;
  fechaVencimiento: string;
  prima: number;
  seleccionada: boolean;
}

/** Cobertura genérica para resúmenes */
export interface ICoberturaResumen {
  id: string | number;
  name: string;
  value: number;
  percentage: number;
  status: string;
  accepted?: boolean;
}

// ========== CLIENTE / TOMADOR / ASEGURADO ==========

/** Información del Cliente */
export interface ICliente {
  tipoDocumento: string;
  numeroDocumento: string;
  nombre: string;
  estado?: 'activo' | 'sarlaft_desactualizado' | 'no_existe';
}

/** Tomador de la póliza */
export interface ITomador extends ICliente {
  ciudad?: string;
  direccion?: string;
  telefono?: string;
  email?: string;
}

/** Asegurado de la póliza */
export interface IAsegurado extends ICliente {
  ciudad?: string;
  direccion?: string;
}

// ========== CONTRATO ==========

/** Detalles del Contrato */
export interface IDetallesContrato {
  numeroContrato: string;
  tipoContrato: string;
  objetoContrato: string;
  valorContrato: number;
  moneda: string;
  fechaInicio: string;
  fechaFin: string;
  duracion: number; // en meses
}

// ========== COTIZACIÓN ==========

/** Cotización existente (para tabla de gestión) */
export interface ICotizacionExistente {
  id: string;
  codigo: string;
  estado: string;
  tomador: string;
  asegurado: string;
  valorAsegurado: number;
  fechaCreacion: string;
  fechaVencimiento: string;
  producto: string;
}

/** Datos del resumen de cotización (modal) */
export interface IQuoteSummaryData {
  quoteNumber: string;
  status: string;
  creationDate: string;
  product: string;
  policyType?: string;
  insuredValue: number;
  availableCredit: number;
  contractNumber: string;
  documentType: string;
  clientName: string;
  clientDocument: string;
  currency: string;
  insuredDocumentType?: string;
  insuredDocumentNumber?: string;
  insuredName?: string;
  department?: string;
  localityMunicipality?: string;
  riskAddress?: string;
  contractValue?: number;
  contractStartDate?: string;
  contractDuration?: number;
  contractEndDate?: string;
  premium?: number;
  complianceCoverages?: ICoberturaResumen[];
  rcCoverages?: ICoberturaResumen[];
  selectedCoverages?: ICoberturaResumen[];
}

// ========== UBICACIÓN ==========

/** Ubicación del Riesgo */
export interface IUbicacionRiesgo {
  departamento: string;
  ciudad: string;
  direccion: string;
  codigoPostal?: string;
}

// ========== FORMULARIO ==========

/** Estado del formulario por pasos */
export interface IFormularioPasos {
  paso1Completo: boolean;
  paso2Completo: boolean;
  paso3Completo: boolean;
}

/** Opciones de tipo de documento */
export interface ITipoDocumento {
  value: string;
  label: string;
}

/** Opciones de producto */
export interface ITipoProducto {
  value: string;
  label: string;
}

// ========== COASEGURO ==========

/** Coasegurador */
export interface ICoasegurador {
  id: number;
  nombre: string;
  porcentaje: number;
  prima: number;
}

/** Configuración de Coaseguro */
export interface ICoaseguro {
  tipo: 'ninguno' | 'cedido' | 'aceptado';
  coaseguradores: ICoasegurador[];
  porcentajeTotal: number;
}

// ========== CONTRAGARANTÍA ==========

/** Contragarantía */
export interface IContragarantia {
  tipo: string;
  descripcion: string;
  valor?: number;
}

// ========== CAMBIOS RELIQUIDACIÓN ==========

/** Cambio detectado en reliquidación */
export interface ICambioReliquidacion {
  tipo: 'nueva' | 'modificada' | 'removida';
  nombreCobertura: string;
  detalles: string[];
}

// ========== VALIDACIONES ==========

/** Regla de validación de documento */
export interface IValidacionDocumento {
  minLength: number;
  maxLength: number;
  pattern: RegExp;
  formato: string;
}

/** Mapa de validaciones por tipo de documento */
export interface IValidacionesDocumento {
  [tipoDocumento: string]: IValidacionDocumento;
}

// ========== NOTIFICACIONES ==========

/** Configuración de notificación/toast */
export interface INotificacion {
  tipo: 'success' | 'error' | 'warning' | 'info';
  mensaje: string;
  duracion?: number;
}

