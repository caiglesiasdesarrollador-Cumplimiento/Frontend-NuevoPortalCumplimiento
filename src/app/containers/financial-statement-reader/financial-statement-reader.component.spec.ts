import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { FinancialStatementReaderComponent } from './financial-statement-reader.component';
import { BreadcrumbService } from '../../shared/services/breadcrumb.service';

describe('FinancialStatementReaderComponent', () => {
  let component: FinancialStatementReaderComponent;
  let fixture: ComponentFixture<FinancialStatementReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinancialStatementReaderComponent],
      providers: [
        { provide: Router, useValue: { navigate: jest.fn() } },
        { provide: BreadcrumbService, useValue: { setBreadcrumb: jest.fn(), setFinancialStatementBreadcrumb: jest.fn() } }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(FinancialStatementReaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should have currentStep', () => { expect(component.currentStep).toBeDefined(); });
  it('should navigate next', () => { expect(() => component.nextStep()).not.toThrow(); });
  it('should navigate prev', () => { expect(() => component.prevStep()).not.toThrow(); });
  it('should handle file', () => { expect(() => component.onFileSelected({} as any)).not.toThrow(); });
});
