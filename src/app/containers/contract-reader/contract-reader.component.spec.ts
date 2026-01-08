import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { ContractReaderComponent } from './contract-reader.component';
import { BreadcrumbService } from '../../shared/services/breadcrumb.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ProcessingStatus } from './contract-reader.interface';

describe('ContractReaderComponent', () => {
  let component: ContractReaderComponent;
  let fixture: ComponentFixture<ContractReaderComponent>;
  let router: jest.Mocked<Router>;
  let breadcrumbService: jest.Mocked<BreadcrumbService>;

  beforeEach(async () => {
    const routerMock = {
      navigate: jest.fn()
    };

    const breadcrumbServiceMock = {
      setBreadcrumb: jest.fn(),
      setContractReaderBreadcrumb: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [ContractReaderComponent],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: BreadcrumbService, useValue: breadcrumbServiceMock },
        ChangeDetectorRef
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ContractReaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
    breadcrumbService = TestBed.inject(BreadcrumbService) as jest.Mocked<BreadcrumbService>;
  });

  describe('Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize currentFile with IDLE status', () => {
      expect(component.currentFile.status).toBe(ProcessingStatus.IDLE);
    });

    it('should have analysisResults as null initially', () => {
      expect(component.analysisResults).toBeNull();
    });

    it('should have showSpinner as false initially', () => {
      expect(component.showSpinner).toBe(false);
    });
  });

  describe('ngOnInit', () => {
    it('should setup breadcrumb on init', () => {
      component.ngOnInit();
      expect(breadcrumbService.setBreadcrumb).toHaveBeenCalled();
    });
  });

  describe('File processing', () => {
    it('should process file when onFileCaught is called', () => {
      const processFileSpy = jest.spyOn(component, 'processFile');
      const mockFile = new File(['test'], 'test.pdf', { type: 'application/pdf' });
      
      component.onFileCaught([mockFile]);
      
      expect(processFileSpy).toHaveBeenCalledWith(mockFile);
    });

    it('should not process if no files provided', () => {
      const processFileSpy = jest.spyOn(component, 'processFile');
      
      component.onFileCaught([]);
      
      expect(processFileSpy).not.toHaveBeenCalled();
    });

    it('should set file info when processFile is called', () => {
      const mockFile = new File(['test content'], 'contract.pdf', { type: 'application/pdf' });
      
      component.processFile(mockFile);
      
      expect(component.currentFile.name).toBe('contract.pdf');
      expect(component.currentFile.type).toBe('application/pdf');
      expect(component.currentFile.status).toBe(ProcessingStatus.PROCESSING);
    });
  });

  describe('File deletion', () => {
    it('should reset analysis when file is deleted', () => {
      const resetSpy = jest.spyOn(component, 'resetAnalysis');
      const mockFile = new File(['test'], 'test.pdf', { type: 'application/pdf' });
      
      component.onFileDeleted(mockFile);
      
      expect(resetSpy).toHaveBeenCalled();
    });
  });

  describe('Reset analysis', () => {
    it('should reset all state when resetAnalysis is called', () => {
      component.analysisResults = { confidence: 90 } as any;
      component.showSpinner = true;
      
      component.resetAnalysis();
      
      expect(component.currentFile.status).toBe(ProcessingStatus.IDLE);
      expect(component.analysisResults).toBeNull();
      expect(component.showSpinner).toBe(false);
    });
  });

  describe('Export results', () => {
    it('should not export if no results', () => {
      const createElementSpy = jest.spyOn(document, 'createElement');
      component.analysisResults = null;
      
      component.exportResults();
      
      expect(createElementSpy).not.toHaveBeenCalled();
    });
  });

  describe('Navigation', () => {
    it('should not navigate to create policy if no results', () => {
      component.analysisResults = null;
      
      component.navigateToCreatePolicy();
      
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should navigate to create policy with params when results exist', () => {
      component.currentFile.id = 'file-123';
      component.analysisResults = { fileInfo: { id: 'file-123' } } as any;
      
      component.navigateToCreatePolicy();
      
      expect(router.navigate).toHaveBeenCalledWith(['/policy-input'], {
        queryParams: {
          action: 'emitir',
          contractAnalysis: 'file-123'
        }
      });
    });

    it('should navigate for policy suggestion', () => {
      component.currentFile.id = 'file-123';
      const suggestion = { id: 'sug-456' };
      
      component.createPolicyFromSuggestion(suggestion as any);
      
      expect(router.navigate).toHaveBeenCalledWith(['/policy-input'], {
        queryParams: {
          action: 'cotizar',
          suggestionId: 'sug-456',
          contractId: 'file-123'
        }
      });
    });
  });

  describe('Getters', () => {
    it('should return empty string for fileSize when size is 0', () => {
      component.currentFile.size = 0;
      expect(component.fileSize).toBe('');
    });

    it('should return formatted fileSize', () => {
      component.currentFile.size = 1048576; // 1 MB
      expect(component.fileSize).toBe('1.0 MB');
    });

    it('should return correct isProcessing status', () => {
      component.currentFile.status = ProcessingStatus.PROCESSING;
      expect(component.isProcessing).toBe(true);
      
      component.currentFile.status = ProcessingStatus.IDLE;
      expect(component.isProcessing).toBe(false);
    });

    it('should return correct hasResults status', () => {
      component.currentFile.status = ProcessingStatus.COMPLETED;
      component.analysisResults = { confidence: 90 } as any;
      expect(component.hasResults).toBe(true);
      
      component.analysisResults = null;
      expect(component.hasResults).toBe(false);
    });

    it('should return correct hasError status', () => {
      component.currentFile.status = ProcessingStatus.ERROR;
      expect(component.hasError).toBe(true);
      
      component.currentFile.status = ProcessingStatus.IDLE;
      expect(component.hasError).toBe(false);
    });

    it('should return correct isIdle status', () => {
      component.currentFile.status = ProcessingStatus.IDLE;
      expect(component.isIdle).toBe(true);
      
      component.currentFile.status = ProcessingStatus.PROCESSING;
      expect(component.isIdle).toBe(false);
    });
  });

  describe('Helper methods', () => {
    it('should return correct priority class', () => {
      expect(component.getPriorityClass('alta')).toContain('errorBase');
      expect(component.getPriorityClass('media')).toContain('warningBase');
      expect(component.getPriorityClass('baja')).toContain('infoBase');
      expect(component.getPriorityClass('unknown')).toContain('grayscaleL200');
    });

    it('should format currency correctly', () => {
      const formatted = component.formatCurrency(1000000);
      expect(formatted).toContain('1');
      expect(formatted).toContain('000');
    });
  });

  describe('Status alert', () => {
    it('should return null for IDLE status', () => {
      component.currentFile.status = ProcessingStatus.IDLE;
      expect(component.getStatusAlert()).toBeNull();
    });

    it('should return info alert for PROCESSING status', () => {
      component.currentFile.status = ProcessingStatus.PROCESSING;
      const alert = component.getStatusAlert();
      expect(alert).not.toBeNull();
      expect(alert?.alerts[0].type).toBe('info');
    });

    it('should return success alert for COMPLETED status', () => {
      component.currentFile.status = ProcessingStatus.COMPLETED;
      component.analysisResults = { confidence: 95 } as any;
      const alert = component.getStatusAlert();
      expect(alert).not.toBeNull();
      expect(alert?.alerts[0].type).toBe('success');
    });

    it('should return error alert for ERROR status', () => {
      component.currentFile.status = ProcessingStatus.ERROR;
      component.currentFile.errorMessage = 'Test error';
      const alert = component.getStatusAlert();
      expect(alert).not.toBeNull();
      expect(alert?.alerts[0].type).toBe('error');
    });
  });

  describe('Set error', () => {
    it('should set error state correctly', () => {
      component.setError('Test error message');
      
      expect(component.currentFile.status).toBe(ProcessingStatus.ERROR);
      expect(component.currentFile.errorMessage).toBe('Test error message');
      expect(component.showSpinner).toBe(false);
    });
  });

  describe('Complete analysis', () => {
    it('should set completed status and results', () => {
      component.currentFile = {
        id: 'test-id',
        name: 'test.pdf',
        size: 1000,
        type: 'application/pdf',
        lastModified: Date.now(),
        uploadedAt: new Date().toISOString(),
        status: ProcessingStatus.PROCESSING,
        progress: 50
      };
      
      component.completeAnalysis();
      
      expect(component.currentFile.status).toBe(ProcessingStatus.COMPLETED);
      expect(component.currentFile.progress).toBe(100);
      expect(component.analysisResults).not.toBeNull();
      expect(component.analysisResults?.confidence).toBe(92);
    });
  });
});

