import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PolicyGenerationComponent } from './policy-generation.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BreadcrumbService } from '../../shared/services/breadcrumb.service';

describe('PolicyGenerationComponent', () => {
  let component: PolicyGenerationComponent;
  let fixture: ComponentFixture<PolicyGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyGenerationComponent],
      providers: [BreadcrumbService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PolicyGenerationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should have policyRequest', () => { expect(component.policyRequest).toBeDefined(); });
  it('should have isProcessing', () => { expect(component.isProcessing).toBe(false); });
  it('should have breadcrumbConfig', () => { expect(component.breadcrumbConfig).toBeDefined(); });
});



