import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from '../../shared/services/breadcrumb.service';

import { QuoteDetailsComponent } from './quote-details.component';

describe('QuoteDetailsComponent', () => {
  let component: QuoteDetailsComponent;
  let fixture: ComponentFixture<QuoteDetailsComponent>;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockBreadcrumbService: jasmine.SpyObj<BreadcrumbService>;

  beforeEach(async () => {
    // Create spies for dependencies
    mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', [], {
      params: { subscribe: jasmine.createSpy().and.returnValue({ unsubscribe: jasmine.createSpy() }) }
    });
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockBreadcrumbService = jasmine.createSpyObj('BreadcrumbService', ['setBreadcrumb']);

    await TestBed.configureTestingModule({
      declarations: [QuoteDetailsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: BreadcrumbService, useValue: mockBreadcrumbService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(QuoteDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial quote data as null', () => {
    expect(component.quoteData).toBeNull();
  });

  it('should navigate back to management when backToManagement is called', () => {
    component.backToManagement();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/management']);
  });

  it('should return false for hasQuoteData when quoteData is null', () => {
    component.quoteData = null;
    expect(component.hasQuoteData).toBeFalse();
  });
});