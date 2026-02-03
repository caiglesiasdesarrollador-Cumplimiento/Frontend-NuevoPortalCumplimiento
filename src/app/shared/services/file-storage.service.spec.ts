/**
 * ✅ RF-009 Regla 9.6: Pruebas unitarias para FileStorageService
 */

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FileStorageService } from './file-storage.service';
import {
  IFileStorageMetadata,
  TipoArchivo,
  EstadoArchivo,
} from '../../containers/contract-reader/contract-reader.interface';

describe('FileStorageService', () => {
  let service: FileStorageService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FileStorageService],
    });

    service = TestBed.inject(FileStorageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('generarNombreS3', () => {
    it('debe generar nombre S3 correcto según RF-009 Regla 9.6', () => {
      const metadata: IFileStorageMetadata = {
        idMongo: '692dde408650fb88a657846d',
        seccion: '4',
        producto: '450',
        tipoDocTomador: 'NT',
        nroDocTomador: '900442526',
        tipoArchivo: TipoArchivo.CONTRATO,
        fecha: '20251226',
        estado: EstadoArchivo.PE,
        formato: 'PDF',
      };

      const nombre = service.generarNombreS3(metadata);

      expect(nombre).toBe(
        '692dde408650fb88a657846d_4_450_NT_900442526_CONTRATO_20251226_PE.pdf',
      );
    });

    it('debe manejar diferentes formatos de archivo', () => {
      const metadata: IFileStorageMetadata = {
        idMongo: '123456789',
        seccion: '4',
        producto: '440',
        tipoDocTomador: 'CC',
        nroDocTomador: '1234567890',
        tipoArchivo: TipoArchivo.PLIEGO_LICITATORIO,
        fecha: '20250101',
        estado: EstadoArchivo.TE,
        formato: 'DOCX',
      };

      const nombre = service.generarNombreS3(metadata);

      expect(nombre).toBe('123456789_4_440_CC_1234567890_PLIEGO_LICITATORIO_20250101_TE.docx');
    });
  });

  describe('generarNombreFileNet', () => {
    it('debe generar nombre FileNet correcto según RF-009 Regla 9.6', () => {
      const metadata: IFileStorageMetadata = {
        idMongo: '692dde408650fb88a657846d',
        seccion: '4',
        producto: '450',
        tipoDocTomador: 'NT',
        nroDocTomador: '900442526',
        tipoArchivo: TipoArchivo.CONTRATO,
        fecha: '20251226',
        estado: EstadoArchivo.PE,
        formato: 'PDF',
        numeroPoliza: 'POL-2024-001',
      };

      const nombre = service.generarNombreFileNet(metadata);

      expect(nombre).toBe('4_450_POL-2024-001_NT_900442526_CONTRATO');
    });

    it('debe lanzar error si falta numeroPoliza', () => {
      const metadata: IFileStorageMetadata = {
        idMongo: '123',
        seccion: '4',
        producto: '440',
        tipoDocTomador: 'CC',
        nroDocTomador: '123',
        tipoArchivo: TipoArchivo.CONTRATO,
        fecha: '20250101',
        estado: EstadoArchivo.PE,
        formato: 'PDF',
      };

      expect(() => service.generarNombreFileNet(metadata)).toThrow(
        'El número de póliza es requerido para FileNet',
      );
    });
  });

  describe('validarFormatoArchivo', () => {
    it('debe validar PDF correctamente', () => {
      const file = new File([''], 'test.pdf', { type: 'application/pdf' });
      expect(service.validarFormatoArchivo(file)).toBe(true);
    });

    it('debe validar DOC correctamente', () => {
      const file = new File([''], 'test.doc', { type: 'application/msword' });
      expect(service.validarFormatoArchivo(file)).toBe(true);
    });

    it('debe validar DOCX correctamente', () => {
      const file = new File([''], 'test.docx', {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
      expect(service.validarFormatoArchivo(file)).toBe(true);
    });

    it('debe rechazar formatos no válidos', () => {
      const file = new File([''], 'test.txt', { type: 'text/plain' });
      expect(service.validarFormatoArchivo(file)).toBe(false);
    });
  });

  describe('obtenerFormatoArchivo', () => {
    it('debe retornar PDF para archivos PDF', () => {
      const file = new File([''], 'test.pdf', { type: 'application/pdf' });
      expect(service.obtenerFormatoArchivo(file)).toBe('PDF');
    });

    it('debe retornar DOCX para archivos DOCX', () => {
      const file = new File([''], 'test.docx', {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
      expect(service.obtenerFormatoArchivo(file)).toBe('DOCX');
    });

    it('debe retornar DOC para archivos DOC', () => {
      const file = new File([''], 'test.doc', { type: 'application/msword' });
      expect(service.obtenerFormatoArchivo(file)).toBe('DOC');
    });

    it('debe lanzar error para formatos no soportados', () => {
      const file = new File([''], 'test.txt', { type: 'text/plain' });
      expect(() => service.obtenerFormatoArchivo(file)).toThrow(
        'Formato de archivo no soportado',
      );
    });
  });

  describe('subirAS3', () => {
    it('debe subir archivo a S3 con metadata correcta', (done) => {
      const file = new File(['contenido'], 'test.pdf', { type: 'application/pdf' });
      const metadata: IFileStorageMetadata = {
        idMongo: '123',
        seccion: '4',
        producto: '440',
        tipoDocTomador: 'CC',
        nroDocTomador: '123',
        tipoArchivo: TipoArchivo.CONTRATO,
        fecha: '20250101',
        estado: EstadoArchivo.PE,
        formato: 'PDF',
      };

      service.subirAS3(file, metadata).subscribe({
        next: result => {
          expect(result.success).toBe(true);
          expect(result.s3Key).toContain('123_4_440_CC_123_CONTRATO_20250101_PE.pdf');
          done();
        },
        error: done.fail,
      });
    });
  });

  describe('moverS3AFileNet', () => {
    it('debe mover archivo de S3 a FileNet correctamente', (done) => {
      const s3Key = '123_4_440_CC_123_CONTRATO_20250101_PE.pdf';
      const metadata: IFileStorageMetadata = {
        idMongo: '123',
        seccion: '4',
        producto: '440',
        tipoDocTomador: 'CC',
        nroDocTomador: '123',
        tipoArchivo: TipoArchivo.CONTRATO,
        fecha: '20250101',
        estado: EstadoArchivo.TE,
        formato: 'PDF',
        numeroPoliza: 'POL-001',
      };

      service.moverS3AFileNet(s3Key, metadata).subscribe({
        next: result => {
          expect(result.success).toBe(true);
          expect(result.fileNetId).toContain('4_440_POL-001_CC_123_CONTRATO');
          done();
        },
        error: done.fail,
      });
    });

    it('debe lanzar error si falta numeroPoliza', (done) => {
      const s3Key = '123.pdf';
      const metadata: IFileStorageMetadata = {
        idMongo: '123',
        seccion: '4',
        producto: '440',
        tipoDocTomador: 'CC',
        nroDocTomador: '123',
        tipoArchivo: TipoArchivo.CONTRATO,
        fecha: '20250101',
        estado: EstadoArchivo.PE,
        formato: 'PDF',
      };

      service.moverS3AFileNet(s3Key, metadata).subscribe({
        next: () => done.fail('Debe lanzar error'),
        error: error => {
          expect(error.message).toContain('número de póliza es requerido');
          done();
        },
      });
    });
  });
});
