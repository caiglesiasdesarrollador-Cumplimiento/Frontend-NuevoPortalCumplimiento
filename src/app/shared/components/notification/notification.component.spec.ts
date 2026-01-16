import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationComponent } from './notification.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NotificationService } from './notification.service';
import { BehaviorSubject } from 'rxjs';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  const mockNotificationService = {
    notificationObserver: new BehaviorSubject(null)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationComponent],
      providers: [
        { provide: NotificationService, useValue: mockNotificationService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should have isVisible', () => { expect(component.isVisible).toBe(false); });
  it('should have modalNotification', () => { expect(component.modalNotification).toBeDefined(); });
  it('should close notification', () => { 
    component.isVisible = true;
    component.close();
    expect(component.isVisible).toBe(false); 
  });
});




