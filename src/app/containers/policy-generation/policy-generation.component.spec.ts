import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { PolicyGenerationComponent } from './policy-generation.component';
import { BreadcrumbService } from '../../shared/services/breadcrumb.service';

describe('PolicyGenerationComponent', () => {
  let component: PolicyGenerationComponent;
  let fixture: ComponentFixture<PolicyGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PolicyGenerationComponent],
      providers: [
        { provide: Router, useValue: { navigate: jest.fn() } },
        { provide: BreadcrumbService, useValue: { setBreadcrumb: jest.fn() } }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(PolicyGenerationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should have dynamicForm', () => { expect(component.dynamicForm).toBeDefined(); });
  it('should generate policy', () => { expect(() => component.generatePolicy()).not.toThrow(); });
});
