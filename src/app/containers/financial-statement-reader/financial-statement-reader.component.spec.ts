import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinancialStatementReaderComponent } from './financial-statement-reader.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BreadcrumbService } from '../../shared/services/breadcrumb.service';

describe('FinancialStatementReaderComponent', () => {
  let component: FinancialStatementReaderComponent;
  let fixture: ComponentFixture<FinancialStatementReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialStatementReaderComponent],
      providers: [BreadcrumbService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(FinancialStatementReaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should have currentFile', () => { expect(component.currentFile).toBeDefined(); });
  it('should have analysisProgress', () => { expect(component.analysisProgress).toBe(0); });
  it('should have breadcrumbConfig', () => { expect(component.breadcrumbConfig).toBeDefined(); });
});



