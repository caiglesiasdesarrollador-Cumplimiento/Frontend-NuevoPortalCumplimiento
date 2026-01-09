import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContractReaderComponent } from './contract-reader.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BreadcrumbService } from '../../shared/services/breadcrumb.service';

describe('ContractReaderComponent', () => {
  let component: ContractReaderComponent;
  let fixture: ComponentFixture<ContractReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractReaderComponent],
      imports: [RouterTestingModule],
      providers: [BreadcrumbService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ContractReaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should have currentFile', () => { expect(component.currentFile).toBeDefined(); });
  it('should have showSpinner', () => { expect(component.showSpinner).toBe(false); });
  it('should reset analysis', () => { expect(() => component.resetAnalysis()).not.toThrow(); });
  it('should handle file deleted', () => { 
    const mockFile = new File([''], 'test.pdf');
    expect(() => component.onFileDeleted(mockFile)).not.toThrow(); 
  });
  it('should get file size', () => { expect(component.fileSize).toBeDefined(); });
  it('should check isIdle', () => { expect(component.isIdle).toBe(true); });
});

