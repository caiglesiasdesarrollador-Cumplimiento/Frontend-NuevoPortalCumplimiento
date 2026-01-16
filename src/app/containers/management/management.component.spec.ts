import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ManagementComponent } from './management.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../shared/services/breadcrumb.service';
import { IPolicyManagementItem, PolicyStatus, ProductType } from './management.interface';

describe('ManagementComponent', () => {
  let component: ManagementComponent;
  let fixture: ComponentFixture<ManagementComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagementComponent, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [BreadcrumbService],
    }).compileComponents();
    fixture = TestBed.createComponent(ManagementComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ✅ RF017.3: Tests para Imprimir Pólizas/Cotizaciones desde Management
  describe('RF017.3 - Imprimir Pólizas/Cotizaciones', () => {
    const mockItem = {
      id: 'p001',
      tipo: 'poliza',
      numero: 'POL-2024-001',
      tomador: 'Empresa Ejemplo S.A.S',
      numeroDocumento: '900123456-7',
      producto: 'Responsabilidad Civil',
      valorAsegurado: 500000000,
      estado: 'Activa',
      fechaCreacion: '2024-01-15',
      numeroContrato: 'CT-2024-001',
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

    it('should print poliza from management table', () => {
      // Act
      component.imprimirPoliza(mockItem as any);

      // Assert
      expect(window.open).toHaveBeenCalled();
    });

    it('should show alert if popup is blocked', () => {
      // Arrange
      jest.spyOn(window, 'open').mockReturnValue(null);
      jest.spyOn(window, 'alert').mockImplementation(() => {});

      // Act
      component.imprimirPoliza(mockItem as any);

      // Assert
      expect(window.alert).toHaveBeenCalledWith('Por favor, permite ventanas emergentes para imprimir');
    });

    it('should generate print content for poliza', () => {
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
      component.imprimirPoliza(mockItem as any);

      // Assert
      expect(printWindow.document.write).toHaveBeenCalled();
      const writtenContent = (printWindow.document.write as jest.Mock).mock.calls[0][0];
      expect(writtenContent).toContain('SEGUROS BOLÍVAR');
      expect(writtenContent).toContain('PÓLIZA');
      expect(writtenContent).toContain('POL-2024-001');
      expect(writtenContent).toContain('Empresa Ejemplo S.A.S');
    });

    it('should generate print content for cotización', () => {
      // Arrange
      const cotizacionItem = { ...mockItem, tipo: 'cotizacion', numero: 'COT-2024-001' };
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
      component.imprimirPoliza(cotizacionItem as any);

      // Assert
      const writtenContent = (printWindow.document.write as jest.Mock).mock.calls[0][0];
      expect(writtenContent).toContain('COTIZACIÓN');
      expect(writtenContent).toContain('COT-2024-001');
    });

    it('should create print button with correct configuration', () => {
      // Act
      const buttonConfig = component.getBtnPrint(mockItem as any);

      // Assert
      expect(buttonConfig.icon).toBe('fal fa-print');
      expect(buttonConfig.styleBtn).toBe('stroke');
      expect(buttonConfig.typeBtn).toBe('primary');
      expect(buttonConfig.libTbClick).toBeDefined();
    });

    it('should call imprimirPoliza when print button is clicked', () => {
      // Arrange
      jest.spyOn(component, 'imprimirPoliza');
      const buttonConfig = component.getBtnPrint(mockItem as any);

      // Act
      if (buttonConfig.libTbClick) {
        buttonConfig.libTbClick();
      }

      // Assert
      expect(component.imprimirPoliza).toHaveBeenCalledWith(mockItem);
    });
  });

  // ✅ RF017.1: Tests para Convertir Cotización a Póliza
  describe('RF017.1 - Convertir Cotización a Póliza', () => {
    const mockCotizacion: IPolicyManagementItem = {
      id: 'cot001',
      numero: 'COT-2024-001',
      tipo: 'cotizacion',
      producto: ProductType.RESPONSABILIDAD_CIVIL,
      tomador: 'Empresa XYZ Ltda',
      numeroDocumento: '900654321-2',
      valorAsegurado: 300000000,
      estado: PolicyStatus.COTIZADA,
      fechaCreacion: '2024-01-15',
      intermediario: 'Intermediario Test',
    };

    beforeEach(() => {
      component.selectedQuoteId = null;
      component.filteredData = [mockCotizacion];
      jest.spyOn(router, 'navigate').mockImplementation(() => Promise.resolve(true));
      jest.spyOn(component, 'showSuccessNotification').mockImplementation(() => {});
    });

    describe('getSelectedQuote', () => {
      it('should return undefined when no quote is selected', () => {
        // Arrange
        component.selectedQuoteId = null;

        // Act
        const result = component.getSelectedQuote();

        // Assert
        expect(result).toBeUndefined();
      });

      it('should return undefined when selected quote does not exist', () => {
        // Arrange
        component.selectedQuoteId = 'non-existent-id';
        component.filteredData = [mockCotizacion];

        // Act
        const result = component.getSelectedQuote();

        // Assert
        expect(result).toBeUndefined();
      });

      it('should return the selected quote when it exists', () => {
        // Arrange
        component.selectedQuoteId = 'cot001';
        component.filteredData = [mockCotizacion];

        // Act
        const result = component.getSelectedQuote();

        // Assert
        expect(result).toEqual(mockCotizacion);
      });

      it('should return correct quote when multiple quotes exist', () => {
        // Arrange
        const cotizacion2: IPolicyManagementItem = {
          ...mockCotizacion,
          id: 'cot002',
          numero: 'COT-2024-002',
        };
        component.selectedQuoteId = 'cot002';
        component.filteredData = [mockCotizacion, cotizacion2];

        // Act
        const result = component.getSelectedQuote();

        // Assert
        expect(result).toEqual(cotizacion2);
        expect(result?.id).toBe('cot002');
      });
    });

    describe('emitirPolizaSeleccionada', () => {
      it('should not navigate when no quote is selected', () => {
        // Arrange
        component.selectedQuoteId = null;
        const navigateSpy = jest.spyOn(router, 'navigate');
        const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

        // Act
        component.emitirPolizaSeleccionada();

        // Assert
        expect(navigateSpy).not.toHaveBeenCalled();
        expect(consoleWarnSpy).toHaveBeenCalledWith('⚠️ No hay cotización seleccionada');

        consoleWarnSpy.mockRestore();
      });

      it('should not navigate when selected quote does not exist', () => {
        // Arrange
        component.selectedQuoteId = 'non-existent-id';
        component.filteredData = [mockCotizacion];
        const navigateSpy = jest.spyOn(router, 'navigate');
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

        // Act
        component.emitirPolizaSeleccionada();

        // Assert
        expect(navigateSpy).not.toHaveBeenCalled();
        expect(consoleErrorSpy).toHaveBeenCalledWith('❌ Cotización no encontrada');

        consoleErrorSpy.mockRestore();
      });

      it('should navigate to quote-details with correct params when quote is selected', () => {
        // Arrange
        component.selectedQuoteId = 'cot001';
        component.filteredData = [mockCotizacion];
        const navigateSpy = jest.spyOn(router, 'navigate');

        // Act
        component.emitirPolizaSeleccionada();

        // Assert
        expect(navigateSpy).toHaveBeenCalledWith(['/quote-details', 'cot001'], {
          queryParams: {
            action: 'emitir',
            source: 'management',
            showEmissionButton: 'true',
          },
        });
      });

      it('should show success notification when quote is selected', () => {
        // Arrange
        component.selectedQuoteId = 'cot001';
        component.filteredData = [mockCotizacion];
        const showSuccessNotificationSpy = jest.spyOn(component, 'showSuccessNotification');

        // Act
        component.emitirPolizaSeleccionada();

        // Assert
        expect(showSuccessNotificationSpy).toHaveBeenCalledWith(
          'Revisión de cotización',
          'Mostrando resumen de la cotización COT-2024-001',
        );
      });

      it('should log correct message when emitting poliza', () => {
        // Arrange
        component.selectedQuoteId = 'cot001';
        component.filteredData = [mockCotizacion];
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

        // Act
        component.emitirPolizaSeleccionada();

        // Assert
        expect(consoleLogSpy).toHaveBeenCalledWith('📋 Mostrando resumen de cotización para emisión:', mockCotizacion);

        consoleLogSpy.mockRestore();
      });

      it('should handle navigation error gracefully', () => {
        // Arrange
        component.selectedQuoteId = 'cot001';
        component.filteredData = [mockCotizacion];
        jest.spyOn(router, 'navigate').mockRejectedValue(new Error('Navigation failed'));

        // Act & Assert
        expect(() => component.emitirPolizaSeleccionada()).not.toThrow();
      });
    });

    describe('getBtnEmitirPoliza', () => {
      it('should return disabled button when no quote is selected', () => {
        // Arrange
        component.selectedQuoteId = null;

        // Act
        const buttonConfig = component.getBtnEmitirPoliza();

        // Assert
        expect(buttonConfig.disabled).toBe(true);
        expect(buttonConfig.label).toBe('Emitir póliza');
        expect(buttonConfig.libTbClick).toBeUndefined();
      });

      it('should return enabled button when quote is selected', () => {
        // Arrange
        component.selectedQuoteId = 'cot001';

        // Act
        const buttonConfig = component.getBtnEmitirPoliza();

        // Assert
        expect(buttonConfig.disabled).toBe(false);
        expect(buttonConfig.label).toBe('Emitir póliza');
        expect(buttonConfig.styleBtn).toBe('fill');
        expect(buttonConfig.typeBtn).toBe('primary');
        expect(buttonConfig.class).toContain('rounded-full');
        expect(buttonConfig.libTbClick).toBeDefined();
      });

      it('should call emitirPolizaSeleccionada when button is clicked and quote is selected', () => {
        // Arrange
        component.selectedQuoteId = 'cot001';
        component.filteredData = [mockCotizacion];
        const emitirPolizaSpy = jest.spyOn(component, 'emitirPolizaSeleccionada');
        const buttonConfig = component.getBtnEmitirPoliza();

        // Act
        if (buttonConfig.libTbClick) {
          buttonConfig.libTbClick();
        }

        // Assert
        expect(emitirPolizaSpy).toHaveBeenCalled();
      });

      it('should have correct button styling', () => {
        // Arrange
        component.selectedQuoteId = 'cot001';

        // Act
        const buttonConfig = component.getBtnEmitirPoliza();

        // Assert
        expect(buttonConfig.styleBtn).toBe('fill');
        expect(buttonConfig.typeBtn).toBe('primary');
        expect(buttonConfig.class).toContain('rounded-full');
        expect(buttonConfig.class).toContain('px-8');
        expect(buttonConfig.class).toContain('py-3');
        expect(buttonConfig.class).toContain('min-w-[150px]');
      });
    });

    describe('onQuoteSelectionChange', () => {
      it('should update selectedQuoteId when quote is selected', () => {
        // Arrange
        component.selectedQuoteId = null;

        // Act
        component.onQuoteSelectionChange('cot001');

        // Assert
        expect(component.selectedQuoteId).toBe('cot001');
      });

      it('should log correct message when quote is selected', () => {
        // Arrange
        component.selectedQuoteId = null;
        component.filteredData = [mockCotizacion];
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

        // Act
        component.onQuoteSelectionChange('cot001');

        // Assert
        expect(consoleLogSpy).toHaveBeenCalledWith('📋 Cotización seleccionada:', 'cot001');
        expect(consoleLogSpy).toHaveBeenCalledWith('📋 Cotización seleccionada:', mockCotizacion.numero);

        consoleLogSpy.mockRestore();
      });

      it('should handle selection change when quote does not exist', () => {
        // Arrange
        component.selectedQuoteId = null;
        component.filteredData = [];
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

        // Act
        component.onQuoteSelectionChange('non-existent');

        // Assert
        expect(component.selectedQuoteId).toBe('non-existent');
        expect(consoleLogSpy).toHaveBeenCalledWith('📋 Cotización seleccionada:', 'non-existent');

        consoleLogSpy.mockRestore();
      });
    });
  });
});


