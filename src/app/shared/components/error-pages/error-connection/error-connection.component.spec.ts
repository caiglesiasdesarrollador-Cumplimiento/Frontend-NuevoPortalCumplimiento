import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorConnectionComponent } from './error-connection.component';
import { Location } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ErrorConnectionComponent', () => {
  let component: ErrorConnectionComponent;
  let fixture: ComponentFixture<ErrorConnectionComponent>;
  let locationMock: jest.Mocked<Location>;

  beforeEach(async () => {
    locationMock = {
      back: jest.fn()
    } as any;

    // Mock window.location.reload
    const reloadMock = jest.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: reloadMock },
      writable: true
    });

    await TestBed.configureTestingModule({
      declarations: [ErrorConnectionComponent],
      providers: [
        { provide: Location, useValue: locationMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorConnectionComponent);
    component = fixture.componentInstance;
  });

  describe('Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('refreshPage', () => {
    it('should call window.location.reload', () => {
      const reloadSpy = jest.spyOn(window.location, 'reload').mockImplementation(() => {});
      component.refreshPage();
      expect(reloadSpy).toHaveBeenCalled();
    });
  });

  describe('goBack', () => {
    it('should call location.back', () => {
      component.goBack();
      expect(locationMock.back).toHaveBeenCalled();
    });
  });
});

