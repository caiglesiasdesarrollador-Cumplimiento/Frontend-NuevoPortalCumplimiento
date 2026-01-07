import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { PolicyInputComponent } from './policy-input.component';
import { BreadcrumbService } from '../../shared/services/breadcrumb.service';

// Mocks
const mockRouter = {
  navigate: jest.fn(),
  events: { pipe: jest.fn().mockReturnValue({ subscribe: jest.fn() }) }
};

const mockActivatedRoute = {
  snapshot: { queryParams: {} },
  queryParams: { subscribe: jest.fn() }
};

const mockBreadcrumbService = {
  setHeaderBreadcrumb: jest.fn()
};

const mockCdr = {
  detectChanges: jest.fn()
};

describe('PolicyInputComponent', () => {
  let component: PolicyInputComponent;
  let fixture: ComponentFixture<PolicyInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PolicyInputComponent],
      imports: [FormsModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: BreadcrumbService, useValue: mockBreadcrumbService },
        { provide: ChangeDetectorRef, useValue: mockCdr }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PolicyInputComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
  });

  // =============================================
  // INITIALIZATION TESTS
  // =============================================
  describe('Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have default currentStep as 0', () => {
      expect(component.currentStep).toBe(0);
    });

    it('should have coberturasCumplimiento array initialized', () => {
      expect(component.coberturasCumplimiento).toBeDefined();
      expect(Array.isArray(component.coberturasCumplimiento)).toBe(true);
    });

    it('should have rcCoberturas array initialized', () => {
      expect(component.rcCoberturas).toBeDefined();
      expect(Array.isArray(component.rcCoberturas)).toBe(true);
    });

    it('should have default valorContrato', () => {
      expect(component.valorContrato).toBe(150000000);
    });

    it('should have documentosSoporte array', () => {
      expect(component.documentosSoporte).toBeDefined();
      expect(Array.isArray(component.documentosSoporte)).toBe(true);
    });

    it('should have agentesAdicionales array', () => {
      expect(component.agentesAdicionales).toBeDefined();
      expect(Array.isArray(component.agentesAdicionales)).toBe(true);
    });

    it('should have coasegurosCedidos array', () => {
      expect(component.coasegurosCedidos).toBeDefined();
      expect(Array.isArray(component.coasegurosCedidos)).toBe(true);
    });

    it('should have default isViewDetailsMode as false', () => {
      expect(component.isViewDetailsMode).toBe(false);
    });

    it('should have default isRcSectionEnabled as true', () => {
      expect(component.isRcSectionEnabled).toBe(true);
    });

    it('should have default isFormEnabled as true', () => {
      expect(component.isFormEnabled).toBe(true);
    });

    it('should have default showToast as false', () => {
      expect(component.showToast).toBe(false);
    });

    it('should have default isUploading as false', () => {
      expect(component.isUploading).toBe(false);
    });

    it('should have incrementoContrato defined', () => {
      expect(component.incrementoContrato).toBe(10000000);
    });
  });

  // =============================================
  // FORMAT METHODS TESTS
  // =============================================
  describe('formatearNumero', () => {
    it('should format number with thousands separator', () => {
      expect(component.formatearNumero(1000)).toBe('1.000');
    });

    it('should format million', () => {
      expect(component.formatearNumero(1000000)).toBe('1.000.000');
    });

    it('should format large number', () => {
      expect(component.formatearNumero(150000000)).toBe('150.000.000');
    });

    it('should return "0" for zero', () => {
      expect(component.formatearNumero(0)).toBe('0');
    });

    it('should return "0" for null', () => {
      expect(component.formatearNumero(null as any)).toBe('0');
    });

    it('should return "0" for undefined', () => {
      expect(component.formatearNumero(undefined as any)).toBe('0');
    });

    it('should handle small numbers', () => {
      expect(component.formatearNumero(100)).toBe('100');
    });

    it('should format billion', () => {
      expect(component.formatearNumero(1000000000)).toBe('1.000.000.000');
    });
  });

  describe('formatCurrency', () => {
    it('should format currency with peso sign', () => {
      const result = component.formatCurrency(1000000);
      expect(result).toContain('1.000.000');
    });

    it('should handle zero value', () => {
      const result = component.formatCurrency(0);
      expect(typeof result).toBe('string');
    });
  });

  // =============================================
  // COBERTURAS CUMPLIMIENTO TESTS
  // =============================================
  describe('Coberturas Cumplimiento', () => {
    it('should toggle cobertura selection on', () => {
      const cob = component.coberturasCumplimiento[0];
      cob.seleccionada = false;
      component.toggleCobertura(cob);
      expect(cob.seleccionada).toBe(true);
    });

    it('should toggle cobertura selection off', () => {
      const cob = component.coberturasCumplimiento[0];
      cob.seleccionada = true;
      component.toggleCobertura(cob);
      expect(cob.seleccionada).toBe(false);
    });

    it('should toggle all coberturas to true', () => {
      const event = { target: { checked: true } };
      component.toggleTodasCoberturas(event);
      
      component.coberturasCumplimiento.forEach(cob => {
        expect(cob.seleccionada).toBe(true);
      });
    });

    it('should toggle all coberturas to false', () => {
      const event = { target: { checked: false } };
      component.toggleTodasCoberturas(event);
      
      component.coberturasCumplimiento.forEach(cob => {
        expect(cob.seleccionada).toBe(false);
      });
    });

    it('should clear all cobertura selections', () => {
      component.coberturasCumplimiento.forEach(cob => cob.seleccionada = true);
      component.limpiarSeleccionCoberturas();
      
      component.coberturasCumplimiento.forEach(cob => {
        expect(cob.seleccionada).toBe(false);
      });
    });

    it('should count selected coberturas', () => {
      component.coberturasCumplimiento.forEach(cob => cob.seleccionada = false);
      component.coberturasCumplimiento[0].seleccionada = true;
      component.coberturasCumplimiento[1].seleccionada = true;
      
      expect(component.getCoberturasSeleccionadasCount()).toBe(2);
    });

    it('should return 0 when no coberturas selected', () => {
      component.coberturasCumplimiento.forEach(cob => cob.seleccionada = false);
      expect(component.getCoberturasSeleccionadasCount()).toBe(0);
    });
  });

  // =============================================
  // COBERTURAS RC TESTS
  // =============================================
  describe('Coberturas RC', () => {
    it('should toggle RC cobertura on', () => {
      const cob = component.rcCoberturas[0];
      cob.seleccionada = false;
      component.toggleCoberturaRC(cob);
      expect(cob.seleccionada).toBe(true);
    });

    it('should toggle RC cobertura off', () => {
      const cob = component.rcCoberturas[0];
      cob.seleccionada = true;
      component.toggleCoberturaRC(cob);
      expect(cob.seleccionada).toBe(false);
    });

    it('should toggle all RC coberturas', () => {
      const event = { target: { checked: true } };
      component.toggleTodasCoberturasRC(event);
      
      component.rcCoberturas.forEach(cob => {
        expect(cob.seleccionada).toBe(true);
      });
    });

    it('should clear RC cobertura selections', () => {
      component.rcCoberturas.forEach(cob => cob.seleccionada = true);
      component.limpiarSeleccionRC();
      
      component.rcCoberturas.forEach(cob => {
        expect(cob.seleccionada).toBe(false);
      });
    });

    it('should identify cobertura 222', () => {
      const cob222 = { nombre: '222- PREDIOS LABOR Y OPERACIO' };
      expect(component.esCobertura222(cob222)).toBe(true);
    });

    it('should not identify other coberturas as 222', () => {
      const otherCob = { nombre: 'OTRA COBERTURA' };
      expect(component.esCobertura222(otherCob)).toBe(false);
    });
  });

  // =============================================
  // PRIMA CALCULATIONS TESTS
  // =============================================
  describe('Prima Calculations', () => {
    it('should calculate prima for RC', () => {
      const cob = {
        nombre: 'Test',
        valorAsegurado: 100000000,
        tasa: 0.5,
        prima: 0
      };
      
      component.onCampoRCCambio(cob);
      expect(cob.prima).toBe(500000);
    });

    it('should handle zero valorAsegurado', () => {
      const cob = { valorAsegurado: 0, tasa: 0.5, prima: 0 };
      component.onCampoRCCambio(cob);
      expect(cob.prima).toBe(0);
    });

    it('should handle zero tasa', () => {
      const cob = { valorAsegurado: 100000000, tasa: 0, prima: 0 };
      component.onCampoRCCambio(cob);
      expect(cob.prima).toBe(0);
    });

    it('should get total participacion agentes', () => {
      component.agentesAdicionales = [
        { clave: '1', nombre: 'A1', participacion: 10 },
        { clave: '2', nombre: 'A2', participacion: 15 }
      ];
      expect(component.getTotalParticipacionAgentes()).toBe(25);
    });

    it('should return 0 for empty agentes', () => {
      component.agentesAdicionales = [];
      expect(component.getTotalParticipacionAgentes()).toBe(0);
    });

    it('should get total participacion coaseguros', () => {
      component.coasegurosCedidos = [
        { aseguradora: 'A', participacion: 60 },
        { aseguradora: 'B', participacion: 20 }
      ];
      expect(component.getTotalParticipacionCoaseguro()).toBe(80);
    });
  });

  // =============================================
  // VALOR ASEGURADO TESTS
  // =============================================
  describe('actualizarValorAsegurado', () => {
    it('should parse formatted number', () => {
      const cob = { valorAsegurado: 0 };
      const event = { target: { value: '1.000.000' } };
      component.actualizarValorAsegurado(cob, event);
      expect(cob.valorAsegurado).toBe(1000000);
    });

    it('should handle empty value', () => {
      const cob = { valorAsegurado: 100 };
      const event = { target: { value: '' } };
      component.actualizarValorAsegurado(cob, event);
      expect(cob.valorAsegurado).toBe(0);
    });

    it('should handle plain number', () => {
      const cob = { valorAsegurado: 0 };
      const event = { target: { value: '500000' } };
      component.actualizarValorAsegurado(cob, event);
      expect(cob.valorAsegurado).toBe(500000);
    });
  });

  // =============================================
  // AGENTES TESTS
  // =============================================
  describe('Agentes', () => {
    it('should remove agente by index', () => {
      component.agentesAdicionales = [
        { clave: '1', nombre: 'A1', participacion: 10 },
        { clave: '2', nombre: 'A2', participacion: 15 }
      ];
      component.eliminarAgente(0);
      expect(component.agentesAdicionales.length).toBe(1);
      expect(component.agentesAdicionales[0].clave).toBe('2');
    });

    it('should handle empty agentes list', () => {
      component.agentesAdicionales = [];
      expect(() => component.eliminarAgente(0)).not.toThrow();
    });
  });

  // =============================================
  // TOAST NOTIFICATIONS TESTS
  // =============================================
  describe('Toast Notifications', () => {
    it('should show toast', () => {
      component.mostrarToast('Test', 'success');
      expect(component.showToast).toBe(true);
      expect(component.toastMessage).toBe('Test');
    });

    it('should show error toast', () => {
      component.mostrarToast('Error', 'error');
      expect(component.toastType).toBe('error');
    });

    it('should show info toast', () => {
      component.mostrarToast('Info', 'info');
      expect(component.toastType).toBe('info');
    });

    it('should close toast', () => {
      component.showToast = true;
      component.cerrarToast();
      expect(component.showToast).toBe(false);
    });

    it('should hide toast after timeout', fakeAsync(() => {
      component.mostrarToast('Test', 'info');
      tick(10000);
      expect(component.showToast).toBe(false);
    }));
  });

  // =============================================
  // DATA PERSISTENCE TESTS
  // =============================================
  describe('Data Persistence', () => {
    it('should have guardarDatosFormulario method', () => {
      expect(typeof component.guardarDatosFormulario).toBe('function');
    });

    it('should have cargarDatosFormulario method', () => {
      expect(typeof component.cargarDatosFormulario).toBe('function');
    });

    it('should have hayDatosGuardados method', () => {
      expect(typeof component.hayDatosGuardados).toBe('function');
    });

    it('should call guardarDatosFormulario without error', () => {
      component.tipoDocumentoTomador = 'CC';
      expect(() => component.guardarDatosFormulario()).not.toThrow();
    });

    it('should call cargarDatosFormulario without error', () => {
      expect(() => component.cargarDatosFormulario()).not.toThrow();
    });
  });

  // =============================================
  // FORM FIELDS TESTS
  // =============================================
  describe('Form Fields', () => {
    it('should set tipoDocumentoTomador', () => {
      component.tipoDocumentoTomador = 'CC';
      expect(component.tipoDocumentoTomador).toBe('CC');
    });

    it('should set numeroDocumentoTomador', () => {
      component.numeroDocumentoTomador = '123456789';
      expect(component.numeroDocumentoTomador).toBe('123456789');
    });

    it('should set claveIntermediario', () => {
      component.claveIntermediario = '12345';
      expect(component.claveIntermediario).toBe('12345');
    });

    it('should set tipoProducto', () => {
      component.tipoProducto = 'Cumplimiento';
      expect(component.tipoProducto).toBe('Cumplimiento');
    });

    it('should set nombreTomador', () => {
      component.nombreTomador = 'Test User';
      expect(component.nombreTomador).toBe('Test User');
    });
  });

  // =============================================
  // ACTIVIDADES ECONOMICAS TESTS
  // =============================================
  describe('Actividades Economicas', () => {
    it('should have actividadesEconomicas', () => {
      expect(component.actividadesEconomicas).toBeDefined();
    });

    it('should get actividad nombre', () => {
      component.actividadesEconomicas = [
        { codigo: '001', nombre: 'Act 1' }
      ];
      expect(component.getActividadNombre('001')).toBe('Act 1');
    });

    it('should return empty for unknown codigo', () => {
      expect(component.getActividadNombre('999')).toBe('');
    });
  });
});
