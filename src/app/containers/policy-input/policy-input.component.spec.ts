import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { PolicyInputComponent } from './policy-input.component';
import { BreadcrumbService } from '../../shared/services/breadcrumb.service';

describe('PolicyInputComponent', () => {
  let component: PolicyInputComponent;
  let fixture: ComponentFixture<PolicyInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PolicyInputComponent],
      providers: [
        { provide: Router, useValue: { navigate: jest.fn() } },
        { provide: BreadcrumbService, useValue: { setBreadcrumb: jest.fn(), setHeaderBreadcrumb: jest.fn() } },
        { provide: ChangeDetectorRef, useValue: { detectChanges: jest.fn(), markForCheck: jest.fn() } }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(PolicyInputComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should have currentStep', () => { expect(component.currentStep).toBeDefined(); });
  it('should have totalSteps', () => { expect(component.totalSteps).toBeDefined(); });
  it('should have coberturasCumplimiento', () => { expect(component.coberturasCumplimiento).toBeDefined(); });
  it('should have coberturasRC', () => { expect(component.coberturasRC).toBeDefined(); });
  it('should navigate next', () => { expect(() => component.nextStep()).not.toThrow(); });
  it('should navigate prev', () => { expect(() => component.prevStep()).not.toThrow(); });
  it('should go to step', () => { expect(() => component.goToStep(1)).not.toThrow(); });
  it('should format number', () => { expect(component.formatNumber(1000)).toContain('1'); });
  it('should parse number', () => { expect(component.parseFormattedNumber('1,000')).toBe(1000); });
  it('should toggle cobertura', () => { expect(() => component.toggleCobertura(0)).not.toThrow(); });
  it('should calculate prima', () => { expect(() => component.calcularPrima(0)).not.toThrow(); });
  it('should validate step', () => { expect(typeof component.isStepValid(0)).toBe('boolean'); });
});
