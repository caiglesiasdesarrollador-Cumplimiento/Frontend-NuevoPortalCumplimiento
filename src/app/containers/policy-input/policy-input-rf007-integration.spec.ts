/**
 * ✅ RF-007: Pruebas de integración exhaustivas para PolicyInputComponent
 * 
 * Cubre todas las reglas de RF-007:
 * - Regla 7.1: Cálculo de cupo disponible (flujo completo)
 * - Regla 7.2: Validación Grupo Bolívar
 * - Regla 7.3: Programas producto 440
 * - Regla 7.4: Selección de programa y facility
 * 
 * Edge cases y casos de integración entre servicios
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { PolicyInputComponent } from './policy-input.component';
import { CupoService } from '../../shared/services/cupo.service';
import { GrupoBolivarService } from '../../shared/services/grupo-bolivar.service';
import { ProgramaService } from '../../shared/services/programa.service';
import {
  ICupoDisponibleResponse,
  IIngenieroDigitalResponse,
  IValidacionGrupoBolivar,
} from '../../shared/interfaces/cupo.interface';

describe('PolicyInputComponent - RF-007 Integración Completa', () => {
  let component: PolicyInputComponent;
  let fixture: ComponentFixture<PolicyInputComponent>;
  let cupoService: jest.Mocked<CupoService>;
  let grupoBolivarService: jest.Mocked<GrupoBolivarService>;
  let programaService: jest.Mocked<ProgramaService>;

  beforeEach(async () => {
    const cupoServiceSpy = {
      calcularCupoDisponible: jest.fn(),
      requiereValidacionIngenieroDigital: jest.fn(),
      validarCapacidadIngenieroDigital: jest.fn(),
      recalcularCupoConEstadosFinancieros: jest.fn(),
      obtenerCupoVisible: jest.fn(),
      actualizarCupoEnTronador: jest.fn(),
    } as any;

    const grupoBolivarServiceSpy = {
      validarGrupoBolivarCompleto: jest.fn(),
    } as any;

    const programaServiceSpy = {
      obtenerProgramasDisponibles: jest.fn(),
      validarAseguradoEnPrograma: jest.fn(),
      obtenerFacilityPrograma: jest.fn(),
      determinarCupoPrimario: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      imports: [
        PolicyInputComponent,
        RouterTestingModule,
        FormsModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: CupoService, useValue: cupoServiceSpy },
        { provide: GrupoBolivarService, useValue: grupoBolivarServiceSpy },
        { provide: ProgramaService, useValue: programaServiceSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PolicyInputComponent);
    component = fixture.componentInstance;
    cupoService = TestBed.inject(CupoService) as jest.Mocked<CupoService>;
    grupoBolivarService = TestBed.inject(GrupoBolivarService) as jest.Mocked<GrupoBolivarService>;
    programaService = TestBed.inject(ProgramaService) as jest.Mocked<ProgramaService>;

    // Configurar mocks por defecto
    (cupoService.obtenerCupoVisible as jest.Mock).mockReturnValue(1000000000);
    (cupoService.requiereValidacionIngenieroDigital as jest.Mock).mockReturnValue(false);
  });

  describe('RF-007 Regla 7.1: Cálculo de Cupo Disponible - Integración', () => {
    it('debe calcular cupo y actualizar visible correctamente', (done) => {
      // Arrange
      component.tipoDocumentoTomador = 'CC';
      component.numeroDocumentoTomador = '1234567890';
      component.tipoUsuario = 'intermediario';

      const responseCupo: ICupoDisponibleResponse = {
        cupoDisponible: 1200000000,
        tipoCliente: 'enfoque',
        tieneCupo: true,
        requiereValidacion: false,
      };

      (cupoService.calcularCupoDisponible as jest.Mock).mockReturnValue(of(responseCupo));
      (cupoService.obtenerCupoVisible as jest.Mock).mockReturnValue(1200000000);
      (cupoService.actualizarCupoEnTronador as jest.Mock).mockReturnValue(of({ success: true }));

      // Act
      component.calcularCupoDisponible();

      // Assert
      setTimeout(() => {
        expect(cupoService.calcularCupoDisponible).toHaveBeenCalledWith(
          'CC',
          '1234567890',
          'intermediario',
        );
        expect(component.cupoDisponible).toBe(1200000000);
        expect(cupoService.obtenerCupoVisible).toHaveBeenCalled();
        expect(cupoService.actualizarCupoEnTronador).toHaveBeenCalled();
        done();
      }, 600);
    });

    it('debe invocar ingeniero digital cuando cupo <= 0', (done) => {
      // Arrange
      component.tipoDocumentoTomador = 'CC';
      component.numeroDocumentoTomador = '1234567890';

      const responseCupo: ICupoDisponibleResponse = {
        cupoDisponible: 0,
        tipoCliente: 'ocasional',
        tieneCupo: false,
        requiereValidacion: true,
      };

      const responseIngeniero: IIngenieroDigitalResponse = {
        tieneInformacion: false,
        capacidadValidada: false,
        requiereEstadosFinancieros: true,
      };

      (cupoService.calcularCupoDisponible as jest.Mock).mockReturnValue(of(responseCupo));
      (cupoService.requiereValidacionIngenieroDigital as jest.Mock).mockReturnValue(true);
      (cupoService.validarCapacidadIngenieroDigital as jest.Mock).mockReturnValue(
        of(responseIngeniero),
      );

      // Act
      component.calcularCupoDisponible();

      // Assert
      setTimeout(() => {
        expect(cupoService.requiereValidacionIngenieroDigital).toHaveBeenCalledWith(0);
        expect(cupoService.validarCapacidadIngenieroDigital).toHaveBeenCalled();
        expect(component.showSolicitarCupo).toBe(true);
        done();
      }, 600);
    });

    it('debe recalcular cupo con estados financieros y actualizar', (done) => {
      // Arrange
      component.tipoDocumentoTomador = 'CC';
      component.numeroDocumentoTomador = '1234567890';
      component.tipoUsuario = 'intermediario';
      component.estadosFinancierosFile = new File([''], 'estados.pdf');

      const responseRecalculado: ICupoDisponibleResponse = {
        cupoDisponible: 500000000,
        tipoCliente: 'ocasional',
        tieneCupo: true,
        requiereValidacion: false,
      };

      (cupoService.recalcularCupoConEstadosFinancieros as jest.Mock).mockReturnValue(
        of(responseRecalculado),
      );
      (cupoService.obtenerCupoVisible as jest.Mock).mockReturnValue(500000000);
      (cupoService.actualizarCupoEnTronador as jest.Mock).mockReturnValue(of({ success: true }));

      // Act
      (component as any).recalcularCupoConEstadosFinancieros();

      // Assert
      setTimeout(() => {
        expect(cupoService.recalcularCupoConEstadosFinancieros).toHaveBeenCalled();
        expect(component.cupoDisponible).toBe(500000000);
        expect(cupoService.actualizarCupoEnTronador).toHaveBeenCalled();
        done();
      }, 1100);
    });

    it('debe mostrar modal bloqueante cuando no hay cupo disponible', (done) => {
      // Arrange
      component.tipoDocumentoTomador = 'CC';
      component.numeroDocumentoTomador = '1234567890';

      const responseCupo: ICupoDisponibleResponse = {
        cupoDisponible: 0,
        tipoCliente: 'ocasional',
        tieneCupo: false,
        requiereValidacion: false,
      };

      const responseIngeniero: IIngenieroDigitalResponse = {
        tieneInformacion: true,
        capacidadValidada: true,
        requiereEstadosFinancieros: false,
      };

      (cupoService.calcularCupoDisponible as jest.Mock).mockReturnValue(of(responseCupo));
      (cupoService.requiereValidacionIngenieroDigital as jest.Mock).mockReturnValue(true);
      (cupoService.validarCapacidadIngenieroDigital as jest.Mock).mockReturnValue(
        of(responseIngeniero),
      );

      // Act
      component.calcularCupoDisponible();

      // Assert
      setTimeout(() => {
        expect(component.showModalCupoBloqueado).toBe(true);
        expect(component.cupoBloqueado).toBe(true);
        done();
      }, 600);
    });

    describe('Cupo Visible según Tipo Cliente y Usuario', () => {
      it('debe mostrar todo el cupo para cliente enfoque (intermediario)', () => {
        component.tipoCliente = 'enfoque';
        component.tipoUsuario = 'intermediario';
        component.cupoDisponible = 2000000000;

        (cupoService.obtenerCupoVisible as jest.Mock).mockReturnValue(2000000000);

        component.calcularCupoDisponible();

        expect(cupoService.obtenerCupoVisible).toHaveBeenCalledWith(
          2000000000,
          'enfoque',
          'intermediario',
        );
      });

      it('debe limitar a 750M para cliente ocasional intermediario', () => {
        component.tipoCliente = 'ocasional';
        component.tipoUsuario = 'intermediario';
        component.cupoDisponible = 1000000000;

        (cupoService.obtenerCupoVisible as jest.Mock).mockReturnValue(750000000);

        component.calcularCupoDisponible();

        expect(cupoService.obtenerCupoVisible).toHaveBeenCalledWith(
          1000000000,
          'ocasional',
          'intermediario',
        );
        expect(component.cupoDisponibleVisible).toBe(750000000);
      });

      it('debe mostrar todo el cupo para cliente ocasional administrador', () => {
        component.tipoCliente = 'ocasional';
        component.tipoUsuario = 'administrador';
        component.cupoDisponible = 1000000000;

        (cupoService.obtenerCupoVisible as jest.Mock).mockReturnValue(1000000000);

        component.calcularCupoDisponible();

        expect(component.cupoDisponibleVisible).toBe(1000000000);
      });
    });
  });

  describe('RF-007 Regla 7.2: Validación Grupo Bolívar - Integración', () => {
    it('debe validar y mostrar modal cuando requiere error (cliente ocasional)', (done) => {
      // Arrange
      component.tipoCliente = 'ocasional';
      component.tipoDocumentoTomador = 'NIT';
      component.numeroDocumentoTomador = '890900608'; // Grupo Bolívar
      component.claveIntermediario = 'CLAVE001'; // NO directa

      const validacion: IValidacionGrupoBolivar = {
        tomadorEsGrupoBolivar: true,
        aseguradoEsGrupoBolivar: false,
        claveEsDirecta: false,
        requiereError: true,
      };

      (grupoBolivarService.validarGrupoBolivarCompleto as jest.Mock).mockReturnValue(
        of(validacion),
      );

      // Act
      component.validarGrupoBolivar();

      // Assert
      setTimeout(() => {
        expect(grupoBolivarService.validarGrupoBolivarCompleto).toHaveBeenCalled();
        expect(component.showModalGrupoBolivar).toBe(true);
        done();
      }, 400);
    });

    it('NO debe validar para cliente enfoque', () => {
      // Arrange
      component.tipoCliente = 'enfoque';
      component.tipoDocumentoTomador = 'NIT';
      component.numeroDocumentoTomador = '890900608';

      // Act
      component.validarGrupoBolivar();

      // Assert
      expect(grupoBolivarService.validarGrupoBolivarCompleto).not.toHaveBeenCalled();
    });

    it('debe validar cuando asegurado es Grupo Bolívar', (done) => {
      // Arrange
      component.tipoCliente = 'ocasional';
      component.tipoDocumentoTomador = 'CC';
      component.numeroDocumentoTomador = '1234567890';
      component.tipoDocumentoAsegurado = 'NIT';
      component.numeroDocumentoAsegurado = '890900608'; // Grupo Bolívar
      component.claveIntermediario = 'CLAVE001'; // NO directa

      const validacion: IValidacionGrupoBolivar = {
        tomadorEsGrupoBolivar: false,
        aseguradoEsGrupoBolivar: true,
        claveEsDirecta: false,
        requiereError: true,
      };

      (grupoBolivarService.validarGrupoBolivarCompleto as jest.Mock).mockReturnValue(
        of(validacion),
      );

      // Act
      component.validarGrupoBolivar();

      // Assert
      setTimeout(() => {
        expect(component.showModalGrupoBolivar).toBe(true);
        done();
      }, 400);
    });

    it('NO debe mostrar error cuando clave ES directa', (done) => {
      // Arrange
      component.tipoCliente = 'ocasional';
      component.tipoDocumentoTomador = 'NIT';
      component.numeroDocumentoTomador = '890900608';
      component.claveIntermediario = 'DIR001'; // ES directa

      const validacion: IValidacionGrupoBolivar = {
        tomadorEsGrupoBolivar: true,
        aseguradoEsGrupoBolivar: false,
        claveEsDirecta: true,
        requiereError: false,
      };

      (grupoBolivarService.validarGrupoBolivarCompleto as jest.Mock).mockReturnValue(
        of(validacion),
      );

      // Act
      component.validarGrupoBolivar();

      // Assert
      setTimeout(() => {
        expect(component.showModalGrupoBolivar).toBe(false);
        done();
      }, 400);
    });
  });

  describe('RF-007 Reglas 7.3 y 7.4: Programas Producto 440 - Integración', () => {
    beforeEach(() => {
      component.tipoProducto = 'grandes-beneficiarios';
      component.claveIntermediario = 'CLAVE001';
      component.tipoDocumentoAsegurado = 'CC';
      component.numeroDocumentoAsegurado = '1234567890';
      component.tipoUsuario = 'intermediario';
    });

    it('debe cargar programas cuando se ingresa asegurado', (done) => {
      // Arrange
      const programasMock = [
        {
          id: '1',
          codigo: 'PROG-A',
          nombre: 'Programa A',
          activo: true,
          tieneClaveExclusiva: false,
          facility: 1000000000,
          aseguradoEnPrograma: true,
        },
      ];

      (programaService.obtenerProgramasDisponibles as jest.Mock).mockReturnValue(
        of(programasMock),
      );

      // Act
      component.cargarProgramasDisponibles();

      // Assert
      setTimeout(() => {
        expect(programaService.obtenerProgramasDisponibles).toHaveBeenCalledWith(
          'CLAVE001',
          'CC',
          '1234567890',
          'intermediario',
        );
        expect(component.programasDisponibles.length).toBeGreaterThan(0);
        done();
      }, 600);
    });

    it('debe validar asegurado en programa y obtener facility', (done) => {
      // Arrange
      const programaId = '1';
      component.programaSeleccionadoId = programaId;
      component.cupoDisponible = 1000000000;

      (programaService.validarAseguradoEnPrograma as jest.Mock).mockReturnValue(of(true));
      (programaService.obtenerFacilityPrograma as jest.Mock).mockReturnValue(of(1500000000));
      (programaService.determinarCupoPrimario as jest.Mock).mockReturnValue(1500000000);

      // Act
      component.onProgramaSeleccionado(programaId);

      // Assert
      setTimeout(() => {
        expect(programaService.validarAseguradoEnPrograma).toHaveBeenCalled();
        expect(programaService.obtenerFacilityPrograma).toHaveBeenCalledWith(programaId);
        expect(programaService.determinarCupoPrimario).toHaveBeenCalled();
        done();
      }, 500);
    });

    it('debe mostrar modal cuando asegurado NO está en programa', (done) => {
      // Arrange
      const programaId = '3'; // Programa donde NO está el asegurado
      component.programaSeleccionadoId = programaId;

      (programaService.validarAseguradoEnPrograma as jest.Mock).mockReturnValue(of(false));

      // Act
      component.onProgramaSeleccionado(programaId);

      // Assert
      setTimeout(() => {
        expect(programaService.validarAseguradoEnPrograma).toHaveBeenCalled();
        expect(component.showModalAseguradoNoEnPrograma).toBe(true);
        expect(component.programaParametrizado).toBe('');
        done();
      }, 500);
    });

    it('debe determinar cupo primario correctamente (facility mayor)', (done) => {
      // Arrange
      component.cupoDisponible = 1000000000;
      const facility = 2000000000;

      (programaService.obtenerFacilityPrograma as jest.Mock).mockReturnValue(of(facility));
      (programaService.determinarCupoPrimario as jest.Mock).mockReturnValue(facility);

      // Act
      (component as any).obtenerFacilityPrograma('1');

      // Assert
      setTimeout(() => {
        expect(programaService.determinarCupoPrimario).toHaveBeenCalledWith(
          facility,
          1000000000,
        );
        expect(component.cupoPrimario).toBe(facility);
        done();
      }, 400);
    });

    it('debe usar cupo cliente cuando es mayor que facility', (done) => {
      // Arrange
      component.cupoDisponible = 2000000000;
      const facility = 1000000000;

      (programaService.obtenerFacilityPrograma as jest.Mock).mockReturnValue(of(facility));
      (programaService.determinarCupoPrimario as jest.Mock).mockReturnValue(2000000000);

      // Act
      (component as any).obtenerFacilityPrograma('1');

      // Assert
      setTimeout(() => {
        expect(component.cupoPrimario).toBe(2000000000);
        done();
      }, 400);
    });

    it('debe bloquear proceso si programa no está seleccionado (producto 440)', () => {
      // Arrange
      component.tipoProducto = 'grandes-beneficiarios';
      component.nombreAsegurado = 'Test Asegurado';
      component.programaParametrizado = '';

      // Act
      const puedeContinuar = (component as any).puedeContinuarAlSiguientePaso();

      // Assert
      expect(puedeContinuar).toBe(false);
    });
  });

  describe('RF-007: Flujo Completo Integrado', () => {
    it('debe ejecutar flujo completo: cupo → grupo bolívar → programas', (done) => {
      // Arrange
      component.tipoDocumentoTomador = 'CC';
      component.numeroDocumentoTomador = '1234567890';
      component.tipoUsuario = 'intermediario';
      component.tipoCliente = 'ocasional';
      component.tipoProducto = 'grandes-beneficiarios';
      component.claveIntermediario = 'CLAVE001';
      component.tipoDocumentoAsegurado = 'CC';
      component.numeroDocumentoAsegurado = '0987654321';

      // Mock cupo
      const responseCupo: ICupoDisponibleResponse = {
        cupoDisponible: 1000000000,
        tipoCliente: 'ocasional',
        tieneCupo: true,
      };
      (cupoService.calcularCupoDisponible as jest.Mock).mockReturnValue(of(responseCupo));
      (cupoService.obtenerCupoVisible as jest.Mock).mockReturnValue(750000000);

      // Mock grupo bolívar
      const validacionGrupo: IValidacionGrupoBolivar = {
        tomadorEsGrupoBolivar: false,
        aseguradoEsGrupoBolivar: false,
        claveEsDirecta: false,
        requiereError: false,
      };
      (grupoBolivarService.validarGrupoBolivarCompleto as jest.Mock).mockReturnValue(
        of(validacionGrupo),
      );

      // Mock programas
      const programasMock = [
        {
          id: '1',
          codigo: 'PROG-A',
          nombre: 'Programa A',
          activo: true,
          tieneClaveExclusiva: false,
          facility: 1500000000,
          aseguradoEnPrograma: true,
        },
      ];
      (programaService.obtenerProgramasDisponibles as jest.Mock).mockReturnValue(
        of(programasMock),
      );
      (programaService.validarAseguradoEnPrograma as jest.Mock).mockReturnValue(of(true));
      (programaService.obtenerFacilityPrograma as jest.Mock).mockReturnValue(of(1500000000));
      (programaService.determinarCupoPrimario as jest.Mock).mockReturnValue(1500000000);

      // Act - Flujo completo
      component.calcularCupoDisponible();

      setTimeout(() => {
        component.validarGrupoBolivar();

        setTimeout(() => {
          component.cargarProgramasDisponibles();

          setTimeout(() => {
            component.onProgramaSeleccionado('1');

            setTimeout(() => {
              // Assert - Verificar que todo se ejecutó correctamente
              expect(cupoService.calcularCupoDisponible).toHaveBeenCalled();
              expect(grupoBolivarService.validarGrupoBolivarCompleto).toHaveBeenCalled();
              expect(programaService.obtenerProgramasDisponibles).toHaveBeenCalled();
              expect(programaService.validarAseguradoEnPrograma).toHaveBeenCalled();
              expect(component.cupoPrimario).toBe(1500000000);
              done();
            }, 500);
          }, 600);
        }, 400);
      }, 600);
    });
  });
});
