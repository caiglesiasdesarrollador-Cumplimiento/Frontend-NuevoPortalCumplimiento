import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuoteDetailsComponent } from './quote-details.component';
import { BreadcrumbService } from '../../shared/services/breadcrumb.service';
import { of } from 'rxjs';
import { MOCK_MANAGEMENT_DATA } from '../management/management.interface';

describe('QuoteDetailsComponent', () => {
  let component: QuoteDetailsComponent;
  let fixture: ComponentFixture<QuoteDetailsComponent>;
  let router: Router;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockActivatedRoute = {
      params: of({ id: 'cot001' }),
      queryParams: of({ showEmissionButton: 'true' }),
    };

    await TestBed.configureTestingModule({
      imports: [QuoteDetailsComponent],
      providers: [
        {
          provide: Router,
          useValue: {
            navigate: jest.fn().mockResolvedValue(true),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
        {
          provide: BreadcrumbService,
          useValue: {
            setBreadcrumb: jest.fn(),
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(QuoteDetailsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have quoteData initialized as null', () => {
    expect(component.quoteData).toBeNull();
  });

  it('should have showEmissionButton initialized as false', () => {
    expect(component.showEmissionButton).toBe(false);
  });

  it('should have originalQuoteItem initialized as null', () => {
    expect(component.originalQuoteItem).toBeNull();
  });

  it('should have complianceCoverages initialized as empty array', () => {
    expect(component.complianceCoverages).toEqual([]);
  });

  it('should have rcCoverages initialized as empty array', () => {
    expect(component.rcCoverages).toEqual([]);
  });

  // ✅ RF017.1: Tests para Convertir Cotización a Póliza
  describe('RF017.1 - Convertir Cotización a Póliza', () => {
    beforeEach(() => {
      jest.spyOn(console, 'log').mockImplementation();
      jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    describe('ngOnInit', () => {
      it('should set showEmissionButton to true when queryParam showEmissionButton is true', fakeAsync(() => {
        // Arrange
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({
          imports: [QuoteDetailsComponent],
          providers: [
            { provide: Router, useValue: { navigate: jest.fn() } },
            { provide: ActivatedRoute, useValue: { params: of({ id: 'cot001' }), queryParams: of({ showEmissionButton: 'true' }) } },
            { provide: BreadcrumbService, useValue: { setBreadcrumb: jest.fn() } },
          ],
          schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
        });
        const testFixture = TestBed.createComponent(QuoteDetailsComponent);
        const testComponent = testFixture.componentInstance;

        // Act
        testComponent.ngOnInit();
        tick();

        // Assert
        expect(testComponent.showEmissionButton).toBe(true);
      }));

      it('should set showEmissionButton to false when queryParam showEmissionButton is false', fakeAsync(() => {
        // Arrange
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({
          imports: [QuoteDetailsComponent],
          providers: [
            { provide: Router, useValue: { navigate: jest.fn() } },
            { provide: ActivatedRoute, useValue: { params: of({ id: 'cot001' }), queryParams: of({ showEmissionButton: 'false' }) } },
            { provide: BreadcrumbService, useValue: { setBreadcrumb: jest.fn() } },
          ],
          schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
        });
        const testFixture = TestBed.createComponent(QuoteDetailsComponent);
        const testComponent = testFixture.componentInstance;

        // Act
        testComponent.ngOnInit();
        tick();

        // Assert
        expect(testComponent.showEmissionButton).toBe(false);
      }));

      it('should set showEmissionButton to false when queryParam is not provided', fakeAsync(() => {
        // Arrange
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({
          imports: [QuoteDetailsComponent],
          providers: [
            { provide: Router, useValue: { navigate: jest.fn() } },
            { provide: ActivatedRoute, useValue: { params: of({ id: 'cot001' }), queryParams: of({}) } },
            { provide: BreadcrumbService, useValue: { setBreadcrumb: jest.fn() } },
          ],
          schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
        });
        const testFixture = TestBed.createComponent(QuoteDetailsComponent);
        const testComponent = testFixture.componentInstance;

        // Act
        testComponent.ngOnInit();
        tick();

        // Assert
        expect(testComponent.showEmissionButton).toBe(false);
      }));

      it('should call loadQuoteDetails when id is provided in params', fakeAsync(() => {
        // Arrange
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({
          imports: [QuoteDetailsComponent],
          providers: [
            { provide: Router, useValue: { navigate: jest.fn() } },
            { provide: ActivatedRoute, useValue: { params: of({ id: 'cot001' }), queryParams: of({}) } },
            { provide: BreadcrumbService, useValue: { setBreadcrumb: jest.fn() } },
          ],
          schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
        });
        const testFixture = TestBed.createComponent(QuoteDetailsComponent);
        const testComponent = testFixture.componentInstance;
        const loadQuoteDetailsSpy = jest.spyOn(testComponent as any, 'loadQuoteDetails');

        // Act
        testComponent.ngOnInit();
        tick();

        // Assert
        expect(loadQuoteDetailsSpy).toHaveBeenCalledWith('cot001');
      }));

      it('should navigate to management when id is not provided', fakeAsync(() => {
        // Arrange
        const mockRouter = { navigate: jest.fn() };
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({
          imports: [QuoteDetailsComponent],
          providers: [
            { provide: Router, useValue: mockRouter },
            { provide: ActivatedRoute, useValue: { params: of({}), queryParams: of({}) } },
            { provide: BreadcrumbService, useValue: { setBreadcrumb: jest.fn() } },
          ],
          schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
        });
        const testFixture = TestBed.createComponent(QuoteDetailsComponent);
        const testComponent = testFixture.componentInstance;

        // Act
        testComponent.ngOnInit();
        tick();

        // Assert
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/management']);
      }));

      it('should log initialization message', fakeAsync(() => {
        // Arrange
        const consoleLogSpy = jest.spyOn(console, 'log');
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({
          imports: [QuoteDetailsComponent],
          providers: [
            { provide: Router, useValue: { navigate: jest.fn() } },
            { provide: ActivatedRoute, useValue: { params: of({ id: 'cot001' }), queryParams: of({}) } },
            { provide: BreadcrumbService, useValue: { setBreadcrumb: jest.fn() } },
          ],
          schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
        });
        const testFixture = TestBed.createComponent(QuoteDetailsComponent);
        const testComponent = testFixture.componentInstance;

        // Act
        testComponent.ngOnInit();
        tick();

        // Assert
        expect(consoleLogSpy).toHaveBeenCalledWith('🔍 QUOTE-DETAILS: Componente inicializado');
      }));
    });

    describe('loadQuoteDetails', () => {
      beforeEach(() => {
        jest.spyOn(component as any, 'mapManagementToQuoteDetails').mockReturnValue({});
        jest.spyOn(component as any, 'setupBreadcrumb').mockImplementation(() => {});
        jest.spyOn(component as any, 'generateCoverageData').mockImplementation(() => {});
      });

      it('should load quote details when quote exists in MOCK_MANAGEMENT_DATA', () => {
        // Arrange
        const existingQuote = MOCK_MANAGEMENT_DATA[0];
        const mapSpy = jest.spyOn(component as any, 'mapManagementToQuoteDetails');

        // Act
        (component as any).loadQuoteDetails(existingQuote.id);

        // Assert
        expect(component.originalQuoteItem).toEqual(existingQuote);
        expect(mapSpy).toHaveBeenCalledWith(existingQuote);
        expect(component.quoteData).toBeDefined();
      });

      it('should navigate to management when quote does not exist', () => {
        // Arrange
        const nonExistentId = 'non-existent-id';

        // Act
        (component as any).loadQuoteDetails(nonExistentId);

        // Assert
        expect(router.navigate).toHaveBeenCalledWith(['/management']);
        expect(component.quoteData).toBeNull();
      });

      it('should log error when quote is not found', () => {
        // Arrange
        const consoleErrorSpy = jest.spyOn(console, 'error');
        const nonExistentId = 'non-existent-id';

        // Act
        (component as any).loadQuoteDetails(nonExistentId);

        // Assert
        expect(consoleErrorSpy).toHaveBeenCalledWith('❌ QUOTE-DETAILS: Cotización no encontrada con ID:', nonExistentId);
      });

      it('should call setupBreadcrumb when quote is found', () => {
        // Arrange
        const existingQuote = MOCK_MANAGEMENT_DATA[0];
        const setupBreadcrumbSpy = jest.spyOn(component as any, 'setupBreadcrumb');

        // Act
        (component as any).loadQuoteDetails(existingQuote.id);

        // Assert
        expect(setupBreadcrumbSpy).toHaveBeenCalledWith(existingQuote);
      });

      it('should call generateCoverageData when quote is found', () => {
        // Arrange
        const existingQuote = MOCK_MANAGEMENT_DATA[0];
        const generateCoverageDataSpy = jest.spyOn(component as any, 'generateCoverageData');

        // Act
        (component as any).loadQuoteDetails(existingQuote.id);

        // Assert
        expect(generateCoverageDataSpy).toHaveBeenCalled();
      });
    });

    describe('generateEmission', () => {
      beforeEach(() => {
        jest.spyOn(component as any, 'showSuccessNotification').mockImplementation(() => {});
      });

      it('should not generate emission when quoteData is null', () => {
        // Arrange
        component.quoteData = null;
        const showSuccessNotificationSpy = jest.spyOn(component as any, 'showSuccessNotification');
        const consoleErrorSpy = jest.spyOn(console, 'error');

        // Act
        component.generateEmission();

        // Assert
        expect(showSuccessNotificationSpy).not.toHaveBeenCalled();
        expect(consoleErrorSpy).toHaveBeenCalledWith('❌ QUOTE-DETAILS: No hay datos de cotización para emitir');
      });

      it('should generate policy number by replacing COT with POL', () => {
        // Arrange
        component.quoteData = {
          numero: 'COT-2024-001',
        } as any;
        const consoleLogSpy = jest.spyOn(console, 'log');

        // Act
        component.generateEmission();

        // Assert
        expect(consoleLogSpy).toHaveBeenCalledWith('📋 QUOTE-DETAILS: Generando emisión para cotización:', 'COT-2024-001');
        expect(consoleLogSpy).toHaveBeenCalledWith('✅ QUOTE-DETAILS: Póliza generada exitosamente:', 'POL-2024-001');
      });

      it('should show success notification when emission is generated', () => {
        // Arrange
        component.quoteData = {
          numero: 'COT-2024-001',
        } as any;
        const showSuccessNotificationSpy = jest.spyOn(component as any, 'showSuccessNotification');

        // Act
        component.generateEmission();

        // Assert
        expect(showSuccessNotificationSpy).toHaveBeenCalledWith(
          'Emisión Exitosa',
          'Póliza POL-2024-001 generada exitosamente. La emisión ha sido completada y está lista para su uso.',
        );
      });

      it('should handle different quote number formats', () => {
        // Arrange
        component.quoteData = {
          numero: 'COT-2023-999',
        } as any;
        const consoleLogSpy = jest.spyOn(console, 'log');

        // Act
        component.generateEmission();

        // Assert
        expect(consoleLogSpy).toHaveBeenCalledWith('✅ QUOTE-DETAILS: Póliza generada exitosamente:', 'POL-2023-999');
      });

      it('should log correct messages during emission process', () => {
        // Arrange
        component.quoteData = {
          numero: 'COT-2024-001',
        } as any;
        const consoleLogSpy = jest.spyOn(console, 'log');

        // Act
        component.generateEmission();

        // Assert
        expect(consoleLogSpy).toHaveBeenCalledWith('📋 QUOTE-DETAILS: Generando emisión para cotización:', 'COT-2024-001');
        expect(consoleLogSpy).toHaveBeenCalledWith('✅ QUOTE-DETAILS: Póliza generada exitosamente:', 'POL-2024-001');
      });
    });

    describe('backToManagement', () => {
      it('should navigate to management route', () => {
        // Act
        component.backToManagement();

        // Assert
        expect(router.navigate).toHaveBeenCalledWith(['/management']);
      });

      it('should log navigation message', () => {
        // Arrange
        const consoleLogSpy = jest.spyOn(console, 'log');

        // Act
        component.backToManagement();

        // Assert
        expect(consoleLogSpy).toHaveBeenCalledWith('🔙 QUOTE-DETAILS: Volviendo a management');
      });
    });

    describe('btnGenerateEmission button configuration', () => {
      it('should have correct button configuration', () => {
        // Assert
        expect(component.btnGenerateEmission.label).toBe('Generar emisión');
        expect(component.btnGenerateEmission.icon).toBe('fal fa-file-check');
        expect(component.btnGenerateEmission.iconPosition).toBe('right');
        expect(component.btnGenerateEmission.styleBtn).toBe('fill');
        expect(component.btnGenerateEmission.typeBtn).toBe('primary');
        expect(component.btnGenerateEmission.class).toContain('rounded-full');
        expect(component.btnGenerateEmission.libTbClick).toBeDefined();
      });

      it('should call generateEmission when button is clicked', () => {
        // Arrange
        const generateEmissionSpy = jest.spyOn(component, 'generateEmission');

        // Act
        if (component.btnGenerateEmission.libTbClick) {
          component.btnGenerateEmission.libTbClick();
        }

        // Assert
        expect(generateEmissionSpy).toHaveBeenCalled();
      });
    });

    describe('btnBackToManagement button configuration', () => {
      it('should have correct button configuration', () => {
        // Assert
        expect(component.btnBackToManagement.label).toBe('Volver a Cotizaciones');
        expect(component.btnBackToManagement.icon).toBe('fal fa-arrow-left');
        expect(component.btnBackToManagement.iconPosition).toBe('left');
        expect(component.btnBackToManagement.styleBtn).toBe('stroke');
        expect(component.btnBackToManagement.typeBtn).toBe('secondary');
        expect(component.btnBackToManagement.libTbClick).toBeDefined();
      });

      it('should call backToManagement when button is clicked', () => {
        // Arrange
        const backToManagementSpy = jest.spyOn(component, 'backToManagement');

        // Act
        if (component.btnBackToManagement.libTbClick) {
          component.btnBackToManagement.libTbClick();
        }

        // Assert
        expect(backToManagementSpy).toHaveBeenCalled();
      });
    });

    describe('snackbarConfig', () => {
      it('should have correct initial configuration', () => {
        // Assert
        expect(component.snackbarConfig.show).toBe(false);
        expect(component.snackbarConfig.message).toBe('');
        expect(component.snackbarConfig.position).toBe('top-right');
        expect(component.snackbarConfig.life).toBe(5000);
        expect(component.snackbarConfig.orientation).toBe('horizontal');
      });
    });

    describe('breadcrumbConfig', () => {
      it('should have correct initial configuration', () => {
        // Assert
        expect(component.breadcrumbConfig.items).toEqual([]);
      });
    });
  });
});

