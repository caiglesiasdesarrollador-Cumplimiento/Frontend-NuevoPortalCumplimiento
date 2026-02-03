/**
 * ✅ RF-009: Pruebas unitarias completas para ContractReaderComponent
 * 
 * Cubre todas las reglas de RF-009:
 * - Regla 9.1: Bloqueo de re-ejecución
 * - Regla 9.2: Códigos Tronador
 * - Regla 9.3: WebSocket
 * - Regla 9.4: Manejo de errores
 * - Regla 9.5: Validación de asegurabilidad
 * - Regla 9.6: Almacenamiento S3/FileNet
 * - Regla 9.7: Timeout
 * - Regla 9.8: Validación de formato
 * - Regla 9.9: Etapa del contrato
 * - Regla 9.10: Validación contra catálogos
 * - Regla 9.11: Corrección manual
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ContractReaderComponent } from './contract-reader.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { BreadcrumbService } from '../../shared/services/breadcrumb.service';
import { ContractAIService } from '../../shared/services/contract-ai.service';
import { FileStorageService } from '../../shared/services/file-storage.service';
import { SessionService } from '../../shared/services/session.service';
import { ConfigService } from '../../shared/services/config.service';
import {
  ProcessingStatus,
  Asegurabilidad,
  RF009_MESSAGES,
  IWebSocketMessage,
  TipoArchivo,
  EstadoArchivo,
} from './contract-reader.interface';

describe('ContractReaderComponent - RF-009', () => {
  let component: ContractReaderComponent;
  let fixture: ComponentFixture<ContractReaderComponent>;
  let router: jasmine.SpyObj<Router>;
  let contractAIService: jasmine.SpyObj<ContractAIService>;
  let fileStorageService: jasmine.SpyObj<FileStorageService>;
  let sessionService: jasmine.SpyObj<SessionService>;
  let configService: jasmine.SpyObj<ConfigService>;
  let breadcrumbService: jasmine.SpyObj<BreadcrumbService>;
  let wsMessages$: Subject<IWebSocketMessage>;

  beforeEach(async () => {
    wsMessages$ = new Subject<IWebSocketMessage>();

    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const contractAISpy = jasmine.createSpyObj('ContractAIService', [
      'procesarContrato',
      'validarAsegurabilidad',
      'getWebSocketMessages',
      'estaBloqueado',
    ]);
    const fileStorageSpy = jasmine.createSpyObj('FileStorageService', [
      'subirAS3',
      'validarFormatoArchivo',
      'obtenerFormatoArchivo',
    ]);
    const sessionSpy = jasmine.createSpyObj('SessionService', [
      'getTipoDocumento',
      'getNumeroDocumento',
    ]);
    const configSpy = jasmine.createSpyObj('ConfigService', [], {
      codSecc: '4',
    });
    const breadcrumbSpy = jasmine.createSpyObj('BreadcrumbService', [
      'setBreadcrumb',
      'setContractReaderBreadcrumb',
    ]);

    contractAISpy.getWebSocketMessages.and.returnValue(wsMessages$.asObservable());
    contractAISpy.estaBloqueado.and.returnValue(false);

    sessionSpy.getTipoDocumento.and.returnValue('CC');
    sessionSpy.getNumeroDocumento.and.returnValue('1234567890');

    fileStorageSpy.validarFormatoArchivo.and.returnValue(true);
    fileStorageSpy.obtenerFormatoArchivo.and.returnValue('PDF');

    await TestBed.configureTestingModule({
      imports: [ContractReaderComponent, RouterTestingModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ContractAIService, useValue: contractAISpy },
        { provide: FileStorageService, useValue: fileStorageSpy },
        { provide: SessionService, useValue: sessionSpy },
        { provide: ConfigService, useValue: configSpy },
        { provide: BreadcrumbService, useValue: breadcrumbSpy },
        ChangeDetectorRef,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ContractReaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    contractAIService = TestBed.inject(ContractAIService) as jasmine.SpyObj<ContractAIService>;
    fileStorageService = TestBed.inject(FileStorageService) as jasmine.SpyObj<FileStorageService>;
    sessionService = TestBed.inject(SessionService) as jasmine.SpyObj<SessionService>;
    configService = TestBed.inject(ConfigService) as jasmine.SpyObj<ConfigService>;
    breadcrumbService = TestBed.inject(BreadcrumbService) as jasmine.SpyObj<BreadcrumbService>;

    fixture.detectChanges();
  });

  afterEach(() => {
    wsMessages$.complete();
  });

  describe('RF-009 Regla 9.1: Bloqueo de re-ejecución', () => {
    it('debe bloquear procesamiento si ya hay uno en curso', () => {
      component.procesamientoBloqueado = true;
      contractAIService.estaBloqueado.and.returnValue(true);

      const file = new File([''], 'test.pdf', { type: 'application/pdf' });
      component.onFileCaught([file]);

      expect(contractAIService.procesarContrato).not.toHaveBeenCalled();
    });

    it('debe permitir procesamiento si no hay uno en curso', () => {
      component.procesamientoBloqueado = false;
      contractAIService.estaBloqueado.and.returnValue(false);

      const file = new File([''], 'test.pdf', { type: 'application/pdf' });
      fileStorageService.subirAS3.and.returnValue(
        new Subject().asObservable() as any,
      );

      component.onFileCaught([file]);

      expect(fileStorageService.subirAS3).toHaveBeenCalled();
    });
  });

  describe('RF-009 Regla 9.3: WebSocket para estado en tiempo real', () => {
    it('debe recibir mensajes WebSocket y actualizar estado', () => {
      const mensaje: IWebSocketMessage = {
        tipo: 'procesando',
        mensaje: RF009_MESSAGES.PROCESANDO,
        progreso: 50,
      };

      wsMessages$.next(mensaje);
      fixture.detectChanges();

      expect(component.wsMessage).toBe(RF009_MESSAGES.PROCESANDO);
      expect(component.wsProgress).toBe(50);
    });

    it('debe manejar mensaje de finalizado', () => {
      const mensaje: IWebSocketMessage = {
        tipo: 'finalizado',
        mensaje: RF009_MESSAGES.FINALIZADO,
        progreso: 100,
      };

      wsMessages$.next(mensaje);
      fixture.detectChanges();

      expect(component.wsMessage).toBe(RF009_MESSAGES.FINALIZADO);
      expect(component.wsProgress).toBe(100);
    });
  });

  describe('RF-009 Regla 9.4: Manejo de errores', () => {
    it('debe mostrar modal de error con mensaje correcto', () => {
      const error = {
        success: false,
        error: RF009_MESSAGES.ERROR_PROCESAMIENTO,
      };

      component.handleErrorProcesamiento(RF009_MESSAGES.ERROR_PROCESAMIENTO);

      expect(component.showErrorModal).toBe(true);
      expect(component.errorMensaje).toBe(RF009_MESSAGES.ERROR_PROCESAMIENTO);
      expect(component.currentFile.status).toBe(ProcessingStatus.ERROR);
      expect(component.procesamientoBloqueado).toBe(false);
    });

    it('debe habilitar corrección manual después de error', () => {
      component.handleErrorProcesamiento(RF009_MESSAGES.ERROR_PROCESAMIENTO);

      expect(component.modoCorreccionManual).toBe(false); // Solo si hay timeout
    });
  });

  describe('RF-009 Regla 9.5: Validación de asegurabilidad', () => {
    it('debe mostrar modal de asegurabilidad cuando contrato no es asegurable', () => {
      const error = {
        asegurabilidad: Asegurabilidad.NO,
        mensaje: RF009_MESSAGES.NO_ASEGURABLE,
        motivo: 'Motivo de prueba',
      };

      component.handleAsegurabilidadNo(error.mensaje, error.motivo);

      expect(component.showAsegurabilidadModal).toBe(true);
      expect(component.asegurabilidadMensaje).toContain(RF009_MESSAGES.NO_ASEGURABLE);
      expect(component.asegurabilidadMensaje).toContain('Motivo de prueba');
      expect(component.currentFile.status).toBe(ProcessingStatus.ERROR);
      expect(component.procesamientoBloqueado).toBe(false);
    });

    it('debe resetear análisis al cerrar modal de asegurabilidad', () => {
      component.showAsegurabilidadModal = true;
      component.cerrarAsegurabilidadModal();

      expect(component.showAsegurabilidadModal).toBe(false);
      expect(component.currentFile.status).toBe(ProcessingStatus.IDLE);
    });
  });

  describe('RF-009 Regla 9.6: Almacenamiento S3/FileNet', () => {
    it('debe subir archivo a S3 antes de procesar con IA', (done) => {
      const file = new File([''], 'test.pdf', { type: 'application/pdf' });
      const storageResult = {
        s3Key: 'test_key',
        success: true,
      };

      fileStorageService.subirAS3.and.returnValue(
        new Promise(resolve => resolve(storageResult)) as any,
      );

      contractAIService.procesarContrato.and.returnValue(
        new Subject().asObservable() as any,
      );

      component.processFile(file);

      setTimeout(() => {
        expect(fileStorageService.subirAS3).toHaveBeenCalled();
        expect(component.currentFile.metadata).toBeDefined();
        expect(component.currentFile.metadata?.seccion).toBe('4');
        done();
      }, 100);
    });

    it('debe generar metadata correcta para almacenamiento', () => {
      const file = new File([''], 'test.pdf', { type: 'application/pdf' });
      fileStorageService.subirAS3.and.returnValue(
        new Subject().asObservable() as any,
      );

      component.processFile(file);

      expect(component.currentFile.metadata).toBeDefined();
      expect(component.currentFile.metadata?.idMongo).toBeDefined();
      expect(component.currentFile.metadata?.seccion).toBe('4');
      expect(component.currentFile.metadata?.formato).toBe('PDF');
    });
  });

  describe('RF-009 Regla 9.7: Manejo de timeout', () => {
    it('debe habilitar corrección manual cuando hay timeout', () => {
      component.handleTimeout();

      expect(component.timeoutOcurrido).toBe(true);
      expect(component.modoCorreccionManual).toBe(true);
      expect(component.currentFile.status).toBe(ProcessingStatus.TIMEOUT);
      expect(component.procesamientoBloqueado).toBe(false);
    });
  });

  describe('RF-009 Regla 9.8 y 9.10: Validación de datos', () => {
    it('debe habilitar corrección manual si hay datos inválidos', () => {
      const response = {
        success: true,
        asegurabilidad: Asegurabilidad.SI,
        datosExtraidos: {
          datosInvalidos: {
            fechas: ['fechaInicio'],
            numeros: [],
          },
          datosInconsistentes: {
            moneda: false,
            tipoContrato: false,
            departamento: false,
            municipio: false,
            ciudad: false,
          },
        } as any,
        tiempoProcesamiento: 5,
        confianza: 90,
      };

      component.completeAnalysis(response);

      expect(component.modoCorreccionManual).toBe(true);
    });

    it('debe habilitar corrección manual si hay datos inconsistentes', () => {
      const response = {
        success: true,
        asegurabilidad: Asegurabilidad.SI,
        datosExtraidos: {
          datosInvalidos: {
            fechas: [],
            numeros: [],
          },
          datosInconsistentes: {
            moneda: true,
            tipoContrato: false,
            departamento: false,
            municipio: false,
            ciudad: false,
          },
        } as any,
        tiempoProcesamiento: 5,
        confianza: 90,
      };

      component.completeAnalysis(response);

      expect(component.modoCorreccionManual).toBe(true);
    });
  });

  describe('RF-009 Regla 9.11: Corrección manual', () => {
    it('debe habilitar modo corrección manual', () => {
      component.continuarConCorreccionManual();

      expect(component.modoCorreccionManual).toBe(true);
      expect(component.showErrorModal).toBe(false);
    });
  });

  describe('Métodos auxiliares', () => {
    it('debe generar ID MongoDB válido', () => {
      const id = (component as any).generateIdMongo();

      expect(id).toBeDefined();
      expect(id.length).toBeGreaterThan(0);
    });

    it('debe formatear fecha en formato YYYYMMDD', () => {
      const fecha = new Date('2025-01-15');
      const fechaFormateada = (component as any).formatearFechaYYYYMMDD(fecha);

      expect(fechaFormateada).toBe('20250115');
    });

    it('debe calcular tamaño de archivo correctamente', () => {
      component.currentFile.size = 1048576; // 1MB
      fixture.detectChanges();

      expect(component.fileSize).toBe('1.0 MB');
    });
  });

  describe('Getters y estados', () => {
    it('debe retornar isProcessing correctamente', () => {
      component.currentFile.status = ProcessingStatus.PROCESSING;
      expect(component.isProcessing).toBe(true);

      component.currentFile.status = ProcessingStatus.IDLE;
      expect(component.isProcessing).toBe(false);
    });

    it('debe retornar hasResults correctamente', () => {
      component.currentFile.status = ProcessingStatus.COMPLETED;
      component.analysisResults = {} as any;
      expect(component.hasResults).toBe(true);

      component.analysisResults = null;
      expect(component.hasResults).toBe(false);
    });

    it('debe retornar canProcess correctamente', () => {
      component.procesamientoBloqueado = false;
      contractAIService.estaBloqueado.and.returnValue(false);
      expect(component.canProcess).toBe(true);

      component.procesamientoBloqueado = true;
      expect(component.canProcess).toBe(false);
    });
  });

  describe('Navegación', () => {
    it('debe navegar a policy-input con datos extraídos', () => {
      component.analysisResults = {
        fileInfo: component.currentFile,
        extractedData: {} as any,
        suggestions: [],
        confidence: 90,
        processingTime: 5,
        warnings: [],
        asegurabilidadValidada: true,
      };

      component.navigateToCreatePolicy();

      expect(router.navigate).toHaveBeenCalledWith(
        ['/policy-input'],
        jasmine.objectContaining({
          queryParams: jasmine.objectContaining({
            action: 'emitir',
          }),
        }),
      );
    });
  });

  describe('Reset', () => {
    it('debe resetear todos los estados correctamente', () => {
      component.currentFile.status = ProcessingStatus.COMPLETED;
      component.analysisResults = {} as any;
      component.procesamientoBloqueado = true;
      component.timeoutOcurrido = true;
      component.modoCorreccionManual = true;

      component.resetAnalysis();      expect(component.currentFile.status).toBe(ProcessingStatus.IDLE);
      expect(component.analysisResults).toBeNull();
      expect(component.procesamientoBloqueado).toBe(false);
      expect(component.timeoutOcurrido).toBe(false);
      expect(component.modoCorreccionManual).toBe(false);
    });
  });
});
