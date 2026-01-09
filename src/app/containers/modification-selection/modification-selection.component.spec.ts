import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificationSelectionComponent } from './modification-selection.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BreadcrumbService } from '../../shared/services/breadcrumb.service';

describe('ModificationSelectionComponent', () => {
  let component: ModificationSelectionComponent;
  let fixture: ComponentFixture<ModificationSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificationSelectionComponent],
      imports: [RouterTestingModule],
      providers: [BreadcrumbService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificationSelectionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should have modificationData', () => { expect(component.modificationData).toBeDefined(); });
  it('should have breadcrumbConfig', () => { expect(component.breadcrumbConfig).toBeDefined(); });
  it('should navigate to modification', () => { 
    expect(() => component.navigateToModification('test')).not.toThrow(); 
  });
});


