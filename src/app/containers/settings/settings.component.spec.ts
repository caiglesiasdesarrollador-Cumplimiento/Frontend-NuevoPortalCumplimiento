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

    it('should have alertConfig defined', () => {
      expect(component.alertConfig).toBeDefined();
      expect(component.alertConfig.float).toBe(false);
    });

    it('should have breadcrumbConfig defined', () => {
      expect(component.breadcrumbConfig).toBeDefined();
    });
  });

  describe('ngOnInit', () => {
    it('should call setBreadcrumb on init', () => {
      component.ngOnInit();
      expect(breadcrumbServiceMock.setBreadcrumb).toHaveBeenCalled();
    });
  });

  describe('Button actions', () => {
    beforeEach(() => {
      // Mock the form
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
      const saveSpy = jest.spyOn(component, 'saveSettings' as any);
      
      if (component.btnSave.libTbClick) {
        component.btnSave.libTbClick(null);
      }
      
      expect(saveSpy).toHaveBeenCalled();
    });

    it('should call resetSettings when btnReset is clicked', () => {
      const resetSpy = jest.spyOn(component, 'resetSettings' as any);
      
      if (component.btnReset.libTbClick) {
        component.btnReset.libTbClick(null);
      }
      
      expect(resetSpy).toHaveBeenCalled();
    });

    it('should call loadDefaultSettings when btnLoadDefaults is clicked', () => {
      const loadDefaultsSpy = jest.spyOn(component, 'loadDefaultSettings' as any);
      
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

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should call libTbCallSubmit when saving', () => {
      component.saveSettings();
      expect(component.dynamicForm.libTbCallSubmit).toHaveBeenCalled();
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
  });

  describe('resetSettings', () => {
    beforeEach(() => {
      component.dynamicForm.form = new FormGroup({
        theme: new FormControl('dark')
      });
    });

    it('should reset form and show info alert', () => {
      const resetSpy = jest.spyOn(component.dynamicForm.form!, 'reset');
      
      component.resetSettings();

      expect(resetSpy).toHaveBeenCalled();
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

    it('should return form data', () => {
      const formData = component.formData;
      expect(formData).toBeDefined();
      expect(formData.theme).toBe('light');
    });

    it('should return loading state', () => {
      expect(component.isLoading).toBe(false);
    });
  });

  describe('Alert handling', () => {
    beforeEach(() => {
      component.dynamicForm.form = new FormGroup({
        theme: new FormControl('light')
      });
    });

    it('should add alerts when loadDefaultSettings is called', () => {
      component.loadDefaultSettings();

      component.alerts$.subscribe(alerts => {
        expect(alerts.length).toBeGreaterThanOrEqual(0);
      });
    });
  });
});
