import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PolicyModificationComponent } from './policy-modification.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BreadcrumbService } from '../../shared/services/breadcrumb.service';

describe('PolicyModificationComponent', () => {
  let component: PolicyModificationComponent;
  let fixture: ComponentFixture<PolicyModificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyModificationComponent, RouterTestingModule],
      providers: [BreadcrumbService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PolicyModificationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should have currentStep', () => { expect(component.currentStep).toBe(0); });
  it('should have stepperConfig', () => { expect(component.stepperConfig).toBeDefined(); });
  it('should have modificationData', () => { expect(component.modificationData).toBeDefined(); });
  it('should go to step', () => { 
    expect(() => component.goToStep(1)).not.toThrow(); 
  });
  it('should next step', () => { 
    expect(() => component.nextStep()).not.toThrow(); 
  });
});



