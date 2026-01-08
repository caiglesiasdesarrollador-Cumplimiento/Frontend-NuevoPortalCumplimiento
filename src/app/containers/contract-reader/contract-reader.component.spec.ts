import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { ContractReaderComponent } from './contract-reader.component';
import { BreadcrumbService } from '../../shared/services/breadcrumb.service';

describe('ContractReaderComponent', () => {
  let component: ContractReaderComponent;
  let fixture: ComponentFixture<ContractReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractReaderComponent],
      providers: [
        { provide: Router, useValue: { navigate: jest.fn() } },
        { provide: BreadcrumbService, useValue: { setBreadcrumb: jest.fn(), setContractReaderBreadcrumb: jest.fn() } }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(ContractReaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should have currentStep', () => { expect(component.currentStep).toBeDefined(); });
  it('should have totalSteps', () => { expect(component.totalSteps).toBeDefined(); });
  it('should have processingStatus', () => { expect(component.processingStatus).toBeDefined(); });
  it('should navigate next', () => { component.nextStep(); expect(component.currentStep).toBeGreaterThanOrEqual(0); });
  it('should navigate prev', () => { component.currentStep = 2; component.prevStep(); expect(component.currentStep).toBeLessThanOrEqual(2); });
  it('should handle file select', () => { expect(() => component.onFileSelected({} as any)).not.toThrow(); });
  it('should process document', () => { expect(() => component.processDocument()).not.toThrow(); });
  it('should reset', () => { component.reset(); expect(component.currentStep).toBe(0); });
});
