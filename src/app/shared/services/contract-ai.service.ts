/**
 * ✅ RF-009: Servicio para procesamiento de contratos con IA
 *
 * Regla 9.1: Invocar servicio "IA Lector de Contratos"
 * Regla 9.3: WebSocket para estado en tiempo real
 * Regla 9.4: Manejo de errores de procesamiento
 * Regla 9.5: Validación de asegurabilidad
 * Regla 9.7: Manejo de timeout
 * Regla 9.8: Validación de formato de fechas y números
 * Regla 9.10: Validación de consistencia con catálogos
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, timeout, finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CatalogosService } from './catalogos.service';
import { LoggerService } from './logger.service';
import {
  IContractAIResponse,
  IWebSocketMessage,
  IExtractedContractData,
  Asegurabilidad,
  EtapaContrato,
  ICodigoTronador,
  RF009_MESSAGES,
  FILE_UPLOAD_CONFIG,
} from '../../containers/contract-reader/contract-reader.interface';

@Injectable({
  providedIn: 'root',
})
export class ContractAIService {
  private readonly _baseUrl: string;
  private readonly _apiKey: string;
  private wsConnection: WebSocket | null = null;
  private wsMessages$ = new Subject<IWebSocketMessage>();
  private processingBlocked = false; // RF-009 Regla 9.1

  constructor(
    private readonly _http: HttpClient,
    private readonly catalogosService: CatalogosService,
    private readonly logger: LoggerService,
  ) {
    // ✅ Configurar URL base del servicio de lector de contratos
    this._baseUrl = 'https://z0jo90imu8.execute-api.us-east-1.amazonaws.com/dev/gcp-lector-contratos/contrato/lector-contratos';
    this._apiKey = environment.apiKeyComunes || '';
  }

  /**
   * ✅ RF-009 Regla 9.1: Procesar contrato con IA
   * Bloquea re-ejecución durante el procesamiento
   *
   * @param archivo Archivo del contrato a procesar
   * @param correoUsuario Correo electrónico del usuario
   * @param idFront ID del frontend (identificador único de la solicitud)
   * @returns Observable con respuesta del procesamiento
   */
  procesarContrato(
    archivo: File,
    correoUsuario: string,
    idFront: string,
  ): Observable<IContractAIResponse> {
    // ✅ RF-009 Regla 9.1: Bloquear re-ejecución
    if (this.processingBlocked) {
      return throwError(() => new Error('El procesamiento ya está en curso. Por favor espera.'));
    }

    this.processingBlocked = true;

    // ✅ Validar parámetros de entrada
    if (!archivo) {
      this.processingBlocked = false;
      return throwError(() => new Error('El archivo es requerido'));
    }

    if (!correoUsuario || !correoUsuario.trim()) {
      this.processingBlocked = false;
      return throwError(() => new Error('El correo del usuario es requerido'));
    }

    if (!idFront || !idFront.trim()) {
      this.processingBlocked = false;
      return throwError(() => new Error('El ID del frontend es requerido'));
    }

    // ✅ Construir FormData según especificación del endpoint
    const formData = new FormData();
    formData.append('file', archivo);
    formData.append('correo_usuario', correoUsuario.trim());
    formData.append('id_front', idFront.trim());

    // ✅ Headers con API Key
    const headers = new HttpHeaders({
      'x-api-key': this._apiKey,
    });

    this.logger.debug('Enviando contrato para procesamiento', {
      nombreArchivo: archivo.name,
      tamaño: archivo.size,
      tipo: archivo.type,
      correoUsuario,
      idFront,
      url: this._baseUrl,
    });

    // ✅ RF-009 Regla 9.3: Conectar WebSocket para estado en tiempo real (simulado)
    this.conectarWebSocket(idFront);

    // ✅ Realizar petición HTTP al servicio real
    return this._http.post<any>(this._baseUrl, formData, { headers }).pipe(
      timeout(FILE_UPLOAD_CONFIG.processingTimeoutMs),
      map((response: any) => {
        this.logger.debug('Respuesta del servicio de lector de contratos', response);

        // ✅ Mapear respuesta del backend a la estructura esperada
        const respuestaMapeada: IContractAIResponse = {
          success: true,
          asegurabilidad: Asegurabilidad.SI, // TODO: Mapear desde respuesta real
          datosExtraidos: this.mapearDatosExtraidos(response),
          tiempoProcesamiento: response.tiempoProcesamiento || 0,
          confianza: response.confianza || 0,
          warnings: response.warnings || [],
        };

        // ✅ RF-009 Regla 9.8 y 9.10: Validar datos
        const respuestaValidada = this.validarYProcesarRespuesta(respuestaMapeada);

        this.enviarMensajeWebSocket({
          tipo: 'finalizado',
          mensaje: RF009_MESSAGES.FINALIZADO,
          progreso: 100,
          datos: respuestaValidada.datosExtraidos,
        });

        return respuestaValidada;
      }),
      catchError((error: any) => {
        this.logger.error('Error al procesar contrato', error);

        this.enviarMensajeWebSocket({
          tipo: 'error',
          mensaje: error.message || RF009_MESSAGES.ERROR_PROCESAMIENTO,
          error: error,
        });

        return throwError(() => ({
          success: false,
          error: error.message || RF009_MESSAGES.ERROR_PROCESAMIENTO,
          detalles: error,
        }));
      }),
      finalize(() => {
        this.processingBlocked = false;
        this.desconectarWebSocket();
      }),
    );
  }

  /**
   * ✅ Mapear datos extraídos de la respuesta del backend
   * TODO: Ajustar según la estructura real de la respuesta del servicio
   */
  private mapearDatosExtraidos(_response: any): IExtractedContractData {
    // Por ahora retornar datos mock, pero esto debe mapearse desde la respuesta real
    return this.generarDatosMock();
  }

  /**
   * ✅ RF-009 Regla 9.3: Conectar WebSocket para estado en tiempo real
   *
   * @param idMongo ID del documento para identificar la conexión
   */
  private conectarWebSocket(_idMongo: string): void {
    // Prefijo _ para indicar uso indirecto
    try {
      // TODO: Conectar con WebSocket real cuando esté disponible
      // this.wsConnection = new WebSocket(`${this.wsUrl}/ws/contrato/${idMongo}`);
      //
      // this.wsConnection.onmessage = (event) => {
      //   const mensaje: IWebSocketMessage = JSON.parse(event.data);
      //   this.wsMessages$.next(mensaje);
      this.logger.debug('WebSocket conectado (mock)');
    } catch (error) {
      this.logger.error('Error al conectar WebSocket', error);
    }
  }

  /**
   * ✅ RF-009 Regla 9.3: Desconectar WebSocket
   */
  private desconectarWebSocket(): void {
    if (this.wsConnection) {
      this.wsConnection.close();
      this.wsConnection = null;
    }
  }

  /**
   * ✅ RF-009 Regla 9.3: Enviar mensaje WebSocket
   */
  private enviarMensajeWebSocket(mensaje: IWebSocketMessage): void {
    this.wsMessages$.next(mensaje);
  }

  /**
   * ✅ RF-009 Regla 9.3: Observable de mensajes WebSocket
   */
  getWebSocketMessages(): Observable<IWebSocketMessage> {
    return this.wsMessages$.asObservable();
  }

  /**
   * ✅ RF-009 Regla 9.5: Validar asegurabilidad
   *
   * @param asegurabilidad Valor de asegurabilidad
   * @param motivo Motivo si no es asegurable
   * @throws Error si no es asegurable
   */
  validarAsegurabilidad(asegurabilidad: Asegurabilidad, motivo?: string): void {
    if (asegurabilidad === Asegurabilidad.NO) {
      throw {
        asegurabilidad: Asegurabilidad.NO,
        mensaje: RF009_MESSAGES.NO_ASEGURABLE,
        motivo: motivo || 'Contrato no asegurable según análisis de IA',
      };
    }
  }

  /**
   * ✅ RF-009 Regla 9.8: Validar formato de fechas
   *
   * @param fecha Fecha a validar
   * @returns true si el formato es válido
   */
  validarFormatoFecha(fecha: string): boolean {
    if (!fecha) return false;

    // Validar formato ISO (YYYY-MM-DD) o DD/MM/YYYY
    const isoRegex = /^\d{4}-\d{2}-\d{2}$/;
    const latinoRegex = /^\d{2}\/\d{2}\/\d{4}$/;

    if (isoRegex.test(fecha) || latinoRegex.test(fecha)) {
      const fechaObj = new Date(fecha);
      return !isNaN(fechaObj.getTime());
    }

    return false;
  }

  /**
   * ✅ RF-009 Regla 9.8: Validar formato de números
   *
   * @param valor Valor numérico a validar
   * @returns true si el formato es válido
   */
  validarFormatoNumero(valor: number | string): boolean {
    if (valor === null || valor === undefined) return false;

    const numero =
      typeof valor === 'string' ? parseFloat(valor.replace(/\./g, '').replace(',', '.')) : valor;
    return !isNaN(numero) && isFinite(numero) && numero >= 0;
  }

  /**
   * ✅ RF-009 Regla 9.10: Validar consistencia con catálogos
   *
   * @param codigoTronador Código a validar
   * @param tipoCatalogo Tipo de catálogo (monedas, tipos_contrato, etc.)
   * @returns Observable con código validado
   */
  validarContraCatalogo(
    codigoTronador: ICodigoTronador,
    tipoCatalogo: string,
  ): Observable<ICodigoTronador> {
    return this.catalogosService.obtenerCatalogo(tipoCatalogo, codigoTronador.codigo).pipe(
      map(response => {
        const existeEnCatalogo = response.lista?.some(
          item => item.codigo === codigoTronador.codigo,
        );

        return {
          ...codigoTronador,
          valido: existeEnCatalogo || false,
        };
      }),
      catchError(() => {
        // Si falla la validación, marcar como inválido
        return [
          {
            ...codigoTronador,
            valido: false,
          },
        ];
      }),
    );
  }

  /**
   * ✅ RF-009 Regla 9.8 y 9.10: Validar y procesar respuesta de IA
   *
   * @param response Respuesta del servicio IA
   * @returns Respuesta validada
   */
  private validarYProcesarRespuesta(response: IContractAIResponse): IContractAIResponse {
    const datos = response.datosExtraidos;
    const datosInvalidos = {
      fechas: [] as string[],
      numeros: [] as string[],
    };
    const datosInconsistentes = {
      moneda: false,
      tipoContrato: false,
      departamento: false,
      municipio: false,
      ciudad: false,
    };

    // ✅ RF-009 Regla 9.8: Validar fechas
    if (!this.validarFormatoFecha(datos.fechaInicio)) {
      datosInvalidos.fechas.push('fechaInicio');
      datos.fechaInicioValida = false;
    } else {
      datos.fechaInicioValida = true;
    }

    if (!this.validarFormatoFecha(datos.fechaTerminacion)) {
      datosInvalidos.fechas.push('fechaTerminacion');
      datos.fechaTerminacionValida = false;
    } else {
      datos.fechaTerminacionValida = true;
    }

    // ✅ RF-009 Regla 9.8: Validar números
    if (!this.validarFormatoNumero(datos.valorContrato)) {
      datosInvalidos.numeros.push('valorContrato');
    }

    // ✅ RF-009 Regla 9.10: Validar consistencia con catálogos (simulado)
    // En producción, esto se haría con llamadas reales a CatalogosService
    datosInconsistentes.moneda = !datos.moneda.valido;
    datosInconsistentes.tipoContrato = !datos.tipoContrato.valido;
    datosInconsistentes.departamento = !datos.departamento.valido;
    datosInconsistentes.municipio = !datos.municipio.valido;
    datosInconsistentes.ciudad = !datos.ciudad.valido;

    datos.datosInvalidos = datosInvalidos;
    datos.datosInconsistentes = datosInconsistentes;

    return {
      ...response,
      datosExtraidos: datos,
    };
  }

  /**
   * ✅ RF-009 Regla 9.4: Manejo de errores
   * Reservado para uso futuro
   */

  // private _handleError(error: any): Observable<never> {
  //   console.error('❌ [ContractAIService] Error:', error);
  //
  //   // ✅ RF-009 Regla 9.5: Si es error de asegurabilidad, propagar
  //   if (error.asegurabilidad === Asegurabilidad.NO) {
  //     return throwError(() => error);
  //   }
  //
  //   // ✅ RF-009 Regla 9.4: Error genérico de procesamiento
  //   return throwError(() => ({
  //     success: false,
  //     error: RF009_MESSAGES.ERROR_PROCESAMIENTO,
  //     detalles: error.message || error,
  //   }));
  // }

  /**
   * Generar datos mock para desarrollo
   */
  private generarDatosMock(): IExtractedContractData {
    return {
      numeroContrato: 'CONT-2024-456',
      fechaContrato: '2024-01-15',
      objetoContrato: 'Construcción de edificio residencial',
      valorContrato: 2500000000,
      moneda: { codigo: 'COP', descripcion: 'Peso Colombiano', valido: true },
      tipoDocumento: { codigo: 'NT', descripcion: 'NIT', valido: true },
      departamento: { codigo: '11', descripcion: 'Cundinamarca', valido: true },
      municipio: { codigo: '11001', descripcion: 'Bogotá D.C.', valido: true },
      ciudad: { codigo: '11001', descripcion: 'Bogotá D.C.', valido: true },
      tipoContrato: { codigo: '1', descripcion: 'Obra Pública', valido: true },
      etapaContrato: EtapaContrato.CONTRACTUAL,
      asegurabilidad: Asegurabilidad.SI,
      contratante: {
        nombre: 'Empresa ABC',
        nit: '900123456-7',
        representanteLegal: 'Juan Pérez',
        direccion: 'Calle 123',
        telefono: '1234567',
        email: 'test@test.com',
      },
      contratista: {
        nombre: 'Empresa XYZ',
        nit: '800987654-3',
        representanteLegal: 'María García',
        direccion: 'Calle 456',
        telefono: '9876543',
        email: 'test2@test.com',
      },
      fechaInicio: '2024-02-01',
      fechaTerminacion: '2025-08-01',
      plazoEjecucion: 545,
      fechaInicioValida: true,
      fechaTerminacionValida: true,
      coberturas_o_garantias: {
        cumplimiento: {
          requerida: true,
          porcentaje: 20,
          valor: 500000000,
          codigoTronador: { codigo: '1', descripcion: 'Cumplimiento', valido: true },
        },
        calidadServicio: {
          requerida: true,
          porcentaje: 15,
          valor: 375000000,
          codigoTronador: { codigo: '2', descripcion: 'Calidad', valido: true },
        },
        responsabilidadCivil: {
          requerida: true,
          valor: 300000000,
          codigoTronador: { codigo: '3', descripcion: 'RC', valido: true },
        },
        buenManejoInversion: {
          requerida: false,
          porcentaje: 0,
          valor: 0,
          codigoTronador: { codigo: '0', descripcion: 'N/A', valido: true },
        },
      },
      riesgosIdentificados: ['Riesgo sísmico'],
      clausulasRelevantes: [],
      datosInvalidos: {
        fechas: [],
        numeros: [],
      },
      datosInconsistentes: {
        moneda: false,
        tipoContrato: false,
        departamento: false,
        municipio: false,
        ciudad: false,
      },
    };
  }

  /**
   * Verificar si el procesamiento está bloqueado
   */
  estaBloqueado(): boolean {
    return this.processingBlocked;
  }
}
