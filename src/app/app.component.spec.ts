import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NotificationService } from './shared/components/notification/notification.service';
import { LoaderService } from './shared/components/loader/loader.service';
import { Router } from '@angular/router';
import { ApiGatewayService } from './services/api-gateway.service';
import { of, throwError } from 'rxjs';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let notificationService: NotificationService;
  let loaderService: LoaderService;
  let router: Router;
  let apiGatewayService: ApiGatewayService;

  beforeEach(() => {    const notificationServiceMock = { show: jest.fn() };
    const loaderServiceMock = { show: jest.fn(), hide: jest.fn() };
    const routerMock = { navigate: jest.fn() };
    const mockLambdaResponse = '¡Hola Mundo desde Lambda en Java!';
    const mockEcsResponse = 'Hello World!';
    const apiGatewayServiceMock = {
      postLambdaData: jest.fn().mockReturnValue(of(mockLambdaResponse)),
      getEcsData: jest.fn().mockReturnValue(of(mockEcsResponse))
    };

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: NotificationService, useValue: notificationServiceMock },
        { provide: LoaderService, useValue: loaderServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ApiGatewayService, useValue: apiGatewayServiceMock }
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    notificationService = TestBed.inject(NotificationService);
    loaderService = TestBed.inject(LoaderService);
    router = TestBed.inject(Router);
    apiGatewayService = TestBed.inject(ApiGatewayService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize button configs', () => {
      expect(component.btnNotification).toBeDefined();
      expect(component.btnLoader).toBeDefined();
      expect(component.btnForm).toBeDefined();
    });
  });
  describe('ngOnInit', () => {
    it('should call API services and process responses correctly', () => {
      const lambdaSpy = jest.spyOn(apiGatewayService, 'postLambdaData');
      const ecsSpy = jest.spyOn(apiGatewayService, 'getEcsData');

      component.ngOnInit();

      expect(lambdaSpy).toHaveBeenCalled();
      expect(ecsSpy).toHaveBeenCalled();

      // Verificar que las respuestas se procesan correctamente
      expect(component.lambdaResponse).toEqual({
        statusCode: 200,
        body: { message: '¡Hola Mundo desde Lambda en Java!' }
      });

      expect(component.ecsResponse).toEqual({
        statusCode: 200,
        body: { message: 'Hello World!' }
      });
    });

    it('should handle API errors', () => {
      const mockError = new Error('API error');
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      jest.spyOn(apiGatewayService, 'postLambdaData').mockReturnValueOnce(throwError(() => mockError));
      component.ngOnInit();

      expect(consoleSpy).toHaveBeenCalledWith('Error al obtener datos de Lambda', mockError);
      expect(component.lambdaResponse).toBeUndefined();

      consoleSpy.mockRestore();
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

    it('should show and hide loader', () => {
      component.showLoader();
      expect(loaderService.show).toHaveBeenCalled();
      jest.advanceTimersByTime(1000);
      expect(loaderService.hide).toHaveBeenCalled();
    });
  });
});