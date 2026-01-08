import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { PolicyModificationComponent } from './policy-modification.component';
import { BreadcrumbService } from '../../shared/services/breadcrumb.service';

describe('PolicyModificationComponent', () => {
  let component: PolicyModificationComponent;
  let fixture: ComponentFixture<PolicyModificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PolicyModificationComponent],
      providers: [
        { provide: Router, useValue: { navigate: jest.fn() } },
        { provide: BreadcrumbService, useValue: { setBreadcrumb: jest.fn() } }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(PolicyModificationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should have currentStep', () => { expect(component.currentStep).toBeDefined(); });
  it('should navigate next', () => { expect(() => component.nextStep()).not.toThrow(); });
  it('should navigate prev', () => { expect(() => component.prevStep()).not.toThrow(); });
});

