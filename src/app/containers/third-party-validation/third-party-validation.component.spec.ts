import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { ThirdPartyValidationComponent } from './third-party-validation.component';
import { 
  ValidationStatus,
  INITIAL_THIRD_PARTY_STATE,
  MOCK_VALIDATION_RESULTS
} from './third-party-validation.interface';

// ✅ Mocks para dependencies
const mockRouter = {
  navigate: jest.fn()
};

const mockChangeDetectorRef = {
  detectChanges: jest.fn()
};

describe('ThirdPartyValidationComponent', () => {
  let component: ThirdPartyValidationComponent;
  let fixture: ComponentFixture<ThirdPartyValidationComponent>;
  let router: Router;
  let cdr: ChangeDetectorRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThirdPartyValidationComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ChangeDetectorRef, useValue: mockChangeDetectorRef }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ThirdPartyValidationComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    cdr = TestBed.inject(ChangeDetectorRef);
    
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Inicialización', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with IDLE state', () => {
      expect(component.currentThirdParty.status).toBe(ValidationStatus.IDLE);
      expect(component.isIdle).toBe(true);
      expect(component.hasResults).toBe(false);
    });

    it('should have empty validation results initially', () => {
      expect(component.validationResults).toBeNull();
      expect(component.showSpinner).toBe(false);
      expect(component.validationProgress).toBe(0);
    });

    it('should initialize thirdPartyForm configuration', () => {
      const formConfig = component.thirdPartyForm;
      expect(formConfig).toBeDefined();
      expect(formConfig.validateOnSubmit).toBe(true);
      expect(formConfig.configContainers).toBeDefined();
      expect(formConfig.config).toBeDefined();
    });
  });

  describe('Formulario Dinámico', () => {
    it('should have correct form containers', () => {
      const formConfig = component.thirdPartyForm;
      const containerIds = formConfig.configContainers?.map(c => c.id);
      
      expect(containerIds).toContain('form-wrapper-container');
      expect(containerIds).toContain('header-container');
      expect(containerIds).toContain('basic-info-container');
      expect(containerIds).toContain('contact-info-container');
      expect(containerIds).toContain('actions-container');
    });

    it('should validate form before starting validation', () => {
      const mockForm = {
        valid: false,
        value: {},
        reset: jest.fn()
      };
      component.thirdPartyForm.form = mockForm;
      component.thirdPartyForm.libTbCallSubmit = jest.fn();

      component.validateThirdParty();

      expect(component.thirdPartyForm.libTbCallSubmit).toHaveBeenCalled();
      expect(component.currentThirdParty.status).toBe(ValidationStatus.IDLE);
    });

    it('should start validation when form is valid', () => {
      const mockFormData = {
        entityType: 'Persona Natural',
        documentType: 'CC',
        documentNumber: '12345678',
        firstName: 'Juan',
        lastName: 'Pérez',
        country: 'CO'
      };

      const mockForm = {
        valid: true,
        value: mockFormData,
        reset: jest.fn()
      };
      component.thirdPartyForm.form = mockForm;
      component.thirdPartyForm.libTbCallSubmit = jest.fn();

      jest.spyOn(component, 'startValidation');

      component.validateThirdParty();

      expect(component.startValidation).toHaveBeenCalledWith(mockFormData);
    });
  });

  describe('Estados del Componente', () => {
    it('should have correct getter values for IDLE state', () => {
      component.currentThirdParty.status = ValidationStatus.IDLE;
      
      expect(component.isIdle).toBe(true);
      expect(component.isValidating).toBe(false);
      expect(component.hasResults).toBe(false);
      expect(component.hasError).toBe(false);
    });

    it('should have correct getter values for VALIDATING state', () => {
      component.currentThirdParty.status = ValidationStatus.VALIDATING;
      
      expect(component.isIdle).toBe(false);
      expect(component.isValidating).toBe(true);
      expect(component.hasResults).toBe(false);
      expect(component.hasError).toBe(false);
    });

    it('should have correct getter values for COMPLETED state', () => {
      component.currentThirdParty.status = ValidationStatus.COMPLETED;
      component.validationResults = MOCK_VALIDATION_RESULTS;
      
      expect(component.isIdle).toBe(false);
      expect(component.isValidating).toBe(false);
      expect(component.hasResults).toBe(true);
      expect(component.hasError).toBe(false);
    });

    it('should have correct getter values for ERROR state', () => {
      component.currentThirdParty.status = ValidationStatus.ERROR;
      
      expect(component.isIdle).toBe(false);
      expect(component.isValidating).toBe(false);
      expect(component.hasResults).toBe(false);
      expect(component.hasError).toBe(true);
    });
  });

  describe('Alertas de Estado', () => {
    it('should return null alert when IDLE', () => {
      component.currentThirdParty.status = ValidationStatus.IDLE;
      
      const alert = component.getStatusAlert();
      expect(alert).toBeNull();
    });

    it('should return info alert when VALIDATING', () => {
      component.currentThirdParty.status = ValidationStatus.VALIDATING;
      
      const alert = component.getStatusAlert();
      expect(alert).toBeDefined();
      expect(alert?.alerts[0].type).toBe('info');
    });

    it('should return success alert when COMPLETED', () => {
      component.currentThirdParty.status = ValidationStatus.COMPLETED;
      component.validationResults = MOCK_VALIDATION_RESULTS;
      
      const alert = component.getStatusAlert();
      expect(alert).toBeDefined();
      expect(alert?.alerts[0].type).toBe('success');
    });

    it('should return error alert when ERROR', () => {
      component.currentThirdParty.status = ValidationStatus.ERROR;
      
      const alert = component.getStatusAlert();
      expect(alert).toBeDefined();
      expect(alert?.alerts[0].type).toBe('error');
    });
  });

  describe('Validación de Terceros', () => {
    it('should start validation with correct data', () => {
      const formData = {
        entityType: 'Persona Natural',
        documentType: 'CC',
        documentNumber: '12345678'
      };

      jest.spyOn(component, 'simulateValidation');

      component.startValidation(formData);

      expect(component.currentThirdParty.status).toBe(ValidationStatus.VALIDATING);
      expect(component.currentThirdParty.documentNumber).toBe('12345678');
      expect(component.validationProgress).toBe(0);
      expect(component.simulateValidation).toHaveBeenCalled();
    });

    it('should complete validation successfully', () => {
      component.currentThirdParty = {
        ...INITIAL_THIRD_PARTY_STATE,
        id: 'test-id',
        documentNumber: '12345678'
      };

      component.completeValidation();

      expect(component.currentThirdParty.status).toBe(ValidationStatus.COMPLETED);
      expect(component.validationResults).toBeDefined();
      expect(mockChangeDetectorRef.detectChanges).toHaveBeenCalled();
    });

    it('should handle validation error', () => {
      const errorMessage = 'Test error message';

      component.setError(errorMessage);

      expect(component.currentThirdParty.status).toBe(ValidationStatus.ERROR);
      expect(component.showSpinner).toBe(false);
      expect(mockChangeDetectorRef.detectChanges).toHaveBeenCalled();
    });
  });

  describe('Navegación', () => {
    beforeEach(() => {
      component.validationResults = MOCK_VALIDATION_RESULTS;
      component.currentThirdParty = {
        ...INITIAL_THIRD_PARTY_STATE,
        id: 'test-id',
        documentNumber: '12345678',
        entityType: 'Persona Natural'
      };
    });

    it('should navigate to financial analysis', () => {
      component.navigateToFinancialAnalysis();

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/financial-statement-reader'], {
        queryParams: {
          thirdPartyId: 'test-id',
          documentNumber: '12345678',
          entityType: 'Persona Natural'
        }
      });
    });

    it('should navigate to policy input for insurance recommendation', () => {
      const recommendation = MOCK_VALIDATION_RESULTS.recommendations[1]; // Seguro recommendation

      component.implementRecommendation(recommendation);

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/policy-input'], {
        queryParams: {
          action: 'cotizar',
          thirdPartyValidation: 'test-id',
          recommendationId: recommendation.id
        }
      });
    });

    it('should navigate to dashboard for monitoring recommendation', () => {
      const recommendation = MOCK_VALIDATION_RESULTS.recommendations[0]; // Monitoreo recommendation

      component.implementRecommendation(recommendation);

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard'], {
        queryParams: {
          setupMonitoring: 'test-id',
          recommendationId: recommendation.id
        }
      });
    });
  });

  describe('Utilidades', () => {
    it('should reset form', () => {
      const mockForm = {
        reset: jest.fn()
      };
      component.thirdPartyForm.form = mockForm;

      component.resetForm();

      expect(mockForm.reset).toHaveBeenCalled();
    });

    it('should reset validation completely', () => {
      // Set some state
      component.currentThirdParty.status = ValidationStatus.COMPLETED;
      component.validationResults = MOCK_VALIDATION_RESULTS;
      component.showSpinner = true;
      component.validationProgress = 100;

      jest.spyOn(component, 'resetForm');

      component.resetValidation();

      expect(component.currentThirdParty.status).toBe(ValidationStatus.IDLE);
      expect(component.validationResults).toBeNull();
      expect(component.showSpinner).toBe(false);
      expect(component.validationProgress).toBe(0);
      expect(component.resetForm).toHaveBeenCalled();
      expect(mockChangeDetectorRef.detectChanges).toHaveBeenCalled();
    });

    it('should generate unique IDs', () => {
      const id1 = component['generateId']();
      const id2 = component['generateId']();

      expect(id1).toBeDefined();
      expect(id2).toBeDefined();
      expect(id1).not.toBe(id2);
      expect(id1).toMatch(/^tp_\d+_[a-z0-9]+$/);
    });

    it('should format currency correctly', () => {
      expect(component.formatCurrency(1000000)).toBe('$1.000.000');
      expect(component.formatCurrency(undefined)).toBe('N/A');
      expect(component.formatCurrency(0)).toBe('N/A');
    });

    it('should format dates correctly', () => {
      const testDate = '2024-01-15T10:00:00Z';
      const formatted = component.formatDate(testDate);
      
      expect(formatted).toBeDefined();
      expect(formatted).not.toBe('N/A');
      expect(component.formatDate(undefined)).toBe('N/A');
    });
  });

  describe('CSS Classes Helpers', () => {
    it('should return correct priority classes', () => {
      expect(component.getPriorityClass('Crítica')).toContain('bg-errorBase');
      expect(component.getPriorityClass('Alta')).toContain('bg-errorBase');
      expect(component.getPriorityClass('Media')).toContain('bg-warningBase');
      expect(component.getPriorityClass('Baja')).toContain('bg-infoBase');
    });

    it('should return correct risk level classes', () => {
      expect(component.getRiskLevelClass('Sin Riesgo')).toContain('bg-successBase');
      expect(component.getRiskLevelClass('Bajo')).toContain('bg-infoBase');
      expect(component.getRiskLevelClass('Medio')).toContain('bg-warningBase');
      expect(component.getRiskLevelClass('Alto')).toContain('bg-errorBase');
      expect(component.getRiskLevelClass('Crítico')).toContain('bg-errorBase');
    });

    it('should return correct impact classes', () => {
      expect(component.getImpactClass('Positivo')).toContain('text-successBase');
      expect(component.getImpactClass('Neutral')).toContain('text-grayscaleD200');
      expect(component.getImpactClass('Negativo')).toContain('text-errorBase');
      expect(component.getImpactClass('Crítico')).toContain('text-errorBase');
    });

    it('should return correct action classes', () => {
      expect(component.getActionClass('Aprobar')).toContain('bg-successBase');
      expect(component.getActionClass('Revisar')).toContain('bg-warningBase');
      expect(component.getActionClass('Rechazar')).toContain('bg-errorBase');
      expect(component.getActionClass('Investigar')).toContain('bg-errorBase');
    });
  });

  describe('Export Functionality', () => {
    beforeEach(() => {
      component.validationResults = MOCK_VALIDATION_RESULTS;
      component.currentThirdParty = {
        ...INITIAL_THIRD_PARTY_STATE,
        documentNumber: '12345678'
      };

      // Mock window.URL
      global.URL.createObjectURL = jest.fn(() => 'mock-url');
      global.URL.revokeObjectURL = jest.fn();
      
      // Mock document.createElement
      const mockLink = {
        href: '',
        download: '',
        click: jest.fn()
      };
      jest.spyOn(document, 'createElement').mockReturnValue(mockLink as any);
    });

    it('should export results to JSON file', () => {
      component.exportResults();

      expect(document.createElement).toHaveBeenCalledWith('a');
      expect(global.URL.createObjectURL).toHaveBeenCalled();
      expect(global.URL.revokeObjectURL).toHaveBeenCalled();
    });

    it('should not export if no results available', () => {
      component.validationResults = null;

      component.exportResults();

      expect(document.createElement).not.toHaveBeenCalled();
    });
  });
}); 