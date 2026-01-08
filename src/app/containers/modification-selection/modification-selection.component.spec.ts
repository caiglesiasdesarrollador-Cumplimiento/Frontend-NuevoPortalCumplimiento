import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { ModificationSelectionComponent } from './modification-selection.component';
import { BreadcrumbService } from '../../shared/services/breadcrumb.service';

describe('ModificationSelectionComponent', () => {
  let component: ModificationSelectionComponent;
  let fixture: ComponentFixture<ModificationSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificationSelectionComponent],
      providers: [
        { provide: Router, useValue: { navigate: jest.fn() } },
        { provide: BreadcrumbService, useValue: { setBreadcrumb: jest.fn() } }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(ModificationSelectionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should have modifications', () => { expect(component.modifications).toBeDefined(); });
  it('should select modification', () => { expect(() => component.selectModification({} as any)).not.toThrow(); });
});
