import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { BreadcrumbService } from '../../shared/services/breadcrumb.service';
import { PolicyGenerationComponent } from './policy-generation.component';

describe('PolicyGenerationComponent', () => {
  let component: PolicyGenerationComponent;
  let fixture: ComponentFixture<PolicyGenerationComponent>;
  let mockBreadcrumbService: jest.Mocked<BreadcrumbService>;
  let mockChangeDetectorRef: jest.Mocked<ChangeDetectorRef>;

  beforeEach(async () => {
    // ✅ Mocks para dependencias
    mockBreadcrumbService = {
      setPolicyGenerationBreadcrumb: jest.fn(),
      setPolicyGenerationResultBreadcrumb: jest.fn()
    } as any;

    mockChangeDetectorRef = {
      detectChanges: jest.fn(),
      markForCheck: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      declarations: [PolicyGenerationComponent],
      providers: [
        { provide: BreadcrumbService, useValue: mockBreadcrumbService },
        { provide: ChangeDetectorRef, useValue: mockChangeDetectorRef }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PolicyGenerationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.policyRequest).toBeDefined();
    expect(component.generationResult).toBeNull();
    expect(component.isProcessing).toBe(false);
    expect(component.showProcessingAlert).toBe(false);
    expect(component.showErrorAlert).toBe(false);
    expect(component.showSuccessAlert).toBe(false);
  });

  it('should call breadcrumb service on init', () => {
    component.ngOnInit();
    expect(mockBreadcrumbService.setPolicyGenerationBreadcrumb).toHaveBeenCalled();
  });

  it('should return policy generation form configuration', () => {
    const form = component.policyGenerationForm;
    expect(form).toBeDefined();
    expect(form.validateOnSubmit).toBe(true);
    expect(form.configContainers).toBeDefined();
    expect(form.config).toBeDefined();
  });

  it('should have generate button configured', () => {
    expect(component.btnGenerate).toBeDefined();
    expect(component.btnGenerate.label).toBe('Generar Póliza');
    expect(component.btnGenerate.styleBtn).toBe('fill');
    expect(component.btnGenerate.typeBtn).toBe('primary');
  });

  it('should have reset button configured', () => {
    expect(component.btnReset).toBeDefined();
    expect(component.btnReset.label).toBe('Limpiar Formulario');
    expect(component.btnReset.styleBtn).toBe('stroke');
    expect(component.btnReset.typeBtn).toBe('secondary');
  });

  it('should reset form correctly', () => {
    // Arrange
    component.generationResult = {} as any;
    component.showSuccessAlert = true;
    
    // Act
    component.resetForm();
    
    // Assert
    expect(component.generationResult).toBeNull();
    expect(component.showProcessingAlert).toBe(false);
    expect(component.showErrorAlert).toBe(false);
    expect(component.showSuccessAlert).toBe(false);
    expect(mockBreadcrumbService.setPolicyGenerationBreadcrumb).toHaveBeenCalled();
    expect(mockChangeDetectorRef.detectChanges).toHaveBeenCalled();
  });

  it('should start new policy', () => {
    // Arrange
    const resetFormSpy = jest.spyOn(component, 'resetForm');
    
    // Act
    component.startNewPolicy();
    
    // Assert
    expect(resetFormSpy).toHaveBeenCalled();
  });

  it('should format currency correctly', () => {
    const result = component.formatCurrency(1000000);
    expect(result).toContain('$');
    expect(result).toContain('1.000.000');
  });

  it('should return correct status class for active status', () => {
    const statusClass = component.getStatusClass('active' as any);
    expect(statusClass).toBe('text-successBase');
  });

  it('should return correct status class for pending status', () => {
    const statusClass = component.getStatusClass('pending_approval' as any);
    expect(statusClass).toBe('text-warningBase');
  });

  it('should return correct status class for inactive status', () => {
    const statusClass = component.getStatusClass('inactive' as any);
    expect(statusClass).toBe('text-errorBase');
  });

  it('should have processing alert configuration', () => {
    const alert = component.processingAlert;
    expect(alert.title).toBe('Generando Póliza');
    expect(alert.type).toBe('info');
    expect(alert.showCloseButton).toBe(false);
  });

  it('should have success alert configuration', () => {
    component.generationResult = { policyNumber: 'POL-123456' } as any;
    const alert = component.successAlert;
    expect(alert.title).toBe('Póliza Generada Exitosamente');
    expect(alert.type).toBe('success');
    expect(alert.showCloseButton).toBe(true);
  });

  it('should have error alert configuration', () => {
    const alert = component.errorAlert;
    expect(alert.title).toBe('Error en la Generación');
    expect(alert.type).toBe('error');
    expect(alert.showCloseButton).toBe(true);
  });

  it('should have processing spinner configuration', () => {
    const spinner = component.processingSpinner;
    expect(spinner.strokeWidth).toBe(4);
    expect(spinner.animationDuration).toBe('1s');
  });

  it('should export result when generation result exists', () => {
    // Arrange
    component.generationResult = { policyNumber: 'POL-123456' } as any;
    
    // Mock createElement and click
    const mockElement = {
      setAttribute: jest.fn(),
      click: jest.fn()
    };
    const createElementSpy = jest.spyOn(document, 'createElement').mockReturnValue(mockElement as any);
    
    // Act
    component.exportResult();
    
    // Assert
    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(mockElement.setAttribute).toHaveBeenCalledWith('href', expect.any(String));
    expect(mockElement.setAttribute).toHaveBeenCalledWith('download', 'policy-POL-123456.json');
    expect(mockElement.click).toHaveBeenCalled();
    
    // Cleanup
    createElementSpy.mockRestore();
  });
}); 