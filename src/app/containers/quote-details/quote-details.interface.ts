// ✅ Interfaces para Quote Details Component

export interface QuoteDetailsData {
  id: string;
  numero: string;
  fechaCreacion: string;
  tomador: string;
  numeroDocumento: string;
  valorAsegurado: string;
  estado: string;

  // Datos del formulario precargados
  numeroContratoGeneral?: string;
  tipoDocumentoTomadorGeneral?: string;
  nombreTomadorGeneral?: string;
  numeroDocumentoTomadorGeneral?: string;
  nombreAseguradoGeneral?: string;
  numeroDocumentoAseguradoGeneral?: string;
  tipoDocumentoAseguradoGeneral?: string;
  moneda?: string;

  // Ubicación
  departamento?: string;
  localidadMunicipio?: string;
  direccionRiesgo?: string;

  // Detalles del contrato
  valorContrato?: string;
  fechaInicioContrato?: string;
  duracionContrato?: string;
  fechaFinContrato?: string;
}

export interface QuoteDetailsParams {
  id: string;
}
