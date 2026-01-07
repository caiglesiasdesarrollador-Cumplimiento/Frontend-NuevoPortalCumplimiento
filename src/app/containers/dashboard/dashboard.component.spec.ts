import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let router: jest.Mocked<Router>;

  beforeEach(async () => {
    const routerMock = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [
        { provide: Router, useValue: routerMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
  });

  describe('Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have totalStats initialized to 48', () => {
      expect(component.totalStats).toBe(48);
    });
  });

  describe('navigateToUrl', () => {
    it('should navigate to the provided URL', () => {
      component.navigateToUrl('/policy-input');
      expect(router.navigate).toHaveBeenCalledWith(['/policy-input']);
    });

    it('should navigate to different URLs', () => {
      component.navigateToUrl('/portal');
      expect(router.navigate).toHaveBeenCalledWith(['/portal']);

      component.navigateToUrl('/settings');
      expect(router.navigate).toHaveBeenCalledWith(['/settings']);
    });
  });
});

