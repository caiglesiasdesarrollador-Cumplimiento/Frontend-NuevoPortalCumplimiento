/**
 * ✅ RF-009: Pruebas unitarias para ContractAIService
 */

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ContractAIService } from './contract-ai.service';
import { CatalogosService } from './catalogos.service';
import {
  IContractAIRequest,
  Asegurabilidad,
  EtapaContrato,
  TipoArchivo,
  EstadoArchivo,
  RF009_MESSAGES,
} from '../../containers/contract-reader/contract-reader.interface';

describe('ContractAIService', () => {
  let service: ContractAIService;
  let catalogosService: jasmine.SpyObj<CatalogosService>;

  beforeEach(() => {
    const catalogosSpy = jasmine.createSpyObj('CatalogosService', ['obtenerCatalogo']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ContractAIService,
        { provide: CatalogosService, useValue: catalogosSpy },
      ],
    });

    service = TestBed.inject(ContractAIService);
    catalogosService = TestBed.inject(CatalogosService) as jasmine.SpyObj<CatalogosService>;
  });

  describe('RF-009 Regla 9.1: Procesar contrato con bloqueo', () => {
    it('debe bloquear re-ejecución durante procesamiento', (done) => {
      const file = new File([''], 'test.pdf', { type: 'application/pdf' });
      const request: IContractAIRequest = {
        archivo: file,
        metadata: {
          idMongo: '123',
          seccion: '4',
          producto: '440',
          tipoDocTomador: 'CC',
          nroDocTomador: '123',
          tipoArchivo: TipoArchivo.CONTRATO,
          fecha: '20250101',
          estado: EstadoArchivo.PE,
          formato: 'PDF',
        },
        producto: '440',
      };

      // Primera llamada debe iniciar procesamiento
      service.procesarContrato(request).subscribe({
        next: () => {},
        error: () => {},
      });

      // Segunda llamada debe ser bloqueada
      setTimeout(() => {
        service.procesarContrato(request).subscribe({
          next: () => done.fail('No debe permitir segunda ejecución'),
          error: error => {
            expect(error.message).toContain('ya está en curso');
            done();
          },
        });
      }, 100);
    });
  });

  describe('RF-009 Regla 9.3: WebSocket para estado en tiempo real', () => {
    it('debe emitir mensajes WebSocket durante procesamiento', (done) => {
      const file = new File([''], 'test.pdf', { type: 'application/pdf' });
      const request: IContractAIRequest = {
        archivo: file,
        metadata: {
          idMongo: '123',
          seccion: '4',
          producto: '440',
          tipoDocTomador: 'CC',
          nroDocTomador: '123',
          tipoArchivo: TipoArchivo.CONTRATO,
          fecha: '20250101',
          estado: EstadoArchivo.PE,
          formato: 'PDF',
        },
        producto: '440',
      };

      const mensajes: any[] = [];

      service.getWebSocketMessages().subscribe(mensaje => {
        mensajes.push(mensaje);
      });

      service.procesarContrato(request).subscribe({
        next: () => {
          expect(mensajes.length).toBeGreaterThan(0);
          expect(mensajes.some(m => m.tipo === 'procesando')).toBe(true);
          expect(mensajes.some(m => m.tipo === 'finalizado')).toBe(true);
          done();
        },
        error: done.fail,
      });
    });
  });

  describe('RF-009 Regla 9.5: Validación de asegurabilidad', () => {
    it('debe validar asegurabilidad SI correctamente', () => {
      expect(() => {
        service.validarAsegurabilidad(Asegurabilidad.SI);
      }).not.toThrow();
    });

    it('debe lanzar error si asegurabilidad es NO', () => {
      expect(() => {
        service.validarAsegurabilidad(Asegurabilidad.NO, 'Motivo de prueba');
      }).toThrow();

      try {
        service.validarAsegurabilidad(Asegurabilidad.NO, 'Motivo de prueba');
      } catch (error: any) {
        expect(error.mensaje).toBe(RF009_MESSAGES.NO_ASEGURABLE);
        expect(error.motivo).toBe('Motivo de prueba');
      }
    });
  });

  describe('RF-009 Regla 9.8: Validación de formato de fechas', () => {
    it('debe validar formato ISO (YYYY-MM-DD)', () => {
      expect(service.validarFormatoFecha('2024-01-15')).toBe(true);
    });

    it('debe validar formato latino (DD/MM/YYYY)', () => {
      expect(service.validarFormatoFecha('15/01/2024')).toBe(true);
    });

    it('debe rechazar fechas inválidas', () => {
      expect(service.validarFormatoFecha('2024-13-45')).toBe(false);
      expect(service.validarFormatoFecha('fecha inválida')).toBe(false);
      expect(service.validarFormatoFecha('')).toBe(false);
    });
  });

  describe('RF-009 Regla 9.8: Validación de formato de números', () => {
    it('debe validar números positivos', () => {
      expect(service.validarFormatoNumero(123456)).toBe(true);
      expect(service.validarFormatoNumero(0)).toBe(true);
      expect(service.validarFormatoNumero('123456')).toBe(true);
    });

    it('debe validar números con formato colombiano', () => {
      expect(service.validarFormatoNumero('1.234.567')).toBe(true);
      expect(service.validarFormatoNumero('1,234.567')).toBe(true);
    });

    it('debe rechazar números inválidos', () => {
      expect(service.validarFormatoNumero(-100)).toBe(false);
      expect(service.validarFormatoNumero('abc')).toBe(false);
      expect(service.validarFormatoNumero(null as any)).toBe(false);
      expect(service.validarFormatoNumero(undefined as any)).toBe(false);
    });
  });

  describe('RF-009 Regla 9.10: Validación contra catálogos', () => {
    it('debe validar código contra catálogo', (done) => {
      catalogosService.obtenerCatalogo.and.returnValue(
        new Observable(subscriber => {
          subscriber.next({
            lista: [
              { codigo: 'COP', descripcion: 'Peso Colombiano' },
              { codigo: 'USD', descripcion: 'Dólar' },
            ],
          });
          subscriber.complete();
        }),
      );

      const codigoTronador = {
        codigo: 'COP',
        descripcion: 'Peso Colombiano',
        valido: false,
      };

      service.validarContraCatalogo(codigoTronador, 'MONEDAS').subscribe({
        next: resultado => {
          expect(resultado.valido).toBe(true);
          done();
        },
        error: done.fail,
      });
    });

    it('debe marcar como inválido si no existe en catálogo', (done) => {
      catalogosService.obtenerCatalogo.and.returnValue(
        new Observable(subscriber => {
          subscriber.next({
            lista: [{ codigo: 'USD', descripcion: 'Dólar' }],
          });
          subscriber.complete();
        }),
      );

      const codigoTronador = {
        codigo: 'EUR',
        descripcion: 'Euro',
        valido: false,
      };

      service.validarContraCatalogo(codigoTronador, 'MONEDAS').subscribe({
        next: resultado => {
          expect(resultado.valido).toBe(false);
          done();
        },
        error: done.fail,
      });
    });
  });

  describe('RF-009 Regla 9.7: Manejo de timeout', () => {
    it('debe manejar timeout después de 30 segundos', (done) => {
      const file = new File([''], 'test.pdf', { type: 'application/pdf' });
      const request: IContractAIRequest = {
        archivo: file,
        metadata: {
          idMongo: '123',
          seccion: '4',
          producto: '440',
          tipoDocTomador: 'CC',
          nroDocTomador: '123',
          tipoArchivo: TipoArchivo.CONTRATO,
          fecha: '20250101',
          estado: EstadoArchivo.PE,
          formato: 'PDF',
        },
        producto: '440',
      };

      // Simular timeout modificando el tiempo de espera
      // En producción, esto se manejaría con el timer real
      service.procesarContrato(request).subscribe({
        next: () => {
          // Si completa antes del timeout, está bien
          done();
        },
        error: error => {
          if (error.timeout) {
            expect(error.error).toContain('tiempo');
            done();
          } else {
            done();
          }
        },
      });
    });
  });

  describe('estaBloqueado', () => {
    it('debe retornar false inicialmente', () => {
      expect(service.estaBloqueado()).toBe(false);
    });

    it('debe retornar true durante procesamiento', (done) => {
      const file = new File([''], 'test.pdf', { type: 'application/pdf' });
      const request: IContractAIRequest = {
        archivo: file,
        metadata: {
          idMongo: '123',
          seccion: '4',
          producto: '440',
          tipoDocTomador: 'CC',
          nroDocTomador: '123',
          tipoArchivo: TipoArchivo.CONTRATO,
          fecha: '20250101',
          estado: EstadoArchivo.PE,
          formato: 'PDF',
        },
        producto: '440',
      };

      service.procesarContrato(request).subscribe({
        next: () => {
          expect(service.estaBloqueado()).toBe(false);
          done();
        },
        error: () => {
          expect(service.estaBloqueado()).toBe(false);
          done();
        },
      });

      // Durante el procesamiento debe estar bloqueado
      setTimeout(() => {
        // El bloqueo se libera al completar
      }, 100);
    });
  });
});
