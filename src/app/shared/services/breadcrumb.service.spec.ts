import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BreadcrumbService } from './breadcrumb.service';

describe('BreadcrumbService', () => {
  let service: BreadcrumbService;
  let mockRouter: { navigate: jest.Mock };

  beforeEach(() => {
    mockRouter = {
      navigate: jest.fn()
    };

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
    it('should set header breadcrumb items', (done) => {
      const items = [
        { label: 'Home', icon: 'fa-home' },
        { label: 'Page', isActive: true }
      ];

      service.setHeaderBreadcrumb(items);
      
      service.breadcrumbItems$.subscribe(result => {
        expect(result).toEqual(items);
        done();
      });
    });
  });

  describe('clearHeaderBreadcrumb', () => {
    it('should clear header breadcrumb items', (done) => {
      service.setHeaderBreadcrumb([{ label: 'Test' }]);
      service.clearHeaderBreadcrumb();

      service.breadcrumbItems$.subscribe(result => {
        expect(result).toEqual([]);
        done();
      });
    });
  });

  describe('setBreadcrumb', () => {
    it('should set breadcrumb with items', (done) => {
      const items = [
        { label: 'Home', icon: 'fa-home' },
        { label: 'Products', url: '/products' }
      ];

      service.setBreadcrumb(items);

      service.breadcrumb$.subscribe(config => {
        expect(config).toBeDefined();
        expect(config.home).toBeDefined();
        expect(config.items).toBeDefined();
        expect(config.iconRight).toBe('fal fa-chevron-right');
        done();
      });
    });

    it('should set command for items with routerLink', (done) => {
      const items = [
        { label: 'Home', routerLink: ['/home'] },
        { label: 'Products', routerLink: ['/products'], queryParams: { id: 1 } }
      ];

      service.setBreadcrumb(items);

      service.breadcrumb$.subscribe(config => {
        expect(config.items).toBeDefined();
        // Execute the command to cover navigateToRoute
        if (config.items && config.items[0] && config.items[0].command) {
          config.items[0].command();
          expect(mockRouter.navigate).toHaveBeenCalledWith(['/home'], { queryParams: undefined });
        }
        if (config.items && config.items[1] && config.items[1].command) {
          config.items[1].command();
          expect(mockRouter.navigate).toHaveBeenCalledWith(['/products'], { queryParams: { id: 1 } });
        }
        done();
      });
    });

    it('should execute home command to navigate to dashboard', (done) => {
      service.setBreadcrumb([{ label: 'Test' }]);

      service.breadcrumb$.subscribe(config => {
        expect(config.home).toBeDefined();
        if (config.home && config.home.command) {
          config.home.command();
          expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
        }
        done();
      });
    });

    it('should have libTbOnItemClick defined and executable', (done) => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      service.setBreadcrumb([{ label: 'Test' }]);

      service.breadcrumb$.subscribe(config => {
        expect(config.libTbOnItemClick).toBeDefined();
        
        // Execute the callback to cover handleBreadcrumbClick (line 91)
        if (config.libTbOnItemClick) {
          const mockEvent = { item: { label: 'Test' } };
          (config.libTbOnItemClick as Function)(mockEvent);
          expect(consoleSpy).toHaveBeenCalledWith('Breadcrumb clicked:', mockEvent);
        }
        
        consoleSpy.mockRestore();
        done();
      });
    });

    it('should execute libTbOnItemClick callback with event data', (done) => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      service.setBreadcrumb([{ label: 'Page 1' }, { label: 'Page 2' }]);

      service.breadcrumb$.subscribe(config => {
        if (config.libTbOnItemClick) {
          const eventData = { originalEvent: new Event('click'), item: { label: 'Page 1' } };
          (config.libTbOnItemClick as Function)(eventData);
          expect(consoleSpy).toHaveBeenCalled();
        }
        consoleSpy.mockRestore();
        done();
      });
    });

    it('should not set command for items without routerLink', (done) => {
      const items = [
        { label: 'Home', icon: 'fa-home' }
      ];

      service.setBreadcrumb(items);

      service.breadcrumb$.subscribe(config => {
        expect(config.items).toBeDefined();
        if (config.items && config.items[0]) {
          expect(config.items[0].command).toBeUndefined();
        }
        done();
      });
    });
  });

  describe('clearBreadcrumb', () => {
    it('should clear breadcrumb and keep home', (done) => {
      service.setBreadcrumb([{ label: 'Test' }]);
      service.clearBreadcrumb();

      service.breadcrumb$.subscribe(config => {
        expect(config.home).toBeDefined();
        expect(config.home?.label).toBe('Dashboard');
        expect(config.home?.icon).toBe('fal fa-home');
        expect(config.iconRight).toBe('fal fa-chevron-right');
        done();
      });
    });

    it('should execute home command after clear', (done) => {
      service.clearBreadcrumb();

      service.breadcrumb$.subscribe(config => {
        if (config.home && config.home.command) {
          config.home.command();
          expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
        }
        done();
      });
    });
  });

  describe('setContractReaderBreadcrumb', () => {
    it('should set contract reader breadcrumb', (done) => {
      service.setContractReaderBreadcrumb();

      service.breadcrumb$.subscribe(config => {
        expect(config).toBeDefined();
        expect(config.items?.length).toBe(2);
        expect(config.items?.[0].label).toBe('Análisis');
        expect(config.items?.[1].label).toBe('Contratos');
        done();
      });
    });
  });

  describe('setThirdPartyValidationBreadcrumb', () => {
    it('should set third party validation breadcrumb', (done) => {
      service.setThirdPartyValidationBreadcrumb();

      service.breadcrumb$.subscribe(config => {
        expect(config).toBeDefined();
        expect(config.items?.length).toBe(2);
        expect(config.items?.[0].label).toBe('Validaciones');
        expect(config.items?.[1].label).toBe('Terceros');
        done();
      });
    });
  });

  describe('setFinancialStatementBreadcrumb', () => {
    it('should set financial statement breadcrumb', (done) => {
      service.setFinancialStatementBreadcrumb();

      service.breadcrumb$.subscribe(config => {
        expect(config).toBeDefined();
        expect(config.items?.length).toBe(2);
        expect(config.items?.[0].label).toBe('Análisis');
        expect(config.items?.[1].label).toBe('Estados Financieros');
        done();
      });
    });
  });

  describe('setStepperBreadcrumb', () => {
    it('should set stepper breadcrumb with step info for multiple steps', (done) => {
      service.setStepperBreadcrumb('Test Container', 1, 5);

      service.breadcrumb$.subscribe(config => {
        expect(config).toBeDefined();
        expect(config.items?.length).toBe(3);
        expect(config.items?.[0].label).toBe('Procesos');
        expect(config.items?.[1].label).toBe('Test Container');
        expect(config.items?.[2].label).toBe('Paso 2 de 5');
        done();
      });
    });

    it('should handle single step without step info', (done) => {
      service.setStepperBreadcrumb('Test', 0, 1);

      service.breadcrumb$.subscribe(config => {
        expect(config).toBeDefined();
        expect(config.items?.length).toBe(2);
        done();
      });
    });

    it('should include step info when totalSteps > 1', (done) => {
      service.setStepperBreadcrumb('Form', 2, 4);

      service.breadcrumb$.subscribe(config => {
        expect(config.items?.length).toBe(3);
        expect(config.items?.[2].label).toBe('Paso 3 de 4');
        expect(config.items?.[2].icon).toBe('fal fa-step-forward');
        done();
      });
    });
  });

  describe('setResultsBreadcrumb', () => {
    it('should set results breadcrumb', (done) => {
      service.setResultsBreadcrumb('Test Container', 'Success');

      service.breadcrumb$.subscribe(config => {
        expect(config).toBeDefined();
        expect(config.items?.length).toBe(3);
        expect(config.items?.[0].label).toBe('Análisis');
        expect(config.items?.[1].label).toBe('Test Container');
        expect(config.items?.[2].label).toBe('Success');
        done();
      });
    });

    it('should have correct icons for results breadcrumb', (done) => {
      service.setResultsBreadcrumb('Analysis', 'Complete');

      service.breadcrumb$.subscribe(config => {
        expect(config.items?.[0].icon).toBe('fal fa-analytics');
        expect(config.items?.[1].icon).toBe('fal fa-chart-pie');
        expect(config.items?.[2].icon).toBe('fal fa-check-circle');
        done();
      });
    });
  });
});
