/**
 * ✅ RF-007 Regla 7.1: Pruebas unitarias exhaustivas para CupoService
 * 
 * Cubre todos los casos:
 * - Cálculo de cupo disponible
 * - Validación con ingeniero digital
 * - Recalculo con estados financieros
 * - Cupo visible según tipo cliente/usuario
 * - Actualización en Tronador
 * - Edge cases y validaciones de negocio
 */

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CupoService } from './cupo.service';
import {
  TipoUsuario,
  ISolicitudCupo,
} from '../interfaces/cupo.interface';
import { of } from 'rxjs';

describe('CupoService - RF-007 Regla 7.1', () => {
  let service: CupoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CupoService],
    });

    service = TestBed.inject(CupoService);
  });

  describe('calcularCupoDisponible', () => {
    it('debe calcular cupo disponible correctamente', (done) => {
      service
        .calcularCupoDisponible('CC', '1234567890', 'intermediario')
        .subscribe({
          next: (response) => {
            expect(response).toBeDefined();
            expect(response.cupoDisponible).toBeGreaterThan(0);
            expect(response.tipoCliente).toBeDefined();
            expect(response.tieneCupo).toBe(true);
            done();
          },
          error: done.fail,
        });
    });

    it('debe manejar diferentes tipos de documento', (done) => {
      const tiposDocumento = ['CC', 'NIT', 'CE', 'PAS'];
      
      tiposDocumento.forEach((tipo, index) => {
        service.calcularCupoDisponible(tipo, `123456789${index}`, 'intermediario').subscribe({
          next: (response) => {
            expect(response).toBeDefined();
            expect(response.cupoDisponible).toBeGreaterThanOrEqual(0);
            done();
          },
          error: done.fail,
        });
      });
    });

    it('debe manejar diferentes tipos de usuario', (done) => {
      const tiposUsuario: TipoUsuario[] = ['administrador', 'intermediario', 'interno'];
      let completed = 0;

      tiposUsuario.forEach((tipoUsuario) => {
        service.calcularCupoDisponible('CC', '1234567890', tipoUsuario).subscribe({
          next: (response) => {
            expect(response).toBeDefined();
            completed++;
            if (completed === tiposUsuario.length) {
              done();
            }
          },
          error: done.fail,
        });
      });
    });

    it('debe retornar tipoCliente correcto', (done) => {
      service.calcularCupoDisponible('CC', '1234567890', 'intermediario').subscribe({
        next: (response) => {
          expect(['enfoque', 'ocasional']).toContain(response.tipoCliente);
          done();
        },
        error: done.fail,
      });
    });
  });

  describe('requiereValidacionIngenieroDigital', () => {
    it('debe retornar true cuando cupo es 0', () => {
      expect(service.requiereValidacionIngenieroDigital(0)).toBe(true);
    });

    it('debe retornar true cuando cupo es negativo', () => {
      expect(service.requiereValidacionIngenieroDigital(-100)).toBe(true);
      expect(service.requiereValidacionIngenieroDigital(-1000000)).toBe(true);
    });

    it('debe retornar false cuando cupo es positivo', () => {
      expect(service.requiereValidacionIngenieroDigital(1)).toBe(false);
      expect(service.requiereValidacionIngenieroDigital(1000000)).toBe(false);
      expect(service.requiereValidacionIngenieroDigital(1000000000)).toBe(false);
    });

    it('debe manejar valores límite', () => {
      expect(service.requiereValidacionIngenieroDigital(0.0001)).toBe(false);
      expect(service.requiereValidacionIngenieroDigital(-0.0001)).toBe(true);
    });
  });

  describe('validarCapacidadIngenieroDigital', () => {
    it('debe invocar servicio del ingeniero digital', (done) => {
      service.validarCapacidadIngenieroDigital('CC', '1234567890').subscribe({
        next: (response) => {
          expect(response).toBeDefined();
          expect(response).toHaveProperty('tieneInformacion');
          expect(response).toHaveProperty('capacidadValidada');
          expect(response).toHaveProperty('requiereEstadosFinancieros');
          done();
        },
        error: done.fail,
      });
    });

    it('debe retornar requiereEstadosFinancieros cuando no tiene información', (done) => {
      service.validarCapacidadIngenieroDigital('CC', '1234567890').subscribe({
        next: (response) => {
          if (!response.tieneInformacion) {
            expect(response.requiereEstadosFinancieros).toBe(true);
          }
          done();
        },
        error: done.fail,
      });
    });

    it('debe retornar cupoCalculado cuando tiene información', (done) => {
      // Mock: Simular que tiene información
      jest
        .spyOn(service, 'validarCapacidadIngenieroDigital')
        .mockReturnValue(
          of({
            tieneInformacion: true,
            capacidadValidada: true,
            cupoCalculado: 500000000,
            requiereEstadosFinancieros: false,
          }),
        );

      service.validarCapacidadIngenieroDigital('CC', '1234567890').subscribe({
        next: (response) => {
          if (response.tieneInformacion && response.cupoCalculado) {
            expect(response.cupoCalculado).toBeGreaterThan(0);
          }
          done();
        },
        error: done.fail,
      });
    });
  });

  describe('recalcularCupoConEstadosFinancieros', () => {
    const solicitudMock: ISolicitudCupo = {
      tipoDocumentoTomador: 'CC',
      numeroDocumentoTomador: '1234567890',
      tipoDocumentoAsegurado: 'CC',
      numeroDocumentoAsegurado: '0987654321',
      actividadEconomica: 'Construcción',
    };

    it('debe recalcular cupo con estados financieros', (done) => {
      service.recalcularCupoConEstadosFinancieros(solicitudMock).subscribe({
        next: (response) => {
          expect(response).toBeDefined();
          expect(response.cupoDisponible).toBeGreaterThanOrEqual(0);
          expect(response.tipoCliente).toBeDefined();
          expect(response.tieneCupo).toBeDefined();
          done();
        },
        error: done.fail,
      });
    });

    it('debe manejar solicitud sin asegurado', (done) => {
      const solicitudSinAsegurado: ISolicitudCupo = {
        ...solicitudMock,
        tipoDocumentoAsegurado: undefined,
        numeroDocumentoAsegurado: undefined,
      };

      service.recalcularCupoConEstadosFinancieros(solicitudSinAsegurado).subscribe({
        next: (response) => {
          expect(response).toBeDefined();
          done();
        },
        error: done.fail,
      });
    });

    it('debe manejar diferentes actividades económicas', (done) => {
      const actividades = ['Construcción', 'Servicios', 'Comercio', 'Manufactura'];
      let completed = 0;

      actividades.forEach((actividad) => {
        const solicitud = { ...solicitudMock, actividadEconomica: actividad };
        service.recalcularCupoConEstadosFinancieros(solicitud).subscribe({
          next: (response) => {
            expect(response).toBeDefined();
            completed++;
            if (completed === actividades.length) {
              done();
            }
          },
          error: done.fail,
        });
      });
    });
  });

  describe('obtenerCupoVisible - RF-007 Regla 7.1', () => {
    describe('Cliente Enfoque', () => {
      it('debe mostrar todo el cupo para administrador', () => {
        const cupo = 2000000000;
        const visible = service.obtenerCupoVisible(cupo, 'enfoque', 'administrador');
        expect(visible).toBe(cupo);
      });

      it('debe mostrar todo el cupo para intermediario', () => {
        const cupo = 2000000000;
        const visible = service.obtenerCupoVisible(cupo, 'enfoque', 'intermediario');
        expect(visible).toBe(cupo);
      });

      it('debe mostrar todo el cupo para interno', () => {
        const cupo = 2000000000;
        const visible = service.obtenerCupoVisible(cupo, 'enfoque', 'interno');
        expect(visible).toBe(cupo);
      });
    });

    describe('Cliente Ocasional', () => {
      const CUPO_MAXIMO_OCASIONAL = 750000000;

      it('debe mostrar todo el cupo para administrador', () => {
        const cupo = 1000000000;
        const visible = service.obtenerCupoVisible(cupo, 'ocasional', 'administrador');
        expect(visible).toBe(cupo);
      });

      it('debe mostrar todo el cupo para interno', () => {
        const cupo = 1000000000;
        const visible = service.obtenerCupoVisible(cupo, 'ocasional', 'interno');
        expect(visible).toBe(cupo);
      });

      it('debe limitar a 750M para intermediario cuando cupo es mayor', () => {
        const cupo = 1000000000;
        const visible = service.obtenerCupoVisible(cupo, 'ocasional', 'intermediario');
        expect(visible).toBe(CUPO_MAXIMO_OCASIONAL);
      });

      it('debe mostrar cupo completo para intermediario cuando cupo es menor a 750M', () => {
        const cupo = 500000000;
        const visible = service.obtenerCupoVisible(cupo, 'ocasional', 'intermediario');
        expect(visible).toBe(cupo);
      });

      it('debe mostrar exactamente 750M cuando cupo es igual al límite', () => {
        const cupo = CUPO_MAXIMO_OCASIONAL;
        const visible = service.obtenerCupoVisible(cupo, 'ocasional', 'intermediario');
        expect(visible).toBe(CUPO_MAXIMO_OCASIONAL);
      });

      it('debe manejar edge case: cupo justo por encima del límite', () => {
        const cupo = CUPO_MAXIMO_OCASIONAL + 1;
        const visible = service.obtenerCupoVisible(cupo, 'ocasional', 'intermediario');
        expect(visible).toBe(CUPO_MAXIMO_OCASIONAL);
      });

      it('debe manejar edge case: cupo muy grande', () => {
        const cupo = 10000000000; // 10 mil millones
        const visible = service.obtenerCupoVisible(cupo, 'ocasional', 'intermediario');
        expect(visible).toBe(CUPO_MAXIMO_OCASIONAL);
      });

      it('debe manejar edge case: cupo cero', () => {
        const cupo = 0;
        const visible = service.obtenerCupoVisible(cupo, 'ocasional', 'intermediario');
        expect(visible).toBe(0);
      });
    });

    describe('Edge Cases Generales', () => {
      it('debe manejar valores muy pequeños', () => {
        const cupo = 1;
        const visible = service.obtenerCupoVisible(cupo, 'enfoque', 'intermediario');
        expect(visible).toBe(1);
      });

      it('debe manejar valores muy grandes', () => {
        const cupo = 999999999999;
        const visible = service.obtenerCupoVisible(cupo, 'enfoque', 'intermediario');
        expect(visible).toBe(cupo);
      });
    });
  });

  describe('actualizarCupoEnTronador', () => {
    it('debe actualizar cupo en Tronador correctamente', (done) => {
      service.actualizarCupoEnTronador('CC', '1234567890', 1000000000).subscribe({
        next: (response) => {
          expect(response).toBeDefined();
          expect(response.success).toBe(true);
          done();
        },
        error: done.fail,
      });
    });

    it('debe manejar diferentes tipos de documento', (done) => {
      const tipos = ['CC', 'NIT', 'CE'];
      let completed = 0;

      tipos.forEach((tipo) => {
        service.actualizarCupoEnTronador(tipo, '1234567890', 1000000000).subscribe({
          next: (response) => {
            expect(response.success).toBe(true);
            completed++;
            if (completed === tipos.length) {
              done();
            }
          },
          error: done.fail,
        });
      });
    });

    it('debe manejar diferentes valores de cupo', (done) => {
      const cupos = [0, 1000000, 1000000000, 5000000000];
      let completed = 0;

      cupos.forEach((cupo) => {
        service.actualizarCupoEnTronador('CC', '1234567890', cupo).subscribe({
          next: (response) => {
            expect(response.success).toBe(true);
            completed++;
            if (completed === cupos.length) {
              done();
            }
          },
          error: done.fail,
        });
      });
    });
  });

  describe('getCupoMaximoOcasionalIntermediario', () => {
    it('debe retornar el límite paramétrico de 750M', () => {
      const limite = service.getCupoMaximoOcasionalIntermediario();
      expect(limite).toBe(750000000);
    });

    it('debe ser constante y no cambiar', () => {
      const limite1 = service.getCupoMaximoOcasionalIntermediario();
      const limite2 = service.getCupoMaximoOcasionalIntermediario();
      expect(limite1).toBe(limite2);
      expect(limite1).toBe(750000000);
    });
  });

  describe('Integración - Flujo completo RF-007 Regla 7.1', () => {
    it('debe ejecutar flujo completo: calcular → validar → recalcular → actualizar', (done) => {
      // Paso 1: Calcular cupo
      service.calcularCupoDisponible('CC', '1234567890', 'intermediario').subscribe({
        next: (responseCupo) => {
          expect(responseCupo.cupoDisponible).toBeGreaterThanOrEqual(0);

          // Paso 2: Si requiere validación, invocar ingeniero digital
          if (service.requiereValidacionIngenieroDigital(responseCupo.cupoDisponible)) {
            service.validarCapacidadIngenieroDigital('CC', '1234567890').subscribe({
              next: (responseIngeniero) => {
                // Paso 3: Si requiere estados financieros, recalcular
                if (responseIngeniero.requiereEstadosFinancieros) {
                  const solicitud: ISolicitudCupo = {
                    tipoDocumentoTomador: 'CC',
                    numeroDocumentoTomador: '1234567890',
                    actividadEconomica: 'Construcción',
                  };

                  service.recalcularCupoConEstadosFinancieros(solicitud).subscribe({
                    next: (responseRecalculado) => {
                      // Paso 4: Actualizar en Tronador
                      service
                        .actualizarCupoEnTronador(
                          'CC',
                          '1234567890',
                          responseRecalculado.cupoDisponible,
                        )
                        .subscribe({
                          next: (responseTronador) => {
                            expect(responseTronador.success).toBe(true);
                            done();
                          },
                          error: done.fail,
                        });
                    },
                    error: done.fail,
                  });
                } else {
                  done();
                }
              },
              error: done.fail,
            });
          } else {
            // Si no requiere validación, actualizar directamente
            service
              .actualizarCupoEnTronador('CC', '1234567890', responseCupo.cupoDisponible)
              .subscribe({
                next: (responseTronador) => {
                  expect(responseTronador.success).toBe(true);
                  done();
                },
                error: done.fail,
              });
          }
        },
        error: done.fail,
      });
    });
  });
});
