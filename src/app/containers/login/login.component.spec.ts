import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NotificationService } from '../../shared/components/notification/notification.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const mockNotificationService = {
    show: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, RouterTestingModule, BrowserAnimationsModule],
      providers: [
        { provide: NotificationService, useValue: mockNotificationService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should have email field', () => { expect(component.email).toBeDefined(); });
  it('should have password field', () => { expect(component.password).toBeDefined(); });
  it('should submit form', () => { expect(() => component.onSubmit()).not.toThrow(); });
  it('should reset form', () => { 
    component.email = 'test@test.com';
    component.onReset();
    expect(component.email).toBe(''); 
  });
});



