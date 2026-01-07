import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HelpComponent } from './help.component';
import { NotificationService } from '../notification/notification.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('HelpComponent', () => {
  let component: HelpComponent;
  let fixture: ComponentFixture<HelpComponent>;
  let notificationServiceMock: jest.Mocked<NotificationService>;

  beforeEach(async () => {
    notificationServiceMock = {
      show: jest.fn(),
      close: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      declarations: [HelpComponent],
      providers: [
        { provide: NotificationService, useValue: notificationServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HelpComponent);
    component = fixture.componentInstance;
  });

  describe('Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have showText as false initially', () => {
      expect(component.showText).toBe(false);
    });

    it('should have helpBtn defined', () => {
      expect(component.helpBtn).toBeDefined();
      expect(component.helpBtn.icon).toBe('fal fa-question-circle');
    });
  });

  describe('onMouseEnter', () => {
    it('should set showText to true', () => {
      component.onMouseEnter();
      expect(component.showText).toBe(true);
    });

    it('should update helpBtn label', () => {
      component.onMouseEnter();
      expect(component.helpBtn.label).toBe('¿Necesitas ayuda?');
    });

    it('should set iconPosition to left', () => {
      component.onMouseEnter();
      expect(component.helpBtn.iconPosition).toBe('left');
    });
  });

  describe('onMouseLeave', () => {
    it('should set showText to false', () => {
      component.showText = true;
      component.onMouseLeave();
      expect(component.showText).toBe(false);
    });

    it('should clear helpBtn label', () => {
      component.helpBtn.label = '¿Necesitas ayuda?';
      component.onMouseLeave();
      expect(component.helpBtn.label).toBe('');
    });

    it('should clear iconPosition', () => {
      component.helpBtn.iconPosition = 'left';
      component.onMouseLeave();
      expect(component.helpBtn.iconPosition).toBeUndefined();
    });
  });

  describe('openHelp', () => {
    it('should call notificationService.show with config', () => {
      component.openHelp();
      expect(notificationServiceMock.show).toHaveBeenCalled();
    });

    it('should pass correct config to notificationService', () => {
      component.openHelp();
      const config = notificationServiceMock.show.mock.calls[0][0];
      expect(config.title).toBe('¿Necesitas ayuda?');
      expect(config.icon).toBe('fal fa-question-circle');
      expect(config.acceptButtonVisible).toBe(true);
      expect(config.rejectButtonVisible).toBe(false);
    });

    it('should configure accept button to close notification', () => {
      component.openHelp();
      const config = notificationServiceMock.show.mock.calls[0][0];
      if (config.acceptButton && config.acceptButton.libTbClick) {
        config.acceptButton.libTbClick(null);
        expect(notificationServiceMock.close).toHaveBeenCalled();
      }
    });
  });

  describe('helpBtn click', () => {
    it('should call openHelp when helpBtn is clicked', () => {
      const openHelpSpy = jest.spyOn(component, 'openHelp');
      if (component.helpBtn.libTbClick) {
        component.helpBtn.libTbClick(null);
      }
      expect(openHelpSpy).toHaveBeenCalled();
    });
  });
});

