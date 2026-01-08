import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadcrumbComponent } from './breadcrumb.component';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;
  let breadcrumbServiceMock: jest.Mocked<BreadcrumbService>;

  const mockBreadcrumb = {
    items: [
      { label: 'Home', url: '/' },
      { label: 'Page', url: '/page' }
    ]
  };

  beforeEach(async () => {
    breadcrumbServiceMock = {
      breadcrumb$: of(mockBreadcrumb),
      clearBreadcrumb: jest.fn(),
      setBreadcrumb: jest.fn(),
      addItem: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      declarations: [BreadcrumbComponent],
      providers: [
        { provide: BreadcrumbService, useValue: breadcrumbServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
  });

  describe('Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have breadcrumb$ observable from service', () => {
      expect(component.breadcrumb$).toBeDefined();
    });
  });

  describe('ngOnInit', () => {
    it('should call clearBreadcrumb on init', () => {
      component.ngOnInit();
      expect(breadcrumbServiceMock.clearBreadcrumb).toHaveBeenCalled();
    });
  });

  describe('Template binding', () => {
    it('should subscribe to breadcrumb$ observable', (done) => {
      component.breadcrumb$.subscribe(breadcrumb => {
        expect(breadcrumb).toEqual(mockBreadcrumb);
        done();
      });
    });
  });
});

