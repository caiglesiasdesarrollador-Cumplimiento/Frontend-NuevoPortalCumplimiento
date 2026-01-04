import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LibTbDynamicFormModule, LibTbButtonModule } from 'tech-block-lib';
import { LoginComponent } from './login.component';
import { NotificationService } from '@shared/components/notification/notification.service';

// ✅ APLICANDO REGLA: Buenas prácticas Jest - Usa mocks, spies y evita código innecesario

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRouter: Partial<Router>;
  let mockNotificationService: Partial<NotificationService>;

  beforeEach(async () => {
    // ✅ Mocks para servicios
    mockRouter = {
      navigate: jest.fn(),
    };

    mockNotificationService = {
      show: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        LibTbDynamicFormModule,
        LibTbButtonModule,
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: NotificationService, useValue: mockNotificationService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize login form correctly', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.btnSubmit).toBeDefined();
    expect(component.btnReset).toBeDefined();
  });

  it('should validate login credentials correctly', () => {
    // ✅ Test de validación básica
    const validCredentials = { email: 'admin@bolivar.com', password: '123456' };
    const invalidCredentials = { email: 'invalid@test.com', password: '123' };

    // Acceder al método privado para testing
    const validateMethod = (component as any).validateLoginCredentials;
    
    expect(validateMethod.call(component, validCredentials)).toBeTruthy();
    expect(validateMethod.call(component, invalidCredentials)).toBeFalsy();
  });

  it('should navigate to dynamic-form on successful login', () => {
    // ✅ Test de navegación
    component.navigateToDynamicForm();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dynamic-form']);
  });

  it('should reset form when resetForm is called', () => {
    // ✅ Mock del método reset del formulario
    const resetMock = jest.fn();
    component.loginForm.form = { reset: resetMock } as any;

    component.resetForm();
    expect(resetMock).toHaveBeenCalled();
  });

  it('should return correct form validity status', () => {
    // ✅ Test de propiedades computadas
    component.loginForm.form = { valid: true } as any;
    expect(component.isFormValid).toBeTruthy();

    component.loginForm.form = { valid: false } as any;
    expect(component.isFormValid).toBeFalsy();
  });

  it('should return form data when form is valid', () => {
    const mockFormData = { email: 'test@test.com', password: '123456' };
    component.loginForm.form = { valid: true, value: mockFormData } as any;

    expect(component.formData).toEqual(mockFormData);
  });

  it('should return null when form is invalid', () => {
    component.loginForm.form = { valid: false, value: {} } as any;
    expect(component.formData).toBeNull();
  });
}); 