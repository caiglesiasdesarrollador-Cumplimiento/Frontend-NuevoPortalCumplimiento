import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductSelectionComponent } from './product-selection.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BreadcrumbService } from '../../shared/services/breadcrumb.service';

describe('ProductSelectionComponent', () => {
  let component: ProductSelectionComponent;
  let fixture: ComponentFixture<ProductSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductSelectionComponent],
      imports: [RouterTestingModule],
      providers: [BreadcrumbService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductSelectionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should have productData', () => { expect(component.productData).toBeDefined(); });
  it('should have breadcrumbConfig', () => { expect(component.breadcrumbConfig).toBeDefined(); });
  it('should navigate to product', () => { 
    expect(() => component.navigateToProduct('cumplimiento')).not.toThrow(); 
  });
  it('should get featured products', () => { 
    expect(component.featuredProducts).toBeDefined(); 
  });
});

