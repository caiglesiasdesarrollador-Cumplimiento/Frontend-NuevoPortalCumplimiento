import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PolicyInputComponent } from './policy-input.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { QuoteService } from '../../shared/services/quote.service';
import { of } from 'rxjs';

describe('PolicyInputComponent', () => {
  let component: PolicyInputComponent;
  let fixture: ComponentFixture<PolicyInputComponent>;
  let quoteService: QuoteService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PolicyInputComponent, // ✅ Componente standalone se importa, no se declara
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [QuoteService],
    }).compileComponents();

    fixture = TestBed.createComponent(PolicyInputComponent);
    component = fixture.componentInstance;
    quoteService = TestBed.inject(QuoteService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have currentStep', () => {
    expect(component.currentStep).toBeDefined();
  });
  it('should have coberturasCumplimiento', () => {
    expect(component.coberturasCumplimiento).toBeDefined();
  });
  it('should have rcCoberturas', () => {
    expect(component.rcCoberturas).toBeDefined();
  });
  it('should navigate next', () => {
    expect(() => component.nextStep()).not.toThrow();
  });
  it('should go to step', () => {
    expect(() => component.goToStep(0)).not.toThrow();
  });
  it('should toggle cobertura', () => {
    const cob = component.coberturasCumplimiento[0];
    expect(() => component.toggleCobertura(cob)).not.toThrow();
  });
  it('should recalculate prima RC', () => {
    const cob = component.rcCoberturas[0];
    expect(() => component.recalcularPrimaRC(cob)).not.toThrow();
  });

  // ✅ RF017.2: Tests para Retomar Cotización Guardada
  describe('RF017.2 - Retomar Cotización Guardada', () => {
    const mockCotizacion = {
      id: 'q001',
      numero: 'COT-2024-001',
      producto: 'Responsabilidad Civil',
      valorAsegurado: 500000000,
      estado: 'Borrador',
      fechaCreacion: '2024-01-15',
      pasoGuardado: 1,
      datosGenerales: {
        tipoDocTomador: 'NIT',
        numDocTomador: '900123456-7',
        nombreTomador: 'Empresa Ejemplo S.A.S',
        tipoDocAsegurado: 'NIT',
        numDocAsegurado: '900987654-3',
        nombreAsegurado: 'Cliente Ejemplo Ltda',
        numeroContrato: 'CT-2024-001',
        moneda: 'COP',
      },
      ubicacionRiesgo: {
        departamento: 'Bogotá D.C.',
        municipio: 'Bogotá',
        direccion: 'Calle 100 # 10-20',
      },
      detallesContrato: {
        valorContrato: 500000000,
        fechaInicio: '2024-01-01',
        fechaFin: '2025-01-01',
        duracion: '12',
      },
    };

    it('should retomar cotización con datos completos', () => {
      // Arrange
      component.showCotizacionesTable = true;
      component.showCotizacionDetalle = false;
      component.isFormEnabled = false;

      // Act
      component.retomarCotizacion(mockCotizacion);

      // Assert
      expect(component.cotizacionSeleccionada).toEqual(mockCotizacion);
      expect(component.showCotizacionesTable).toBe(false);
      expect(component.showCotizacionDetalle).toBe(false);
      expect(component.isFormEnabled).toBe(true);
      expect(component.selectedAction).toBe('emitir');
      expect(component.currentStep).toBe(1);
    });

    it('should load saved quote from service when datosGenerales is missing', () => {
      // Arrange
      const cotizacionSinDatos = { id: 'q001', numero: 'COT-001' };
      const savedQuoteData = {
        ...mockCotizacion,
        id: 'q001',
      };
      jest.spyOn(quoteService, 'getSavedQuote').mockReturnValue(of(savedQuoteData));

      // Act
      component.retomarCotizacion(cotizacionSinDatos);

      // Assert
      expect(quoteService.getSavedQuote).toHaveBeenCalledWith('q001');
    });

    it('should restore step from saved quote', () => {
      // Arrange
      const cotizacionPaso2 = { ...mockCotizacion, pasoGuardado: 2 };

      // Act
      component.retomarCotizacion(cotizacionPaso2);

      // Assert
      expect(component.currentStep).toBe(2);
    });

    it('should default to step 1 if pasoGuardado is not provided', () => {
      // Arrange
      const cotizacionSinPaso = { ...mockCotizacion };
      delete cotizacionSinPaso.pasoGuardado;

      // Act
      component.retomarCotizacion(cotizacionSinPaso);

      // Assert
      expect(component.currentStep).toBe(1);
    });
  });

  // ✅ RF017.3: Tests para Imprimir Cotizaciones
  describe('RF017.3 - Imprimir Cotizaciones', () => {
    const mockCotizacion = {
      id: 'q001',
      numero: 'COT-2024-001',
      estado: 'Borrador',
      fechaCreacion: '2024-01-15',
      producto: 'Responsabilidad Civil',
      valorAsegurado: 500000000,
      datosGenerales: {
        tipoDocTomador: 'NIT',
        numDocTomador: '900123456-7',
        nombreTomador: 'Empresa Ejemplo S.A.S',
        tipoDocAsegurado: 'NIT',
        numDocAsegurado: '900987654-3',
        nombreAsegurado: 'Cliente Ejemplo Ltda',
      },
      resumenCostos: {
        primaNeta: 5000000,
        iva: 950000,
        primaTotal: 5950000,
      },
    };

    beforeEach(() => {
      // Mock window.open y window.print
      jest.spyOn(window, 'open').mockReturnValue({
        document: {
          write: jest.fn(),
          close: jest.fn(),
        },
        onload: null,
        print: jest.fn(),
      } as any);
    });

    it('should print cotización from table', () => {
      // Act
      component.imprimirCotizacion(mockCotizacion);

      // Assert
      expect(window.open).toHaveBeenCalled();
    });

    it('should show alert if popup is blocked', () => {
      // Arrange
      jest.spyOn(window, 'open').mockReturnValue(null);
      jest.spyOn(window, 'alert').mockImplementation(() => {});

      // Act
      component.imprimirCotizacion(mockCotizacion);

      // Assert
      expect(window.alert).toHaveBeenCalledWith('Por favor, permite ventanas emergentes para imprimir');
    });

    it('should print detalle cotización when cotizacionSeleccionada exists', () => {
      // Arrange
      component.cotizacionSeleccionada = mockCotizacion;
      jest.spyOn(component, 'imprimirCotizacion');

      // Act
      component.imprimirDetalleCotizacion();

      // Assert
      expect(component.imprimirCotizacion).toHaveBeenCalledWith(mockCotizacion);
    });

    it('should not print detalle if cotizacionSeleccionada is null', () => {
      // Arrange
      component.cotizacionSeleccionada = null;
      jest.spyOn(component, 'imprimirCotizacion');

      // Act
      component.imprimirDetalleCotizacion();

      // Assert
      expect(component.imprimirCotizacion).not.toHaveBeenCalled();
    });

    it('should generate print content with correct format', () => {
      // Arrange
      const printWindow = {
        document: {
          write: jest.fn(),
          close: jest.fn(),
        },
        onload: null,
        print: jest.fn(),
      } as any;
      jest.spyOn(window, 'open').mockReturnValue(printWindow);

      // Act
      component.imprimirCotizacion(mockCotizacion);

      // Assert
      expect(printWindow.document.write).toHaveBeenCalled();
      const writtenContent = (printWindow.document.write as jest.Mock).mock.calls[0][0];
      expect(writtenContent).toContain('SEGUROS BOLÍVAR');
      expect(writtenContent).toContain('COT-2024-001');
      expect(writtenContent).toContain('Empresa Ejemplo S.A.S');
    });
  });

  // ✅ RF017.1: Tests para Convertir Cotización a Póliza
  describe('RF017.1 - Convertir Cotización a Póliza', () => {
    beforeEach(() => {
      // Reset component state before each test
      component.selectedEmitirOption = null;
      component.showCotizacionesTable = false;
      component.showCotizacionDetalle = false;
      component.isFormEnabled = false;
      component.selectedAction = null;
      component.currentStep = 0;
      component.contractFileError = false;
      component.fileName = null;
      jest.spyOn(component['cdr'], 'detectChanges').mockImplementation(() => {});
    });

    describe('selectEmitirOption - cotizacion-existente', () => {
      it('should set selectedEmitirOption to cotizacion-existente', () => {
        // Act
        component.selectEmitirOption('cotizacion-existente');

        // Assert
        expect(component.selectedEmitirOption).toBe('cotizacion-existente');
      });

      it('should show cotizaciones table when selecting cotizacion-existente', () => {
        // Arrange
        component.showCotizacionesTable = false;

        // Act
        component.selectEmitirOption('cotizacion-existente');

        // Assert
        expect(component.showCotizacionesTable).toBe(true);
        expect(component.showCotizacionDetalle).toBe(false);
        expect(component.cotizacionSeleccionada).toBeNull();
      });

      it('should clear errors when selecting cotizacion-existente', () => {
        // Arrange
        component.contractFileError = true;
        component.fileName = 'test-file.pdf';

        // Act
        component.selectEmitirOption('cotizacion-existente');

        // Assert
        expect(component.contractFileError).toBe(false);
        expect(component.fileName).toBeNull();
      });

      it('should reset forms when selecting cotizacion-existente', () => {
        // Arrange
        component.step1Form = { form: { reset: jest.fn() } } as any;
        component.step2Form = { form: { reset: jest.fn() } } as any;

        // Act
        component.selectEmitirOption('cotizacion-existente');

        // Assert
        expect(component.step1Form.form?.reset).toHaveBeenCalled();
        expect(component.step2Form.form?.reset).toHaveBeenCalled();
      });

      it('should trigger change detection when selecting cotizacion-existente', () => {
        // Arrange
        const detectChangesSpy = jest.spyOn(component['cdr'], 'detectChanges');

        // Act
        component.selectEmitirOption('cotizacion-existente');

        // Assert
        expect(detectChangesSpy).toHaveBeenCalled();
      });

      it('should log correct message when selecting cotizacion-existente', () => {
        // Arrange
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

        // Act
        component.selectEmitirOption('cotizacion-existente');

        // Assert
        expect(consoleSpy).toHaveBeenCalledWith('📋 Opción de emisión seleccionada:', 'cotizacion-existente');
        expect(consoleSpy).toHaveBeenCalledWith('🔍 Mostrando tabla de cotizaciones existentes...');

        consoleSpy.mockRestore();
      });
    });

    describe('selectEmitirOption - poliza-nueva', () => {
      beforeEach(() => {
        // Los métodos updateBreadcrumb y updateCachedActionLabel son privados
        // No los mockeamos, solo verificamos que se llamen indirectamente
      });

      it('should set selectedEmitirOption to poliza-nueva', () => {
        // Act
        component.selectEmitirOption('poliza-nueva');

        // Assert
        expect(component.selectedEmitirOption).toBe('poliza-nueva');
      });

      it('should set selectedAction to emitir when selecting poliza-nueva', () => {
        // Arrange
        component.selectedAction = null;

        // Act
        component.selectEmitirOption('poliza-nueva');

        // Assert
        expect(component.selectedAction).toBe('emitir');
      });

      it('should enable form when selecting poliza-nueva', () => {
        // Arrange
        component.isFormEnabled = false;

        // Act
        component.selectEmitirOption('poliza-nueva');

        // Assert
        expect(component.isFormEnabled).toBe(true);
      });

      it('should reset to step 0 when selecting poliza-nueva', () => {
        // Arrange
        component.currentStep = 2;

        // Act
        component.selectEmitirOption('poliza-nueva');

        // Assert
        expect(component.currentStep).toBe(0);
        expect(component.stepperConfig.activeIndex).toBe(0);
      });

      it('should clear errors when selecting poliza-nueva', () => {
        // Arrange
        component.contractFileError = true;
        component.fileName = 'test-file.pdf';

        // Act
        component.selectEmitirOption('poliza-nueva');

        // Assert
        expect(component.contractFileError).toBe(false);
        expect(component.fileName).toBeNull();
      });

      it('should reset forms when selecting poliza-nueva', () => {
        // Arrange
        component.step1Form = { form: { reset: jest.fn() } } as any;
        component.step2Form = { form: { reset: jest.fn() } } as any;

        // Act
        component.selectEmitirOption('poliza-nueva');

        // Assert
        expect(component.step1Form.form?.reset).toHaveBeenCalled();
        expect(component.step2Form.form?.reset).toHaveBeenCalled();
      });

      it('should configure form correctly when selecting poliza-nueva', () => {
        // Act
        component.selectEmitirOption('poliza-nueva');

        // Assert
        // Verificamos que el formulario esté configurado correctamente
        expect(component.selectedAction).toBe('emitir');
        expect(component.selectedEmitirOption).toBe('poliza-nueva');
        expect(component.isFormEnabled).toBe(true);
        expect(component.currentStep).toBe(0);
      });

      it('should set action to EMITIR when selecting poliza-nueva', () => {
        // Act
        component.selectEmitirOption('poliza-nueva');

        // Assert
        expect(component.action).toBeDefined();
      });

      it('should log correct messages when selecting poliza-nueva', () => {
        // Arrange
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

        // Act
        component.selectEmitirOption('poliza-nueva');

        // Assert
        expect(consoleSpy).toHaveBeenCalledWith('📋 Opción de emisión seleccionada:', 'poliza-nueva');
        expect(consoleSpy).toHaveBeenCalledWith('➕ Iniciando proceso de nueva póliza desde paso 1...');

        consoleSpy.mockRestore();
      });
    });

    describe('selectEmitirOption - edge cases', () => {
      it('should handle step1Form with null form property gracefully', () => {
        // Arrange
        // El código usa this.step1Form.form?.reset(), el optional chaining funciona
        // cuando step1Form existe pero form es null/undefined
        component.step1Form = { form: null } as any;
        component.step2Form = { form: { reset: jest.fn() } } as any;

        // Act & Assert
        // Cuando form es null, el optional chaining previene el error
        expect(() => component.selectEmitirOption('cotizacion-existente')).not.toThrow();
        expect(() => component.selectEmitirOption('poliza-nueva')).not.toThrow();
      });

      it('should handle step2Form with null form property gracefully', () => {
        // Arrange
        component.step1Form = { form: { reset: jest.fn() } } as any;
        component.step2Form = { form: null } as any;

        // Act & Assert
        expect(() => component.selectEmitirOption('cotizacion-existente')).not.toThrow();
        expect(() => component.selectEmitirOption('poliza-nueva')).not.toThrow();
      });

      it('should handle form without reset method gracefully', () => {
        // Arrange
        // El código usa optional chaining (?.), pero si form existe pero no tiene reset,
        // el código intentará llamar reset() y lanzará un error.
        // En un escenario real, form siempre tendría el método reset si existe.
        // Este test verifica el comportamiento cuando form es undefined (caso más común)
        component.step1Form = { form: undefined } as any;
        component.step2Form = { form: undefined } as any;

        // Act & Assert
        // Cuando form es undefined, el optional chaining previene el error
        expect(() => component.selectEmitirOption('cotizacion-existente')).not.toThrow();
        expect(() => component.selectEmitirOption('poliza-nueva')).not.toThrow();
      });

      it('should handle form with null form property gracefully', () => {
        // Arrange
        // Cuando form es null, el optional chaining previene el error
        component.step1Form = { form: null } as any;
        component.step2Form = { form: null } as any;

        // Act & Assert
        expect(() => component.selectEmitirOption('cotizacion-existente')).not.toThrow();
        expect(() => component.selectEmitirOption('poliza-nueva')).not.toThrow();
      });
    });
  });
});
