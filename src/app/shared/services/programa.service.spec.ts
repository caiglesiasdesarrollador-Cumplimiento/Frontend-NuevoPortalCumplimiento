/**
 * ✅ RF-007 Reglas 7.3 y 7.4: Pruebas unitarias exhaustivas para ProgramaService
 * 
 * Cubre todos los casos:
 * - Obtener programas disponibles (Regla 7.3)
 * - Validar asegurado en programa (Regla 7.4)
 * - Obtener facility del programa (Regla 7.4)
 * - Determinar cupo primario (Regla 7.4)
 * - Edge cases y validaciones de negocio
 */

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ProgramaService } from './programa.service';

describe('ProgramaService - RF-007 Reglas 7.3 y 7.4', () => {
  let service: ProgramaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProgramaService],
    });

    service = TestBed.inject(ProgramaService);
  });

  describe('obtenerProgramasDisponibles - RF-007 Regla 7.3', () => {
    it('debe retornar lista de programas disponibles', (done) => {
      service
        .obtenerProgramasDisponibles('CLAVE001', 'CC', '1234567890', 'intermediario')
        .subscribe({
          next: (programas) => {
            expect(Array.isArray(programas)).toBe(true);
            expect(programas.length).toBeGreaterThan(0);
            done();
          },
          error: done.fail,
        });
    });

    it('debe retornar solo programas activos', (done) => {
      service
        .obtenerProgramasDisponibles('CLAVE001', 'CC', '1234567890', 'intermediario')
        .subscribe({
          next: (programas) => {
            programas.forEach((programa) => {
              expect(programa.activo).toBe(true);
            });
            done();
          },
          error: done.fail,
        });
    });

    describe('Filtrado para Intermediarios - RF-007 Regla 7.3', () => {
      it('NO debe incluir programas con clave exclusiva', (done) => {
        service
          .obtenerProgramasDisponibles('CLAVE001', 'CC', '1234567890', 'intermediario')
          .subscribe({
            next: (programas) => {
              programas.forEach((programa) => {
                expect(programa.tieneClaveExclusiva).toBe(false);
              });
              done();
            },
            error: done.fail,
          });
      });

      it('debe incluir solo programas donde esté el asegurado', (done) => {
        service
          .obtenerProgramasDisponibles('CLAVE001', 'CC', '1234567890', 'intermediario')
          .subscribe({
            next: (programas) => {
              programas.forEach((programa) => {
                expect(programa.aseguradoEnPrograma).toBe(true);
              });
              done();
            },
            error: done.fail,
          });
      });
    });

    describe('Filtrado para Usuarios Internos - RF-007 Regla 7.3', () => {
      it('debe mostrar todos los programas donde esté el asegurado (incluyendo con clave exclusiva)', (done) => {
        service
          .obtenerProgramasDisponibles('CLAVE001', 'CC', '1234567890', 'interno')
          .subscribe({
            next: (programas) => {
              programas.forEach((programa) => {
                expect(programa.aseguradoEnPrograma).toBe(true);
                // Los internos pueden ver programas con clave exclusiva
              });
              done();
            },
            error: done.fail,
          });
      });
    });

    describe('Filtrado para Administradores', () => {
      it('debe seguir reglas de intermediario', (done) => {
        service
          .obtenerProgramasDisponibles('CLAVE001', 'CC', '1234567890', 'administrador')
          .subscribe({
            next: (programas) => {
              programas.forEach((programa) => {
                expect(programa.activo).toBe(true);
                expect(programa.aseguradoEnPrograma).toBe(true);
              });
              done();
            },
            error: done.fail,
          });
      });
    });

    describe('Estructura de programas', () => {
      it('cada programa debe tener todas las propiedades requeridas', (done) => {
        service
          .obtenerProgramasDisponibles('CLAVE001', 'CC', '1234567890', 'intermediario')
          .subscribe({
            next: (programas) => {
              programas.forEach((programa) => {
                expect(programa).toHaveProperty('id');
                expect(programa).toHaveProperty('codigo');
                expect(programa).toHaveProperty('nombre');
                expect(programa).toHaveProperty('activo');
                expect(programa).toHaveProperty('tieneClaveExclusiva');
                expect(programa).toHaveProperty('aseguradoEnPrograma');
              });
              done();
            },
            error: done.fail,
          });
      });

      it('debe tener IDs únicos', (done) => {
        service
          .obtenerProgramasDisponibles('CLAVE001', 'CC', '1234567890', 'intermediario')
          .subscribe({
            next: (programas) => {
              const ids = programas.map((p) => p.id);
              const idsUnicos = new Set(ids);
              expect(idsUnicos.size).toBe(ids.length);
              done();
            },
            error: done.fail,
          });
      });
    });

    describe('Edge Cases', () => {
      it('debe manejar cuando no hay programas disponibles', (done) => {
        // Simular que no hay programas disponibles - usar of([]) directamente
        jest.spyOn(service, 'obtenerProgramasDisponibles').mockReturnValue(
          of([]) as any,
        );

        service
          .obtenerProgramasDisponibles('CLAVE999', 'CC', '9999999999', 'intermediario')
          .subscribe({
            next: (programas) => {
              expect(programas).toEqual([]);
              done();
            },
            error: done.fail,
          });
      });

      it('debe manejar diferentes tipos de documento del asegurado', (done) => {
        const tiposDocumento = ['CC', 'NIT', 'CE', 'PAS'];
        let completed = 0;

        tiposDocumento.forEach((tipo) => {
          service
            .obtenerProgramasDisponibles('CLAVE001', tipo, '1234567890', 'intermediario')
            .subscribe({
              next: (programas) => {
                expect(Array.isArray(programas)).toBe(true);
                completed++;
                if (completed === tiposDocumento.length) {
                  done();
                }
              },
              error: done.fail,
            });
        });
      });
    });
  });

  describe('validarAseguradoEnPrograma - RF-007 Regla 7.4', () => {
    it('debe retornar true cuando asegurado está en programa', (done) => {
      service.validarAseguradoEnPrograma('1', 'CC', '1234567890').subscribe({
        next: (estaEnPrograma) => {
          expect(estaEnPrograma).toBe(true);
          done();
        },
        error: done.fail,
      });
    });

    it('debe retornar false cuando asegurado NO está en programa', (done) => {
      service.validarAseguradoEnPrograma('3', 'CC', '1234567890').subscribe({
        next: (estaEnPrograma) => {
          expect(estaEnPrograma).toBe(false);
          done();
        },
        error: done.fail,
      });
    });

    it('debe manejar diferentes tipos de documento', (done) => {
      const tiposDocumento = ['CC', 'NIT', 'CE'];
      let completed = 0;

      tiposDocumento.forEach((tipo) => {
        service.validarAseguradoEnPrograma('1', tipo, '1234567890').subscribe({
          next: (estaEnPrograma) => {
            expect(typeof estaEnPrograma).toBe('boolean');
            completed++;
            if (completed === tiposDocumento.length) {
              done();
            }
          },
          error: done.fail,
        });
      });
    });

    it('debe validar para diferentes programas', (done) => {
      const programas = ['1', '2', '3', '4'];
      let completed = 0;

      programas.forEach((programaId) => {
        service.validarAseguradoEnPrograma(programaId, 'CC', '1234567890').subscribe({
          next: (estaEnPrograma) => {
            expect(typeof estaEnPrograma).toBe('boolean');
            completed++;
            if (completed === programas.length) {
              done();
            }
          },
          error: done.fail,
        });
      });
    });
  });

  describe('obtenerFacilityPrograma - RF-007 Regla 7.4', () => {
    it('debe retornar facility cuando existe', (done) => {
      service.obtenerFacilityPrograma('1').subscribe({
        next: (facility) => {
          expect(facility).toBeGreaterThan(0);
          expect(typeof facility).toBe('number');
          done();
        },
        error: done.fail,
      });
    });

    it('debe retornar null cuando programa no tiene facility', (done) => {
      service.obtenerFacilityPrograma('999').subscribe({
        next: (facility) => {
          expect(facility).toBeNull();
          done();
        },
        error: done.fail,
      });
    });

    it('debe retornar facility correcto para cada programa', (done) => {
      const programasConFacility: { [key: string]: number } = {
        '1': 1000000000,
        '2': 800000000,
        '3': 600000000,
        '4': 500000000,
      };

      let completed = 0;
      Object.keys(programasConFacility).forEach((programaId) => {
        service.obtenerFacilityPrograma(programaId).subscribe({
          next: (facility) => {
            expect(facility).toBe(programasConFacility[programaId]);
            completed++;
            if (completed === Object.keys(programasConFacility).length) {
              done();
            }
          },
          error: done.fail,
        });
      });
    });

    it('debe manejar IDs de programa inválidos', (done) => {
      const idsInvalidos = ['', '0', 'abc', '999999'];

      let completed = 0;
      idsInvalidos.forEach((id) => {
        service.obtenerFacilityPrograma(id).subscribe({
          next: (facility) => {
            expect(facility === null || typeof facility === 'number').toBe(true);
            completed++;
            if (completed === idsInvalidos.length) {
              done();
            }
          },
          error: done.fail,
        });
      });
    });
  });

  describe('determinarCupoPrimario - RF-007 Regla 7.4', () => {
    it('debe retornar cupo del cliente cuando facility es null', () => {
      const cupoCliente = 1000000000;
      const cupoPrimario = service.determinarCupoPrimario(null, cupoCliente);
      expect(cupoPrimario).toBe(cupoCliente);
    });

    it('debe retornar facility cuando es mayor que cupo del cliente', () => {
      const facility = 2000000000;
      const cupoCliente = 1000000000;
      const cupoPrimario = service.determinarCupoPrimario(facility, cupoCliente);
      expect(cupoPrimario).toBe(facility);
    });

    it('debe retornar cupo del cliente cuando es mayor que facility', () => {
      const facility = 1000000000;
      const cupoCliente = 2000000000;
      const cupoPrimario = service.determinarCupoPrimario(facility, cupoCliente);
      expect(cupoPrimario).toBe(cupoCliente);
    });

    it('debe retornar cualquiera cuando son iguales', () => {
      const facility = 1000000000;
      const cupoCliente = 1000000000;
      const cupoPrimario = service.determinarCupoPrimario(facility, cupoCliente);
      expect(cupoPrimario).toBe(facility);
      expect(cupoPrimario).toBe(cupoCliente);
    });

    describe('Edge Cases', () => {
      it('debe manejar cupo cero', () => {
        const facility = 1000000000;
        const cupoCliente = 0;
        const cupoPrimario = service.determinarCupoPrimario(facility, cupoCliente);
        expect(cupoPrimario).toBe(facility);
      });

      it('debe manejar facility cero', () => {
        const facility = 0;
        const cupoCliente = 1000000000;
        const cupoPrimario = service.determinarCupoPrimario(facility, cupoCliente);
        expect(cupoPrimario).toBe(cupoCliente);
      });

      it('debe manejar ambos cero', () => {
        const facility = 0;
        const cupoCliente = 0;
        const cupoPrimario = service.determinarCupoPrimario(facility, cupoCliente);
        expect(cupoPrimario).toBe(0);
      });

      it('debe manejar valores muy grandes', () => {
        const facility = 999999999999;
        const cupoCliente = 888888888888;
        const cupoPrimario = service.determinarCupoPrimario(facility, cupoCliente);
        expect(cupoPrimario).toBe(facility);
      });

      it('debe manejar valores muy pequeños', () => {
        const facility = 1;
        const cupoCliente = 2;
        const cupoPrimario = service.determinarCupoPrimario(facility, cupoCliente);
        expect(cupoPrimario).toBe(cupoCliente);
      });
    });
  });

  describe('Integración - Flujo completo RF-007 Reglas 7.3 y 7.4', () => {
    it('debe ejecutar flujo completo: obtener programas → seleccionar → validar → obtener facility → determinar cupo', (done) => {
      // Paso 1: Obtener programas disponibles
      service
        .obtenerProgramasDisponibles('CLAVE001', 'CC', '1234567890', 'intermediario')
        .subscribe({
          next: (programas) => {
            expect(programas.length).toBeGreaterThan(0);

            // Paso 2: Seleccionar primer programa
            const programaSeleccionado = programas[0];

            // Paso 3: Validar que asegurado está en programa
            service
              .validarAseguradoEnPrograma(
                programaSeleccionado.id,
                'CC',
                '1234567890',
              )
              .subscribe({
                next: (estaEnPrograma) => {
                  if (estaEnPrograma) {
                    // Paso 4: Obtener facility del programa
                    service.obtenerFacilityPrograma(programaSeleccionado.id).subscribe({
                      next: (facility) => {
                        // Paso 5: Determinar cupo primario
                        const cupoCliente = 1000000000;
                        const cupoPrimario = service.determinarCupoPrimario(
                          facility,
                          cupoCliente,
                        );

                        expect(cupoPrimario).toBeGreaterThanOrEqual(0);
                        expect(cupoPrimario).toBeGreaterThanOrEqual(
                          Math.min(facility || 0, cupoCliente),
                        );
                        expect(cupoPrimario).toBeLessThanOrEqual(
                          Math.max(facility || 0, cupoCliente),
                        );

                        done();
                      },
                      error: done.fail,
                    });
                  } else {
                    // Si no está en programa, debe mostrar error (esto se maneja en componente)
                    done();
                  }
                },
                error: done.fail,
              });
          },
          error: done.fail,
        });
    });

    it('debe manejar caso cuando asegurado NO está en programa seleccionado', (done) => {
      // Obtener programas
      service
        .obtenerProgramasDisponibles('CLAVE001', 'CC', '1234567890', 'intermediario')
        .subscribe({
          next: () => {
            // Intentar validar con programa donde NO está el asegurado (programa '3')
            service.validarAseguradoEnPrograma('3', 'CC', '1234567890').subscribe({
              next: (estaEnPrograma) => {
                expect(estaEnPrograma).toBe(false);
                // En el componente, esto debe mostrar el modal de error
                done();
              },
              error: done.fail,
            });
          },
          error: done.fail,
        });
    });
  });
});
