import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HelpComponent } from './help.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NotificationService } from '../notification/notification.service';

describe('HelpComponent', () => {
  let component: HelpComponent;
  let fixture: ComponentFixture<HelpComponent>;

  const mockNotificationService = {
    show: jest.fn(),
    close: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpComponent],
      providers: [
        { provide: NotificationService, useValue: mockNotificationService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HelpComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should have showText', () => { expect(component.showText).toBe(false); });
  it('should show text on mouse enter', () => { 
    component.onMouseEnter();
    expect(component.showText).toBe(true); 
  });
  it('should hide text on mouse leave', () => { 
    component.onMouseEnter();
    component.onMouseLeave();
    expect(component.showText).toBe(false); 
  });
  it('should open help', () => { 
    component.openHelp();
    expect(mockNotificationService.show).toHaveBeenCalled(); 
  });
});



