import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PolicyInputComponent } from './policy-input.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PolicyInputComponent', () => {
  let component: PolicyInputComponent;
  let fixture: ComponentFixture<PolicyInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PolicyInputComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PolicyInputComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should have currentStep', () => { expect(component.currentStep).toBeDefined(); });
  it('should have coberturasCumplimiento', () => { expect(component.coberturasCumplimiento).toBeDefined(); });
  it('should have rcCoberturas', () => { expect(component.rcCoberturas).toBeDefined(); });
  it('should navigate next', () => { expect(() => component.nextStep()).not.toThrow(); });
  it('should go to step', () => { expect(() => component.goToStep(0)).not.toThrow(); });
  it('should toggle cobertura', () => { 
    const cob = component.coberturasCumplimiento[0];
    expect(() => component.toggleCobertura(cob)).not.toThrow(); 
  });
  it('should recalculate prima RC', () => { 
    const cob = component.rcCoberturas[0];
    expect(() => component.recalcularPrimaRC(cob)).not.toThrow(); 
  });
});

