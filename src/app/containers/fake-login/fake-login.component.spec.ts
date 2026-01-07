import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FakeLoginComponent } from './fake-login.component';

describe('FakeLoginComponent', () => {
  let component: FakeLoginComponent;
  let fixture: ComponentFixture<FakeLoginComponent>;

  const mockRouter = {
    navigate: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FakeLoginComponent],
      imports: [FormsModule],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FakeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
  });

  describe('Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have default values for fakeLoginData', () => {
      expect(component.fakeLoginData.employeeType).toBe('NT');
      expect(component.fakeLoginData.userName).toBe('860352541');
      expect(component.fakeLoginData.fullName).toBe('DAVID COHEN Y CIA LIMITADA AGENCIA DE SEGUROS');
      expect(component.fakeLoginData.sbCodeActBenef).toBe('2');
      expect(component.fakeLoginData.usrSubTipo).toBe('4');
    });

    it('should initialize tipoIngreso as intermediario', () => {
      expect(component.tipoIngreso).toBe('intermediario');
    });

    it('should have tiposDocumento options', () => {
      expect(component.tiposDocumento.length).toBe(5);
      expect(component.tiposDocumento[0].value).toBe('CC');
    });

    it('should have tiposUsuario options', () => {
      expect(component.tiposUsuario.length).toBe(2);
    });

    it('should have tiposNomina options', () => {
      expect(component.tiposNomina.length).toBe(7);
    });

    it('should call actualizarTipoIngreso on init', () => {
      const spy = jest.spyOn(component, 'actualizarTipoIngreso');
      component.ngOnInit();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('actualizarTipoIngreso', () => {
    it('should set tipoIngreso to administrativo when sbCodeActBenef is 48', () => {
      component.fakeLoginData.sbCodeActBenef = '48';
      component.actualizarTipoIngreso();
      expect(component.tipoIngreso).toBe('administrativo');
    });

    it('should set tipoIngreso to intermediario when sbCodeActBenef is not 48', () => {
      component.fakeLoginData.sbCodeActBenef = '2';
      component.actualizarTipoIngreso();
      expect(component.tipoIngreso).toBe('intermediario');
    });
  });

  describe('onTipoUsuarioCambio', () => {
    it('should set usrSubTipo to 1 when administrativo is selected', () => {
      component.fakeLoginData.sbCodeActBenef = '48';
      component.onTipoUsuarioCambio();
      expect(component.fakeLoginData.usrSubTipo).toBe('1');
      expect(component.tipoIngreso).toBe('administrativo');
    });

    it('should set usrSubTipo to 4 when intermediario is selected', () => {
      component.fakeLoginData.sbCodeActBenef = '2';
      component.onTipoUsuarioCambio();
      expect(component.fakeLoginData.usrSubTipo).toBe('4');
      expect(component.tipoIngreso).toBe('intermediario');
    });
  });

  describe('onReset', () => {
    it('should reset fakeLoginData to default values', () => {
      // Change values
      component.fakeLoginData.userName = 'changed';
      component.fakeLoginData.fullName = 'Changed Name';
      
      // Reset
      component.onReset();
      
      // Verify defaults
      expect(component.fakeLoginData.userName).toBe('860352541');
      expect(component.fakeLoginData.fullName).toBe('DAVID COHEN Y CIA LIMITADA AGENCIA DE SEGUROS');
      expect(component.fakeLoginData.employeeType).toBe('NT');
    });

    it('should call actualizarTipoIngreso after reset', () => {
      const spy = jest.spyOn(component, 'actualizarTipoIngreso');
      component.onReset();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('cargarEjemploAdministrativo', () => {
    it('should load administrativo example data', () => {
      component.cargarEjemploAdministrativo();
      
      expect(component.fakeLoginData.employeeType).toBe('CC');
      expect(component.fakeLoginData.userName).toBe('53049440');
      expect(component.fakeLoginData.fullName).toBe('CINDY VIVIANA CAMACHO AREVALO');
      expect(component.fakeLoginData.sbCodeActBenef).toBe('48');
      expect(component.tipoIngreso).toBe('administrativo');
    });
  });

  describe('cargarEjemploIntermediario', () => {
    it('should load intermediario example data', () => {
      component.cargarEjemploIntermediario();
      
      expect(component.fakeLoginData.employeeType).toBe('NT');
      expect(component.fakeLoginData.userName).toBe('860069265');
      expect(component.fakeLoginData.fullName).toBe('AON RISK SERVICES COLOMBIA SA CORREDORES DE SEGURO');
      expect(component.fakeLoginData.sbCodeActBenef).toBe('2');
      expect(component.tipoIngreso).toBe('intermediario');
    });
  });

  describe('onSubmit', () => {
    it('should set isLoading to true when called', () => {
      component.onSubmit();
      expect(component.isLoading).toBe(true);
    });

    it('should save session data to sessionStorage', fakeAsync(() => {
      component.onSubmit();
      tick(1000);
      
      const sessionData = JSON.parse(sessionStorage.getItem('fakeLoginSession') || '{}');
      expect(sessionData.isAuthenticated).toBe(true);
      expect(sessionData.tipoUsuario).toBe('intermediario');
    }));

    it('should set showSuccess to true after loading', fakeAsync(() => {
      component.onSubmit();
      tick(1000);
      
      expect(component.isLoading).toBe(false);
      expect(component.showSuccess).toBe(true);
    }));

    it('should navigate to policy-input after success', fakeAsync(() => {
      component.onSubmit();
      tick(1000); // Wait for loading
      tick(1500); // Wait for redirect
      
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/policy-input']);
    }));
  });

  describe('getLabelTipoDocumento', () => {
    it('should return the label for selected document type', () => {
      component.fakeLoginData.employeeType = 'CC';
      expect(component.getLabelTipoDocumento()).toBe('CC - Cédula de ciudadanía');
    });

    it('should return empty string for unknown type', () => {
      component.fakeLoginData.employeeType = 'UNKNOWN';
      expect(component.getLabelTipoDocumento()).toBe('');
    });

    it('should return NT label for default value', () => {
      expect(component.getLabelTipoDocumento()).toBe('NT - Nit');
    });
  });
});

