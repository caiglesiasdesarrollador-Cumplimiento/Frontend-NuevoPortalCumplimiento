import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicFormComponent } from './dynamic-form.component';
import { BreadcrumbService } from '../../shared/services/breadcrumb.service';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicFormComponent],
      providers: [
        { provide: Router, useValue: { navigate: jest.fn() } },
        { provide: BreadcrumbService, useValue: { setBreadcrumb: jest.fn(), setStepperBreadcrumb: jest.fn() } }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should have currentStep', () => { expect(component.currentStep).toBeDefined(); });
  it('should have totalSteps', () => { expect(component.totalSteps).toBeDefined(); });
  it('should navigate next', () => { expect(() => component.nextStep()).not.toThrow(); });
  it('should navigate prev', () => { expect(() => component.prevStep()).not.toThrow(); });
  it('should submit form', () => { expect(() => component.submitForm()).not.toThrow(); });
});
