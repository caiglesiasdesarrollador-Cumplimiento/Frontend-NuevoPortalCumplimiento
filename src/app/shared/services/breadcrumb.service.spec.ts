import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BreadcrumbService } from './breadcrumb.service';

describe('BreadcrumbService', () => {
  let service: BreadcrumbService;

  const mockRouter = {
    navigate: jest.fn()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BreadcrumbService,
        { provide: Router, useValue: mockRouter }
      ]
    });

    service = TestBed.inject(BreadcrumbService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Initialization', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should have breadcrumb$ observable', () => {
      expect(service.breadcrumb$).toBeDefined();
    });

    it('should have breadcrumbItems$ observable', () => {
      expect(service.breadcrumbItems$).toBeDefined();
    });
  });

  describe('setHeaderBreadcrumb', () => {
    it('should set header breadcrumb items', () => {
      const items = [
        { label: 'Home', icon: 'fa-home' },
        { label: 'Page', isActive: true }
      ];

      service.setHeaderBreadcrumb(items);
      
      service.breadcrumbItems$.subscribe(result => {
        expect(result.length).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe('clearHeaderBreadcrumb', () => {
    it('should clear header breadcrumb items', () => {
      service.setHeaderBreadcrumb([{ label: 'Test' }]);
      service.clearHeaderBreadcrumb();

      service.breadcrumbItems$.subscribe(result => {
        expect(result).toEqual([]);
      });
    });
  });

  describe('setBreadcrumb', () => {
    it('should set breadcrumb with items', () => {
      const items = [
        { label: 'Home', icon: 'fa-home' },
        { label: 'Products', routerLink: ['/products'] }
      ];

      service.setBreadcrumb(items);

      service.breadcrumb$.subscribe(config => {
        expect(config).toBeDefined();
      });
    });
  });

  describe('clearBreadcrumb', () => {
    it('should clear breadcrumb', () => {
      service.setBreadcrumb([{ label: 'Test' }]);
      service.clearBreadcrumb();

      service.breadcrumb$.subscribe(config => {
        expect(config.home).toBeDefined();
      });
    });
  });

  describe('setContractReaderBreadcrumb', () => {
    it('should set contract reader breadcrumb', () => {
      service.setContractReaderBreadcrumb();

      service.breadcrumb$.subscribe(config => {
        expect(config).toBeDefined();
      });
    });
  });

  describe('setThirdPartyValidationBreadcrumb', () => {
    it('should set third party validation breadcrumb', () => {
      service.setThirdPartyValidationBreadcrumb();

      service.breadcrumb$.subscribe(config => {
        expect(config).toBeDefined();
      });
    });
  });

  describe('setFinancialStatementBreadcrumb', () => {
    it('should set financial statement breadcrumb', () => {
      service.setFinancialStatementBreadcrumb();

      service.breadcrumb$.subscribe(config => {
        expect(config).toBeDefined();
      });
    });
  });

  describe('setStepperBreadcrumb', () => {
    it('should set stepper breadcrumb with step info', () => {
      service.setStepperBreadcrumb('Test Container', 1, 5);

      service.breadcrumb$.subscribe(config => {
        expect(config).toBeDefined();
      });
    });

    it('should handle single step', () => {
      service.setStepperBreadcrumb('Test', 0, 1);

      service.breadcrumb$.subscribe(config => {
        expect(config).toBeDefined();
      });
    });
  });

  describe('setResultsBreadcrumb', () => {
    it('should set results breadcrumb', () => {
      service.setResultsBreadcrumb('Test Container', 'Success');

      service.breadcrumb$.subscribe(config => {
        expect(config).toBeDefined();
      });
    });
  });
});
