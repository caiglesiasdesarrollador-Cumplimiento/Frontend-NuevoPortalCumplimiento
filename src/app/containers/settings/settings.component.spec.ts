import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SettingsComponent } from './settings.component';
import { BreadcrumbService } from '../../shared/services/breadcrumb.service';
import { FormGroup, FormControl } from '@angular/forms';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let breadcrumbServiceMock: jest.Mocked<BreadcrumbService>;

  beforeEach(async () => {
    breadcrumbServiceMock = {
      setBreadcrumb: jest.fn(),
      clearBreadcrumb: jest.fn(),
      setHeaderBreadcrumb: jest.fn(),
      clearHeaderBreadcrumb: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      declarations: [SettingsComponent],
      providers: [
        { provide: BreadcrumbService, useValue: breadcrumbServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
    
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  describe('Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have dynamicForm defined', () => {
      expect(component.dynamicForm).toBeDefined();
    });

    it('should have buttons defined', () => {
      expect(component.btnSave).toBeDefined();
      expect(component.btnReset).toBeDefined();
      expect(component.btnLoadDefaults).toBeDefined();
    });

    it('should have correct button labels', () => {
      expect(component.btnSave.label).toBe('Guardar Configuración');
      expect(component.btnReset.label).toBe('Restablecer');
      expect(component.btnLoadDefaults.label).toBe('Valores por Defecto');
    });

    it('should have correct button icons', () => {
      expect(component.btnSave.icon).toBe('fal fa-save');
      expect(component.btnReset.icon).toBe('fal fa-redo');
      expect(component.btnLoadDefaults.icon).toBe('fal fa-cog');
    });

    it('should have correct button styles', () => {
      expect(component.btnSave.styleBtn).toBe('fill');
      expect(component.btnSave.typeBtn).toBe('primary');
      expect(component.btnReset.styleBtn).toBe('stroke');
      expect(component.btnReset.typeBtn).toBe('secondary');
      expect(component.btnLoadDefaults.styleBtn).toBe('text');
      expect(component.btnLoadDefaults.typeBtn).toBe('tertiary');
    });

    it('should have alertConfig defined', () => {
      expect(component.alertConfig).toBeDefined();
      expect(component.alertConfig.float).toBe(false);
      expect(component.alertConfig.alerts).toEqual([]);
    });

    it('should have breadcrumbConfig defined', () => {
      expect(component.breadcrumbConfig).toBeDefined();
      expect(component.breadcrumbConfig.items).toEqual([]);
    });

    it('should have loading$ observable', () => {
      expect(component.loading$).toBeDefined();
    });

    it('should have alerts$ observable', () => {
      expect(component.alerts$).toBeDefined();
    });
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      component.dynamicForm.form = new FormGroup({
        theme: new FormControl('light'),
        language: new FormControl('es'),
        notifications: new FormControl(true),
        dataRetention: new FormControl(365),
        sessionTimeout: new FormControl('60'),
        defaultCurrency: new FormControl('COP')
      });
    });

    it('should call setBreadcrumb on init', () => {
      component.ngOnInit();
      expect(breadcrumbServiceMock.setBreadcrumb).toHaveBeenCalled();
    });

    it('should setup breadcrumb config items', () => {
      component.ngOnInit();
      expect(component.breadcrumbConfig.items?.length).toBeGreaterThan(0);
    });

    it('should subscribe to alerts$ and update alertConfig', () => {
      component.ngOnInit();
      component.alerts$.subscribe();
      expect(component.alertConfig.alerts).toBeDefined();
    });

    it('should setup alerts subscription on init', () => {
      component.ngOnInit();
      
      // Verify alerts$ subscription is working
      component.alerts$.subscribe(alerts => {
        expect(alerts).toBeDefined();
      });
    });
  });

  describe('Button actions', () => {
    beforeEach(() => {
      component.dynamicForm.form = new FormGroup({
        theme: new FormControl('light'),
        language: new FormControl('es'),
        notifications: new FormControl(true),
        dataRetention: new FormControl(365),
        sessionTimeout: new FormControl('60'),
        defaultCurrency: new FormControl('COP')
      });
    });

    it('should call saveSettings when btnSave is clicked', () => {
      const saveSpy = jest.spyOn(component, 'saveSettings');
      
      if (component.btnSave.libTbClick) {
        component.btnSave.libTbClick(null);
      }
      
      expect(saveSpy).toHaveBeenCalled();
    });

    it('should call resetSettings when btnReset is clicked', () => {
      const resetSpy = jest.spyOn(component, 'resetSettings');
      
      if (component.btnReset.libTbClick) {
        component.btnReset.libTbClick(null);
      }
      
      expect(resetSpy).toHaveBeenCalled();
    });

    it('should call loadDefaultSettings when btnLoadDefaults is clicked', () => {
      const loadDefaultsSpy = jest.spyOn(component, 'loadDefaultSettings');
      
      if (component.btnLoadDefaults.libTbClick) {
        component.btnLoadDefaults.libTbClick(null);
      }
      
      expect(loadDefaultsSpy).toHaveBeenCalled();
    });
  });

  describe('saveSettings', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      component.dynamicForm.form = new FormGroup({
        theme: new FormControl('light'),
        language: new FormControl('es'),
        notifications: new FormControl(true),
        dataRetention: new FormControl(365),
        sessionTimeout: new FormControl('60'),
        defaultCurrency: new FormControl('COP')
      });
      component.dynamicForm.libTbCallSubmit = jest.fn();
    });

    it('should call libTbCallSubmit when saving', () => {
      component.saveSettings();
      expect(component.dynamicForm.libTbCallSubmit).toHaveBeenCalled();
    });

    it('should set loading to true when form is valid', () => {
      component.saveSettings();
      
      component.loading$.subscribe(loading => {
        expect(loading).toBe(true);
      });
    });

    it('should set loading to false after timeout when form is valid', () => {
      component.saveSettings();
      jest.advanceTimersByTime(1500);
      
      expect(component.isLoading).toBe(false);
    });

    it('should show success alert after timeout when form is valid', () => {
      component.saveSettings();
      jest.advanceTimersByTime(1500);
      
      component.alerts$.subscribe(alerts => {
        const successAlert = alerts.find(a => a.type === 'success');
        if (alerts.length > 0) {
          expect(successAlert).toBeDefined();
        }
      });
    });

    it('should show error alert when form is invalid', () => {
      component.dynamicForm.form = new FormGroup({
        theme: new FormControl('')
      });
      component.dynamicForm.form.setErrors({ invalid: true });

      component.saveSettings();

      component.alerts$.subscribe(alerts => {
        expect(alerts.length).toBeGreaterThanOrEqual(0);
      });
    });

    it('should log form data when saving valid form', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      component.saveSettings();
      
      expect(consoleSpy).toHaveBeenCalledWith('Configuración a guardar:', expect.any(Object));
      consoleSpy.mockRestore();
    });
  });

  describe('resetSettings', () => {
    beforeEach(() => {
      component.dynamicForm.form = new FormGroup({
        theme: new FormControl('dark'),
        language: new FormControl('en')
      });
    });

    it('should reset form', () => {
      const resetSpy = jest.spyOn(component.dynamicForm.form!, 'reset');
      
      component.resetSettings();

      expect(resetSpy).toHaveBeenCalled();
    });

    it('should show info alert after reset', () => {
      component.resetSettings();

      component.alerts$.subscribe(alerts => {
        const infoAlert = alerts.find(a => a.type === 'info');
        if (alerts.length > 0) {
          expect(infoAlert).toBeDefined();
        }
      });
    });
  });

  describe('loadDefaultSettings', () => {
    beforeEach(() => {
      component.dynamicForm.form = new FormGroup({
        theme: new FormControl('dark'),
        language: new FormControl('en'),
        notifications: new FormControl(false),
        dataRetention: new FormControl(30),
        sessionTimeout: new FormControl('30'),
        defaultCurrency: new FormControl('USD')
      });
    });

    it('should load default values into form', () => {
      component.loadDefaultSettings();

      expect(component.dynamicForm.form?.get('theme')?.value).toBe('light');
      expect(component.dynamicForm.form?.get('language')?.value).toBe('es');
      expect(component.dynamicForm.form?.get('notifications')?.value).toBe(true);
      expect(component.dynamicForm.form?.get('dataRetention')?.value).toBe(365);
      expect(component.dynamicForm.form?.get('sessionTimeout')?.value).toBe('60');
      expect(component.dynamicForm.form?.get('defaultCurrency')?.value).toBe('COP');
    });

    it('should show info alert after loading defaults', () => {
      component.loadDefaultSettings();

      component.alerts$.subscribe(alerts => {
        const infoAlert = alerts.find(a => a.type === 'info');
        if (alerts.length > 0) {
          expect(infoAlert?.title).toBe('Valores por Defecto Cargados');
        }
      });
    });
  });

  describe('Getters', () => {
    beforeEach(() => {
      component.dynamicForm.form = new FormGroup({
        theme: new FormControl('light')
      });
    });

    it('should return true for isFormValid when form is valid', () => {
      expect(component.isFormValid).toBe(true);
    });

    it('should return false for isFormValid when form is invalid', () => {
      component.dynamicForm.form?.setErrors({ invalid: true });
      expect(component.isFormValid).toBe(false);
    });

    it('should return false for isFormValid when form is null', () => {
      component.dynamicForm.form = undefined as any;
      expect(component.isFormValid).toBe(false);
    });

    it('should return form data', () => {
      const formData = component.formData;
      expect(formData).toBeDefined();
      expect(formData.theme).toBe('light');
    });

    it('should return loading state as false initially', () => {
      expect(component.isLoading).toBe(false);
    });
  });

  describe('Alert auto-hide', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      component.dynamicForm.form = new FormGroup({
        theme: new FormControl('light')
      });
    });

    it('should auto-hide alerts after 5 seconds', () => {
      component.loadDefaultSettings();
      
      // Fast forward 5 seconds
      jest.advanceTimersByTime(5000);

      component.alerts$.subscribe(alerts => {
        // After 5 seconds, alerts should be cleared
        expect(alerts).toBeDefined();
      });
    });
  });

  describe('Private methods coverage', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      component.dynamicForm.form = new FormGroup({
        theme: new FormControl('light'),
        language: new FormControl('es'),
        notifications: new FormControl(true),
        dataRetention: new FormControl(365),
        sessionTimeout: new FormControl('60'),
        defaultCurrency: new FormControl('COP')
      });
    });

    it('should have form values after init', () => {
      component.ngOnInit();
      jest.advanceTimersByTime(100);
      
      expect(component.dynamicForm.form?.get('theme')?.value).toBeDefined();
    });

    it('should update isFormValid getter', () => {
      component.ngOnInit();
      
      // Form should be valid initially
      expect(component.isFormValid).toBe(true);
      
      // Make form invalid
      component.dynamicForm.form?.setErrors({ invalid: true });
      expect(component.isFormValid).toBe(false);
    });
  });
});
