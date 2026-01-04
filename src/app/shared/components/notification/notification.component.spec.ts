import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationComponent } from './notification.component';
import { NotificationModule } from './notification.module';
import { NotificationService } from './notification.service';
import { configNotification } from './notification.config';
import { ConfirmationService } from 'primeng/api';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  let notificationService: NotificationService;
  let confirmationService: ConfirmationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationComponent],
      imports: [NotificationModule, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;

    notificationService = TestBed.inject(NotificationService);
    confirmationService = TestBed.inject(ConfirmationService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show modalNotification with img error', () => {
    const confirmSpy = jest.spyOn(confirmationService, 'confirm');

    notificationService.show({
      ...configNotification({
        title: 'Título de confirmacion',
        message: 'Mensaje de confirmacion',
        error: true,
      }),
    });

    expect(component.modalNotification.img?.src).toBe('assets/img/pictogramas/error.svg');
    expect(confirmSpy).toHaveBeenCalled();
  });

  it('should show modalNotification with correct values', () => {
    const confirmSpy = jest.spyOn(confirmationService, 'confirm');

    notificationService.show({
      ...configNotification({
        title: 'Título de confirmacion',
        message: 'Mensaje de confirmacion',
      }),
    });

    expect(component.modalNotification.title).toBe('Título de confirmacion');
    expect(component.modalNotification.message).toBe('Mensaje de confirmacion');
    expect(confirmSpy).toHaveBeenCalled();
  });

  it('should show and hide notification', () => {
    const confirmSpy = jest.spyOn(confirmationService, 'confirm');

    notificationService.show({
      ...configNotification({
        title: 'Título de confirmacion',
        message: 'Mensaje de confirmacion',
      }),
    });
    expect(confirmSpy).toHaveBeenCalled();

    const closeSpy = jest.spyOn(confirmationService, 'close');
    notificationService.close();
    expect(closeSpy).toHaveBeenCalled();
  });

  it('should show and hide notification with close button', () => {
    const confirmSpy = jest.spyOn(confirmationService, 'confirm');

    notificationService.show({
      ...configNotification({
        title: 'Título de confirmacion',
        message: 'Mensaje de confirmacion',
        clickClose: () => true,
      }),
    });
    expect(confirmSpy).toHaveBeenCalled();

    const closeSpy = jest.spyOn(confirmationService, 'close');
    component.modalNotification.closeButton?.libTbClick!(true);
    expect(closeSpy).toHaveBeenCalled();
  });

  it('should show and hide notification with accept button', () => {
    const confirmSpy = jest.spyOn(confirmationService, 'confirm');

    notificationService.show({
      ...configNotification({
        title: 'Título de confirmacion',
        message: 'Mensaje de confirmacion',
        clickAccept: () => true,
      }),
    });
    expect(confirmSpy).toHaveBeenCalled();

    const closeSpy = jest.spyOn(confirmationService, 'close');
    component.modalNotification.acceptButton?.libTbClick!(true);
    expect(closeSpy).toHaveBeenCalled();
  });

  it('should show and hide notification with reject button', () => {
    const confirmSpy = jest.spyOn(confirmationService, 'confirm');

    notificationService.show({
      ...configNotification({
        title: 'Título de confirmacion',
        message: 'Mensaje de confirmacion',
        clickReject: () => true,
      }),
    });
    expect(confirmSpy).toHaveBeenCalled();

    const closeSpy = jest.spyOn(confirmationService, 'close');
    component.modalNotification.rejectButton?.libTbClick!(true);
    expect(closeSpy).toHaveBeenCalled();
  });
});
