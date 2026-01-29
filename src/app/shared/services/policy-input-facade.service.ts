import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggerService } from './logger.service';
import { TercerosService } from './terceros.service';
import { SarlaftService } from './sarlaft.service';
// Servicios reservados para uso futuro - se importarán cuando se necesiten
// import { ContractAIService } from './contract-ai.service';
// import { FileStorageService } from './file-storage.service';
// import { CoberturaService } from './cobertura.service';
import { SessionService } from './session.service';
import { ConfigService } from './config.service';
// import { RecuperarAgenteService } from './recuperar-agente.service';
// import { SessionMulticlavesService } from './session-multiclaves.service';
import { MulticlavesService } from './multiclaves.service';
// import { CupoService } from './cupo.service';
// import { GrupoBolivarService } from './grupo-bolivar.service';
// import { ProgramaService } from './programa.service';
// import { ClienteValidacionService } from './cliente-validacion.service';
// import { ProductoValidacionService } from './producto-validacion.service';
// import { ClienteEnfoqueService } from './cliente-enfoque.service';
// import { QuoteService } from './quote.service';
import {
  ITerceroNaturalResponse,
  ITerceroJuridicoResponse,
  ISarlaftMarcaResponse,
  ISarlaftGenerarUrlRequest,
  ISarlaftGenerarUrlResponse,
  IMulticlavesResponse,
} from '../interfaces/comunes.interface';

/**
 * ✅ PolicyInputFacadeService - Facade Pattern
 *
 * Este servicio actúa como fachada que orquesta múltiples servicios de negocio,
 * reduciendo el acoplamiento del componente PolicyInputComponent.
 *
 * Beneficios:
 * - Reduce dependencias del componente (de 15+ servicios a 1)
 * - Centraliza lógica de orquestación
 * - Facilita testing
 * - Mejora mantenibilidad
 */
@Injectable({
  providedIn: 'root',
})
export class PolicyInputFacadeService {
  private readonly context = 'PolicyInputFacadeService';

  constructor(
    private readonly logger: LoggerService,
    private readonly tercerosService: TercerosService,
    private readonly sarlaftService: SarlaftService,
    // contractAIService reservado para uso futuro
    // private readonly contractAIService: ContractAIService,
    // fileStorageService reservado para uso futuro
    // private readonly fileStorageService: FileStorageService,
    // coberturaService reservado para uso futuro
    // private readonly coberturaService: CoberturaService,
    private readonly sessionService: SessionService,
    private readonly configService: ConfigService,
    // recuperarAgenteService reservado para uso futuro
    // private readonly recuperarAgenteService: RecuperarAgenteService,
    // sessionMulticlavesService reservado para uso futuro
    // private readonly sessionMulticlavesService: SessionMulticlavesService,
    private readonly multiclavesService: MulticlavesService,
    // cupoService reservado para uso futuro
    // private readonly cupoService: CupoService,
    // grupoBolivarService reservado para uso futuro
    // private readonly grupoBolivarService: GrupoBolivarService,
    // programaService reservado para uso futuro
    // private readonly programaService: ProgramaService,
    // clienteValidacionService reservado para uso futuro
    // private readonly clienteValidacionService: ClienteValidacionService,
    // productoValidacionService reservado para uso futuro
    // private readonly productoValidacionService: ProductoValidacionService,
    // clienteEnfoqueService reservado para uso futuro
    // private readonly clienteEnfoqueService: ClienteEnfoqueService,
    // quoteService reservado para uso futuro
    // private readonly quoteService: QuoteService,
  ) {
    this.logger.debug('PolicyInputFacadeService inicializado');
  }

  /**
   * ✅ Consultar tercero natural (COMUNES_004)
   */
  consultarTerceroNatural(
    tipoDocumento: string,
    numeroDocumento: string,
  ): Observable<ITerceroNaturalResponse> {
    this.logger.logWithContext(this.context, 'debug', 'Consultando tercero natural', {
      tipoDocumento,
      numeroDocumento,
    });
    return this.tercerosService.consultarTerceroNatural(tipoDocumento, numeroDocumento);
  }

  /**
   * ✅ Consultar tercero jurídico (COMUNES_003)
   */
  consultarTerceroJuridico(
    tipoDocumento: string,
    numeroDocumento: string,
  ): Observable<ITerceroJuridicoResponse> {
    this.logger.logWithContext(this.context, 'debug', 'Consultando tercero jurídico', {
      tipoDocumento,
      numeroDocumento,
    });
    return this.tercerosService.consultarTerceroJuridico(tipoDocumento, numeroDocumento);
  }

  /**
   * ✅ Consultar marca SARLAFT (COMUNES_005)
   */
  consultarMarcaSarlaft(
    tipoDocumento: string,
    numeroDocumento: string,
    marcaVlrMinAseg: string = 'N',
    marcaVlrMinPrima: string = 'N',
  ): Observable<ISarlaftMarcaResponse> {
    this.logger.logWithContext(this.context, 'debug', 'Consultando marca SARLAFT', {
      tipoDocumento,
      numeroDocumento,
    });
    return this.sarlaftService.obtenerMarca(tipoDocumento, numeroDocumento, marcaVlrMinAseg, marcaVlrMinPrima);
  }

  /**
   * ✅ Generar URL de conocimiento de cliente (COMUNES_006)
   */
  generarUrlSarlaft(request: ISarlaftGenerarUrlRequest): Observable<ISarlaftGenerarUrlResponse> {
    this.logger.logWithContext(this.context, 'debug', 'Generando URL SARLAFT', {
      tipoDocumento: request.TipoDocumentoTercero,
      numeroDocumento: request.NumeroDocumentoTercero,
    });
    return this.sarlaftService.generarUrl(request);
  }

  /**
   * ✅ Consultar multiclaves (COMUNES_007)
   */
  consultarMulticlaves(
    tipoDocumento: string,
    numeroDocumento: string,
  ): Observable<IMulticlavesResponse> {
    this.logger.logWithContext(this.context, 'debug', 'Consultando multiclaves', {
      tipoDocumento,
      numeroDocumento,
    });
    return this.multiclavesService.consultarMulticlaves(tipoDocumento, numeroDocumento);
  }

  /**
   * ✅ Obtener datos de sesión
   */
  getSessionData() {
    return {
      codUsr: this.sessionService.getCodUsr(),
      tipoUsuario: this.sessionService.getTipoUsuario(),
      numeroDocumento: this.sessionService.getNumeroDocumento(),
      tipoDocumento: this.sessionService.getTipoDocumento(),
      claveIntermediario: this.sessionService.getClaveIntermediario(),
      email: this.sessionService.getEmail(),
      company: this.sessionService.getCompany(),
    };
  }

  /**
   * ✅ Obtener configuración del sistema
   */
  getConfig() {
    return {
      codCia: this.configService.codCia,
      codSecc: this.configService.codSecc,
      codProducto: this.configService.codProducto,
      proceso: this.configService.proceso,
      subproceso: this.configService.subproceso,
      sistemaOrigen: this.configService.sistemaOrigen,
      pais: this.configService.pais,
    };
  }

  // ✅ Delegar métodos de otros servicios según necesidad
  // Los servicios específicos se pueden acceder directamente si es necesario,
  // pero los métodos comunes deben pasar por el facade
}
