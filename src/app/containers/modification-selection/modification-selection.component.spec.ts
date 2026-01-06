import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../shared/services/breadcrumb.service';

import { ModificationSelectionComponent } from './modification-selection.component';

describe('ModificationSelectionComponent', () => {
  let component: ModificationSelectionComponent;
  let fixture: ComponentFixture<ModificationSelectionComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockBreadcrumbService: jasmine.SpyObj<BreadcrumbService>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const breadcrumbSpy = jasmine.createSpyObj('BreadcrumbService', ['setBreadcrumb']);

    await TestBed.configureTestingModule({
      declarations: [ModificationSelectionComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: BreadcrumbService, useValue: breadcrumbSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModificationSelectionComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    mockBreadcrumbService = TestBed.inject(BreadcrumbService) as jasmine.SpyObj<BreadcrumbService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setup breadcrumb on init', () => {
    component.ngOnInit();
    expect(mockBreadcrumbService.setBreadcrumb).toHaveBeenCalled();
  });

  it('should navigate to policy-modification for general modification', () => {
    component.navigateToModification('modificacion-general');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/policy-modification']);
  });

  it('should navigate to policy-modification for other modifications', () => {
    component.navigateToModification('cancelacion-poliza');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/policy-modification']);
  });
});