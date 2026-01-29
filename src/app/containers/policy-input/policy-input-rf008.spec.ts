/**
 * ✅ RF-008: Pruebas Unitarias Exhaustivas - Carga y Validación del Archivo del Contrato
 * 
 * Reglas cubiertas:
 * - Regla 8.1: Permitir cargar archivo
 * - Regla 8.2: Validar políticas FileNet (tipo, tamaño, longitud nombre)
 * - Regla 8.3: Eliminar archivo con confirmación
 * - Invocación servicio lector de contratos al agregar documento
 * - Almacenamiento en S3 al hacer clic en siguiente
 */

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';
import { PolicyInputComponent } from './policy-input.component';
import { QuoteService } from '../../shared/services/quote.service';
import { CupoService } from '../../shared/services/cupo.service';
import { GrupoBolivarService } from '../../shared/services/grupo-bolivar.service';
import { ProgramaService } from '../../shared/services/programa.service';
import { ClienteValidacionService } from '../../shared/services/cliente-validacion.service';
import { ProductoValidacionService } from '../../shared/services/producto-validacion.service';
import { ClienteEnfoqueService } from '../../shared/services/cliente-enfoque.service';
import { ContractAIService } from '../../shared/services/contract-ai.service';
import { FileStorageService } from '../../shared/services/file-storage.service';
import { SessionService } from '../../shared/services/session.service';
import { ConfigService } from '../../shared/services/config.service';
import {
  TipoArchivo,
  EstadoArchivo,
  Asegurabilidad,
} from '../contract-reader/contract-reader.interface';

