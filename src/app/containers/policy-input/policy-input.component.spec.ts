import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PolicyInputComponent } from './policy-input.component';
import { BreadcrumbService } from '../../shared/services/breadcrumb.service';

// Mock de los servicios
const mockRouter = {
  navigate: jest.fn(),
  events: {
    pipe: jest.fn().mockReturnValue({ subscribe: jest.fn() })
  }
};

const mockBreadcrumbService = {
  setHeaderBreadcrumb: jest.fn()
};

const mockChangeDetectorRef = {
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
        { provide: BreadcrumbService, useValue: mockBreadcrumbService },
        { provide: ChangeDetectorRef, useValue: mockChangeDetectorRef }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PolicyInputComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
  });

  describe('Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have default step as 1', () => {
      expect(component.currentStep).toBe(1);
    });

    it('should have coberturasCumplimiento array', () => {
      expect(component.coberturasCumplimiento).toBeDefined();
      expect(Array.isArray(component.coberturasCumplimiento)).toBe(true);
    });

    it('should have rcCoberturas array', () => {
      expect(component.rcCoberturas).toBeDefined();
      expect(Array.isArray(component.rcCoberturas)).toBe(true);
    });

    it('should have agentesAdicionales array', () => {
      expect(component.agentesAdicionales).toBeDefined();
      expect(Array.isArray(component.agentesAdicionales)).toBe(true);
    });

    it('should have coasegurosCedidos array', () => {
      expect(component.coasegurosCedidos).toBeDefined();
      expect(Array.isArray(component.coasegurosCedidos)).toBe(true);
    });

    it('should have documentosSoporte array', () => {
      expect(component.documentosSoporte).toBeDefined();
      expect(Array.isArray(component.documentosSoporte)).toBe(true);
    });
  });

  describe('formatearNumero', () => {
    it('should format numbers with thousands separator', () => {
      expect(component.formatearNumero(1000)).toBe('1.000');
      expect(component.formatearNumero(1000000)).toBe('1.000.000');
      expect(component.formatearNumero(150000000)).toBe('150.000.000');
    });

    it('should return "0" for zero', () => {
      expect(component.formatearNumero(0)).toBe('0');
    });
  });

  describe('formatCurrency', () => {
    it('should format currency values', () => {
      const result = component.formatCurrency(1000000);
      expect(result).toContain('1.000.000');
    });

    it('should return empty for zero', () => {
      const result = component.formatCurrency(0);
      expect(result).toBe('');
    });
  });

  describe('Coberturas Cumplimiento', () => {
    it('should toggle cobertura selection', () => {
      const cob = component.coberturasCumplimiento[0];
      const initialState = cob.seleccionada;
      
      component.toggleCobertura(cob);
      
      expect(cob.seleccionada).toBe(!initialState);
    });

    it('should toggle all coberturas', () => {
      const event = { target: { checked: true } };
      component.toggleTodasCoberturas(event);
      
      component.coberturasCumplimiento.forEach(cob => {
        expect(cob.seleccionada).toBe(true);
      });
    });

    it('should clear all cobertura selections', () => {
      component.coberturasCumplimiento.forEach(cob => cob.seleccionada = true);
      
      component.limpiarSeleccionCoberturas();
      
      component.coberturasCumplimiento.forEach(cob => {
        expect(cob.seleccionada).toBe(false);
      });
    });

    it('should get selected coberturas count', () => {
      component.coberturasCumplimiento.forEach(cob => cob.seleccionada = false);
      component.coberturasCumplimiento[0].seleccionada = true;
      component.coberturasCumplimiento[1].seleccionada = true;
      
      expect(component.getCoberturasSeleccionadasCount()).toBe(2);
    });
  });

  describe('Coberturas RC', () => {
    it('should toggle RC cobertura selection', () => {
      const cob = component.rcCoberturas[0];
      const initialState = cob.seleccionada;
      
      component.toggleCoberturaRC(cob);
      
      expect(cob.seleccionada).toBe(!initialState);
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
      const otherCob = { nombre: 'OTRA COBERTURA' };
      
      expect(component.esCobertura222(cob222)).toBe(true);
      expect(component.esCobertura222(otherCob)).toBe(false);
    });
  });

  describe('onCampoRCCambio', () => {
    it('should calculate prima based on valorAsegurado and tasa', () => {
      const cob = {
        nombre: 'Test',
        valorAsegurado: 100000000,
        tasa: 0.5,
        prima: 0
      };
      
      component.onCampoRCCambio(cob);
      
      expect(cob.prima).toBe(500000);
    });

    it('should handle zero values', () => {
      const cob = {
        nombre: 'Test',
        valorAsegurado: 0,
        tasa: 0.5,
        prima: 0
      };
      
      component.onCampoRCCambio(cob);
      
      expect(cob.prima).toBe(0);
    });
  });

  describe('Toast Notifications', () => {
    it('should show toast with message', () => {
      component.mostrarToast('Test message', 'success');
      
      expect(component.showToast).toBe(true);
      expect(component.toastMessage).toBe('Test message');
      expect(component.toastType).toBe('success');
    });

    it('should hide toast after timeout', fakeAsync(() => {
      component.mostrarToast('Test', 'info');
      
      expect(component.showToast).toBe(true);
      
      tick(10000);
      
      expect(component.showToast).toBe(false);
    }));

    it('should close toast manually', () => {
      component.showToast = true;
      component.cerrarToast();
      
      expect(component.showToast).toBe(false);
    });
  });

  describe('actualizarValorAsegurado', () => {
    it('should parse and update valor asegurado', () => {
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
  });

  describe('Data Persistence', () => {
    it('should save form data to sessionStorage', () => {
      component.tipoDocumentoTomador = 'CC';
      component.numeroDocumentoTomador = '123456';
      
      component.guardarDatosFormulario();
      
      const savedData = sessionStorage.getItem('policyInputFormData');
      expect(savedData).toBeTruthy();
    });

    it('should load form data from sessionStorage', () => {
      const testData = {
        tipoDocumentoTomador: 'NT',
        numeroDocumentoTomador: '999999',
        nombreTomador: 'Test Company'
      };
      
      sessionStorage.setItem('policyInputFormData', JSON.stringify(testData));
      
      component.cargarDatosFormulario();
      
      expect(component.tipoDocumentoTomador).toBe('NT');
      expect(component.numeroDocumentoTomador).toBe('999999');
    });
  });

  describe('Agentes', () => {
    it('should remove agente adicional', () => {
      component.agentesAdicionales = [
        { clave: '1', nombre: 'Agente 1', comision: 10 },
        { clave: '2', nombre: 'Agente 2', comision: 15 }
      ];
      
      component.eliminarAgente(0);
      
      expect(component.agentesAdicionales.length).toBe(1);
      expect(component.agentesAdicionales[0].clave).toBe('2');
    });
  });
});
