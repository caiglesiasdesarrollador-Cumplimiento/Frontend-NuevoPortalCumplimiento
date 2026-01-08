import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { ThirdPartyValidationComponent } from './third-party-validation.component';
import { BreadcrumbService } from '../../shared/services/breadcrumb.service';

describe('ThirdPartyValidationComponent', () => {
  let component: ThirdPartyValidationComponent;
  let fixture: ComponentFixture<ThirdPartyValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThirdPartyValidationComponent],
      providers: [
        { provide: Router, useValue: { navigate: jest.fn() } },
        { provide: BreadcrumbService, useValue: { setBreadcrumb: jest.fn(), setThirdPartyValidationBreadcrumb: jest.fn() } }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(ThirdPartyValidationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should have dynamicForm', () => { expect(component.dynamicForm).toBeDefined(); });
  it('should validate', () => { expect(() => component.validateThirdParty()).not.toThrow(); });
});
