import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NotificationService } from './shared/components/notification/notification.service';
import { LoaderService } from './shared/components/loader/loader.service';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let notificationService: jest.Mocked<NotificationService>;
  let loaderService: jest.Mocked<LoaderService>;
  let router: { navigate: jest.Mock; events: Subject<any> };

  beforeEach(() => {
    const notificationServiceMock = { show: jest.fn() };
    const loaderServiceMock = { show: jest.fn(), hide: jest.fn() };
    const routerEventSubject = new Subject<any>();
    const routerMock = { 
      navigate: jest.fn(),
      events: routerEventSubject
    };

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: NotificationService, useValue: notificationServiceMock },
        { provide: LoaderService, useValue: loaderServiceMock },
        { provide: Router, useValue: routerMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    notificationService = TestBed.inject(NotificationService) as jest.Mocked<NotificationService>;
    loaderService = TestBed.inject(LoaderService) as jest.Mocked<LoaderService>;
    router = TestBed.inject(Router) as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize showHeader as true', () => {
      expect(component.showHeader).toBe(true);
    });

    it('should initialize button configs', () => {
      expect(component.btnNotification).toBeDefined();
      expect(component.btnNotification.label).toBe('Mostrar modal notificación');
      expect(component.btnLoader).toBeDefined();
      expect(component.btnLoader.label).toBe('Mostrar loader');
      expect(component.btnLoader.typeBtn).toBe('secondary');
      expect(component.btnForm).toBeDefined();
      expect(component.btnForm.label).toBe('Ir a formulario dinámico');
      expect(component.btnForm.typeBtn).toBe('secondary');
      expect(component.btnForm.styleBtn).toBe('text');
    });
  });

  describe('Router events', () => {
    it('should hide header when navigating to error page', () => {
      const navEndEvent = new NavigationEnd(1, '/error/404', '/error/404');
      router.events.next(navEndEvent);
      
      expect(component.showHeader).toBe(false);
    });

    it('should show header when navigating to non-error page', () => {
      component.showHeader = false;
      const navEndEvent = new NavigationEnd(1, '/policy-input', '/policy-input');
      router.events.next(navEndEvent);
      
      expect(component.showHeader).toBe(true);
    });

    it('should ignore non-NavigationEnd events', () => {
      component.showHeader = true;
      router.events.next({ type: 'other' });
      
      expect(component.showHeader).toBe(true);
    });
  });

  describe('Button actions', () => {
    it('should show notification when btnNotification is clicked', () => {
      if (component.btnNotification.libTbClick) {
        component.btnNotification.libTbClick(null);
      }
      expect(notificationService.show).toHaveBeenCalled();
    });

    it('should show loader when btnLoader is clicked', () => {
      if (component.btnLoader.libTbClick) {
        component.btnLoader.libTbClick(null);
      }
      expect(loaderService.show).toHaveBeenCalled();
    });

    it('should navigate when btnForm is clicked', () => {
      if (component.btnForm.libTbClick) {
        component.btnForm.libTbClick(null);
      }
      expect(router.navigate).toHaveBeenCalledWith(['formulario-dinamico']);
    });
  });

  describe('showLoader', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });
    
    afterEach(() => {
      jest.useRealTimers();
    });

    it('should show loader immediately', () => {
      component.showLoader();
      expect(loaderService.show).toHaveBeenCalled();
    });

    it('should hide loader after 1 second', () => {
      component.showLoader();
      expect(loaderService.hide).not.toHaveBeenCalled();
      
      jest.advanceTimersByTime(1000);
      expect(loaderService.hide).toHaveBeenCalled();
    });
  });

  describe('Notification callback actions', () => {
    it('should call showLoader when notification accept is clicked', () => {
      const showLoaderSpy = jest.spyOn(component, 'showLoader');
      
      if (component.btnNotification.libTbClick) {
        component.btnNotification.libTbClick(null);
      }
      
      // Get the config passed to notificationService.show
      const showCall = notificationService.show.mock.calls[0][0];
      if (showCall && showCall.btnAccept && showCall.btnAccept.libTbClick) {
        showCall.btnAccept.libTbClick(null);
        expect(showLoaderSpy).toHaveBeenCalled();
      }
    });
  });
});
