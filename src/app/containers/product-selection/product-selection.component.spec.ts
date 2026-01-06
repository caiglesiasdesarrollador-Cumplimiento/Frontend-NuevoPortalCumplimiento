import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ProductSelectionComponent } from './product-selection.component';
import { BreadcrumbService } from '../../shared/services/breadcrumb.service';

describe('ProductSelectionComponent', () => {
  let component: ProductSelectionComponent;
  let fixture: ComponentFixture<ProductSelectionComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockBreadcrumbService: jasmine.SpyObj<BreadcrumbService>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const breadcrumbSpy = jasmine.createSpyObj('BreadcrumbService', ['setBreadcrumb']);

    await TestBed.configureTestingModule({
      declarations: [ProductSelectionComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: BreadcrumbService, useValue: breadcrumbSpy }
      ]
    }).compileComponents();

    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    mockBreadcrumbService = TestBed.inject(BreadcrumbService) as jasmine.SpyObj<BreadcrumbService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setup breadcrumb on init', () => {
    expect(mockBreadcrumbService.setBreadcrumb).toHaveBeenCalled();
  });

  it('should navigate to dashboard when selecting product compliance', () => {
    component.navigateToProduct('producto-cumplimiento');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should filter featured products correctly', () => {
    const featuredProducts = component.featuredProducts;
    expect(featuredProducts.length).toBeGreaterThan(0);
    expect(featuredProducts.every(p => p.featured)).toBeTruthy();
  });

  it('should filter regular products correctly', () => {
    const regularProducts = component.regularProducts;
    expect(regularProducts.every(p => !p.featured)).toBeTruthy();
  });
});