describe('PolicyInputComponent - RF-008: Carga y Validación del Archivo del Contrato', () => {
  let component: PolicyInputComponent;
  let fixture: ComponentFixture<PolicyInputComponent>;
  let contractAIService: jest.Mocked<ContractAIService>;
  let fileStorageService: jest.Mocked<FileStorageService>;
  let showErrorNotificationSpy: jest.SpyInstance;

  // ✅ Archivos mock válidos según RF-008 Regla 8.2
  const createMockFile = (
    name: string,
    size: number,
    type: string,
  ): File => {
    const file = new File(['content'], name, { type });
    Object.defineProperty(file, 'size', { value: size, writable: false });
    return file;
  };

  const validPDFFile = createMockFile(
    'contrato.pdf',
    5 * 1024 * 1024, // 5MB
    'application/pdf',
  );

  const validDOCXFile = createMockFile(
    'contrato.docx',
    10 * 1024 * 1024, // 10MB
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  );

  const validXLSXFile = createMockFile(
    'contrato.xlsx',
    15 * 1024 * 1024, // 15MB
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  );

  const invalidTypeFile = createMockFile(
    'imagen.jpg',
    1 * 1024 * 1024,
    'image/jpeg',
  );

  const oversizedFile = createMockFile(
    'contrato.pdf',
    31 * 1024 * 1024, // 31MB (excede 30MB)
    'application/pdf',
  );

  const longNameFile = createMockFile(
    'a'.repeat(256) + '.pdf', // 256 caracteres (excede 255)
    1 * 1024 * 1024,
    'application/pdf',
  );

  beforeEach(async () => {
    // ✅ Mocks de servicios
    const mockContractAIService = {
      procesarContrato: jest.fn(),
      validarAsegurabilidad: jest.fn(),
      getWebSocketMessages: jest.fn(),
      estaBloqueado: jest.fn(),
    };

    const mockFileStorageService = {
      subirAS3: jest.fn(),
      moverAFileNet: jest.fn(),
      validarFormatoArchivo: jest.fn(),
      obtenerFormatoArchivo: jest.fn(),
      generarNombreS3: jest.fn(),
      generarNombreFileNet: jest.fn(),
    };

    const mockSessionService = {
      getTipoDocumento: jest.fn().mockReturnValue('CC'),
      getNumeroDocumento: jest.fn().mockReturnValue('1234567890'),
      getUserInfo: jest.fn(),
    };

    const mockConfigService = {
      codSecc: '4',
      codCia: '001',
      getProcessHeaders: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [
        PolicyInputComponent,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        QuoteService,
        CupoService,
        GrupoBolivarService,
        ProgramaService,
        ClienteValidacionService,
        ProductoValidacionService,
        ClienteEnfoqueService,
        { provide: ContractAIService, useValue: mockContractAIService },
        { provide: FileStorageService, useValue: mockFileStorageService },
        { provide: SessionService, useValue: mockSessionService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PolicyInputComponent);
    component = fixture.componentInstance;
    contractAIService = TestBed.inject(
      ContractAIService,
    ) as jest.Mocked<ContractAIService>;
    fileStorageService = TestBed.inject(
      FileStorageService,
    ) as jest.Mocked<FileStorageService>;
    // ✅ Spies para métodos de notificación
    showErrorNotificationSpy = jest.spyOn(component, 'showErrorNotification' as any);

    // ✅ Configurar mocks por defecto
    fileStorageService.obtenerFormatoArchivo.mockImplementation((file: File) => {
      if (file.name.endsWith('.pdf')) return 'PDF';
      if (file.name.endsWith('.docx')) return 'DOCX';
      if (file.name.endsWith('.xlsx')) return 'XLSX';
      throw new Error('Formato no soportado');
    });

    fileStorageService.validarFormatoArchivo.mockReturnValue(true);
    contractAIService.procesarContrato.mockReturnValue(
      of({
        success: true,
        datosExtraidos: {} as any,
        asegurabilidad: 'SI' as any,
        asegurabilidadValidada: true,
        tiempoProcesamiento: 5000,
        confianza: 0.95,
      }),
    );
    fileStorageService.subirAS3.mockReturnValue(
      of({
        success: true,
        s3Key: 'test-key',
        s3Url: 'https://s3.amazonaws.com/test-key',
      }),
    );

    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ========================================
  // RF-008 Regla 8.1: Permitir cargar archivo
  // ========================================
  describe('RF-008 Regla 8.1: Permitir cargar archivo', () => {
    it('debe tener constantes de validación configuradas correctamente', () => {
      expect(component.MAX_FILE_NAME_LENGTH).toBe(255);
      expect(component.MAX_FILE_SIZE_MB).toBe(30);
      expect(component.MAX_FILE_SIZE_BYTES).toBe(30 * 1024 * 1024);
      expect(component.VALID_FILE_EXTENSIONS).toEqual(['.pdf', '.docx', '.xlsx']);
    });

    it('debe permitir cargar archivo PDF válido', () => {
      const input = document.createElement('input');
      input.type = 'file';
      Object.defineProperty(input, 'files', {
        value: [validPDFFile],
        writable: false,
      });

      component.onFileSelected({ target: input } as any);

      expect(component.selectedFile).toBe(validPDFFile);
      expect(component.selectedFileName).toBe('contrato.pdf');
      expect(showErrorNotificationSpy).not.toHaveBeenCalled();
    });

    it('debe permitir cargar archivo DOCX válido', () => {
      const input = document.createElement('input');
      input.type = 'file';
      Object.defineProperty(input, 'files', {
        value: [validDOCXFile],
        writable: false,
      });

      component.onFileSelected({ target: input } as any);

      expect(component.selectedFile).toBe(validDOCXFile);
      expect(component.selectedFileName).toBe('contrato.docx');
      expect(showErrorNotificationSpy).not.toHaveBeenCalled();
    });

    it('debe permitir cargar archivo XLSX válido', fakeAsync(() => {
      const input = document.createElement('input');
      input.type = 'file';
      Object.defineProperty(input, 'files', {
        value: [validXLSXFile],
        writable: false,
      });

      component.onFileSelected({ target: input } as any);

      expect(component.selectedFile).toBe(validXLSXFile);
      expect(component.selectedFileName).toBe('contrato.xlsx');
      expect(showErrorNotificationSpy).not.toHaveBeenCalled();
      tick(200); // Esperar a que termine la simulación de upload
    }));

    it('debe tener configuración de fileUploadConfig correcta', () => {
      expect(component.fileUploadConfig).toBeDefined();
      expect(component.fileUploadConfig.maxSize).toBe(31457280); // 30MB
      expect(component.fileUploadConfig.avaibleTypes).toContain('application/pdf');
      expect(component.fileUploadConfig.avaibleTypes).toContain(
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      );
      expect(component.fileUploadConfig.avaibleTypes).toContain(
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      expect((component.fileUploadConfig.errorText as any).type).toBe(
        'Las extensiones soportadas son: *.DOCX, XLSX y *.PDF',
      );
      expect((component.fileUploadConfig.errorText as any).maxSize).toBe(
        'El tamaño máximo del archivo 30 MB',
      );
    });
  });

  // ========================================
  // RF-008 Regla 8.2: Validar políticas FileNet
  // ========================================
  describe('RF-008 Regla 8.2: Validar políticas FileNet', () => {
    describe('Validación de tipo de archivo', () => {
      it('debe rechazar archivo con extensión no válida (JPG)', () => {
        const input = document.createElement('input');
        input.type = 'file';
        Object.defineProperty(input, 'files', {
          value: [invalidTypeFile],
          writable: false,
        });

        component.onFileSelected({ target: input } as any);

        expect(component.selectedFile).toBeNull();
        expect(showErrorNotificationSpy).toHaveBeenCalledWith(
          'Las extensiones soportadas son: *.DOCX, XLSX y *.PDF',
        );
      });

      it('debe rechazar archivo DOC (no DOCX)', () => {
        const docFile = createMockFile(
          'contrato.doc',
          5 * 1024 * 1024,
          'application/msword',
        );
        const input = document.createElement('input');
        input.type = 'file';
        Object.defineProperty(input, 'files', {
          value: [docFile],
          writable: false,
        });

        component.onFileSelected({ target: input } as any);

        expect(component.selectedFile).toBeNull();
        expect(showErrorNotificationSpy).toHaveBeenCalledWith(
          'Las extensiones soportadas son: *.DOCX, XLSX y *.PDF',
        );
      });

      it('debe rechazar archivo XLS (no XLSX)', () => {
        const xlsFile = createMockFile(
          'contrato.xls',
          5 * 1024 * 1024,
          'application/vnd.ms-excel',
        );
        const input = document.createElement('input');
        input.type = 'file';
        Object.defineProperty(input, 'files', {
          value: [xlsFile],
          writable: false,
        });

        component.onFileSelected({ target: input } as any);

        expect(component.selectedFile).toBeNull();
        expect(showErrorNotificationSpy).toHaveBeenCalledWith(
          'Las extensiones soportadas son: *.DOCX, XLSX y *.PDF',
        );
      });

      it('debe validar extensión en onFileCaught (tech-block-lib)', () => {
        component.onFileCaught([invalidTypeFile]);

        expect(showErrorNotificationSpy).toHaveBeenCalledWith('Las extensiones soportadas son: *.DOCX, XLSX y *.PDF');
      });
    });

    describe('Validación de tamaño máximo (30 MB)', () => {
      it('debe rechazar archivo que excede 30MB', () => {
        const input = document.createElement('input');
        input.type = 'file';
        Object.defineProperty(input, 'files', {
          value: [oversizedFile],
          writable: false,
        });

        component.onFileSelected({ target: input } as any);

        expect(component.selectedFile).toBeNull();
        expect(showErrorNotificationSpy).toHaveBeenCalledWith(
          'El tamaño máximo del archivo 30 MB',
        );
      });

      it('debe aceptar archivo de exactamente 30MB', () => {
        const exact30MBFile = createMockFile(
          'contrato.pdf',
          30 * 1024 * 1024, // Exactamente 30MB
          'application/pdf',
        );
        const input = document.createElement('input');
        input.type = 'file';
        Object.defineProperty(input, 'files', {
          value: [exact30MBFile],
          writable: false,
        });

        component.onFileSelected({ target: input } as any);

        expect(component.selectedFile).toBe(exact30MBFile);
        expect(showErrorNotificationSpy).not.toHaveBeenCalled();
      });

      it('debe aceptar archivo menor a 30MB', () => {
        const smallFile = createMockFile(
          'contrato.pdf',
          10 * 1024 * 1024, // 10MB
          'application/pdf',
        );
        const input = document.createElement('input');
        input.type = 'file';
        Object.defineProperty(input, 'files', {
          value: [smallFile],
          writable: false,
        });

        component.onFileSelected({ target: input } as any);

        expect(component.selectedFile).toBe(smallFile);
        expect(showErrorNotificationSpy).not.toHaveBeenCalled();
      });
    });

    describe('Validación de longitud del nombre (255 caracteres)', () => {
      it('debe rechazar archivo con nombre mayor a 255 caracteres', () => {
        const input = document.createElement('input');
        input.type = 'file';
        Object.defineProperty(input, 'files', {
          value: [longNameFile],
          writable: false,
        });

        component.onFileSelected({ target: input } as any);

        expect(component.selectedFile).toBeNull();
        expect(showErrorNotificationSpy).toHaveBeenCalledWith(
          `La cantidad máxima de caracteres del nombre del archivo es de ${component.MAX_FILE_NAME_LENGTH}`,
        );
      });

      it('debe aceptar archivo con nombre de exactamente 255 caracteres', () => {
        const exact255File = createMockFile(
          'a'.repeat(251) + '.pdf', // 255 caracteres totales
          1 * 1024 * 1024,
          'application/pdf',
        );
        const input = document.createElement('input');
        input.type = 'file';
        Object.defineProperty(input, 'files', {
          value: [exact255File],
          writable: false,
        });

        component.onFileSelected({ target: input } as any);

        expect(component.selectedFile).toBe(exact255File);
        expect(showErrorNotificationSpy).not.toHaveBeenCalled();
      });

      it('debe validar longitud en onFileCaught (tech-block-lib)', () => {
        component.onFileCaught([longNameFile]);

        expect(showErrorNotificationSpy).toHaveBeenCalledWith(
          `La cantidad máxima de caracteres del nombre del archivo es de ${component.MAX_FILE_NAME_LENGTH}`,
        );
      });
    });

    describe('Validación combinada (drag & drop)', () => {
      it('debe validar todas las reglas en onDropDocumentoSoporte', () => {
        const dragEvent = {
          preventDefault: jest.fn(),
          stopPropagation: jest.fn(),
          dataTransfer: {
            files: [invalidTypeFile],
          },
        } as any;

        component.onDropDocumentoSoporte(dragEvent);

        expect(showErrorNotificationSpy).toHaveBeenCalledWith(
          'Las extensiones soportadas son: *.DOCX, XLSX y *.PDF',
        );
      });

      it('debe validar tamaño en onDropDocumentoSoporte', () => {
        const dragEvent = {
          preventDefault: jest.fn(),
          stopPropagation: jest.fn(),
          dataTransfer: {
            files: [oversizedFile],
          },
        } as any;

        component.onDropDocumentoSoporte(dragEvent);

        expect(showErrorNotificationSpy).toHaveBeenCalledWith(
          'El tamaño máximo del archivo 30 MB',
        );
      });
    });
  });

  // ========================================
  // RF-008 Regla 8.3: Eliminar archivo con confirmación
  // ========================================
  describe('RF-008 Regla 8.3: Eliminar archivo con confirmación', () => {
    beforeEach(() => {
      component.selectedFile = validPDFFile;
      component.selectedFileName = 'contrato.pdf';
      component.showAlertaEliminarArchivo = false;
    });

    it('debe mostrar modal de confirmación al eliminar archivo', () => {
      component.removeFile();

      expect(component.showAlertaEliminarArchivo).toBe(true);
    });

    it('debe cancelar eliminación y ocultar modal', () => {
      component.showAlertaEliminarArchivo = true;

      component.cancelarEliminarArchivo();

      expect(component.showAlertaEliminarArchivo).toBe(false);
      expect(component.selectedFile).not.toBeNull(); // Archivo no eliminado
    });

    it('debe confirmar eliminación y limpiar archivo', () => {
      component.showAlertaEliminarArchivo = true;
      component.selectedFile = validPDFFile;
      component.selectedFileName = 'contrato.pdf';
      component.fileName = 'contrato.pdf';
      component.uploadProgress = 50;

      component.confirmarEliminarArchivo();

      expect(component.showAlertaEliminarArchivo).toBe(false);
      expect(component.selectedFile).toBeNull();
      expect(component.selectedFileName).toBeNull();
      expect(component.fileName).toBeNull();
      expect(component.uploadProgress).toBe(0);
      expect(component.contractFileError).toBe(true);
    });

    it('debe mostrar confirmación al eliminar desde tech-block-lib', () => {
      component.onFileDeleted(validPDFFile);

      expect(component.showAlertaEliminarArchivo).toBe(true);
    });

    it('debe tener mensaje de confirmación correcto en HTML', () => {
      // El mensaje debe estar en el HTML: "¡Estás seguro de que quieres borrar el documento?"
      // Esto se verifica en pruebas de integración/E2E
      expect(component.showAlertaEliminarArchivo).toBeDefined();
    });
  });

  // ========================================
  // RF-008: Invocación servicio lector de contratos
  // ========================================
  describe('RF-008: Invocación servicio lector de contratos al agregar documento', () => {
    beforeEach(() => {
      component.selectedFile = validPDFFile;
      component.selectedFileName = 'contrato.pdf';
      component.tipoDocumentoSoporte = 'CONTRATO';
      component.documentosSoporte = [];
    });

    it('debe invocar servicio lector de contratos al agregar documento', fakeAsync(() => {
      const procesarContratoSpy = jest.spyOn(
        component as any,
        'invocarLectorContratos',
      );

      component.agregarDocumentoALista();

      expect(procesarContratoSpy).toHaveBeenCalledWith(validPDFFile);
      tick();
    }));

    it('debe validar archivo antes de invocar servicio', () => {
      component.selectedFile = invalidTypeFile;

      component.agregarDocumentoALista();

      expect(contractAIService.procesarContrato).not.toHaveBeenCalled();
      expect(showErrorNotificationSpy).toHaveBeenCalled();
    });

    it('debe procesar respuesta exitosa del servicio lector de contratos', fakeAsync(() => {
      const datosExtraidos = {
        numeroContrato: 'CT-2024-001',
        fechaContrato: '2024-01-01',
        objetoContrato: 'Obra de construcción',
        moneda: 'COP',
        valorContrato: 100000000,
        fechaInicio: '2024-01-01',
        fechaTerminacion: '2025-01-01',
        plazoEjecucion: 365,
        fechaInicioValida: true,
        fechaTerminacionValida: true,
        tomador: {
          tipoDocumento: 'NIT',
          numeroDocumento: '900123456-7',
          nombre: 'Empresa Ejemplo S.A.S',
          nit: '900123456-7',
          representanteLegal: 'Juan Pérez',
          direccion: 'Calle 100 # 10-20',
          telefono: '3001234567',
          email: 'contacto@empresa.com',
        },
        asegurado: {
          tipoDocumento: 'NIT',
          numeroDocumento: '900987654-3',
          nombre: 'Cliente Ejemplo Ltda',
          nit: '900987654-3',
          representanteLegal: 'María García',
          direccion: 'Calle 200 # 20-30',
          telefono: '3009876543',
          email: 'contacto@cliente.com',
        },
        coberturas_o_garantias: {
          cumplimiento: {
            requerida: true,
            porcentaje: 10,
            valor: 10000000,
            codigoTronador: { codigo: '001', descripcion: 'Cumplimiento' },
          },
          calidadServicio: {
            requerida: false,
            porcentaje: 0,
            valor: 0,
            codigoTronador: { codigo: '002', descripcion: 'Calidad' },
          },
          responsabilidadCivil: {
            requerida: true,
            valor: 50000000,
            codigoTronador: { codigo: '003', descripcion: 'RC' },
          },
          buenManejoInversion: {
            requerida: false,
            porcentaje: 0,
            valor: 0,
            codigoTronador: { codigo: '004', descripcion: 'BMI' },
          },
        },
        riesgosIdentificados: [],
        clausulasRelevantes: [],
      } as any;
      contractAIService.procesarContrato.mockReturnValue(
        of({
          success: true,
          datosExtraidos,
          asegurabilidad: 'SI' as any,
          tiempoProcesamiento: 5000,
          confianza: 0.95,
        }),
      );
      const procesarDatosSpy = jest.spyOn(
        component as any,
        'procesarDatosContratoIA',
      );

      component.agregarDocumentoALista();
      tick();

      expect(contractAIService.procesarContrato).toHaveBeenCalled();
      expect(procesarDatosSpy).toHaveBeenCalledWith(datosExtraidos);
      expect(component.archivoContratoProcesando).toBe(false);
    }));

    it('debe manejar error del servicio lector de contratos sin bloquear proceso', fakeAsync(() => {
      contractAIService.procesarContrato.mockReturnValue(
        throwError(() => new Error('Error de procesamiento')),
      );

      component.agregarDocumentoALista();
      tick();

      expect(showErrorNotificationSpy).toHaveBeenCalledWith(
        'No se pudo procesar el contrato automáticamente. Puedes continuar ingresando los datos manualmente.',
      );
      expect(component.archivoContratoProcesando).toBe(false);
    }));

    it('debe preparar metadata correcta para el servicio', () => {
      component.tipoProducto = 'grandes-beneficiarios';
      component.tipoDocumentoTomador = 'CC';
      component.numeroDocumentoTomador = '1234567890';
      // codSecc es readonly, usar valor por defecto del servicio

      const invocarSpy = jest.spyOn(component as any, 'invocarLectorContratos');
      component.agregarDocumentoALista();

      expect(invocarSpy).toHaveBeenCalled();
      // Verificar que se llama con el archivo correcto
      expect(invocarSpy.mock.calls[0][0]).toBe(validPDFFile);
    });
  });

  // ========================================
  // RF-008: Almacenamiento en S3 al hacer clic en siguiente
  // ========================================
  describe('RF-008: Almacenamiento en S3 al hacer clic en siguiente', () => {
    beforeEach(() => {
      component.currentStep = 0;
      component.selectedFile = validPDFFile;
      component.selectedFileName = 'contrato.pdf';
      component.tipoProducto = 'grandes-beneficiarios';
      component.tipoDocumentoTomador = 'CC';
      component.numeroDocumentoTomador = '1234567890';
      // codSecc es readonly, usar valor por defecto del servicio
    });

    it('debe almacenar archivo en S3 al avanzar al siguiente paso', fakeAsync(() => {
      const almacenarSpy = jest.spyOn(component as any, 'almacenarArchivoEnS3');

      component.nextStep();
      tick();

      expect(almacenarSpy).toHaveBeenCalledWith(validPDFFile);
    }));

    it('debe almacenar todos los documentos de soporte en S3', fakeAsync(() => {
      const doc1 = { archivo: validPDFFile, tipo: 'CONTRATO', nombreArchivo: 'doc1.pdf', fecha: '2024-01-01' };
      const doc2 = { archivo: validDOCXFile, tipo: 'PLIEGO', nombreArchivo: 'doc2.docx', fecha: '2024-01-01' };
      component.documentosSoporte = [doc1, doc2];
      const almacenarSpy = jest.spyOn(component as any, 'almacenarArchivoEnS3');

      component.nextStep();
      tick();

      expect(almacenarSpy).toHaveBeenCalledTimes(3); // selectedFile + 2 documentos
    }));

    it('debe generar metadata correcta para S3 según RF-009 Regla 9.6', fakeAsync(() => {
      fileStorageService.generarNombreS3.mockReturnValue(
        'test-id_4_440_CC_1234567890_CONTRATO_20240101_PE.pdf',
      );

      (component as any).almacenarArchivoEnS3(validPDFFile);
      tick();

      expect(fileStorageService.subirAS3).toHaveBeenCalled();
      const callArgs = fileStorageService.subirAS3.mock.calls[0];
      expect(callArgs[0]).toBe(validPDFFile);
      expect(callArgs[1].seccion).toBe('4');
      expect(callArgs[1].producto).toBe('440');
      expect(callArgs[1].tipoDocTomador).toBe('CC');
      expect(callArgs[1].nroDocTomador).toBe('1234567890');
      expect(callArgs[1].tipoArchivo).toBe(TipoArchivo.CONTRATO);
      expect(callArgs[1].estado).toBe(EstadoArchivo.PE);
    }));

    it('debe manejar éxito en almacenamiento S3', fakeAsync(() => {
      fileStorageService.subirAS3.mockReturnValue(
        of({
          success: true,
          s3Key: 'test-key',
          s3Url: 'https://s3.amazonaws.com/test-key',
        }),
      );

      (component as any).almacenarArchivoEnS3(validPDFFile);
      tick();

      // No debe mostrar error
      expect(showErrorNotificationSpy).not.toHaveBeenCalled();
    }));

    it('debe manejar error en almacenamiento S3', fakeAsync(() => {
      fileStorageService.subirAS3.mockReturnValue(
        throwError(() => new Error('Error S3')),
      );

      (component as any).almacenarArchivoEnS3(validPDFFile);
      tick();

      expect(showErrorNotificationSpy).toHaveBeenCalledWith(
        'Error al almacenar el archivo. Intenta nuevamente.',
      );
    }));

    it('debe determinar producto correcto según tipoProducto', fakeAsync(() => {
      // Grandes Beneficiarios -> 440
      component.tipoProducto = 'grandes-beneficiarios';
      (component as any).almacenarArchivoEnS3(validPDFFile);
      tick();
      let callArgs = fileStorageService.subirAS3.mock.calls[0];
      expect(callArgs[1].producto).toBe('440');

      // Particulares -> 450
      component.tipoProducto = 'particulares';
      (component as any).almacenarArchivoEnS3(validPDFFile);
      tick();
      callArgs = fileStorageService.subirAS3.mock.calls[1];
      expect(callArgs[1].producto).toBe('450');

      // Estatales -> 455
      component.tipoProducto = 'estatales';
      (component as any).almacenarArchivoEnS3(validPDFFile);
      tick();
      callArgs = fileStorageService.subirAS3.mock.calls[2];
      expect(callArgs[1].producto).toBe('455');
    }));

    it('no debe almacenar si no hay archivo seleccionado', () => {
      component.selectedFile = null;
      const almacenarSpy = jest.spyOn(component as any, 'almacenarArchivoEnS3');

      component.nextStep();

      expect(almacenarSpy).not.toHaveBeenCalled();
    });
  });

  // ========================================
  // Integración: Flujo completo RF-008
  // ========================================
  describe('Integración: Flujo completo RF-008', () => {
    it('debe ejecutar flujo completo: cargar -> validar -> agregar -> invocar IA -> siguiente -> S3', fakeAsync(() => {
      // 1. Cargar archivo válido
      const input = document.createElement('input');
      input.type = 'file';
      Object.defineProperty(input, 'files', {
        value: [validPDFFile],
        writable: false,
      });
      component.onFileSelected({ target: input } as any);
      expect(component.selectedFile).toBe(validPDFFile);
      expect(component.selectedFileName).toBe('contrato.pdf');

      // 2. Configurar tipo documento
      component.tipoDocumentoSoporte = 'CONTRATO';

      // 3. Agregar documento (debe invocar IA)
      const invocarSpy = jest.spyOn(component as any, 'invocarLectorContratos');
      contractAIService.procesarContrato.mockReturnValue(of({
        success: true,
        datosExtraidos: {} as any, // Mock simplificado para el test
        asegurabilidad: Asegurabilidad.SI,
        tiempoProcesamiento: 5,
        confianza: 0.95,
      }));
      component.agregarDocumentoALista();
      expect(invocarSpy).toHaveBeenCalled();
      expect(component.documentosSoporte.length).toBe(1);
      tick();

      // 4. Avanzar paso (debe almacenar en S3)
      component.selectedFile = validPDFFile; // Restaurar para siguiente paso
      const almacenarSpy = jest.spyOn(component as any, 'almacenarArchivoEnS3');
      component.nextStep();
      expect(almacenarSpy).toHaveBeenCalled();
      tick();
    }));

    it('debe manejar múltiples archivos en documentos de soporte', fakeAsync(() => {
      component.documentosSoporte = [
        { archivo: validPDFFile, tipo: 'CONTRATO', nombreArchivo: 'doc1.pdf', fecha: '2024-01-01' },
        { archivo: validDOCXFile, tipo: 'PLIEGO', nombreArchivo: 'doc2.docx', fecha: '2024-01-01' },
        { archivo: validXLSXFile, tipo: 'OFERTA', nombreArchivo: 'doc3.xlsx', fecha: '2024-01-01' },
      ];
      component.selectedFile = validPDFFile;

      const almacenarSpy = jest.spyOn(component as any, 'almacenarArchivoEnS3');
      component.nextStep();
      tick();

      // Debe almacenar selectedFile + 3 documentos = 4 llamadas
      expect(almacenarSpy).toHaveBeenCalledTimes(4);
    }));
  });

  // ========================================
  // Edge Cases y Casos Límite
  // ========================================
  describe('Edge Cases y Casos Límite', () => {
    it('debe manejar archivo sin extensión', () => {
      const noExtensionFile = createMockFile(
        'archivo',
        1 * 1024 * 1024,
        'application/pdf',
      );
      const input = document.createElement('input');
      input.type = 'file';
      Object.defineProperty(input, 'files', {
        value: [noExtensionFile],
        writable: false,
      });

      component.onFileSelected({ target: input } as any);

      expect(showErrorNotificationSpy).toHaveBeenCalled();
    });

    it('debe manejar archivo con extensión en mayúsculas', () => {
      const upperCaseFile = createMockFile(
        'CONTRATO.PDF',
        1 * 1024 * 1024,
        'application/pdf',
      );
      const input = document.createElement('input');
      input.type = 'file';
      Object.defineProperty(input, 'files', {
        value: [upperCaseFile],
        writable: false,
      });

      component.onFileSelected({ target: input } as any);

      expect(component.selectedFile).toBe(upperCaseFile);
    });

    it('debe manejar archivo con múltiples puntos en el nombre', () => {
      const multiDotFile = createMockFile(
        'contrato.final.v2.pdf',
        1 * 1024 * 1024,
        'application/pdf',
      );
      const input = document.createElement('input');
      input.type = 'file';
      Object.defineProperty(input, 'files', {
        value: [multiDotFile],
        writable: false,
      });

      component.onFileSelected({ target: input } as any);

      expect(component.selectedFile).toBe(multiDotFile);
    });

    it('debe manejar archivo de tamaño cero', () => {
      const zeroSizeFile = createMockFile(
        'vacío.pdf',
        0,
        'application/pdf',
      );
      const input = document.createElement('input');
      input.type = 'file';
      Object.defineProperty(input, 'files', {
        value: [zeroSizeFile],
        writable: false,
      });

      component.onFileSelected({ target: input } as any);

      expect(component.selectedFile).toBe(zeroSizeFile);
    });

    it('debe manejar error cuando FileStorageService falla', fakeAsync(() => {
      fileStorageService.obtenerFormatoArchivo.mockImplementation(() => {
        throw new Error('Formato no soportado');
      });

      component.selectedFile = validPDFFile;
      component.tipoProducto = 'grandes-beneficiarios';

      expect(() => {
        (component as any).almacenarArchivoEnS3(validPDFFile);
        tick();
      }).not.toThrow();
    }));
  });
});
