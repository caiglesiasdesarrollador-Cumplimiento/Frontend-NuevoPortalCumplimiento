import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { CreditLimitValidationComponent } from './credit-limit-validation.component';
import { BreadcrumbService } from '../../shared/services/breadcrumb.service';

describe('CreditLimitValidationComponent', () => {
  let component: CreditLimitValidationComponent;
  let fixture: ComponentFixture<CreditLimitValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreditLimitValidationComponent],
      providers: [
        { provide: Router, useValue: { navigate: jest.fn() } },
        { provide: BreadcrumbService, useValue: { setBreadcrumb: jest.fn() } }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(CreditLimitValidationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should have dynamicForm', () => { expect(component.dynamicForm).toBeDefined(); });
  it('should have btnValidate', () => { expect(component.btnValidate).toBeDefined(); });
  it('should validate credit limit', () => { expect(() => component.validateCreditLimit()).not.toThrow(); });
});
