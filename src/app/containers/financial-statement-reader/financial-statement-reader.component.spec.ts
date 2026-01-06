import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { FinancialStatementReaderComponent } from './financial-statement-reader.component';
import { 
  ProcessingStatus,
  INITIAL_FINANCIAL_STATE 
} from './financial-statement-reader.interface';

// ✅ Mocks para dependencies
const mockRouter = {
  navigate: jest.fn()
};

const mockChangeDetectorRef = {
  detectChanges: jest.fn()
};

describe('FinancialStatementReaderComponent', () => {
  let component: FinancialStatementReaderComponent;
  let fixture: ComponentFixture<FinancialStatementReaderComponent>;
  let router: Router;
  let cdr: ChangeDetectorRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinancialStatementReaderComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ChangeDetectorRef, useValue: mockChangeDetectorRef }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FinancialStatementReaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    cdr = TestBed.inject(ChangeDetectorRef);
    
    // ✅ Reset mocks before each test
    jest.clearAllMocks();
  });

  // ✅ Tests básicos de inicialización
  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with default state', () => {
      expect(component.currentFile).toEqual(INITIAL_FINANCIAL_STATE);
      expect(component.analysisResults).toBeNull();
      expect(component.showSpinner).toBeFalsy();
    });

    it('should have proper fileUploadConfig setup', () => {
      expect(component.fileUploadConfig).toBeDefined();
      expect(component.fileUploadConfig.multiple).toBeFalsy();
      expect(component.fileUploadConfig.dragDropLabel).toContain('estado financiero');
    });
  });

  // ✅ Tests de estados del componente
  describe('Component States', () => {
    it('should return true for isIdle when status is IDLE', () => {
      component.currentFile.status = ProcessingStatus.IDLE;
      expect(component.isIdle).toBeTruthy();
    });

    it('should return true for isProcessing when status is PROCESSING', () => {
      component.currentFile.status = ProcessingStatus.PROCESSING;
      expect(component.isProcessing).toBeTruthy();
    });

    it('should return true for hasError when status is ERROR', () => {
      component.currentFile.status = ProcessingStatus.ERROR;
      expect(component.hasError).toBeTruthy();
    });

    it('should return true for hasResults when status is COMPLETED and results exist', () => {
      component.currentFile.status = ProcessingStatus.COMPLETED;
      component.analysisResults = { fileInfo: component.currentFile } as any;
      expect(component.hasResults).toBeTruthy();
    });
  });

  // ✅ Tests de manejo de archivos
  describe('File Handling', () => {
    const mockFile = new File(['content'], 'test-financial.pdf', { 
      type: 'application/pdf',
      lastModified: Date.now()
    });

    it('should process file when caught', () => {
      const processSpy = jest.spyOn(component, 'processFile');
      
      component.onFileCaught([mockFile]);
      
      expect(processSpy).toHaveBeenCalledWith(mockFile);
    });

    it('should reset analysis when file is deleted', () => {
      const resetSpy = jest.spyOn(component, 'resetAnalysis');
      
      component.onFileDeleted(mockFile);
      
      expect(resetSpy).toHaveBeenCalled();
    });

    it('should process file when reloaded', () => {
      const processSpy = jest.spyOn(component, 'processFile');
      const mockUploadingFile = { file: mockFile, fileName: 'test.pdf' } as any;
      
      component.onFileReload(mockUploadingFile);
      
      expect(processSpy).toHaveBeenCalledWith(mockFile);
    });
  });

  // ✅ Tests de navegación
  describe('Navigation', () => {
    beforeEach(() => {
      component.analysisResults = {
        fileInfo: { id: 'test-id' },
        riskAssessment: { creditRating: 'A', score: 85 }
      } as any;
    });

    it('should navigate to credit limit validation', () => {
      component.navigateToCreditLimit();
      
      expect(router.navigate).toHaveBeenCalledWith(['/credit-limit-validation'], {
        queryParams: {
          financialAnalysis: 'test-id',
          creditRating: 'A',
          riskScore: 85
        }
      });
    });

    it('should navigate to policy input with recommendation', () => {
      const mockRecommendation = {
        id: 'rec-1',
        productType: 'Seguro de Responsabilidad Civil',
        recommendedCoverage: 1000000
      } as any;

      component.createInsuranceFromRecommendation(mockRecommendation);
      
      expect(router.navigate).toHaveBeenCalledWith(['/policy-input'], {
        queryParams: {
          action: 'cotizar',
          productType: 'Seguro de Responsabilidad Civil',
          recommendationId: 'rec-1',
          financialAnalysisId: component.currentFile.id,
          suggestedCoverage: 1000000
        }
      });
    });
  });

  // ✅ Tests de formateo
  describe('Formatting Methods', () => {
    it('should format currency correctly', () => {
      const result = component.formatCurrency(1000000);
      expect(result).toContain('$');
      expect(result).toContain('1.000.000');
    });

    it('should format percentage correctly', () => {
      const result = component.formatPercentage(25.567);
      expect(result).toBe('25.6%');
    });

    it('should format ratio correctly', () => {
      const result = component.formatRatio(1.234567);
      expect(result).toBe('1.23');
    });

    it('should format file size correctly', () => {
      component.currentFile.size = 2048000; // 2MB
      const result = component.fileSize;
      expect(result).toBe('2.0 MB');
    });
  });

  // ✅ Tests de CSS classes
  describe('CSS Classes', () => {
    it('should return correct priority class', () => {
      expect(component.getPriorityClass('Alta')).toContain('bg-errorBase');
      expect(component.getPriorityClass('Media')).toContain('bg-warningBase');
      expect(component.getPriorityClass('Baja')).toContain('bg-infoBase');
    });

    it('should return correct risk level class', () => {
      expect(component.getRiskLevelClass('Muy Bajo')).toContain('bg-successBase');
      expect(component.getRiskLevelClass('Alto')).toContain('bg-errorBase');
    });

    it('should return correct impact class', () => {
      expect(component.getImpactClass('Positivo')).toContain('text-successBase');
      expect(component.getImpactClass('Negativo')).toContain('text-errorBase');
      expect(component.getImpactClass('Neutral')).toContain('text-grayscaleD200');
    });
  });

  // ✅ Tests de alertas
  describe('Alert Management', () => {
    it('should return null alert when status is IDLE', () => {
      component.currentFile.status = ProcessingStatus.IDLE;
      expect(component.getStatusAlert()).toBeNull();
    });

    it('should return info alert when processing', () => {
      component.currentFile.status = ProcessingStatus.PROCESSING;
      const alert = component.getStatusAlert();
      
      expect(alert).toBeDefined();
      expect(alert?.alerts[0].type).toBe('info');
    });

    it('should return success alert when completed', () => {
      component.currentFile.status = ProcessingStatus.COMPLETED;
      component.analysisResults = { confidence: 90, riskAssessment: { creditRating: 'A' } } as any;
      
      const alert = component.getStatusAlert();
      
      expect(alert).toBeDefined();
      expect(alert?.alerts[0].type).toBe('success');
    });

    it('should return error alert when failed', () => {
      component.currentFile.status = ProcessingStatus.ERROR;
      component.currentFile.errorMessage = 'Test error';
      
      const alert = component.getStatusAlert();
      
      expect(alert).toBeDefined();
      expect(alert?.alerts[0].type).toBe('error');
    });
  });

  // ✅ Tests de reset y exportación
  describe('Actions', () => {
    it('should reset analysis correctly', () => {
      component.currentFile.status = ProcessingStatus.COMPLETED;
      component.analysisResults = {} as any;
      component.showSpinner = true;

      component.resetAnalysis();

      expect(component.currentFile).toEqual(INITIAL_FINANCIAL_STATE);
      expect(component.analysisResults).toBeNull();
      expect(component.showSpinner).toBeFalsy();
      expect(cdr.detectChanges).toHaveBeenCalled();
    });

    it('should not export when no results', () => {
      component.analysisResults = null;
      
      // Spy on document methods
      const createElementSpy = jest.spyOn(document, 'createElement');
      
      component.exportResults();
      
      expect(createElementSpy).not.toHaveBeenCalled();
    });
  });
}); 