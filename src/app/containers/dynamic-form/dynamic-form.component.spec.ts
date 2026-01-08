import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormComponent } from './dynamic-form.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NotificationService } from '../../shared/components/notification/notification.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;

  const mockNotificationService = { show: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicFormComponent],
      imports: [BrowserAnimationsModule],
      providers: [{ provide: NotificationService, useValue: mockNotificationService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should have currentStep', () => { expect(component.currentStep).toBe(0); });
  it('should have stepperConfig', () => { expect(component.stepperConfig).toBeDefined(); });
  it('should go to step', () => { 
    expect(() => component.goToStep(1)).not.toThrow(); 
  });
  it('should next step', () => { 
    expect(() => component.nextStep()).not.toThrow(); 
  });
});

