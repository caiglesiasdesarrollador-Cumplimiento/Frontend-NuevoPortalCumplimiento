import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, of } from 'rxjs';

import { CreditLimitValidationComponent } from './credit-limit-validation.component';
import { BreadcrumbService } from '../../shared/services/breadcrumb.service';

// Mock del BreadcrumbService
class MockBreadcrumbService {
  setBreadcrumb = jasmine.createSpy('setBreadcrumb');
  setResultsBreadcrumb = jasmine.createSpy('setResultsBreadcrumb');
}

describe('CreditLimitValidationComponent', () => {
  let component: CreditLimitValidationComponent;
  let fixture: ComponentFixture<CreditLimitValidationComponent>;
  let mockBreadcrumbService: MockBreadcrumbService;

  beforeEach(async () => {
    mockBreadcrumbService = new MockBreadcrumbService();

    await TestBed.configureTestingModule({
      declarations: [CreditLimitValidationComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: BreadcrumbService, useValue: mockBreadcrumbService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreditLimitValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize creditRequest with default values', () => {
    expect(component.creditRequest).toBeDefined();
    expect(component.creditRequest.customerType).toBe('individual');
  });

  it('should setup breadcrumb on init', () => {
    expect(mockBreadcrumbService.setBreadcrumb).toHaveBeenCalled();
  });

  it('should have dynamic form configuration', () => {
    expect(component.dynamicForm).toBeDefined();
    expect(component.dynamicForm.configContainers).toBeDefined();
  });

  it('should validate form before processing', () => {
    spyOn(component.dynamicForm, 'libTbCallSubmit');
    component.validateCreditLimit();
    expect(component.dynamicForm.libTbCallSubmit).toHaveBeenCalled();
  });

  it('should reset form and clear data', () => {
    component.validationResult = {} as any;
    component.resetForm();
    expect(component.validationResult).toBeNull();
  });

  it('should format currency correctly', () => {
    const formatted = component.formatCurrency(1000000);
    expect(formatted).toContain('$');
    expect(formatted).toContain('1.000.000');
  });
}); 