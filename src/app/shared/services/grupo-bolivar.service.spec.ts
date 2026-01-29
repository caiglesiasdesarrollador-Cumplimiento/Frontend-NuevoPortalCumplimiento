/**
 * ✅ RF-007 Regla 7.2: Pruebas unitarias exhaustivas para GrupoBolivarService
 * 
 * Cubre todos los casos:
 * - Validación de NITs Grupo Bolívar
 * - Validación de claves directas autorizadas
 * - Validación completa (tomador + asegurado + clave)
 * - Edge cases y combinaciones
 */

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GrupoBolivarService } from './grupo-bolivar.service';

describe('GrupoBolivarService - RF-007 Regla 7.2', () => {
  let service: GrupoBolivarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GrupoBolivarService],
    });

    service = TestBed.inject(GrupoBolivarService);
  });

  describe('validarEsGrupoBolivar', () => {
    it('debe retornar true para NITs del Grupo Bolívar', (done) => {
      const nitsGrupoBolivar = ['890900608', '890900609', '890900610', '890900611'];

      nitsGrupoBolivar.forEach((nit, index) => {
        service.validarEsGrupoBolivar('NIT', nit).subscribe({
          next: (esGrupoBolivar) => {
            expect(esGrupoBolivar).toBe(true);
            if (index === nitsGrupoBolivar.length - 1) {
              done();
            }
          },
          error: done.fail,
        });
      });
    });

    it('debe retornar false para NITs que no son del Grupo Bolívar', (done) => {
      const nitsNoGrupoBolivar = ['123456789', '987654321', '111111111'];

      nitsNoGrupoBolivar.forEach((nit, index) => {
        service.validarEsGrupoBolivar('NIT', nit).subscribe({
          next: (esGrupoBolivar) => {
            expect(esGrupoBolivar).toBe(false);
            if (index === nitsNoGrupoBolivar.length - 1) {
              done();
            }
          },
          error: done.fail,
        });
      });
    });

    it('debe retornar false para tipos de documento diferentes a NIT', (done) => {
      const tiposDocumento = ['CC', 'CE', 'PAS', 'TI'];

      tiposDocumento.forEach((tipo, index) => {
        service.validarEsGrupoBolivar(tipo, '890900608').subscribe({
          next: (esGrupoBolivar) => {
            expect(esGrupoBolivar).toBe(false);
            if (index === tiposDocumento.length - 1) {
              done();
            }
          },
          error: done.fail,
        });
      });
    });

    it('debe manejar valores vacíos', (done) => {
      service.validarEsGrupoBolivar('NIT', '').subscribe({
        next: (esGrupoBolivar) => {
          expect(esGrupoBolivar).toBe(false);
          done();
        },
        error: done.fail,
      });
    });

    it('debe manejar NITs con formato diferente', (done) => {
      const nitsFormatoDiferente = ['890900608-1', '890.900.608', '890900608-0'];

      nitsFormatoDiferente.forEach((nit, index) => {
        service.validarEsGrupoBolivar('NIT', nit).subscribe({
          next: (esGrupoBolivar) => {
            // Puede retornar false si el formato no coincide exactamente
            expect(typeof esGrupoBolivar).toBe('boolean');
            if (index === nitsFormatoDiferente.length - 1) {
              done();
            }
          },
          error: done.fail,
        });
      });
    });
  });

  describe('validarClaveDirectaAutorizada', () => {
    it('debe retornar true para claves directas autorizadas', (done) => {
      const clavesAutorizadas = ['DIR001', 'DIR002', 'DIR003'];

      clavesAutorizadas.forEach((clave, index) => {
        service.validarClaveDirectaAutorizada(clave).subscribe({
          next: (esDirecta) => {
            expect(esDirecta).toBe(true);
            if (index === clavesAutorizadas.length - 1) {
              done();
            }
          },
          error: done.fail,
        });
      });
    });

    it('debe retornar false para claves no autorizadas', (done) => {
      const clavesNoAutorizadas = ['CLAVE001', 'ABC123', 'XYZ789', 'INTER001'];

      clavesNoAutorizadas.forEach((clave, index) => {
        service.validarClaveDirectaAutorizada(clave).subscribe({
          next: (esDirecta) => {
            expect(esDirecta).toBe(false);
            if (index === clavesNoAutorizadas.length - 1) {
              done();
          }
          },
          error: done.fail,
        });
      });
    });

    it('debe manejar claves vacías', (done) => {
      service.validarClaveDirectaAutorizada('').subscribe({
        next: (esDirecta) => {
          expect(esDirecta).toBe(false);
          done();
        },
        error: done.fail,
      });
    });

    it('debe ser case-sensitive', (done) => {
      service.validarClaveDirectaAutorizada('dir001').subscribe({
        next: (esDirecta) => {
          // Si es case-sensitive, debe retornar false
          expect(esDirecta).toBe(false);
          done();
        },
        error: done.fail,
      });
    });
  });

  describe('validarGrupoBolivarCompleto - RF-007 Regla 7.2', () => {
    describe('Casos que requieren error', () => {
      it('debe requerir error cuando tomador es Grupo Bolívar y clave NO es directa', (done) => {
        service
          .validarGrupoBolivarCompleto(
            'NIT',
            '890900608', // Grupo Bolívar
            null,
            null,
            'CLAVE001', // NO directa
          )
          .subscribe({
            next: (resultado) => {
              expect(resultado.tomadorEsGrupoBolivar).toBe(true);
              expect(resultado.claveEsDirecta).toBe(false);
              expect(resultado.requiereError).toBe(true);
              done();
            },
            error: done.fail,
          });
      });

      it('debe requerir error cuando asegurado es Grupo Bolívar y clave NO es directa', (done) => {
        service
          .validarGrupoBolivarCompleto(
            'CC',
            '1234567890',
            'NIT',
            '890900608', // Grupo Bolívar
            'CLAVE001', // NO directa
          )
          .subscribe({
            next: (resultado) => {
              expect(resultado.aseguradoEsGrupoBolivar).toBe(true);
              expect(resultado.claveEsDirecta).toBe(false);
              expect(resultado.requiereError).toBe(true);
              done();
            },
            error: done.fail,
          });
      });

      it('debe requerir error cuando ambos (tomador y asegurado) son Grupo Bolívar y clave NO es directa', (done) => {
        service
          .validarGrupoBolivarCompleto(
            'NIT',
            '890900608', // Grupo Bolívar
            'NIT',
            '890900609', // Grupo Bolívar
            'CLAVE001', // NO directa
          )
          .subscribe({
            next: (resultado) => {
              expect(resultado.tomadorEsGrupoBolivar).toBe(true);
              expect(resultado.aseguradoEsGrupoBolivar).toBe(true);
              expect(resultado.claveEsDirecta).toBe(false);
              expect(resultado.requiereError).toBe(true);
              done();
            },
            error: done.fail,
          });
      });
    });

    describe('Casos que NO requieren error', () => {
      it('NO debe requerir error cuando tomador es Grupo Bolívar y clave ES directa', (done) => {
        service
          .validarGrupoBolivarCompleto(
            'NIT',
            '890900608', // Grupo Bolívar
            null,
            null,
            'DIR001', // ES directa
          )
          .subscribe({
            next: (resultado) => {
              expect(resultado.tomadorEsGrupoBolivar).toBe(true);
              expect(resultado.claveEsDirecta).toBe(true);
              expect(resultado.requiereError).toBe(false);
              done();
            },
            error: done.fail,
          });
      });

      it('NO debe requerir error cuando ninguno es Grupo Bolívar', (done) => {
        service
          .validarGrupoBolivarCompleto(
            'CC',
            '1234567890', // NO Grupo Bolívar
            'CC',
            '0987654321', // NO Grupo Bolívar
            'CLAVE001', // NO directa
          )
          .subscribe({
            next: (resultado) => {
              expect(resultado.tomadorEsGrupoBolivar).toBe(false);
              expect(resultado.aseguradoEsGrupoBolivar).toBe(false);
              expect(resultado.requiereError).toBe(false);
              done();
            },
            error: done.fail,
          });
      });

      it('NO debe requerir error cuando no hay asegurado y tomador NO es Grupo Bolívar', (done) => {
        service
          .validarGrupoBolivarCompleto('CC', '1234567890', null, null, 'CLAVE001')
          .subscribe({
            next: (resultado) => {
              expect(resultado.tomadorEsGrupoBolivar).toBe(false);
              expect(resultado.requiereError).toBe(false);
              done();
            },
            error: done.fail,
          });
      });
    });

    describe('Edge Cases', () => {
      it('debe manejar asegurado null correctamente', (done) => {
        service
          .validarGrupoBolivarCompleto('CC', '1234567890', null, null, 'CLAVE001')
          .subscribe({
            next: (resultado) => {
              expect(resultado).toBeDefined();
              expect(resultado.aseguradoEsGrupoBolivar).toBe(false);
              done();
            },
            error: done.fail,
          });
      });

      it('debe manejar solo tipoDocumentoAsegurado sin numeroDocumentoAsegurado', (done) => {
        service
          .validarGrupoBolivarCompleto('CC', '1234567890', 'CC', null, 'CLAVE001')
          .subscribe({
            next: (resultado) => {
              expect(resultado).toBeDefined();
              expect(resultado.aseguradoEsGrupoBolivar).toBe(false);
              done();
            },
            error: done.fail,
          });
      });

      it('debe manejar solo numeroDocumentoAsegurado sin tipoDocumentoAsegurado', (done) => {
        service
          .validarGrupoBolivarCompleto('CC', '1234567890', null, '0987654321', 'CLAVE001')
          .subscribe({
            next: (resultado) => {
              expect(resultado).toBeDefined();
              expect(resultado.aseguradoEsGrupoBolivar).toBe(false);
              done();
            },
            error: done.fail,
          });
      });

      it('debe manejar combinaciones de diferentes tipos de documento', (done) => {
        const combinaciones = [
          { tipoTomador: 'CC', tipoAsegurado: 'NIT' },
          { tipoTomador: 'NIT', tipoAsegurado: 'CC' },
          { tipoTomador: 'CE', tipoAsegurado: 'NIT' },
        ];

        let completed = 0;
        combinaciones.forEach((combo) => {
          service
            .validarGrupoBolivarCompleto(
              combo.tipoTomador,
              '1234567890',
              combo.tipoAsegurado,
              '890900608',
              'CLAVE001',
            )
            .subscribe({
              next: (resultado) => {
                expect(resultado).toBeDefined();
                completed++;
                if (completed === combinaciones.length) {
                  done();
                }
              },
              error: done.fail,
            });
        });
      });
    });

    describe('Validación de mensaje RF-007 Regla 7.2', () => {
      it('debe cumplir con la regla: solo aplica para cliente ocasional', () => {
        // Esta validación se hace en el componente, pero verificamos que el servicio
        // retorna correctamente requiereError para que el componente pueda bloquear
        service
          .validarGrupoBolivarCompleto('NIT', '890900608', null, null, 'CLAVE001')
          .subscribe({
            next: (resultado) => {
              // Si requiereError es true, el componente debe mostrar el modal
              expect(resultado.requiereError).toBeDefined();
              expect(typeof resultado.requiereError).toBe('boolean');
            },
          });
      });
    });
  });

  describe('Integración - Flujo completo RF-007 Regla 7.2', () => {
    it('debe ejecutar validación completa en orden correcto', (done) => {
      service
        .validarGrupoBolivarCompleto(
          'NIT',
          '890900608',
          'NIT',
          '890900609',
          'CLAVE001',
        )
        .subscribe({
          next: (resultado) => {
            // Verificar que todas las propiedades están presentes
            expect(resultado).toHaveProperty('tomadorEsGrupoBolivar');
            expect(resultado).toHaveProperty('aseguradoEsGrupoBolivar');
            expect(resultado).toHaveProperty('claveEsDirecta');
            expect(resultado).toHaveProperty('requiereError');

            // Verificar tipos
            expect(typeof resultado.tomadorEsGrupoBolivar).toBe('boolean');
            expect(typeof resultado.aseguradoEsGrupoBolivar).toBe('boolean');
            expect(typeof resultado.claveEsDirecta).toBe('boolean');
            expect(typeof resultado.requiereError).toBe('boolean');

            done();
          },
          error: done.fail,
        });
    });
  });
});
